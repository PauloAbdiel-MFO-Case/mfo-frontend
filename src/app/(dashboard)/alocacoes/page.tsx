'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AllocationCard } from "@/components/allocation-card";
import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useGetSimulations } from "@/hooks/useGetSimulations";
import { useGetSimulationVersionDetails } from "@/hooks/useGetSimulationVersionDetails";
import { AddAllocationModal } from '@/components/add-allocation-modal';
import { EditAllocationModal } from '@/components/edit-allocation-modal';

function AllocationsPageContent() {
  const searchParams = useSearchParams();
  const versionIdFromUrl = searchParams.get('versionId');

  const [selectedVersionId, setSelectedVersionId] = useState<number | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<{id: number, name: string, type: string} | null>(null);

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

  // Agrupa os registros pela alocação pai
  const groupedAllocations = versionDetails?.allocationRecords.reduce((acc, record) => {
    const key = record.allocation.id;
    if (!acc[key]) {
      acc[key] = {
        ...record.allocation,
        records: [],
      };
    }
    acc[key].records.push(record);
    return acc;
  }, {} as Record<string, { records: any[] } & { id: number; name: string; type: string; }>);


  return (
    <div className="flex flex-col gap-8">
      <ClientSelector />
      <ClientNavTabs />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Timeline de alocações manuais</h2>
        <Button onClick={() => setAddModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold gap-2">
          <PlusCircle size={18} />
          Adicionar
        </Button>
      </div>

      {isLoadingDetails && <div>Carregando alocações...</div>}
      {groupedAllocations && (
        <div className="space-y-4">
          {Object.values(groupedAllocations).map((alloc) => {
            // Pega o registro mais recente para exibir o valor e a data
            const latestRecord = alloc.records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
            
            return (
              <AllocationCard 
                key={alloc.id} 
                name={alloc.name}
                type={alloc.type}
                value={`R$ ${latestRecord.value.toLocaleString('pt-BR')}`}
                lastUpdate={new Date(latestRecord.date).toLocaleDateString('pt-BR')}
                onEdit={() => setEditingAllocation(alloc)}
                onDelete={() => handleDelete(alloc.id)}
              />
            )
          })}
        </div>
      )}
      <AddAllocationModal 
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        versionId={selectedVersionId}
      />
      <EditAllocationModal
        isOpen={!!editingAllocation}
        onClose={() => setEditingAllocation(null)}
        allocation={editingAllocation}
        versionId={selectedVersionId}
      />
    </div>
  );
}

export default function AllocationsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AllocationsPageContent />
    </Suspense>
  );
}
