"use client"; // Precisa ser um Client Component para ter estado (useState)

import { useState } from "react";
import { MovementCard } from "./movement-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// 1. Adicionamos uma categoria a cada movimentação para podermos filtrar
const movementsData = [
  { type: 'credit', title: 'Herança', details: '09/07/23 - Frequência: Única', amount: 'R$ 220.000', category: 'financeira' },
  { type: 'debit', title: 'Custo do Filho', details: '09/07/23 - Frequência: Mensal', amount: 'R$ 1.500', category: 'financeira' },
  { type: 'credit', title: 'Comissão', details: '09/07/23 - Frequência: Anual', amount: 'R$ 500.000', category: 'financeira' },
  { type: 'debit', title: 'Compra de Imóvel', details: '09/07/23 - Frequência: Única', amount: 'R$ 1.500.000', category: 'imobilizada' },
];

export function MovementsList() {
  // 2. Adicionamos um estado para controlar qual filtro está ativo
  const [activeFilter, setActiveFilter] = useState('financeira');

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-green-400">Movimentações</h2>

        {/* 3. Adicionamos o seletor (ToggleGroup) */}
        <ToggleGroup
          type="single"
          defaultValue="financeira"
          value={activeFilter}
          onValueChange={(value) => {
            if (value) setActiveFilter(value);
          }}
          className="bg-white/5 p-1 rounded-lg"
        >
          <ToggleGroupItem value="financeira" className="px-3 py-1 text-sm text-gray-300 rounded-md data-[state=on]:bg-[#1b1b1b] data-[state=on]:text-white">
            Financeiras
          </ToggleGroupItem>
          <ToggleGroupItem value="imobilizada" className="px-3 py-1 text-sm text-gray-300 rounded-md data-[state=on]:bg-[#1b1b1b] data-[state=on]:text-white">
            Imobilizadas
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 4. Filtramos a lista antes de renderizar os cards */}
        {movementsData
          .filter(movement => movement.category === activeFilter)
          .map((movement, index) => (
            <MovementCard key={index} {...movement} />
          ))}
      </div>
    </section>
  );
}