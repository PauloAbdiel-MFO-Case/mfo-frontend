'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Button } from './ui/button';
import { AddSimulationModal } from './add-simulation-modal';
import { EditSimulationModal } from './edit-simulation-modal';
import { useDeleteSimulation } from '@/hooks/useDeleteSimulation';
import { Simulation, SimulationVersion } from '@/types/simulation.types';
import { useCreateNewVersion } from '@/hooks/useCreateNewVersion';
import { ConfirmationDialog } from './confirmation-dialog';

interface EnrichedSimulationVersion extends SimulationVersion {
  finalPatrimony?: number;
}

interface EnrichedSimulation extends Omit<Simulation, 'versions'> {
  versions: EnrichedSimulationVersion[];
}

interface SimulationCardProps {
  version: EnrichedSimulationVersion;
  simulationName: string;
  onEdit: (version: EnrichedSimulationVersion) => void;
  onDelete: (versionId: number) => void;
  onCreateNewVersion: (simulationId: number) => void;
  isCurrentSituation: boolean;
}

function SimulationCard({ version, simulationName, onEdit, onDelete, onCreateNewVersion, isCurrentSituation }: SimulationCardProps) {
  return (
    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 flex flex-col justify-between min-w-[250px]">
      <div>
        <h3 className="font-bold text-lg text-cyan-400">{simulationName}</h3>
        <p className="text-sm text-gray-400">Versão: {version.name}</p>
        <p className="text-sm text-gray-400">Data: {new Date(version.createdAt).toLocaleDateString('pt-BR')}</p>
        {version.finalPatrimony !== undefined && (
          <p className="text-sm text-gray-400">Patrimônio Final: {version.finalPatrimony.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <Button size="sm" className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400" onClick={() => onEdit(version)}>Editar</Button>
        {!isCurrentSituation && (
            <Button size="sm" variant="destructive" className="flex-1" onClick={() => onDelete(version.id)}>Excluir</Button>
        )}
        <Button size="sm" className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400" onClick={() => onCreateNewVersion(version.simulationId)}>Nova Versão</Button>
      </div>
    </div>
  );
}

export function SimulationsList() {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState<EnrichedSimulationVersion | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [versionToDelete, setVersionToDelete] = useState<number | null>(null);
  const [isConfirmCreateNewVersionOpen, setIsConfirmCreateNewVersionOpen] = useState(false);
  const [simulationToCreateNewVersion, setSimulationToCreateNewVersion] = useState<number | null>(null);

  const { data: history, isLoading, error } = useQuery<EnrichedSimulation[], Error>({
    queryKey: ['simulationsHistory'], 
    queryFn: () => api.get('/simulations/history').then(res => res.data) 
  });

  const { mutate: deleteSimulation } = useDeleteSimulation();
  const { mutate: createNewVersion } = useCreateNewVersion();

  const handleDeleteClick = (versionId: number) => {
    setVersionToDelete(versionId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!versionToDelete) return;
    deleteSimulation({ versionId: versionToDelete });
    setIsConfirmDeleteOpen(false);
    setVersionToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setVersionToDelete(null);
  };

  const handleCreateNewVersionClick = (simulationId: number) => {
    setSimulationToCreateNewVersion(simulationId);
    setIsConfirmCreateNewVersionOpen(true);
  };

  const handleConfirmCreateNewVersion = () => {
    if (!simulationToCreateNewVersion) return;
    createNewVersion({ simulationId: simulationToCreateNewVersion });
    setIsConfirmCreateNewVersionOpen(false);
    setSimulationToCreateNewVersion(null);
  };

  const handleCancelCreateNewVersion = () => {
    setIsConfirmCreateNewVersionOpen(false);
    setSimulationToCreateNewVersion(null);
  };

  return (
    <>
      <section>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-cyan-400 mt-8">Simulações</h2>
          <Button size="sm" className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 mt-8" onClick={() => setAddModalOpen(true)}>+</Button>
        </div>
        
        {isLoading && <p>Carregando simulações...</p>}
        {error && <p className="text-red-500">Erro ao carregar simulações.</p>}

        <div className="flex overflow-x-auto gap-6 pb-4">
          {history?.map((simulation) => (
            <div key={simulation.id} className="flex flex-col gap-4 p-4 border border-gray-700/50 rounded-lg">
                <h3 className="font-semibold text-center text-lg">{simulation.name}</h3>
                <div className="flex gap-4">
                    {simulation.versions.map((version) => (
                        <SimulationCard 
                            key={version.id}
                            version={version}
                            simulationName={simulation.name}
                            onEdit={setEditingVersion}
                            onDelete={handleDeleteClick}
                            onCreateNewVersion={handleCreateNewVersionClick}
                            isCurrentSituation={simulation.name === 'Situação Atual'}
                        />
                    ))}
                </div>
            </div>
          ))}
        </div>
      </section>

      <AddSimulationModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

      <EditSimulationModal
        isOpen={!!editingVersion}
        onClose={() => setEditingVersion(null)}
        version={editingVersion}
      />
      <ConfirmationDialog
        isOpen={isConfirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja deletar esta versão da simulação? Esta ação não pode ser desfeita."
      />
      <ConfirmationDialog
        isOpen={isConfirmCreateNewVersionOpen}
        onClose={handleCancelCreateNewVersion}
        onConfirm={handleConfirmCreateNewVersion}
        title="Confirmar Criação de Nova Versão"
        description="Deseja criar uma nova versão baseada nesta simulação?"
      />
    </>
  );
}
