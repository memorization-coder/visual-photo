import { describe, expect, it } from "vitest";
import {
  buildLovedMoments,
  ensureMissionSubmittable,
  filterMemoriesByMission,
  findMemoryById,
  getDefaultActiveMission,
  getMemoryImageWindowClass,
  getMemoryOrientation,
  getMissionListState,
  getNextIncompleteMission,
  getNextMission,
  getPreviousIncompleteMission
} from "@/features/demo/demoSelectors";
import { demoEvent, demoMissions, demoSeedMemories } from "@/features/demo/demoData";

describe("demo prototype selectors", () => {
  it("chooses the first incomplete mission as the default active mission", () => {
    expect(getDefaultActiveMission(demoMissions, [])?.id).toBe(demoMissions[0].id);
    expect(getDefaultActiveMission(demoMissions, [demoMissions[0].id])?.id).toBe(demoMissions[1].id);
  });

  it("keeps active and completed missions separated without skip state", () => {
    const state = getMissionListState({
      missions: demoMissions,
      completedMissionIds: [demoMissions[0].id]
    });

    expect(state.active.map((mission) => mission.id)).toContain(demoMissions[1].id);
    expect(state.active.map((mission) => mission.id)).not.toContain(demoMissions[0].id);
    expect(state.completed.map((mission) => mission.id)).toContain(demoMissions[0].id);
  });

  it("prevents duplicate submissions for the same mission", () => {
    expect(
      ensureMissionSubmittable({
        eventId: demoEvent.id,
        mission: demoMissions[0],
        completedMissionIds: []
      })
    ).toBe(true);

    expect(
      ensureMissionSubmittable({
        eventId: demoEvent.id,
        mission: demoMissions[0],
        completedMissionIds: [demoMissions[0].id]
      })
    ).toBe(false);
  });

  it("returns the next incomplete mission after submission", () => {
    expect(getNextMission(demoMissions, demoMissions[0].id, [demoMissions[0].id])?.id).toBe(demoMissions[1].id);
    expect(
      getNextMission(demoMissions, demoMissions[1].id, [demoMissions[0].id, demoMissions[1].id, demoMissions[2].id])
        ?.id
    ).toBe(demoMissions[3].id);
  });

  it("moves through only incomplete missions for camera navigation", () => {
    const completedMissionIds = [demoMissions[0].id, demoMissions[2].id];
    expect(getPreviousIncompleteMission(demoMissions, demoMissions[3].id, completedMissionIds)?.id).toBe(
      demoMissions[1].id
    );
    expect(getNextIncompleteMission(demoMissions, demoMissions[1].id, completedMissionIds)?.id).toBe(
      demoMissions[3].id
    );
  });

  it("sorts loved moments by updated local love count", () => {
    const ranked = buildLovedMoments(demoSeedMemories, [demoSeedMemories[0].id]);
    expect(ranked[0]?.id).toBe(demoSeedMemories[1].id);
    expect(ranked[1]?.id).toBe(demoSeedMemories[4].id);
    expect(ranked[2]?.id).toBe(demoSeedMemories[0].id);
    expect(ranked[2]?.loveCount).toBe(demoSeedMemories[0].loveCount + 1);
  });

  it("classifies orientation buckets from width and height", () => {
    expect(getMemoryOrientation({ width: 800, height: 1200 })).toBe("portrait");
    expect(getMemoryOrientation({ width: 1400, height: 900 })).toBe("landscape");
    expect(getMemoryOrientation({ width: 1100, height: 1100 })).toBe("square");
    expect(getMemoryOrientation({})).toBe("portrait");
  });

  it("derives stable masonry window classes from memory shape", () => {
    expect(getMemoryImageWindowClass({ width: 800, height: 1200 })).toBe("aspect-[4/5]");
    expect(getMemoryImageWindowClass({ width: 1400, height: 900 })).toBe("aspect-[4/3]");
    expect(getMemoryImageWindowClass({ width: 1100, height: 1100 })).toBe("aspect-square");
  });

  it("finds a selected memory for the wall lightbox", () => {
    expect(findMemoryById(demoSeedMemories, demoSeedMemories[1].id)?.participantName).toBe("Noah");
    expect(findMemoryById(demoSeedMemories, "missing")).toBeUndefined();
  });

  it("filters wall memories by mission", () => {
    expect(filterMemoriesByMission(demoSeedMemories).length).toBe(demoSeedMemories.length);
    expect(filterMemoriesByMission(demoSeedMemories, demoMissions[1].id).map((memory) => memory.id)).toEqual([
      demoSeedMemories[1].id
    ]);
    expect(filterMemoriesByMission(demoSeedMemories, "missing")).toEqual([]);
  });
});
