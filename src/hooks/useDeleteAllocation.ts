'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface DeleteAllocationVariables {
  allocationId: number;
  versionId: number;
}

const deleteAllocation = async ({ allocationId, versionId }: DeleteAllocationVariables) => {
  await api.delete(`/allocations/${allocationId}`);
  return { versionId };
};

export const useDeleteAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllocation,
    onSuccess: (data) => {
      toast.success('Alocação deletada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar a alocação.');
    },
  });
};
