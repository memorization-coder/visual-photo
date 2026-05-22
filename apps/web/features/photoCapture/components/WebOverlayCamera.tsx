"use client";

import { useEffect, useRef } from "react";
import type { CameraFacingMode, CapturedPhoto, LiveCameraSession } from "@/adapters/interfaces";
import { Button, Card, Stack, Text } from "@/components/primitives";

type WebOverlayCameraProps = {
  mode: "live" | "preview";
  session?: LiveCameraSession;
  eventLabel: string;
  missionPrompt: string;
  momentLabel: string;
  overlayLabel: string;
  wallLabel: string;
  previousLabel: string;
  nextLabel: string;
  shutterLabel: string;
  flipLabel: string;
  retakeLabel: string;
  submitLabel: string;
  previewPhoto?: CapturedPhoto;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  onOpenWall: () => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onShutter: (videoElement: HTMLVideoElement) => void;
  onFlipCamera: (nextFacingMode: CameraFacingMode) => void;
  onRetake: () => void;
  onSubmit: () => void;
};

export function WebOverlayCamera({
  mode,
  session,
  eventLabel,
  missionPrompt,
  momentLabel,
  overlayLabel,
  wallLabel,
  previousLabel,
  nextLabel,
  shutterLabel,
  flipLabel,
  retakeLabel,
  submitLabel,
  previewPhoto,
  canNavigatePrevious,
  canNavigateNext,
  onOpenWall,
  onNavigatePrevious,
  onNavigateNext,
  onShutter,
  onFlipCamera,
  onRetake,
  onSubmit
}: WebOverlayCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !session || mode !== "live") {
      return;
    }

    videoElement.srcObject = session.stream;
    void videoElement.play().catch(() => undefined);

    return () => {
      videoElement.pause();
      videoElement.srcObject = null;
    };
  }, [mode, session]);

  function handleTouchStart(clientX: number) {
    touchStartXRef.current = clientX;
  }

  function handleTouchEnd(clientX: number) {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;

    if (mode !== "live" || startX === null) {
      return;
    }

    const deltaX = clientX - startX;
    if (Math.abs(deltaX) < 48) {
      return;
    }

    if (deltaX < 0 && canNavigateNext) {
      onNavigateNext();
      return;
    }

    if (deltaX > 0 && canNavigatePrevious) {
      onNavigatePrevious();
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] bg-[#1f1712] shadow-[0_28px_70px_rgba(31,23,18,0.34)]"
      onTouchStart={(event) => handleTouchStart(event.changedTouches[0]?.clientX ?? 0)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-sm p-md">
        <Text
          as="p"
          variant="labelSm"
          className="max-w-[12rem] truncate rounded-full bg-[rgba(255,255,255,0.88)] px-sm py-xs text-[#1f1712]"
        >
          {eventLabel}
        </Text>
        <Text as="p" variant="labelSm" className="rounded-full bg-[rgba(31,23,18,0.72)] px-sm py-xs text-white">
          {momentLabel}
        </Text>
      </div>

      <div className="relative aspect-[9/16] min-h-[34rem] bg-[#2d221c]">
        {mode === "live" ? (
          <video ref={videoRef} muted playsInline autoPlay className="h-full w-full object-cover" />
        ) : previewPhoto ? (
          <img src={previewPhoto.localUri} alt={missionPrompt} className="h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-x-0 top-[4.5rem] px-md">
          <Card variant="surface" className="bg-[rgba(252,248,242,0.94)]">
            <Stack gap="xs">
              <Text as="p" variant="labelSm" tone="muted">
                {overlayLabel}
              </Text>
              <Text as="p" variant="bodyLg">
                {missionPrompt}
              </Text>
            </Stack>
          </Card>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(31,23,18,0.88)] via-[rgba(31,23,18,0.52)] to-transparent px-md pb-lg pt-2xl">
          {mode === "live" ? (
            <>
              <div className="mb-md flex items-center justify-between gap-sm">
                <Button
                  variant="outlined"
                  size="sm"
                  className="h-11 min-h-11 w-11 rounded-full border-white/40 bg-white/10 px-0 text-white hover:bg-white/20"
                  onClick={onNavigatePrevious}
                  disabled={!canNavigatePrevious}
                  aria-label={previousLabel}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  className="h-11 min-h-11 w-11 rounded-full border-white/40 bg-white/10 px-0 text-white hover:bg-white/20"
                  onClick={onNavigateNext}
                  disabled={!canNavigateNext}
                  aria-label={nextLabel}
                >
                  <ChevronRightIcon />
                </Button>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-sm">
                <button
                  type="button"
                  aria-label={wallLabel}
                  onClick={onOpenWall}
                  className="flex h-14 w-20 items-center justify-center justify-self-start rounded-2xl bg-[rgba(255,255,255,0.12)] transition hover:bg-[rgba(255,255,255,0.2)]"
                >
                  <span className="sr-only">{wallLabel}</span>
                  <WallStackIcon />
                </button>
                <button
                  type="button"
                  aria-label={shutterLabel}
                  onClick={() => {
                    if (videoRef.current) {
                      onShutter(videoRef.current);
                    }
                  }}
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[rgba(255,255,255,0.18)] transition hover:bg-[rgba(255,255,255,0.28)]"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1f1712]">
                    <CameraIcon />
                  </span>
                </button>
                <div className="flex justify-end">
                  <Button
                    variant="outlined"
                    size="sm"
                    className="h-11 min-h-11 w-11 rounded-full border-white/40 bg-white/10 px-0 text-white hover:bg-white/20"
                    onClick={() => onFlipCamera(session?.facingMode === "environment" ? "user" : "environment")}
                    disabled={!session}
                    aria-label={flipLabel}
                  >
                    <FlipCameraIcon />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
              <Button
                variant="outlined"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                onClick={onRetake}
              >
                {retakeLabel}
              </Button>
              <Button
                variant="filled"
                className="bg-white text-[#1f1712] hover:bg-white/90"
                onClick={onSubmit}
              >
                {submitLabel}
              </Button>
              <Button
                variant="outlined"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                onClick={onOpenWall}
              >
                {wallLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-[1.8]">
      <path d="M5 8.5h2.4l1.4-2h6.4l1.4 2H19a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10.5a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13.5" r="3.3" />
    </svg>
  );
}

function FlipCameraIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M7 9 4.5 6.5 7 4" />
      <path d="M17 15l2.5 2.5L17 20" />
      <path d="M5 6.5h8a5 5 0 0 1 5 5" />
      <path d="M19 17.5h-8a5 5 0 0 1-5-5" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function WallStackIcon() {
  return (
    <div className="relative h-10 w-12">
      <div className="absolute left-0 top-1 h-8 w-6 -rotate-[14deg] rounded-md bg-[linear-gradient(160deg,#3f3a35_0%,#1f1b18_100%)] opacity-70" />
      <div className="absolute left-3 top-0 h-8 w-6 rotate-[8deg] rounded-md bg-[linear-gradient(160deg,#6c6258_0%,#2a2622_100%)] opacity-80" />
      <div className="absolute left-5 top-2 h-8 w-6 rounded-md bg-[linear-gradient(160deg,#e8d4be_0%,#b49779_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.24)]" />
    </div>
  );
}
