import { expect, test } from "@playwright/test";

const STORAGE_KEY = "visual-photo-host-demo-state";
const TINY_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wn0K4sAAAAASUVORK5CYII=";
const TINY_PNG_DATA_URL = `data:image/png;base64,${TINY_PNG_BASE64}`;

const seedEvents = [
  {
    id: "host-demo-seed-birthday",
    role: "hosting",
    title: "Little Moments Together",
    hostPrompt: "This is my baby's first birthday. Help guests capture warm, funny little moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    startAt: "2026-05-23T13:00",
    endAt: "2026-05-23T17:00",
    revealMode: "during",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 10,
    eventTier: "free",
    missions: [
      { id: "seed-birthday-1", prompt: "A tiny detail people may forget later", aiGenerated: true },
      { id: "seed-birthday-2", prompt: "A moment that feels like laughter", aiGenerated: true },
      { id: "seed-birthday-3", prompt: "Someone making the baby feel loved", aiGenerated: true },
      { id: "seed-birthday-4", prompt: "Something the host might miss", aiGenerated: true },
      { id: "seed-birthday-5", prompt: "A quiet happy moment", aiGenerated: true }
    ],
    createdAt: "2026-05-20T09:00:00.000Z",
    updatedAt: "2026-05-20T09:00:00.000Z",
    isSeeded: true
  },
  {
    id: "host-demo-seed-wedding",
    role: "hosting",
    title: "Candlelight Wedding Dinner",
    hostPrompt: "This is a relaxed wedding dinner. Give guests photo ideas that feel emotional and candid.",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    startAt: "2026-07-02T18:30",
    endAt: "2026-07-02T23:00",
    revealMode: "after",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 10,
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
    id: "host-demo-participating-picnic",
    role: "participating",
    title: "Golden Hour Picnic",
    hostPrompt: "A sunny picnic where guests capture relaxed candid moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80",
    startAt: "2026-05-23T15:00",
    endAt: "2026-05-23T19:00",
    revealMode: "during",
    revealDelayHours: 12,
    allowGuestGalleryView: true,
    guestCapacityLimit: 10,
    eventTier: "free",
    missions: [
      { id: "seed-picnic-1", prompt: "A relaxed candid with food or blankets", aiGenerated: true },
      { id: "seed-picnic-2", prompt: "A detail that feels summery", aiGenerated: true },
      { id: "seed-picnic-3", prompt: "A photo that catches the late light", aiGenerated: true }
    ],
    createdAt: "2026-05-18T07:30:00.000Z",
    updatedAt: "2026-05-18T07:30:00.000Z",
    isSeeded: true
  }
] as const;

test.describe("host demo flow", () => {
  test("opens the create route with a valid settings draft", async ({ page }) => {
    await page.addInitScript(
      ({ storageKey, events, imageUrl }) => {
        window.sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            events,
            drafts: {
              create: {
                title: "Little Moments Together",
                hostPrompt: "This is my baby's first birthday. Help guests capture warm, funny little moments.",
                imageUrl,
                startAt: "2026-06-15T14:00",
                endAt: "2026-06-15T17:00",
                revealMode: "during",
                revealDelayHours: 12,
                allowGuestGalleryView: true,
                guestCapacityLimit: 10,
                eventTier: "free",
                missions: [
                  { id: "create-birthday-1", prompt: "A tiny detail people may forget later", aiGenerated: true },
                  { id: "create-birthday-2", prompt: "A moment that feels like laughter", aiGenerated: true },
                  { id: "create-birthday-3", prompt: "Someone making the guest of honor feel loved", aiGenerated: true },
                  { id: "create-birthday-4", prompt: "Something the host might miss while busy", aiGenerated: true },
                  { id: "create-birthday-5", prompt: "A calm photo that still feels full of joy", aiGenerated: true }
                ],
                currentStep: 2
              }
            }
          })
        );
      },
      { storageKey: STORAGE_KEY, events: seedEvents, imageUrl: TINY_PNG_DATA_URL }
    );

    await page.goto("/en/host/events/demo");
    await expect(page.getByRole("link", { name: "New Event" })).toBeVisible();

    await page.getByRole("link", { name: "New Event" }).click();
    await expect(page.getByTestId("host-demo-editor-create")).toBeVisible();
    await expect(page.getByTestId("host-demo-close")).toBeVisible();
    await expect(page.getByTestId("host-demo-start-at")).toHaveValue("2026-06-15T14:00");
    await expect(page.getByTestId("host-demo-end-at")).toHaveValue("2026-06-15T17:00");
    await expect(page.getByTestId("host-demo-final-submit")).toContainText("Create Event");
  });

  test("shows the upgrade card when paid settings are selected while editing", async ({ page }) => {
    await page.addInitScript(
      ({ storageKey, events }) => {
        window.sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            events,
            drafts: {
              "edit:host-demo-seed-birthday": {
                title: "Little Moments Together",
                hostPrompt: "This is my baby's first birthday. Help guests capture warm, funny little moments.",
                imageUrl:
                  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
                startAt: "2026-06-15T14:00",
                endAt: "2026-06-15T17:00",
                revealMode: "during",
                revealDelayHours: 12,
                allowGuestGalleryView: true,
                guestCapacityLimit: 30,
                eventTier: "small",
                missions: [
                  { id: "seed-birthday-1", prompt: "A tiny detail people may forget later", aiGenerated: true },
                  { id: "seed-birthday-2", prompt: "A moment that feels like laughter", aiGenerated: true },
                  { id: "seed-birthday-3", prompt: "Someone making the baby feel loved", aiGenerated: true },
                  { id: "seed-birthday-4", prompt: "Something the host might miss", aiGenerated: true },
                  { id: "seed-birthday-5", prompt: "A quiet happy moment", aiGenerated: true }
                ],
                currentStep: 2
              }
            }
          })
        );
      },
      { storageKey: STORAGE_KEY, events: seedEvents }
    );

    await page.goto("/en/host/events/demo/host-demo-seed-birthday");
    await expect(page.getByTestId("host-demo-editor-edit")).toBeVisible();
    await expect(page.getByTestId("host-demo-tier-select")).toBeVisible();

    await expect(page.getByTestId("host-demo-upgrade-card")).toBeVisible();
    await expect(page.getByTestId("host-demo-final-submit")).toContainText("Continue To Upgrade");
  });

  test("opens a share surface for a seeded event", async ({ page }) => {
    await page.addInitScript(
      ({ storageKey, events }) => {
        window.sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            events,
            drafts: {}
          })
        );
      },
      { storageKey: STORAGE_KEY, events: seedEvents }
    );

    await page.goto("/en/host/events/demo");
    await page.locator('a[href="/en/host/events/demo/host-demo-seed-birthday/share"]').click();

    await expect(page.getByRole("heading", { name: "Little Moments Together" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy Guest Link" })).toBeVisible();
  });
});
