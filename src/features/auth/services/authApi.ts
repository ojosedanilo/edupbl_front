import { api, setAccessToken, clearAccessToken } from '@/shared/services/api';
import type { LoginCredentials } from "../models/LoginCredentials"
import type { TokenResponse } from "../models/TokenResponse"

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
    // FastAPI OAuth2PasswordRequestForm espera FormData
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const { data } = await api.post<TokenResponse>('/auth/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Guarda access token (refresh já tá no cookie)
    setAccessToken(data.access_token);
    
    return data;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
    clearAccessToken();
  },
  
  refreshToken: async (): Promise<TokenResponse> => {
    const { data } = await api.post<TokenResponse>('/auth/refresh_token');
    setAccessToken(data.access_token);
    return data;
  },
  
  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

// Interceptor de resposta - trata erros
// Quando o access token expirar, precisa fazer refresh automaticamente
api.interceptors.response.use(
  (response) => response, // Se sucesso, passa direto
  async (error) => {
    const originalRequest = error.config;
    
    // Se erro 401 e ainda não tentou refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Tenta fazer refresh
        const { data } = await api.post('/auth/refresh_token');
        setAccessToken(data.access_token);
        
        // Refaz a requisição original com novo token
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Refresh falhou - usuário precisa fazer login novamente
        clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);