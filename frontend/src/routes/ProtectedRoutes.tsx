import { Navigate, Outlet } from "react-router-dom";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthenticationContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
