import React from 'react';
import { Users, Lock, Sparkles } from 'lucide-react';
import { useTheme } from '@/store/theme';
import type { SacredCircle } from '@/types';
import { Button } from '@/components/ui';

interface SacredCircleCardProps {
  circle: SacredCircle;
  onJoin?: () => void;
}

export const SacredCircleCard = ({ circle, onJoin }: SacredCircleCardProps) => {
  const { isMagicMode } = useTheme();

  return (
    <div className={`relative group rounded-xl p-6 transition-all duration-300 ${
      isMagicMode ? 'magic-card' : 'bg-white/90 shadow-lg hover:shadow-xl'
    }`}>
      <div className="magic-glow rounded-xl" />
      
      <div className="flex items-center gap-4">
        {circle.avatarUrl ? (
          <img
            src={circle.avatarUrl}
            alt={circle.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-400"
          />
        ) : (
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isMagicMode ? 'bg-purple-900/50' : 'bg-purple-100'
          }`}>
            <Users className={`w-8 h-8 ${
              isMagicMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>
        )}

        <div>
          <h3 className={`text-xl font-medium flex items-center gap-2 ${
            isMagicMode ? 'text-white' : 'text-gray-800'
          }`}>
            {circle.name}
            {circle.isPrivate && <Lock className="w-4 h-4 text-amber-400" />}
          </h3>
          <p className={`text-sm ${
            isMagicMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {circle.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-sm flex items-center gap-1 ${
          isMagicMode ? 'text-purple-400' : 'text-purple-600'
        }`}>
          <Users className="w-4 h-4" />
          {circle.memberCount} members
        </span>

        <Button
          onClick={onJoin}
          variant="ghost"
          className="group relative"
        >
          <div className="magic-sparkle" />
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Join Circle
          </span>
        </Button>
      </div>
    </div>
  );
};