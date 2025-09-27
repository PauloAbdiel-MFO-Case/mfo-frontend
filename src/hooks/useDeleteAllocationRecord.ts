'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface DeleteAllocationRecordVariables {
  recordId: number;
  versionId: number;
}

const deleteAllocationRecord = async ({ recordId }: Omit<DeleteAllocationRecordVariables, 'versionId'>) => {
  await api.delete(`/allocation-records/${recordId}`);
};

export const useDeleteAllocationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllocationRecord,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
