"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

interface AddSimulationPayload {
  sourceVersionId: number;
  newName: string;
}

const addSimulation = async (payload: AddSimulationPayload) => {
  const { data } = await api.post('/simulations', payload);
  return data;
};

export const useAddSimulation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSimulation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};
