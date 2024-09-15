import { Database } from "@/types/supabase_generated";
import { createBrowserClient } from "@supabase/ssr";

// Define a function to create a Supabase client for client-side operations
export const supabase = () =>
  createBrowserClient<Database>(
    // Pass Supabase URL and anonymous key from the environment to the client
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
