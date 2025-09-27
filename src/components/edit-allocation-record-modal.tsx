'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AllocationRecord } from '@/types/simulation.types';
import { useUpdateAllocationRecord } from '@/hooks/useUpdateAllocationRecord';

const formSchema = z.object({
  value: z.coerce.number().positive('O valor deve ser positivo.'),
  date: z.coerce.date(),
});

interface EditAllocationRecordModalProps {
  record: AllocationRecord | null;
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditAllocationRecordModal({ record, versionId, isOpen, onClose }: EditAllocationRecordModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (record) {
      form.reset({
        value: record.value,
        date: new Date(record.date),
      });
    }
  }, [record, form]);

  const { mutate: updateRecord, isPending } = useUpdateAllocationRecord();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!record || !versionId) return;

    updateRecord(
      {
        recordId: record.id,
        versionId: versionId,
        payload: values,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Editar Registro de Alocação</DialogTitle>
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
              <Button type="submit" disabled={isPending} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
