'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/service/api';

const createNewVersion = async (simulationId: number) => {
  const { data } = await api.post(`/simulations/${simulationId}/versions`);
  return data;
};

export const useCreateNewVersion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};
