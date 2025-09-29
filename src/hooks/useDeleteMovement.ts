'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

interface DeleteMovementVariables {
  movementId: number;
  versionId: number;
}

const deleteMovement = async ({ movementId, versionId }: DeleteMovementVariables) => {
  await api.delete(`/movements/${movementId}`);
  return { versionId };
};

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovement,
    onSuccess: (data) => {
      toast.success('Movimento deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', data.versionId] });
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o movimento.');
    },
  });
};
