'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface DeleteMovementVariables {
  movementId: number;
  versionId: number;
}

const deleteMovement = async ({ movementId }: Omit<DeleteMovementVariables, 'versionId'>) => {
  await api.delete(`/movements/${movementId}`);
};

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovement,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
