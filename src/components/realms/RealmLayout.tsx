import React from 'react';
import { Sparkles } from 'lucide-react';

interface RealmLayoutProps {
  title: string;
  description: string;
  coverImage: string;
  children: React.ReactNode;
}

export function RealmLayout({ title, description, coverImage, children }: RealmLayoutProps) {
  return (
    <div className="space-y-6">
      <div 
        className="h-48 rounded-xl relative overflow-hidden"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            {title}
            <Sparkles className="w-6 h-6 text-purple-300" />
          </h1>
          <p className="text-white/80 mt-2">{description}</p>
        </div>
      </div>
      
      {children}
    </div>
  );
}