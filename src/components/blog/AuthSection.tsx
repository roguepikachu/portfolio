
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

interface AuthSectionProps {
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
}

export function AuthSection({ currentUser, onUserChange }: AuthSectionProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authenticateWithProvider = async (provider: 'google' | 'facebook' | 'twitter') => {
    setIsAuthenticating(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + window.location.pathname,
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(`Redirecting to ${provider} for authentication`);
    } catch (error) {
      console.error(`Error authenticating with ${provider}:`, error);
      toast.error(`Failed to authenticate with ${provider}`);
    } finally {
      setIsAuthenticating(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      onUserChange(null);
      toast.info('You have been logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };
  
  if (!currentUser) {
    return (
      <div className="mt-6 p-6 border rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium mb-4">Sign in to comment</h3>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={() => authenticateWithProvider('google')}
            className="flex items-center gap-2"
            disabled={isAuthenticating}
          >
            <Mail className="h-4 w-4" />
            Sign in with Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => authenticateWithProvider('facebook')}
            className="flex items-center gap-2"
            disabled={isAuthenticating}
          >
            <Facebook className="h-4 w-4" />
            Sign in with Facebook
          </Button>
          <Button 
            variant="outline" 
            onClick={() => authenticateWithProvider('twitter')}
            className="flex items-center gap-2"
            disabled={isAuthenticating}
          >
            <Twitter className="h-4 w-4" />
            Sign in with Twitter
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Sign in to leave comments and like posts. We'll never post to your account without permission.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          {currentUser.user_metadata?.full_name?.charAt(0) || 
           currentUser.email?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="font-medium">
            {currentUser.user_metadata?.full_name || 
             currentUser.user_metadata?.name || 
             currentUser.email?.split('@')[0] || 'User'}
          </p>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        Sign out
      </Button>
    </div>
  );
}
