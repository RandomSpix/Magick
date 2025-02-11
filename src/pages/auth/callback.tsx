import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithWix } from '@/lib/wix/auth';
import { useToast } from '@/lib/hooks/useToast';
import { Loader } from 'lucide-react';

export function WixCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const code = searchParams.get('code');

  useEffect(() => {
    async function handleWixCallback() {
      if (!code) {
        addToast({
          type: 'error',
          message: 'Authentication failed. Please try again.'
        });
        navigate('/');
        return;
      }

      try {
        await signInWithWix(code);
        addToast({
          type: 'success',
          message: 'Successfully signed in with Wix!'
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Wix auth error:', error);
        addToast({
          type: 'error',
          message: 'Failed to authenticate with Wix. Please try again.'
        });
        navigate('/');
      }
    }

    handleWixCallback();
  }, [code, navigate, addToast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-gray-700">
          Connecting to Wix...
        </h2>
      </div>
    </div>
  );
}