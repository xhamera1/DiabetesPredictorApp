import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  type SelectChangeEvent,
} from "@mui/material";
import { useMakePrediction } from "../hooks/useMakePrediction";
import { useMe } from "../hooks/useMe";
import type { PredictionRequestDto } from "../utils/types";
import { useNavigate } from "react-router-dom";

import { PredictionForm } from "../components/PredictionForm";

type FormErrors = {
  [key in keyof PredictionRequestDto]?: string;
};

const calculateAge = (dateOfBirth: string | null): number | null => {
  if (!dateOfBirth) return null;
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const smokingHistoryOptions = [
  { value: "0", label: "No Info" },
  { value: "1", label: "Current" },
  { value: "2", label: "Ever" },
  { value: "3", label: "Former" },
  { value: "4", label: "Never" },
  { value: "5", label: "Not current" },
];

export function MakePrediction() {
  const navigate = useNavigate();
  const { data: user } = useMe();

  const {
    mutate: makePrediction,
    isPending,
    error: apiError,
  } = useMakePrediction((data) => {
    navigate("/history", { state: { newPrediction: data } });
  });

  const [formData, setFormData] = useState({
    age: "",
    hba1cLevel: "",
    bloodGlucoseLevel: "",
    smokingHistory: "4",
    weight: "",
    height: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (user?.dateOfBirth) {
      const calculatedAge = calculateAge(user.dateOfBirth);
      if (calculatedAge) {
        setFormData((prev) => ({
          ...prev,
          age: calculatedAge.toString(),
        }));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data: PredictionRequestDto): FormErrors => {
    const newErrors: FormErrors = {};

    if (data.age < 18 || data.age > 100) {
      newErrors.age = "Age must be between 18 and 100.";
    }
    if (data.weight < 30 || data.weight > 300) {
      newErrors.weight = "Weight must be between 30 and 300 kg.";
    }
    if (data.height < 120 || data.height > 230) {
      newErrors.height = "Height must be between 120 and 230 cm.";
    }
    if (data.hba1cLevel < 3.5 || data.hba1cLevel > 18) {
      newErrors.hba1cLevel = "HbA1c Level must be between 3.5 and 18.";
    }
    if (data.bloodGlucoseLevel < 40 || data.bloodGlucoseLevel > 600) {
      newErrors.bloodGlucoseLevel =
        "Blood Glucose Level must be between 40 and 600.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const predictionRequest: PredictionRequestDto = {
      age: parseInt(formData.age, 10),
      hba1cLevel: parseFloat(formData.hba1cLevel),
      bloodGlucoseLevel: parseInt(formData.bloodGlucoseLevel, 10),
      smokingHistory: parseInt(formData.smokingHistory, 10),
      weight: parseInt(formData.weight, 10),
      height: parseInt(formData.height, 10),
    };

    for (const key in predictionRequest) {
      const typedKey = key as keyof PredictionRequestDto;
      if (isNaN(predictionRequest[typedKey])) {
        setErrors({ [typedKey]: "This field cannot be empty." });
        return;
      }
    }

    const validationErrors = validateForm(predictionRequest);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    makePrediction(predictionRequest);
  };

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Diabetes Prediction
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Fill out the form below to get a prediction.
        </Typography>

        <PredictionForm
          formData={formData}
          errors={errors}
          isPending={isPending}
          apiError={apiError}
          smokingHistoryOptions={smokingHistoryOptions}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}
