import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { useMe } from "../hooks/useMe";
import { useQueryClient } from "@tanstack/react-query";
import { ThemeToggleButton } from "./ThemeToggleButton";

export const NavBar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, clearToken } = useAuthenticationContext();
  const { data: user, isLoading } = useMe();

  const handleLogout = () => {
    clearToken();
    queryClient.setQueryData(["me"], null);
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigateTo("/")}
        >
          Diabetes Prediction
        </Typography>

        <ThemeToggleButton />

        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoading ? (
              <Skeleton variant="text" width={350} />
            ) : (
              <>
                <Button color="inherit" onClick={() => navigateTo("/")}>
                  Home
                </Button>
                <Button color="inherit" onClick={() => navigateTo("/predict")}>
                  Predict
                </Button>
                <Button color="inherit" onClick={() => navigateTo("/history")}>
                  History
                </Button>

                {}
                {user?.role === "ADMIN" && (
                  <Button color="inherit" onClick={() => navigateTo("/admin")}>
                    Admin Panel
                  </Button>
                )}

                <Button color="inherit" onClick={() => navigateTo("/account")}>
                  Account
                </Button>

                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigateTo("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigateTo("/register")}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
