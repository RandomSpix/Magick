import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types';

export function useSpiritualFeed(realm?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase()
          .from('posts')
          .select(`
            *,
            profiles:author_id (
              name,
              avatar_url,
              spiritual_path
            )
          `)
          .order('created_at', { ascending: false });

        if (realm) {
          query = query.eq('realm', realm);
        }

        const { data, error: fetchError } = await query;
        
        if (fetchError) throw fetchError;
        setPosts(data || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [realm]);

  return { posts, loading, error };
}