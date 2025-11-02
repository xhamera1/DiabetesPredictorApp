import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMe } from "../hooks/useMe";
import { useUpdateUser } from "../hooks/useUpdateUser";
import type { UpdateUserRequest } from "../utils/types";

import { AccountForm } from "../components/AccountForm";
import { SnackbarNotification } from "../components/SnackbarNotification";

export function Account() {
  const { data: user, isLoading: isLoadingUser, error: userError } = useMe();
  const {
    mutate: updateUser,
    isPending,
    error: updateError,
    isSuccess,
    reset,
  } = useUpdateUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateRequest: UpdateUserRequest = {
      ...formData,
    };
    updateUser(updateRequest);
  };

  if (isLoadingUser) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userError) {
    return (
      <Container sx={{ my: 4 }}>
        <Alert severity="error">
          Error loading user data: {userError.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Account
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Update your profile information.
        </Typography>

        <AccountForm
          userEmail={user?.email || ""}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isPending={isPending}
          updateError={updateError as { message: string } | null}
        />
      </Paper>

      <SnackbarNotification
        open={isSuccess}
        message="Profile updated successfully!"
        severity="success"
        onClose={() => reset()}
      />
    </Container>
  );
}
