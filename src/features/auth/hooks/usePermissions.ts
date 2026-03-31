import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/services/api";
import { useCurrentUser } from "./useAuth";
import type { Permission } from "../models/Permissions";

export const PERMISSIONS_QUERY_KEY = ["me", "permissions"] as const;

async function fetchPermissions(): Promise<string[]> {
  const { data } = await api.get<{ permissions: string[] }>(
    "/auth/me/permissions",
  );
  return data.permissions;
}

/**
 * Retorna as permissões do usuário logado e um helper `can()`.
 *
 * - Só faz a query se o usuário estiver autenticado
 * - staleTime: Infinity — as permissões só mudam com login/logout
 * - Invalide com queryClient.invalidateQueries(['me', 'permissions'])
 *   se um admin alterar a role do usuário durante a sessão
 */
export function usePermissions() {
  const { user } = useCurrentUser();

  const { data: permissions = [], isLoading } = useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: fetchPermissions,
    enabled: !!user, // só busca se logado
    staleTime: Infinity, // permissões mudam só com login/logout
  });

  /** Verifica se o usuário possui uma permissão específica. */
  function can(permission: Permission): boolean {
    return permissions.includes(permission);
  }

  /**
   * Verifica se o usuário possui ao menos uma das permissões listadas.
   * Útil para cards que correspondem a múltiplas permissões (ex: ocorrências).
   */
  function canAny(...perms: Permission[]): boolean {
    return perms.some((p) => permissions.includes(p));
  }

  return { permissions, can, canAny, isLoading };
}
