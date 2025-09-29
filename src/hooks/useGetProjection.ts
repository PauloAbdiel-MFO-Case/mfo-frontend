import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { FullProjectionResult } from '@/types/projection.types'; 

interface GetProjectionParams {
  simulationVersionId: number | null;
  status: 'Vivo' | 'Morto';
  calculateWithoutInsurance?: boolean;
}

const getProjection = async ({ simulationVersionId, status, calculateWithoutInsurance }: GetProjectionParams) => {
  if (!simulationVersionId) return null;

  const { data } = await api.get<FullProjectionResult>(
    `/simulations/${simulationVersionId}/projection?status=${status}&calculateWithoutInsurance=${calculateWithoutInsurance}`
  );
  return data;
};

export const useGetProjection = ({ simulationVersionId, status, calculateWithoutInsurance }: GetProjectionParams) => {
  const query = useQuery({
    queryKey: ['projection', simulationVersionId, status, calculateWithoutInsurance],
    queryFn: () => getProjection({ simulationVersionId, status, calculateWithoutInsurance }),
    enabled: !!simulationVersionId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};