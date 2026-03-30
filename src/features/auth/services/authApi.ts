/**
 * authApi
 *
 * Serviço de autenticação com interceptor de refresh automático.
 *
 * Fluxo de interceptor (resposta 401):
 *   1. Qualquer requisição que retorne 401 (exceto /token e /refresh_token)
 *      aciona automaticamente um POST /auth/refresh_token.
 *   2. Se o refresh tiver sucesso, o novo access_token é armazenado e
 *      a requisição original é repetida.
 *   3. Se o refresh falhar, o access_token é limpo e o erro é propagado
 *      (o bootstrap vai capturar e definir user = null).
 */

import { api, setAccessToken, clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";
import type { TokenResponse } from "../models/TokenResponse";
import type { UserMe } from "../models/UserMe";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

// ─── Funções da API ───────────────────────────────────────────────────────────

export const authApi = {
  /**
   * Faz login com credenciais (email + senha).
   * Armazena o access_token em memória; o refresh_token vem como cookie HttpOnly.
   */
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const { data } = await api.post<TokenResponse>("/auth/token", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });

    setAccessToken(data.access_token);
    return data;
  },

  /** Remove a sessão no servidor e limpa o cookie de refresh. */
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    clearAccessToken();
  },

  /**
   * Renova o access_token usando o refresh_token do cookie.
   * Armazena o novo access_token em memória.
   */
  refreshToken: async (): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/refresh_token");
    setAccessToken(data.access_token);
    return data;
  },

  /** Retorna os dados do usuário autenticado. */
  getCurrentUser: async (): Promise<UserMe> => {
    const { data } = await api.get<UserMe>("/auth/me");
    return data;
  },
};

// ─── Interceptor: refresh automático em 401 ──────────────────────────────────

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    const isRefreshEndpoint = originalRequest?.url?.includes(
      "/auth/refresh_token",
    );
    const isLoginEndpoint = originalRequest?.url?.includes("/auth/token");

    // Somente tenta refresh em erros 401 de endpoints protegidos,
    // e apenas uma vez por requisição (_retry impede loop infinito).
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post<TokenResponse>("/auth/refresh_token");
        setAccessToken(data.access_token);

        // Repete a requisição original com o novo token
        (originalRequest.headers as Record<string, string>).Authorization =
          `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch {
        // Refresh falhou — sem sessão válida
        clearAccessToken();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
