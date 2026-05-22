"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { CameraFacingMode, LiveCameraSession } from "@/adapters/interfaces";
import { Heading, Text } from "@/components/primitives";
import { buildEventCapturePath, buildEventPath, buildEventWallPath } from "@/lib/routes";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { CameraFallbackUpload } from "@/features/photoCapture/components/CameraFallbackUpload";
import { WebOverlayCamera } from "@/features/photoCapture/components/WebOverlayCamera";
import { SurfaceCard } from "../components/shared";

type DemoCapturePageProps = {
  locale: string;
  missionId: string;
  initialMode?: "live" | "preview";
};

type CameraState = "loading" | "ready" | "fallback";

export function DemoCapturePage({ locale, missionId, initialMode = "live" }: DemoCapturePageProps) {
  const t = useTranslations("demo.capture");
  const router = useRouter();
  const [session, setSession] = useState<LiveCameraSession | undefined>();
  const [cameraState, setCameraState] = useState<CameraState>("loading");
  const [error, setError] = useState<string | null>(null);
  const {
    event,
    missions,
    activeMission,
    completedMissionIds,
    getDraftPhoto,
    clearDraftPhoto,
    getPreviousIncompleteMissionId,
    getNextIncompleteMissionId,
    isLiveCameraSupported,
    startLiveCamera,
    switchLiveCamera,
    captureCameraFrame,
    stopLiveCamera,
    saveDraftPhoto,
    submitMission
  } = useDemoEventPrototype();

  const mission = missions.find((item) => item.id === missionId);
  const draftPhoto = getDraftPhoto(missionId);
  const [surfaceMode, setSurfaceMode] = useState<"live" | "preview">(
    initialMode === "preview" && draftPhoto ? "preview" : "live"
  );
  const previousMissionId = getPreviousIncompleteMissionId(missionId);
  const nextMissionId = getNextIncompleteMissionId(missionId);
  const isCompletedMission = completedMissionIds.includes(missionId);

  useEffect(() => {
    setSurfaceMode(initialMode === "preview" && draftPhoto ? "preview" : "live");
    setError(null);
  }, [draftPhoto, initialMode, missionId]);

  useEffect(() => {
    if (!isCompletedMission || draftPhoto) {
      return;
    }

    if (activeMission) {
      router.replace(buildEventCapturePath(locale, demoEventSlug, activeMission.id));
      return;
    }

    router.replace(buildEventPath(locale, demoEventSlug));
  }, [activeMission, draftPhoto, isCompletedMission, locale, router]);

  useEffect(() => {
    if (!mission) {
      return;
    }

    let isActive = true;

    async function openLiveCamera(preferredFacingMode: CameraFacingMode = "environment") {
      setError(null);
      setCameraState("loading");

      if (!isLiveCameraSupported()) {
        setCameraState("fallback");
        return;
      }

      try {
        const nextSession = await startLiveCamera(preferredFacingMode);
        if (!isActive) {
          stopLiveCamera(nextSession);
          return;
        }

        setSession((current) => {
          if (current) {
            stopLiveCamera(current);
          }

          return nextSession;
        });
        setCameraState("ready");
      } catch {
        if (isActive) {
          setCameraState("fallback");
          setError(t("permissionError"));
        }
      }
    }

    if (surfaceMode === "live") {
      void openLiveCamera();
    } else {
      setSession((current) => {
        if (current) {
          stopLiveCamera(current);
        }

        return undefined;
      });
    }

    return () => {
      isActive = false;
      setSession((current) => {
        if (current) {
          stopLiveCamera(current);
        }

        return undefined;
      });
    };
  }, [mission, missionId, surfaceMode, isLiveCameraSupported, startLiveCamera, stopLiveCamera, t]);

  if (!mission) {
    return (
      <SurfaceCard className="space-y-md">
        <Heading level={3}>{t("missingMissionTitle")}</Heading>
        <Text tone="muted">{t("missingMissionBody")}</Text>
        <Link
          href={buildEventPath(locale, demoEventSlug)}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-lg py-sm text-sm font-medium text-white transition hover:opacity-95"
        >
          {t("backToCamera")}
        </Link>
      </SurfaceCard>
    );
  }

  const currentMission = mission;

  async function handleShutter(videoElement: HTMLVideoElement) {
    try {
      setError(null);
      const photo = await captureCameraFrame(videoElement);
      saveDraftPhoto(currentMission.id, photo);
      setSurfaceMode("preview");
    } catch {
      setError(t("cameraCaptureError"));
    }
  }

  async function handleFlipCamera(nextFacingMode: CameraFacingMode) {
    if (!session) {
      return;
    }

    try {
      setError(null);
      setCameraState("loading");
      const nextSession = await switchLiveCamera(session, nextFacingMode);
      setSession(nextSession);
      setCameraState("ready");
    } catch {
      setCameraState("fallback");
      setError(t("permissionError"));
    }
  }

  function handleRetake() {
    clearDraftPhoto(currentMission.id);
    setSurfaceMode("live");
  }

  function handleSubmit() {
    const result = submitMission(currentMission.id);
    if (!result.success) {
      setError(t("submitError"));
      return;
    }

    if (result.nextMissionId) {
      router.replace(buildEventCapturePath(locale, demoEventSlug, result.nextMissionId));
      return;
    }

    router.replace(buildEventPath(locale, demoEventSlug));
  }

  return (
    <div className="space-y-md">
      {cameraState === "ready" || surfaceMode === "preview" ? (
        <WebOverlayCamera
          mode={surfaceMode}
          session={session}
          missionPrompt={currentMission.prompt}
          momentLabel={t("remainingLabel", {
            count: Math.max(0, missions.length - completedMissionIds.length)
          })}
          overlayLabel={t("overlayLabel")}
          wallLabel={t("wallShortcut")}
          previousLabel={t("previousMoment")}
          nextLabel={t("nextMoment")}
          shutterLabel={t("shutter")}
          flipLabel={t("flipCamera")}
          retakeLabel={t("retake")}
          submitLabel={t("submit")}
          previewPhoto={draftPhoto}
          canNavigatePrevious={Boolean(previousMissionId)}
          canNavigateNext={Boolean(nextMissionId)}
          onOpenWall={() => router.push(buildEventWallPath(locale, demoEventSlug))}
          onNavigatePrevious={() => {
            if (previousMissionId) {
              router.replace(buildEventCapturePath(locale, demoEventSlug, previousMissionId));
            }
          }}
          onNavigateNext={() => {
            if (nextMissionId) {
              router.replace(buildEventCapturePath(locale, demoEventSlug, nextMissionId));
            }
          }}
          onShutter={(videoElement) => void handleShutter(videoElement)}
          onFlipCamera={(facingMode) => void handleFlipCamera(facingMode)}
          onRetake={handleRetake}
          onSubmit={handleSubmit}
        />
      ) : null}

      {cameraState === "loading" && surfaceMode === "live" ? (
        <SurfaceCard className="space-y-sm">
          <Heading level={3}>{t("openingTitle")}</Heading>
          <Text tone="muted">{t("openingBody")}</Text>
        </SurfaceCard>
      ) : null}

      {cameraState === "fallback" ? (
        <CameraFallbackUpload
          title={t("blockedTitle")}
          body={error ?? t("fallbackBody")}
          help={t("blockedHelp")}
          retryLabel={t("retryCamera")}
          wallLabel={t("wallShortcut")}
          onRetry={() => {
            setSession((current) => {
              if (current) {
                stopLiveCamera(current);
              }

              return undefined;
            });
            setCameraState("loading");
            setSurfaceMode("live");
          }}
          onOpenWall={() => router.push(buildEventWallPath(locale, demoEventSlug))}
        />
      ) : null}

      {error && cameraState !== "fallback" ? <Text tone="error">{error}</Text> : null}
    </div>
  );
}
