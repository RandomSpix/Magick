import React from 'react';
import { Heart, BookmarkPlus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';

interface PostActionsProps {
  resonanceCount: number;
  onResonance?: () => void;
  onComment?: () => void;
  onSave?: () => void;
}

export const PostActions = ({ resonanceCount, onResonance, onComment, onSave }: PostActionsProps) => {
  return (
    <div className="mt-4 flex items-center justify-between border-t pt-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2 group"
        onClick={onResonance}
      >
        <Heart className="w-5 h-5 group-hover:text-pink-500 transition-colors duration-200" />
        <span>{resonanceCount} Resonances</span>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={onComment}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Share Wisdom</span>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={onSave}
      >
        <BookmarkPlus className="w-5 h-5" />
        <span>Save</span>
      </Button>
    </div>
  );
};