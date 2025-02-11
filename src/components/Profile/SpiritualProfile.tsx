import React from 'react';
import { useSpiritualProfile } from '@/lib/hooks/useSpiritualProfile';
import { ProfileCard } from '@/components/Profile';
import { Loader } from 'lucide-react';

export function SpiritualProfile() {
  const { profile, loading, error } = useSpiritualProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-8 text-gray-500">
        Profile not found. Please complete your spiritual profile.
      </div>
    );
  }

  return <ProfileCard profile={profile} />;
}