import React from 'react';
import { AuthModal } from './AuthModal';

export function AuthPrompt() {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center mb-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Join our spiritual community
        </h2>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Sign In / Sign Up
        </button>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}