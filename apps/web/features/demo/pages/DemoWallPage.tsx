"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Heading, Stack, Text } from "@/components/primitives";
import { useDemoEventPrototype } from "../DemoEventPrototypeProvider";
import { filterMemoriesByMission, findMemoryById, sortMissions } from "../demoSelectors";
import { MemoryLightbox } from "../components/MemoryLightbox";
import { MemoryWallGrid } from "../components/MemoryWallGrid";

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
      <div className="space-y-lg">
        <section className="relative overflow-hidden rounded-[2.85rem] border border-[rgba(236,213,186,0.16)] bg-[#17110f] px-lg py-lg shadow-[0_30px_72px_rgba(0,0,0,0.34)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,229,202,0.08),transparent_34%)]" />
          <div className="relative space-y-md">
            <div className="flex items-center justify-between gap-md rounded-[2rem] border border-[rgba(236,213,186,0.12)] bg-[rgba(255,250,245,0.08)] px-md py-md">
              <Stack gap="xs" className="min-w-0">
                <Text as="p" variant="labelSm" className="tracking-[0.16em] !text-[#f0d9c7]">
                  {t("filterLabel")}
                </Text>
                <Text as="p" className="min-w-0 truncate !text-[#fff3e6]">
                  {selectedFilterMission?.prompt ?? t("allMissions")}
                </Text>
                <Text className="!text-[#d8bea8]">
                  {selectedFilterMission ? t("filteredVisibleCount", { count: filteredMemories.length }) : t("visibleCount", { count: allMemories.length })}
                </Text>
              </Stack>
              <div className="relative h-14 w-20 shrink-0">
                {previewStack.map((memory, index) => (
                  <img
                    key={memory.id}
                    src={memory.thumbnailUrl}
                    alt={memory.participantName}
                    className="absolute top-0 h-14 w-12 rounded-lg border-2 border-[var(--color-surface-raised)] object-cover shadow-card"
                    style={{ left: `${index * 18}px`, zIndex: previewStack.length - index }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-sm">
              <Heading level={4} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#fff3e6]">
                {selectedFilterMission ? t("filterLabel") : t("allMissions")}
              </Heading>
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setShowFilters((current) => !current)}
                className="rounded-full !border-[rgba(255,243,231,0.18)] !bg-[rgba(255,243,231,0.06)] !text-[#fff3e6] hover:!bg-[rgba(255,243,231,0.12)]"
              >
                {showFilters ? t("hideFilters") : t("showFilters")}
              </Button>
            </div>

            {showFilters ? (
              <div className="flex flex-wrap gap-sm">
                <Button
                  variant={selectedMissionId ? "ghost" : "filled"}
                  size="sm"
                  onClick={() => handleSelectMissionFilter(undefined)}
                  className={selectedMissionId ? "rounded-full !border-[rgba(255,243,231,0.18)] !bg-[rgba(255,243,231,0.06)] !text-[#fff3e6]" : "rounded-full border-0 !bg-[#fff3e6] !text-[#2f211b]"}
                >
                  {t("allMissions")}
                </Button>
                {orderedMissions.map((mission) => (
                  <Button
                    key={mission.id}
                    variant={selectedMissionId === mission.id ? "filled" : "ghost"}
                    size="sm"
                    onClick={() => handleSelectMissionFilter(mission.id)}
                    className={selectedMissionId === mission.id ? "rounded-full border-0 !bg-[#fff3e6] !text-[#2f211b]" : "rounded-full !border-[rgba(255,243,231,0.18)] !bg-[rgba(255,243,231,0.06)] !text-[#fff3e6]"}
                  >
                    {t("missionChip", { current: mission.missionOrder + 1 })}
                  </Button>
                ))}
              </div>
            ) : null}

            {filteredMemories.length === 0 ? <Text className="!text-[#d8bea8]">{t("emptyMissionFilter")}</Text> : null}

            <MemoryWallGrid
              memories={filteredMemories}
              missions={missions}
              getLoveCount={getMemoryLoveCount}
              onSelectMemory={setSelectedMemoryId}
            />
          </div>
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
