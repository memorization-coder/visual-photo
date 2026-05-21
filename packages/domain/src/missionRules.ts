import type { Event, Mission } from "@visual-photo/contracts";

export const MIN_MISSION_COUNT = 3;
export const MAX_MISSION_COUNT = 12;

export function clampMissionCount(requestedCount: number): number {
  return Math.min(MAX_MISSION_COUNT, Math.max(MIN_MISSION_COUNT, requestedCount));
}

export function areMissionsLocked(event: Pick<Event, "missionsLockedAt" | "firstMemorySubmittedAt">): boolean {
  return Boolean(event.missionsLockedAt ?? event.firstMemorySubmittedAt);
}

export function canReorderMissions(
  event: Pick<Event, "missionsLockedAt" | "firstMemorySubmittedAt">,
  missions: readonly Mission[]
): boolean {
  return !areMissionsLocked(event) && missions.length > 1;
}

