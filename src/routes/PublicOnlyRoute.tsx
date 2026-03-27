import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/features/auth/hooks/useAuth';
import { GradientBackdrop } from '@/components/layout/GradientBackdrop';

/**
 * Wrapper para rotas públicas de auth (login, signup).
 * Se o usuário já estiver logado, redireciona para /home.
 * Enquanto verifica, exibe tela de carregamento estilizada.
 */
export default function PublicOnlyRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <GradientBackdrop />
        <p className="relative z-10 text-white text-lg font-medium">Carregando…</p>
      </div>
    );
  }

  if (user) return <Navigate to="/home" replace />;

  return <Outlet />;
}
