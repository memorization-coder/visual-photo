import { z } from "zod";

export const EventStatusSchema = z.enum(["draft", "published", "closed", "archived"]);

export const EventSchema = z.object({
  id: z.string().uuid(),
  hostUserId: z.string().uuid(),
  title: z.string().min(1).max(120),
  hostDescription: z.string().max(1000).optional(),
  status: EventStatusSchema,
  qrSlug: z.string().min(3).max(120),
  eventStartAt: z.string().datetime().optional(),
  eventEndAt: z.string().datetime().optional(),
  missionsLockedAt: z.string().datetime().optional(),
  firstMemorySubmittedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type EventStatus = z.infer<typeof EventStatusSchema>;
export type Event = z.infer<typeof EventSchema>;

