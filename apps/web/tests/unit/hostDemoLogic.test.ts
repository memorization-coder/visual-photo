import { describe, expect, it } from "vitest";
import { createDraftFromEvent, generateHostDemoIdeas, isPaidSelection, validateSchedule } from "@/features/demo/hostDemoLogic";
import { hostDemoSeedEvents } from "@/features/demo/hostDemoData";

describe("host demo logic", () => {
  it("generates a title and five missions from a host prompt", () => {
    const generated = generateHostDemoIdeas("This is a relaxed wedding dinner with close friends.");

    expect(generated.title).toBe("Candlelight Wedding Dinner");
    expect(generated.missions).toHaveLength(5);
    expect(generated.missions[0]?.prompt).toBe("Someone laughing naturally");
  });

  it("identifies paid selections when tier or capacity exceed free defaults", () => {
    expect(isPaidSelection({ eventTier: "free", guestCapacityLimit: 10 })).toBe(false);
    expect(isPaidSelection({ eventTier: "small", guestCapacityLimit: 10 })).toBe(true);
    expect(isPaidSelection({ eventTier: "free", guestCapacityLimit: 30 })).toBe(true);
  });

  it("validates schedule completeness and ordering", () => {
    expect(validateSchedule({ startAt: "", endAt: "" })).toBe("missing");
    expect(validateSchedule({ startAt: "2026-05-22T12:00", endAt: "2026-05-22T11:00" })).toBe("invalid_order");
    expect(validateSchedule({ startAt: "2026-05-22T12:00", endAt: "2026-05-22T13:00" })).toBeNull();
  });

  it("creates an editable draft from a seeded event", () => {
    const draft = createDraftFromEvent(hostDemoSeedEvents[0]);

    expect(draft.title).toBe(hostDemoSeedEvents[0].title);
    expect(draft.missions).toHaveLength(hostDemoSeedEvents[0].missions.length);
    expect(draft.currentStep).toBe(0);
  });
});
