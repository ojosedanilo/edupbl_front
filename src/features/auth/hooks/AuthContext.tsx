/**
 * AuthContext
 *
 * Fornece o QueryClient do React Query para toda a aplicação e expõe
 * um helper `useAuthContext` para quem precisar do cliente diretamente.
 *
 * O estado do usuário autenticado agora vive em React Query (chave
 * ["me"]) e é gerenciado pelos hooks em useAuth.ts.  O AuthProvider
 * apenas instancia o QueryClient e injeta o QueryClientProvider.
 */

import { createContext, useContext, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient compartilhado — criado uma única vez fora do componente
// para evitar que re-renders o recriem.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Não refaz a query automaticamente ao focar a janela: o usuário
      // autenticado muda só por ação explícita (login / logout).
      refetchOnWindowFocus: false,
      // Não retenta em erro: 401 em /auth/me significa "sem sessão",
      // não uma falha transitória de rede.
      retry: false,
    },
  },
});

// Contexto mínimo — apenas expõe o queryClient para casos avançados
// (ex.: invalidar queries de fora do hook useAuth).
const AuthContext = createContext<QueryClient | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

/** Retorna o QueryClient. Use apenas se precisar de acesso direto ao cliente. */
export function useAuthContext(): QueryClient {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}
