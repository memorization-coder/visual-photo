"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Button, Heading, Shell, Text } from "@/components/primitives";
import { buildHostDemoCreatePath } from "@/lib/routes";
import { useDemoHostPrototype } from "../DemoHostPrototypeProvider";
import { HostDemoEventCard } from "../components/HostDemoEventCard";
import { PlusIcon } from "../components/HostDemoIcons";
import { SurfaceCard } from "../components/shared";
import { getHostDemoEventTimingState } from "../hostDemoLogic";
import type { HostDemoEvent, HostDemoRole } from "../hostDemoTypes";

type DemoHostListPageProps = {
  locale: string;
};

type EventBucket = "current" | "future" | "past";

function sortByStartAt(events: HostDemoEvent[]) {
  return [...events].sort((left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime());
}

export function DemoHostListPage({ locale }: DemoHostListPageProps) {
  const t = useTranslations("demo.host");
  const router = useRouter();
  const { events } = useDemoHostPrototype();
  const [activeRole, setActiveRole] = useState<HostDemoRole>("hosting");
  const [expandedPastSections, setExpandedPastSections] = useState<Record<HostDemoRole, boolean>>({
    hosting: false,
    participating: false
  });

  const groupedEvents = useMemo(() => {
    const base: Record<HostDemoRole, Record<EventBucket, HostDemoEvent[]>> = {
      hosting: { current: [], future: [], past: [] },
      participating: { current: [], future: [], past: [] }
    };

    for (const event of events) {
      const bucket = getHostDemoEventTimingState(event);
      base[event.role][bucket].push(event);
    }

    return {
      hosting: {
        current: sortByStartAt(base.hosting.current),
        future: sortByStartAt(base.hosting.future),
        past: sortByStartAt(base.hosting.past).reverse()
      },
      participating: {
        current: sortByStartAt(base.participating.current),
        future: sortByStartAt(base.participating.future),
        past: sortByStartAt(base.participating.past).reverse()
      }
    };
  }, [events]);

  function togglePast(role: HostDemoRole) {
    setExpandedPastSections((current) => ({
      ...current,
      [role]: !current[role]
    }));
  }

  function renderSupportingGrid(sectionEvents: HostDemoEvent[]) {
    if (sectionEvents.length === 0) {
      return <Text className="!text-[#f0d9c7]">{t("dashboard.empty")}</Text>;
    }

    return (
      <div className="grid grid-cols-1 gap-md xl:grid-cols-2">
        {sectionEvents.map((event) => (
          <HostDemoEventCard key={event.id} event={event} locale={locale} variant="supporting" />
        ))}
      </div>
    );
  }

  function renderEditorialSection(bucket: Extract<EventBucket, "future" | "past">, content: ReactNode) {
    const count = activeRoleEvents[bucket].length;
    const isPast = bucket === "past";

    return (
      <section className="relative overflow-hidden rounded-[2.35rem] border border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(34,24,20,0.96)_0%,rgba(24,17,14,0.98)_100%)] px-lg py-lg shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
        <img
          src="/demo/disposable-camera/film-strip-edge.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-5 hidden h-28 opacity-[0.16] md:block"
        />
        <div className="relative space-y-lg md:pl-xl">
          <div className="flex items-center justify-between gap-sm">
            <Heading level={3} className="[font-family:Georgia,_Times_New_Roman,_serif] text-[1.55rem] !text-[#fff3e6]">
              {t(`dashboard.bucket.${bucket}`)}
            </Heading>
            {isPast && count > 0 ? (
              <button
                type="button"
                onClick={() => togglePast(activeRole)}
                className="text-sm font-medium !text-[#fff3e6]"
                data-testid={`host-demo-expand-past-${activeRole}`}
              >
                {expandedPastSections[activeRole] ? t("dashboard.hidePast") : t("dashboard.expandPast")}
              </button>
            ) : (
              <Text className="!text-[#f0d9c7]">{count}</Text>
            )}
          </div>
          {content}
        </div>
      </section>
    );
  }

  const activeRoleEvents = groupedEvents[activeRole];
  const heroEvent = activeRoleEvents.current[0];

  return (
    <main className="min-h-screen bg-[#120d0b] px-md py-md text-[#fff3e6]">
      <Shell width="lg" className="flex flex-col gap-lg">
        <div
          className="relative overflow-hidden rounded-[2.85rem] border border-[rgba(236,213,186,0.16)] bg-[#17110f] px-lg py-md shadow-[0_30px_72px_rgba(0,0,0,0.34)]"
          style={
            heroEvent
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(12, 8, 6, 0.16) 0%, rgba(18, 12, 10, 0.74) 52%, rgba(18, 12, 10, 0.95) 100%), url(${heroEvent.imageUrl})`,
                  backgroundPosition: "center top",
                  backgroundSize: "cover"
                }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,229,202,0.08),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(14,10,8,0.32)_0%,rgba(14,10,8,0.08)_58%,transparent_100%)]" />
          <div className="pointer-events-none absolute left-0 top-0 h-36 w-72 bg-[radial-gradient(circle_at_12%_18%,rgba(16,10,8,0.88)_0%,rgba(16,10,8,0.58)_42%,rgba(16,10,8,0.16)_72%,transparent_84%)]" />
          <div className="relative space-y-sm">
            <div className="flex items-start justify-end gap-md">
              <Button
                onClick={() => router.push(buildHostDemoCreatePath(locale))}
                className="gap-sm rounded-full border-0 bg-[#f19568] px-lg py-[0.66rem] !text-[#fffaf4] shadow-[0_12px_28px_rgba(95,46,20,0.22)] hover:bg-[#ee8c5e]"
                data-testid="host-demo-create-link"
              >
                <PlusIcon />
                {t("newEventButton")}
              </Button>
            </div>

            <div className="space-y-xs">
              <Text
                as="p"
                variant="labelSm"
                className="inline-block [font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.28rem] normal-case tracking-normal !text-[#f2caae] [text-shadow:0_2px_12px_rgba(0,0,0,0.58)]"
              >
                {t("listGreeting", { name: "Paris" })}
              </Text>

              <div className="flex flex-wrap gap-sm">
                {(["hosting", "participating"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`rounded-full px-lg py-[0.64rem] text-sm font-medium transition ${
                      activeRole === role
                        ? "bg-[#f7efe3] text-[#2f211b] shadow-[0_14px_28px_rgba(0,0,0,0.22)]"
                        : "border border-[rgba(255,243,231,0.22)] bg-[rgba(255,243,231,0.05)] text-[#fff3e6] hover:border-[rgba(255,243,231,0.42)]"
                    }`}
                    data-testid={`host-demo-tab-${role}`}
                  >
                    {t(`dashboard.role.${role}`)}
                  </button>
                ))}
              </div>
            </div>

            {heroEvent ? (
              <div className="pt-sm">
                <HostDemoEventCard event={heroEvent} locale={locale} variant="hero" />
              </div>
            ) : (
              <SurfaceCard className="rounded-[2rem] border-[rgba(236,213,186,0.18)] bg-[rgba(23,17,14,0.68)] p-lg backdrop-blur-sm">
                <Text className="!text-[#f0d9c7]">{t("dashboard.empty")}</Text>
              </SurfaceCard>
            )}
          </div>
        </div>

        <div className="space-y-lg">
          {renderEditorialSection("future", renderSupportingGrid(activeRoleEvents.future))}
          {renderEditorialSection(
            "past",
            expandedPastSections[activeRole]
              ? <div>{renderSupportingGrid(activeRoleEvents.past)}</div>
              : activeRoleEvents.past.length === 0
                ? <Text className="!text-[#f0d9c7]">{t("dashboard.empty")}</Text>
                : null
          )}
        </div>
      </Shell>
    </main>
  );
}
