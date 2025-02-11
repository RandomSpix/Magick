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

export async function signInWithWix(code: string) {
  const { addToast } = useToast.getState();

  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await fetch('https://www.wixapis.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: config.wix.clientId,
        client_secret: config.wix.clientSecret,
        code,
        redirect_uri: config.wix.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Wix access token');
    }

    const tokens: WixTokens = await tokenResponse.json();

    // Check subscription status
    const subscriptionResponse = await fetch('https://www.wixapis.com/members/v1/members/subscription', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    if (!subscriptionResponse.ok) {
      throw new Error('Failed to verify subscription status');
    }

    const subscription: WixSubscription = await subscriptionResponse.json();

    if (subscription.status !== 'active') {
      addToast({
        type: 'error',
        message: 'Please subscribe to access RSMagick features',
      });
      
      // Redirect to Wix subscription page
      window.location.href = `${config.wix.siteUrl}/plans-pricing`;
      return null;
    }

    // Get user info from Wix
    const userResponse = await fetch('https://www.wixapis.com/v1/users', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const wixUser = await userResponse.json();

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