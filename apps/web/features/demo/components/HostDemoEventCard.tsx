"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Button, Stack, Text } from "@/components/primitives";
import { buildEventPath, buildEventWallPath, buildHostDemoEditPath, buildHostDemoSharePath } from "@/lib/routes";
import { demoEventSlug } from "../demoData";
import { getHostDemoEventTimingState } from "../hostDemoLogic";
import type { HostDemoEvent } from "../hostDemoTypes";
import { CameraIcon, GalleryIcon, ShareIcon } from "./HostDemoIcons";
import { SurfaceCard } from "./shared";

type HostDemoEventCardProps = {
  event: HostDemoEvent;
  locale: string;
  variant?: "hero" | "supporting";
};

function formatEventDay(dateTime: string) {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return dateTime;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

function formatEventTime(dateTime: string) {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return dateTime;
  }

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}

function formatEventDateTime(dateTime: string) {
  return `${formatEventDay(dateTime)}, ${formatEventTime(dateTime)}`;
}

export function HostDemoEventCard({ event, locale, variant = "supporting" }: HostDemoEventCardProps) {
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
      <Stack gap="sm">
        {variant === "hero" ? (
          <Text
            as="p"
            variant="labelSm"
            className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.36rem] normal-case tracking-normal !text-[var(--color-accent)]"
          >
            {t("eventCardEyebrow")}
          </Text>
        ) : null}
        <Text
          as="p"
          variant="bodyLg"
          className={clsx(
            "font-semibold [font-family:Georgia,_Times_New_Roman,_serif]",
            variant === "hero"
              ? "max-w-[11ch] text-[clamp(1.55rem,3.35vw,2.45rem)] leading-[0.96] !text-[#34231d]"
              : "max-w-full text-[1.12rem] leading-[1.08] break-words !text-[#fff3e6]"
          )}
        >
          {event.title}
        </Text>
        <div className={clsx("space-y-xs", variant === "hero" && "pt-xs")}>
          <Text tone="muted" className={clsx(variant === "hero" ? "text-base !text-[#73584b]" : "!text-[#f0d9c7]")}>
            {variant === "hero" ? formatEventDay(event.startAt) : formatEventDateTime(event.startAt)}
          </Text>
          {variant === "hero" ? (
            <Text tone="muted" className="text-base !text-[#73584b]">
              {t("guestCountSummary", {
                invited: event.invitedGuestCount,
                limit: event.guestCapacityLimit
              })}
            </Text>
          ) : null}
        </div>
      </Stack>
    );
  }

  return (
    <SurfaceCard
      className={clsx(
        "overflow-hidden border-[var(--color-border-strong)] p-0 shadow-card",
        variant === "hero" &&
          "rounded-[2.2rem] border-[rgba(243,231,216,0.08)] bg-[linear-gradient(180deg,rgba(250,244,235,0.98)_0%,rgba(240,229,212,0.95)_100%)]",
        variant === "supporting" && "rounded-[1.75rem] border-[rgba(232,203,177,0.14)] bg-[linear-gradient(180deg,rgba(74,53,43,0.96)_0%,rgba(58,42,35,0.98)_100%)]"
      )}
      data-testid={`host-event-card-${event.id}`}
    >
      <div
        className={clsx(
          "grid gap-lg p-lg",
          variant === "hero"
            ? "relative md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.02fr)] md:gap-md md:p-[1.2rem]"
            : "grid-cols-1 gap-md px-md py-md"
        )}
      >
        {variant === "hero" ? (
          <img
            src="/demo/disposable-camera/stamp-ring.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-8 hidden w-28 opacity-[0.16] md:block"
          />
        ) : null}
        <button
          type="button"
          onClick={handleImageTap}
          className="block w-full text-left focus-visible:outline-none"
          data-testid={`host-event-edit-link-${event.id}`}
        >
          <div
            className={clsx(
              "overflow-hidden",
              variant === "hero" ? "relative min-h-[19.8rem] rounded-[1.6rem]" : "rounded-[1.18rem]"
            )}
          >
            {variant === "hero" ? (
              <div className="relative flex min-h-[18.4rem] items-start justify-center py-[0.15rem] md:justify-start">
                <div className="relative mt-1 h-[17.4rem] w-[13.2rem] rotate-[-3deg]">
                  <div className="absolute inset-[4%] z-10 rounded-[1.35rem] bg-[linear-gradient(180deg,#f8efe3_0%,#ecdfcb_100%)] shadow-[0_20px_36px_rgba(76,54,43,0.18),inset_0_1px_0_rgba(255,255,255,0.38)]" />
                  <img
                    src="/demo/disposable-camera/tape-strip.webp"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[0.15rem] top-[0.15rem] z-20 w-16 rotate-[-18deg] opacity-88"
                  />
                  <div className="absolute inset-[4%] z-20 rounded-[1.35rem]">
                    <div className="absolute inset-x-[12%] top-[10.5%] bottom-[23%] overflow-hidden rounded-[0.9rem] bg-[#d9cbb8] shadow-[inset_0_0_0_1px_rgba(122,96,79,0.08),0_18px_28px_rgba(88,62,49,0.14)]">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="h-full w-full object-cover [filter:sepia(0.08)_saturate(0.88)_brightness(0.97)_contrast(1.03)]"
                      />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-[4%] z-30 rounded-[1.35rem] shadow-[inset_0_0_0_1px_rgba(196,171,144,0.82)]" />
                  <div className="pointer-events-none absolute inset-x-[16.5%] bottom-[10.5%] top-[71.5%] z-30 rounded-b-[0.85rem] bg-[linear-gradient(180deg,rgba(239,227,208,0.02)_0%,rgba(228,214,194,0.18)_100%)]" />
                  <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[10.5%] z-30 h-[0.08rem] bg-[rgba(255,255,255,0.38)]" />
                </div>
              </div>
            ) : (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="aspect-[4/3] h-full min-h-[10.5rem] w-full rounded-[1.18rem] object-cover [filter:sepia(0.08)_saturate(0.9)_brightness(0.98)_contrast(1.02)]"
              />
            )}
          </div>
        </button>
        <div
          className={clsx(
            "space-y-md",
            variant === "hero" ? "self-center text-[#34231d] md:pr-sm" : "min-w-0 text-[#fff3e6]"
          )}
        >
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
            variant="filled"
            size="sm"
            className={clsx(
              "justify-center gap-sm",
              variant === "hero" && "min-h-[3.1rem] rounded-[1rem] border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] !text-[#fff8f0] shadow-[0_10px_20px_rgba(52,35,29,0.16)]",
              variant === "supporting" && "min-h-[2.65rem] w-full rounded-full border-0 bg-[#ef9467] px-md text-sm !text-[#fffaf4] shadow-none"
            )}
            data-testid={`host-event-guest-link-${event.id}`}
          >
            <PrimaryIcon />
            {primaryLabel}
          </Button>
          <Button
            onClick={() => router.push(buildHostDemoSharePath(locale, event.id))}
            variant="outlined"
            size="sm"
            className={clsx(
              "justify-center gap-sm",
              variant === "hero" &&
                "min-h-[3.1rem] rounded-[1rem] !border-[rgba(77,51,41,0.12)] !bg-[rgba(255,250,245,0.82)] !text-[#34231d]",
              variant === "supporting" &&
                "min-h-[2.65rem] w-full rounded-full !border-[rgba(240,217,199,0.18)] !bg-transparent px-md text-sm !text-[#fff3e6]"
            )}
            data-testid={`host-event-share-link-${event.id}`}
          >
            <ShareIcon />
            {t("shareEventAction")}
          </Button>
        </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
