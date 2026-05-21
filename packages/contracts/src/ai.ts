import { z } from "zod";
import { MissionSuggestionSchema } from "./mission.js";

export const AiGenerationStatusSchema = z.enum(["succeeded", "failed", "fallback"]);

export const GenerateMemoryMissionsInputSchema = z.object({
  eventId: z.string().uuid(),
  hostUserId: z.string().uuid(),
  title: z.string().min(1).max(120),
  hostDescription: z.string().max(1000).optional(),
  requestedMissionCount: z.number().int().min(3).max(12),
  locale: z.string().min(2).max(16).default("en")
});

export const GenerateMemoryMissionsOutputSchema = z.object({
  runId: z.string().uuid(),
  status: AiGenerationStatusSchema,
  promptVersion: z.string().min(1),
  provider: z.string().min(1),
  model: z.string().min(1),
  usedFallback: z.boolean(),
  missions: z.array(MissionSuggestionSchema).min(1)
});

export const RecordAiSuggestionDecisionInputSchema = z.object({
  suggestionId: z.string().uuid(),
  eventId: z.string().uuid(),
  hostUserId: z.string().uuid(),
  decision: z.enum(["accepted", "edited", "rejected"]),
  editedPrompt: z.string().max(280).optional()
});

export const AiMissionFallbackSchema = z.object({
  prompt: z.string().min(1).max(280),
  captureHint: z.string().max(280).optional(),
  category: z.string().max(80).optional()
});

export type AiGenerationStatus = z.infer<typeof AiGenerationStatusSchema>;
export type GenerateMemoryMissionsInput = z.infer<typeof GenerateMemoryMissionsInputSchema>;
export type GenerateMemoryMissionsOutput = z.infer<typeof GenerateMemoryMissionsOutputSchema>;
export type RecordAiSuggestionDecisionInput = z.infer<typeof RecordAiSuggestionDecisionInputSchema>;
export type AiMissionFallback = z.infer<typeof AiMissionFallbackSchema>;
