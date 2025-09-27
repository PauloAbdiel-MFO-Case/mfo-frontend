'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface AllocationCardProps {
  name: string;
  type: string;
  value: string;
  lastUpdate: string;
  isFinanced?: boolean;
  totalValue?: string;
  progress?: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function AllocationCard({ 
  name, 
  type, 
  value, 
  lastUpdate, 
  isFinanced, 
  totalValue, 
  progress,
  onEdit,
  onDelete
}: AllocationCardProps) {
  return (
    <Card className="bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
          {/* Name and Type */}
          <div className="md:col-span-1">
            <p className="font-bold text-white">{name}</p>
            <p className="text-xs text-gray-400">{type}</p>
          </div>

          {/* Value and Financed Info */}
          <div className="md:col-span-1">
            <p className="font-semibold text-white">{value}</p>
            {isFinanced && totalValue && (
              <p className="text-xs text-gray-400">de {totalValue}</p>
            )}
          </div>

          {/* Progress Bar or Last Update */}
          <div className="md:col-span-1">
            {isFinanced && progress !== undefined ? (
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2 bg-black/20" indicatorClassName="bg-green-500" />
                <span className="text-xs font-medium text-gray-300">{progress}%</span>
              </div>
            ) : (
              <div>
                <p className="text-xs text-gray-400">Última atualização</p>
                <p className="font-medium text-white">{lastUpdate}</p>
              </div>
            )}
          </div>

          {/* Status/Actions */}
          <div className="md:col-span-1 flex justify-end items-center">
            <Badge variant="outline" className={cn(
              type === "Imobilizada" ? "border-blue-500/50 text-blue-400" : "border-fuchsia-500/50 text-fuchsia-400"
            )}>
              {type}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
                <DropdownMenuItem onSelect={onEdit} className="focus:bg-white/10">
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onDelete} className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
