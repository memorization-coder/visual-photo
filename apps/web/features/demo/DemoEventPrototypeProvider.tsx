"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Event, Mission, Participant } from "@visual-photo/contracts";
import type {
  CameraFacingMode,
  CapturedPhoto,
  LiveCameraSession,
  PhotoCaptureAdapter
} from "@/adapters/interfaces";
import { WebPhotoCaptureAdapter } from "@/adapters/webPhotoCaptureAdapter";
import {
  buildLovedMoments,
  buildSubmittedMemory,
  ensureMissionSubmittable,
  getDefaultActiveMission,
  getMissionListState,
  getNextIncompleteMission,
  getNextMission,
  getPreviousIncompleteMission,
  type DemoMemory
} from "./demoSelectors";
import type { DemoSeedMemory } from "./demoData";

type DemoEventPrototypeContextValue = {
  event: Event;
  participant: Participant;
  missions: Mission[];
  activeMission?: Mission;
  allComplete: boolean;
  lastSubmittedMissionId?: string;
  completedMissionIds: string[];
  allMemories: DemoMemory[];
  lovedMoments: DemoMemory[];
  listState: ReturnType<typeof getMissionListState>;
  isLiveCameraSupported: () => boolean;
  startLiveCamera: (facingMode?: CameraFacingMode) => Promise<LiveCameraSession>;
  switchLiveCamera: (session: LiveCameraSession, facingMode: CameraFacingMode) => Promise<LiveCameraSession>;
  captureCameraFrame: (videoElement: HTMLVideoElement, mimeType?: string) => Promise<CapturedPhoto>;
  stopLiveCamera: (session: LiveCameraSession) => void;
  saveDraftPhoto: (missionId: string, photo: CapturedPhoto) => void;
  getDraftPhoto: (missionId: string) => CapturedPhoto | undefined;
  clearDraftPhoto: (missionId: string) => void;
  getPreviousIncompleteMissionId: (missionId: string) => string | undefined;
  getNextIncompleteMissionId: (missionId: string) => string | undefined;
  submitMission: (missionId: string) => { success: boolean; nextMissionId?: string };
  toggleLove: (submissionId: string) => void;
  getMemoryLoveCount: (submissionId: string) => number;
  isLovedByCurrentUser: (submissionId: string) => boolean;
};

const DemoEventPrototypeContext = createContext<DemoEventPrototypeContextValue | null>(null);

function createPhotoCaptureAdapter(): PhotoCaptureAdapter {
  return new WebPhotoCaptureAdapter();
}

type DemoEventPrototypeProviderProps = {
  children: React.ReactNode;
  event: Event;
  participant: Participant;
  missions: Mission[];
  seedMemories: DemoSeedMemory[];
};

export function DemoEventPrototypeProvider({
  children,
  event,
  participant,
  missions,
  seedMemories
}: DemoEventPrototypeProviderProps) {
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [draftPhotos, setDraftPhotos] = useState<Record<string, CapturedPhoto | undefined>>({});
  const [submittedMemories, setSubmittedMemories] = useState<DemoMemory[]>([]);
  const [lovedSubmissionIds, setLovedSubmissionIds] = useState<string[]>([]);
  const [lastSubmittedMissionId, setLastSubmittedMissionId] = useState<string | undefined>();
  const [photoCaptureAdapter] = useState<PhotoCaptureAdapter>(() => createPhotoCaptureAdapter());

  const allMemories = useMemo<DemoMemory[]>(
    () => [...seedMemories, ...submittedMemories],
    [seedMemories, submittedMemories]
  );

  const activeMission = useMemo(
    () => getDefaultActiveMission(missions, completedMissionIds),
    [missions, completedMissionIds]
  );
  const allComplete = !activeMission;

  const listState = useMemo(
    () => getMissionListState({ missions, completedMissionIds }),
    [missions, completedMissionIds]
  );

  const lovedMoments = useMemo(
    () => buildLovedMoments(allMemories, lovedSubmissionIds),
    [allMemories, lovedSubmissionIds]
  );

  const value = useMemo<DemoEventPrototypeContextValue>(
    () => ({
      event,
      participant,
      missions,
      activeMission,
      allComplete,
      lastSubmittedMissionId,
      completedMissionIds,
      allMemories,
      lovedMoments,
      listState,
      isLiveCameraSupported: () => photoCaptureAdapter.isLiveCameraSupported(),
      startLiveCamera: (facingMode) => photoCaptureAdapter.startLiveCamera(facingMode),
      switchLiveCamera: (session, facingMode) => photoCaptureAdapter.switchLiveCamera(session, facingMode),
      captureCameraFrame: (videoElement, mimeType) => photoCaptureAdapter.captureFrame(videoElement, mimeType),
      stopLiveCamera: (session) => photoCaptureAdapter.stopLiveCamera(session),
      saveDraftPhoto: (missionId, photo) => {
        setDraftPhotos((current) => ({
          ...current,
          [missionId]: photo
        }));
      },
      getDraftPhoto: (missionId) => draftPhotos[missionId],
      clearDraftPhoto: (missionId) => {
        setDraftPhotos((current) => {
          const next = { ...current };
          delete next[missionId];
          return next;
        });
      },
      getPreviousIncompleteMissionId: (missionId) =>
        getPreviousIncompleteMission(missions, missionId, completedMissionIds)?.id,
      getNextIncompleteMissionId: (missionId) =>
        getNextIncompleteMission(missions, missionId, completedMissionIds)?.id,
      submitMission: (missionId) => {
        const mission = missions.find((item) => item.id === missionId);
        const draftPhoto = draftPhotos[missionId];

        if (!mission || !draftPhoto) {
          return { success: false };
        }

        if (
          !ensureMissionSubmittable({
            eventId: event.id,
            mission,
            completedMissionIds
          })
        ) {
          return { success: false };
        }

        const memory = buildSubmittedMemory({
          eventId: event.id,
          mission,
          photo: draftPhoto,
          participantName: participant.displayName ?? "You"
        });

        setSubmittedMemories((current) => [...current, memory]);
        setCompletedMissionIds((current) => (current.includes(missionId) ? current : [...current, missionId]));
        setLastSubmittedMissionId(missionId);
        setDraftPhotos((current) => {
          const next = { ...current };
          delete next[missionId];
          return next;
        });

        return {
          success: true,
          nextMissionId: getNextMission(missions, missionId, [...completedMissionIds, missionId])?.id
        };
      },
      toggleLove: (submissionId) => {
        setLovedSubmissionIds((current) =>
          current.includes(submissionId)
            ? current.filter((id) => id !== submissionId)
            : [...current, submissionId]
        );
      },
      getMemoryLoveCount: (submissionId) => {
        const memory = allMemories.find((item) => item.id === submissionId);
        if (!memory) {
          return 0;
        }

        return memory.loveCount + (lovedSubmissionIds.includes(submissionId) ? 1 : 0);
      },
      isLovedByCurrentUser: (submissionId) => lovedSubmissionIds.includes(submissionId)
    }),
    [
      activeMission,
      allComplete,
      allMemories,
      completedMissionIds,
      draftPhotos,
      event,
      lastSubmittedMissionId,
      listState,
      lovedMoments,
      lovedSubmissionIds,
      missions,
      participant,
      photoCaptureAdapter
    ]
  );

  return <DemoEventPrototypeContext.Provider value={value}>{children}</DemoEventPrototypeContext.Provider>;
}

export function useDemoEventPrototype() {
  const context = useContext(DemoEventPrototypeContext);

  if (!context) {
    throw new Error("DemoEventPrototypeProvider is missing.");
  }

  return context;
}
