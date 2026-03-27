import { api, setAccessToken, clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";
import type { TokenResponse } from "../models/TokenResponse";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type RetriableAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    // FastAPI OAuth2PasswordRequestForm espera FormData
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const { data } = await api.post<TokenResponse>("/auth/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Guarda access token (refresh já tá no cookie)
    setAccessToken(data.access_token);

    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    clearAccessToken();
  },

  refreshToken: async (): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/refresh_token");
    setAccessToken(data.access_token);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};

// Interceptor de resposta - trata erros
// Quando o access token expirar, precisa fazer refresh automaticamente
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetriableAxiosRequestConfig
      | undefined;

    const isRefreshEndpoint = originalRequest?.url?.includes(
      "/auth/refresh_token",
    );
    const isLoginEndpoint = originalRequest?.url?.includes("/auth/token");

    // Se erro 401 e ainda não tentou refresh, e não é o próprio refresh/login falhando
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginEndpoint
    ) {
      originalRequest._retry = true;

      try {
        // Tenta fazer refresh
        const { data } = await api.post("/auth/refresh_token");
        setAccessToken(data.access_token);

        // Refaz a requisição original com novo token
        (originalRequest.headers as any).Authorization =
          `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch {
        // Refresh falhou - usuário precisa fazer login novamente
        clearAccessToken();
        // Só redireciona se não estiver já na página de login
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
