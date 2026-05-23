import type { HostDemoDraftState, HostDemoEvent, HostDemoMission, HostDemoTier } from "./hostDemoTypes";

const FREE_CAPACITY_LIMIT = 10;

function slugPart(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function buildMission(idPrefix: string, prompt: string, index: number): HostDemoMission {
  return {
    id: `${idPrefix}-mission-${index + 1}`,
    prompt,
    aiGenerated: true
  };
}

export function generateHostDemoIdeas(hostPrompt: string): Pick<HostDemoDraftState, "title" | "missions"> {
  const prompt = hostPrompt.trim();
  const promptLower = prompt.toLowerCase();
  const idPrefix = slugPart(prompt) || "host-demo";

  if (promptLower.includes("birthday")) {
    return {
      title: "Little Moments Together",
      missions: [
        "A tiny detail people may forget later",
        "A moment that feels like laughter",
        "Someone making the guest of honor feel loved",
        "Something the host might miss while busy",
        "A calm photo that still feels full of joy"
      ].map((mission, index) => buildMission(idPrefix, mission, index))
    };
  }

  if (promptLower.includes("wedding")) {
    return {
      title: "Candlelight Wedding Dinner",
      missions: [
        "Someone laughing naturally",
        "A moment that feels like family",
        "A detail the hosts worked hard on",
        "Someone dancing like nobody’s watching",
        "A happy reaction during the event"
      ].map((mission, index) => buildMission(idPrefix, mission, index))
    };
  }

  if (promptLower.includes("company") || promptLower.includes("team")) {
    return {
      title: "Team Energy After Hours",
      missions: [
        "A photo that shows the group relaxing together",
        "An interaction that feels playful or spontaneous",
        "A detail that says this was a shared celebration",
        "Someone cheering on a teammate or colleague",
        "A shot that captures the room's momentum"
      ].map((mission, index) => buildMission(idPrefix, mission, index))
    };
  }

  return {
    title: "Shared Moments Worth Keeping",
    missions: [
      "A small visual detail that sets the scene",
      "A candid reaction full of energy or emotion",
      "A connection between two people",
      "Something the host is too busy to notice",
      "A closing photo that feels memorable"
    ].map((mission, index) => buildMission(idPrefix, mission, index))
  };
}

export function isPaidSelection(params: { guestCapacityLimit: number; eventTier: HostDemoTier }): boolean {
  return params.eventTier !== "free" || params.guestCapacityLimit > FREE_CAPACITY_LIMIT;
}

export function validateSchedule(params: { startAt: string; endAt: string }): string | null {
  if (!params.startAt || !params.endAt) {
    return "missing";
  }

  const start = new Date(params.startAt);
  const end = new Date(params.endAt);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "missing";
  }

  if (end <= start) {
    return "invalid_order";
  }

  return null;
}

export function createDraftFromEvent(event: HostDemoEvent): HostDemoDraftState {
  return {
    title: event.title,
    hostPrompt: event.hostPrompt,
    imageUrl: event.imageUrl,
    startAt: event.startAt,
    endAt: event.endAt,
    revealMode: event.revealMode,
    revealDelayHours: event.revealDelayHours,
    allowGuestGalleryView: event.allowGuestGalleryView,
    guestCapacityLimit: event.guestCapacityLimit,
    eventTier: event.eventTier,
    missions: event.missions,
    currentStep: 0
  };
}

export function createEventFromDraft(draft: HostDemoDraftState): HostDemoEvent {
  const idBase = slugPart(draft.title || draft.hostPrompt || "host-demo");
  const timestamp = Date.now();
  const now = new Date(timestamp).toISOString();

  return {
    id: `${idBase}-${timestamp}`,
    role: "hosting",
    title: draft.title.trim(),
    hostPrompt: draft.hostPrompt.trim(),
    imageUrl: draft.imageUrl,
    participantPreviewNames: ["You", "Guest One", "Guest Two", "Guest Three", "Guest Four", "Guest Five"],
    invitedGuestCount: 0,
    startAt: draft.startAt,
    endAt: draft.endAt,
    revealMode: draft.revealMode,
    revealDelayHours: draft.revealDelayHours,
    allowGuestGalleryView: draft.allowGuestGalleryView,
    guestCapacityLimit: draft.guestCapacityLimit,
    eventTier: draft.eventTier,
    missions: draft.missions.map((mission, index) => ({
      ...mission,
      id: `${idBase}-mission-${index + 1}`
    })),
    createdAt: now,
    updatedAt: now,
    isSeeded: false
  };
}

export function getHostDemoEventTimingState(
  event: Pick<HostDemoEvent, "startAt" | "endAt">,
  now = new Date()
): "current" | "future" | "past" {
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "future";
  }

  if (end < now) {
    return "past";
  }

  if (start > now) {
    return "future";
  }

  return "current";
}

export function applyDraftToEvent(event: HostDemoEvent, draft: HostDemoDraftState): HostDemoEvent {
  return {
    ...event,
    title: draft.title.trim(),
    hostPrompt: draft.hostPrompt.trim(),
    imageUrl: draft.imageUrl,
    startAt: draft.startAt,
    endAt: draft.endAt,
    revealMode: draft.revealMode,
    revealDelayHours: draft.revealDelayHours,
    allowGuestGalleryView: draft.allowGuestGalleryView,
    guestCapacityLimit: draft.guestCapacityLimit,
    eventTier: draft.eventTier,
    missions: draft.missions.map((mission, index) => ({
      ...mission,
      id: mission.id || `${event.id}-mission-${index + 1}`
    })),
    updatedAt: new Date().toISOString()
  };
}

export function formatHostDemoDate(dateTime: string): string {
  const parsed = new Date(dateTime);

  if (Number.isNaN(parsed.getTime())) {
    return dateTime;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(parsed);
}
