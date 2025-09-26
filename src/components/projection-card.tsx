import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Graph } from "@/components/graph";
import { SimulationListItem } from "@/types/simulation.types"; // Importe o tipo

// O componente agora recebe props
interface ProjectionCardProps {
  simulations: SimulationListItem[];
  selectedVersionId: number | null;
  onSelectSimulation: (id: number) => void;
}

export function ProjectionCard({ simulations, selectedVersionId, onSelectSimulation }: ProjectionCardProps) {
    return (
        <Card className="bg-gradient-to-b from-white/[.01] to-white/[.015] rounded-2xl ...">
            <CardHeader>
                <CardTitle className="text-gray-200">Projeção Patrimonial</CardTitle>
            </CardHeader>
            <CardContent>
                {/* O gráfico agora recebe o ID selecionado como prop */}
                <Graph simulationVersionId={selectedVersionId} />

                {/* Os botões/chips agora são dinâmicos */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {simulations.map(sim => (
                    <Button 
                      key={sim.id}
                      onClick={() => onSelectSimulation(sim.id)}
                      variant="outline"
                      className={
                        selectedVersionId === sim.id
                          ? "text-white border-green-500/50 bg-green-500/10 ring-2 ring-green-500/20"
                          : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                      }
                    >
                      {sim.simulation.name}
                    </Button>
                  ))}
                  <Button variant="outline" className="border-white/10 bg-transparent ...">+ Adicionar Simulação</Button>
                </div>
            </CardContent>
        </Card>
    )
}