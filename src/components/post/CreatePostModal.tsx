import React, { useState } from 'react';
import { usePosts } from '@/store/posts';
import { Button } from '@/components/ui';
import { useAuth } from '@/store/auth';

interface CreatePostModalProps {
  onClose: () => void;
}

export const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [tags, setTags] = useState('');
  const { createPost, error, clearError } = usePosts();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    clearError();

    try {
      await createPost({
        authorId: user.id,
        content,
        mediaUrl: mediaUrl || undefined,
        mediaType: 'image',
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Share Your Wisdom</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              rows={4}
              required
              maxLength={1000}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Media URL (optional)</label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Meditation, Chakras, Energy"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Share
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};