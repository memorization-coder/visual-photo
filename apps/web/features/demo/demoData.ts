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
export const demoEventDescription = "A relaxed golden-hour wedding feast with long tables, warm laughter, and close family moments.";

export const demoEvent: Event = {
  id: demoEventId,
  hostUserId: "550e8400-e29b-41d4-a716-446655440102",
  title: "Golden Hour Wedding Feast",
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
    prompt: "Someone laughing naturally",
    category: "joy",
    captureHint: "Catch a laugh that feels effortless and real.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440111",
    eventId: demoEventId,
    missionOrder: 1,
    prompt: "A moment that feels like family",
    category: "connection",
    captureHint: "Look for warmth between people instead of posed smiles.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440112",
    eventId: demoEventId,
    missionOrder: 2,
    prompt: "A detail the hosts worked hard on",
    category: "detail",
    captureHint: "Notice the styling, setup, or small touches others may overlook.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440113",
    eventId: demoEventId,
    missionOrder: 3,
    prompt: "Someone dancing like nobody's watching",
    category: "energy",
    captureHint: "Find a movement-filled frame that feels playful and unfiltered.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440114",
    eventId: demoEventId,
    missionOrder: 4,
    prompt: "A happy reaction during the event",
    category: "reaction",
    captureHint: "Focus on a genuine response in the middle of the celebration.",
    isActive: true,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  }
];

export const demoSeedMemories: DemoSeedMemory[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440120",
    missionId: demoMissions[0].id,
    participantId: "550e8400-e29b-41d4-a716-446655440130",
    participantName: "Ava",
    thumbnailUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
    width: 1500,
    height: 1000,
    createdAt: "2026-05-22T09:00:00.000Z",
    loveCount: 4
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440121",
    missionId: demoMissions[1].id,
    participantId: "550e8400-e29b-41d4-a716-446655440131",
    participantName: "Noah",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    width: 1500,
    height: 1125,
    createdAt: "2026-05-22T08:15:00.000Z",
    loveCount: 7
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440122",
    missionId: demoMissions[2].id,
    participantId: "550e8400-e29b-41d4-a716-446655440132",
    participantName: "Mia",
    thumbnailUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80",
    width: 1500,
    height: 1000,
    createdAt: "2026-05-22T07:30:00.000Z",
    loveCount: 2
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440123",
    missionId: demoMissions[3].id,
    participantId: "550e8400-e29b-41d4-a716-446655440133",
    participantName: "Leo",
    thumbnailUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80",
    width: 1200,
    height: 1600,
    createdAt: "2026-05-22T07:10:00.000Z",
    loveCount: 5
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440124",
    missionId: demoMissions[4].id,
    participantId: "550e8400-e29b-41d4-a716-446655440134",
    participantName: "Grace",
    thumbnailUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
    mainsizeUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80",
    width: 1500,
    height: 1000,
    createdAt: "2026-05-22T06:55:00.000Z",
    loveCount: 6
  }
];
