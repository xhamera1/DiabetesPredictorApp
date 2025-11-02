import { Alert, Typography } from "@mui/material";
import type { Prediction } from "../utils/types";

interface LatestPredictionResultProps {
  prediction: Prediction;
}

export function LatestPredictionResult({
  prediction,
}: LatestPredictionResultProps) {
  return (
    <Alert
      severity={prediction.prediction === 1 ? "error" : "success"}
      sx={{ mb: 4, ".MuiAlert-message": { width: "100%" } }}
    >
      <Typography variant="h6">Result of the last prediction:</Typography>
      Result:{" "}
      <strong>
        {prediction.prediction === 1
          ? "Positive (Diabetes)"
          : "Negative (No Diabetes)"}
      </strong>
      <br />
      Probability: <strong>{(prediction.probability * 100).toFixed(2)}%</strong>
    </Alert>
  );
}
