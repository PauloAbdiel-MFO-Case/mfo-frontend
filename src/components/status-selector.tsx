'use client';

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StatusSelectorProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export function StatusSelector({ status, onStatusChange }: StatusSelectorProps) {
  return (
    <div className="flex items-center justify-center py-4">
      <RadioGroup value={status} onValueChange={onStatusChange} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Invalido" id="r-Invalido" />
          <Label htmlFor="r-Invalido" className={status === 'Invalido' ? 'text-cyan-400 font-bold' : 'text-gray-400'}>Invalido</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Morto" id="r-morto" />
          <Label htmlFor="r-morto" className={status === 'Morto' ? 'text-cyan-400 font-bold' : 'text-gray-400'}>Morto</Label>
        </div>
      </RadioGroup>
    </div>
  );
}