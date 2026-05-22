"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Heading, Stack, Text } from "@/components/primitives";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { filterMemoriesByMission, findMemoryById, sortMissions } from "../demoSelectors";
import { MemoryLightbox } from "../components/MemoryLightbox";
import { MemoryWallGrid } from "../components/MemoryWallGrid";
import { SurfaceCard } from "../components/shared";

export function DemoWallPage() {
  const t = useTranslations("demo.wall");
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | undefined>();
  const [selectedMissionId, setSelectedMissionId] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const { missions, allMemories, toggleLove, getMemoryLoveCount, isLovedByCurrentUser } = useDemoEventPrototype();

  const orderedMissions = useMemo(() => sortMissions(missions), [missions]);
  const filteredMemories = useMemo(
    () => filterMemoriesByMission(allMemories, selectedMissionId),
    [allMemories, selectedMissionId]
  );
  const selectedMemory = selectedMemoryId ? findMemoryById(allMemories, selectedMemoryId) : undefined;
  const selectedMission = selectedMemory
    ? missions.find((mission) => mission.id === selectedMemory.missionId)
    : undefined;
  const selectedFilterMission = selectedMissionId
    ? missions.find((mission) => mission.id === selectedMissionId)
    : undefined;
  const previewStack = filteredMemories.slice(0, 3);

  function handleSelectMissionFilter(missionId?: string) {
    setSelectedMissionId(missionId);
    setSelectedMemoryId(undefined);
    setShowFilters(false);
  }

  return (
    <>
      <div className="space-y-md">
        <section className="space-y-sm">
          <div className="px-xs">
            <Heading level={4}>{t("allMoments")}</Heading>
            <Text tone="muted">
              {selectedFilterMission
                ? t("filteredMomentsDescription", { mission: selectedFilterMission.prompt })
                : t("allMomentsDescription")}
            </Text>
          </div>

          <SurfaceCard className="space-y-md">
            <div className="flex items-center justify-between gap-md rounded-2xl bg-[#f6efe7] px-md py-md">
              <Stack gap="xs" className="min-w-0">
                <Text as="p" variant="labelSm" tone="muted">
                  {t("summaryLabel")}
                </Text>
                <Text as="p" variant="bodyLg">
                  {selectedFilterMission
                    ? t("filteredVisibleCount", { count: filteredMemories.length })
                    : t("visibleCount", { count: allMemories.length })}
                </Text>
              </Stack>
              <div className="relative h-14 w-20 shrink-0">
                {previewStack.map((memory, index) => (
                  <img
                    key={memory.id}
                    src={memory.thumbnailUrl}
                    alt={memory.participantName}
                    className="absolute top-0 h-14 w-12 rounded-lg border-2 border-white object-cover shadow-[0_10px_24px_rgba(76,52,39,0.18)]"
                    style={{ left: `${index * 18}px`, zIndex: previewStack.length - index }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-sm">
              <Stack gap="xs" className="min-w-0">
                <Text as="p" variant="labelSm" tone="muted">
                  {t("filterLabel")}
                </Text>
                <Text as="p" className="min-w-0 truncate">
                  {selectedFilterMission?.prompt ?? t("allMissions")}
                </Text>
              </Stack>
              <Button variant="outlined" size="sm" onClick={() => setShowFilters((current) => !current)}>
                {showFilters ? t("hideFilters") : t("showFilters")}
              </Button>
            </div>

            {showFilters ? (
              <div className="flex flex-wrap gap-sm">
                <Button
                  variant={selectedMissionId ? "ghost" : "filled"}
                  size="sm"
                  onClick={() => handleSelectMissionFilter(undefined)}
                >
                  {t("allMissions")}
                </Button>
                {orderedMissions.map((mission) => (
                  <Button
                    key={mission.id}
                    variant={selectedMissionId === mission.id ? "filled" : "ghost"}
                    size="sm"
                    onClick={() => handleSelectMissionFilter(mission.id)}
                  >
                    {t("missionChip", { current: mission.missionOrder + 1 })}
                  </Button>
                ))}
              </div>
            ) : null}

            {filteredMemories.length === 0 ? <Text tone="muted">{t("emptyMissionFilter")}</Text> : null}

            <MemoryWallGrid
              memories={filteredMemories}
              missions={missions}
              getLoveCount={getMemoryLoveCount}
              onSelectMemory={setSelectedMemoryId}
            />
          </SurfaceCard>
        </section>
      </div>
      {selectedMemory ? (
        <MemoryLightbox
          memory={selectedMemory}
          mission={selectedMission}
          loveCount={getMemoryLoveCount(selectedMemory.id)}
          loved={isLovedByCurrentUser(selectedMemory.id)}
          onClose={() => setSelectedMemoryId(undefined)}
          onToggleLove={() => toggleLove(selectedMemory.id)}
        />
      ) : null}
    </>
  );
}
