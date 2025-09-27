'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Insurance } from '@prisma/client';

interface AddInsurancePayload extends Omit<Insurance, 'id' | 'simulationVersionId'> {}

interface AddInsuranceVariables {
  versionId: number;
  payload: AddInsurancePayload;
}

const addInsurance = async ({ versionId, payload }: AddInsuranceVariables) => {
  const { data } = await api.post(`/versions/${versionId}/insurances`, payload);
  return data;
};

export const useAddInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addInsurance,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
