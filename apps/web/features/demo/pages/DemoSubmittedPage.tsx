"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { buildEventPath, buildEventWallPath } from "@/lib/routes";
import { SurfaceCard } from "../components/shared";

type DemoSubmittedPageProps = {
  locale: string;
};

export function DemoSubmittedPage({ locale }: DemoSubmittedPageProps) {
  const t = useTranslations("demo.submitted");
  const { missions, lastSubmittedMissionId, completedMissionIds } = useDemoEventPrototype();

  const lastMission = missions.find((mission) => mission.id === lastSubmittedMissionId);
  const hasNextMission = missions.find(
    (mission) => mission.isActive && !completedMissionIds.includes(mission.id)
  );

  return (
    <SurfaceCard className="space-y-md">
      <p className="text-sm uppercase tracking-[0.2em] text-success">{t("eyebrow")}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary">{t("title")}</h1>
      <p className="text-base leading-7 text-text-secondary">
        {lastMission ? t("bodyWithMission", { mission: lastMission.prompt }) : t("body")}
      </p>
      <div className="grid grid-cols-1 gap-sm">
        {hasNextMission ? (
          <Link
            href={buildEventPath(locale, demoEventSlug)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-lg py-sm text-sm font-medium text-white transition hover:opacity-95"
          >
            {t("nextMoment")}
          </Link>
        ) : null}
        <Link
          href={buildEventWallPath(locale, demoEventSlug)}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#d7c7b8] bg-surface px-lg py-sm text-sm font-medium text-text-primary transition hover:bg-surface-muted"
        >
          {t("viewWall")}
        </Link>
        <Link
          href={buildEventPath(locale, demoEventSlug)}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-surface-muted px-lg py-sm text-sm font-medium text-text-primary transition hover:opacity-95"
        >
          {t("returnToCamera")}
        </Link>
      </div>
    </SurfaceCard>
  );
}
