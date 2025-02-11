import React from 'react';
import { useSpiritualFeed } from '@/lib/hooks/useSpiritualFeed';
import { PostCard } from '@/components/Post';
import { Loader } from 'lucide-react';

interface SpiritualFeedProps {
  realm?: string;
}

export function SpiritualFeed({ realm }: SpiritualFeedProps) {
  const { posts, loading, error } = useSpiritualFeed(realm);

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

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No spiritual wisdom has been shared yet. Be the first to share!
        </div>
      )}
    </div>
  );
}