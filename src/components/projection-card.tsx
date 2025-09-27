"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Graph } from "@/components/graph";
import { SimulationListItem } from "@/types/simulation.types";
import { EditSimulationModal } from "./edit-simulation-modal";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProjectionCardProps {
  simulations: SimulationListItem[];
  selectedVersionId: number | null;
  onSelectSimulation: (id: number) => void;
}

export function ProjectionCard({ simulations, selectedVersionId, onSelectSimulation }: ProjectionCardProps) {
  const [editingSimulation, setEditingSimulation] = useState<SimulationListItem | null>(null);

  return (
    <>
      <Card className="bg-gradient-to-b from-white/[.01] to-white/[.015] rounded-2xl p-2 sm:p-6 ring-1 ring-white/5 shadow-2xl shadow-black/60">
        <CardHeader>
          <CardTitle className="text-gray-200">Projeção Patrimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <Graph simulationVersionId={selectedVersionId} />

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {simulations.map(sim => (
              <div key={sim.id} className="flex items-center ring-1 ring-white/10 rounded-lg bg-white/5">
                <Button
                  onClick={() => onSelectSimulation(sim.id)}
                  variant="ghost"
                  className={
                    selectedVersionId === sim.id
                      ? "text-white bg-green-500/10 hover:bg-green-500/20"
                      : "text-gray-300 hover:bg-white/10"
                  }
                >
                  {sim.simulation.name}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
                    <DropdownMenuItem onSelect={() => setEditingSimulation(sim)} className="focus:bg-white/10">
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
            <Button variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/10">+ Adicionar Simulação</Button>
          </div>
        </CardContent>
      </Card>

      <EditSimulationModal 
        isOpen={!!editingSimulation}
        simulation={editingSimulation}
        onClose={() => setEditingSimulation(null)}
      />
    </>
  );
}