import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

class SupabaseService {
  private static instance: SupabaseService;
  private client: ReturnType<typeof createClient<Database>> | null = null;

  private constructor() {}

  static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  initialize(): boolean {
    if (this.client) return true;

    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.warn('Supabase credentials not found. Please connect to Supabase first.');
      return false;
    }

    try {
      this.client = createClient<Database>(url, key, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          storageKey: 'supabase.auth.token',
        },
        global: {
          headers: {
            'X-Client-Info': 'magick-spiritual-platform'
          }
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  getClient() {
    if (!this.client) {
      throw new Error(
        'Supabase not initialized. Please connect using the "Connect to Supabase" button.'
      );
    }
    return this.client;
  }
}

export const supabaseService = SupabaseService.getInstance();
export const supabase = () => supabaseService.getClient();