import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { adminService } from "../services/adminService";

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthenticationContext();

  return useMutation({
    mutationFn: (userId: number) => {
      if (!token) throw new Error("Not authenticated");
      return adminService.deleteUser(token, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
