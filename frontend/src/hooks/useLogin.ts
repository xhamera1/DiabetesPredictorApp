import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { login, type LoginRequest } from '../services/authService';

export function useLogin() {
    const { setToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const doLogin = async (payload: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const { token } = await login(payload);
            setToken(token);
        }
        catch (e) {
            const msg = e instanceof Error ? e.message : 'Unknown error';
            setError(msg);
            throw e;

        }
        finally {
            setIsLoading(false);
        }
    };

    return { doLogin, isLoading, error };

}