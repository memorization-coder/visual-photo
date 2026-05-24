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
  const [shareSheetVisible, setShareSheetVisible] = useState(false);
  const event = getEvent(eventId);

  const guestLink = useMemo(() => {
    const basePath = buildEventPath(locale, demoEventSlug);
    return `${basePath}?hostDemoEventId=${encodeURIComponent(eventId)}`;
  }, [eventId, locale]);

  const fullGuestLink = useMemo(
    () => (typeof window === "undefined" ? guestLink : `${window.location.origin}${guestLink}`),
    [guestLink]
  );

  const qrCodeUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(fullGuestLink)}`,
    [fullGuestLink]
  );

  async function handleCopyLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(fullGuestLink);
        setCopied(true);
        setShareSheetVisible(false);
      }
    } catch {
      setCopied(false);
    }
  }

  async function handleShareInviteLink() {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: event?.title ?? t("shareEyebrow"),
          text: event?.title ?? t("shareEyebrow"),
          url: fullGuestLink
        });
        return;
      }

      setShareSheetVisible(true);
    } catch {
      setCopied(false);
    }
  }

  function handleEmailShare() {
    const subject = encodeURIComponent(event?.title ?? t("shareEyebrow"));
    const body = encodeURIComponent(fullGuestLink);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareSheetVisible(false);
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#120d0b] px-md py-md text-[#fff3e6]">
        <Shell width="md" className="flex flex-col gap-lg">
          <div className="flex justify-end">
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => router.push(buildHostDemoListPath(locale))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.05)] text-lg text-[#fff3e6] transition hover:border-[rgba(255,243,231,0.32)]"
            >
              x
            </button>
          </div>
          <SurfaceCard className="space-y-md rounded-[2.4rem] border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(34,24,20,0.96)_0%,rgba(24,17,14,0.98)_100%)] p-xl shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
            <Heading level={2} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#fff3e6]">
              {t("missingEventTitle")}
            </Heading>
            <Text className="!text-[#f0d9c7]">{t("missingEventBody")}</Text>
          </SurfaceCard>
        </Shell>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#120d0b] px-md py-md text-[#fff3e6]">
      <Shell width="md" className="flex flex-col gap-md">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label={t("close")}
            onClick={() => router.push(buildHostDemoListPath(locale))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.05)] text-lg text-[#fff3e6] transition hover:border-[rgba(255,243,231,0.32)]"
            data-testid="host-demo-close"
          >
            x
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[2.85rem] border border-[rgba(236,213,186,0.16)] bg-[#17110f] px-lg py-lg shadow-[0_30px_72px_rgba(0,0,0,0.34)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,229,202,0.08),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(14,10,8,0.28)_0%,rgba(14,10,8,0.08)_58%,transparent_100%)]" />
          <div className="relative mx-auto max-w-[30rem]">
            <SurfaceCard
              className="relative overflow-hidden rounded-[2.35rem] border-[rgba(243,231,216,0.08)] bg-[linear-gradient(180deg,rgba(250,244,235,0.98)_0%,rgba(240,229,212,0.95)_100%)] p-lg shadow-[0_24px_48px_rgba(0,0,0,0.18)]"
              data-testid="host-demo-share"
            >
              <img
                src="/demo/disposable-camera/stamp-ring.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-10 hidden w-28 opacity-[0.12] md:block"
              />
              <Stack gap="sm" className="relative text-center">
                <Text
                  as="p"
                  variant="labelSm"
                  className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.1rem] normal-case tracking-normal !text-[#d98563]"
                >
                  {t("shareEyebrow")}
                </Text>
                <Text as="p" variant="bodyLg" className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#34231d]">
                  {event.title}
                </Text>
              </Stack>

              <div className="relative mt-lg space-y-md">
                <div className="relative mx-auto flex w-full max-w-[19rem] items-center justify-center rounded-[2rem] bg-[linear-gradient(180deg,#efe2cf_0%,#e4d5c0_100%)] p-md shadow-[0_18px_34px_rgba(70,47,37,0.12)]">
                  <img
                    src="/demo/disposable-camera/tape-corner.webp"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-2 w-14 rotate-[8deg] opacity-90"
                  />
                  <div className="w-full rounded-[1.35rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] p-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                    <img src={qrCodeUrl} alt={t("shareQrAlt")} className="h-full w-full object-contain" />
                  </div>
                </div>

                <div className="mx-auto grid max-w-[19rem] gap-sm">
                  <Button
                    onClick={() => void handleShareInviteLink()}
                    className="min-h-[3.1rem] rounded-[1rem] border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] !text-[#fff8f0] shadow-[0_10px_20px_rgba(52,35,29,0.16)]"
                    data-testid="host-demo-share-link"
                  >
                    {copied ? t("copiedLink") : t("shareInviteLink")}
                  </Button>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>

        {shareSheetVisible ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(10,7,6,0.58)] px-md py-lg sm:items-center">
            <div className="w-full max-w-sm rounded-[2rem] border border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(34,24,20,0.98)_0%,rgba(24,17,14,1)_100%)] p-lg shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <div className="mb-md flex items-center justify-between gap-sm">
                <Text as="p" variant="bodyLg" className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#fff3e6]">
                  {t("shareSheetTitle")}
                </Text>
                <button
                  type="button"
                  aria-label={t("close")}
                  onClick={() => setShareSheetVisible(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.05)] text-lg text-[#fff3e6] transition hover:border-[rgba(255,243,231,0.32)]"
                >
                  x
                </button>
              </div>
              <div className="space-y-sm">
                <Button
                  onClick={() => void handleCopyLink()}
                  className="min-h-[3rem] w-full rounded-[1rem] border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] !text-[#fff8f0]"
                  data-testid="host-demo-share-sheet-copy"
                >
                  {t("shareSheetCopy")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleEmailShare}
                  className="min-h-[3rem] w-full rounded-[1rem] border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.05)] !text-[#fff3e6]"
                  data-testid="host-demo-share-sheet-email"
                >
                  {t("shareSheetEmail")}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Shell>
    </main>
  );
}
