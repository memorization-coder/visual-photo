"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Heading, Stack, Text } from "@/components/primitives";
import { buildEventCapturePath, buildEventMissionsPath, buildEventSubmittedPath } from "@/lib/routes";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { EventHeader } from "../components/EventHeader";
import { MissionCard } from "../components/MissionCard";
import { PhotoPreview } from "../components/PhotoPreview";
import { SurfaceCard } from "../components/shared";

type DemoPreviewPageProps = {
  locale: string;
  missionId: string;
};

export function DemoPreviewPage({ locale, missionId }: DemoPreviewPageProps) {
  const t = useTranslations("demo.preview");
  const router = useRouter();
  const { event, participant, missions, getDraftPhoto, submitMission } = useDemoEventPrototype();

  const mission = missions.find((item) => item.id === missionId);
  const draftPhoto = getDraftPhoto(missionId);

  if (!mission || !draftPhoto) {
    return (
      <SurfaceCard className="space-y-md">
        <Heading level={3}>{t("missingTitle")}</Heading>
        <Text tone="muted">{t("missingBody")}</Text>
        <Button href={buildEventMissionsPath(locale, demoEventSlug)}>{t("backToMoments")}</Button>
      </SurfaceCard>
    );
  }

  const currentMission = mission;

  function handleSubmit() {
    const result = submitMission(currentMission.id);
    if (!result.success) {
      return;
    }

    router.push(buildEventSubmittedPath(locale, demoEventSlug));
  }

  return (
    <div className="space-y-md">
      <SurfaceCard className="space-y-lg">
        <EventHeader title={event.title} participantName={participant.displayName} />
        <MissionCard
          mission={currentMission}
          total={missions.length}
          currentNumber={currentMission.missionOrder + 1}
          status="active"
          className="border-0 bg-transparent p-0 shadow-none"
        />
      </SurfaceCard>

      <PhotoPreview photo={draftPhoto} />

      <SurfaceCard className="space-y-sm">
        <Stack gap="sm">
          <Text as="p" variant="labelSm" tone="muted">
            {t("eyebrow")}
          </Text>
          <Heading level={4}>{currentMission.prompt}</Heading>
          <Text tone="muted">{currentMission.captureHint ?? t("defaultHint")}</Text>
        </Stack>
        <div className="grid grid-cols-1 gap-sm">
          <Link
            href={buildEventCapturePath(locale, demoEventSlug, currentMission.id)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#d7c7b8] bg-surface px-lg py-sm text-sm font-medium text-text-primary transition hover:bg-surface-muted"
          >
            {t("retake")}
          </Link>
          <Button onClick={handleSubmit}>{t("submit")}</Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
