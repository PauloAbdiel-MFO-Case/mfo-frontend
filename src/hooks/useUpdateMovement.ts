'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Movement } from '@prisma/client';

interface UpdateMovementPayload extends Partial<Omit<Movement, 'id' | 'simulationVersionId'>> {}

interface UpdateMovementVariables {
  movementId: number;
  versionId: number;
  payload: UpdateMovementPayload;
}

const updateMovement = async ({ movementId, payload }: Omit<UpdateMovementVariables, 'versionId'>) => {
  const { data } = await api.put(`/movements/${movementId}`, payload);
  return data;
};

export const useUpdateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMovement,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
