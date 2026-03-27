/**
 * AuthContext
 *
 * Estado central de autenticação. Resolve a sessão uma única vez na inicialização:
 *
 *   1. Tenta GET /auth/me com o token em memória (se existir).
 *   2. Se falhar (token expirado, sem token), tenta POST /auth/refresh_token.
 *   3. Se o refresh também falhar, o usuário não está autenticado.
 *
 * Enquanto o bootstrap está em andamento, `isBootstrapping` é true.
 * Os guards de rota só tomam decisões depois que esse flag cai para false.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../services/authApi";
import type { UserMe } from "../models/UserMe";

interface AuthState {
  /** Usuário autenticado, ou null se não estiver logado. */
  user: UserMe | null;
  /** True enquanto o bootstrap inicial ainda não terminou. */
  isBootstrapping: boolean;
  /** Atualiza o usuário no contexto (ex.: após login bem-sucedido). */
  setUser: (user: UserMe | null) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserMe | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const bootstrapped = useRef(false);

  useEffect(() => {
    // Garante que o bootstrap só rode uma vez, mesmo no StrictMode
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    async function bootstrap() {
      try {
        // Passo 1: tenta buscar o usuário atual com o token já em memória.
        // Se o token não existir ou estiver expirado, o interceptor de resposta
        // tentará o refresh automaticamente antes de rejeitar.
        const me = await authApi.getCurrentUser();
        setUser(me);
      } catch {
        // Passo 2: o interceptor já tentou o refresh internamente.
        // Se chegou aqui, o refresh também falhou — sem sessão válida.
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isBootstrapping, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}
