
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

interface AuthSectionProps {
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
}

export function AuthSection({ currentUser, onUserChange }: AuthSectionProps) {
  const [email, setEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsAuthenticating(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin + window.location.pathname,
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Check your email for the login link');
    } catch (error) {
      console.error('Error authenticating with email:', error);
      toast.error('Failed to send login email');
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
        <form onSubmit={handleEmailAuth}>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-2 border rounded-md"
              required
            />
            <Button 
              type="submit"
              variant="outline" 
              className="flex items-center gap-2"
              disabled={isAuthenticating || !email.trim()}
            >
              <Mail className="h-4 w-4" />
              {isAuthenticating ? 'Sending...' : 'Sign in with Email'}
            </Button>
          </div>
        </form>
        <p className="text-sm text-muted-foreground mt-4">
          We'll send you a magic link to sign in. No password needed.
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
