export type HostDemoRevealMode = "during" | "after" | "delayed";

export type HostDemoTier = "free" | "small" | "medium" | "unlimited";
export type HostDemoRole = "hosting" | "participating";

export type HostDemoMission = {
  id: string;
  prompt: string;
  aiGenerated: boolean;
};

export type HostDemoEvent = {
  id: string;
  role: HostDemoRole;
  title: string;
  hostPrompt: string;
  imageUrl: string;
  participantPreviewNames: string[];
  invitedGuestCount: number;
  endAt: string;
  startAt: string;
  revealMode: HostDemoRevealMode;
  revealDelayHours: number;
  allowGuestGalleryView: boolean;
  guestCapacityLimit: number;
  eventTier: HostDemoTier;
  missions: HostDemoMission[];
  createdAt: string;
  updatedAt: string;
  isSeeded: boolean;
};

export type HostDemoDraftState = {
  title: string;
  hostPrompt: string;
  imageUrl: string;
  startAt: string;
  endAt: string;
  revealMode: HostDemoRevealMode;
  revealDelayHours: number;
  allowGuestGalleryView: boolean;
  guestCapacityLimit: number;
  eventTier: HostDemoTier;
  missions: HostDemoMission[];
  currentStep: number;
};
