/**
 * PublicOnlyRoute
 *
 * Wrapper para rotas de autenticação (login, signup).
 * - Se autenticado: redireciona para /home.
 * - Se não autenticado: renderiza a rota normalmente.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

export default function PublicOnlyRoute() {
  const { user } = useCurrentUser();

  if (user) return <Navigate to="/home" replace />;

  return <Outlet />;
}
