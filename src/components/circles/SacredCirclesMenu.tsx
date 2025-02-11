import React from 'react';
import { useTheme } from '@/store/theme';
import { Users, Shield, Sparkles } from 'lucide-react';
import type { SacredCircle } from '@/types';

const featuredCircles: SacredCircle[] = [
  {
    id: '1',
    name: 'Mystic Sages',
    description: 'Ancient wisdom keepers and spiritual guides',
    creatorId: '1',
    memberCount: 128,
    realm: 'Ancient Wisdom',
    isPrivate: false
  },
  {
    id: '2',
    name: 'Crystal Healers',
    description: 'Exploring crystal energy and healing',
    creatorId: '1',
    memberCount: 256,
    realm: 'Crystal Kingdom',
    isPrivate: true
  }
];

export const SacredCirclesMenu = () => {
  const { isMagicMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isMagicMode
            ? 'bg-gray-800/90 text-white hover:bg-purple-500/20'
            : 'bg-white text-gray-800 hover:bg-purple-50'
        }`}
      >
        <Users className="w-5 h-5" />
        <span>Sacred Circles</span>
        <Sparkles className={`w-4 h-4 ${isMagicMode ? 'text-purple-400' : 'text-amber-400'}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-72 rounded-xl shadow-xl overflow-hidden transition-all duration-300 animate-float ${
          isMagicMode
            ? 'bg-gray-800/95 border border-purple-500/20'
            : 'bg-white'
        }`}>
          {featuredCircles.map((circle) => (
            <a
              key={circle.id}
              href={`/circles/${circle.id}`}
              className={`flex items-start gap-4 p-4 transition-all duration-200 group ${
                isMagicMode
                  ? 'hover:bg-purple-500/20 text-white'
                  : 'hover:bg-purple-50 text-gray-800'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isMagicMode ? 'bg-purple-900/50' : 'bg-purple-100'
              }`}>
                {circle.isPrivate ? (
                  <Shield className="w-5 h-5 text-amber-400" />
                ) : (
                  <Users className={`w-5 h-5 ${
                    isMagicMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{circle.name}</h3>
                  {circle.isPrivate && (
                    <Shield className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <p className={`text-sm ${
                  isMagicMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{circle.description}</p>
                <p className={`text-xs mt-1 ${
                  isMagicMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {circle.memberCount} members
                </p>
              </div>
            </a>
          ))}
          <div className={`p-4 border-t ${
            isMagicMode ? 'border-purple-500/20' : 'border-gray-100'
          }`}>
            <a
              href="/circles/discover"
              className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                isMagicMode
                  ? 'bg-purple-500/20 hover:bg-purple-500/30 text-white'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Discover More Circles</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};