import { createClient } from "@supabase/supabase-js";

export function getSupabaseServiceRoleClient() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
