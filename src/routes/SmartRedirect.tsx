import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

/**
 * Redireciona usuários logados para /home ao acessar a landing page.
 * O redirect NÃO usa `replace`, então o botão "Voltar" do browser
 * continua funcionando para retornar à landing.
 */
export default function SmartRedirect() {
  const { data: user, isLoading } = useCurrentUser();

  // Enquanto verifica, renderiza a landing normalmente para evitar flash
  if (isLoading) return <Outlet />;

  if (user) return <Navigate to="/home" />;

  return <Outlet />;
}
