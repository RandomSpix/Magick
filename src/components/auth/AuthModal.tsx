import React, { useState } from 'react';
import { useAuth } from '@/store/auth';
import { Button } from '@/components/ui';
import { useTheme } from '@/store/theme';
import { Sparkles, Moon, Sun, X, Mail, Lock, User } from 'lucide-react';
import { WixAuthButton } from '@/components/auth/WixAuthButton';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp, error, clearError } = useAuth();
  const { isMagicMode, isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      if (isSignIn) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`relative w-full max-w-md p-8 rounded-2xl ${
          isDarkMode 
            ? 'bg-gray-900 text-white border border-gray-700' 
            : isMagicMode 
              ? 'bg-gray-800/95 text-white border border-purple-500/20' 
              : 'bg-white'
        } backdrop-blur-lg transition-all duration-300 group`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="RSMagick Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        <h2 className={`text-xl font-semibold mb-6 text-center ${
          isMagicMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600'
        } bg-clip-text text-transparent flex items-center justify-center gap-2`}>
          {isMagicMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          {isSignIn ? 'Enter the Spiritual Realm' : 'Begin Your Spiritual Journey'}
        </h2>

        {error && (
          <div className={`mb-4 p-3 rounded-md ${
            isDarkMode || isMagicMode
              ? 'bg-red-900/50 text-red-200' 
              : 'bg-red-50 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div>
              <label className="block text-sm font-medium mb-1">Spiritual Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    isDarkMode || isMagicMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder="Enter your spiritual name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode || isMagicMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode || isMagicMode
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter your password"
                required
              />
            </div>
            {!isSignIn && <PasswordStrengthMeter password={password} />}
          </div>

          <Button type="submit" className="w-full">
            {isSignIn ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className={`text-sm ${
              isDarkMode || isMagicMode ? 'text-purple-400' : 'text-purple-600'
            } hover:underline`}
          >
            {isSignIn 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${
              isDarkMode || isMagicMode ? 'border-gray-600' : 'border-gray-300'
            }`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${
              isDarkMode || isMagicMode ? 'bg-gray-900' : 'bg-white'
            } ${
              isDarkMode || isMagicMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Continue with Wix Subscription
            </span>
          </div>
        </div>

        <WixAuthButton />
      </div>
    </div>
  );
};