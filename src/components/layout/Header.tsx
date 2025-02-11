import React from 'react';
import { Flame, Sparkles, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/store/auth';
import { Button } from '@/components/ui';
import { MagicModeToggle } from '@/components/theme/MagicModeToggle';
import { SpiritualRealmsMenu } from '@/components/navigation/SpiritualRealmsMenu';
import { SacredCirclesMenu } from '@/components/circles/SacredCirclesMenu';
import { useTheme } from '@/store/theme';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { isMagicMode, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/80 backdrop-blur-sm border-b border-gray-700' 
        : isMagicMode 
          ? 'bg-gray-800/80 backdrop-blur-sm border-b border-purple-500/20' 
          : 'bg-white/80 backdrop-blur-sm'
    } shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <Flame className={`w-8 h-8 ${
                isDarkMode 
                  ? 'text-purple-300'
                  : isMagicMode 
                    ? 'text-purple-400' 
                    : 'text-purple-600'
              } transition-colors duration-300`} />
              <Sparkles className={`absolute -top-1 -right-1 w-4 h-4 ${
                isDarkMode 
                  ? 'text-purple-300'
                  : isMagicMode 
                    ? 'text-pink-400' 
                    : 'text-amber-400'
              } transition-colors duration-300 ${
                isMagicMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </div>
            <h1 className={`text-2xl font-semibold ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-300 to-pink-300'
                : isMagicMode
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600'
            } bg-clip-text text-transparent transition-all duration-300`}>
              RSMagick
            </h1>
          </div>
          
          <nav className="flex items-center gap-6">
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
            <MagicModeToggle />
            <SpiritualRealmsMenu />
            <SacredCirclesMenu />
            {user && (
              <Button 
                variant="ghost" 
                onClick={() => signOut()}
                className="group relative"
              >
                <div className="magic-sparkle" />
                <span className="relative z-10">Transcend</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};