'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Insurance } from '@prisma/client';
import { toast } from 'sonner';

interface UpdateInsurancePayload extends Partial<Omit<Insurance, 'id' | 'simulationVersionId'>> {}

interface UpdateInsuranceVariables {
  insuranceId: number;
  versionId: number;
  payload: UpdateInsurancePayload;
}

const updateInsurance = async ({ insuranceId, versionId, payload }: UpdateInsuranceVariables) => {
  const { data } = await api.put(`/insurances/${insuranceId}`, payload);
  return { ...data, versionId };
};

export const useUpdateInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInsurance,
    onSuccess: (data) => {
      toast.success('Seguro atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar o seguro.');
    },
  });
};
