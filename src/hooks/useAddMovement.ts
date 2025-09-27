'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { Movement } from '@prisma/client';

interface AddMovementPayload extends Omit<Movement, 'id' | 'simulationVersionId'> {}

interface AddMovementVariables {
  versionId: number;
  payload: AddMovementPayload;
}

const addMovement = async ({ versionId, payload }: AddMovementVariables) => {
  const { data } = await api.post(`/versions/${versionId}/movements`, payload);
  return data;
};

export const useAddMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovement,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
    },
  });
};
