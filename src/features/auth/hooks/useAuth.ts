/**
 * Hooks de autenticação.
 *
 * Todos os componentes devem usar estes hooks em vez de acessar
 * o AuthContext diretamente.
 */

import { useState } from "react";
import { useAuthContext } from "./AuthContext";
import { authApi } from "../services/authApi";
import { clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";

// ─── Estado do usuário ────────────────────────────────────────────────────────

export function useCurrentUser() {
  const { user, isBootstrapping } = useAuthContext();
  return { user, isBootstrapping };
}

// ─── Login ────────────────────────────────────────────────────────────────────

interface UseLoginResult {
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginResult {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credentials: LoginCredentials) {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.login(credentials);
      const me = await authApi.getCurrentUser();
      setUser(me);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao fazer login.";
      setError(message);
      throw err; // Re-lança para o formulário poder reagir
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}

// ─── Logout ───────────────────────────────────────────────────────────────────

interface UseLogoutResult {
  logout: () => Promise<void>;
  isLoading: boolean;
}

export function useLogout(): UseLogoutResult {
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      clearAccessToken();
      setUser(null);
      setIsLoading(false);
      window.location.href = "/login";
    }
  }

  return { logout, isLoading };
}
