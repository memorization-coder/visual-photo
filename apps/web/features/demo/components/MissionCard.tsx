"use client";

import clsx from "clsx";
import type { Mission } from "@visual-photo/contracts";
import { useTranslations } from "next-intl";
import { Heading, Stack, Text } from "@/components/primitives";
import { SurfaceCard } from "./shared";

type MissionCardProps = {
  mission: Mission;
  currentNumber?: number;
  total: number;
  status?: "active" | "skipped" | "completed";
  className?: string;
};

export function MissionCard({ mission, currentNumber, total, status = "active", className }: MissionCardProps) {
  const t = useTranslations("demo.mission");

  return (
    <SurfaceCard className={clsx("space-y-md", className)}>
      <Stack direction="horizontal" align="start" justify="between" className="gap-md">
        <div>
          <Text as="p" variant="labelMd" tone="muted" className="uppercase tracking-[0.14em]">
            {t("count", { current: currentNumber ?? mission.missionOrder + 1, total })}
          </Text>
          <Heading level={3} className="mt-sm">
            {mission.prompt}
          </Heading>
        </div>
        <span
          className={clsx(
            "rounded-full px-sm py-xs text-xs font-medium",
            status === "completed" && "bg-[#ddebdc] text-success",
            status === "skipped" && "bg-[#f4e4c4] text-warning",
            status === "active" && "bg-accent-soft text-[#8e4d33]"
          )}
        >
          {status === "completed" ? t("statusCompleted") : status === "skipped" ? t("statusSkipped") : t("statusActive")}
        </span>
      </Stack>
      {mission.captureHint ? <Text tone="muted">{mission.captureHint}</Text> : null}
    </SurfaceCard>
  );
}
