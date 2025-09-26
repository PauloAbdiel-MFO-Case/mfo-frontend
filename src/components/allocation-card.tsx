import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreVertical } from "lucide-react";

interface AllocationCardProps {
  name: string;
  type: string;
  isFinanced?: boolean;
  value: string;
  totalValue?: string;
  lastUpdate: string;
  progress?: number;
}

export function AllocationCard({ name, type, isFinanced, value, totalValue, lastUpdate, progress }: AllocationCardProps) {
  return (
    <Card className="bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{name}</h3>
            <Badge variant="secondary" className="bg-teal-500/10 text-teal-300">{type}</Badge>
            {isFinanced && <Badge variant="secondary" className="bg-blue-500/10 text-blue-300">$ Financiado</Badge>}
          </div>
          {progress && (
            <div>
              <Progress value={progress} className="h-2 bg-black/20" />
              <p className="text-xs text-gray-500 mt-1">Progresso: {progress}%</p>
            </div>
          )}
        </div>

        <Button variant="outline" className="text-white border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20">Atualizar</Button>
        
        <div className="text-right">
          <p className="text-xl font-bold text-white">{value}</p>
          {totalValue && <p className="text-xs text-gray-500">de {totalValue}</p>}
          <p className="text-xs text-amber-400/80">Última atualização: {lastUpdate}</p>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </Button>
      </CardContent>
    </Card>
  )
}