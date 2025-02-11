import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '@/store/theme';
import { Button } from '@/components/ui';

export const MagicModeToggle = () => {
  const { isMagicMode, toggleMagicMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMagicMode}
      className="relative group"
    >
      <span className="sr-only">Toggle Magic Mode</span>
      <div className="relative">
        {isMagicMode ? (
          <Moon className="w-5 h-5 text-purple-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
        <Sparkles 
          className={`absolute -top-1 -right-1 w-3 h-3 text-purple-400 transition-opacity duration-300 ${
            isMagicMode ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </Button>
  );
};