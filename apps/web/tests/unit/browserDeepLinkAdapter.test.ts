import { describe, expect, it } from "vitest";
import { BrowserDeepLinkAdapter } from "@/adapters/browserDeepLinkAdapter";

describe("BrowserDeepLinkAdapter", () => {
  it("builds future participant routes", () => {
    const adapter = new BrowserDeepLinkAdapter("https://example.com");
    expect(adapter.buildEventLink("demo")).toBe("https://example.com/en/e/demo");
  });

  it("reads the event slug from localized event URLs", () => {
    const adapter = new BrowserDeepLinkAdapter("https://example.com");
    expect(adapter.readEventSlug("https://example.com/en/e/demo")).toBe("demo");
  });
});
