'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface UpdateAllocationRecordPayload {
  value?: number;
  date?: Date;
}

interface UpdateAllocationRecordVariables {
  recordId: number;
  versionId: number;
  payload: UpdateAllocationRecordPayload;
}

const updateAllocationRecord = async ({ recordId, versionId, payload }: UpdateAllocationRecordVariables) => {
  const { data } = await api.put(`/allocation-records/${recordId}`, payload);
  return { ...data, versionId };
};

export const useUpdateAllocationRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAllocationRecord,
    onSuccess: (data) => {
      toast.success('Registro de alocação atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar o registro de alocação.');
    },
  });
};
