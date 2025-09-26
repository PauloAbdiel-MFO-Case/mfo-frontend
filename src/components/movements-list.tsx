"use client"; // Precisa ser um Client Component para ter estado (useState)

import { useState } from "react";
import { MovementCard } from "./movement-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Movement } from "@/types/simulation.types"; 

export function MovementsList({ movements }: { movements: Movement[] }) {
  const financialMovements = movements.filter(m => m.description !== "Compra de Imóvel"); 
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
        {financialMovements.map((movement) => (
            <MovementCard 
                key={movement.id}
                type={movement.type === 'ENTRADA' ? 'credit' : 'debit'}
                title={movement.description}
                details={`Frequência: ${movement.frequency}`}
                amount={`R$ ${movement.value.toLocaleString('pt-BR')}`}
            />
        ))}
      </div>
    </section>
  );
}