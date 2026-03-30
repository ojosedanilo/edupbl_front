/**
 * authApi — Serviço de autenticação
 *
 * Funções disponíveis:
 *   login()          → POST /auth/token (salva access_token em memória)
 *   logout()         → POST /auth/logout (limpa cookie de refresh)
 *   refreshToken()   → POST /auth/refresh_token (renova access_token)
 *   getCurrentUser() → GET /auth/me (dados do usuário autenticado)
 *
 * Interceptor de refresh automático (ao final do arquivo):
 *   Qualquer resposta 401 (exceto /token e /refresh_token) aciona
 *   automaticamente um POST /auth/refresh_token. Se o refresh tiver
 *   sucesso, armazena o novo access_token e repete a requisição original.
 *   Se falhar, limpa o token e propaga o erro (bootstrap define user = null).
 */

import { api, setAccessToken, clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";
import type { TokenResponse } from "../models/TokenResponse";
import type { UserMe } from "../models/UserMe";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Marca adicionada ao config original para evitar loop infinito de retry
type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };

// ── Funções da API ─────────────────────────────────────────────────────────── //

export const authApi = {
  /**
   * Autentica com e-mail + senha via OAuth2 form.
   * Salva o access_token em memória; o refresh_token chega como cookie HttpOnly.
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
   * Chamado automaticamente pelo interceptor em respostas 401.
   */
  refreshToken: async (): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>("/auth/refresh_token", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      withCredentials: true,
    });
    setAccessToken(data.access_token);
    return data;
  },

  /** Retorna os dados do usuário autenticado (requer access_token válido). */
  getCurrentUser: async (): Promise<UserMe> => {
    const { data } = await api.get<UserMe>("/auth/me");
    return data;
  },
};

// ── Interceptor: refresh automático em respostas 401 ──────────────────────── //

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    // Endpoints de auth nunca devem ser retentados para evitar loops
    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/token") ||
      originalRequest?.url?.includes("/auth/refresh_token");

    // Só tenta refresh em erros 401 de endpoints protegidos,
    // e apenas uma vez por requisição (_retry evita loop infinito)
    const shouldRetry =
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint;

    if (shouldRetry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post<TokenResponse>("/auth/refresh_token", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        });
        setAccessToken(data.access_token);

        // Repete a requisição original com o novo token
        (originalRequest.headers as Record<string, string>).Authorization =
          `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch {
        // Refresh falhou — sessão expirada, limpa o token
        clearAccessToken();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
