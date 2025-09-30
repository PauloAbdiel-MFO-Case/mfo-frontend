import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Graph } from "@/components/graph";
import { SimulationListItem } from "@/types/simulation.types";
import { EditSimulationModal } from "./edit-simulation-modal";
import { AddSimulationModal } from "./add-simulation-modal";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FullProjectionResult } from "@/types/projection.types";
import { ProjectionTable } from "./projection-table";
import { useGetProjection } from "@/hooks/useGetProjection";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeleteSimulation } from "@/hooks/useDeleteSimulation";
import { ConfirmationDialog } from "./confirmation-dialog";
import { useCreateNewVersion } from "@/hooks/useCreateNewVersion";
import { toast } from "sonner";

type ViewMode = 'graph' | 'table';

interface ProjectionCardProps {
  simulations: SimulationListItem[];
  selectedVersionId: number | null;
  onSelectSimulation: (id: number) => void;
}

export function ProjectionCard({
  simulations,
  selectedVersionId,
  onSelectSimulation,
}: ProjectionCardProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [editingSimulation, setEditingSimulation] = useState<SimulationListItem | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('graph');
  const [showWithoutInsurance, setShowWithoutInsurance] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [simulationToDelete, setSimulationToDelete] = useState<number | null>(null);

  const { data: projectionData, isLoading: isProjectionLoading, isError: isProjectionError } = useGetProjection({
    simulationVersionId: selectedVersionId,
    status: 'Invalido',
    calculateWithoutInsurance: showWithoutInsurance,
  });

  const { mutate: deleteSimulation } = useDeleteSimulation();
  const { mutate: createNewVersion } = useCreateNewVersion();

  const handleDeleteClick = (versionId: number) => {
    setSimulationToDelete(versionId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!simulationToDelete) return;
    deleteSimulation({ versionId: simulationToDelete });
    setIsConfirmDeleteOpen(false);
    setSimulationToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSimulationToDelete(null);
  };

  const handleCreateNewVersion = (simulationId: number) => {
    createNewVersion(simulationId, {
      onSuccess: () => {
        toast.success("Nova versão criada com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao criar nova versão.");
      },
    });
  };

  return (
    <>
      <Card className="bg-gradient-to-b from-white/[.01] to-white/[.015] rounded-2xl p-2 sm:p-6 ring-1 ring-white/5 shadow-2xl shadow-black/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-gray-200">Projeção Patrimonial</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="without-insurance"
                checked={showWithoutInsurance}
                onCheckedChange={setShowWithoutInsurance}
              />
              <Label htmlFor="without-insurance" className="text-gray-300">Sem Seguros</Label>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('graph')}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  viewMode === 'graph'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                Gráfico
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('table')}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  viewMode === 'table'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                Tabela
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'graph' ? (
            <Graph
              projectionData={projectionData?.withInsurance}
              projectionDataWithoutInsurance={projectionData?.withoutInsurance}
              isLoading={isProjectionLoading}
              isError={isProjectionError}
            />
          ) : (
            <ProjectionTable
              projectionData={projectionData?.withInsurance}
              projectionDataWithoutInsurance={projectionData?.withoutInsurance}
              isLoading={isProjectionLoading}
              isError={isProjectionError}
            />
          )}

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {simulations.map(sim => (
              <div key={sim.id} className="flex items-center ring-1 ring-white/10 rounded-lg bg-white/5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        key={sim.id}
                        onClick={() => onSelectSimulation(sim.id)}
                        variant="ghost"
                        onMouseEnter={() => setHovered(sim.id)}
                        onMouseLeave={() => setHovered(null)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedVersionId === sim.id
                          ? "bg-green-500/20 text-green-400 border border-green-500/40 shadow-md shadow-green-500/20"
                          : hovered === sim.id
                          ? "bg-orange/50 text-white border border-orange/20"
                          : "bg-orange/50 text-gray-400 border border-orange/10 hover:bg-orange/10 hover:text-orange"
                      }`}
                      >
                        {sim.simulation.name}
                        {!sim.isLatest && (
                          <span className="ml-2 text-yellow-500 text-xs">(Legado)</span>
                        )}
                      </Button>
                    </TooltipTrigger>
                    {!sim.isLatest && (
                      <TooltipContent className="bg-[#1b1b1b] border-white/10 text-white">
                        <p>Versão legado – não editável</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
                    <DropdownMenuItem onSelect={() => handleCreateNewVersion(sim.simulation.id)} className="focus:bg-white/10">
                      Criar nova versão
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setEditingSimulation(sim)} className="focus:bg-white/10" disabled={!sim.isLatest}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onSelect={() => handleDeleteClick(sim.id)}
                      className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                      disabled={sim.simulation.name === 'Situação Atual'}
                    >
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
             <Button
              onClick={() => setAddModalOpen(true)}
              className="rounded-full px-4 py-2 text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 hover:text-white shadow-md shadow-blue-500/20 transition-all"
            >
              + Adicionar Simulação
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditSimulationModal
        isOpen={!!editingSimulation}
        simulation={editingSimulation}
        onClose={() => setEditingSimulation(null)}
      />

      <AddSimulationModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        sourceVersionId={selectedVersionId}
      />
      <ConfirmationDialog
        isOpen={isConfirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja deletar esta simulação? Esta ação não pode ser desfeita."
      />
    </>
  );
}