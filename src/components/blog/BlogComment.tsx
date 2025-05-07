import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { MarkdownRenderer } from '@/utils/markdown-utils';
import { Comment } from '@/types/blog';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface BlogCommentProps {
  comment: Comment;
  currentUser: User | null;
  postId: string;
  isReply?: boolean;
  parentId?: string;
  onReplySubmit?: (commentId: string, content: string) => void;
}

export function BlogComment({ 
  comment, 
  currentUser, 
  postId, 
  isReply = false, 
  parentId,
  onReplySubmit 
}: BlogCommentProps) {
  const [replyActive, setReplyActive] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  
  const handleLikeToggle = async () => {
    if (!currentUser) {
      toast.error('Please sign in to like comments');
      return;
    }
    
    setIsLiking(true);
    try {
      // Check if user has already liked this comment
      const { data: existingLike, error: likeError } = await supabase
        .from('comment_likes')
        .select('*')
        .eq('comment_id', comment.id)
        .eq('user_id', currentUser.id)
        .single();
      
      if (likeError && likeError.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine
        throw likeError;
      }
      
      if (existingLike) {
        // Unlike
        const { error: unlikeError } = await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', comment.id)
          .eq('user_id', currentUser.id);
          
        if (unlikeError) throw unlikeError;
        
        // Update the comment likes count
        const { error: updateError } = await supabase
          .from('comments')
          .update({ likes: comment.likes - 1 })
          .eq('id', comment.id);
          
        if (updateError) throw updateError;
          
        comment.likes -= 1;
        comment.userHasLiked = false;
      } else {
        // Like
        const { error: insertError } = await supabase
          .from('comment_likes')
          .insert({ 
            comment_id: comment.id, 
            user_id: currentUser.id,
            post_id: postId
          });
          
        if (insertError) throw insertError;
        
        // Update the comment likes count
        const { error: updateError } = await supabase
          .from('comments')
          .update({ likes: comment.likes + 1 })
          .eq('id', comment.id);
          
        if (updateError) throw updateError;
          
        comment.likes += 1;
        comment.userHasLiked = true;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    } finally {
      setIsLiking(false);
    }
  };
  
  const handleReplySubmit = () => {
    if (!replyContent.trim() || !currentUser || !onReplySubmit) return;
    
    onReplySubmit(comment.id, replyContent);
    setReplyActive(false);
    setReplyContent('');
  };
  
  const formattedDate = new Date(comment.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`${isReply ? 'border-t pt-4' : 'border rounded-lg p-4'}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">{comment.author}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <Button 
          variant={comment.userHasLiked ? "secondary" : "ghost"} 
          size="sm"
          onClick={handleLikeToggle}
          disabled={isLiking || !currentUser}
          className="gap-1"
        >
          <ThumbsUp className={`h-4 w-4 ${comment.userHasLiked ? "text-primary" : ""}`} />
          {comment.likes}
        </Button>
      </div>
      
      <div className="mt-2 text-sm">
        <MarkdownRenderer content={comment.content} />
      </div>
      
      {!isReply && onReplySubmit && (
        <div className="mt-2 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              if (!currentUser) {
                toast.error('Please sign in to reply');
                return;
              }
              setReplyActive(!replyActive);
            }}
          >
            {replyActive ? "Cancel" : "Reply"}
          </Button>
        </div>
      )}
      
      {replyActive && currentUser && onReplySubmit && (
        <div className="mt-4 pl-4 border-l-2">
          <Textarea 
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="mt-2 flex justify-end">
            <Button 
              size="sm"
              onClick={handleReplySubmit}
              disabled={!replyContent.trim()}
            >
              Submit Reply
            </Button>
          </div>
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 space-y-4">
          {comment.replies.map((reply) => (
            <BlogComment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              postId={postId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
