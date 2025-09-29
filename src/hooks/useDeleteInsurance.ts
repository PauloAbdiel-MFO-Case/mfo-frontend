'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface DeleteInsuranceVariables {
  insuranceId: number;
  versionId: number;
}

const deleteInsurance = async ({ insuranceId, versionId }: DeleteInsuranceVariables) => {
  await api.delete(`/insurances/${insuranceId}`);
  return { versionId };
};

export const useDeleteInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInsurance,
    onSuccess: (data) => {
      toast.success('Seguro deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o seguro.');
    },
  });
};
