'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface DeleteInsuranceVariables {
  insuranceId: number;
  versionId: number;
}

const deleteInsurance = async ({ insuranceId }: Omit<DeleteInsuranceVariables, 'versionId'>) => {
  await api.delete(`/insurances/${insuranceId}`);
};

export const useDeleteInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInsurance,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
