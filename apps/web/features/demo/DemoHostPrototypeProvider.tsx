"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultHostDemoDraftState, hostDemoSeedEvents } from "./hostDemoData";
import { applyDraftToEvent, createDraftFromEvent, createEventFromDraft } from "./hostDemoLogic";
import type { HostDemoDraftState, HostDemoEvent } from "./hostDemoTypes";

const STORAGE_KEY = "visual-photo-host-demo-state";
const STORAGE_VERSION = 2;

type StoredState = {
  version: number;
  events: HostDemoEvent[];
  drafts: Record<string, HostDemoDraftState>;
};

type DemoHostPrototypeContextValue = {
  events: HostDemoEvent[];
  isHydrated: boolean;
  getEvent: (eventId: string) => HostDemoEvent | undefined;
  getDraft: (draftKey: string) => HostDemoDraftState | undefined;
  initializeDraft: (draftKey: string, eventId?: string) => HostDemoDraftState;
  saveDraft: (draftKey: string, draft: HostDemoDraftState) => void;
  clearDraft: (draftKey: string) => void;
  createEvent: (draft: HostDemoDraftState) => HostDemoEvent;
  updateEvent: (eventId: string, draft: HostDemoDraftState) => HostDemoEvent | undefined;
  deleteEvent: (eventId: string) => void;
};

const DemoHostPrototypeContext = createContext<DemoHostPrototypeContextValue | null>(null);

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as StoredState;
    if (parsed.version !== STORAGE_VERSION) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function DemoHostPrototypeProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<HostDemoEvent[]>(hostDemoSeedEvents);
  const [drafts, setDrafts] = useState<Record<string, HostDemoDraftState>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredState();

    if (stored) {
      setEvents(Array.isArray(stored.events) && stored.events.length > 0 ? stored.events : hostDemoSeedEvents);
      setDrafts(stored.drafts ?? {});
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, events, drafts }));
    } catch {
      // Best-effort persistence only for the prototype session.
    }
  }, [drafts, events, isHydrated]);

  const value = useMemo<DemoHostPrototypeContextValue>(
    () => ({
      events,
      isHydrated,
      getEvent: (eventId) => events.find((event) => event.id === eventId),
      getDraft: (draftKey) => drafts[draftKey],
      initializeDraft: (draftKey, eventId) => {
        const existingDraft = drafts[draftKey];
        if (existingDraft) {
          return existingDraft;
        }

        if (eventId) {
          const event = events.find((item) => item.id === eventId);
          if (event) {
            const eventDraft = createDraftFromEvent(event);
            setDrafts((current) => ({ ...current, [draftKey]: eventDraft }));
            return eventDraft;
          }
        }

        setDrafts((current) => ({ ...current, [draftKey]: defaultHostDemoDraftState }));
        return defaultHostDemoDraftState;
      },
      saveDraft: (draftKey, draft) => {
        setDrafts((current) => ({
          ...current,
          [draftKey]: draft
        }));
      },
      clearDraft: (draftKey) => {
        setDrafts((current) => {
          const next = { ...current };
          delete next[draftKey];
          return next;
        });
      },
      createEvent: (draft) => {
        const event = createEventFromDraft(draft);
        setEvents((current) => [event, ...current]);
        return event;
      },
      updateEvent: (eventId, draft) => {
        let updatedEvent: HostDemoEvent | undefined;

        setEvents((current) =>
          current.map((event) => {
            if (event.id !== eventId) {
              return event;
            }

            updatedEvent = applyDraftToEvent(event, draft);
            return updatedEvent;
          })
        );

        return updatedEvent;
      },
      deleteEvent: (eventId) => {
        setEvents((current) => current.filter((event) => event.id !== eventId));
      }
    }),
    [drafts, events, isHydrated]
  );

  return <DemoHostPrototypeContext.Provider value={value}>{children}</DemoHostPrototypeContext.Provider>;
}

export function useDemoHostPrototype() {
  const context = useContext(DemoHostPrototypeContext);

  if (!context) {
    throw new Error("DemoHostPrototypeProvider is missing.");
  }

  return context;
}
