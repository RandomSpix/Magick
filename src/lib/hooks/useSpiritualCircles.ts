import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SacredCircle } from '@/types';

export function useSpiritualCircles() {
  const [circles, setCircles] = useState<SacredCircle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCircles() {
      try {
        const { data, error: fetchError } = await supabase()
          .from('sacred_circles')
          .select('*')
          .order('member_count', { ascending: false });

        if (fetchError) throw fetchError;
        setCircles(data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchCircles();
  }, []);

  return { circles, loading, error };
}