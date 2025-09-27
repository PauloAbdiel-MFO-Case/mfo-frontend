'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddAllocation } from '@/hooks/useAddAllocation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  type: z.enum(['FINANCEIRA', 'IMOBILIZADA']),
  value: z.coerce.number().positive('O valor deve ser positivo.'),
  date: z.coerce.date(),
  // Campos opcionais que podem ser adicionados depois
  // initialPayment: z.coerce.number().optional(),
  // installments: z.coerce.number().int().optional(),
  // interestRate: z.coerce.number().optional(),
});

interface AddAllocationModalProps {
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddAllocationModal({ versionId, isOpen, onClose }: AddAllocationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'FINANCEIRA',
      value: 0,
      date: new Date(),
    },
  });

  const { mutate: addAllocation, isPending } = useAddAllocation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!versionId) return;

    addAllocation(
      {
        versionId,
        payload: values,
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
          <DialogTitle>Adicionar Alocação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome da Alocação</FormLabel>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border-white/10">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#141414] border-white/10 text-white">
                      <SelectItem value="FINANCEIRA">Financeira</SelectItem>
                      <SelectItem value="IMOBILIZADA">Imobilizada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TODO: Adicionar campos de data e de financiamento */}

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="border-white/10 bg-white/5 hover:bg-white/10">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending || !versionId} className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                {isPending ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
