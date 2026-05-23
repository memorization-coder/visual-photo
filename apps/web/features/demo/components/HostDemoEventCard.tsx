"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Stack, Text } from "@/components/primitives";
import { buildEventPath, buildEventWallPath, buildHostDemoEditPath, buildHostDemoSharePath } from "@/lib/routes";
import { demoEventSlug } from "../demoData";
import { formatHostDemoDate, getHostDemoEventTimingState } from "../hostDemoLogic";
import type { HostDemoEvent } from "../hostDemoTypes";
import { CameraIcon, GalleryIcon, ShareIcon } from "./HostDemoIcons";
import { SurfaceCard } from "./shared";

type HostDemoEventCardProps = {
  event: HostDemoEvent;
  locale: string;
};

export function HostDemoEventCard({ event, locale }: HostDemoEventCardProps) {
  const t = useTranslations("demo.host");
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(null);
  const timingState = getHostDemoEventTimingState(event);
  const canEdit = event.role === "hosting" && timingState === "future";
  const futurePreviewHash =
    timingState === "future"
      ? `#hostDemoTiming=future&hostDemoEventTitle=${encodeURIComponent(event.title)}`
      : "";
  const primaryHref =
    timingState === "past"
      ? buildEventWallPath(locale, demoEventSlug)
      : `${buildEventPath(locale, demoEventSlug)}${futurePreviewHash}`;
  const primaryLabel =
    timingState === "past"
      ? t("viewGalleryAction")
      : timingState === "future"
        ? t("takePhotosFutureAction")
        : t("takePhotosAction");
  const editHref = buildHostDemoEditPath(locale, event.id);
  const PrimaryIcon = timingState === "past" ? GalleryIcon : CameraIcon;

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNotice(null);
    }, 4500);

    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  function handleImageTap() {
    if (canEdit) {
      router.push(editHref);
      return;
    }

    if (event.role === "participating") {
      setNotice(t("imageNotEditableParticipant"));
      return;
    }

    setNotice(
      timingState === "current"
        ? t("imageNotEditableCurrent")
        : t("imageNotEditablePast")
    );
  }

  function renderEventSummary() {
    return (
      <Stack gap="xs">
        <Text as="p" variant="bodyLg" className="font-semibold">
          {event.title}
        </Text>
        <Text tone="muted">{formatHostDemoDate(event.endAt)}</Text>
        <Text tone="muted">
          {t("guestCountSummary", {
            invited: event.invitedGuestCount,
            limit: event.guestCapacityLimit
          })}
        </Text>
      </Stack>
    );
  }

  return (
    <SurfaceCard className="overflow-hidden p-0" data-testid={`host-event-card-${event.id}`}>
      <button
        type="button"
        onClick={handleImageTap}
        className="block w-full text-left focus-visible:outline-none"
        data-testid={`host-event-edit-link-${event.id}`}
      >
        <img src={event.imageUrl} alt={event.title} className="aspect-[4/3] w-full object-cover" />
      </button>
      <div className="space-y-md p-lg">
        {notice ? (
          <div className="flex items-start justify-between gap-sm rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-emphasis)] px-md py-sm">
            <Text as="p" className="text-sm">
              {notice}
            </Text>
            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label={t("dismissCardNotice")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
            >
              x
            </button>
          </div>
        ) : null}

        {canEdit ? (
          <button
            type="button"
            onClick={() => router.push(editHref)}
            className="block w-full rounded-lg text-left focus-visible:outline-none"
          >
            {renderEventSummary()}
          </button>
        ) : (
          renderEventSummary()
        )}
        <div className="flex flex-col gap-sm">
          <Button
            onClick={() => router.push(primaryHref)}
            variant="outlined"
            size="sm"
            className="justify-center gap-sm"
            data-testid={`host-event-guest-link-${event.id}`}
          >
            <PrimaryIcon />
            {primaryLabel}
          </Button>
          <Button
            onClick={() => router.push(buildHostDemoSharePath(locale, event.id))}
            variant="muted"
            size="sm"
            className="justify-center gap-sm"
            data-testid={`host-event-share-link-${event.id}`}
          >
            <ShareIcon />
            {t("shareEventAction")}
          </Button>
        </div>
      </div>
    </SurfaceCard>
  );
}
