import { Navigate, Outlet } from "react-router-dom";
import { usePermissions } from "@/features/auth/hooks/usePermissions";
import type { Permission } from "@/features/auth/models/Permissions";

interface Props {
  /** O usuário precisa ter ao menos UMA dessas permissões. */
  anyOf: Permission[];
}

export default function PermissionRoute({ anyOf }: Props) {
  const { canAny, isLoading } = usePermissions();

  // Enquanto as permissões carregam, não redireciona ainda
  if (isLoading) return null;

  return canAny(...anyOf) ? <Outlet /> : <Navigate to="/inicio" replace />;
}
