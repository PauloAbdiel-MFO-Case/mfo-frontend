"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Movement } from "@/types/simulation.types";
import { cn } from "@/lib/utils";

interface TimelineProps {
  movements?: Movement[];
}

export function Timeline({ movements = [] }: TimelineProps) {
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

  // Quebra os movimentos por tipo
  const incomes = movements.filter(m => m.type === "ENTRADA").map(m => ({
    ...m,
    pos: calculatePosition(m.startDate),
  }));

  const expenses = movements.filter(m => m.type === "SAIDA").map(m => ({
    ...m,
    pos: calculatePosition(m.startDate),
  }));

  // Gera grid de anos dinâmico
  const yearMarks = [];
  for (let year = timelineStartYear; year <= timelineEndYear; year += 10) {
    const age = 45 + (year - timelineStartYear);
    yearMarks.push({ year, age });
  }

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
                  <div className="absolute top-[-32px] w-px h-16 bg-white/20 left-1/2 -translate-x-1/2" />

                  {/* Label */}
                  <div
                    className={cn(
                      "absolute w-max text-xs text-gray-300 font-medium -translate-x-1/2",
                      i % 2 === 0 ? "-top-8" : "top-4"
                    )}
                  >
                    {move.description}: R$ {move.value.toLocaleString("pt-BR")}
                  </div>

                  {/* Bolinha */}
                  <div className="w-3 h-3 -mt-[6px] -ml-[6px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" />
                </div>
              ))}
            </div>

            {/* Linha central - Anos/Idades */}
            <div className="relative h-24">
              <span className="absolute -left-32 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                Ano / Idade
              </span>
              <div className="absolute top-1/2 w-full border-t border-dashed border-white/10" />

              <div className="absolute top-1/2 w-full flex justify-between text-center">
                {yearMarks.map(mark => (
                  <div
                    key={mark.year}
                    style={{ left: `${((mark.year - timelineStartYear) / timelineDuration) * 100}%` }}
                    className="absolute -translate-x-1/2"
                  >
                    <p className="text-sm font-semibold text-gray-400">{mark.year}</p>
                    <p className="text-xs text-gray-500">{mark.age} anos</p>
                  </div>
                ))}
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

                  {/* Label */}
                  <div
                    className={cn(
                      "absolute w-max text-xs text-gray-300 font-medium -translate-x-1/2",
                      i % 2 === 0 ? "top-4" : "top-8"
                    )}
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
