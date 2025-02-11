import React from 'react';
import { useTheme } from '@/store/theme';
import { Home, Compass, Users, MessageCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Realms', path: '/realms' },
  { icon: Users, label: 'Circles', path: '/circles' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Footer = () => {
  const { isMagicMode } = useTheme();

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
      isMagicMode 
        ? 'bg-gray-800/90 backdrop-blur-sm border-t border-purple-500/20' 
        : 'bg-white/90 backdrop-blur-sm border-t border-gray-200'
    }`}>
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isMagicMode
                  ? 'text-gray-400 hover:text-purple-400'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  );
};