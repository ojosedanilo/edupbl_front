import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '@/features/auth/hooks/useAuth'

export default function ProtectedRoutes() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
