import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BlogComment } from '@/components/blog/BlogComment';
import { supabase } from '@/lib/supabase';
import { Comment } from '@/types/blog';
import { User } from '@supabase/supabase-js';

interface CommentSectionProps {
  postId: string;
  currentUser: User | null;
}

// Define interfaces for the data returned from Supabase
interface CommentData {
  id: string;
  author: string;
  user_id: string;
  content: string;
  likes: number;
  post_id: string;
  parent_id?: string | null;
  created_at?: string;
}

export function CommentSection({ postId, currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Cast through unknown first, then map to Comment interface
      const rawComments = (data || []) as unknown as CommentData[];
      const mappedComments: Comment[] = rawComments.map((item) => ({
        id: item.id,
        author: item.author || 'Anonymous',
        user_id: item.user_id,
        content: item.content,
        date: item.created_at || new Date().toISOString(),
        created_at: item.created_at,
        likes: item.likes || 0,
        replies: [], // Initialize empty replies array
        userHasLiked: false, // This would need to be determined by checking user likes
        parent_id: item.parent_id,
        post_id: item.post_id
      }));
      
      setComments(mappedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert([
        {
          post_id: postId,
          user_id: currentUser.id,
          content: newComment,
          parent_id: null,
        },
      ]);

      if (error) throw error;

      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16">
      <Separator className="my-8" />
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comments ({loading ? '...' : comments.length})
      </h2>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        {currentUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="min-h-[100px]"
              required
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Please sign in to leave a comment.
          </div>
        )}
      </div>
      
      {/* Display comments */}
      <div className="mt-8 space-y-8">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <BlogComment
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
              postId={postId}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
}
