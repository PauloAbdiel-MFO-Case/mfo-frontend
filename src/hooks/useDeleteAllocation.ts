'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface DeleteAllocationVariables {
  allocationId: number;
  versionId: number;
}

const deleteAllocation = async ({ allocationId }: Omit<DeleteAllocationVariables, 'versionId'>) => {
  await api.delete(`/allocations/${allocationId}`);
};

export const useDeleteAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllocation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
