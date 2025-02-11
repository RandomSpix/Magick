import { z } from 'zod';

// Environment configuration
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  wix: {
    clientId: import.meta.env.VITE_WIX_CLIENT_ID,
    clientSecret: import.meta.env.VITE_WIX_CLIENT_SECRET,
    redirectUri: import.meta.env.VITE_WIX_REDIRECT_URI,
    siteUrl: import.meta.env.VITE_WIX_SITE_URL,
  },
  app: {
    name: 'RSMagick',
    description: 'A spiritual social media platform',
  },
} as const;

// Validate environment variables
export const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string(),
  VITE_WIX_CLIENT_ID: z.string(),
  VITE_WIX_CLIENT_SECRET: z.string(),
  VITE_WIX_REDIRECT_URI: z.string().url(),
  VITE_WIX_SITE_URL: z.string().url().optional(),
});