import { createContext, type ReactNode, useContext, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { User } from "../utils/types";

interface AuthenticationContextType {
  token: string | null;
  isAuthenticated: boolean;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);
const AUTH_TOKEN_KEY = "authToken";

export function AuthenticationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [token, setToken] = useLocalStorage<string | null>(
    AUTH_TOKEN_KEY,
    null
  );

  const saveToken = (tokenValue: string) => {
    setToken(tokenValue);
  };

  const clearToken = () => {
    setToken(null);
  };

  const contextValue = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      saveToken,
      clearToken,
    }),
    [token]
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error("useAuthenticationContext must be used within a provider");
  }
  return context;
};
