import React from 'react';
import { PostCard } from '@/components/Post';
import { CreatePostModal } from '@/components/post/CreatePostModal';
import { Button } from '@/components/ui';
import { usePosts } from '@/store/posts';
import { Plus, RefreshCw } from 'lucide-react';
import { useTheme } from '@/store/theme';

export const NewsFeed = () => {
  const [showCreatePost, setShowCreatePost] = React.useState(false);
  const { posts, fetchPosts, loading } = usePosts();
  const { isMagicMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-semibold ${
          isMagicMode 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600'
        } bg-clip-text text-transparent`}>
          Spiritual Wisdom Feed
        </h2>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => fetchPosts()}
            className={`group ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setShowCreatePost(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Share Wisdom
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};