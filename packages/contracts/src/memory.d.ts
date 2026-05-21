import { z } from "zod";
export declare const MemorySubmissionStatusSchema: z.ZodEnum<["pending", "approved", "hidden", "deleted"]>;
export declare const MemorySubmissionSchema: z.ZodObject<{
    id: z.ZodString;
    eventId: z.ZodString;
    participantId: z.ZodString;
    missionId: z.ZodString;
    thumbnailUrl: z.ZodString;
    mainsizeUrl: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    fileSizeBytes: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    status: z.ZodEnum<["pending", "approved", "hidden", "deleted"]>;
    moderationReason: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
    status: "pending" | "approved" | "hidden" | "deleted";
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    mimeType?: string | undefined;
    fileSizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    moderationReason?: string | undefined;
}, {
    id: string;
    eventId: string;
    createdAt: string;
    updatedAt: string;
    status: "pending" | "approved" | "hidden" | "deleted";
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    mimeType?: string | undefined;
    fileSizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    moderationReason?: string | undefined;
}>;
export declare const SubmitMemoryInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    participantId: z.ZodString;
    missionId: z.ZodString;
    mainsizeUrl: z.ZodString;
    thumbnailUrl: z.ZodString;
    mimeType: z.ZodOptional<z.ZodString>;
    fileSizeBytes: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    mimeType?: string | undefined;
    fileSizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    eventId: string;
    participantId: string;
    missionId: string;
    thumbnailUrl: string;
    mainsizeUrl: string;
    mimeType?: string | undefined;
    fileSizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const SubmitMemoryResultSchema: z.ZodObject<{
    submissionId: z.ZodString;
    completedMissionId: z.ZodString;
    nextMissionId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    submissionId: string;
    completedMissionId: string;
    nextMissionId?: string | undefined;
}, {
    submissionId: string;
    completedMissionId: string;
    nextMissionId?: string | undefined;
}>;
export type MemorySubmissionStatus = z.infer<typeof MemorySubmissionStatusSchema>;
export type MemorySubmission = z.infer<typeof MemorySubmissionSchema>;
export type SubmitMemoryInput = z.infer<typeof SubmitMemoryInputSchema>;
export type SubmitMemoryResult = z.infer<typeof SubmitMemoryResultSchema>;
