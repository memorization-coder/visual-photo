"use client";

import { useTranslations } from "next-intl";
import { Heading, Stack, Text } from "@/components/primitives";

type EventHeaderProps = {
  title: string;
  participantName?: string;
};

export function EventHeader({ title, participantName }: EventHeaderProps) {
  const t = useTranslations("demo.event");

  return (
    <Stack as="header" gap="sm">
      <Text as="p" variant="labelSm" tone="muted" className="tracking-[0.2em]">
        {t("eyebrow")}
      </Text>
      <Heading level={2}>{title}</Heading>
      <Text tone="muted">
        {t("guestLabel", { name: participantName ?? t("guestFallback") })}
      </Text>
    </Stack>
  );
}
