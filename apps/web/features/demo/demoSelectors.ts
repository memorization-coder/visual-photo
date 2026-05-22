import type { Mission } from "@visual-photo/contracts";
import {
  canSubmitMemory,
  getMissionRevealState,
  getNextMissionId,
  sortMomentsPeopleLoved
} from "@visual-photo/domain";
import type { CapturedPhoto } from "@/adapters/interfaces";
import { demoParticipant } from "./demoData";

export type MemoryOrientation = "portrait" | "landscape" | "square";

export type DemoMemory = {
  id: string;
  missionId: string;
  participantId: string;
  participantName: string;
  thumbnailUrl: string;
  mainsizeUrl: string;
  mimeType?: string;
  fileSizeBytes?: number;
  width?: number;
  height?: number;
  createdAt: string;
  loveCount: number;
};

export function getMemoryOrientation(memory: Pick<DemoMemory, "width" | "height">): MemoryOrientation {
  if (!memory.width || !memory.height || memory.width <= 0 || memory.height <= 0) {
    return "portrait";
  }

  const ratio = memory.width / memory.height;

  if (ratio < 0.85) {
    return "portrait";
  }

  if (ratio > 1.2) {
    return "landscape";
  }

  return "square";
}

export function getMemoryImageWindowClass(memory: Pick<DemoMemory, "width" | "height">): string {
  const orientation = getMemoryOrientation(memory);

  if (orientation === "portrait") {
    return "aspect-[4/5]";
  }

  if (orientation === "landscape") {
    return "aspect-[4/3]";
  }

  return "aspect-square";
}

export function getMemoryRotationClass(memoryId: string): string {
  const rotationIndex = [...memoryId].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  return ["-rotate-[1.2deg]", "rotate-[0.8deg]", "-rotate-[0.4deg]", "rotate-[1.4deg]"][rotationIndex] ?? "";
}

export function findMemoryById(memories: readonly DemoMemory[], memoryId: string): DemoMemory | undefined {
  return memories.find((memory) => memory.id === memoryId);
}

export function filterMemoriesByMission(
  memories: readonly DemoMemory[],
  missionId?: string
): DemoMemory[] {
  if (!missionId) {
    return [...memories];
  }

  return memories.filter((memory) => memory.missionId === missionId);
}

export function sortMissions(missions: readonly Mission[]): Mission[] {
  return [...missions].sort((left, right) => left.missionOrder - right.missionOrder);
}

export function getDefaultActiveMission(
  missions: readonly Mission[],
  completedMissionIds: readonly string[]
): Mission | undefined {
  const completed = new Set(completedMissionIds);
  return sortMissions(missions).find((mission) => mission.isActive && !completed.has(mission.id));
}

export function getMissionListState(params: {
  missions: readonly Mission[];
  completedMissionIds: readonly string[];
}) {
  const revealState = getMissionRevealState(params.missions, params.completedMissionIds);
  const active = revealState.filter((mission) => mission.isActive && !mission.completed);
  const completedMissions = revealState.filter((mission) => mission.completed);

  return {
    active,
    completed: completedMissions
  };
}

export function getPreviousIncompleteMission(
  missions: readonly Mission[],
  currentMissionId: string,
  completedMissionIds: readonly string[]
): Mission | undefined {
  const incompleteMissions = sortMissions(missions).filter(
    (mission) => mission.isActive && !completedMissionIds.includes(mission.id)
  );
  const currentIndex = incompleteMissions.findIndex((mission) => mission.id === currentMissionId);
  return currentIndex > 0 ? incompleteMissions[currentIndex - 1] : undefined;
}

export function buildSubmittedMemory(params: {
  eventId: string;
  mission: Mission;
  photo: CapturedPhoto;
  participantName: string;
}): DemoMemory {
  const createdAt = new Date().toISOString();
  return {
    id: `local-${params.mission.id}`,
    missionId: params.mission.id,
    participantId: demoParticipant.id,
    participantName: params.participantName,
    thumbnailUrl: params.photo.localUri,
    mainsizeUrl: params.photo.localUri,
    mimeType: params.photo.mimeType,
    fileSizeBytes: params.photo.fileSizeBytes,
    width: params.photo.width,
    height: params.photo.height,
    createdAt,
    loveCount: 0
  };
}

export function ensureMissionSubmittable(params: {
  eventId: string;
  mission: Mission;
  completedMissionIds: readonly string[];
}): boolean {
  return canSubmitMemory({
    participant: {
      id: demoParticipant.id,
      eventId: params.eventId
    },
    mission: {
      id: params.mission.id,
      eventId: params.mission.eventId,
      isActive: params.mission.isActive
    },
    input: {
      eventId: params.eventId,
      participantId: demoParticipant.id,
      missionId: params.mission.id,
      mainsizeUrl: "https://example.com/local-main.jpg",
      thumbnailUrl: "https://example.com/local-thumb.jpg"
    },
    existingSubmissionMissionIds: params.completedMissionIds
  });
}

export function getNextMission(
  missions: readonly Mission[],
  completedMissionId: string,
  completedMissionIds: readonly string[]
): Mission | undefined {
  const ordered = sortMissions(missions);
  const nextMissionId = getNextMissionId(ordered, completedMissionId);
  const completed = new Set(completedMissionIds);

  if (nextMissionId) {
    const nextMission = ordered.find((mission) => mission.id === nextMissionId);
    if (nextMission && !completed.has(nextMission.id)) {
      return nextMission;
    }
  }

  return getDefaultActiveMission(ordered, completedMissionIds);
}

export function getNextIncompleteMission(
  missions: readonly Mission[],
  currentMissionId: string,
  completedMissionIds: readonly string[]
): Mission | undefined {
  const incompleteMissions = sortMissions(missions).filter(
    (mission) => mission.isActive && !completedMissionIds.includes(mission.id)
  );
  const currentIndex = incompleteMissions.findIndex((mission) => mission.id === currentMissionId);
  return currentIndex >= 0 ? incompleteMissions[currentIndex + 1] : undefined;
}

export function buildLovedMoments(
  memories: readonly DemoMemory[],
  lovedSubmissionIds: readonly string[]
): DemoMemory[] {
  const loved = new Set(lovedSubmissionIds);

  const ranked = sortMomentsPeopleLoved(
    memories.map((memory) => ({
      submissionId: memory.id,
      eventId: demoParticipant.eventId,
      missionId: memory.missionId,
      participantId: memory.participantId,
      thumbnailUrl: memory.thumbnailUrl,
      mainsizeUrl: memory.mainsizeUrl,
      loveCount: memory.loveCount + (loved.has(memory.id) ? 1 : 0),
      createdAt: memory.createdAt
    }))
  );

  return ranked
    .map((item) =>
      memories.find((memory) => memory.id === item.submissionId)
        ? {
            ...memories.find((memory) => memory.id === item.submissionId)!,
            loveCount: item.loveCount
          }
        : undefined
    )
    .filter((memory): memory is DemoMemory => Boolean(memory));
}
