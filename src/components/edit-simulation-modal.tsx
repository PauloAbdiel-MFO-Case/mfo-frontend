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
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  startDate: z.string().min(1, "A data de início é obrigatória."),
  realInterestRate: z.coerce.number().min(0, "A taxa de juros real deve ser positiva."),
});

interface EditSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulation: SimulationListItem | null;
}

export function EditSimulationModal({ isOpen, onClose, simulation }: EditSimulationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: simulation?.simulation.name || "",
      startDate: simulation?.startDate ? new Date(simulation.startDate).toISOString().split('T')[0] : "",
      realInterestRate: simulation?.realInterestRate || 0,
    }
  });

  useEffect(() => {
    if (simulation) {
      form.reset({
        name: simulation.simulation.name,
        startDate: simulation.startDate ? new Date(simulation.startDate).toISOString().split('T')[0] : "",
        realInterestRate: simulation.realInterestRate,
      });
    }
  }, [simulation, form]);

  const { mutate: updateSimulation, isPending } = useUpdateSimulation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!simulation) return;

    updateSimulation({
      versionId: simulation.id,
      payload: {
        name: values.name,
        startDate: new Date(values.startDate),
        realInterestRate: values.realInterestRate,
      }
    }, {
      onSuccess: () => {
        form.reset();
        onClose();
      }
    });
  };

  const isSituacaoAtual = simulation?.simulation.name === 'Situação Atual';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Editar Simulação</DialogTitle>
          <DialogDescription className="text-gray-400">
            {isSituacaoAtual ? (
              "Esta é a simulação 'Situação Atual' e não pode ser editada."
            ) : (
              "Edite os detalhes da simulação."
            )}
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
                    <Input disabled={isSituacaoAtual} className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Data de Início</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={isSituacaoAtual} className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Taxa de Juros Real</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" disabled={isSituacaoAtual} className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || isSituacaoAtual} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}