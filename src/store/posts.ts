import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Post } from '@/types';
import { useToast } from '@/lib/hooks/useToast';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'resonanceCount'>) => Promise<void>;
  fetchPosts: () => Promise<void>;
  resonateWithPost: (postId: string) => Promise<void>;
  clearError: () => void;
}

export const usePosts = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  createPost: async (post) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase()
        .from('posts')
        .insert([{ ...post, resonanceCount: 0 }]);
      
      if (error) throw error;
      
      await get().fetchPosts();
      useToast.getState().addToast({
        type: 'success',
        message: 'Your wisdom has been shared successfully!'
      });
    } catch (error) {
      const message = (error as Error).message;
      set({ error: message });
      useToast.getState().addToast({
        type: 'error',
        message: 'Failed to share your wisdom. Please try again.'
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase()
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            name,
            avatar_url,
            spiritual_path
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ posts: data });
    } catch (error) {
      const message = (error as Error).message;
      set({ error: message });
      useToast.getState().addToast({
        type: 'error',
        message: 'Failed to load posts. Please refresh the page.'
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  resonateWithPost: async (postId) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase().rpc('increment_resonance', { post_id: postId });
      
      if (error) throw error;
      
      await get().fetchPosts();
      useToast.getState().addToast({
        type: 'success',
        message: 'You have resonated with this wisdom!'
      });
    } catch (error) {
      const message = (error as Error).message;
      set({ error: message });
      useToast.getState().addToast({
        type: 'error',
        message: 'Failed to resonate with the post. Please try again.'
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));