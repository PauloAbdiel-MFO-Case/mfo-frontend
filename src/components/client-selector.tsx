"use client";

import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ClientSelector() {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-3 px-4 py-6 text-lg font-bold text-white border-white/10 rounded-full bg-white/5 min-w-[250px]">
            <User />
            Matheus Silveira
            <ChevronDown size={20} className="ml-auto text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
          <DropdownMenuItem >Pedro Magalhães</DropdownMenuItem>
          <DropdownMenuItem>Larissa Alves</DropdownMenuItem>
          <DropdownMenuItem>Fernando Coelho</DropdownMenuItem>
          <DropdownMenuItem>Débora Matto</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}