'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';

// TODO: Define a proper type for the history data
const getHistory = async () => {
  const { data } = await api.get('/simulations/history');
  return data;
};

export const useGetHistory = () => {
  return useQuery({
    queryKey: ['simulationHistory'],
    queryFn: getHistory,
  });
};
