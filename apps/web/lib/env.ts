function readEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const clientEnv = {
  supabaseUrl: () => readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: () => readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  appBaseUrl: () => readEnv("APP_BASE_URL")
};

export const serverEnv = {
  serviceRoleKey: () => readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  aiApiKey: () => readEnv("AI_API_KEY")
};

