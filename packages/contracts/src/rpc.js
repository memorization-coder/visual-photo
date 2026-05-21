import { z } from "zod";
import { EventSchema } from "./event";
import { GenerateMemoryMissionsInputSchema, GenerateMemoryMissionsOutputSchema, RecordAiSuggestionDecisionInputSchema } from "./ai";
import { MemorySubmissionSchema, SubmitMemoryInputSchema, SubmitMemoryResultSchema } from "./memory";
import { MissionSchema } from "./mission";
import { ParticipantSchema } from "./participant";
import { MemoryReactionSchema, MomentsPeopleLovedItemSchema } from "./reaction";
export const CreateEventDraftInputSchema = z.object({
    title: z.string().min(1).max(120),
    hostDescription: z.string().max(1000).optional(),
    eventStartAt: z.string().datetime().optional(),
    eventEndAt: z.string().datetime().optional()
});
export const CreateEventDraftResultSchema = EventSchema;
export const UpdateEventMissionInputSchema = z.object({
    eventId: z.string().uuid(),
    missionId: z.string().uuid(),
    prompt: z.string().min(1).max(280).optional(),
    captureHint: z.string().max(280).optional(),
    category: z.string().max(80).optional(),
    isActive: z.boolean().optional()
});
export const DeleteEventMissionInputSchema = z.object({
    eventId: z.string().uuid(),
    missionId: z.string().uuid()
});
export const ReorderEventMissionsInputSchema = z.object({
    eventId: z.string().uuid(),
    missionIdsInOrder: z.array(z.string().uuid()).min(1)
});
export const PublishEventInputSchema = z.object({
    eventId: z.string().uuid()
});
export const GetHostEventInputSchema = z.object({
    eventId: z.string().uuid()
});
export const GetHostEventResultSchema = z.object({
    event: EventSchema,
    missions: z.array(MissionSchema),
    participants: z.array(ParticipantSchema)
});
export const GetHostSubmissionsInputSchema = z.object({
    eventId: z.string().uuid(),
    status: z.enum(["pending", "approved", "hidden", "deleted"]).optional()
});
export const ModerateSubmissionInputSchema = z.object({
    eventId: z.string().uuid(),
    submissionId: z.string().uuid(),
    action: z.enum(["approve", "hide", "delete"]),
    reason: z.string().max(280).optional()
});
export const JoinEventAsParticipantInputSchema = z.object({
    qrSlug: z.string().min(3).max(120),
    displayName: z.string().max(80).optional()
});
export const GetParticipantEventStateInputSchema = z.object({
    eventId: z.string().uuid()
});
export const GetParticipantEventStateResultSchema = z.object({
    event: EventSchema,
    participant: ParticipantSchema,
    progressCount: z.number().int().nonnegative()
});
export const GetParticipantActiveMissionsInputSchema = z.object({
    eventId: z.string().uuid()
});
export const GetParticipantActiveMissionsResultSchema = z.object({
    participant: ParticipantSchema,
    missions: z.array(MissionSchema)
});
export const GetApprovedMemoriesInputSchema = z.object({
    eventId: z.string().uuid()
});
export const ReactToMemoryInputSchema = z.object({
    eventId: z.string().uuid(),
    submissionId: z.string().uuid(),
    reactionKind: z.literal("love")
});
export const ReactToMemoryResultSchema = z.object({
    active: z.boolean(),
    reaction: MemoryReactionSchema.nullable()
});
export const GetMomentsPeopleLovedInputSchema = z.object({
    eventId: z.string().uuid(),
    limit: z.number().int().min(1).max(100).default(24)
});
export const RpcContractRegistrySchema = z.object({
    create_event_draft: z.object({
        input: CreateEventDraftInputSchema,
        output: CreateEventDraftResultSchema
    }),
    generate_memory_missions: z.object({
        input: GenerateMemoryMissionsInputSchema,
        output: GenerateMemoryMissionsOutputSchema
    }),
    update_event_mission: z.object({
        input: UpdateEventMissionInputSchema,
        output: MissionSchema
    }),
    delete_event_mission: z.object({
        input: DeleteEventMissionInputSchema,
        output: z.object({ success: z.boolean() })
    }),
    reorder_event_missions: z.object({
        input: ReorderEventMissionsInputSchema,
        output: z.array(MissionSchema)
    }),
    publish_event: z.object({
        input: PublishEventInputSchema,
        output: EventSchema
    }),
    get_host_event: z.object({
        input: GetHostEventInputSchema,
        output: GetHostEventResultSchema
    }),
    get_host_submissions: z.object({
        input: GetHostSubmissionsInputSchema,
        output: z.array(MemorySubmissionSchema)
    }),
    moderate_submission: z.object({
        input: ModerateSubmissionInputSchema,
        output: MemorySubmissionSchema
    }),
    join_event_as_participant: z.object({
        input: JoinEventAsParticipantInputSchema,
        output: ParticipantSchema
    }),
    get_participant_event_state: z.object({
        input: GetParticipantEventStateInputSchema,
        output: GetParticipantEventStateResultSchema
    }),
    get_participant_active_missions: z.object({
        input: GetParticipantActiveMissionsInputSchema,
        output: GetParticipantActiveMissionsResultSchema
    }),
    submit_memory: z.object({
        input: SubmitMemoryInputSchema,
        output: SubmitMemoryResultSchema
    }),
    get_approved_memories: z.object({
        input: GetApprovedMemoriesInputSchema,
        output: z.array(MemorySubmissionSchema)
    }),
    react_to_memory: z.object({
        input: ReactToMemoryInputSchema,
        output: ReactToMemoryResultSchema
    }),
    get_moments_people_loved: z.object({
        input: GetMomentsPeopleLovedInputSchema,
        output: z.array(MomentsPeopleLovedItemSchema)
    }),
    record_ai_suggestion_decision: z.object({
        input: RecordAiSuggestionDecisionInputSchema,
        output: z.object({ success: z.boolean() })
    })
});
