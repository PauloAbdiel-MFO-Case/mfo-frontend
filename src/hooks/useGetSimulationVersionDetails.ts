import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { SimulationVersionDetails } from '@/types/simulation.types';

const getDetails = async (versionId: number | null) => {
  if (!versionId) return null;
  const { data } = await api.get<SimulationVersionDetails>(`/simulations/versions/${versionId}`);
  return data;
};

export const useGetSimulationVersionDetails = (versionId: number | null) => {
  return useQuery({
    queryKey: ['simulationVersionDetails', versionId],
    queryFn: () => getDetails(versionId),
    enabled: !!versionId, 
  });
};