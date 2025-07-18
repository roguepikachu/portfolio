
-- Create comments table without foreign key constraint to posts
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  parent_id UUID REFERENCES comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW())
);

-- Create comment_likes table to track which users have liked which comments
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  post_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  UNIQUE(comment_id, user_id)
);

-- Create votes table for upvotes/downvotes on posts, projects, and publications
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('blog', 'project', 'publication')),
  user_id UUID NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
  UNIQUE(item_id, item_type, user_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON comments(parent_id);
CREATE INDEX IF NOT EXISTS comment_likes_comment_id_idx ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS comment_likes_user_id_idx ON comment_likes(user_id);
CREATE INDEX IF NOT EXISTS comment_likes_post_id_idx ON comment_likes(post_id);
CREATE INDEX IF NOT EXISTS votes_item_id_idx ON votes(item_id);
CREATE INDEX IF NOT EXISTS votes_item_type_idx ON votes(item_type);
CREATE INDEX IF NOT EXISTS votes_user_id_idx ON votes(user_id);

-- Create RLS policies
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Everyone can read comments
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (true);

-- Only authenticated users can insert comments
CREATE POLICY "Authenticated users can insert comments"
  ON comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Users can update/delete their own comments
CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- Comment likes policies
CREATE POLICY "Anyone can read likes"
  ON comment_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert likes"
  ON comment_likes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete own likes"
  ON comment_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Votes policies
CREATE POLICY "Anyone can read votes"
  ON votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert votes"
  ON votes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own votes"
  ON votes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON votes FOR DELETE
  USING (auth.uid() = user_id);
