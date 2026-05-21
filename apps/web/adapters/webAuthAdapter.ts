import type { AuthAdapter, AuthUser } from "./interfaces";

type SupabaseLikeClient = {
  auth: {
    signInWithOAuth(input: {
      provider: "google" | "apple";
      options?: { redirectTo?: string };
    }): Promise<unknown>;
    signOut(): Promise<unknown>;
    getUser(): Promise<{ data: { user: AuthUser | null } }>;
  };
};

export class WebAuthAdapter implements AuthAdapter {
  constructor(private readonly client: SupabaseLikeClient) {}

  async signInWithGoogle(redirectTo?: string): Promise<void> {
    await this.client.auth.signInWithOAuth({
      provider: "google",
      options: redirectTo ? { redirectTo } : undefined
    });
  }

  async signInWithApple(redirectTo?: string): Promise<void> {
    await this.client.auth.signInWithOAuth({
      provider: "apple",
      options: redirectTo ? { redirectTo } : undefined
    });
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const result = await this.client.auth.getUser();
    return result.data.user;
  }
}

