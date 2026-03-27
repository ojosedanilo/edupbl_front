import { cn } from "@/utils/cn";

export type OccurrenceFilter = "pendente" | "todos" | "concluido";

type FilterTabsProps = {
  value: OccurrenceFilter;
  onChange: (v: OccurrenceFilter) => void;
  className?: string;
};

const tabs: { id: OccurrenceFilter; label: string }[] = [
  { id: "pendente", label: "pendente" },
  { id: "todos", label: "Todos" },
  { id: "concluido", label: "Concuido" },
];

export function FilterTabs({ value, onChange, className }: FilterTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-6 text-lg text-white md:gap-10 md:text-2xl",
        className,
      )}
      role="tablist"
      aria-label="Filtro de ocorrências"
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-full px-1 pb-1 transition",
            value === t.id
              ? "font-semibold underline decoration-2 underline-offset-8"
              : "opacity-80 hover:opacity-100",
          )}
        >
          {t.label}
        </button>
      ))}
      <span
        className="ml-auto hidden font-semibold text-white/90 md:inline"
        aria-hidden
      >
        Nova ocorrencia
      </span>
    </div>
  );
}
