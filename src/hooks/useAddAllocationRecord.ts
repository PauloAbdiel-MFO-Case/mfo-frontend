'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface AddAllocationRecordPayload {
  simulationVersionId: number;
  value: number;
  date: Date;
}

interface AddAllocationRecordVariables {
  allocationId: number;
  payload: AddAllocationRecordPayload;
}

const addAllocationRecord = async ({ allocationId, payload }: AddAllocationRecordVariables) => {
  const { data } = await api.post(`/allocations/${allocationId}/records`, payload);
  return data;
};

export const useAddAllocationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAllocationRecord,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.payload.simulationVersionId] });
    },
  });
};
