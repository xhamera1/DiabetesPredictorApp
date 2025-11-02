import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import type { UpdateUserRequest, User } from '../utils/types';

export const useUpdateUser = () => {
  const { token } = useAuthenticationContext();
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserRequest>({
    mutationFn: (updateData: UpdateUserRequest) => {
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      return userService.updateMe(updateData, token);
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      console.error('User update failed:', error.message);
    },
  });
};
