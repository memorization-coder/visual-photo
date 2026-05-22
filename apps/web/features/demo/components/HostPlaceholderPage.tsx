"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Heading, Shell, Stack, Text } from "@/components/primitives";
import { SurfaceCard } from "./shared";

type HostPlaceholderPageProps = {
  titleKey: string;
  bodyKey: string;
  locale: string;
};

export function HostPlaceholderPage({ titleKey, bodyKey, locale }: HostPlaceholderPageProps) {
  const t = useTranslations("demo.host");

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary">
      <Shell width="lg" className="flex flex-col gap-lg">
        <SurfaceCard className="space-y-md">
          <Stack gap="md">
            <Text as="p" variant="labelSm" tone="muted" className="tracking-[0.2em]">
              {t("eyebrow")}
            </Text>
            <Heading level={2}>{t(titleKey)}</Heading>
            <Text variant="bodyLg" tone="muted">
              {t(bodyKey)}
            </Text>
          </Stack>
          <Link
            href={`/${locale}/e/demo`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-lg py-sm text-sm font-medium text-white transition hover:opacity-95"
          >
            {t("viewGuestPrototype")}
          </Link>
        </SurfaceCard>
      </Shell>
    </main>
  );
}
