
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface VotingButtonsProps {
  itemId: string;
  itemType: 'blog' | 'project' | 'publication';
}

interface VoteData {
  upvotes: number;
  downvotes: number;
  userVote: 'upvote' | 'downvote' | null;
}

export function VotingButtons({ itemId, itemType }: VotingButtonsProps) {
  const [voteData, setVoteData] = useState<VoteData>({
    upvotes: 0,
    downvotes: 0,
    userVote: null
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadVoteData();
  }, [itemId, itemType]);

  const loadVoteData = async () => {
    try {
      // Get vote counts
      const { data: votes, error } = await supabase
        .from('votes')
        .select('vote_type, user_id')
        .eq('item_id', itemId)
        .eq('item_type', itemType);

      if (error) {
        console.error('Error loading votes:', error);
        return;
      }

      const upvotes = votes?.filter(v => v.vote_type === 'upvote').length || 0;
      const downvotes = votes?.filter(v => v.vote_type === 'downvote').length || 0;

      // Get current user's vote
      const { data: { user } } = await supabase.auth.getUser();
      const userVote = user ? votes?.find(v => v.user_id === user.id)?.vote_type || null : null;

      setVoteData({
        upvotes,
        downvotes,
        userVote: userVote as 'upvote' | 'downvote' | null
      });
    } catch (error) {
      console.error('Error loading vote data:', error);
    }
  };

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Please sign in to vote');
        return;
      }

      // If user already voted the same way, remove the vote
      if (voteData.userVote === voteType) {
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('item_id', itemId)
          .eq('item_type', itemType)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert or update vote (upsert)
        const { error } = await supabase
          .from('votes')
          .upsert({
            item_id: itemId,
            item_type: itemType,
            user_id: user.id,
            vote_type: voteType
          }, {
            onConflict: 'item_id,item_type,user_id'
          });

        if (error) throw error;
      }

      // Reload vote data
      await loadVoteData();
      
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to record vote');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={voteData.userVote === 'upvote' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleVote('upvote')}
        disabled={isLoading}
        className="flex items-center gap-1"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{voteData.upvotes}</span>
      </Button>
      
      <Button
        variant={voteData.userVote === 'downvote' ? 'destructive' : 'outline'}
        size="sm"
        onClick={() => handleVote('downvote')}
        disabled={isLoading}
        className="flex items-center gap-1"
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{voteData.downvotes}</span>
      </Button>
    </div>
  );
}
