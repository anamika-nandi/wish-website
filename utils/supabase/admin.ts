import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for server-side operations)
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Ensure we're not exposing the admin client on the client side
if (typeof window !== "undefined") {
  // @ts-ignore
  delete global.supabaseAdmin;
}
