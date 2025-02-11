import React from 'react';

interface PostTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export const PostTags = ({ tags, onTagClick }: PostTagsProps) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors duration-200 cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};