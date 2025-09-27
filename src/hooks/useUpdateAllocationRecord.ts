'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface UpdateAllocationRecordPayload {
  value?: number;
  date?: Date;
}

interface UpdateAllocationRecordVariables {
  recordId: number;
  versionId: number;
  payload: UpdateAllocationRecordPayload;
}

const updateAllocationRecord = async ({ recordId, payload }: Omit<UpdateAllocationRecordVariables, 'versionId'>) => {
  const { data } = await api.put(`/allocation-records/${recordId}`, payload);
  return data;
};

export const useUpdateAllocationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAllocationRecord,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
