import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContextProvider";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationContextProvider>
          <ThemeContextProvider>
            <CssBaseline />
            <App />
          </ThemeContextProvider>
        </AuthenticationContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
