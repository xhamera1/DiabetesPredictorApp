import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { adminService } from "../services/adminService";
import type { User } from "../utils/types";

export const useAdminUpdateUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthenticationContext();

  return useMutation({
    mutationFn: (user: User) => {
      if (!token) throw new Error("Not authenticated");
      return adminService.updateUser(token, user.id, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
