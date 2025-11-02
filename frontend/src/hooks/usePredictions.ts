import { useQuery } from '@tanstack/react-query';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import { predictionService } from '../services/predictionService';
import type { PagedPredictions } from '../utils/types';

export const usePredictions = (page: number) => {
  const { token, isAuthenticated } = useAuthenticationContext();

  return useQuery<PagedPredictions, Error>({
    queryKey: ['predictions', page], 
    queryFn: () => {
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
      return predictionService.getPredictions(token, page);
    },
    enabled: !!token && isAuthenticated,
  });
};
