import type { AnalyticsAdapter } from "./interfaces";

export class ConsoleAnalyticsAdapter implements AnalyticsAdapter {
  async track(eventName: string, properties?: Record<string, unknown>): Promise<void> {
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", eventName, properties ?? {});
    }
  }
}

