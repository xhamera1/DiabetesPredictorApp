import type { FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { SignupRequest } from "../utils/types";

interface SignupFormProps {
  credentials: SignupRequest;
  isPending: boolean;
  error: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function SignupForm({
  credentials,
  isPending,
  error,
  onChange,
  onSubmit,
}: SignupFormProps) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{ mt: 3, width: "100%" }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={2}>
        <TextField
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          value={credentials.firstName}
          onChange={onChange}
        />
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={credentials.lastName}
          onChange={onChange}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={credentials.email}
          onChange={onChange}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={credentials.password}
          onChange={onChange}
        />
      </Stack>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isPending}
        sx={{ mt: 3, mb: 2 }}
      >
        {isPending ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
      <Box sx={{ textAlign: "right" }}>
        <MuiLink component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </MuiLink>
      </Box>
    </Box>
  );
}
