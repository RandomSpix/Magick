import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthModal } from '@/components/auth/AuthModal';
import { Sparkles, Heart, Users, Compass, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { useTheme } from '@/store/theme';
import { Button } from '@/components/ui';

export function WelcomePage() {
  const [showAuth, setShowAuth] = React.useState(false);
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-gradient-to-br from-purple-50 via-white to-green-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            className="p-2 rounded-full"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-6xl font-bold ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-300 to-pink-300'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600'
          } bg-clip-text text-transparent mb-4`}>
            Welcome to RSMagick
          </h1>
          <p className={`text-lg md:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            A sacred space for spiritual seekers to connect, share wisdom, and grow together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Sparkles,
              title: 'Share Your Light',
              description: 'Express your spiritual journey through posts, images, and sacred wisdom'
            },
            {
              icon: Users,
              title: 'Join Sacred Circles',
              description: 'Connect with like-minded souls in spiritual communities'
            },
            {
              icon: Compass,
              title: 'Explore Realms',
              description: 'Journey through different spiritual dimensions and practices'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`${
                isDarkMode
                  ? 'bg-gray-800/80 text-white'
                  : 'bg-white/80'
              } backdrop-blur-sm rounded-xl p-6 text-center group hover:shadow-xl transition-all duration-300`}
            >
              <feature.icon className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-purple-300' : 'text-purple-600'
              } group-hover:text-purple-500 transition-colors`} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } text-sm md:text-base`}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => setShowAuth(true)}
            className={`px-8 py-3 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            } text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg`}
          >
            Begin Your Journey
          </button>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Join thousands of spiritual seekers in our growing community
          </p>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}