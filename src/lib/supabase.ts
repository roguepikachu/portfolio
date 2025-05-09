
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
    
    // Initialize the database tables if they don't exist
    initDatabase().catch(error => {
      console.error('Error initializing database tables:', error);
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
 * Initialize the database tables if they don't exist
 */
async function initDatabase() {
  try {
    console.log('Checking if database tables exist...');
    
    // Check if the 'comments' table exists
    const { data: commentsTable, error: commentsError } = await supabase
      .from('comments')
      .select('id')
      .limit(1);
    
    // If we get a specific error about the relation not existing, create the tables
    if (commentsError && 
        (commentsError.message.includes('relation "comments" does not exist') ||
         commentsError.message.includes('does not exist') ||
         commentsError.code === '42P01')) {
      
      console.log('Comments table does not exist. Creating tables...');
      
      // SQL to create both tables and security policies
      const { error: sqlError } = await supabase.rpc('exec_sql', {
        sql_query: `
          -- Drop existing tables if they have foreign key constraints
          DROP TABLE IF EXISTS comment_likes CASCADE;
          DROP TABLE IF EXISTS comments CASCADE;
          
          -- Create comments table without foreign key constraint to posts
          CREATE TABLE IF NOT EXISTS comments (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            post_id TEXT NOT NULL,
            user_id UUID NOT NULL,
            author TEXT NOT NULL,
            content TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            parent_id UUID REFERENCES comments(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
            UNIQUE(post_id, user_id, content)
          );
          
          -- Create comment_likes table
          CREATE TABLE IF NOT EXISTS comment_likes (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
            user_id UUID NOT NULL,
            post_id TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC', NOW()),
            UNIQUE(comment_id, user_id)
          );
          
          -- Add index for faster queries
          CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
          CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON comments(parent_id);
          CREATE INDEX IF NOT EXISTS comment_likes_comment_id_idx ON comment_likes(comment_id);
          CREATE INDEX IF NOT EXISTS comment_likes_user_id_idx ON comment_likes(user_id);
          CREATE INDEX IF NOT EXISTS comment_likes_post_id_idx ON comment_likes(post_id);
          
          -- Create RLS policies
          ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
          ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
          
          -- Everyone can read comments
          CREATE POLICY "Anyone can read comments"
            ON comments FOR SELECT
            USING (true);
          
          -- Only authenticated users can insert comments
          CREATE POLICY "Authenticated users can insert comments"
            ON comments FOR INSERT
            WITH CHECK (auth.role() = 'authenticated');
          
          -- Users can update/delete their own comments
          CREATE POLICY "Users can update own comments"
            ON comments FOR UPDATE
            USING (auth.uid() = user_id);
          
          CREATE POLICY "Users can delete own comments"
            ON comments FOR DELETE
            USING (auth.uid() = user_id);
          
          -- Comment likes policies
          CREATE POLICY "Anyone can read likes"
            ON comment_likes FOR SELECT
            USING (true);
          
          CREATE POLICY "Authenticated users can insert likes"
            ON comment_likes FOR INSERT
            WITH CHECK (auth.role() = 'authenticated');
          
          CREATE POLICY "Users can delete own likes"
            ON comment_likes FOR DELETE
            USING (auth.uid() = user_id);
        `
      });
      
      if (sqlError) {
        // If 'exec_sql' RPC function doesn't exist, advise user to use SQL Editor directly
        console.error('Error creating tables:', sqlError);
        if (sqlError.message.includes('function exec_sql') || sqlError.code === '42883') {
          console.warn('The exec_sql RPC function is not available. Please create tables manually using the SQL editor in the Supabase dashboard.');
          console.log('SQL script is available in supabase-setup.sql file.');
        }
      } else {
        console.log('Database tables created successfully!');
      }
    } else {
      console.log('Database tables already exist.');
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
}

export { supabase };
