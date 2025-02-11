import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/store/theme';
import { Button } from '@/components/ui';

interface ResonanceButtonProps {
  count: number;
  onResonate: () => void;
  hasResonated?: boolean;
}

export const ResonanceButton = ({ count, onResonate, hasResonated }: ResonanceButtonProps) => {
  const { isMagicMode } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={onResonate}
      className={`group relative ${hasResonated ? 'text-purple-500' : ''}`}
    >
      <div className="magic-sparkle" />
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className={`w-5 h-5 ${
          isMagicMode ? 'text-purple-400' : 'text-amber-400'
        } ${hasResonated ? 'animate-float' : ''}`} />
        {count} {count === 1 ? 'Soul Resonates' : 'Souls Resonate'}
      </span>
    </Button>
  );
};