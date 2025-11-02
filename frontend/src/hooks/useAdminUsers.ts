import { useQuery } from "@tanstack/react-query";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider";
import { adminService } from "../services/adminService";

export const useAdminUsers = (page: number, size: number) => {
  const { token } = useAuthenticationContext();

  return useQuery({
    queryKey: ["admin", "users", page],
    queryFn: () => {
      if (!token) throw new Error("Not authenticated");
      return adminService.getAllUsers(token, page, size);
    },
    enabled: !!token,
  });
};
