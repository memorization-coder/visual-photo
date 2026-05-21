import type { Mission, Participant, SubmitMemoryInput } from "@visual-photo/contracts";

export function hasExistingSubmissionForMission(
  existingMissionIds: readonly string[],
  missionId: string
): boolean {
  return new Set(existingMissionIds).has(missionId);
}

export function canSubmitMemory(params: {
  participant: Pick<Participant, "eventId" | "id">;
  mission: Pick<Mission, "eventId" | "id" | "isActive">;
  input: SubmitMemoryInput;
  existingSubmissionMissionIds: readonly string[];
}): boolean {
  const { participant, mission, input, existingSubmissionMissionIds } = params;

  if (!mission.isActive) {
    return false;
  }

  if (participant.id !== input.participantId || participant.eventId !== input.eventId) {
    return false;
  }

  if (mission.id !== input.missionId || mission.eventId !== input.eventId) {
    return false;
  }

  return !hasExistingSubmissionForMission(existingSubmissionMissionIds, input.missionId);
}

