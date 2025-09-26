import { useQuery } from '@tanstack/react-query';
import { api } from '@/service/api';
import { ProjectionResult } from '@/types/projection.types'; 

interface GetProjectionParams {
  simulationVersionId: number | null;
  status: 'Vivo' | 'Morto';
}

const getProjection = async ({ simulationVersionId, status }: GetProjectionParams) => {
  if (!simulationVersionId) return null;

  const { data } = await api.get<ProjectionResult[]>(
    `/simulations/${simulationVersionId}/projection?status=${status}`
  );
  return data;
};

export const useGetProjection = ({ simulationVersionId, status }: GetProjectionParams) => {
  const query = useQuery({
    queryKey: ['projection', simulationVersionId, status],
    queryFn: () => getProjection({ simulationVersionId, status }),
    enabled: !!simulationVersionId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};