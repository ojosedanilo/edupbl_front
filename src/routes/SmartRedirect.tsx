/**
 * SmartRedirect
 *
 * Controla o comportamento da rota "/" para usuários logados:
 *
 * - PRIMEIRA vez que o browser abre a página ("cold navigation"):
 *   redireciona para /inicio. O flag é gravado no sessionStorage para
 *   que recarregamentos ou navegações posteriores dentro da mesma aba
 *   não repitam o redirect.
 *
 * - Demais acessos dentro da mesma sessão de aba (navegação interna,
 *   F5, etc.): renderiza "/" normalmente, permitindo que o usuário
 *   logado visite a landing page.
 *
 * O sessionStorage é por aba e é limpo quando a aba é fechada, então
 * ao abrir o site em uma aba nova o redirect acontece novamente.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

const SESSION_KEY = "landing_visited";

export default function SmartRedirect() {
  const { user } = useCurrentUser();

  if (user) {
    const alreadyVisited = sessionStorage.getItem(SESSION_KEY) === "true";

    if (!alreadyVisited) {
      // Marca que a landing já foi "visitada" nesta sessão de aba.
      // O redirect usa `replace` para não poluir o histórico:
      // o botão Voltar do browser levará o usuário para onde ele
      // estava antes de abrir o site, não para um loop de /→/inicio.
      sessionStorage.setItem(SESSION_KEY, "true");
      return <Navigate to="/inicio" replace />;
    }
  }

  return <Outlet />;
}
