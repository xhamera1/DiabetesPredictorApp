import { Routes, Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";

import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { MakePrediction } from "./pages/MakePrediction";
import { History } from "./pages/History";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Admin } from "./pages/Admin";
import { RoleGuard } from "./routes/RoleGuard";

import { Footer } from "./components/Footer";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />

      <Box component="main" sx={{ flexGrow: 1, py: 3, px: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/predict" element={<MakePrediction />} />
            <Route path="/history" element={<History />} />
            <Route path="/account" element={<Account />} />

            <Route element={<RoleGuard />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <Typography variant="h1" align="center" sx={{ mt: 5 }}>
                404 - Page not found
              </Typography>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
