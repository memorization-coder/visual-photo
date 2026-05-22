"use client";

import { useTranslations } from "next-intl";
import { Stack, Text } from "@/components/primitives";

type MissionProgressProps = {
  currentNumber?: number;
  total: number;
  completedCount: number;
};

export function MissionProgress({ currentNumber, total, completedCount }: MissionProgressProps) {
  const t = useTranslations("demo.progress");
  const ratio = total === 0 ? 0 : Math.min(100, Math.round((completedCount / total) * 100));

  return (
    <Stack gap="sm">
      <Stack direction="horizontal" justify="between" align="center">
        <Text as="span" tone="muted">
          {currentNumber ? t("current", { current: currentNumber, total }) : t("allDone")}
        </Text>
        <Text as="span" tone="muted">
          {t("completed", { count: completedCount, total })}
        </Text>
      </Stack>
      <div className="h-2 rounded-full bg-surface-muted">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${ratio}%` }} />
      </div>
    </Stack>
  );
}
