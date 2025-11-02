import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { Box, CircularProgress } from "@mui/material";

export function RoleGuard() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
