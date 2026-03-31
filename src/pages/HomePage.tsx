/**
 * HomePage
 *
 * Dashboard principal do usuário autenticado.
 *
 * Exibe:
 *   - Cabeçalho com role, nome e botão de logout
 *   - Grid de cards de navegação por feature
 *
 * OBS:
 *   - Todos os cards estão visíveis por enquanto
 *   - Controle por role será feito futuramente
 */

import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { Button } from "@/components/ui/Button";
import LogoPBL from "@/assets/logo_pbl.svg";
// Ícones
import ReportProblemIcon from "@mui/icons-material/ReportProblem"; // Ocorrências
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Atrasos
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // Espaços
// import VideocamIcon from "@mui/icons-material/Videocam"; // Mídias
import FactCheckIcon from "@mui/icons-material/FactCheck"; // Frequência
import PeopleIcon from "@mui/icons-material/People"; // Usuários
import SchoolIcon from "@mui/icons-material/School"; // Turmas
import MenuBookIcon from "@mui/icons-material/MenuBook"; // Central Pedagógica
import EventIcon from "@mui/icons-material/Event"; // Eventos

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

  return (
    <div className="relative min-h-screen w-full">
      <GradientBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
        {/* Cabeçalho */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={LogoPBL} alt="" className="size-14 object-contain" />
            <div>
              <p className="text-sm font-medium text-light/90">
                {roleLabel(user?.role ?? "")}
              </p>
              <h1 className="text-2xl font-bold text-light md:text-3xl">
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
          <h2 className="mb-4 text-lg font-semibold text-light/90">
            O que você quer fazer?
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<ReportProblemIcon className="text-accent" />}
              title="Ocorrências"
              description="Visualize, registre e gerencie ocorrências disciplinares."
              to="/ocorrencias"
            />

            <FeatureCard
              icon={<AccessTimeIcon className="text-accent" />}
              title="Atrasos"
              description="Controle e registre atrasos dos alunos."
              to="/atrasos"
            />

            <FeatureCard
              icon={<MeetingRoomIcon className="text-accent" />}
              title="Espaços & Mídias"
              description="Gerencie ambientes (biblioteca, auditório) e equipamentos."
              to="/recursos"
            />

            <FeatureCard
              icon={<FactCheckIcon className="text-accent" />}
              title="Frequência"
              description="Realize chamadas e acompanhe a presença dos alunos."
              to="/frequencia"
            />

            <FeatureCard
              icon={<PeopleIcon className="text-accent" />}
              title="Usuários"
              description="Gerencie alunos, professores e responsáveis."
              to="/usuarios"
            />

            <FeatureCard
              icon={<SchoolIcon className="text-accent" />}
              title="Turmas"
              description="Organize e acompanhe as turmas da escola."
              to="/turmas"
            />

            <FeatureCard
              icon={<MenuBookIcon className="text-accent" />}
              title="Central Pedagógica"
              description="Planos de aula, banco de questões, atividades e resoluções."
              to="/pedagogico"
            />

            <FeatureCard
              icon={<EventIcon className="text-accent" />}
              title="Eventos"
              description="Crie e acompanhe eventos e atividades escolares."
              to="/eventos"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
