import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Alert,
  type SelectChangeEvent,
} from "@mui/material";

interface PredictionRequestDto {
  age: number;
  hba1cLevel: number;
  bloodGlucoseLevel: number;
  smokingHistory: number;
  weight: number;
  height: number;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface FormData {
  age: string;
  hba1cLevel: string;
  bloodGlucoseLevel: string;
  smokingHistory: string;
  weight: string;
  height: string;
}

interface SmokingOption {
  value: string;
  label: string;
}

interface ApiError {
  message: string;
}

interface PredictionFormProps {
  formData: FormData;
  errors: FormErrors;
  isPending: boolean;
  apiError: ApiError | null;
  smokingHistoryOptions: SmokingOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (event: SelectChangeEvent<string>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PredictionForm({
  formData,
  errors,
  isPending,
  apiError,
  smokingHistoryOptions,
  onChange,
  onSelectChange,
  onSubmit,
}: PredictionFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField
          name="age"
          label="Age (18-100)"
          type="number"
          value={formData.age}
          onChange={onChange}
          required
          fullWidth
          error={!!errors.age}
          helperText={errors.age}
          InputLabelProps={{ shrink: !!formData.age }}
        />
        <FormControl fullWidth required>
          <InputLabel>Smoking History</InputLabel>
          <Select
            name="smokingHistory"
            value={formData.smokingHistory}
            label="Smoking History"
            onChange={onSelectChange}
          >
            {smokingHistoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="weight"
          label="Weight (kg, 30-300)"
          type="number"
          fullWidth
          value={formData.weight}
          onChange={onChange}
          required
          error={!!errors.weight}
          helperText={errors.weight}
        />
        <TextField
          name="height"
          label="Height (cm, 120-230)"
          type="number"
          fullWidth
          value={formData.height}
          onChange={onChange}
          required
          error={!!errors.height}
          helperText={errors.height}
        />
        <TextField
          name="hba1cLevel"
          label="HbA1c Level (%, 3.5-18)"
          type="number"
          fullWidth
          inputProps={{ step: "0.1" }}
          value={formData.hba1cLevel}
          onChange={onChange}
          required
          error={!!errors.hba1cLevel}
          helperText={errors.hba1cLevel}
        />
        <TextField
          name="bloodGlucoseLevel"
          label="Blood Glucose Level (mg/dL, 40-600)"
          type="number"
          fullWidth
          value={formData.bloodGlucoseLevel}
          onChange={onChange}
          required
          error={!!errors.bloodGlucoseLevel}
          helperText={errors.bloodGlucoseLevel}
        />
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {`Prediction failed: ${apiError.message}`}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Get Prediction"
          )}
        </Button>
      </Box>
    </Box>
  );
}
