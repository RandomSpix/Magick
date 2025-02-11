import React from 'react';

interface PostMediaProps {
  url: string;
  type: 'image' | 'video';
  alt?: string;
}

export const PostMedia = ({ url, type, alt }: PostMediaProps) => {
  return (
    <div className="mb-4 rounded-lg overflow-hidden">
      {type === 'image' ? (
        <img
          src={url}
          alt={alt || 'Post media'}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      ) : (
        <video
          src={url}
          controls
          className="w-full"
        />
      )}
    </div>
  );
};