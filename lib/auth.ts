import { createClient } from "@/utils/supabase/server";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export async function getSession() {
  const supabase = createClient();
  const { data: session } = await supabase.auth.getUser();
  return session;
}
