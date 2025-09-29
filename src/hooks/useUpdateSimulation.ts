'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';
import { toast } from 'sonner';

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

  return useMutation<SimulationVersion, Error, UpdateSimulationVariables, { onSuccess?: () => void; onError?: (error: Error) => void; }>({
    mutationFn: updateSimulation,
    onSuccess: (data, variables, context) => {
      toast.success('Simulação atualizada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
      queryClient.invalidateQueries({ queryKey: ['simulationVersionDetails', variables.versionId] });
      queryClient.invalidateQueries({ queryKey: ['projection', variables.versionId] });
      if (context?.onSuccess) {
        context.onSuccess();
      }
    },
    onError: (error, variables, context) => {
      toast.error('Ocorreu um erro ao atualizar a simulação.');
      if (context?.onError) {
        context.onError(error);
      }
    },
  });
};