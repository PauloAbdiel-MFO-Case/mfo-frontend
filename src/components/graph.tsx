"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dados estáticos que imitam a resposta da nossa API
const data = [
  { year: 2025, financialPatrimony: 165000, nonFinancialPatrimony: 850000 },
  { year: 2030, financialPatrimony: 688216, nonFinancialPatrimony: 850000 },
  { year: 2035, financialPatrimony: 1324789, nonFinancialPatrimony: 850000 },
  { year: 2040, financialPatrimony: 2099278, nonFinancialPatrimony: 850000 },
  { year: 2045, financialPatrimony: 3041562, nonFinancialPatrimony: 850000 },
  { year: 2050, financialPatrimony: 4187994, nonFinancialPatrimony: 850000 },
  { year: 2055, financialPatrimony: 5582804, nonFinancialPatrimony: 850000 },
  { year: 2060, financialPatrimony: 5849895, nonFinancialPatrimony: 850000 },
];

// Formata os números para o padrão R$ (ex: 1.2M)
const formatYAxis = (tick: number) => {
  if (tick >= 1000000) {
    return `R$ ${(tick / 1000000).toFixed(1)}M`;
  }
  if (tick >= 1000) {
    return `R$ ${(tick / 1000).toFixed(0)}K`;
  }
  return `R$ ${tick}`;
};

export function Graph() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
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