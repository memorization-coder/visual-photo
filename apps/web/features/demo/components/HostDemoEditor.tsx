"use client";

import { type ChangeEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Button, Heading, Shell, Text } from "@/components/primitives";
import { buildHostDemoListPath } from "@/lib/routes";
import { useDemoHostPrototype } from "../DemoHostPrototypeProvider";
import { createDefaultHostDemoDraftState, defaultHostDemoDraftState, hostPromptExamples } from "../hostDemoData";
import { createDraftFromEvent, generateHostDemoIdeas, getHostDemoEventTimingState, validateSchedule } from "../hostDemoLogic";
import type { HostDemoDraftState, HostDemoMission } from "../hostDemoTypes";
import { PlusIcon } from "./HostDemoIcons";

type HostDemoEditorProps = {
  locale: string;
  mode: "create" | "edit";
  eventId?: string;
};

type EditorialLayoutProps = {
  eyebrow: string;
  title: string;
  body: string;
  stepLabel?: string;
  hideStepLabel?: boolean;
  headerAction?: ReactNode;
  heroImage?: string;
  children: ReactNode;
};

function createEmptyMission(index: number): HostDemoMission {
  return {
    id: `manual-mission-${index + 1}`,
    prompt: "",
    aiGenerated: false
  };
}

function buildDraftKey(mode: "create" | "edit", eventId?: string) {
  return mode === "create" ? "create" : `edit:${eventId ?? "missing"}`;
}

function arraysEqual(left: HostDemoMission[], right: HostDemoMission[]) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function EditorialLayout({ eyebrow, title, body, stepLabel, hideStepLabel = false, headerAction, heroImage, children }: EditorialLayoutProps) {
  const showHeader = Boolean((stepLabel && !hideStepLabel) || eyebrow || title || body);
  return (
    <main className="min-h-screen bg-[#120d0b] px-md py-md text-[#fff3e6]">
      <Shell width="lg" className="flex flex-col gap-md">
        <div
          className="relative overflow-hidden rounded-[2.85rem] border border-[rgba(236,213,186,0.16)] bg-[#17110f] px-lg py-lg shadow-[0_30px_72px_rgba(0,0,0,0.34)]"
          style={
            heroImage
              ? {
                  backgroundImage: `linear-gradient(180deg, rgba(14, 10, 8, 0.28) 0%, rgba(18, 12, 10, 0.84) 50%, rgba(18, 12, 10, 0.96) 100%), url(${heroImage})`,
                  backgroundPosition: "center top",
                  backgroundSize: "cover"
                }
              : undefined
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,229,202,0.08),transparent_32%)]" />
          <div className="pointer-events-none absolute left-0 top-0 h-40 w-80 bg-[radial-gradient(circle_at_12%_18%,rgba(16,10,8,0.88)_0%,rgba(16,10,8,0.6)_42%,rgba(16,10,8,0.12)_74%,transparent_86%)]" />
          <div className="relative space-y-lg">
            {showHeader ? (
              <div className="flex items-start justify-between gap-md">
                <div className="max-w-xl space-y-sm">
                  {stepLabel && !hideStepLabel ? (
                    <Text
                      as="p"
                      variant="labelSm"
                      className="inline-flex rounded-full border border-[rgba(255,243,231,0.16)] bg-[rgba(17,12,10,0.54)] px-md py-[0.45rem] tracking-[0.18em] !text-[#f2d7c2]"
                    >
                      {stepLabel}
                    </Text>
                  ) : null}
                  {eyebrow || title ? (
                    <div className="space-y-xs">
                      {eyebrow ? (
                        <Text
                          as="p"
                          variant="labelSm"
                          className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[clamp(1.7rem,3vw,2.15rem)] normal-case tracking-normal !text-[#f2caae] [text-shadow:0_2px_12px_rgba(0,0,0,0.58)]"
                        >
                          {eyebrow}
                        </Text>
                      ) : null}
                      {title ? (
                        <Heading
                          level={1}
                          className="max-w-2xl text-balance [font-family:Georgia,_Times_New_Roman,_serif] text-[clamp(2.2rem,5vw,4rem)] leading-[0.94] !text-[#fff3e6]"
                        >
                          {title}
                        </Heading>
                      ) : null}
                    </div>
                  ) : null}
                  {body ? <Text className="max-w-xl text-base leading-7 !text-[#f0d9c7]">{body}</Text> : null}
                </div>
                {headerAction ? <div className="pt-[0.2rem]">{headerAction}</div> : null}
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </Shell>
    </main>
  );
}

function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-[2.2rem] border border-[rgba(77,51,41,0.12)] bg-[linear-gradient(180deg,rgba(250,244,235,0.98)_0%,rgba(240,229,212,0.96)_100%)] p-lg shadow-[0_18px_38px_rgba(70,47,37,0.14)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("space-y-xs", align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? (
        <Text
          as="p"
          variant="labelSm"
          className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.08rem] normal-case tracking-normal !text-[#7f5341]"
        >
          {eyebrow}
        </Text>
      ) : null}
      <Heading level={3} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#34231d]">
        {title}
      </Heading>
      {body ? <Text className="leading-7 !text-[#73584b]">{body}</Text> : null}
    </div>
  );
}

function ActionRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-end gap-sm">{children}</div>;
}

export function HostDemoEditor({ locale, mode, eventId }: HostDemoEditorProps) {
  const t = useTranslations("demo.host");
  const router = useRouter();
  const { isHydrated, getEvent, getDraft, initializeDraft, saveDraft, clearDraft, createEvent, updateEvent, deleteEvent } =
    useDemoHostPrototype();
  const event = eventId ? getEvent(eventId) : undefined;
  const draftKey = buildDraftKey(mode, eventId);
  const fallbackDraft = mode === "edit" && event ? createDraftFromEvent(event) : createDefaultHostDemoDraftState();
  const [formState, setFormState] = useState<HostDemoDraftState>(getDraft(draftKey) ?? fallbackDraft);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [basicsError, setBasicsError] = useState<string | null>(null);
  const [momentsError, setMomentsError] = useState<string | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [draggedMissionIndex, setDraggedMissionIndex] = useState<number | null>(null);
  const [selectedGuestPack, setSelectedGuestPack] = useState<number | null>(null);
  const [momentsExpanded, setMomentsExpanded] = useState(mode !== "edit");
  const initializedDraftKeyRef = useRef<string | null>(null);
  const canEditEvent = mode === "create" || (event?.role === "hosting" && getHostDemoEventTimingState(event) === "future");

  useEffect(() => {
    if (!isHydrated || (mode === "edit" && !eventId)) {
      return;
    }

    if (initializedDraftKeyRef.current === draftKey) {
      return;
    }

    initializedDraftKeyRef.current = draftKey;
    const storedDraft = getDraft(draftKey);

    if (mode === "create") {
      clearDraft(draftKey);
      setFormState(createDefaultHostDemoDraftState());
      setSelectedGuestPack(null);
      setMomentsExpanded(true);
      return;
    }

    if (storedDraft) {
      setFormState(storedDraft);
      setSelectedGuestPack(null);
      setMomentsExpanded(false);
      return;
    }

    setSelectedGuestPack(null);
    setMomentsExpanded(false);
    setFormState(initializeDraft(draftKey, eventId));
  }, [clearDraft, draftKey, eventId, getDraft, initializeDraft, isHydrated, mode]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveDraft(draftKey, formState);
  }, [draftKey, formState, isHydrated, saveDraft]);

  const requiresUpgrade = useMemo(
    () => mode === "edit" && selectedGuestPack !== null && selectedGuestPack > 5,
    [mode, selectedGuestPack]
  );
  const createReturnPath = buildHostDemoListPath(locale);

  const hasChanges = useMemo(() => {
    if (mode !== "edit" || !event) {
      return true;
    }

    const baseChanged = !(
      event.title === formState.title &&
      event.imageUrl === formState.imageUrl &&
      event.startAt === formState.startAt &&
      event.endAt === formState.endAt &&
      event.revealMode === formState.revealMode &&
      event.revealDelayHours === formState.revealDelayHours &&
      event.allowGuestGalleryView === formState.allowGuestGalleryView &&
      event.guestCapacityLimit === formState.guestCapacityLimit &&
      arraysEqual(event.missions, formState.missions)
    );

    return baseChanged || selectedGuestPack !== null;
  }, [event, formState, mode, selectedGuestPack]);

  const backdropImage = formState.imageUrl || event?.imageUrl;
  const currentStepLabel =
    mode === "create" ? t(formState.currentStep === 0 ? "steps.basics" : formState.currentStep === 1 ? "steps.moments" : "steps.settings") : undefined;

  if (!isHydrated) {
    return (
      <EditorialLayout eyebrow={t("eyebrow")} title={t("createTitle")} body={t("createBody")} headerAction={renderCloseButton()}>
        <SectionCard className="min-h-[24rem]">
          <div />
        </SectionCard>
      </EditorialLayout>
    );
  }

  if (mode === "edit" && !event) {
    return (
      <EditorialLayout eyebrow={t("eyebrow")} title={t("missingEventTitle")} body={t("missingEventBody")} headerAction={renderCloseButton()}>
        <SectionCard className="space-y-md">
          <div className="flex justify-end">{renderCloseButton()}</div>
          <Button onClick={() => router.push(buildHostDemoListPath(locale))}>{t("backToEvents")}</Button>
        </SectionCard>
      </EditorialLayout>
    );
  }

  if (mode === "edit" && event && !canEditEvent) {
    return (
      <EditorialLayout eyebrow={t("editEyebrow")} title={t("lockedEventTitle")} body={t("lockedEventBody")} headerAction={renderCloseButton()} heroImage={event.imageUrl}>
        <SectionCard className="space-y-md">
          <div className="flex justify-end">{renderCloseButton()}</div>
        </SectionCard>
      </EditorialLayout>
    );
  }

  function updateDraft(next: Partial<HostDemoDraftState>) {
    setFormState((current) => ({ ...current, ...next }));
  }

  function updateMission(index: number, prompt: string) {
    setFormState((current) => {
      const nextMissions = [...current.missions];
      nextMissions[index] = { ...nextMissions[index], prompt };
      return { ...current, missions: nextMissions };
    });
  }

  function removeMission(index: number) {
    setFormState((current) => ({
      ...current,
      missions: current.missions.filter((_, itemIndex) => itemIndex !== index)
    }));
  }

  function addMission() {
    setFormState((current) => {
      if (current.missions.length >= 10) {
        return current;
      }

      return {
        ...current,
        missions: [...current.missions, createEmptyMission(current.missions.length)]
      };
    });
  }

  function handleImageChange(eventInput: ChangeEvent<HTMLInputElement>) {
    const file = eventInput.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateDraft({ imageUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  }

  function handleGenerateIdeas() {
    setBasicsError(null);

    if (!formState.imageUrl || !formState.hostPrompt.trim()) {
      setBasicsError(t("basicsError"));
      return;
    }

    const generated = generateHostDemoIdeas(formState.hostPrompt);
    setFormState((current) => ({
      ...current,
      title: generated.title,
      missions: generated.missions,
      currentStep: 1
    }));
  }

  function handleSaveMoments() {
    setMomentsError(null);
    const nonEmptyMissions = formState.missions.filter((mission) => mission.prompt.trim().length > 0);

    if (nonEmptyMissions.length < 3) {
      setMomentsError(t("momentsMinError"));
      return;
    }

    setFormState((current) => ({
      ...current,
      title: current.title.trim() || generateHostDemoIdeas(current.hostPrompt).title,
      missions: nonEmptyMissions.slice(0, 10),
      currentStep: 2
    }));
  }

  function handleCreateSubmit() {
    const nextScheduleError = validateSchedule({
      startAt: formState.startAt,
      endAt: formState.endAt
    });
    setScheduleError(nextScheduleError ? t(`scheduleErrors.${nextScheduleError}`) : null);

    if (nextScheduleError) {
      return;
    }

    createEvent(formState);
    clearDraft(draftKey);
    window.location.href = createReturnPath;
  }

  function handleEditSubmit() {
    const nextScheduleError = validateSchedule({
      startAt: formState.startAt,
      endAt: formState.endAt
    });
    setScheduleError(nextScheduleError ? t(`scheduleErrors.${nextScheduleError}`) : null);

    if (nextScheduleError) {
      return;
    }

    if (!hasChanges) {
      setDeleteVisible(true);
      return;
    }

    if (requiresUpgrade) {
      setPaywallVisible(true);
      return;
    }

    if (eventId) {
      updateEvent(eventId, formState);
      clearDraft(draftKey);
    }

    window.location.href = buildHostDemoListPath(locale);
  }

  function renderCloseButton() {
    return (
      <button
        type="button"
        aria-label={t("close")}
        onClick={() => {
          window.location.href = mode === "create" ? createReturnPath : buildHostDemoListPath(locale);
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,243,231,0.18)] bg-[rgba(255,243,231,0.05)] text-lg text-[#fff3e6] transition hover:border-[rgba(255,243,231,0.32)]"
        data-testid="host-demo-close"
      >
        x
      </button>
    );
  }

  function renderMissionCard(mission: HostDemoMission, index: number) {
    return (
      <div
        key={mission.id}
        draggable
        onDragStart={() => setDraggedMissionIndex(index)}
        onDragOver={(eventInput) => eventInput.preventDefault()}
        onDrop={() => {
          if (draggedMissionIndex === null || draggedMissionIndex === index) {
            return;
          }

          setFormState((current) => {
            const nextMissions = [...current.missions];
            const [item] = nextMissions.splice(draggedMissionIndex, 1);
            nextMissions.splice(index, 0, item);
            return { ...current, missions: nextMissions };
          });
          setDraggedMissionIndex(null);
        }}
        onDragEnd={() => setDraggedMissionIndex(null)}
        className="space-y-sm rounded-[1.6rem] border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.78)] p-md shadow-[0_10px_18px_rgba(70,47,37,0.06)]"
        data-testid={`host-demo-mission-${index + 1}`}
      >
        <div className="flex items-center justify-between gap-sm">
          <Text as="p" variant="labelSm" className="tracking-[0.18em] !text-[#9d7a68]">
            {t("momentNumber", { current: index + 1 })}
          </Text>
          <button
            type="button"
            disabled={formState.missions.length <= 3}
            onClick={() => removeMission(index)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.84)] text-sm text-[#73584b] transition hover:border-[rgba(77,51,41,0.2)] hover:text-[#34231d] disabled:opacity-40"
          >
            x
          </button>
        </div>
        <textarea
          value={mission.prompt}
          onChange={(eventInput) => updateMission(index, eventInput.target.value)}
          data-testid={`host-demo-mission-input-${index + 1}`}
          rows={4}
          className="w-full resize-none rounded-[1.15rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-sm leading-7 text-[#34231d] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
        />
      </div>
    );
  }

  function renderMissionsEditor() {
    return (
      <>
        <div className="grid grid-cols-1 gap-md xl:grid-cols-2">
          {formState.missions.map((mission, index) => renderMissionCard(mission, index))}
        </div>
        <div className="flex flex-wrap items-center gap-sm">
          <Button
            variant="ghost"
            onClick={addMission}
            disabled={formState.missions.length >= 10}
            className="min-h-[3rem] gap-sm rounded-full border border-[rgba(77,51,41,0.14)] bg-[rgba(255,250,245,0.72)] px-lg !text-[#34231d] hover:bg-[rgba(255,250,245,0.9)]"
          >
            <PlusIcon />
            {t("addMoment")}
          </Button>
          <Text className="!text-[#73584b]">{t("momentsLimitDrag")}</Text>
        </div>
      </>
    );
  }

  function renderEditMomentsSection() {
    return (
      <SectionCard className="space-y-md bg-[linear-gradient(180deg,rgba(248,239,224,0.98)_0%,rgba(236,223,204,0.96)_100%)]">
        <button
          type="button"
          onClick={() => setMomentsExpanded((current) => !current)}
          className="flex w-full items-center justify-between gap-md text-left"
          data-testid="host-demo-toggle-moments"
        >
          <div className="space-y-xs">
            <Text
              as="p"
              variant="labelSm"
              className="[font-family:'Bradley_Hand',_'Segoe_Script',cursive] text-[1.06rem] normal-case tracking-normal !text-[#7f5341]"
            >
              {t("generatedMomentsTitle")}
            </Text>
            <Heading level={3} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#34231d]">
              {t("momentsTitle")}
            </Heading>
            <Text className="!text-[#73584b]">{t("momentsSummary", { count: formState.missions.length })}</Text>
          </div>
          <Text as="span" variant="labelMd" className="!text-[#34231d]">
            {momentsExpanded ? t("hideMoments") : t("expandMoments")}
          </Text>
        </button>

        {momentsExpanded ? (
          <>
            {renderMissionsEditor()}
            {momentsError ? <Text tone="error">{momentsError}</Text> : null}
          </>
        ) : null}
      </SectionCard>
    );
  }

  function renderSettingsFields() {
    return (
      <div className="grid gap-md xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard className="space-y-md">
          <SectionHeading title={t("settingsTitle")} />
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
            <div className="space-y-sm">
              <Text as="label" variant="labelMd" className="!text-[#34231d]">
                {t("startLabel")}
              </Text>
              <input
                type="datetime-local"
                value={formState.startAt}
                onChange={(eventInput) => updateDraft({ startAt: eventInput.target.value })}
                data-testid="host-demo-start-at"
                className="w-full rounded-[1.15rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-sm text-[#34231d]"
              />
            </div>
            <div className="space-y-sm">
              <Text as="label" variant="labelMd" className="!text-[#34231d]">
                {t("endLabel")}
              </Text>
              <input
                type="datetime-local"
                value={formState.endAt}
                onChange={(eventInput) => updateDraft({ endAt: eventInput.target.value })}
                data-testid="host-demo-end-at"
                className="w-full rounded-[1.15rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-sm text-[#34231d]"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard className="space-y-md">
          <SectionHeading title={t("revealLabel")} />
          <div className="grid gap-sm">
            {[
              ["during", t("revealOptions.during")],
              ["after", t("revealOptions.after")],
              ["delayed", t("revealOptions.delayed")]
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateDraft({ revealMode: value as HostDemoDraftState["revealMode"] })}
                data-testid={`host-demo-reveal-${value}`}
                className={clsx(
                  "rounded-[1.35rem] border px-md py-md text-left transition",
                  formState.revealMode === value
                    ? "border-[rgba(77,51,41,0.22)] bg-[rgba(248,239,224,0.95)] shadow-[0_12px_24px_rgba(70,47,37,0.08)]"
                    : "border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.62)]"
                )}
              >
                <Text as="span" variant="labelMd" className="!text-[#34231d]">
                  {label}
                </Text>
              </button>
            ))}
          </div>

          {formState.revealMode === "delayed" ? (
            <div className="space-y-sm">
              <Text as="label" variant="labelMd" className="!text-[#34231d]">
                {t("delayLabel")}
              </Text>
              <input
                type="number"
                min={1}
                value={formState.revealDelayHours}
                onChange={(eventInput) => updateDraft({ revealDelayHours: Number(eventInput.target.value || 0) })}
                data-testid="host-demo-delay-hours"
                className="w-full rounded-[1.15rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-sm text-[#34231d] sm:max-w-[12rem]"
              />
            </div>
          ) : null}

          <div className="space-y-sm">
            <Text as="label" variant="labelMd" className="!text-[#34231d]">
              {t("galleryToggle")}
            </Text>
            <label className="flex items-center gap-sm rounded-[1.25rem] border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.72)] px-md py-md text-[#34231d]">
              <input
                type="checkbox"
                checked={formState.allowGuestGalleryView}
                onChange={(eventInput) => updateDraft({ allowGuestGalleryView: eventInput.target.checked })}
              />
              <Text className="!text-[#34231d]">{formState.allowGuestGalleryView ? t("toggleOn") : t("toggleOff")}</Text>
            </label>
          </div>
        </SectionCard>
      </div>
    );
  }

  function renderGuestInvitedOptions() {
    const currentGuestLimit = selectedGuestPack ?? event?.guestCapacityLimit ?? formState.guestCapacityLimit;
    const options = [
      { value: 15, label: t("guestInvited.tenMoreLabel"), note: t("guestInvited.tenMorePrice"), tier: "small" as const },
      { value: 30, label: t("guestInvited.twentyFiveMoreLabel"), note: t("guestInvited.twentyFiveMorePrice"), tier: "medium" as const },
      { value: 55, label: t("guestInvited.fiftyMoreLabel"), note: t("guestInvited.fiftyMorePrice"), tier: "unlimited" as const },
      { value: 105, label: t("guestInvited.hundredMoreLabel"), note: t("guestInvited.hundredMorePrice"), tier: "unlimited" as const }
    ];

    return (
      <SectionCard className="space-y-md">
        <SectionHeading
          eyebrow={t("guestInvited.label")}
          title={t("guestInvited.label")}
          body={t("guestInvited.helperWithCounts", {
            invited: event?.invitedGuestCount ?? 0,
            limit: currentGuestLimit
          })}
        />
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelectedGuestPack(option.value);
                updateDraft({ guestCapacityLimit: option.value, eventTier: option.tier });
              }}
              className={clsx(
                "rounded-[1.35rem] border px-md py-md text-left transition",
                selectedGuestPack === option.value
                  ? "border-[rgba(77,51,41,0.22)] bg-[rgba(248,239,224,0.95)] shadow-[0_12px_24px_rgba(70,47,37,0.08)]"
                  : "border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.62)]"
              )}
            >
              <Text as="p" variant="labelMd" className="!text-[#34231d]">
                {option.label}
              </Text>
              <Text className="!text-[#73584b]">{option.note}</Text>
            </button>
          ))}
        </div>
      </SectionCard>
    );
  }

  function renderDeleteModal() {
    if (!deleteVisible) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,7,6,0.58)] px-md">
        <div className="w-full max-w-md rounded-[2rem] border border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(250,244,235,0.98)_0%,rgba(240,229,212,0.96)_100%)] p-lg shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <div className="mb-md flex justify-end">
            <button
              type="button"
              onClick={() => setDeleteVisible(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.72)] text-lg text-[#34231d]"
            >
              x
            </button>
          </div>
          <div className="space-y-md text-center">
            <Heading level={3} className="[font-family:Georgia,_Times_New_Roman,_serif] !text-[#34231d]">
              {t("deleteModal.title")}
            </Heading>
            <Text className="!text-[#73584b]">{t("deleteModal.body")}</Text>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  if (eventId) {
                    deleteEvent(eventId);
                    clearDraft(draftKey);
                  }
                  window.location.href = buildHostDemoListPath(locale);
                }}
                className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
              >
                {t("deleteModal.confirm")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPaywallModal() {
    if (!paywallVisible) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,7,6,0.58)] px-md">
        <div className="w-full max-w-lg rounded-[2rem] border border-[rgba(236,213,186,0.15)] bg-[linear-gradient(180deg,rgba(250,244,235,0.98)_0%,rgba(240,229,212,0.96)_100%)] p-lg shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <div className="mb-md flex justify-end">
            <button
              type="button"
              onClick={() => setPaywallVisible(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.72)] text-lg text-[#34231d]"
            >
              x
            </button>
          </div>
          <div className="space-y-md">
            <SectionHeading eyebrow={t("upgradeCardTitle")} title={t("paywall.title")} body={t("paywall.body")} />
            <div className="grid grid-cols-1 gap-sm">
              {[t("paywall.optionTen"), t("paywall.optionTwentyFive"), t("paywall.optionFifty"), t("paywall.optionHundred")].map((option) => (
                <div key={option} className="rounded-[1.25rem] border border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.72)] p-md text-[#34231d]">
                  {option}
                </div>
              ))}
            </div>
            <ActionRow>
              <Button
                onClick={() => {
                  setPaywallVisible(false);
                  if (eventId) {
                    updateEvent(eventId, formState);
                    clearDraft(draftKey);
                  }
                  window.location.href = buildHostDemoListPath(locale);
                }}
                className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
              >
                {t("paywall.confirm")}
              </Button>
            </ActionRow>
          </div>
        </div>
      </div>
    );
  }

  function renderImagePanel() {
    return (
      <div className="relative mx-auto flex w-full max-w-[20rem] justify-center">
        <div className="relative w-full rounded-[2.2rem] bg-[linear-gradient(180deg,rgba(255,250,245,0.94)_0%,rgba(236,223,204,0.94)_100%)] px-[6%] pb-[18%] pt-[6%] shadow-[0_18px_34px_rgba(70,47,37,0.14)]">
          <img
            src="/demo/disposable-camera/tape-corner.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] top-[-2%] z-20 w-[26%] rotate-[10deg] opacity-95"
          />
          <div className="relative z-10 aspect-[0.82/1] overflow-hidden rounded-[1.35rem] bg-[#efe4d3] shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)]">
            {formState.imageUrl ? (
              <img src={formState.imageUrl} alt={t("imagePreviewAlt")} className="h-full w-full object-cover saturate-[0.92] sepia-[0.06]" />
            ) : (
              <div className="flex h-full items-center justify-center px-lg text-center">
                <Text className="leading-7 !text-[#8f7467]">{t("imagePlaceholder")}</Text>
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-x-[7%] bottom-[7%] h-[10%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08)_0%,transparent_72%)] blur-md" />
        </div>
      </div>
    );
  }

  function renderCreateBasics() {
    return (
      <SectionCard className="relative overflow-hidden">
        <img
          src="/demo/disposable-camera/stamp-ring.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-6 hidden w-28 opacity-[0.1] xl:block"
        />
        <div className="mb-lg">
          <Heading level={2} className="[font-family:Georgia,_Times_New_Roman,_serif] text-[clamp(1.3rem,2vw,1.65rem)] !text-[#34231d]">
            {t("basicsCardTitle")}
          </Heading>
        </div>
        <div className="grid items-start gap-lg xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-md">
            <label className="block cursor-pointer" data-testid="host-demo-image-input">
              <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
              {renderImagePanel()}
            </label>
          </div>
          <div className="space-y-md">
            <div className="space-y-sm">
              {t("promptLabel") ? (
                <Text as="label" variant="labelMd" className="!text-[#34231d]">
                  {t("promptLabel")}
                </Text>
              ) : null}
              <textarea
                value={formState.hostPrompt}
                onChange={(eventInput) => updateDraft({ hostPrompt: eventInput.target.value })}
                rows={7}
                data-testid="host-demo-prompt-input"
                className="w-full rounded-[1.4rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-sm leading-7 text-[#34231d] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                placeholder={t("promptPlaceholder")}
              />
            </div>

            <div className="grid gap-sm">
              {hostPromptExamples.map((example, index) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => updateDraft({ hostPrompt: example })}
                  data-testid={`host-demo-prompt-example-${index + 1}`}
                  className={clsx(
                    "rounded-[1.35rem] border px-md py-md text-left text-sm leading-7 transition",
                    formState.hostPrompt === example
                      ? "border-[rgba(77,51,41,0.22)] bg-[rgba(248,239,224,0.95)] text-[#34231d] shadow-[0_12px_24px_rgba(70,47,37,0.08)]"
                      : "border-[rgba(77,51,41,0.12)] bg-[rgba(255,250,245,0.72)] text-[#73584b] hover:border-[rgba(77,51,41,0.2)] hover:text-[#34231d]"
                  )}
                >
                  {example}
                </button>
              ))}
            </div>

            {basicsError ? <Text tone="error">{basicsError}</Text> : null}

            <ActionRow>
              <Button
                onClick={handleGenerateIdeas}
                data-testid="host-demo-generate-ideas"
                className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
              >
                {t("generateIdeas")}
              </Button>
            </ActionRow>
          </div>
        </div>
      </SectionCard>
    );
  }

  function renderCreateMoments() {
    return (
      <SectionCard className="space-y-lg">
        <div className="space-y-xl">
          <SectionHeading title={t("momentsTitle")} body={t("momentsBody")} />
          <div className="space-y-lg">
            <div className="space-y-sm">
              <Text as="label" variant="labelMd" className="!text-[#34231d]">
                {t("eventTitleLabel")}
              </Text>
              <input
                value={formState.title}
                onChange={(eventInput) => updateDraft({ title: eventInput.target.value })}
                data-testid="host-demo-title-input"
                className="w-full rounded-[1.25rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-base font-semibold text-[#34231d]"
                placeholder={t("eventTitleLabel")}
              />
            </div>
            <div className="space-y-md">
              {renderMissionsEditor()}
            </div>
            {momentsError ? <Text tone="error">{momentsError}</Text> : null}
            <ActionRow>
              <Button
                onClick={handleSaveMoments}
                data-testid="host-demo-save-moments"
                className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
              >
                {t("saveMoments")}
              </Button>
            </ActionRow>
          </div>
        </div>
      </SectionCard>
    );
  }

  function renderCreateSettings() {
    return (
      <div className="space-y-lg">
        {renderSettingsFields()}
        {scheduleError ? <Text tone="error">{scheduleError}</Text> : null}
        <ActionRow>
          <Button
            onClick={handleCreateSubmit}
            data-testid="host-demo-final-submit"
            className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
          >
            {t("createEvent")}
          </Button>
        </ActionRow>
      </div>
    );
  }

  function renderEditScreen() {
    return (
      <>
        <EditorialLayout
          eyebrow={t("editEyebrow")}
          title={t("editTitle")}
          body={t("editBody")}
          heroImage={backdropImage}
        >
          <SectionCard className="space-y-lg">
            <div className="flex justify-end">{renderCloseButton()}</div>
            <div className="grid items-start gap-lg xl:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-md">
                <label className="block cursor-pointer" data-testid="host-demo-image-input">
                  <input type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                  {renderImagePanel()}
                </label>
              </div>
              <div className="space-y-md">
                <SectionHeading eyebrow={t("eventCardEyebrow")} title={formState.title} />
                <div className="space-y-sm">
                  <Text as="label" variant="labelMd" className="!text-[#34231d]">
                    {t("eventTitleLabel")}
                  </Text>
                  <input
                    value={formState.title}
                    onChange={(eventInput) => updateDraft({ title: eventInput.target.value })}
                    data-testid="host-demo-title-input"
                    className="w-full rounded-[1.25rem] border border-[rgba(77,51,41,0.12)] bg-[#fffaf4] px-md py-md text-base font-semibold text-[#34231d]"
                  />
                </div>
              </div>
            </div>

            {renderGuestInvitedOptions()}
            {renderEditMomentsSection()}
            {renderSettingsFields()}
            {scheduleError ? <Text tone="error">{scheduleError}</Text> : null}

            <ActionRow>
              <Button
                onClick={handleEditSubmit}
                data-testid="host-demo-final-submit"
                className="rounded-full border-0 bg-[linear-gradient(180deg,#4d3329_0%,#34231d_100%)] px-xl !text-[#fff8f0]"
              >
                {hasChanges ? t("updateEvent") : t("deleteEvent")}
              </Button>
            </ActionRow>
          </SectionCard>
        </EditorialLayout>
        {renderDeleteModal()}
        {renderPaywallModal()}
      </>
    );
  }

  if (mode === "edit" && event) {
    return renderEditScreen();
  }

  return (
    <EditorialLayout
      eyebrow={t("createEyebrow")}
      title={t("createTitle")}
      body={t("createBody")}
      stepLabel={currentStepLabel}
      hideStepLabel
      headerAction={renderCloseButton()}
      heroImage={backdropImage}
    >
      {formState.currentStep === 0 ? renderCreateBasics() : null}
      {formState.currentStep === 1 ? renderCreateMoments() : null}
      {formState.currentStep === 2 ? renderCreateSettings() : null}
    </EditorialLayout>
  );
}
