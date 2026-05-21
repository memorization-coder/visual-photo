import { z } from "zod";
export declare const MemoryReactionKindSchema: z.ZodEnum<["love"]>;
export declare const MemoryReactionSchema: z.ZodObject<{
    id: z.ZodString;
    eventId: z.ZodString;
    submissionId: z.ZodString;
    participantId: z.ZodString;
    reactionKind: z.ZodEnum<["love"]>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    eventId: string;
    createdAt: string;
    participantId: string;
    submissionId: string;
    reactionKind: "love";
}, {
    id: string;
    eventId: string;
    createdAt: string;
    participantId: string;
    submissionId: string;
    reactionKind: "love";
}>;
export declare const MomentsPeopleLovedItemSchema: z.ZodObject<{
    submissionId: z.ZodString;
    eventId: z.ZodString;
    missionId: z.ZodString;
    participantId: z.ZodString;
    thumbnailUrl: z.ZodString;
    mainsizeUrl: z.ZodString;
    loveCount: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    createdAt: string;
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    submissionId: string;
    loveCount: number;
}, {
    eventId: string;
    createdAt: string;
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    submissionId: string;
    loveCount: number;
}>;
export type MemoryReactionKind = z.infer<typeof MemoryReactionKindSchema>;
export type MemoryReaction = z.infer<typeof MemoryReactionSchema>;
export type MomentsPeopleLovedItem = z.infer<typeof MomentsPeopleLovedItemSchema>;
