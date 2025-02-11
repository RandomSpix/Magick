import { supabase } from '@/lib/supabase';

export async function refreshSession(): Promise<void> {
  const { data: { session } } = await supabase().auth.getSession();
  
  if (session?.expires_at) {
    const expiresAt = new Date(session.expires_at * 1000);
    const now = new Date();
    const timeUntilExpiry = expiresAt.getTime() - now.getTime();
    
    // Refresh token if it expires in less than 5 minutes
    if (timeUntilExpiry < 5 * 60 * 1000) {
      await supabase().auth.refreshSession();
    }
  }
}