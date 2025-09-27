"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface UpdateSimulationPayload {
  name?: string;
  startDate?: Date;
  realInterestRate?: number;
}

interface UpdateSimulationVariables {
  versionId: number;
  payload: UpdateSimulationPayload;
}

const updateSimulation = async ({ versionId, payload }: UpdateSimulationVariables) => {
  const { data } = await api.put(`/simulations/versions/${versionId}`, payload);
  return data;
};

export const useUpdateSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSimulation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
      queryClient.invalidateQueries({ queryKey: ['projection', variables.versionId] });
    },
  });
};