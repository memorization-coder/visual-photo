"use client";

import Link from "next/link";
import type { Mission } from "@visual-photo/contracts";
import { useTranslations } from "next-intl";
import { Button, Heading, Stack, Text } from "@/components/primitives";
import { buildEventCapturePath, buildEventWallPath } from "@/lib/routes";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { EventHeader } from "../components/EventHeader";
import { MissionCard } from "../components/MissionCard";
import { MissionProgress } from "../components/MissionProgress";
import { SurfaceCard } from "../components/shared";

type DemoMissionsPageProps = {
  locale: string;
};

export function DemoMissionsPage({ locale }: DemoMissionsPageProps) {
  const t = useTranslations("demo");
  const { event, participant, missions, activeMission, completedMissionIds, listState } = useDemoEventPrototype();

  return (
    <div className="space-y-md">
      <SurfaceCard className="space-y-lg">
        <EventHeader title={event.title} participantName={participant.displayName} />
        <MissionProgress
          currentNumber={activeMission ? activeMission.missionOrder + 1 : undefined}
          total={missions.length}
          completedCount={completedMissionIds.length}
        />
      </SurfaceCard>

      {activeMission ? (
        <>
          <MissionCard
            mission={activeMission}
            total={missions.length}
            currentNumber={activeMission.missionOrder + 1}
            status="active"
          />
          <div className="grid grid-cols-1 gap-sm">
            <Button href={buildEventCapturePath(locale, demoEventSlug, activeMission.id)}>
              {t("guest.takePhoto")}
            </Button>
            <Button href={buildEventWallPath(locale, demoEventSlug)} variant="muted">
              {t("guest.viewWall")}
            </Button>
          </div>
        </>
      ) : (
        <SurfaceCard className="space-y-md">
          <Heading level={3}>{t("state.completeTitle")}</Heading>
          <Text>{t("state.completeBody")}</Text>
          <Button href={buildEventWallPath(locale, demoEventSlug)}>{t("guest.viewWall")}</Button>
        </SurfaceCard>
      )}

      <SurfaceCard className="space-y-sm">
        <Heading level={4}>{t("missions.descriptionTitle")}</Heading>
        <Text tone="muted">{t("missions.description")}</Text>
      </SurfaceCard>

      <MissionSection
        title={t("missions.activeTitle")}
        body={t("missions.activeBody")}
        missions={listState.active}
        status="active"
        locale={locale}
        allMissions={missions}
      />

      <MissionSection
        title={t("missions.completedTitle")}
        body={t("missions.completedBody")}
        missions={listState.completed}
        status="completed"
        locale={locale}
        allMissions={missions}
      />
    </div>
  );
}

type MissionSectionProps = {
  title: string;
  body: string;
  missions: Array<Mission & { revealed: boolean; completed: boolean }>;
  status: "active" | "completed";
  locale: string;
  allMissions: Mission[];
};

function MissionSection({ title, body, missions, status, locale, allMissions }: MissionSectionProps) {
  if (missions.length === 0) {
    return null;
  }

  return (
    <section className="space-y-sm">
      <div className="px-xs">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary">{title}</h2>
        <p className="text-sm leading-6 text-text-secondary">{body}</p>
      </div>
      <div className="space-y-sm">
        {missions.map((mission) =>
          status === "active" ? (
            <Link key={mission.id} href={buildEventCapturePath(locale, demoEventSlug, mission.id)} className="block">
              <MissionCard
                mission={mission}
                total={allMissions.length}
                currentNumber={mission.missionOrder + 1}
                status={status}
              />
            </Link>
          ) : (
            <MissionCard
              key={mission.id}
              mission={mission}
              total={allMissions.length}
              currentNumber={mission.missionOrder + 1}
              status={status}
            />
          )
        )}
      </div>
    </section>
  );
}
