"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Heading, Shell, Stack, Text } from "@/components/primitives";
import { buildEventPath, buildHostDemoListPath } from "@/lib/routes";
import { useDemoHostPrototype } from "../DemoHostPrototypeProvider";
import { demoEventSlug } from "../demoData";
import { SurfaceCard } from "../components/shared";

type DemoHostSharePageProps = {
  locale: string;
  eventId: string;
};

export function DemoHostSharePage({ locale, eventId }: DemoHostSharePageProps) {
  const t = useTranslations("demo.host");
  const router = useRouter();
  const { getEvent } = useDemoHostPrototype();
  const [copied, setCopied] = useState(false);
  const event = getEvent(eventId);

  const guestLink = useMemo(() => {
    const basePath = buildEventPath(locale, demoEventSlug);
    return `${basePath}?hostDemoEventId=${encodeURIComponent(eventId)}`;
  }, [eventId, locale]);
  const qrCodeUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
        typeof window === "undefined" ? guestLink : `${window.location.origin}${guestLink}`
      )}`,
    [guestLink]
  );

  async function handleCopyLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(
          typeof window === "undefined" ? guestLink : `${window.location.origin}${guestLink}`
        );
        setCopied(true);
      }
    } catch {
      setCopied(false);
    }
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-background px-md py-xl text-text-primary">
        <Shell width="lg" className="flex flex-col gap-lg">
          <SurfaceCard className="space-y-md">
            <div className="flex justify-end">
              <button
                type="button"
                aria-label={t("close")}
                onClick={() => router.push(buildHostDemoListPath(locale))}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
              >
                x
              </button>
            </div>
            <Heading level={2}>{t("missingEventTitle")}</Heading>
            <Text tone="muted">{t("missingEventBody")}</Text>
          </SurfaceCard>
        </Shell>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary">
      <Shell width="lg" className="flex flex-col gap-lg">
        <SurfaceCard className="space-y-md" data-testid="host-demo-share">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => router.push(buildHostDemoListPath(locale))}
              className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
              data-testid="host-demo-close"
            >
              x
            </button>
          </div>
          <Stack gap="sm">
            <Heading level={2}>{event.title}</Heading>
            <Text tone="muted">{t("shareEventBodySimple")}</Text>
          </Stack>
          <div className="rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-emphasis)] p-lg text-center">
            <div className="mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-sm">
              <img src={qrCodeUrl} alt={t("shareQrAlt")} className="h-full w-full object-contain" />
            </div>
            <div className="mt-lg flex justify-center">
              <Button onClick={() => void handleCopyLink()} data-testid="host-demo-copy-link">
              {copied ? t("copiedLink") : t("copyGuestLink")}
              </Button>
            </div>
          </div>
        </SurfaceCard>
      </Shell>
    </main>
  );
}
