import { z } from "zod";
export declare const ParticipantRoleSchema: z.ZodEnum<["host", "participant", "cohost"]>;
export declare const ParticipantSchema: z.ZodObject<{
    id: z.ZodString;
    eventId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<["host", "participant", "cohost"]>;
    displayName: z.ZodOptional<z.ZodString>;
    joinedAt: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    role: "host" | "participant" | "cohost";
    joinedAt: string;
    displayName?: string | undefined;
}, {
    id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    role: "host" | "participant" | "cohost";
    joinedAt: string;
    displayName?: string | undefined;
}>;
export type ParticipantRole = z.infer<typeof ParticipantRoleSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
