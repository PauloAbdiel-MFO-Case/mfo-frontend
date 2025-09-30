'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
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
import { useGetProjection } from '@/hooks/useGetProjection';

interface GetProjectionParams {
  simulationVersionId: number | null;
  status: 'Invalido' | 'Morto';
  calculateWithoutInsurance?: boolean;
}

function DashboardPage() {
  const searchParams = useSearchParams();
  const versionIdFromUrl = searchParams.get('versionId');

  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);
  const [status, setStatus] = useState<GetProjectionParams["status"]>('Invalido');

  const { data: simulations, isLoading: isLoadingSimulations } = useGetSimulations();
  const { data: versionDetails, isLoading: isLoadingDetails } = useGetSimulationVersionDetails(selectedVersionId);
  const { data: projectionData, isLoading: isProjectionLoading, isError: isProjectionError } = useGetProjection({
    simulationVersionId: selectedVersionId,
    status: status,
  });

  useEffect(() => {
    if (versionIdFromUrl) {
      const id = parseInt(versionIdFromUrl, 10);
      if (selectedVersionId !== id) {
        setSelectedVersionId(id);
      }
    } else if (simulations && simulations.length > 0) {
      // Check if the currently selected version still exists in the simulations list
      const selectedExists = simulations.some(s => s.id === selectedVersionId);

      if (!selectedExists) {
        // If the selected version was deleted or doesn't exist, select a new default
        const currentSituation = simulations.find(s => s.simulation.name === 'Situação Atual');
        setSelectedVersionId(currentSituation ? currentSituation.id : simulations[0].id);
      }
    } else if (simulations && simulations.length === 0 && selectedVersionId !== null) {
      // If there are no simulations left, clear the selectedVersionId
      setSelectedVersionId(null);
    }
  }, [simulations, selectedVersionId, versionIdFromUrl]);

  const { currentNetWorth, tenYearProjection } = useMemo(() => {
    if (!projectionData || !projectionData.withInsurance || projectionData.withInsurance.length === 0) {
      return { currentNetWorth: 0, tenYearProjection: 0 };
    }

    const firstYearData = projectionData.withInsurance[0];
    const current = firstYearData.financialPatrimony + firstYearData.nonFinancialPatrimony;

    const tenYearData = projectionData.withInsurance.length > 10 ? projectionData.withInsurance[10] : projectionData.withInsurance[projectionData.withInsurance.length - 1];
    const tenYear = tenYearData.financialPatrimony + tenYearData.nonFinancialPatrimony;

    return { currentNetWorth: current, tenYearProjection: tenYear };
  }, [projectionData]);

  const handleSelectSimulation = (id: number) => {
    setSelectedVersionId(id);
  }

  if (isLoadingSimulations) {
    return <div>Carregando simulações...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <ClientSelector />
      </div>
      <ClientNavTabs />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <NetWorth value={currentNetWorth} />
        </div>
        <div className="lg:col-span-2">
          <OverviewCards currentPatrimony={currentNetWorth} tenYearProjection={tenYearProjection} />
        </div>
      </div>
      
      <StatusSelector status={status} onStatusChange={setStatus} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectionCard
            simulations={simulations || []}
            selectedVersionId={selectedVersionId}
            onSelectSimulation={handleSelectSimulation}
            projectionData={projectionData}
            isProjectionLoading={isProjectionLoading}
            isProjectionError={isProjectionError}
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
