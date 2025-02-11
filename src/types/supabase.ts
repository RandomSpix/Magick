export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          spiritual_path: string | null;
          interests: string[] | null;
          mantra: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          spiritual_path?: string | null;
          interests?: string[] | null;
          mantra?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          spiritual_path?: string | null;
          interests?: string[] | null;
          mantra?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          content: string;
          media_url: string | null;
          media_type: 'image' | 'video' | null;
          tags: string[];
          resonance_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          content: string;
          media_url?: string | null;
          media_type?: 'image' | 'video' | null;
          tags?: string[];
          resonance_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          content?: string;
          media_url?: string | null;
          media_type?: 'image' | 'video' | null;
          tags?: string[];
          resonance_count?: number;
          created_at?: string;
        };
      };
    };
  };
}