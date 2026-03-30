import { authApi } from "./authApi";

export const initAuth = async () => {
  try {
    // tenta pegar usuário com token atual (memória)
    return await authApi.getCurrentUser();
  } catch {
    try {
      // tenta renovar via refresh token (cookie)
      await authApi.refreshToken();

      // tenta novamente com novo access_token
      return await authApi.getCurrentUser();
    } catch {
      // sem sessão válida
      return null;
    }
  }
};
