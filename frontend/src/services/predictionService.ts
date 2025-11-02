import { ENDPOINTS } from "../config/api";
import type { PredictionRequestDto, Prediction, PagedPredictions } from "../utils/types";

const logger = {
  log: (message: string) => console.log(`%c[PredictionService] ${message}`, 'color: #3b82f6'),
  error: (message: string, error: unknown) => console.error(`[PredictionService] ${message}`, error),
};

export const predictionService = {
  makePrediction: async (
    request: PredictionRequestDto,
    token: string
  ): Promise<Prediction> => {
    console.log("[PredictionService] Sending prediction request:", request);

    const response = await fetch(ENDPOINTS.PREDICTIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[PredictionService] Server error: ${response.status}`,
        errorText
      );
      throw new Error(errorText || "Prediction request failed.");
    }

    const data: Prediction = await response.json();
    console.log("[PredictionService] Prediction successful, data:", data);
    return data;
  },

  getPredictions: async (token: string, page: number): Promise<PagedPredictions> => {
    const url = new URL(ENDPOINTS.PREDICTIONS);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', '10');
    url.searchParams.append('sort', 'createdAt,desc');

    logger.log(`Fetching predictions from: ${url.toString()}`);
    
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        logger.error('Failed to fetch prediction history.', errorText);
        throw new Error(errorText || 'Could not fetch prediction history.');
    }
    return response.json();
  },
};
