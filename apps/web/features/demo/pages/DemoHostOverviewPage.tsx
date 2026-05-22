"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Heading, Shell, Stack, Text } from "@/components/primitives";
import { buildEventPath, buildEventWallPath } from "@/lib/routes";
import { demoEvent, demoEventDescription, demoEventSlug, demoMissions } from "../demoData";
import { SurfaceCard } from "../components/shared";

type DemoHostOverviewPageProps = {
  locale: string;
};

export function DemoHostOverviewPage({ locale }: DemoHostOverviewPageProps) {
  const t = useTranslations("demo.host");
  const [copied, setCopied] = useState(false);

  const guestPath = buildEventPath(locale, demoEventSlug);
  const wallPath = buildEventWallPath(locale, demoEventSlug);
  const guestLink = useMemo(() => {
    if (typeof window === "undefined") {
      return guestPath;
    }

    return `${window.location.origin}${guestPath}`;
  }, [guestPath]);

  async function handleCopyLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(guestLink);
        setCopied(true);
      }
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary">
      <Shell width="lg" className="flex flex-col gap-lg">
        <SurfaceCard className="space-y-md">
          <Stack gap="sm">
            <Text as="p" variant="labelSm" tone="muted" className="tracking-[0.2em]">
              {t("eyebrow")}
            </Text>
            <Heading level={2}>{demoEvent.title}</Heading>
            <Text variant="bodyLg">{demoEventDescription}</Text>
            <Text tone="muted">{t("overviewBody")}</Text>
          </Stack>
          <div className="grid grid-cols-1 gap-sm sm:grid-cols-3">
            <Button href={guestPath}>{t("previewAsGuest")}</Button>
            <Button href={wallPath} variant="outlined">
              {t("viewWall")}
            </Button>
            <Button variant="muted" onClick={() => void handleCopyLink()}>
              {copied ? t("copiedLink") : t("copyDemoLink")}
            </Button>
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-md">
          <Heading level={4}>{t("generatedMomentsTitle")}</Heading>
          <div className="space-y-sm">
            {demoMissions.map((mission) => (
              <div key={mission.id} className="rounded-xl border border-[#eadfce] bg-surface-muted px-md py-md">
                <Text as="p" variant="labelSm" tone="muted">
                  {t("momentNumber", { current: mission.missionOrder + 1 })}
                </Text>
                <Text as="p" variant="bodyLg">
                  {mission.prompt}
                </Text>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard className="space-y-md">
          <Heading level={4}>{t("sharePanelTitle")}</Heading>
          <Stack gap="sm">
            <Text tone="muted">{t("sharePanelBody")}</Text>
            <div className="rounded-2xl border border-dashed border-[#d7c4b3] bg-[#fff8f0] p-lg text-center">
              <Text as="p" variant="labelSm" tone="muted">
                {t("fakeQrLabel")}
              </Text>
              <div className="mx-auto mt-md h-40 w-40 rounded-2xl border border-[#d7c4b3] bg-[linear-gradient(135deg,#fffdf8_0%,#f2e3d3_100%)]" />
              <Text as="p" className="mt-md break-all">
                {guestLink}
              </Text>
            </div>
          </Stack>
        </SurfaceCard>
      </Shell>
    </main>
  );
}
