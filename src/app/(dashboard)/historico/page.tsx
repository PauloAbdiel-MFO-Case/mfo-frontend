'use client';

import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { HistoryCard } from "@/components/history-card";
import { PaginationControls } from "@/components/pagination-controls";
import { useGetHistory } from "@/hooks/useGetHistory";

export default function HistoryPage() {
  const { data: historyData, isLoading, isError } = useGetHistory();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <ClientSelector />
      </div>

      <ClientNavTabs />

      <h2 className="text-2xl font-bold text-white">Histórico de simulações</h2>

      {isLoading && <div>Carregando histórico...</div>}
      {isError && <div>Ocorreu um erro ao buscar o histórico.</div>}
      {historyData && (
        <div className="space-y-6">
          {historyData.map((sim: any, index: number) => (
              <HistoryCard key={index} simulationName={sim.name} versions={sim.versions} />
          ))}
        </div>
      )}
      
      <PaginationControls />
    </div>
  );
}