import { z } from "zod";

export const ParticipantRoleSchema = z.enum(["host", "participant", "cohost"]);

export const ParticipantSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  userId: z.string().uuid(),
  role: ParticipantRoleSchema,
  displayName: z.string().max(80).optional(),
  joinedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;

