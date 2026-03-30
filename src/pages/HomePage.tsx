import { Link } from "react-router-dom";
import LogoPBL from "@/assets/logo_pbl.svg";
import { DashboardActionCard } from "@/components/ui/DashboardActionCard";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";

function roleLabel(role: string): string {
  const map: Record<string, string> = {
    student: "Aluno(a)",
    guardian: "Responsável",
    teacher: "Professor(a)",
    coordinator: "Coordenador(a)",
    porter: "Porteiro(a)",
    admin: "Administrador(a)",
  };
  return map[role] ?? role;
}

export default function HomePage() {
  // user é garantido pelo ProtectedRoutes — não é null aqui
  const { user } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const showCoordination =
    user?.role === "coordinator" || user?.role === "admin";

  return (
    <div className="relative min-h-screen w-full">
      <GradientBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={LogoPBL} alt="" className="size-14 object-contain" />
            <div>
              <p className="text-sm font-medium text-white/80">
                {roleLabel(user?.role ?? "")}
              </p>
              <h1 className="text-2xl font-bold text-white md:text-3xl">
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

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardActionCard
            title="Ocorrências"
            description="Visualize e gerencie ocorrências disciplinares."
            to="/occurrences"
          />
          {showCoordination ? (
            <DashboardActionCard
              title="Painel da coordenação"
              description="Cadastros, listas e relatórios (em construção)."
              to="/coordenacao"
            />
          ) : null}
          <DashboardActionCard
            title="Página inicial pública"
            description="Voltar ao site institucional."
            to="/"
          />
        </section>

        <p className="text-center text-sm text-white/70">
          <Link to="/" className="underline">
            Ir para landing
          </Link>
        </p>
      </div>
    </div>
  );
}
