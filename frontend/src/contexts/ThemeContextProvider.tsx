// src/contexts/ThemeContextProvider.tsx
import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  type ReactNode,
} from "react";
import { createTheme, ThemeProvider, type Theme } from "@mui/material/styles";
import { type PaletteMode } from "@mui/material";

interface ThemeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                secondary: { main: "#dc004e" },
                background: {
                  default: "#f4f6f8",
                  paper: "#ffffff",
                },
              }
            : {
                primary: { main: "#90caf9" },
                secondary: { main: "#f48fb1" },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
