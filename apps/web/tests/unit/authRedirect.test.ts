import { describe, expect, it } from "vitest";
import { buildAuthRedirectTarget } from "@/lib/routes";

describe("buildAuthRedirectTarget", () => {
  it("preserves event context through auth callbacks", () => {
    expect(buildAuthRedirectTarget({ locale: "en", qrSlug: "wedding-weekend" })).toBe(
      "/en/auth/callback?redirect=%2Fen%2Fe%2Fwedding-weekend"
    );
  });
});
