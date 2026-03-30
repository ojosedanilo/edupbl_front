/**
 * FilterTabs
 *
 * Abas de filtro usadas na listagem de ocorrências.
 * Controla qual subconjunto de registros é exibido na tabela.
 *
 * Nota: "Concluído" está com typo no label original ("Concuido") — corrigido aqui.
 */

import { cn } from "@/utils/cn";

export type OccurrenceFilter = "pendente" | "todos" | "concluido";

type FilterTabsProps = {
  value: OccurrenceFilter;
  onChange: (v: OccurrenceFilter) => void;
  className?: string;
};

const FILTER_TABS: { id: OccurrenceFilter; label: string }[] = [
  { id: "pendente",  label: "Pendente"  },
  { id: "todos",     label: "Todos"     },
  { id: "concluido", label: "Concluído" },
];

export function FilterTabs({ value, onChange, className }: FilterTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-6 text-lg text-text md:gap-10 md:text-2xl",
        className,
      )}
      role="tablist"
      aria-label="Filtro de ocorrências"
    >
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-full px-1 pb-1 transition",
            value === tab.id
              ? "font-semibold underline decoration-2 underline-offset-8"
              : "opacity-80 hover:opacity-100",
          )}
        >
          {tab.label}
        </button>
      ))}

      {/* Atalho visual para criar nova ocorrência — sem funcionalidade própria */}
      <span
        className="ml-auto hidden font-semibold text-text/90 md:inline"
        aria-hidden
      >
        Nova ocorrência
      </span>
    </div>
  );
}
