import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function GuestHomeView() {
  return (
    <>
      <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
        Please log in to get started.
      </Typography>
      <Box>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={RouterLink}
          to="/register"
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}
