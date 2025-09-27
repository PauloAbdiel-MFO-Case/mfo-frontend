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
import { useUpdateAllocation } from '@/hooks/useUpdateAllocation';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  type: z.enum(['FINANCEIRA', 'IMOBILIZADA']),
});

interface EditAllocationModalProps {
  allocation: { id: number; name: string; type: string } | null;
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditAllocationModal({ allocation, versionId, isOpen, onClose }: EditAllocationModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (allocation) {
      form.reset({
        name: allocation.name,
        type: allocation.type as 'FINANCEIRA' | 'IMOBILIZADA',
      });
    }
  }, [allocation, form]);

  const { mutate: updateAllocation, isPending } = useUpdateAllocation();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!allocation || !versionId) return;

    updateAllocation(
      {
        allocationId: allocation.id,
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
          <DialogTitle>Editar Alocação</DialogTitle>
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
                      <SelectItem value="FINANCEIRA">Financeira</SelectItem>
                      <SelectItem value="IMOBILIZADA">Imobilizada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
