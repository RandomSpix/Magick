import React from 'react';
import { useTheme } from '@/store/theme';
import {
  Compass,
  Users,
  Sparkles,
  BookOpen,
  MessageCircle,
  Settings,
} from 'lucide-react';

const navigationItems = [
  {
    name: 'Spiritual Realms',
    icon: Compass,
    path: '/realms',
    description: 'Explore different spiritual dimensions',
  },
  {
    name: 'Sacred Circles',
    icon: Users,
    path: '/circles',
    description: 'Join mystical communities',
  },
  {
    name: 'Wisdom Feed',
    icon: BookOpen,
    path: '/feed',
    description: 'Discover spiritual insights',
  },
  {
    name: 'Spirit Chat',
    icon: MessageCircle,
    path: '/chat',
    description: 'Connect with fellow seekers',
  },
  {
    name: 'Sacred Settings',
    icon: Settings,
    path: '/settings',
    description: 'Customize your spiritual journey',
  },
];

export const NavigationMenu = () => {
  const { isMagicMode } = useTheme();

  return (
    <nav className={`space-y-2 ${isMagicMode ? 'text-gray-300' : 'text-gray-600'}`}>
      {navigationItems.map((item) => (
        <a
          key={item.path}
          href={item.path}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 group relative ${
            isMagicMode
              ? 'hover:bg-purple-500/10 hover:text-purple-400'
              : 'hover:bg-purple-50 hover:text-purple-600'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.name}</span>
          <Sparkles
            className={`absolute right-2 w-3 h-3 transition-opacity duration-300 ${
              isMagicMode ? 'text-purple-400' : 'text-amber-400'
            } opacity-0 group-hover:opacity-100`}
          />
        </a>
      ))}
    </nav>
  );
};