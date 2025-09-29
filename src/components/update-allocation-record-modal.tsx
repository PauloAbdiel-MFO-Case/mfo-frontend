import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddAllocationRecord } from "@/hooks/useAddAllocationRecord"; // We will reuse this hook for now

const formSchema = z.object({
  value: z.coerce.number().min(0, "O valor deve ser positivo."),
});

interface UpdateAllocationRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  allocationId: number | null;
  versionId: number | null;
}

export function UpdateAllocationRecordModal({ isOpen, onClose, allocationId, versionId }: UpdateAllocationRecordModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
    }
  });

  const { mutate: addRecord, isPending } = useAddAllocationRecord(); // Reusing the add hook for now

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!allocationId || !versionId) return;
    
    // The date will be the current date, other info will be inherited by the backend
    addRecord({
      allocationId,
      simulationVersionId: versionId,
      value: values.value,
      date: new Date(), // Current date
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
          <DialogTitle>Atualizar Registro de Alocação</DialogTitle>
          <DialogDescription className="text-gray-400">
            Crie um novo registro para a alocação com o valor atual. A data será a de hoje.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Valor Atual</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Ex: 1000.00" className="bg-black/30 border-white/10 ring-offset-black focus-visible:ring-orange-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || !allocationId || !versionId} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? "Atualizando..." : "Atualizar Registro"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
