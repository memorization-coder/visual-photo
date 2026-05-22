"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Heading, Stack, Text } from "@/components/primitives";
import { buildEventCapturePath, buildEventWallPath } from "@/lib/routes";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { EventHeader } from "../components/EventHeader";
import { SurfaceCard } from "../components/shared";

type DemoEventPageProps = {
  locale: string;
};

export function DemoEventPage({ locale }: DemoEventPageProps) {
  const t = useTranslations("demo.state");
  const router = useRouter();
  const { event, participant, activeMission, allComplete } = useDemoEventPrototype();

  useEffect(() => {
    if (!activeMission) {
      return;
    }

    router.replace(buildEventCapturePath(locale, demoEventSlug, activeMission.id));
  }, [activeMission, locale, router]);

  if (!allComplete) {
    return (
      <SurfaceCard className="space-y-md">
        <EventHeader title={event.title} participantName={participant.displayName} />
        <Text tone="muted">{t("redirectingBody")}</Text>
      </SurfaceCard>
    );
  }

  return (
    <div className="space-y-md">
      <SurfaceCard className="space-y-md">
        <EventHeader title={event.title} participantName={participant.displayName} />
        <Stack gap="sm">
          <Heading level={3}>{t("title")}</Heading>
          <Text>{t("completeBody")}</Text>
          <Text tone="muted">{t("completeFollowUp")}</Text>
        </Stack>
        <Stack gap="sm">
          <Button href={buildEventWallPath(locale, demoEventSlug)}>{t("viewWall")}</Button>
          <Button href={buildEventWallPath(locale, demoEventSlug)} variant="outlined">
            {t("reviewWall")}
          </Button>
        </Stack>
      </SurfaceCard>
    </div>
  );
}
