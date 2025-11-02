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
import type { LoginRequest } from "../utils/types";

interface LoginFormProps {
  credentials: LoginRequest;
  isPending: boolean;
  error: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  credentials,
  isPending,
  error,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{ mt: 1, width: "100%" }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
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
        {isPending ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
      <Box sx={{ textAlign: "right" }}>
        <MuiLink component={RouterLink} to="/register" variant="body2">
          {"Don't have an account? Sign Up"}
        </MuiLink>
      </Box>
    </Box>
  );
}
