import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { usePredictions } from "../hooks/usePredictions";
import type { Prediction } from "../utils/types";

import { LatestPredictionResult } from "../components/LatestPredictionResult";
import { PredictionsTable } from "../components/PredictionsTable";

export function History() {
  const location = useLocation();
  const newPrediction = useMemo(
    () => location.state?.newPrediction as Prediction | undefined,
    [location.state]
  );

  const [page, setPage] = useState(0);
  const { data, isLoading, error, isFetching } = usePredictions(page);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error">
          Failed to load prediction history: {error.message}
        </Alert>
      );
    }

    if (!data || data.content.length === 0) {
      return (
        <Typography sx={{ mt: 4, textAlign: "center" }}>
          No prediction history found.
        </Typography>
      );
    }

    return (
      <>
        <PredictionsTable predictions={data.content} isFetching={isFetching} />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={data.totalPages}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            disabled={isFetching}
          />
        </Box>
      </>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Prediction History
      </Typography>

      {newPrediction && <LatestPredictionResult prediction={newPrediction} />}

      {renderContent()}
    </Container>
  );
}
