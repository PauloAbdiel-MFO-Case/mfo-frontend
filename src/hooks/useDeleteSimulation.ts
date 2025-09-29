'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface DeleteSimulationVariables {
  versionId: number;
}

const deleteSimulation = async ({ versionId }: DeleteSimulationVariables) => {
  await api.delete(`/simulations/versions/${versionId}`);
};

export const useDeleteSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSimulation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      queryClient.invalidateQueries({ queryKey: ['simulationsHistory'] });
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
      queryClient.invalidateQueries({ queryKey: ['projection'] });
    },
  });
};
