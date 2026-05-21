import type { DeepLinkAdapter } from "./interfaces";

export class BrowserDeepLinkAdapter implements DeepLinkAdapter {
  constructor(private readonly baseUrl: string) {}

  getCurrentUrl(): string {
    if (typeof window === "undefined") {
      return this.baseUrl;
    }

    return window.location.href;
  }

  buildEventLink(qrSlug: string): string {
    return new URL(`/en/events/${qrSlug}`, this.baseUrl).toString();
  }

  readEventSlug(url: string): string | null {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments[2] ?? null;
  }
}

