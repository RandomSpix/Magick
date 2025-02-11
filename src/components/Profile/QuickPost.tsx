import React from 'react';
import { useTheme } from '@/store/theme';
import { Sparkles, Image, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui';

interface QuickPostProps {
  onOpenCreatePost: () => void;
}

export const QuickPost = ({ onOpenCreatePost }: QuickPostProps) => {
  const { isMagicMode } = useTheme();

  return (
    <div className={`p-4 rounded-xl transition-all duration-300 ${
      isMagicMode 
        ? 'bg-gray-800/90 border border-purple-500/20' 
        : 'bg-white shadow-lg'
    }`}>
      <button
        onClick={onOpenCreatePost}
        className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
          isMagicMode
            ? 'bg-gray-700/50 text-gray-400 hover:bg-purple-500/20'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Share your spiritual wisdom...
      </button>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="group">
            <Image className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="group">
            <LinkIcon className="w-5 h-5" />
          </Button>
        </div>
        <Button onClick={onOpenCreatePost} size="sm" className="group">
          <Sparkles className="w-4 h-4 mr-2" />
          Share Wisdom
        </Button>
      </div>
    </div>
  );
};