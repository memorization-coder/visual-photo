import type { Event, Mission, Participant } from "@visual-photo/contracts";

export type DemoSeedMemory = {
  id: string;
  missionId: string;
  participantId: string;
  participantName: string;
  thumbnailUrl: string;
  mainsizeUrl: string;
  width?: number;
  height?: number;
  createdAt: string;
  loveCount: number;
};

export const demoEventSlug = "demo";
export const demoEventId = "550e8400-e29b-41d4-a716-446655440100";
export const demoParticipantId = "550e8400-e29b-41d4-a716-446655440101";
export const demoEventDescription = "A relaxed baby birthday with close friends and family.";

export const demoEvent: Event = {
  id: demoEventId,
  hostUserId: "550e8400-e29b-41d4-a716-446655440102",
  title: "Little Moments Together",
  status: "published",
  qrSlug: demoEventSlug,
  createdAt: "2026-05-22T00:00:00.000Z",
  updatedAt: "2026-05-22T00:00:00.000Z"
};

export const demoParticipant: Participant = {
  id: demoParticipantId,
  eventId: demoEventId,
  userId: "550e8400-e29b-41d4-a716-446655440103",
  role: "participant",
  displayName: "You",
  joinedAt: "2026-05-22T00:00:00.000Z",
  createdAt: "2026-05-22T00:00:00.000Z",
  updatedAt: "2026-05-22T00:00:00.000Z"
};

export const demoMissions: Mission[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440110",
    eventId: demoEventId,
    missionOrder: 0,
    prompt: "A tiny detail people may forget later",
    category: "detail",
    captureHint: "Look for something small that carries the day.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440111",
    eventId: demoEventId,
    missionOrder: 1,
    prompt: "A moment that feels like laughter",
    category: "joy",
    captureHint: "Catch a split second that feels alive.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440112",
    eventId: demoEventId,
    missionOrder: 2,
    prompt: "Someone making the baby feel loved",
    category: "care",
    captureHint: "Focus on tenderness instead of posing.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440113",
    eventId: demoEventId,
    missionOrder: 3,
    prompt: "Something the host might miss",
    category: "surprise",
    captureHint: "Look behind the main moment.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440114",
    eventId: demoEventId,
    missionOrder: 4,
    prompt: "The birthday from a guest's point of view",
    category: "perspective",
    captureHint: "Show what the day feels like from where you stand.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440115",
    eventId: demoEventId,
    missionOrder: 5,
    prompt: "A quiet happy moment",
    category: "quiet",
    captureHint: "Find calm instead of spectacle.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  }
];

export const demoSeedMemories: DemoSeedMemory[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440120",
    missionId: demoMissions[1].id,
    participantId: "550e8400-e29b-41d4-a716-446655440130",
    participantName: "Ava",
    thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    width: 1200,
    height: 1600,
    createdAt: "2026-05-22T09:00:00.000Z",
    loveCount: 4
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440121",
    missionId: demoMissions[2].id,
    participantId: "550e8400-e29b-41d4-a716-446655440131",
    participantName: "Noah",
    thumbnailUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1600&q=80",
    width: 1500,
    height: 1125,
    createdAt: "2026-05-22T08:15:00.000Z",
    loveCount: 7
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440122",
    missionId: demoMissions[5].id,
    participantId: "550e8400-e29b-41d4-a716-446655440132",
    participantName: "Mia",
    thumbnailUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
    width: 1300,
    height: 1300,
    createdAt: "2026-05-22T07:30:00.000Z",
    loveCount: 2
  }
];
