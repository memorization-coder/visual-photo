import { z } from "zod";

export const MemorySubmissionStatusSchema = z.enum(["pending", "approved", "hidden", "deleted"]);

export const MemorySubmissionSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  participantId: z.string().uuid(),
  missionId: z.string().uuid(),
  thumbnailUrl: z.string().url(),
  mainsizeUrl: z.string().url(),
  mimeType: z.string().min(1).max(80).optional(),
  fileSizeBytes: z.number().int().positive().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  status: MemorySubmissionStatusSchema,
  moderationReason: z.string().max(280).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const SubmitMemoryInputSchema = z.object({
  eventId: z.string().uuid(),
  participantId: z.string().uuid(),
  missionId: z.string().uuid(),
  mainsizeUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  mimeType: z.string().max(80).optional(),
  fileSizeBytes: z.number().int().positive().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional()
});

export const SubmitMemoryResultSchema = z.object({
  submissionId: z.string().uuid(),
  completedMissionId: z.string().uuid(),
  nextMissionId: z.string().uuid().optional()
});

export type MemorySubmissionStatus = z.infer<typeof MemorySubmissionStatusSchema>;
export type MemorySubmission = z.infer<typeof MemorySubmissionSchema>;
export type SubmitMemoryInput = z.infer<typeof SubmitMemoryInputSchema>;
export type SubmitMemoryResult = z.infer<typeof SubmitMemoryResultSchema>;

