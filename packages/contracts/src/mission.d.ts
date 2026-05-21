import { z } from "zod";
export declare const MissionSchema: z.ZodObject<{
    id: z.ZodString;
    eventId: z.ZodString;
    missionOrder: z.ZodNumber;
    prompt: z.ZodString;
    captureHint: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    eventId: string;
    missionOrder: number;
    prompt: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    captureHint?: string | undefined;
    category?: string | undefined;
}, {
    id: string;
    eventId: string;
    missionOrder: number;
    prompt: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    captureHint?: string | undefined;
    category?: string | undefined;
}>;
export declare const MissionSuggestionSchema: z.ZodObject<{
    prompt: z.ZodString;
    captureHint: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    captureHint?: string | undefined;
    category?: string | undefined;
}, {
    prompt: string;
    captureHint?: string | undefined;
    category?: string | undefined;
}>;
export type Mission = z.infer<typeof MissionSchema>;
export type MissionSuggestion = z.infer<typeof MissionSuggestionSchema>;
