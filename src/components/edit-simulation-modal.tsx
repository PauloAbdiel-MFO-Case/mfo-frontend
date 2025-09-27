"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimulationListItem } from "@/types/simulation.types";
import { useUpdateSimulation } from "@/hooks/useUpdateSimulation";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  startDate: z.coerce.date(),
  realInterestRate: z.coerce.number().min(0, "A taxa deve ser positiva."),
});

interface EditSimulationModalProps {
  simulation: SimulationListItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditSimulationModal({ simulation, isOpen, onClose }: EditSimulationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: simulation?.simulation.name || "",
      startDate: new Date(),
      realInterestRate: 0.04,
    }
  });

  const { mutate: updateSimulation, isPending } = useUpdateSimulation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!simulation) return;
    
    updateSimulation({
      versionId: simulation.id,
      payload: values,
    }, {
      onSuccess: () => {
        onClose();
      }
    });
  };
  
  if (!simulation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Editar Simulação: {simulation.simulation.name}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Faça as alterações nos dados da simulação.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome da Simulação</FormLabel>
                  <FormControl>
                    <Input className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Adicione aqui os outros campos (startDate, realInterestRate) se necessário */}
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}