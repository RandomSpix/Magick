import { useEffect } from 'react';
import { refreshSession } from '@/lib/security/session';

export function useSession() {
  useEffect(() => {
    const interval = setInterval(refreshSession, 4 * 60 * 1000); // Check every 4 minutes
    return () => clearInterval(interval);
  }, []);
}