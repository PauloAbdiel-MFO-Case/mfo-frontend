'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Movement } from '@/types/simulation.types';
import { useUpdateMovement } from '@/hooks/useUpdateMovement';

const formSchema = z.object({
  type: z.enum(['ENTRADA', 'SAIDA']),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  value: z.coerce.number().positive('O valor deve ser positivo.'),
  frequency: z.enum(['UNICA', 'MENSAL', 'ANUAL']),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
});

interface EditMovementModalProps {
  movement: Movement | null;
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditMovementModal({ movement, versionId, isOpen, onClose }: EditMovementModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (movement) {
      form.reset({
        ...movement,
        startDate: new Date(movement.startDate),
        endDate: movement.endDate ? new Date(movement.endDate) : null,
      });
    }
  }, [movement, form]);

  const { mutate: updateMovement, isPending } = useUpdateMovement();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!movement || !versionId) return;

    updateMovement(
      {
        movementId: movement.id,
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
          <DialogTitle>Editar Movimentação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Descrição</FormLabel>
                  <FormControl>
                    <Input className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border-white/10">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#141414] border-white/10 text-white">
                      <SelectItem value="ENTRADA">Entrada</SelectItem>
                      <SelectItem value="SAIDA">Saída</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border-white/10">
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#141414] border-white/10 text-white">
                      <SelectItem value="UNICA">Única</SelectItem>
                      <SelectItem value="MENSAL">Mensal</SelectItem>
                      <SelectItem value="ANUAL">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Add date pickers for startDate and endDate */}

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
