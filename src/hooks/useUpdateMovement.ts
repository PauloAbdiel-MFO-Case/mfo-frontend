'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Movement } from '@prisma/client';
import { toast } from 'sonner';

interface UpdateMovementPayload extends Partial<Omit<Movement, 'id' | 'simulationVersionId'>> {}

interface UpdateMovementVariables {
  movementId: number;
  versionId: number;
  payload: UpdateMovementPayload;
}

const updateMovement = async ({ movementId, versionId, payload }: UpdateMovementVariables) => {
  const { data } = await api.put(`/movements/${movementId}`, payload);
  return { ...data, versionId };
};

export const useUpdateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMovement,
    onSuccess: (data) => {
      toast.success('Movimento atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar o movimento.');
    },
  });
};
