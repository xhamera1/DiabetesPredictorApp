import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { useSignup } from "../hooks/useSignup";
import type { SignupRequest } from "../utils/types";

import { SignupForm } from "../components/SignupForm";

export function Signup() {
  const { isAuthenticated } = useAuthenticationContext();
  const [credentials, setCredentials] = useState<SignupRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { mutate: signup, isPending, error } = useSignup();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.firstName ||
      !credentials.lastName
    ) {
      return;
    }
    signup(credentials);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const getErrorMessage = () => {
    if (!error) return null;
    try {
      const errorResponse = JSON.parse(error.message);
      if (errorResponse.detail) return errorResponse.detail;
    } catch {
      return error.message;
    }
    return "An unexpected error occurred during registration.";
  };

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
          Sign Up
        </Typography>

        <SignupForm
          credentials={credentials}
          isPending={isPending}
          error={getErrorMessage()}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}

export default Signup;
