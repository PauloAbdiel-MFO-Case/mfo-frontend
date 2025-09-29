'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface UpdateAllocationPayload {
  name?: string;
  type?: 'FINANCEIRA' | 'IMOBILIZADA';
}

interface UpdateAllocationVariables {
  allocationId: number;
  versionId: number;
  payload: UpdateAllocationPayload;
}

const updateAllocation = async ({ allocationId, versionId, payload }: UpdateAllocationVariables) => {
  const { data } = await api.put(`/allocations/${allocationId}`, payload);
  return { ...data, versionId };
};

export const useUpdateAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAllocation,
    onSuccess: (data) => {
      toast.success('Alocação atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar a alocação.');
    },
  });
};
