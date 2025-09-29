'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface DeleteAllocationRecordVariables {
  recordId: number;
  versionId: number;
}

const deleteAllocationRecord = async ({ recordId, versionId }: DeleteAllocationRecordVariables) => {
  await api.delete(`/allocation-records/${recordId}`);
  return { versionId };
};

export const useDeleteAllocationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllocationRecord,
    onSuccess: (data) => {
      toast.success('Registro de alocação deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o registro de alocação.');
    },
  });
};
