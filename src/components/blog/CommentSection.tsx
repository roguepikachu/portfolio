
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BlogComment } from '@/components/blog/BlogComment';
import { AuthSection } from '@/components/blog/AuthSection';
import { supabase } from '@/lib/supabase';
import { Comment } from '@/types/blog';
import { User } from '@supabase/supabase-js';

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Supabase is properly configured
    const checkSupabaseConfig = async () => {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!url || !key || url === "your-supabase-project-url.supabase.co" || key === "your-supabase-anon-key") {
          console.log("Supabase not configured properly");
          setIsSupabaseConfigured(false);
          setIsLoading(false);
          return false;
        }
        
        setIsSupabaseConfigured(true);
        return true;
      } catch (error) {
        console.error("Error checking Supabase config:", error);
        setIsSupabaseConfigured(false);
        setIsLoading(false);
        return false;
      }
    };
    
    const fetchData = async () => {
      const isConfigured = await checkSupabaseConfig();
      if (!isConfigured) return;
      
      try {
        await fetchComments();
        await checkUser();
      } catch (error) {
        console.error("Error initializing comments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Listen for auth changes if Supabase is configured
    let authSubscription: { unsubscribe?: () => void } = {};
    
    if (isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        setCurrentUser(session?.user || null);
        if (event === 'SIGNED_IN') {
          fetchComments(); // Reload comments to get user likes
        }
      });
      
      // Store the unsubscribe function
      if (data?.subscription) {
        authSubscription.unsubscribe = () => data.subscription.unsubscribe();
      }
    }
    
    return () => {
      // Cleanup subscription when component unmounts
      if (authSubscription.unsubscribe) {
        authSubscription.unsubscribe();
      }
    };
  }, [postId]);
  
  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      // Get main comments
      const { data: mainComments, error: mainError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .is('parent_id', null)
        .order('created_at', { ascending: false });
          
      if (mainError) throw mainError;
      
      if (!mainComments) {
        setComments([]);
        return;
      }
      
      // Get user likes if logged in
      const { data: { user } } = await supabase.auth.getUser();
      let userLikes: Record<string, boolean> = {};
      
      if (user) {
        const { data: likes } = await supabase
          .from('comment_likes')
          .select('comment_id')
          .eq('user_id', user.id)
          .eq('post_id', postId);
            
        if (likes) {
          userLikes = likes.reduce((acc: Record<string, boolean>, like) => {
            acc[like.comment_id] = true;
            return acc;
          }, {});
        }
      }
      
      // Get replies for each comment
      const commentsWithReplies = await Promise.all(
        mainComments.map(async (comment) => {
          const { data: replies } = await supabase
            .from('comments')
            .select('*')
            .eq('parent_id', comment.id)
            .order('created_at', { ascending: true });
              
          const repliesWithLikes = replies?.map(reply => ({
            ...reply,
            userHasLiked: userLikes[reply.id] || false,
            replies: [],
            // Ensure date is available for formatting in component
            date: reply.created_at || reply.date || new Date().toISOString()
          })) || [];
            
          return {
            ...comment,
            userHasLiked: userLikes[comment.id] || false,
            replies: repliesWithLikes,
            // Ensure date is available for formatting in component
            date: comment.created_at || comment.date || new Date().toISOString()
          };
        })
      );
      
      setComments(commentsWithReplies);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    
    setIsSubmitting(true);
    try {
      // Insert comment into database
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: currentUser.id,
          content: newComment,
          author: currentUser.user_metadata?.full_name || 
                  currentUser.user_metadata?.name || 
                  currentUser.email?.split('@')[0] || 'User',
          likes: 0
        })
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('No data returned after comment insertion');
      }
      
      // Add new comment to state
      const newCommentObj: Comment = {
        ...data[0],
        userHasLiked: false,
        replies: [],
        date: data[0].created_at || new Date().toISOString()
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReplySubmit = async (parentId: string, content: string) => {
    if (!content.trim() || !currentUser) return;
    
    try {
      // Insert reply into database
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          parent_id: parentId,
          user_id: currentUser.id,
          content: content,
          author: currentUser.user_metadata?.full_name || 
                  currentUser.user_metadata?.name || 
                  currentUser.email?.split('@')[0] || 'User',
          likes: 0
        })
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('No data returned after reply insertion');
      }
      
      // Add reply to state
      const newReply: Comment = {
        ...data[0],
        userHasLiked: false,
        replies: [],
        date: data[0].created_at || new Date().toISOString()
      };
      
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      }));
      
      toast.success('Reply added successfully');
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add reply');
    }
  };

  return (
    <section className="mt-16">
      <Separator className="my-8" />
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Comments ({isLoading ? '...' : comments.length})
      </h2>
      
      {!isSupabaseConfigured ? (
        <div className="mt-6 p-6 border rounded-lg bg-muted/50">
          <h3 className="text-lg font-medium mb-4">Comments not available</h3>
          <p className="text-muted-foreground">
            Supabase is not configured properly. Please set your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY 
            environment variables to enable comments.
          </p>
        </div>
      ) : (
        <>
          {/* Authentication section */}
          <AuthSection currentUser={currentUser} onUserChange={setCurrentUser} />
          
          {/* Add comment form */}
          {currentUser && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <div className="space-y-4">
                <Textarea 
                  placeholder="Write a comment... Markdown and code blocks are supported."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-end">
                  <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                  </Button>
                </div>
              </div>
            </form>
          )}
          
          {/* Display comments */}
          <div className="mt-8 space-y-8">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <BlogComment
                  key={comment.id}
                  comment={comment}
                  currentUser={currentUser}
                  postId={postId}
                  onReplySubmit={handleReplySubmit}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
