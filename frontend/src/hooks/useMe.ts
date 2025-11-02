import { useQuery } from '@tanstack/react-query';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import { authenticationService } from '../services/authenticationService';
import type { User } from '../utils/types';

export const useMe = () => {
  const { token, isAuthenticated } = useAuthenticationContext();

  return useQuery<User, Error>({
    queryKey: ['me'], 

    queryFn: () => {
      if (!token) {
        return Promise.reject(new Error('No valid token'));
      }
      return authenticationService.getMe(token);
    },
    
    enabled: isAuthenticated,
  });
};
