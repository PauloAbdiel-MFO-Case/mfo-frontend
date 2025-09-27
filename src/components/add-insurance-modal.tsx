'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAddInsurance } from '@/hooks/useAddInsurance';

const formSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  startDate: z.coerce.date(),
  durationMonths: z.coerce.number().int().positive('A duração deve ser um número positivo.'),
  monthlyPremium: z.coerce.number().positive('O prêmio deve ser positivo.'),
  insuredValue: z.coerce.number().positive('O valor segurado deve ser positivo.'),
});

interface AddInsuranceModalProps {
  versionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddInsuranceModal({ versionId, isOpen, onClose }: AddInsuranceModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      durationMonths: 12,
      monthlyPremium: 0,
      insuredValue: 0,
    },
  });

  const { mutate: addInsurance, isPending } = useAddInsurance();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!versionId) return;

    addInsurance(
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
          <DialogTitle>Adicionar Seguro</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nome</FormLabel>
                  <FormControl>
                    <Input className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuredValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Valor Segurado</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPremium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Prêmio Mensal</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durationMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Duração (meses)</FormLabel>
                  <FormControl>
                    <Input type="number" className="bg-black/30 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: Date picker for startDate */}
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
