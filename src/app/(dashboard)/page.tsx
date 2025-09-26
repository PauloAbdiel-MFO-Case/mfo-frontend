"use client";

import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { InsurancesList } from "@/components/insurances-list";
import { MovementsList } from "@/components/movements-list";
import { NetWorth } from "@/components/net-worth";
import { OverviewCards } from "@/components/overview-cards";
import { StatusSelector } from "@/components/status-selector"; 
import { Suggestions } from "@/components/suggestions";
import { useEffect } from "react";
import { Header } from "@/components/header";
import { ProjectionCard } from "@/components/projection-card";
import { useGetSimulations } from "@/hooks/useGetSimulations";
import { Timeline } from "@/components/timeline";
import { useState } from "react";
import { useGetSimulationVersionDetails } from "@/hooks/useGetSimulationVersionDetails";

export default function Page() {
  // 1. Hook para gerenciar o ID da versão selecionada
  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);

  // 2. Busca a lista de simulações
  const { data: simulations, isLoading: isLoadingSimulations } = useGetSimulations();
  const { data: versionDetails, isLoading: isLoadingDetails } = useGetSimulationVersionDetails(selectedVersionId);

  // 3. Efeito para selecionar a primeira simulação da lista quando ela carregar
  useEffect(() => {
    if (simulations && simulations.length > 0 && !selectedVersionId) {
      setSelectedVersionId(simulations[0].id);
    }
  }, [simulations, selectedVersionId]);
  
  // Função para mudar a seleção (usaremos nos botões/chips depois)
  const handleSelectSimulation = (id: number) => {
    setSelectedVersionId(id);
  }

  if (isLoadingSimulations) {
    return <div>Carregando simulações...</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <ClientSelector />
      </div>
      <ClientNavTabs />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <NetWorth />
        </div>
        <div className="lg:col-span-2">
          <OverviewCards />
        </div>
      </div>
      
      {/* ADICIONADO AQUI */}
      <StatusSelector />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectionCard
            simulations={simulations || []}
            selectedVersionId={selectedVersionId}
            onSelectSimulation={handleSelectSimulation}
          />
        </div>
        <div className="lg:col-span-1">
          <Suggestions />
        </div>
      </div>
      
      {versionDetails && (
        <>
          <Timeline movements={versionDetails.movements} />
          <div>
            <MovementsList movements={versionDetails.movements} />
            <InsurancesList insurances={versionDetails.insurances} />
          </div>
        </>
      )}
    </div>
  )
}