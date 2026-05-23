import type { HostDemoDraftState, HostDemoEvent } from "./hostDemoTypes";

export const hostPromptExamples = [
  "This is my baby's first birthday. Help guests capture warm, funny little moments.",
  "This is a relaxed wedding dinner. Give guests photo ideas that feel emotional and candid.",
  "This is a company celebration. Create prompts that capture team spirit and fun interactions."
];

export const defaultCreateImageUrl =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";

export const hostDemoSeedEvents: HostDemoEvent[] = [
  {
    id: "host-demo-seed-birthday",
    role: "hosting",
    title: "Harbour Birthday Brunch",
    hostPrompt: "A bright first birthday brunch by the harbour. Capture family warmth, cake-table details, and playful moments around the birthday girl.",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
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
      { id: "seed-birthday-1", prompt: "The birthday cake or table styling before everyone gathers", aiGenerated: true },
      { id: "seed-birthday-2", prompt: "Someone making the birthday girl laugh", aiGenerated: true },
      { id: "seed-birthday-3", prompt: "A family photo that feels warm rather than posed", aiGenerated: true },
      { id: "seed-birthday-4", prompt: "A small party detail the host may miss while busy", aiGenerated: true },
      { id: "seed-birthday-5", prompt: "A quiet cuddle or proud-parent moment", aiGenerated: true }
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
      { id: "seed-wedding-1", prompt: "A glance that feels unposed", aiGenerated: true },
      { id: "seed-wedding-2", prompt: "Hands, place cards, or details worth remembering", aiGenerated: true },
      { id: "seed-wedding-3", prompt: "A table moment full of warmth", aiGenerated: true },
      { id: "seed-wedding-4", prompt: "Something joyful beyond the main couple", aiGenerated: true },
      { id: "seed-wedding-5", prompt: "A quiet frame that feels cinematic", aiGenerated: true }
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
  }
];

export const defaultHostDemoDraftState: HostDemoDraftState = {
  title: "",
  hostPrompt: hostPromptExamples[0],
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
