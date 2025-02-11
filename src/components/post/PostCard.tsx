import React from 'react';
import { Post } from '@/types';
import { PostMedia } from './PostMedia';
import { PostTags } from './PostTags';
import { PostActions } from './PostActions';
import { usePosts } from '@/store/posts';
import { useAuth } from '@/store/auth';
import { useToast } from '@/lib/hooks/useToast';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { resonateWithPost } = usePosts();
  const { user } = useAuth();
  const { addToast } = useToast();

  const handleResonance = async () => {
    if (!user) {
      addToast({
        type: 'info',
        message: 'Please sign in to resonate with spiritual wisdom.'
      });
      return;
    }

    try {
      await resonateWithPost(post.id);
    } catch (error) {
      console.error('Failed to resonate:', error);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {post.mediaUrl && (
        <PostMedia
          url={post.mediaUrl}
          type={post.mediaType || 'image'}
          alt="Post media"
        />
      )}

      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>

      <PostTags tags={post.tags} />
      
      <PostActions
        resonanceCount={post.resonanceCount}
        onResonance={handleResonance}
      />
    </div>
  );
};