import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GradientBackdrop } from "@/components/layout/GradientBackdrop";
import { cn } from "@/utils/cn";

export type FeatureTab = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type FeatureLayoutProps = {
  /** Título da feature, ex: "Ocorrências" */
  title: string;
  /** Tabs de ação, ex: [{id: "listar", label: "Listar"}, {id: "criar", label: "Criar"}] */
  tabs?: FeatureTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** Conteúdo principal */
  children: ReactNode;
  className?: string;
};

/**
 * Layout padrão para páginas de feature (Ocorrências, Usuários, etc.).
 * Inclui cabeçalho com botão voltar, título e tabs de ação.
 *
 * Uso:
 *   <FeatureLayout title="Ocorrências" tabs={tabs} activeTab={tab} onTabChange={setTab}>
 *     {tab === "listar" && <OccurrenceList />}
 *     {tab === "criar" && <OccurrenceForm />}
 *   </FeatureLayout>
 */
export function FeatureLayout({
  title,
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
}: FeatureLayoutProps) {
  return (
    <div className="relative min-h-screen w-full">
      <GradientBackdrop />
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10",
          className,
        )}
      >
        {/* Cabeçalho da feature */}
        <header className="flex flex-wrap items-center gap-4">
          <Link
            to="/inicio"
            className="rounded-full bg-surface/10 px-4 py-2 text-sm font-medium text-text backdrop-blur-sm transition hover:bg-surface/20"
            aria-label="Voltar ao início"
          >
            ← Voltar
          </Link>
          <h1 className="text-2xl font-bold text-text md:text-3xl">{title}</h1>
        </header>

        {/* Tabs de ação */}
        {tabs && tabs.length > 0 && (
          <nav
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={`Ações de ${title}`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2 bg-bg text-text text-sm font-semibold transition",
                  activeTab === tab.id
                    ? "bg-surface text-primary shadow-md"
                    : "bg-surface/60 text-text backdrop-blur-sm hover:bg-surface/80",
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Conteúdo principal */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
