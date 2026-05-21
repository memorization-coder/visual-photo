import { describe, expect, it } from "vitest";
import { buildEventPath, restoreRedirectFromSearchParams } from "@/lib/routes";

describe("route helpers", () => {
  it("builds localized event routes", () => {
    expect(buildEventPath("en", "wedding-weekend")).toBe("/en/events/wedding-weekend");
  });

  it("only restores safe in-app redirects", () => {
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=/en/events/wedding-weekend"))).toBe(
      "/en/events/wedding-weekend"
    );
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=https://evil.example"))).toBeNull();
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=//evil.example"))).toBeNull();
  });
});
