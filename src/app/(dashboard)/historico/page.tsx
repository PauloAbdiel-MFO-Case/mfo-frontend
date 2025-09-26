import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { HistoryCard } from "@/components/history-card";
import { PaginationControls } from "@/components/pagination-controls";

const historyData = [
  {
    simulationName: "Plano original",
    versions: [
      { date: "01/02/25", finalPatrimony: "R$ 4.132.500", retirementAge: 68, version: 1 },
      { date: "04/05/25", finalPatrimony: "R$ 3.587.420", retirementAge: 68, version: 2 },
    ]
  },
  {
    simulationName: "Adiantar aposentadoria 3 anos",
    versions: []
  },
  {
    simulationName: "Aposentadoria na praia",
    versions: []
  }
];

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <ClientSelector />
      </div>

      <ClientNavTabs />

      <h2 className="text-2xl font-bold text-white">Histórico de simulações</h2>

      <div className="space-y-6">
        {historyData.map((sim, index) => (
            <HistoryCard key={index} simulationName={sim.simulationName} versions={sim.versions} />
        ))}
      </div>
      
      <PaginationControls />
    </div>
  );
}