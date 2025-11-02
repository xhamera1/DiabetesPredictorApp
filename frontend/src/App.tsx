import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/SignUp";
import { MakePrediction } from "./pages/MakePrediction";
import { History } from "./pages/History";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Typography } from "@mui/material";
import { Admin } from "./pages/Admin";
import { RoleGuard } from "./routes/RoleGuard";

function App() {
  return (
    <>
      <NavBar />
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
    </>
  );
}

export default App;
