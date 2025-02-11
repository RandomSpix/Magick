import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/auth';
import { ROUTES } from '@/lib/constants/routes';

export function useProtectedRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(ROUTES.AUTH.SIGN_IN);
    }
  }, [user, loading, navigate]);

  return { isAuthenticated: !!user, loading };
}