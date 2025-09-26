import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { SimulationListItem } from '@/types/simulation.types';

const getSimulations = async () => {
  const { data } = await api.get<SimulationListItem[]>('/simulations');
  return data;
};

export const useGetSimulations = () => {
  const query = useQuery({
    queryKey: ['simulations'], 
    queryFn: getSimulations,
  });

  return query; 
};