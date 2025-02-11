/*
  # Initial Schema Setup for Magick Platform

  1. New Tables
    - `profiles`
      - Basic user profile information
      - Spiritual path and interests
    - `posts`
      - Content sharing for spiritual experiences
      - Support for text and media content
    - `resonances`
      - Track post resonances (similar to likes)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  spiritual_path text,
  interests text[],
  mantra text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  media_url text,
  media_type text CHECK (media_type IN ('image', 'video')),
  tags text[],
  resonance_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create resonances table
CREATE TABLE IF NOT EXISTS resonances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id),
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE resonances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their resonances"
  ON resonances
  USING (auth.uid() = user_id);

-- Function to increment post resonance count
CREATE OR REPLACE FUNCTION increment_resonance(post_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO resonances (post_id, user_id)
  VALUES (post_id, auth.uid())
  ON CONFLICT (post_id, user_id) DO NOTHING;
  
  UPDATE posts
  SET resonance_count = resonance_count + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;