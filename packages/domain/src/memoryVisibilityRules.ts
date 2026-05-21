import type { MemorySubmission, Participant } from "@visual-photo/contracts";

export function canParticipantViewMemory(params: {
  submission: Pick<MemorySubmission, "eventId" | "status">;
  participant: Pick<Participant, "eventId">;
}): boolean {
  const { submission, participant } = params;
  return participant.eventId === submission.eventId && submission.status === "approved";
}

export function canReactToMemory(params: {
  submission: Pick<MemorySubmission, "eventId" | "status">;
  participant: Pick<Participant, "eventId">;
}): boolean {
  return canParticipantViewMemory(params);
}

