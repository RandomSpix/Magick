import { supabase } from '@/lib/supabase';
import { useCSRFStore } from '@/lib/security/csrf';
import { sanitizeInput } from '@/lib/security/xss';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { token } = useCSRFStore.getState();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('X-CSRF-Token', token);
  }

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}