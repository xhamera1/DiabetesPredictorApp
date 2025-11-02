import { Container, Typography } from "@mui/material";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { useMe } from "../hooks/useMe";

import { AuthenticatedHomeView } from "../components/AuthenticatedHomeView";
import { GuestHomeView } from "../components/GuestHomeView";
import { LoadingView } from "../components/LoadingView";

export function Home() {
  const { isAuthenticated } = useAuthenticationContext();
  const { data: user, isLoading } = useMe();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Diabetes Prediction App
      </Typography>

      {isLoading && isAuthenticated ? (
        <LoadingView message="Loading user data..." />
      ) : isAuthenticated && user ? (
        <AuthenticatedHomeView user={user} />
      ) : (
        <GuestHomeView />
      )}
    </Container>
  );
}
