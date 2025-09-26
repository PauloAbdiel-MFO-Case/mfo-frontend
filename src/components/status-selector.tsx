"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

export function StatusSelector() {
  const [status, setStatus] = useState("vivo")

  return (
    <div className="flex items-center justify-center py-4">
      <RadioGroup defaultValue="vivo" onValueChange={setStatus} className="flex gap-8">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="morto" id="r-morto" className="border-gray-600" />
          <Label htmlFor="r-morto" className="text-gray-300">Morto</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="invalido" id="r-invalido" className="border-gray-600" />
          <Label htmlFor="r-invalido" className="text-gray-300">Inválido</Label>
        </div>
      </RadioGroup>
    </div>
  )
}