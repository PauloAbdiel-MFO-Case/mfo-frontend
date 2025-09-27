'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface UpdateAllocationPayload {
  name?: string;
  type?: 'FINANCEIRA' | 'IMOBILIZADA';
}

interface UpdateAllocationVariables {
  allocationId: number;
  versionId: number;
  payload: UpdateAllocationPayload;
}

const updateAllocation = async ({ allocationId, payload }: Omit<UpdateAllocationVariables, 'versionId'>) => {
  const { data } = await api.put(`/allocations/${allocationId}`, payload);
  return data;
};

export const useUpdateAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAllocation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
