import { z } from "zod";

export const MissionSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  missionOrder: z.number().int().nonnegative(),
  prompt: z.string().min(1).max(280),
  captureHint: z.string().max(280).optional(),
  category: z.string().max(80).optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const MissionSuggestionSchema = z.object({
  prompt: z.string().min(1).max(280),
  captureHint: z.string().max(280).optional(),
  category: z.string().max(80).optional()
});

export type Mission = z.infer<typeof MissionSchema>;
export type MissionSuggestion = z.infer<typeof MissionSuggestionSchema>;

