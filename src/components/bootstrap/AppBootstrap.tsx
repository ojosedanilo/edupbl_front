/**
 * AppBootstrap
 *
 * Bloqueia a renderização das rotas até que o bootstrap de autenticação
 * termine (seja com sucesso ou com falha).
 *
 * Isso evita que ProtectedRoutes ou PublicOnlyRoute tomem decisões de
 * redirect baseadas em `user = null` antes que a sessão seja verificada.
 */

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthContext } from "@/features/auth/hooks/AuthContext";
import { initAuth } from "@/features/auth/services/initAuth";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";

type AppBootstrapProps = {
  children: ReactNode;
};

export function AppBootstrap({ children }: AppBootstrapProps) {
  const { setUser } = useAuthContext();
  // const { isBootstrapping } = useAuthContext();

  useEffect(() => {
    initAuth().then((user) => {
      setUser(user);
    });
  }, []);

  /*
  if (isBootstrapping) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <GradientBackdrop />
        <p className="relative z-10 text-white text-lg font-medium">
          Carregando…
        </p>
      </div>
    );
  }
  */

  return <>{children}</>;
}
