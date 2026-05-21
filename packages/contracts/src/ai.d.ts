import { z } from "zod";
export declare const AiGenerationStatusSchema: z.ZodEnum<["succeeded", "failed", "fallback"]>;
export declare const GenerateMemoryMissionsInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    hostUserId: z.ZodString;
    title: z.ZodString;
    hostDescription: z.ZodOptional<z.ZodString>;
    requestedMissionCount: z.ZodNumber;
    locale: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    hostUserId: string;
    title: string;
    requestedMissionCount: number;
    locale: string;
    hostDescription?: string | undefined;
}, {
    eventId: string;
    hostUserId: string;
    title: string;
    requestedMissionCount: number;
    hostDescription?: string | undefined;
    locale?: string | undefined;
}>;
export declare const GenerateMemoryMissionsOutputSchema: z.ZodObject<{
    runId: z.ZodString;
    status: z.ZodEnum<["succeeded", "failed", "fallback"]>;
    promptVersion: z.ZodString;
    provider: z.ZodString;
    model: z.ZodString;
    usedFallback: z.ZodBoolean;
    missions: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "succeeded" | "failed" | "fallback";
    runId: string;
    promptVersion: string;
    provider: string;
    model: string;
    usedFallback: boolean;
    missions: {
        prompt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
}, {
    status: "succeeded" | "failed" | "fallback";
    runId: string;
    promptVersion: string;
    provider: string;
    model: string;
    usedFallback: boolean;
    missions: {
        prompt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
}>;
export declare const RecordAiSuggestionDecisionInputSchema: z.ZodObject<{
    suggestionId: z.ZodString;
    eventId: z.ZodString;
    hostUserId: z.ZodString;
    decision: z.ZodEnum<["accepted", "edited", "rejected"]>;
    editedPrompt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    hostUserId: string;
    suggestionId: string;
    decision: "accepted" | "edited" | "rejected";
    editedPrompt?: string | undefined;
}, {
    eventId: string;
    hostUserId: string;
    suggestionId: string;
    decision: "accepted" | "edited" | "rejected";
    editedPrompt?: string | undefined;
}>;
export declare const AiMissionFallbackSchema: z.ZodObject<{
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
export type AiGenerationStatus = z.infer<typeof AiGenerationStatusSchema>;
export type GenerateMemoryMissionsInput = z.infer<typeof GenerateMemoryMissionsInputSchema>;
export type GenerateMemoryMissionsOutput = z.infer<typeof GenerateMemoryMissionsOutputSchema>;
export type RecordAiSuggestionDecisionInput = z.infer<typeof RecordAiSuggestionDecisionInputSchema>;
export type AiMissionFallback = z.infer<typeof AiMissionFallbackSchema>;
