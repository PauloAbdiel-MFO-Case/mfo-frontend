"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ProjectionResult } from "@/types/projection.types";

const formatYAxis = (tick: number) => {
  if (tick >= 1000000) {
    return `R$ ${(tick / 1000000).toFixed(1)}M`;
  }
  if (tick >= 1000) {
    return `R$ ${(tick / 1000).toFixed(0)}K`;
  }
  return `R$ ${tick}`;
};

interface GraphProps {
  projectionData: ProjectionResult[] | undefined;
  projectionDataWithoutInsurance?: ProjectionResult[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function Graph({
  projectionData,
  projectionDataWithoutInsurance,
  isLoading,
  isError,
}: GraphProps) {
  if (isLoading) {
    return (
      <div className="h-[250px] w-full flex items-center justify-center text-gray-400">
        Carregando projeção...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[250px] w-full flex items-center justify-center text-red-400">
        Erro ao carregar dados.
      </div>
    );
  }

  if (!projectionData || projectionData.length === 0) {
    return (
      <div className="h-[250px] w-full flex items-center justify-center text-orange-400">
        Aguardando seleção ou dados indisponíveis...
      </div>
    );
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
              <stop offset="5%" stopColor="#2de27a" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#2de27a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNonFinancial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2bb7ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#2bb7ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotalWithoutInsurance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="year"
            stroke="#9aa0a6"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9aa0a6"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
          />
          <Tooltip
            contentStyle={{
              background: "#141414",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#ffffff" }}
          />

          <Area
            type="monotone"
            dataKey="nonFinancialPatrimony"
            stackId="1"
            stroke="#2bb7ff"
            strokeDasharray="4 4"
            fill="url(#colorNonFinancial)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="financialPatrimony"
            stackId="1"
            stroke="#2de27a"
            strokeDasharray="4 4"
            fill="url(#colorFinancial)"
            strokeWidth={2}
          />
          {projectionDataWithoutInsurance && (
            <Area
              type="monotone"
              dataKey="totalPatrimony"
              data={projectionDataWithoutInsurance}
              stroke="#ffc658"
              strokeDasharray="4 4"
              fill="url(#colorTotalWithoutInsurance)"
              strokeWidth={2}
              name="Total s/ Seguros"
              stackId="2"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
