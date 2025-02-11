import { supabase } from '@/lib/supabase';
import { config } from '@/lib/config';
import { useToast } from '@/lib/hooks/useToast';

interface WixTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface WixSubscription {
  status: 'active' | 'inactive';
  planId: string;
  expiresAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function signInWithWix(code: string) {
  const { addToast } = useToast.getState();

  try {
    // 🔄 Instead of calling Wix directly, send the request to your backend
    const response = await fetch(`${API_URL}/auth/wix-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with Wix');
    }

    const { tokens, subscription, wixUser } = await response.json();

    if (subscription.status !== 'active') {
      addToast({
        type: 'error',
        message: 'Please subscribe to access RSMagick features',
      });
      
      // Redirect to Wix subscription page
      window.location.href = `${config.wix.siteUrl}/plans-pricing`;
      return null;
    }

    // Sign in to Supabase using custom JWT
    const { data: { user }, error } = await supabase().auth.signInWithOAuth({
      provider: 'wix',
      options: {
        redirectTo: config.wix.redirectUri,
        queryParams: {
          access_token: tokens.access_token,
          subscription_status: subscription.status,
        },
      },
    });

    if (error) throw error;

    // Link Wix account with Supabase profile
    if (user) {
      await supabase()
        .from('profiles')
        .upsert({
          id: user.id,
          wix_id: wixUser.id,
          name: wixUser.name,
          email: wixUser.email,
          avatar_url: wixUser.picture,
          subscription_status: subscription.status,
          subscription_expires_at: subscription.expiresAt,
        });

      addToast({
        type: 'success',
        message: 'Successfully signed in with Wix!',
      });
    }

    return user;
  } catch (error) {
    console.error('Wix authentication error:', error);
    addToast({
      type: 'error',
      message: 'Authentication failed. Please try again.',
    });
    throw error;
  }
}

export async function refreshWixSubscription(userId: string) {
  try {
    const { data: profile } = await supabase()
      .from('profiles')
      .select('wix_id, subscription_status')
      .eq('id', userId)
      .single();

    if (!profile) return false;

    // Implement subscription refresh logic here
    // This should be called periodically to ensure subscription is still active

    return profile.subscription_status === 'active';
  } catch (error) {
    console.error('Failed to refresh subscription:', error);
    return false;
  }
}
