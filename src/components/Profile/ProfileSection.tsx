import React from 'react';
import { ProfileCard } from '@/components/Profile';
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard';
import { QuickPost } from '@/components/profile/QuickPost';
import { CreatePostModal } from '@/components/post/CreatePostModal';
import { useAuth } from '@/store/auth';

export function ProfileSection() {
  const [showCreatePost, setShowCreatePost] = React.useState(false);
  const { user } = useAuth();

  const profile = {
    id: user?.id || '1',
    name: 'Spiritual Seeker',
    spiritualPath: 'Reiki Healer',
    interests: ['Chakras', 'Energy Work', 'Meditation'],
    mantra: 'In stillness, we find our true power',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    resonanceCount: 108
  };

  return (
    <div className="space-y-6 sticky top-24">
      <ProfileCard profile={profile} />
      {user && <AnalyticsCard />}
      {user && (
        <QuickPost onOpenCreatePost={() => setShowCreatePost(true)} />
      )}
      
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
}