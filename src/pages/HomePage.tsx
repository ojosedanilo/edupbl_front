/**
 * HomePage
 *
 * Dashboard principal do usuário autenticado.
 *
 * Exibe:
 *   - Cabeçalho com role, nome e botão de logout
 *   - Grid de cards de navegação por feature
 *
 * Cards visíveis dependem da role:
 *   - Todos: Ocorrências
 *   - Coordenador/Admin: Usuários, Turmas
 *
 * Para adicionar uma nova feature:
 *   1. Crie `src/pages/MinhaFeaturePage.tsx` usando <FeatureLayout>
 *   2. Adicione a rota em `src/routes/index.tsx`
 *   3. Adicione o card abaixo na seção correspondente
 */

import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { Button } from "@/components/ui/Button";
import LogoPBL from "@/assets/logo_pbl.svg";
// Descomente quando adicionar ícones (ex: lucide-react):
// import { AlertCircle, Users, BookOpen } from "lucide-react";

/** Mapeia o valor da role (inglês) para o label em português. */
function roleLabel(role: string): string {
  const labels: Record<string, string> = {
    student: "Aluno(a)",
    guardian: "Responsável",
    teacher: "Professor(a)",
    coordinator: "Coordenador(a)",
    porter: "Porteiro(a)",
    admin: "Administrador(a)",
  };
  return labels[role] ?? role;
}

export default function HomePage() {
  const { user } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // Cards extras visíveis apenas para gestão
  const isManagement = user?.role === "coordinator" || user?.role === "admin";

  return (
    <div className="relative min-h-screen w-full">
      <GradientBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">

        {/* Cabeçalho: logo + saudação + botão de saída */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={LogoPBL} alt="" className="size-14 object-contain" />
            <div>
              <p className="text-sm font-medium text-text/80">
                {roleLabel(user?.role ?? "")}
              </p>
              <h1 className="text-2xl font-bold text-text md:text-3xl">
                Seja bem-vindo(a), {user?.first_name}!
              </h1>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Saindo…" : "Sair"}
          </Button>
        </header>

        {/* Grid de features */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-text/70">
            O que você quer fazer?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Visível para todos */}
            <FeatureCard
              title="Ocorrências"
              description="Visualize, registre e gerencie ocorrências disciplinares."
              to="/ocorrencias"
              // icon={<AlertCircle className="size-6" />}
            />

            {/* Visível apenas para coordenação e admin */}
            {isManagement && (
              <>
                <FeatureCard
                  title="Usuários"
                  description="Gerencie alunos, professores e responsáveis."
                  to="/usuarios"
                  // icon={<Users className="size-6" />}
                />
                <FeatureCard
                  title="Turmas"
                  description="Organize e acompanhe as turmas da escola."
                  to="/turmas"
                  // icon={<BookOpen className="size-6" />}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
