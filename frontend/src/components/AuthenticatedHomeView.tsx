import { Typography, Chip, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
}

interface AuthenticatedHomeViewProps {
  user: User;
}

export function AuthenticatedHomeView({ user }: AuthenticatedHomeViewProps) {
  return (
    <>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
        Welcome, {user.firstName} {user.lastName}!
      </Typography>
      <Chip
        label={`Role: ${user.role}`}
        color={user.role === "ADMIN" ? "secondary" : "primary"}
        sx={{ mb: 4 }}
      />
      <Box>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/predict"
        >
          Go to Prediction
        </Button>
      </Box>
    </>
  );
}
