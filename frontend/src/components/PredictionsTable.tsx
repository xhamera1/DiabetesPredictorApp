import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import type { Prediction } from "../utils/types";

interface PredictionsTableProps {
  predictions: Prediction[];
  isFetching: boolean;
}

export function PredictionsTable({
  predictions,
  isFetching,
}: PredictionsTableProps) {
  return (
    <Box sx={{ position: "relative" }}>
      {isFetching && (
        <CircularProgress
          size={24}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
        />
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Prediction Date</TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell align="right">Probability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  {new Date(p.createdAt).toLocaleString("en-US")}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={p.prediction === 1 ? "Positive" : "Negative"}
                    color={p.prediction === 1 ? "error" : "success"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {(p.probability * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
