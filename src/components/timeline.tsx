"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Movement } from "@/types/simulation.types";

export function Timeline({ movements = [] }: { movements?: Movement[] }) {
  const incomeMovements = movements.filter(m => m.type === "ENTRADA");
  const expenseMovements = movements.filter(m => m.type === "SAIDA");

  const timelineStartYear = 2025;
  const timelineEndYear = 2060;
  const timelineDuration = timelineEndYear - timelineStartYear;

  const calculatePosition = (dateString: string) => {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();

    if (year < timelineStartYear) return 0;
    if (year > timelineEndYear) return 100;

    const yearOffset = (year - timelineStartYear) + month / 12;
    const percentage = (yearOffset / timelineDuration) * 100;
    return percentage;
  };

  const adjustPositions = (items: any[]) => {
    const spacing = 4; // % mínimo entre pontos
    let lastPos = -spacing;
    return items.map((item, idx) => {
      let pos = item.pos;
      if (pos - lastPos < spacing) {
        pos = lastPos + spacing;
      }
      lastPos = pos;
      return { ...item, pos, idx };
    });
  };

  const incomes = adjustPositions(
    incomeMovements.map(m => ({
      ...m,
      pos: calculatePosition(m.startDate),
    }))
  );

  const expenses = adjustPositions(
    expenseMovements.map(m => ({
      ...m,
      pos: calculatePosition(m.startDate),
    }))
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Timeline</h2>
      <Card className="bg-transparent ring-1 ring-white/5">
        <CardContent className="p-8">
          <div className="relative pl-32 pr-4">

            {/* Linha de entradas */}
            <div className="relative h-24">
              <span className="absolute -left-32 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                Salário
              </span>
              <div className="absolute top-1/2 w-full h-px bg-white/20" />

              {incomes.map((move, i) => (
                <div
                  key={move.id}
                  className="absolute top-1/2"
                  style={{ left: `${move.pos}%` }}
                >
                  {/* Linha vertical */}
                  <div className="absolute top-[-40px] w-px h-20 bg-white/20 left-1/2 -translate-x-1/2" />

                  {/* Label alternando cima/baixo */}
                  <div
                    className={`absolute w-max text-xs text-gray-400 -translate-x-1/2 ${
                      i % 2 === 0 ? "-top-10" : "top-4"
                    }`}
                  >
                    {move.description}: R$ {move.value.toLocaleString("pt-BR")}
                  </div>

                  {/* Bolinha */}
                  <div className="w-3 h-3 -mt-[6px] -ml-[6px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" />
                </div>
              ))}
            </div>

            {/* Linha central da timeline */}
            <div className="relative h-24">
              <span className="absolute -left-32 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                Ano / Idade
              </span>
              <div className="absolute top-1/2 w-full border-t border-dashed border-white/10" />

              {/* Marcas principais */}
              <div className="absolute top-1/2 w-full flex justify-between text-center">
                <div className="-translate-x-1/2">
                  <p className="text-sm font-semibold text-gray-400">2025</p>
                  <p className="text-xs text-gray-500">45 anos</p>
                </div>
                <div className="-translate-x-1/2">
                  <p className="text-sm font-semibold text-gray-400">2035</p>
                  <p className="text-xs text-gray-500">55 anos</p>
                </div>
                <div className="-translate-x-1/2">
                  <p className="text-sm font-semibold text-gray-400">2045</p>
                  <p className="text-xs text-gray-500">65 anos</p>
                </div>
                <div className="-translate-x-1/2">
                  <p className="text-sm font-semibold text-gray-400">2060</p>
                  <p className="text-xs text-gray-500">80 anos</p>
                </div>
              </div>
            </div>

            {/* Linha de saídas */}
            <div className="relative h-24">
              <span className="absolute -left-32 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                Custo de Vida
              </span>
              <div className="absolute top-1/2 w-full h-px bg-white/20" />

              {expenses.map((move, i) => (
                <div
                  key={move.id}
                  className="absolute top-1/2"
                  style={{ left: `${move.pos}%` }}
                >
                  {/* Linha vertical */}
                  <div className="absolute top-0 w-px h-10 bg-white/20 left-1/2 -translate-x-1/2" />

                  {/* Bolinha */}
                  <div className="w-3 h-3 -mt-[6px] -ml-[6px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" />

                  {/* Label alternando cima/baixo */}
                  <div
                    className={`absolute w-max text-xs text-gray-400 -translate-x-1/2 ${
                      i % 2 === 0 ? "top-4" : "top-8"
                    }`}
                  >
                    R$ {move.value.toLocaleString("pt-BR")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
