"use client";

import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Heading, Shell, Text } from "@/components/primitives";
import { buildHostDemoListPath } from "@/lib/routes";
import { useDemoHostPrototype } from "../DemoHostPrototypeProvider";
import { defaultHostDemoDraftState, hostPromptExamples } from "../hostDemoData";
import { createDraftFromEvent, generateHostDemoIdeas, getHostDemoEventTimingState, validateSchedule } from "../hostDemoLogic";
import type { HostDemoDraftState, HostDemoMission } from "../hostDemoTypes";
import { PlusIcon } from "./HostDemoIcons";
import { SurfaceCard } from "./shared";

type HostDemoEditorProps = {
  locale: string;
  mode: "create" | "edit";
  eventId?: string;
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

export function HostDemoEditor({ locale, mode, eventId }: HostDemoEditorProps) {
  const t = useTranslations("demo.host");
  const router = useRouter();
  const { isHydrated, getEvent, getDraft, initializeDraft, saveDraft, clearDraft, createEvent, updateEvent, deleteEvent } =
    useDemoHostPrototype();
  const event = eventId ? getEvent(eventId) : undefined;
  const draftKey = buildDraftKey(mode, eventId);
  const fallbackDraft = mode === "edit" && event ? createDraftFromEvent(event) : defaultHostDemoDraftState;
  const [formState, setFormState] = useState<HostDemoDraftState>(getDraft(draftKey) ?? fallbackDraft);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [basicsError, setBasicsError] = useState<string | null>(null);
  const [momentsError, setMomentsError] = useState<string | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);
  const [draggedMissionIndex, setDraggedMissionIndex] = useState<number | null>(null);
  const [selectedGuestPack, setSelectedGuestPack] = useState<number | null>(null);
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
      setFormState(defaultHostDemoDraftState);
      setSelectedGuestPack(null);
      return;
    }

    if (storedDraft) {
      setFormState(storedDraft);
      setSelectedGuestPack(null);
      return;
    }

    setSelectedGuestPack(null);
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

  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-background px-md py-xl text-text-primary">
        <Shell width="lg" className="flex flex-col gap-lg">
          <SurfaceCard className="min-h-[12rem]">
            <div />
          </SurfaceCard>
        </Shell>
      </main>
    );
  }

  if (mode === "edit" && !event) {
    return (
      <main className="min-h-screen bg-background px-md py-xl text-text-primary">
        <Shell width="lg" className="flex flex-col gap-lg">
          <SurfaceCard className="space-y-md">
            <Heading level={2}>{t("missingEventTitle")}</Heading>
            <Text tone="muted">{t("missingEventBody")}</Text>
            <Button onClick={() => router.push(buildHostDemoListPath(locale))}>{t("backToEvents")}</Button>
          </SurfaceCard>
        </Shell>
      </main>
    );
  }

  if (mode === "edit" && event && !canEditEvent) {
    return (
      <main className="min-h-screen bg-background px-md py-xl text-text-primary">
        <Shell width="lg" className="flex flex-col gap-lg">
          <SurfaceCard className="space-y-md">
            <div className="flex justify-end">{renderCloseButton()}</div>
            <Heading level={2}>{t("lockedEventTitle")}</Heading>
            <Text tone="muted">{t("lockedEventBody")}</Text>
          </SurfaceCard>
        </Shell>
      </main>
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
    router.push(buildHostDemoListPath(locale));
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
          window.location.href = buildHostDemoListPath(locale);
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
        data-testid="host-demo-close"
      >
        x
      </button>
    );
  }

  function renderMissionsEditor() {
    return (
      <>
        <div className="space-y-sm">
          {formState.missions.map((mission, index) => (
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
              className="rounded-2xl border border-[#eadfce] bg-surface-muted p-md"
              data-testid={`host-demo-mission-${index + 1}`}
            >
              <div className="mb-sm flex items-center justify-between gap-sm">
                <Text as="p" variant="labelSm" tone="muted">
                  {t("momentNumber", { current: index + 1 })}
                </Text>
                <button
                  type="button"
                  disabled={formState.missions.length <= 3}
                  onClick={() => removeMission(index)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-text-secondary transition hover:bg-surface hover:text-text-primary disabled:opacity-40"
                >
                  x
                </button>
              </div>
              <input
                value={mission.prompt}
                onChange={(eventInput) => updateMission(index, eventInput.target.value)}
                data-testid={`host-demo-mission-input-${index + 1}`}
                className="w-full rounded-xl border border-[#d7c7b8] bg-surface px-md py-md text-sm text-text-primary"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-sm">
          <Button variant="outlined" onClick={addMission} disabled={formState.missions.length >= 10} className="gap-sm">
            <PlusIcon />
            {t("addMoment")}
          </Button>
          <Text tone="muted">{t("momentsLimitDrag")}</Text>
        </div>
      </>
    );
  }

  function renderSettingsFields() {
    return (
      <>
        <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
          <div className="space-y-sm">
            <Text as="label" variant="labelMd">
              {t("startLabel")}
            </Text>
            <input
              type="datetime-local"
              value={formState.startAt}
              onChange={(eventInput) => updateDraft({ startAt: eventInput.target.value })}
              data-testid="host-demo-start-at"
              className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-sm text-text-primary"
            />
          </div>
          <div className="space-y-sm">
            <Text as="label" variant="labelMd">
              {t("endLabel")}
            </Text>
            <input
              type="datetime-local"
              value={formState.endAt}
              onChange={(eventInput) => updateDraft({ endAt: eventInput.target.value })}
              data-testid="host-demo-end-at"
              className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-sm text-text-primary"
            />
          </div>
        </div>

        <div className="space-y-sm">
          <Text variant="labelMd">{t("revealLabel")}</Text>
          <div className="grid gap-sm sm:grid-cols-3">
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
                className={`rounded-2xl border px-md py-md text-start ${
                  formState.revealMode === value ? "border-[#d79f87] bg-[#fff2e9]" : "border-[#eadfce] bg-surface-muted"
                }`}
              >
                <Text as="span" variant="labelMd">
                  {label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        {formState.revealMode === "delayed" ? (
          <div className="space-y-sm">
            <Text as="label" variant="labelMd">
              {t("delayLabel")}
            </Text>
            <input
              type="number"
              min={1}
              value={formState.revealDelayHours}
              onChange={(eventInput) => updateDraft({ revealDelayHours: Number(eventInput.target.value || 0) })}
              data-testid="host-demo-delay-hours"
              className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-sm text-text-primary sm:max-w-[12rem]"
            />
          </div>
        ) : null}

        <label className="flex items-center gap-sm rounded-2xl border border-[#eadfce] bg-surface-muted px-md py-md">
          <input
            type="checkbox"
            checked={formState.allowGuestGalleryView}
            onChange={(eventInput) => updateDraft({ allowGuestGalleryView: eventInput.target.checked })}
          />
          <Text>{t("galleryToggle")}</Text>
        </label>
      </>
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
      <div className="space-y-md rounded-2xl border border-[#eadfce] bg-[#fff8f0] p-lg">
        <div className="space-y-xs">
          <Text as="p" variant="labelMd">
            {t("guestInvited.label")}
          </Text>
          <Text tone="muted">
            {t("guestInvited.helperWithCounts", {
              invited: event?.invitedGuestCount ?? 0,
              limit: currentGuestLimit
            })}
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setSelectedGuestPack(option.value);
                updateDraft({ guestCapacityLimit: option.value, eventTier: option.tier });
              }}
              className={`rounded-2xl border px-md py-md text-left ${
                selectedGuestPack === option.value ? "border-[#d79f87] bg-[#fff2e9]" : "border-[#eadfce] bg-surface"
              }`}
            >
              <Text as="p" variant="labelMd">
                {option.label}
              </Text>
              <Text tone="muted">{option.note}</Text>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function renderDeleteModal() {
    if (!deleteVisible) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,24,18,0.45)] px-md">
        <div className="w-full max-w-md rounded-[1.75rem] bg-white p-lg shadow-[0_24px_80px_rgba(48,31,19,0.28)]">
          <div className="flex justify-end">
            <button type="button" onClick={() => setDeleteVisible(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-lg">
              x
            </button>
          </div>
          <div className="space-y-md text-center">
            <Heading level={3}>{t("deleteModal.title")}</Heading>
            <Text tone="muted">{t("deleteModal.body")}</Text>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  if (eventId) {
                    deleteEvent(eventId);
                    clearDraft(draftKey);
                  }
                  window.location.href = buildHostDemoListPath(locale);
                }}
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,24,18,0.45)] px-md">
        <div className="w-full max-w-lg rounded-[1.75rem] bg-white p-lg shadow-[0_24px_80px_rgba(48,31,19,0.28)]">
          <div className="flex justify-end">
            <button type="button" onClick={() => setPaywallVisible(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-lg">
              x
            </button>
          </div>
          <div className="space-y-md">
            <Heading level={3}>{t("paywall.title")}</Heading>
            <Text tone="muted">{t("paywall.body")}</Text>
            <div className="grid grid-cols-1 gap-sm">
              <div className="rounded-2xl border border-[#eadfce] bg-surface-muted p-md">{t("paywall.optionTen")}</div>
              <div className="rounded-2xl border border-[#eadfce] bg-surface-muted p-md">{t("paywall.optionTwentyFive")}</div>
              <div className="rounded-2xl border border-[#eadfce] bg-surface-muted p-md">{t("paywall.optionFifty")}</div>
              <div className="rounded-2xl border border-[#eadfce] bg-surface-muted p-md">{t("paywall.optionHundred")}</div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setPaywallVisible(false);
                  if (eventId) {
                    updateEvent(eventId, formState);
                    clearDraft(draftKey);
                  }
                  window.location.href = buildHostDemoListPath(locale);
                }}
              >
                {t("paywall.confirm")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "edit" && event) {
    return (
      <>
        <main className="min-h-screen bg-background px-md py-xl text-text-primary" data-testid="host-demo-editor-edit">
          <Shell width="lg" className="flex flex-col gap-lg">
            <SurfaceCard className="space-y-lg">
              <div className="flex justify-end">{renderCloseButton()}</div>

              <label className="block cursor-pointer overflow-hidden rounded-[1.75rem] border border-dashed border-[#d7c4b3] bg-[#fff8f0]">
                <img src={formState.imageUrl} alt={t("imagePreviewAlt")} className="aspect-[4/3] w-full object-cover" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                  data-testid="host-demo-image-input"
                />
              </label>

              {renderGuestInvitedOptions()}

              <div className="space-y-sm">
                <Text as="label" variant="labelMd">
                  {t("eventTitleLabel")}
                </Text>
                <input
                  value={formState.title}
                  onChange={(eventInput) => updateDraft({ title: eventInput.target.value })}
                  data-testid="host-demo-title-input"
                  className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-base font-semibold text-text-primary"
                />
              </div>

              {renderMissionsEditor()}
              {momentsError ? <Text tone="error">{momentsError}</Text> : null}
              {renderSettingsFields()}
              {scheduleError ? <Text tone="error">{scheduleError}</Text> : null}

              <div className="flex justify-end">
                <Button onClick={handleEditSubmit} data-testid="host-demo-final-submit">
                  {hasChanges ? t("updateEvent") : t("deleteEvent")}
                </Button>
              </div>
            </SurfaceCard>
          </Shell>
        </main>
        {renderDeleteModal()}
        {renderPaywallModal()}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary" data-testid={`host-demo-editor-${mode}`}>
      <Shell width="lg" className="flex flex-col gap-lg">
        {formState.currentStep === 0 ? (
          <SurfaceCard className="space-y-lg">
            <div className="flex justify-end">{renderCloseButton()}</div>
            <label className="block cursor-pointer overflow-hidden rounded-[1.75rem] border border-dashed border-[#d7c4b3] bg-[#fff8f0]">
              {formState.imageUrl ? (
                <img src={formState.imageUrl} alt={t("imagePreviewAlt")} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center px-lg text-center">
                  <Text tone="muted">{t("imagePlaceholder")}</Text>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
                data-testid="host-demo-image-input"
              />
            </label>

            <div className="space-y-sm">
              <textarea
                value={formState.hostPrompt}
                onChange={(eventInput) => updateDraft({ hostPrompt: eventInput.target.value })}
                rows={5}
                data-testid="host-demo-prompt-input"
                className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-sm text-text-primary"
                placeholder={t("promptPlaceholder")}
              />
              <div className="flex flex-wrap gap-sm">
                {hostPromptExamples.map((example, index) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => updateDraft({ hostPrompt: example })}
                    data-testid={`host-demo-prompt-example-${index + 1}`}
                    className={`rounded-2xl border border-dashed px-md py-sm text-left text-sm transition ${
                      formState.hostPrompt === example
                        ? "border-[#d79f87] bg-[#fff2e9] text-text-primary"
                        : "border-[#d7c7b8] bg-[#fff7ef] text-text-secondary hover:border-[#c79f84] hover:text-text-primary"
                    }`}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            {basicsError ? <Text tone="error">{basicsError}</Text> : null}

            <div className="flex justify-end">
              <Button onClick={handleGenerateIdeas} data-testid="host-demo-generate-ideas">
                {t("generateIdeas")}
              </Button>
            </div>
          </SurfaceCard>
        ) : null}

        {formState.currentStep === 1 ? (
          <SurfaceCard className="space-y-lg">
            <div className="flex justify-end">{renderCloseButton()}</div>
            <div className="space-y-sm">
              <input
                value={formState.title}
                onChange={(eventInput) => updateDraft({ title: eventInput.target.value })}
                data-testid="host-demo-title-input"
                className="w-full rounded-2xl border border-[#d7c7b8] bg-surface px-md py-md text-base font-semibold text-text-primary"
                placeholder={t("eventTitleLabel")}
              />
            </div>
            {renderMissionsEditor()}
            {momentsError ? <Text tone="error">{momentsError}</Text> : null}
            <div className="flex justify-end">
              <Button onClick={handleSaveMoments} data-testid="host-demo-save-moments">
                {t("saveMoments")}
              </Button>
            </div>
          </SurfaceCard>
        ) : null}

        {formState.currentStep === 2 ? (
          <SurfaceCard className="space-y-lg">
            <div className="flex justify-end">{renderCloseButton()}</div>
            {renderSettingsFields()}
            {scheduleError ? <Text tone="error">{scheduleError}</Text> : null}
            <div className="flex justify-end">
              <Button onClick={handleCreateSubmit} data-testid="host-demo-final-submit">
                {t("createEvent")}
              </Button>
            </div>
          </SurfaceCard>
        ) : null}
      </Shell>
    </main>
  );
}
