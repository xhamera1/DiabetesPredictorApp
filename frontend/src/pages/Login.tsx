import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import type { LoginRequest } from "../utils/types";
import { useLogin } from "../hooks/useLogin";

import { LoginForm } from "../components/LoginForm";

export function Login() {
  const { isAuthenticated } = useAuthenticationContext();
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const { mutate: login, isPending, error } = useLogin();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (credentials.email && credentials.password) {
      login(credentials);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const getErrorMessage = () => {
    if (!error) return null;
    try {
      const errorResponse = JSON.parse(error.message);
      return errorResponse.detail || "Invalid credentials. Please try again.";
    } catch {
      return error.message;
    }
  };

  const errorMessage = getErrorMessage();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <LoginForm
          credentials={credentials}
          isPending={isPending}
          error={errorMessage}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}
