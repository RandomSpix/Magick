import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { LoadingState } from '@/components/layout/LoadingState';
import { WelcomePage } from '@/pages/Welcome';
import { HomePage } from '@/pages/Home';
import { AstralPlanePage } from '@/pages/realms/AstralPlane';
import { ToastContainer } from '@/components/common/ToastContainer';
import { supabaseService } from '@/lib/supabase';
import { useAuth } from '@/store/auth';
import { useSession } from '@/lib/hooks/useSession';
import { ROUTES } from '@/lib/constants/routes';

function App() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [initError, setInitError] = React.useState<string | null>(null);
  const { user, initializeAuth } = useAuth();

  // Automatic session refresh
  useSession();

  React.useEffect(() => {
    const init = async () => {
      try {
        const initialized = supabaseService.initialize();
        if (!initialized) {
          setInitError('Failed to initialize Supabase. Please check your connection.');
          return;
        }
        
        // Initialize auth state
        await initializeAuth();
        setIsInitialized(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setInitError((error as Error).message);
      }
    };

    init();
  }, [initializeAuth]);

  if (!isInitialized) {
    return <LoadingState error={initError} />;
  }

  return (
    <>
      <Routes>
        <Route path={ROUTES.HOME} element={
          user ? <Navigate to={ROUTES.DASHBOARD} /> : <WelcomePage />
        } />
        <Route element={<Layout />}>
          <Route path={ROUTES.DASHBOARD} element={<HomePage />} />
          <Route path={ROUTES.REALMS.ASTRAL} element={<AstralPlanePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;