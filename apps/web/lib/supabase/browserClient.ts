import { createBrowserClient } from "@supabase/ssr";
import { clientEnv } from "@/lib/env";

export function getSupabaseBrowserClient() {
  return createBrowserClient(clientEnv.supabaseUrl(), clientEnv.supabaseAnonKey());
}

