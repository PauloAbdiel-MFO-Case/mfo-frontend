import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle, MoreVertical, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface MovementCardProps {
  type: 'credit' | 'debit' | 'immobilized';
  title: string;
  details: string;
  amount: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function MovementCard({ type, title, details, amount, onEdit, onDelete }: MovementCardProps) {
  const isCredit = type === 'credit';
  const isImmobilized = type === 'immobilized';

  return (
    <Card className={cn(
      "bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5",
      isCredit && "ring-green-500/30",
      isImmobilized && "ring-blue-500/30"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {isCredit 
              ? <ArrowUpCircle size={24} className="text-green-400 mt-1" /> 
              : isImmobilized
                ? <Home size={24} className="text-blue-400 mt-1" />
                : <ArrowDownCircle size={24} className="text-red-400 mt-1" />
            }
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="text-xs text-gray-400">{details}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p className={cn(
              "text-lg font-bold",
              isCredit ? "text-green-400" : isImmobilized ? "text-blue-400" : "text-red-400"
            )}>
              {amount}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="h-8 w-8 hover:bg-white/40">
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