import type { Mission } from "@visual-photo/contracts";

export function getNextMissionId(missions: readonly Mission[], completedMissionId: string): string | undefined {
  const ordered = [...missions].sort((left, right) => left.missionOrder - right.missionOrder);
  const currentIndex = ordered.findIndex((mission) => mission.id === completedMissionId);
  const nextMission = currentIndex >= 0 ? ordered[currentIndex + 1] : undefined;
  return nextMission?.id;
}

export function getMissionRevealState(
  missions: readonly Mission[],
  completedMissionIds: readonly string[]
): Array<Mission & { revealed: boolean; completed: boolean }> {
  const completed = new Set(completedMissionIds);
  const ordered = [...missions].sort((left, right) => left.missionOrder - right.missionOrder);

  return ordered.map((mission, index) => {
    const priorMission = ordered[index - 1];
    const revealed = index === 0 || Boolean(priorMission && completed.has(priorMission.id));
    return {
      ...mission,
      revealed,
      completed: completed.has(mission.id)
    };
  });
}

