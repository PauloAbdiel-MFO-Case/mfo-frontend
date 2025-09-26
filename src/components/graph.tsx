"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetProjection } from "@/hooks/useGetProjection";

// Helper para formatar o eixo Y do gráfico
const formatYAxis = (tick: number) => {
  if (tick >= 1000000) {
    return `R$ ${(tick / 1000000).toFixed(1)}M`;
  }
  if (tick >= 1000) {
    return `R$ ${(tick / 1000).toFixed(0)}K`;
  }
  return `R$ ${tick}`;
};

export function Graph({ simulationVersionId }: { simulationVersionId: number | null }) {
  const { data: projectionData, isLoading, isError } = useGetProjection({
    simulationVersionId: simulationVersionId,
    status: 'Vivo',
  });

  if (isLoading) {
    return <div className="h-[250px] w-full flex items-center justify-center text-gray-400">Carregando projeção...</div>;
  }

  if (isError) {
    return <div className="h-[250px] w-full flex items-center justify-center text-red-400">Erro ao carregar dados.</div>;
  }

  if (!Array.isArray(projectionData)) {
    return <div className="h-[250px] w-full flex items-center justify-center text-orange-400">Aguardando seleção...</div>;
  }

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={projectionData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2de27a" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2de27a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNonFinancial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2bb7ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#2bb7ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" stroke="#9aa0a6" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9aa0a6" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
          <Tooltip
            contentStyle={{
              background: "#141414",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
            }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Area
            type="monotone"
            dataKey="nonFinancialPatrimony"
            stackId="1"
            stroke="#2bb7ff"
            fill="url(#colorNonFinancial)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="financialPatrimony"
            stackId="1"
            stroke="#2de27a"
            fill="url(#colorFinancial)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}