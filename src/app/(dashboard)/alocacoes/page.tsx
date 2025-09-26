import { AllocationCard } from "@/components/allocation-card";
import { ClientNavTabs } from "@/components/client-nav-tabs";
import { ClientSelector } from "@/components/client-selector";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Dados estáticos baseados na imagem
const allocationsData = [
  { name: "CDB Banco Itaú", type: "Financeira Manual", value: "R$ 1.000.000", lastUpdate: "10/06/2025" },
  { name: "CDB Banco C6", type: "Financeira Manual", value: "R$ 1.000.000", lastUpdate: "10/08/2025" },
  { name: "Apartamento Vila Olimpia", type: "Imobilizada", isFinanced: true, value: "R$ 148.666", totalValue: "R$ 2.123.800", lastUpdate: "10/08/2025", progress: 7 },
  { name: "Loja", type: "Imobilizada", value: "R$ 1.800.000", lastUpdate: "20/04/2023" },
];

export default function AllocationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <ClientSelector />
      <ClientNavTabs />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Timeline de alocações manuais</h2>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold gap-2">
          <PlusCircle size={18} />
          Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {allocationsData.map((alloc, index) => (
          <AllocationCard key={index} {...alloc} />
        ))}
      </div>
    </div>
  );
}