"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Movement } from "@/types/simulation.types";

export function Timeline({ movements = [] }: { movements?: Movement[] }) {
  const incomeMovements = movements.filter(m => m.type === 'ENTRADA');
  const expenseMovements = movements.filter(m => m.type === 'SAIDA');

  const timelineStartYear = 2025;
  const timelineEndYear = 2060;
  const timelineDuration = timelineEndYear - timelineStartYear;

  const calculatePosition = (dateString: string) => {
    if (!dateString) return 0;
    const eventYear = new Date(dateString).getFullYear();
    if (eventYear < timelineStartYear) return 0;
    if (eventYear > timelineEndYear) return 100;

    const percentage = ((eventYear - timelineStartYear) / timelineDuration) * 100;
    return percentage;
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Timeline</h2>
      <Card className="bg-transparent ring-1 ring-white/5">
        <CardContent className="p-8">
          <div className="relative pl-24 pr-4">
            
            <div className="relative h-12">
              <span className="absolute -left-24 top-0 text-sm font-semibold text-gray-400">Salário</span>
              <div className="absolute top-1/2 w-full h-px bg-white/20" />
              
              {incomeMovements.map(move => (
                <div key={move.id} className="absolute top-1/2" style={{ left: `${calculatePosition(move.startDate)}%` }}>
                  <div className="absolute -top-8 w-max text-xs text-gray-400 -translate-x-1/2">{move.description}: R$ {move.value.toLocaleString('pt-BR')}</div>
                  <div className="w-3 h-3 -mt-[5px] -ml-[5px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" />
                </div>
              ))}
            </div>

            <div className="relative h-12">
              <div className="absolute top-1/2 w-full border-t border-dashed border-white/10" />
              <div className="absolute -top-2 flex justify-between w-full font-semibold text-center text-gray-400">
                  <div><p>2025</p><p className="text-xs text-gray-500">45 anos</p></div>
                  <div><p>2035</p><p className="text-xs text-gray-500">55 anos</p></div>
                  <div><p>2045</p><p className="text-xs text-gray-500">65 anos</p></div>
                  <div><p>2060</p><p className="text-xs text-gray-500">80 anos</p></div>
              </div>
            </div>

            <div className="relative h-12">
              <span className="absolute -left-24 top-0 text-sm font-semibold text-gray-400">Custo de Vida</span>
              <div className="absolute top-1/2 w-full h-px bg-white/20" />

              {expenseMovements.map(move => (
                <div key={move.id} className="absolute top-1/2" style={{ left: `${calculatePosition(move.startDate)}%` }}>
                  <div className="w-3 h-3 -mt-[5px] -ml-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" />
                  <div className="absolute top-4 w-max text-xs text-gray-400 -translate-x-1/2">R$ {move.value.toLocaleString('pt-BR')}</div>
                </div>
              ))}
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}