"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddSimulation } from "@/hooks/useAddSimulation";

const formSchema = z.object({
  newName: z.string().min(1, "O nome é obrigatório."),
});

interface AddSimulationModalProps {
  sourceVersionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddSimulationModal({ sourceVersionId, isOpen, onClose }: AddSimulationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newName: "",
    }
  });

  const { mutate: addSimulation, isPending } = useAddSimulation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!sourceVersionId) return;
    
    addSimulation({
      sourceVersionId,
      newName: values.newName,
    }, {
      onSuccess: () => {
        form.reset();
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Simulação</DialogTitle>
          <DialogDescription className="text-gray-400">
            Crie uma nova simulação baseada na versão atual.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="newName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome da Nova Simulação</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cenário Otimista" className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || !sourceVersionId} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? "Criando..." : "Criar Simulação"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
