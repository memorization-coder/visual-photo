import { z } from "zod";
export const MemoryReactionKindSchema = z.enum(["love"]);
export const MemoryReactionSchema = z.object({
    id: z.string().uuid(),
    eventId: z.string().uuid(),
    submissionId: z.string().uuid(),
    participantId: z.string().uuid(),
    reactionKind: MemoryReactionKindSchema,
    createdAt: z.string().datetime()
});
export const MomentsPeopleLovedItemSchema = z.object({
    submissionId: z.string().uuid(),
    eventId: z.string().uuid(),
    missionId: z.string().uuid(),
    participantId: z.string().uuid(),
    thumbnailUrl: z.string().url(),
    mainsizeUrl: z.string().url(),
    loveCount: z.number().int().nonnegative(),
    createdAt: z.string().datetime()
});
