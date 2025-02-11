import React from 'react';
import { ProfileSection } from '@/components/profile/ProfileSection';
import { NewsFeed } from '@/components/feed/NewsFeed';
import { AuthPrompt } from '@/components/auth/AuthPrompt';
import { useAuth } from '@/store/auth';

export function HomePage() {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <ProfileSection />
      </div>
      
      <div className="md:col-span-2">
        {!user && <AuthPrompt />}
        <NewsFeed />
      </div>
    </div>
  );
}