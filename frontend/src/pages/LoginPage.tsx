import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doLogin, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(Boolean(error));
    if (error) {
      const t = setTimeout(() => setShowError(false), 5000); // 5s tego erorra na dole
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await doLogin({ email, password });
      navigate("/");
    } catch {}
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 420 }}>
        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h1" textAlign="center">
            Log in
          </Typography>

          {showError && (
            <Alert severity="error" onClose={() => setShowError(false)}>
              {error || "Something went wrong. Please try again."}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {showError && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Make sure your email and password are correct. Passwords are
              case-sensitive.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
