import React from 'react';
import { useTheme } from '@/store/theme';
import { Sparkles, Star, Moon, Sun, Compass, Gem, Leaf, Droplet, Building } from 'lucide-react';
import type { SpiritualRealm } from '@/types';

const realms: Array<{
  id: SpiritualRealm;
  name: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    id: 'Astral Plane',
    name: 'Astral Plane',
    description: 'Explore the ethereal dimensions of consciousness',
    icon: Moon
  },
  {
    id: 'Crystal Kingdom',
    name: 'Crystal Kingdom',
    description: 'Discover the healing power of crystals',
    icon: Gem // Changed from Crystal to Gem
  },
  {
    id: 'Sacred Grove',
    name: 'Sacred Grove',
    description: 'Connect with ancient earth wisdom',
    icon: Leaf // Changed from Tree to Leaf
  },
  {
    id: 'Healing Waters',
    name: 'Healing Waters',
    description: 'Immerse in spiritual cleansing',
    icon: Droplet // Changed from Waves to Droplet
  },
  {
    id: 'Ethereal Temple',
    name: 'Ethereal Temple',
    description: 'Access divine knowledge and wisdom',
    icon: Building // Changed from Temple to Building
  }
];

export const SpiritualRealmsMenu = () => {
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
        <Compass className="w-5 h-5" />
        <span>Spiritual Realms</span>
        <Sparkles className={`w-4 h-4 ${isMagicMode ? 'text-purple-400' : 'text-amber-400'}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-2 w-72 rounded-xl shadow-xl overflow-hidden transition-all duration-300 animate-float ${
          isMagicMode
            ? 'bg-gray-800/95 border border-purple-500/20'
            : 'bg-white'
        }`}>
          {realms.map((realm) => (
            <a
              key={realm.id}
              href={`/realms/${realm.id.toLowerCase().replace(' ', '-')}`}
              className={`flex items-start gap-4 p-4 transition-all duration-200 group ${
                isMagicMode
                  ? 'hover:bg-purple-500/20 text-white'
                  : 'hover:bg-purple-50 text-gray-800'
              }`}
            >
              <realm.icon className={`w-6 h-6 ${
                isMagicMode ? 'text-purple-400' : 'text-purple-600'
              } group-hover:animate-float`} />
              <div>
                <h3 className="font-medium">{realm.name}</h3>
                <p className={`text-sm ${
                  isMagicMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{realm.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};