/**
 * Hooks de autenticação — React Query
 *
 * useCurrentUser  → useQuery(["me"])  — lê o usuário autenticado do cache
 * useLogin        → useMutation       — faz login e popula ["me"]
 * useLogout       → useMutation       — faz logout e zera ["me"]
 *
 * Bootstrap (verificação de sessão no carregamento inicial):
 *   Acontece automaticamente quando useCurrentUser é chamado pela primeira vez.
 *   O React Query dispara a query → o interceptor tenta o refresh se necessário
 *   → o resultado final (usuário | null) fica em cache.
 *   `isBootstrapping` é `true` apenas nessa primeira carga, bloqueando
 *   as rotas no AppBootstrap até que o estado esteja definido.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { queryClient } from "./AuthContext";
import { authApi } from "../services/authApi";
import { clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";
import type { UserMe } from "../models/UserMe";

/** Chave estável para o cache do usuário autenticado. */
export const ME_QUERY_KEY = ["me"] as const;

// ── Usuário atual ─────────────────────────────────────────────────────────── //

/**
 * Retorna o usuário autenticado e flags de estado.
 *
 * - `user`            → UserMe | null
 *                       null = sem sessão ou query ainda rodando
 * - `isBootstrapping` → true enquanto a primeira verificação não terminou
 *                       (usado pelo AppBootstrap para bloquear as rotas)
 * - `isFetching`      → true em qualquer carregamento (incluindo refetch)
 */
export function useCurrentUser() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery<UserMe | null>({
    queryKey: ME_QUERY_KEY,
    queryFn: async () => {
      try {
        return await authApi.getCurrentUser();
      } catch {
        // Sem sessão válida — retorna null em vez de lançar erro,
        // pois ausência de sessão é um estado válido (não um erro de rede)
        return null;
      }
    },
    // Não invalida automaticamente por tempo: usuário só muda por
    // ação explícita (login/logout), não por passagem de tempo
    staleTime: Infinity,
  });

  return {
    user: user ?? null,
    isBootstrapping: isLoading, // true somente na primeira carga (sem cache)
    isFetching,
  };
}

// ── Login ─────────────────────────────────────────────────────────────────── //

/**
 * Mutation de login.
 *
 * Após o sucesso, popula o cache ["me"] com o usuário retornado por /auth/me,
 * evitando um round-trip extra.
 *
 * Uso:
 *   const { mutateAsync, isPending } = useLogin();
 *   await mutateAsync({ username, password });
 */
export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await authApi.login(credentials);
      return authApi.getCurrentUser();
    },
    onSuccess: (user: UserMe) => {
      // Injeta diretamente no cache — sem refetch adicional
      queryClient.setQueryData<UserMe>(ME_QUERY_KEY, user);
    },
  });
}

// ── Logout ────────────────────────────────────────────────────────────────── //

/**
 * Mutation de logout.
 *
 * No onSettled (sucesso ou falha): limpa o access_token, zera o cache
 * e redireciona para /entrar. Garante limpeza mesmo se a chamada ao
 * servidor falhar (ex: timeout de rede).
 *
 * Uso:
 *   const { mutate, isPending } = useLogout();
 *   mutate();
 */
export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAccessToken();
      queryClient.setQueryData<null>(ME_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY }); // remove ["me"]
      queryClient.removeQueries({ queryKey: ["me", "permissions"] }); // remove ["me", "permissions"]
      navigate("/entrar", { replace: true });
    },
  });
}
