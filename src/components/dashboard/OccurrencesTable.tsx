import { cn } from "@/utils/cn";

const columns = ["Nome", "Problema", "Data", "Professor", "Status"] as const;

type Row = Record<(typeof columns)[number], string>;

type OccurrencesTableProps = {
  rows?: Row[];
  className?: string;
};

export function OccurrencesTable({
  rows = [],
  className,
}: OccurrencesTableProps) {
  const placeholderRows =
    rows.length > 0
      ? rows
      : Array.from({ length: 5 }, (_, i) => ({
          Nome: "—",
          Problema: "—",
          Data: "—",
          Professor: "—",
          Status: i === 0 ? "pendente" : "—",
        }));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[20px] border border-white/40 bg-white/10 backdrop-blur-sm",
        className,
      )}
    >
      <div
        className={cn(
          "grid grid-cols-[1.2fr_1.4fr_0.9fr_1fr_0.9fr] gap-0 border-b border-white/30",
          "bg-gradient-to-r from-transparent via-white/5 to-transparent px-4 py-3 text-sm font-medium text-white md:text-base",
        )}
      >
        {columns.map((c) => (
          <div key={c} className="px-2">
            {c}
          </div>
        ))}
      </div>
      <div className="divide-y divide-white/20">
        {placeholderRows.map((row, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1.2fr_1.4fr_0.9fr_1fr_0.9fr] px-4 py-4 text-sm text-white/95 md:text-base"
          >
            {columns.map((c) => (
              <div key={c} className="truncate px-2">
                {row[c]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
