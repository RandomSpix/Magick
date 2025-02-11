import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingStateProps {
  error?: string | null;
}

export const LoadingState = ({ error }: LoadingStateProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-green-50">
      {error ? (
        <div className="text-center">
          <div className="p-4 bg-red-50 rounded-lg text-red-700 mb-4 max-w-md">
            {error}
          </div>
          <p className="text-gray-600">
            Please make sure you're connected to Supabase and try refreshing the page.
          </p>
        </div>
      ) : (
        <>
          <Loader className="w-12 h-12 text-purple-600 animate-spin mb-4" />
          <h2 className="text-xl font-medium text-gray-700">Initializing Magick...</h2>
          <p className="mt-2 text-gray-600">Please connect to Supabase to continue</p>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg text-amber-700 max-w-md text-center">
            Click the "Connect to Supabase" button in the top right corner to set up your connection
          </div>
        </>
      )}
    </div>
  );
};