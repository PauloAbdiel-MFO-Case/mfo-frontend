"use client"; // Componente agora processa dados e pode ter interatividade

import { Card, CardContent } from "@/components/ui/card";
import { Movement } from "@/types/simulation.types"; // Importa o nosso tipo

// O componente agora recebe a lista de movimentações como prop
export function Timeline({ movements = [] }: { movements?: Movement[] }) {

  // 1. Filtramos as movimentações para separar entradas e saídas
  const incomeMovements = movements.filter(m => m.type === 'ENTRADA');
  const expenseMovements = movements.filter(m => m.type === 'SAIDA');

  // 2. Lógica para calcular a posição na timeline (de 2025 a 2060)
  const timelineStartYear = 2025;
  const timelineEndYear = 2060;
  const timelineDuration = timelineEndYear - timelineStartYear;

  const calculatePosition = (dateString: string) => {
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
        <CardContent className="p-8 relative">
          <div className="relative pl-20">
            <div className="flex flex-col justify-between h-40 relative">

              {/* --- EIXO SUPERIOR (SALÁRIO) - DINÂMICO --- */}
              <div className="relative w-full">
                <div className="absolute -top-6 w-full h-px">
                  {incomeMovements.map(move => (
                    <span key={move.id} className="absolute text-xs text-gray-400" style={{ left: `${calculatePosition(move.startDate)}%` }}>
                      {move.description}: R$ {move.value.toLocaleString('pt-BR')}
                    </span>
                  ))}
                </div>
                <div className="h-px w-full bg-white/20" />
                {incomeMovements.map(move => (
                  <div key={move.id} className="absolute w-3 h-3 -mt-[5px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: `${calculatePosition(move.startDate)}%` }} />
                ))}
              </div>

              {/* --- EIXO CENTRAL TRACEJADO --- */}
              <div className="absolute top-0 bottom-0 flex justify-between w-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center w-px h-full">
                    <div className="w-px h-full border-l border-dashed border-white/10"></div>
                  </div>
                ))}
              </div>

              {/* --- EIXO INFERIOR (CUSTO DE VIDA) - DINÂMICO --- */}
              <div className="relative w-full">
                <div className="h-px w-full bg-white/20" />
                {expenseMovements.map(move => (
                   <div key={move.id} className="absolute w-3 h-3 -mt-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: `${calculatePosition(move.startDate)}%` }} />
                ))}
                <div className="absolute top-4 w-full h-px">
                   {expenseMovements.map(move => (
                    <span key={move.id} className="absolute text-xs text-gray-400" style={{ left: `${calculatePosition(move.startDate)}%` }}>
                      R$ {move.value.toLocaleString('pt-BR')}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
           {/* --- LEGENDAS DE ANO/IDADE (EMBAIXO DE TUDO) --- */}
           <div className="flex justify-between mt-12 font-semibold text-center text-gray-400 pl-20">
              <div><p>2025</p><p className="text-xs text-gray-500">45 anos</p></div>
              <div><p>2035</p><p className="text-xs text-gray-500">55 anos</p></div>
              <div><p>2045</p><p className="text-xs text-gray-500">65 anos</p></div>
              <div><p>2060</p><p className="text-xs text-gray-500">80 anos</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}