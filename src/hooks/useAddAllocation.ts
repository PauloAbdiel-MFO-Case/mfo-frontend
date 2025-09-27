'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface AddAllocationPayload {
  name: string;
  type: 'FINANCEIRA' | 'IMOBILIZADA';
  value: number;
  date: Date;
  initialPayment?: number;
  installments?: number;
  interestRate?: number;
}

interface AddAllocationVariables {
  versionId: number;
  payload: AddAllocationPayload;
}

const addAllocation = async ({ versionId, payload }: AddAllocationVariables) => {
  const { data } = await api.post(`/versions/${versionId}/allocations`, payload);
  return data;
};

export const useAddAllocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAllocation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
