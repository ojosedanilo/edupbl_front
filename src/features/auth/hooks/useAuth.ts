/**
 * Hooks de autenticação — React Query
 *
 * useCurrentUser  → useQuery(["me"])          — lê o usuário autenticado
 * useLogin        → useMutation               — faz login e popula ["me"]
 * useLogout       → useMutation               — faz logout e limpa ["me"]
 *
 * O bootstrap (verificação da sessão no carregamento inicial) acontece
 * automaticamente quando useCurrentUser é chamado pela primeira vez:
 * o React Query dispara a query, o interceptor de 401 tenta o refresh,
 * e o resultado final (usuário ou null) fica em cache.
 *
 * isBootstrapping é derivado de `isLoading` da query de ["me"]:
 * enquanto a primeira chamada a /auth/me não terminar (com ou sem erro),
 * o AppBootstrap bloqueia a renderização das rotas.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "./AuthContext";
import { authApi } from "../services/authApi";
import { clearAccessToken } from "@/shared/services/api";
import type { LoginCredentials } from "../models/LoginCredentials";
import type { UserMe } from "../models/UserMe";

// Chave estável para o cache do usuário autenticado
export const ME_QUERY_KEY = ["me"] as const;

// ─── Estado do usuário ────────────────────────────────────────────────────────

/**
 * Retorna o usuário autenticado e flags de estado.
 *
 * - `user`            → UserMe | null | undefined
 *                       null/undefined = sem sessão ou query ainda rodando
 * - `isBootstrapping` → true enquanto a primeira verificação de sessão
 *                       não terminou (usado pelo AppBootstrap)
 * - `isLoading`       → true em qualquer carregamento posterior
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
        // Sem sessão válida (o interceptor já tentou o refresh).
        // Retorna null em vez de lançar para não colocar a query em
        // estado de erro — ausência de sessão é um estado válido.
        return null;
      }
    },
    // Mantém o dado indefinidamente em cache; o usuário só muda por
    // ação explícita (login / logout), não por tempo.
    staleTime: Infinity,
  });

  return {
    user: user ?? null,
    // isLoading é true apenas na primeira carga (sem dado em cache).
    // isFetching cobre revalidações posteriores, mas para o bootstrap
    // só a primeira carga importa.
    isBootstrapping: isLoading,
    isFetching,
  };
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Retorna uma mutation de login.
 *
 * Uso:
 *   const { mutate, mutateAsync, isPending, error } = useLogin();
 *   await mutateAsync({ username, password });
 *
 * Após o sucesso, a query ["me"] é populada com o usuário retornado
 * por /auth/me, evitando um segundo round-trip.
 */
export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      await authApi.login(credentials);
      // Busca o perfil logo após o login para popular o cache
      return authApi.getCurrentUser();
    },
    onSuccess: (user: UserMe) => {
      // Injeta diretamente no cache — sem refetch adicional
      queryClient.setQueryData<UserMe>(ME_QUERY_KEY, user);
    },
  });
}

// ─── Logout ───────────────────────────────────────────────────────────────────

/**
 * Retorna uma mutation de logout.
 *
 * Uso:
 *   const { mutate, isPending } = useLogout();
 *   mutate();
 *
 * Após o sucesso (ou falha), limpa o access token em memória, zera o
 * cache do usuário e redireciona para /entrar.
 */
export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      // Garante limpeza mesmo se a chamada ao servidor falhar
      clearAccessToken();
      queryClient.setQueryData<null>(ME_QUERY_KEY, null);
      // Remove todas as queries que possam ter dado de usuário
      queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
      navigate("/entrar", { replace: true });
    },
  });
}
