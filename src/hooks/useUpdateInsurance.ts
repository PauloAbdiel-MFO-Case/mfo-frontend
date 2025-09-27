'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Insurance } from '@prisma/client';

interface UpdateInsurancePayload extends Partial<Omit<Insurance, 'id' | 'simulationVersionId'>> {}

interface UpdateInsuranceVariables {
  insuranceId: number;
  versionId: number;
  payload: UpdateInsurancePayload;
}

const updateInsurance = async ({ insuranceId, payload }: Omit<UpdateInsuranceVariables, 'versionId'>) => {
  const { data } = await api.put(`/insurances/${insuranceId}`, payload);
  return data;
};

export const useUpdateInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInsurance,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
