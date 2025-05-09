
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
    
    // Check if tables exist but don't try to create them programmatically
    checkDatabaseTables().catch(error => {
      console.error('Error checking database tables:', error);
    });
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
      }),
      rpc: () => ({
        select: () => ({ data: null, error: new Error('Supabase not configured') })
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
    }),
    rpc: () => ({
      select: () => ({ data: null, error: new Error('Supabase initialization failed') })
    })
  } as unknown as ReturnType<typeof createClient>;
}

/**
 * Check if required database tables exist in Supabase
 */
async function checkDatabaseTables() {
  try {
    console.log('Checking if database tables exist...');
    
    // Check if the 'comments' table exists
    const { data: commentsTable, error: commentsError } = await supabase
      .from('comments')
      .select('id')
      .limit(1);
    
    // If we get a specific error about the relation not existing, show message to create tables
    if (commentsError && 
        (commentsError.message.includes('relation "comments" does not exist') ||
         commentsError.message.includes('does not exist') ||
         commentsError.code === '42P01')) {
      
      console.log('Comments table does not exist. Please create tables using the SQL editor in the Supabase dashboard.');
      console.log('SQL script is available in the supabase-setup.sql file.');
    } else {
      console.log('Database tables already exist or another issue was encountered.');
    }
  } catch (error) {
    console.error('Error during database initialization check:', error);
  }
}

export { supabase };
