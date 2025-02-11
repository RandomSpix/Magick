import React from 'react';
import { Profile } from '@/types';
import { Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-xl">
      <div className="flex items-center space-x-4">
        <img
          src={profile.avatarUrl}
          alt={profile.name || 'Spiritual Being'}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-400"
        />
        <div>
          <h3 className="text-xl font-medium text-gray-800">
            {profile.name || 'Anonymous Sage'}
          </h3>
          <p className="text-sm text-purple-600">{profile.spiritualPath}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-600 italic">&quot;{profile.mantra}&quot;</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.interests.map((interest) => (
          <span
            key={interest}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
          >
            {interest}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center text-gray-600">
        <Sparkles className="w-4 h-4 mr-1" />
        <span>{profile.resonanceCount} souls resonated</span>
      </div>
    </div>
  );
};