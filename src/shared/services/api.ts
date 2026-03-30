/**
 * Instância Axios compartilhada por toda a aplicação.
 *
 * Access token:
 *   Armazenado em memória (variável de módulo) — nunca em localStorage,
 *   para reduzir superfície de ataque a XSS.
 *   Funções: setAccessToken, getAccessToken, clearAccessToken
 *
 * Interceptor de requisição:
 *   Injeta o header Authorization com o access_token em todas as
 *   requisições, exceto nos endpoints públicos de auth (/token e /refresh_token).
 *
 * Refresh automático em 401:
 *   Implementado em authApi.ts para manter a responsabilidade separada.
 */

import axios from "axios";

// ── Gerenciamento do access token em memória ──────────────────────────────── //

let accessToken: string | null = null;

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const getAccessToken = (): string | null => accessToken;

export const clearAccessToken = (): void => {
  accessToken = null;
};

// ── Instância Axios ───────────────────────────────────────────────────────── //

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Necessário para enviar cookies (refresh_token HttpOnly) automaticamente
  withCredentials: true,
});

// Interceptor: adiciona Authorization header, exceto em endpoints públicos
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  // Endpoints de auth não precisam (e não devem) receber o access_token
  const isPublicAuthEndpoint =
    config.url?.includes("/auth/token") ||
    config.url?.includes("/auth/refresh_token");

  if (token && !isPublicAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
