"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

  function renderBucket(role: HostDemoRole, bucket: EventBucket) {
    const sectionEvents = groupedEvents[role][bucket];
    return (
      <div className="space-y-md">
        <div className="flex items-center justify-between gap-sm">
          <Heading level={4}>{t(`dashboard.bucket.${bucket}`)}</Heading>
          <Text tone="muted">{sectionEvents.length}</Text>
        </div>
        {sectionEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
            {sectionEvents.map((event) => (
              <HostDemoEventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        ) : (
          <Text tone="muted">{t("dashboard.empty")}</Text>
        )}
      </div>
    );
  }

  function renderRoleSection(role: HostDemoRole) {
    const pastEvents = groupedEvents[role].past;

    return (
      <SurfaceCard className="space-y-xl">
        <div className="flex items-center justify-between gap-sm">
          <Heading level={3}>{t(`dashboard.role.${role}`)}</Heading>
          {pastEvents.length > 0 ? (
            <button
              type="button"
              onClick={() => togglePast(role)}
              className="text-sm font-medium text-text-secondary"
              data-testid={`host-demo-expand-past-${role}`}
            >
              {expandedPastSections[role] ? t("dashboard.hidePast") : t("dashboard.expandPast")}
            </button>
          ) : null}
        </div>

        <div className="space-y-xl">
          {renderBucket(role, "current")}
          {renderBucket(role, "future")}
          {expandedPastSections[role] ? renderBucket(role, "past") : null}
        </div>
      </SurfaceCard>
    );
  }

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary">
      <Shell width="lg" className="flex flex-col gap-lg">
        <div className="flex items-center justify-between gap-md">
          <div className="flex gap-sm">
            {(["hosting", "participating"] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`rounded-full px-md py-sm text-sm font-medium transition ${
                  activeRole === role
                    ? "bg-accent text-white"
                    : "border border-[var(--color-border)] bg-surface-muted text-text-secondary hover:text-text-primary"
                }`}
                data-testid={`host-demo-tab-${role}`}
              >
                {t(`dashboard.role.${role}`)}
              </button>
            ))}
          </div>

          <Button
            onClick={() => router.push(buildHostDemoCreatePath(locale))}
            className="gap-sm"
            data-testid="host-demo-create-link"
          >
            <PlusIcon />
            {t("newEventButton")}
          </Button>
        </div>

        {renderRoleSection(activeRole)}
      </Shell>
    </main>
  );
}
