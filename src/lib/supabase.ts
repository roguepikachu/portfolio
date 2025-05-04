
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Get the URL and anon key from the environment variables
// If they're not set, we use default values (for development only)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the URL and key are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or anonymous key is missing. Make sure you have set the environment variables.');
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://your-supabase-project-url.supabase.co',
  supabaseAnonKey || 'your-supabase-anon-key'
);

// Set up persistent storage for auth session
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    localStorage.setItem('supabase-auth', JSON.stringify(session));
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem('supabase-auth');
  }
});
