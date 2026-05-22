import { describe, expect, it } from "vitest";
import {
  buildEventCapturePath,
  buildEventMissionsPath,
  buildEventPath,
  buildEventPreviewPath,
  buildEventSubmittedPath,
  buildEventWallPath,
  restoreRedirectFromSearchParams
} from "@/lib/routes";

describe("route helpers", () => {
  it("builds localized event routes", () => {
    expect(buildEventPath("en", "demo")).toBe("/en/e/demo");
    expect(buildEventMissionsPath("en", "demo")).toBe("/en/e/demo/missions");
    expect(buildEventCapturePath("en", "demo", "mission-1")).toBe("/en/e/demo/capture/mission-1");
    expect(buildEventPreviewPath("en", "demo", "mission-1")).toBe("/en/e/demo/preview/mission-1");
    expect(buildEventSubmittedPath("en", "demo")).toBe("/en/e/demo/submitted");
    expect(buildEventWallPath("en", "demo")).toBe("/en/e/demo/wall");
  });

  it("only restores safe in-app redirects", () => {
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=/en/e/demo"))).toBe(
      "/en/e/demo"
    );
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=https://evil.example"))).toBeNull();
    expect(restoreRedirectFromSearchParams(new URLSearchParams("redirect=//evil.example"))).toBeNull();
  });
});
