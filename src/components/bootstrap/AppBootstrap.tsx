/**
 * AppBootstrap
 *
 * Bloqueia a renderização das rotas até que a query inicial de ["me"]
 * termine (seja com usuário autenticado ou null).
 *
 * `isBootstrapping` vem de `isLoading` do useQuery(["me"]), que é true
 * apenas na primeira carga — quando não há dado em cache.  Após isso,
 * ProtectedRoutes e PublicOnlyRoute podem tomar decisões seguras.
 */

import type { ReactNode } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const { isBootstrapping } = useCurrentUser();

  if (isBootstrapping) {
    return <LoadingScreen title="Carregando…" />;
  }

  return <>{children}</>;
}
