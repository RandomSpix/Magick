import { useState, useEffect } from 'react';
import { supabaseService } from '@/lib/supabase';

export function useInitialization() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        if (supabaseService.initialize()) {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    init();
  }, []);

  return isInitialized;
}