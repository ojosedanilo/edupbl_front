/**
 * ProtectedRoutes
 *
 * Wrapper para rotas privadas.
 * - Se autenticado: renderiza a rota normalmente.
 * - Se não autenticado: redireciona para /entrar.
 *
 * O isBootstrapping já foi resolvido pelo AppBootstrap antes de
 * qualquer rota ser renderizada, então não é necessário checar aqui.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

export default function ProtectedRoutes() {
  const { user } = useCurrentUser();

  if (!user) return <Navigate to="/entrar" replace />;

  return <Outlet />;
}
