import type { HostDemoDraftState, HostDemoEvent } from "./hostDemoTypes";

export const hostPromptExamples = [
  "This is my baby's first birthday. Help guests capture warm, funny little moments.",
  "This is a relaxed wedding dinner. Give guests photo ideas that feel emotional and candid.",
  "This is a company celebration. Create prompts that capture team spirit and fun interactions."
];

export const defaultCreateImageUrl =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

export const hostDemoSeedEvents: HostDemoEvent[] = [
  {
    id: "host-demo-seed-birthday",
    role: "hosting",
    title: "Golden Hour Wedding Feast",
    hostPrompt: "A relaxed golden-hour wedding feast with long tables, warm laughter, family hugs, and small styling details that make the evening feel personal.",
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Mia", "Jordan", "Ava", "Leo", "Nina", "Sam"],
    invitedGuestCount: 4,
    startAt: "2026-05-20T09:00",
    endAt: "2026-05-30T21:00",
    revealMode: "during",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 15,
    eventTier: "small",
    missions: [
      { id: "seed-wedding-current-1", prompt: "Someone laughing naturally", aiGenerated: true },
      { id: "seed-anniversary-2", prompt: "A moment that feels like family", aiGenerated: true },
      { id: "seed-anniversary-3", prompt: "A detail the hosts worked hard on", aiGenerated: true },
      { id: "seed-wedding-current-4", prompt: "Someone dancing like nobody’s watching", aiGenerated: true },
      { id: "seed-wedding-current-5", prompt: "A happy reaction during the event", aiGenerated: true }
    ],
    createdAt: "2026-05-20T09:00:00.000Z",
    updatedAt: "2026-05-20T09:00:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-seed-wedding",
    role: "hosting",
    title: "Candlelight Wedding Dinner",
    hostPrompt: hostPromptExamples[1],
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Ethan", "Luca", "Grace", "Sophie", "Noah", "Ivy"],
    invitedGuestCount: 5,
    startAt: "2026-07-02T18:30",
    endAt: "2026-07-02T23:00",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 5,
    eventTier: "free",
    missions: [
      { id: "seed-wedding-1", prompt: "Someone laughing naturally", aiGenerated: true },
      { id: "seed-wedding-2", prompt: "A moment that feels like family", aiGenerated: true },
      { id: "seed-wedding-3", prompt: "A detail the hosts worked hard on", aiGenerated: true },
      { id: "seed-wedding-4", prompt: "Someone dancing like nobody’s watching", aiGenerated: true },
      { id: "seed-wedding-5", prompt: "A happy reaction during the event", aiGenerated: true }
    ],
    createdAt: "2026-05-19T07:30:00.000Z",
    updatedAt: "2026-05-19T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-seed-office",
    role: "hosting",
    title: "Team Energy After Hours",
    hostPrompt: hostPromptExamples[2],
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Alex", "Priya", "Ben", "Maya", "Chris", "Talia"],
    invitedGuestCount: 18,
    startAt: "2026-04-12T17:00",
    endAt: "2026-04-12T21:00",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 30,
    eventTier: "medium",
    missions: [
      { id: "seed-office-1", prompt: "A photo that shows the group relaxing together", aiGenerated: true },
      { id: "seed-office-2", prompt: "A playful interaction between teammates", aiGenerated: true },
      { id: "seed-office-3", prompt: "A detail that says shared celebration", aiGenerated: true },
      { id: "seed-office-4", prompt: "Someone cheering on a teammate", aiGenerated: true },
      { id: "seed-office-5", prompt: "A frame that captures the room's momentum", aiGenerated: true }
    ],
    createdAt: "2026-04-01T07:30:00.000Z",
    updatedAt: "2026-04-01T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-seed-engagement",
    role: "hosting",
    title: "Garden Engagement Lunch",
    hostPrompt: "An outdoor engagement lunch with soft florals, relaxed laughter, and moments that feel intimate rather than staged.",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Ella", "James", "Ruby", "Oliver", "Skye", "Mason"],
    invitedGuestCount: 5,
    startAt: "2026-09-12T12:00",
    endAt: "2026-09-12T16:30",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 5,
    eventTier: "free",
    missions: [
      { id: "seed-engagement-1", prompt: "A candid laugh between the couple before everyone notices", aiGenerated: true },
      { id: "seed-engagement-2", prompt: "A floral or table detail that sets the mood", aiGenerated: true },
      { id: "seed-engagement-3", prompt: "Someone reacting warmly during a toast or speech", aiGenerated: true },
      { id: "seed-engagement-4", prompt: "A photo that makes the garden setting feel calm and special", aiGenerated: true },
      { id: "seed-engagement-5", prompt: "A quiet in-between frame that feels personal", aiGenerated: true }
    ],
    createdAt: "2026-05-21T07:30:00.000Z",
    updatedAt: "2026-05-21T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-participating-picnic",
    role: "participating",
    title: "Golden Hour Picnic",
    hostPrompt: "A relaxed picnic near sunset with shared snacks, blankets, and candid moments between friends.",
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Ruby", "Theo", "Mila", "Oscar"],
    invitedGuestCount: 5,
    startAt: "2026-05-20T10:00",
    endAt: "2026-05-30T20:00",
    revealMode: "during",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 15,
    eventTier: "small",
    missions: [
      { id: "seed-picnic-1", prompt: "A candid moment around the picnic blanket", aiGenerated: true },
      { id: "seed-picnic-2", prompt: "A food, drink, or table detail that feels summery", aiGenerated: true },
      { id: "seed-picnic-3", prompt: "A photo that catches the golden light on people", aiGenerated: true }
    ],
    createdAt: "2026-05-18T07:30:00.000Z",
    updatedAt: "2026-05-18T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-participating-ceremony",
    role: "participating",
    title: "Rooftop Ceremony",
    hostPrompt: "A simple evening ceremony with intimate views and emotional moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Chloe", "Finn", "Elena", "Arlo"],
    invitedGuestCount: 12,
    startAt: "2026-08-08T16:00",
    endAt: "2026-08-08T22:00",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 15,
    eventTier: "small",
    missions: [
      { id: "seed-ceremony-1", prompt: "A frame that shows the skyline and people", aiGenerated: true },
      { id: "seed-ceremony-2", prompt: "A candid reaction during the ceremony", aiGenerated: true },
      { id: "seed-ceremony-3", prompt: "A detail that feels elegant but effortless", aiGenerated: true }
    ],
    createdAt: "2026-05-10T07:30:00.000Z",
    updatedAt: "2026-05-10T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-participating-dinner",
    role: "participating",
    title: "Sunday Family Dinner",
    hostPrompt: "Capture easy, affectionate moments from a cozy family dinner.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Nora", "Jack", "Evie", "Mason"],
    invitedGuestCount: 5,
    startAt: "2026-03-03T17:30",
    endAt: "2026-03-03T21:00",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 5,
    eventTier: "free",
    missions: [
      { id: "seed-dinner-1", prompt: "Something warm happening at the table", aiGenerated: true },
      { id: "seed-dinner-2", prompt: "A detail that feels familiar and personal", aiGenerated: true },
      { id: "seed-dinner-3", prompt: "Someone laughing without noticing the camera", aiGenerated: true }
    ],
    createdAt: "2026-02-28T07:30:00.000Z",
    updatedAt: "2026-02-28T07:30:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-participating-market",
    role: "participating",
    title: "Night Market Birthday",
    hostPrompt: "A lively birthday evening at a night market with food, lights, and energetic candid moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=1200&q=80",
    participantPreviewNames: ["Sienna", "Kai", "Liam", "Zoe"],
    invitedGuestCount: 8,
    startAt: "2026-10-03T18:00",
    endAt: "2026-10-03T22:30",
    revealMode: "during",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 15,
    eventTier: "small",
    missions: [
      { id: "seed-market-1", prompt: "A moment that captures the lights and movement of the market", aiGenerated: true },
      { id: "seed-market-2", prompt: "A food stall detail that feels colourful and fun", aiGenerated: true },
      { id: "seed-market-3", prompt: "Friends reacting to something unexpected or funny", aiGenerated: true }
    ],
    createdAt: "2026-05-11T07:30:00.000Z",
    updatedAt: "2026-05-11T07:30:00.000Z",
    isSeeded: true
  }
];

export const defaultHostDemoDraftState: HostDemoDraftState = {
  title: "",
  hostPrompt: hostPromptExamples[1],
  imageUrl: defaultCreateImageUrl,
  startAt: "",
  endAt: "",
  revealMode: "during",
  revealDelayHours: 12,
  allowGuestGalleryView: true,
  guestCapacityLimit: 5,
  eventTier: "free",
  missions: [],
  currentStep: 0
};
