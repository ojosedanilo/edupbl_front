import { useState } from "react";
import {
  FeatureLayout,
  type FeatureTab,
} from "@/components/layout/FeatureLayout";
import { OccurrencesTable } from "@/components/dashboard/OccurrencesTable";

// Tabs disponíveis para Ocorrências
const tabs: FeatureTab[] = [
  { id: "listar", label: "Listar" },
  { id: "criar", label: "Nova ocorrência" },
];

export default function OccurrencesPage() {
  const [activeTab, setActiveTab] = useState<string>("listar");

  return (
    <FeatureLayout
      title="Ocorrências"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "listar" && (
        <div className="flex flex-col gap-6">
          {/* Futuramente: barra de busca / filtros aqui */}
          <OccurrencesTable />
        </div>
      )}

      {activeTab === "criar" && (
        <div className="rounded-2xl border border-text-reverse/20 bg-text-reverse/10 p-8 text-text-reverse backdrop-blur-sm">
          {/* Futuramente: <OccurrenceForm /> */}
          <p className="text-text-reverse/70">
            Formulário de nova ocorrência (em construção).
          </p>
        </div>
      )}
    </FeatureLayout>
  );
}
