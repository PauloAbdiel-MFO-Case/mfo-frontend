'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { SimulationWithPatrimony } from '@/types/history.types';

const getHistory = async (): Promise<SimulationWithPatrimony[]> => {
  const { data } = await api.get('/simulations/history');
  return data;
};

export const useGetHistory = () => {
  return useQuery({
    queryKey: ['simulationHistory'],
    queryFn: getHistory,
  });
};
