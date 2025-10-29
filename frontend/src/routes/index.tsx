import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginPage from "../pages/LoginPage";

function HomePage() {
  return <h2>Witaj w Diabetes Predictor</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
