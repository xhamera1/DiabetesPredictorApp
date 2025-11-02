import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticationService } from "../services/authenticationService";
import type { SignupRequest } from "../utils/types";


export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (credentials: SignupRequest) =>
      authenticationService.signup(credentials),

    onSuccess: () => {
      navigate("/login", { state: { registered: true } });
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });
};
