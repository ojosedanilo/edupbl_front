// src/shared/services/api.ts
import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Importante, pois envia cookies automaticamente
});

// Interceptor adiciona access token
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  // Não adiciona em endpoints públicos
  const isPublic =
    config.url?.includes("/auth/token") ||
    config.url?.includes("/auth/refresh_token");

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
