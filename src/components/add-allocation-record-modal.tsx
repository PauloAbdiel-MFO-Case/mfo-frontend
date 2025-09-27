'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddAllocationRecord } from '@/hooks/useAddAllocationRecord';

const formSchema = z.object({
  value: z.coerce.number().positive('O valor deve ser positivo.'),
  date: z.coerce.date(),
});

interface AddAllocationRecordModalProps {
  allocationId: number | null;
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddAllocationRecordModal({ allocationId, versionId, isOpen, onClose }: AddAllocationRecordModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      date: new Date(),
    },
  });

  const { mutate: addRecord, isPending } = useAddAllocationRecord();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!allocationId || !versionId) return;

    addRecord(
      {
        allocationId,
        payload: {
          ...values,
          simulationVersionId: versionId,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Adicionar Registro de Alocação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Valor</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Add date picker for date */}

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || !allocationId || !versionId} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? 'Adicionando...' : 'Adicionar Registro'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
