import { useMutation } from '@tanstack/react-query';
import { predictionService } from '../services/predictionService';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import type { PredictionRequestDto, Prediction } from '../utils/types';

export const useMakePrediction = (
  onSuccessCallback: (data: Prediction) => void
) => {
  const { token } = useAuthenticationContext();

  return useMutation<Prediction, Error, PredictionRequestDto>({
    mutationFn: (predictionData: PredictionRequestDto) => {
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      return predictionService.makePrediction(predictionData, token);
    },
    onSuccess: (data) => {
      console.log('[useMakePrediction] Prediction successful, calling callback...');
      onSuccessCallback(data);
    },
    onError: (error) => {
      console.error('[useMakePrediction] Prediction mutation failed:', error.message);
    },
  });
};
