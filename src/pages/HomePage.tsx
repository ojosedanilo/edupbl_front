import { useCurrentUser, useLogout } from "@/features/auth/hooks/useAuth";
import { usePermissions } from "@/features/auth/hooks/usePermissions";
import { FEATURE_CARDS } from "@/components/dashboard/featureCards";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { Button } from "@/components/ui/Button";
import LogoPBL from "@/assets/logo_pbl.svg";

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
  const { canAny, isLoading: isLoadingPermissions } = usePermissions();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // Cards que o usuário tem permissão de ver
  const visibleCards = FEATURE_CARDS.filter(
    (card) =>
      card.requiredPermissions.length === 0 ||
      canAny(...card.requiredPermissions),
  );

  return (
    <div className="relative min-h-screen w-full">
      <GradientBackdrop />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
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

        <section>
          <h2 className="mb-4 text-lg font-semibold text-light/90">
            O que você quer fazer?
          </h2>

          {isLoadingPermissions ? (
            <p className="text-light/60">Carregando…</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCards.map((card) => (
                <FeatureCard
                  key={card.to}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  to={card.to}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
