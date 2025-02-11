import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { RateLimiter } from '@/lib/security';
import { generateCSRFToken } from '@/lib/security/csrf';
import { sanitizeInput } from '@/lib/security/xss';
import type { User } from '@supabase/supabase-js';
import { useToast } from '@/lib/hooks/useToast';

const rateLimiter = new RateLimiter();
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initializeAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryOperation = async <T>(
  operation: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0 && (error as Error).message.includes('connect error')) {
      await delay(RETRY_DELAY);
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  initializeAuth: async () => {
    try {
      set({ loading: true });
      const { data: { session } } = await retryOperation(() => 
        supabase().auth.getSession()
      );
      set({ user: session?.user || null });
      
      // Set up auth state change listener
      supabase().auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user || null });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      useToast.getState().addToast({
        type: 'error',
        message: 'Failed to connect to authentication service. Please check your internet connection and try again.'
      });
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      
      // Rate limiting check
      if (!rateLimiter.checkRateLimit(email)) {
        const timeRemaining = Math.ceil(rateLimiter.getTimeRemaining(email) / 1000 / 60);
        throw new Error(`Too many login attempts. Please try again in ${timeRemaining} minutes.`);
      }

      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email);

      const { data, error } = await retryOperation(() =>
        supabase().auth.signInWithPassword({ 
          email: sanitizedEmail, 
          password,
        })
      );

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw error;
      }

      // Generate new CSRF token on successful login
      const csrfToken = generateCSRFToken();
      document.cookie = `csrf=${csrfToken}; path=/; secure; samesite=strict`;

      set({ user: data.user });
      useToast.getState().addToast({
        type: 'success',
        message: 'Successfully signed in!'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMessage });
      useToast.getState().addToast({
        type: 'error',
        message: errorMessage.includes('connect error') 
          ? 'Unable to connect to the authentication service. Please check your internet connection and try again.'
          : errorMessage
      });
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });

      // Basic password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email);

      const { data, error } = await retryOperation(() =>
        supabase().auth.signUp({ 
          email: sanitizedEmail, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              csrf_token: generateCSRFToken(),
            }
          }
        })
      );
      
      if (error) {
        if (error.message.includes('already registered')) {
          throw new Error('This email is already registered. Please sign in instead.');
        }
        throw error;
      }

      set({ user: data.user });
      useToast.getState().addToast({
        type: 'success',
        message: 'Account created successfully!'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMessage });
      useToast.getState().addToast({
        type: 'error',
        message: errorMessage.includes('connect error')
          ? 'Unable to connect to the authentication service. Please check your internet connection and try again.'
          : errorMessage
      });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await retryOperation(() =>
        supabase().auth.signOut()
      );
      if (error) throw error;
      set({ user: null });
      
      // Clear CSRF token
      document.cookie = 'csrf=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      useToast.getState().addToast({
        type: 'success',
        message: 'Successfully signed out'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMessage });
      useToast.getState().addToast({
        type: 'error',
        message: 'Failed to sign out. Please try again.'
      });
    } finally {
      set({ loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));