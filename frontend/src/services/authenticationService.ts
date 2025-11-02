import { ENDPOINTS } from "../config/api";
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  User,
} from "../utils/types";

export const authenticationService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Invalid credentials");
    }
    return response.json();
  },

  getMe: async (token: string): Promise<User> => {
    const response = await fetch(ENDPOINTS.ME, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Session expired or invalid.");
    }
    return response.json();
  },

  signup: async (credentials: SignupRequest): Promise<void> => {
    const response = await fetch(ENDPOINTS.SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create account.");
    }
  },
};
