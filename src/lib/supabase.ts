
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Default placeholder values for development
let supabase: ReturnType<typeof createClient>;

try {
  // Validate URL format - must include protocol (https://)
  let validUrl = supabaseUrl;
  if (validUrl && !validUrl.startsWith('https://') && !validUrl.startsWith('http://')) {
    validUrl = `https://${validUrl}`;
  }
  
  // Create the Supabase client if both URL and key are valid
  if (validUrl && supabaseAnonKey && validUrl !== 'https://your-supabase-project-url.supabase.co') {
    supabase = createClient(validUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  } else {
    // Create a mock client that logs operations instead of executing them
    console.warn('Supabase not properly configured. Using mock client.');
    supabase = {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ 
          data: { subscription: { unsubscribe: () => {} } }, 
          error: null 
        }),
        signInWithOtp: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null })
      },
      from: () => ({
        select: () => ({ 
          eq: () => ({ 
            is: () => ({
              order: () => ({ data: [], error: new Error('Supabase not configured') })
            }),
            order: () => ({ data: [], error: new Error('Supabase not configured') }),
            single: () => ({ data: null, error: new Error('Supabase not configured') })
          }),
          single: () => ({ data: null, error: new Error('Supabase not configured') })
        }),
        insert: () => ({ 
          select: () => ({ data: [], error: new Error('Supabase not configured') }) 
        }),
        update: () => ({ 
          eq: () => ({ data: null, error: new Error('Supabase not configured') }) 
        }),
        delete: () => ({ 
          eq: () => ({ data: null, error: new Error('Supabase not configured') }) 
        }),
      })
    } as unknown as ReturnType<typeof createClient>;
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create mock client on error
  supabase = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ 
        data: { subscription: { unsubscribe: () => {} } }, 
        error: null 
      }),
      signInWithOtp: async () => ({ data: null, error: new Error('Supabase initialization failed') }),
      signOut: async () => ({ error: null })
    },
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          is: () => ({
            order: () => ({ data: [], error: new Error('Supabase initialization failed') })
          }),
          order: () => ({ data: [], error: new Error('Supabase initialization failed') }),
          single: () => ({ data: null, error: new Error('Supabase initialization failed') })
        }),
        single: () => ({ data: null, error: new Error('Supabase initialization failed') })
      }),
      insert: () => ({ 
        select: () => ({ data: [], error: new Error('Supabase initialization failed') }) 
      }),
      update: () => ({ 
        eq: () => ({ data: null, error: new Error('Supabase initialization failed') }) 
      }),
      delete: () => ({ 
        eq: () => ({ data: null, error: new Error('Supabase initialization failed') }) 
      }),
    })
  } as unknown as ReturnType<typeof createClient>;
}

export { supabase };
