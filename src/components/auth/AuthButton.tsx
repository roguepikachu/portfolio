import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { User as SupabaseUser } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthButtonProps {
  currentUser: SupabaseUser | null;
  onUserChange: (user: SupabaseUser | null) => void;
}

export function AuthButton({ currentUser, onUserChange }: AuthButtonProps) {
  const [email, setEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleInitialAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error retrieving session:', error);
        toast.error('Authentication failed');
      } else if (data?.session?.user) {
        onUserChange(data.session.user);
        toast.success('Successfully signed in');
      }

      setIsLoadingSession(false);
    };

    handleInitialAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        onUserChange(session.user);
        setIsDialogOpen(false);
      } else if (event === 'SIGNED_OUT') {
        onUserChange(null);
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [onUserChange]);

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

      if (error) throw error;

      toast.success('Check your email for the login link');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send login email');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onUserChange(null);
      toast.info('You have been logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  if (isLoadingSession) {
    return <Button variant="ghost" size="sm" disabled>Loading...</Button>;
  }

  if (!currentUser) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign in
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to your account</DialogTitle>
            <DialogDescription>
              We'll send you a magic link to sign in. No password needed.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isAuthenticating || !email.trim()}>
              <Mail className="h-4 w-4 mr-2" />
              {isAuthenticating ? 'Sending...' : 'Sign in with Email'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
            {currentUser.user_metadata?.full_name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
          </div>
          <span className="hidden md:inline-block">
            {currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 