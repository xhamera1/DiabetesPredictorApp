import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Stack,
  TextField,
} from "@mui/material";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface UpdateError {
  message: string;
}

interface AccountFormProps {
  userEmail: string;
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  updateError: UpdateError | null;
}

export function AccountForm({
  userEmail,
  formData,
  onChange,
  onSubmit,
  isPending,
  updateError,
}: AccountFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Email"
          value={userEmail}
          disabled
          fullWidth
          variant="filled"
        />
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={onChange}
          required
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={onChange}
          required
          fullWidth
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
      </Stack>

      {updateError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {`Update failed: ${updateError.message}`}
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
            "Save Changes"
          )}
        </Button>
      </Box>
    </Box>
  );
}
