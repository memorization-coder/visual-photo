"use client";

import type { Mission } from "@visual-photo/contracts";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Button, Text } from "@/components/primitives";
import { SurfaceCard } from "./shared";
import {
  getMemoryImageWindowClass,
  getMemoryRotationClass,
  type DemoMemory
} from "../demoSelectors";

type MemoryCardProps = {
  memory: DemoMemory;
  mission?: Mission;
  loveCount: number;
  onOpen?: () => void;
};

export function MemoryCard({ memory, mission, loveCount, onOpen }: MemoryCardProps) {
  const t = useTranslations("demo.wall");
  const imageWindowClass = getMemoryImageWindowClass(memory);
  const rotationClass = getMemoryRotationClass(memory.id);

  return (
    <SurfaceCard
      className={clsx(
        "overflow-hidden border-[var(--color-border)] bg-[var(--color-surface-emphasis)] p-sm shadow-card",
        rotationClass
      )}
    >
      <div className="rounded-md bg-[var(--color-surface-raised)] p-xs shadow-card">
        <Button variant="ghost" className="block w-full p-0 hover:bg-transparent" onClick={onOpen}>
          <img
            src={memory.thumbnailUrl}
            alt={mission?.prompt ?? memory.participantName}
            className={clsx("w-full rounded-[0.2rem] object-cover", imageWindowClass)}
          />
        </Button>
        <div className="space-y-sm px-sm pb-sm pt-sm">
          <div className="flex items-center justify-between gap-sm">
            <Text as="p" tone="muted" className="min-w-0 truncate">
              {memory.participantName}
            </Text>
            <Text as="span" variant="labelSm" tone="muted">
              {t("heartCount", { count: loveCount })}
            </Text>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
