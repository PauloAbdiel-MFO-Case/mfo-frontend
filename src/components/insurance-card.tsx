import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface InsuranceCardProps {
  title: string;
  details: string;
  value: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function InsuranceCard({ title, details, value, onEdit, onDelete }: InsuranceCardProps) {
  return (
    <Card className="flex-1 bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
       <CardContent className="p-5">
         <div className="flex items-start justify-between">
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="text-xs text-gray-400">{details}</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold text-fuchsia-400">{value}</p>
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
  )
}