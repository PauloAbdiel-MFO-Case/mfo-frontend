'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreVertical, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface AllocationCardProps {
  name: string;
  type: "Financeira" | "Imobilizada";
  subtype?: "Manual" | "Financiado";
  startDate?: string;
  endDate?: string;
  value: string;
  totalValue?: string;
  progress?: { current: number; total: number };
  lastUpdate: string;
  showUpdateButton?: boolean;
  hasWarning?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function AllocationCard({
  name,
  type,
  subtype,
  startDate,
  endDate,
  value,
  totalValue,
  progress,
  lastUpdate,
  showUpdateButton,
  hasWarning,
  onEdit,
  onDelete
}: AllocationCardProps) {
  return (
    <Card className="bg-zinc-900 border border-white/10 rounded-xl">
      <CardContent className="p-4 flex flex-col gap-2">
        {/* Linha superior: nome + badges */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-white">{name}</p>
            {type === "Financeira" && (
              <Badge className="bg-green-200 text-green-900 text-xs font-medium rounded-full">
                {subtype === "Manual" ? "Financeira Manual" : "Financeira"}
              </Badge>
            )}
            {type === "Imobilizada" && (
              <Badge className="bg-orange-200 text-orange-900 text-xs font-medium rounded-full">
                Imobilizada
              </Badge>
            )}
            {subtype === "Financiado" && (
              <Badge className="bg-gray-200 text-gray-900 text-xs font-medium rounded-full">
                Financiado
              </Badge>
            )}
          </div>

          {/* Menu de ações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
              <DropdownMenuItem onSelect={onEdit} className="focus:bg-white/10">
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={onDelete}
                className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
              >
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Datas */}
        {(startDate || endDate) && (
          <p className="text-sm text-gray-400">
            {startDate} {endDate && `– ${endDate}`}
          </p>
        )}

        {/* Valor */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-white">{value}</p>
          {isFinite(Number(totalValue)) && totalValue && (
            <p className="text-sm text-gray-400">de {totalValue}</p>
          )}
        </div>

        {/* Progresso se financiado */}
        {progress && (
          <div>
            <p className="text-xs text-gray-400">
              Progresso: {progress.current}/{progress.total} parcelas
            </p>
            <Progress
              value={(progress.current / progress.total) * 100}
              className="h-2 bg-black/20"
              indicatorClassName="bg-orange-500"
            />
          </div>
        )}

        {/* Última atualização + botão atualizar */}
        <div className="flex justify-between items-center text-xs mt-1">
          <p
            className={cn(
              "text-gray-400",
              hasWarning && "text-orange-400 flex items-center gap-1"
            )}
          >
            {hasWarning && "⚠"} Última atualização: {lastUpdate}
          </p>
          {showUpdateButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white gap-1"
            >
              <Pencil size={14} />
              Atualizar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
