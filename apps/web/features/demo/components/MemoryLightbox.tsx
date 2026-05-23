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
        className="relative max-h-[92vh] w-full max-w-md overflow-hidden border-[var(--color-border-strong)] bg-[var(--color-surface)] p-0 shadow-card"
      >
        <button
          type="button"
          aria-label={t("closePhoto")}
          onClick={onClose}
          className="absolute right-md top-md z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] text-lg font-semibold text-text-primary shadow-card transition hover:bg-[var(--color-surface-emphasis)]"
        >
          X
        </button>
        <div onClick={(event) => event.stopPropagation()} className="flex max-h-[92vh] flex-col">
          <div className="flex min-h-[18rem] items-center justify-center bg-[var(--color-surface-emphasis)] px-md py-md">
            <img
              src={memory.mainsizeUrl}
              alt={mission?.prompt ?? memory.participantName}
              className="max-h-[60vh] w-full object-contain"
            />
          </div>
          <Stack gap="md" className="p-lg">
            <Stack gap="xs">
              <Text as="p" variant="labelSm" tone="muted">
                {memory.participantName}
              </Text>
              <Heading level={4}>{mission?.prompt ?? memory.participantName}</Heading>
            </Stack>
            <LoveButton active={loved} count={loveCount} onClick={onToggleLove} />
          </Stack>
        </div>
      </Card>
    </div>
  );
}
