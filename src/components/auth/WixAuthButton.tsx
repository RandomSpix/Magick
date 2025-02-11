import React from 'react';
import { config } from '@/lib/config';
import { Button } from '@/components/ui';
import { useToast } from '@/lib/hooks/useToast';

export function WixAuthButton() {
  const { addToast } = useToast();

  const handleWixLogin = () => {
    // Check if Wix site is published
    if (!config.wix.siteUrl) {
      addToast({
        type: 'error',
        message: 'Wix site is not published yet. Please try again later.'
      });
      return;
    }

    // Construct the Wix OAuth URL with required parameters
    const wixAuthUrl = `https://www.wix.com/oauth2/authorize?` +
      `client_id=${config.wix.clientId}&` +
      `redirect_uri=${encodeURIComponent(config.wix.redirectUri)}&` +
      `response_type=code&` +
      `scope=offline_access member-subscriptions`;

    // Redirect to Wix login
    window.location.href = wixAuthUrl;
  };

  return (
    <Button
      onClick={handleWixLogin}
      className="w-full flex items-center justify-center gap-2"
    >
      <img 
        src="https://www.wix.com/favicon.ico" 
        alt="Wix" 
        className="w-5 h-5"
      />
      Sign in with Wix
    </Button>
  );
}