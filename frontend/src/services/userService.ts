import { ENDPOINTS } from "../config/api";
import type { User, UpdateUserRequest } from "../utils/types";

export const userService = {
  updateMe: async (
    data: UpdateUserRequest,
    token: string
  ): Promise<User> => {
    const response = await fetch(ENDPOINTS.PROFILE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update user profile.');
    }
    return response.json();
  },
};
