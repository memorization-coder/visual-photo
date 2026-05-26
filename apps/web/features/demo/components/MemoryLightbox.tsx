"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Mission } from "@visual-photo/contracts";
import { Card, Heading, Stack, Text } from "@/components/primitives";
import type { DemoMemory } from "../demoSelectors";
import { LoveButton } from "./LoveButton";

type MemoryLightboxProps = {
  memory: DemoMemory;
  mission?: Mission;
  loveCount: number;
  loved: boolean;
  onClose: () => void;
  onToggleLove: () => void;
};

export function MemoryLightbox({
  memory,
  mission,
  loveCount,
  loved,
  onClose,
  onToggleLove
}: MemoryLightboxProps) {
  const t = useTranslations("demo.wall");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-overlay)] px-md py-lg" onClick={onClose}>
      <Card
        variant="surface"
        className="relative max-h-[92vh] w-full max-w-md overflow-hidden rounded-[2.35rem] border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(34,24,20,0.98)_0%,rgba(24,17,14,1)_100%)] p-0 shadow-[0_28px_72px_rgba(0,0,0,0.32)]"
      >
        <button
          type="button"
          aria-label={t("closePhoto")}
          onClick={onClose}
          className="absolute right-md top-md z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.06)] text-lg font-semibold text-[#fff3e6] shadow-[0_12px_24px_rgba(0,0,0,0.16)] transition hover:bg-[rgba(255,243,231,0.14)]"
        >
          X
        </button>
        <div onClick={(event) => event.stopPropagation()} className="flex max-h-[92vh] flex-col">
          <div className="flex min-h-[18rem] items-center justify-center bg-[rgba(250,244,235,0.92)] px-md py-md">
            <img
              src={memory.mainsizeUrl}
              alt={mission?.prompt ?? memory.participantName}
              className="max-h-[60vh] w-full object-contain"
            />
          </div>
          <Stack gap="md" className="p-lg">
            <Stack gap="xs">
              <Text
                as="p"
                variant="labelSm"
                className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.04rem] normal-case tracking-normal !text-[#f2caae]"
              >
                {memory.participantName}
              </Text>
              <Heading level={4} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#fff3e6]">
                {mission?.prompt ?? memory.participantName}
              </Heading>
            </Stack>
            <LoveButton active={loved} count={loveCount} onClick={onToggleLove} />
          </Stack>
        </div>
      </Card>
    </div>
  );
}
