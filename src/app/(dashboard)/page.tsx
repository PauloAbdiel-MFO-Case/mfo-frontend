'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { InsurancesList } from "@/components/insurances-list";
import { MovementsList } from "@/components/movements-list";
import { NetWorth } from "@/components/net-worth";
import { OverviewCards } from "@/components/overview-cards";
import { StatusSelector } from "@/components/status-selector";
import { Suggestions } from "@/components/suggestions";
import { ProjectionCard } from "@/components/projection-card";
import { useGetSimulations } from "@/hooks/useGetSimulations";
import { Timeline } from "@/components/timeline";
import { useGetSimulationVersionDetails } from "@/hooks/useGetSimulationVersionDetails";

function DashboardPage() {
  const searchParams = useSearchParams();
  const versionIdFromUrl = searchParams.get('versionId');

  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);

  const { data: simulations, isLoading: isLoadingSimulations } = useGetSimulations();
  const { data: versionDetails, isLoading: isLoadingDetails } = useGetSimulationVersionDetails(selectedVersionId);

  useEffect(() => {
    if (versionIdFromUrl) {
      const id = parseInt(versionIdFromUrl, 10);
      if (selectedVersionId !== id) {
        setSelectedVersionId(id);
      }
    } else if (simulations && simulations.length > 0 && !selectedVersionId) {
      setSelectedVersionId(simulations[0].id);
    }
  }, [simulations, selectedVersionId, versionIdFromUrl]);

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
            <MovementsList movements={versionDetails.movements} versionId={selectedVersionId} />
            <InsurancesList insurances={versionDetails.insurances} versionId={selectedVersionId} />
          </div>
        </>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardPage />
    </Suspense>
  )
}
