"use client";

import { useTranslations } from "next-intl";
import type { Mission } from "@visual-photo/contracts";
import { Heading, Stack, Text } from "@/components/primitives";
import type { DemoMemory } from "../demoSelectors";
import { MemoryWallGrid } from "./MemoryWallGrid";
import { SurfaceCard } from "./shared";

type MomentsPeopleLovedSectionProps = {
  memories: DemoMemory[];
  missions: Mission[];
  getLoveCount: (submissionId: string) => number;
  onSelectMemory: (submissionId: string) => void;
};

export function MomentsPeopleLovedSection({
  memories,
  missions,
  getLoveCount,
  onSelectMemory
}: MomentsPeopleLovedSectionProps) {
  const t = useTranslations("demo.wall");

  return (
    <SurfaceCard className="space-y-md">
      <Stack gap="xs">
        <Heading level={4}>{t("momentsPeopleLoved")}</Heading>
        <Text tone="muted">{t("momentsPeopleLovedDescription")}</Text>
      </Stack>
      <MemoryWallGrid
        memories={memories.slice(0, 4)}
        missions={missions}
        getLoveCount={getLoveCount}
        onSelectMemory={onSelectMemory}
      />
    </SurfaceCard>
  );
}
