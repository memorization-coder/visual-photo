import { describe, expect, it } from "vitest";
import { sortMomentsPeopleLoved } from "../src/lovedMomentsRanking";
import { areMissionsLocked, clampMissionCount } from "../src/missionRules";
import { canSubmitMemory } from "../src/submissionRules";

describe("domain rules", () => {
  it("clamps mission counts into the supported range", () => {
    expect(clampMissionCount(1)).toBe(3);
    expect(clampMissionCount(20)).toBe(12);
  });

  it("locks missions once the event has started collecting memories", () => {
    expect(
      areMissionsLocked({
        missionsLockedAt: undefined,
        firstMemorySubmittedAt: "2026-05-22T00:00:00.000Z"
      })
    ).toBe(true);
  });

  it("blocks duplicate submissions for the same mission", () => {
    expect(
      canSubmitMemory({
        participant: {
          id: "550e8400-e29b-41d4-a716-446655440010",
          eventId: "550e8400-e29b-41d4-a716-446655440011"
        },
        mission: {
          id: "550e8400-e29b-41d4-a716-446655440012",
          eventId: "550e8400-e29b-41d4-a716-446655440011",
          isActive: true
        },
        input: {
          eventId: "550e8400-e29b-41d4-a716-446655440011",
          participantId: "550e8400-e29b-41d4-a716-446655440010",
          missionId: "550e8400-e29b-41d4-a716-446655440012",
          mainsizeUrl: "https://example.com/main.jpg",
          thumbnailUrl: "https://example.com/thumb.jpg"
        },
        existingSubmissionMissionIds: ["550e8400-e29b-41d4-a716-446655440012"]
      })
    ).toBe(false);
  });

  it("sorts loved moments by loves first, then recency", () => {
    const ordered = sortMomentsPeopleLoved([
      {
        submissionId: "550e8400-e29b-41d4-a716-446655440013",
        eventId: "550e8400-e29b-41d4-a716-446655440011",
        missionId: "550e8400-e29b-41d4-a716-446655440012",
        participantId: "550e8400-e29b-41d4-a716-446655440010",
        thumbnailUrl: "https://example.com/1-thumb.jpg",
        mainsizeUrl: "https://example.com/1-main.jpg",
        loveCount: 2,
        createdAt: "2026-05-22T00:00:00.000Z"
      },
      {
        submissionId: "550e8400-e29b-41d4-a716-446655440014",
        eventId: "550e8400-e29b-41d4-a716-446655440011",
        missionId: "550e8400-e29b-41d4-a716-446655440012",
        participantId: "550e8400-e29b-41d4-a716-446655440010",
        thumbnailUrl: "https://example.com/2-thumb.jpg",
        mainsizeUrl: "https://example.com/2-main.jpg",
        loveCount: 5,
        createdAt: "2026-05-21T00:00:00.000Z"
      }
    ]);

    expect(ordered[0]?.loveCount).toBe(5);
  });
});

