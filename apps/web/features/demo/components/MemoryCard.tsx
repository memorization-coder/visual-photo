"use client";

import type { Mission } from "@visual-photo/contracts";
import clsx from "clsx";
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
  const imageWindowClass = getMemoryImageWindowClass(memory);
  const rotationClass = getMemoryRotationClass(memory.id);

  return (
    <SurfaceCard
      className={clsx(
        "overflow-hidden rounded-[1.8rem] border-[rgba(236,213,186,0.12)] bg-[linear-gradient(180deg,rgba(74,52,42,0.96)_0%,rgba(52,36,30,0.98)_100%)] p-sm shadow-[0_18px_36px_rgba(0,0,0,0.2)]",
        rotationClass
      )}
    >
      <div className="rounded-[1.2rem] bg-[rgba(255,250,245,0.94)] p-xs shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
        <Button variant="ghost" className="block w-full p-0 hover:bg-transparent" onClick={onOpen}>
          <img
            src={memory.thumbnailUrl}
            alt={mission?.prompt ?? memory.participantName}
            className={clsx("w-full rounded-[0.2rem] object-cover", imageWindowClass)}
          />
        </Button>
        <div className="space-y-sm px-sm pb-sm pt-sm">
          <div className="flex items-center justify-between gap-sm">
            <Text as="p" className="min-w-0 truncate !text-[#73584b]">
              {memory.participantName}
            </Text>
            <span className="inline-flex items-center gap-[0.32rem] text-[0.72rem] font-medium uppercase tracking-[0.16em] text-[#9d7a68]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.9]"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20.5 4.8 13.8a4.8 4.8 0 0 1 6.8-6.8L12 7.4l.4-.4a4.8 4.8 0 0 1 6.8 6.8Z" />
              </svg>
              <span>{loveCount}</span>
            </span>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
