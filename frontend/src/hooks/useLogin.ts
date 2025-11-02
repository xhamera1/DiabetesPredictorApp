import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authenticationService } from "../services/authenticationService";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import type { LoginRequest, LoginResponse } from "../utils/types";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { saveToken } = useAuthenticationContext();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authenticationService.login,
    onSuccess: async (data) => {
      const token = data.accessToken;
      console.log("[useLogin] Token received:", token);

      if (token) {
        saveToken(token);
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        console.log("[useLogin] Navigating to home page...");
        navigate("/");
      } else {
        console.error("[useLogin] CRITICAL ERROR: Response received but accessToken is missing!");
      }
    },
    onError: (error) => {
      console.error("[useLogin] Login mutation failed:", error.message);
    },
  });
};
