import { z } from "zod";
export declare const CreateEventDraftInputSchema: z.ZodObject<{
    title: z.ZodString;
    hostDescription: z.ZodOptional<z.ZodString>;
    eventStartAt: z.ZodOptional<z.ZodString>;
    eventEndAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    hostDescription?: string | undefined;
    eventStartAt?: string | undefined;
    eventEndAt?: string | undefined;
}, {
    title: string;
    hostDescription?: string | undefined;
    eventStartAt?: string | undefined;
    eventEndAt?: string | undefined;
}>;
export declare const CreateEventDraftResultSchema: z.ZodObject<{
    id: z.ZodString;
    hostUserId: z.ZodString;
    title: z.ZodString;
    hostDescription: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
    qrSlug: z.ZodString;
    eventStartAt: z.ZodOptional<z.ZodString>;
    eventEndAt: z.ZodOptional<z.ZodString>;
    missionsLockedAt: z.ZodOptional<z.ZodString>;
    firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "published" | "closed" | "archived";
    hostUserId: string;
    title: string;
    qrSlug: string;
    hostDescription?: string | undefined;
    eventStartAt?: string | undefined;
    eventEndAt?: string | undefined;
    missionsLockedAt?: string | undefined;
    firstMemorySubmittedAt?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: "draft" | "published" | "closed" | "archived";
    hostUserId: string;
    title: string;
    qrSlug: string;
    hostDescription?: string | undefined;
    eventStartAt?: string | undefined;
    eventEndAt?: string | undefined;
    missionsLockedAt?: string | undefined;
    firstMemorySubmittedAt?: string | undefined;
}>;
export declare const UpdateEventMissionInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    missionId: z.ZodString;
    prompt: z.ZodOptional<z.ZodString>;
    captureHint: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    missionId: string;
    prompt?: string | undefined;
    captureHint?: string | undefined;
    category?: string | undefined;
    isActive?: boolean | undefined;
}, {
    eventId: string;
    missionId: string;
    prompt?: string | undefined;
    captureHint?: string | undefined;
    category?: string | undefined;
    isActive?: boolean | undefined;
}>;
export declare const DeleteEventMissionInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    missionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    missionId: string;
}, {
    eventId: string;
    missionId: string;
}>;
export declare const ReorderEventMissionsInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    missionIdsInOrder: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    missionIdsInOrder: string[];
}, {
    eventId: string;
    missionIdsInOrder: string[];
}>;
export declare const PublishEventInputSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export declare const GetHostEventInputSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export declare const GetHostEventResultSchema: z.ZodObject<{
    event: z.ZodObject<{
        id: z.ZodString;
        hostUserId: z.ZodString;
        title: z.ZodString;
        hostDescription: z.ZodOptional<z.ZodString>;
        status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
        qrSlug: z.ZodString;
        eventStartAt: z.ZodOptional<z.ZodString>;
        eventEndAt: z.ZodOptional<z.ZodString>;
        missionsLockedAt: z.ZodOptional<z.ZodString>;
        firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    }>;
    missions: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    participants: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    missions: {
        id: string;
        eventId: string;
        missionOrder: number;
        prompt: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
    event: {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    };
    participants: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    }[];
}, {
    missions: {
        id: string;
        eventId: string;
        missionOrder: number;
        prompt: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
    event: {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    };
    participants: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    }[];
}>;
export declare const GetHostSubmissionsInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["pending", "approved", "hidden", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
}, {
    eventId: string;
    status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
}>;
export declare const ModerateSubmissionInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    submissionId: z.ZodString;
    action: z.ZodEnum<["approve", "hide", "delete"]>;
    reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    submissionId: string;
    action: "approve" | "hide" | "delete";
    reason?: string | undefined;
}, {
    eventId: string;
    submissionId: string;
    action: "approve" | "hide" | "delete";
    reason?: string | undefined;
}>;
export declare const JoinEventAsParticipantInputSchema: z.ZodObject<{
    qrSlug: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    qrSlug: string;
    displayName?: string | undefined;
}, {
    qrSlug: string;
    displayName?: string | undefined;
}>;
export declare const GetParticipantEventStateInputSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export declare const GetParticipantEventStateResultSchema: z.ZodObject<{
    event: z.ZodObject<{
        id: z.ZodString;
        hostUserId: z.ZodString;
        title: z.ZodString;
        hostDescription: z.ZodOptional<z.ZodString>;
        status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
        qrSlug: z.ZodString;
        eventStartAt: z.ZodOptional<z.ZodString>;
        eventEndAt: z.ZodOptional<z.ZodString>;
        missionsLockedAt: z.ZodOptional<z.ZodString>;
        firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    }>;
    participant: z.ZodObject<{
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
    progressCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    participant: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    };
    event: {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    };
    progressCount: number;
}, {
    participant: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    };
    event: {
        id: string;
        createdAt: string;
        updatedAt: string;
        status: "draft" | "published" | "closed" | "archived";
        hostUserId: string;
        title: string;
        qrSlug: string;
        hostDescription?: string | undefined;
        eventStartAt?: string | undefined;
        eventEndAt?: string | undefined;
        missionsLockedAt?: string | undefined;
        firstMemorySubmittedAt?: string | undefined;
    };
    progressCount: number;
}>;
export declare const GetParticipantActiveMissionsInputSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export declare const GetParticipantActiveMissionsResultSchema: z.ZodObject<{
    participant: z.ZodObject<{
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
    missions: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    missions: {
        id: string;
        eventId: string;
        missionOrder: number;
        prompt: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
    participant: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    };
}, {
    missions: {
        id: string;
        eventId: string;
        missionOrder: number;
        prompt: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        captureHint?: string | undefined;
        category?: string | undefined;
    }[];
    participant: {
        id: string;
        eventId: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        role: "host" | "participant" | "cohost";
        joinedAt: string;
        displayName?: string | undefined;
    };
}>;
export declare const GetApprovedMemoriesInputSchema: z.ZodObject<{
    eventId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventId: string;
}, {
    eventId: string;
}>;
export declare const ReactToMemoryInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    submissionId: z.ZodString;
    reactionKind: z.ZodLiteral<"love">;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    submissionId: string;
    reactionKind: "love";
}, {
    eventId: string;
    submissionId: string;
    reactionKind: "love";
}>;
export declare const ReactToMemoryResultSchema: z.ZodObject<{
    active: z.ZodBoolean;
    reaction: z.ZodNullable<z.ZodObject<{
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
    }>>;
}, "strip", z.ZodTypeAny, {
    active: boolean;
    reaction: {
        id: string;
        eventId: string;
        createdAt: string;
        participantId: string;
        submissionId: string;
        reactionKind: "love";
    } | null;
}, {
    active: boolean;
    reaction: {
        id: string;
        eventId: string;
        createdAt: string;
        participantId: string;
        submissionId: string;
        reactionKind: "love";
    } | null;
}>;
export declare const GetMomentsPeopleLovedInputSchema: z.ZodObject<{
    eventId: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    eventId: string;
    limit: number;
}, {
    eventId: string;
    limit?: number | undefined;
}>;
export declare const RpcContractRegistrySchema: z.ZodObject<{
    create_event_draft: z.ZodObject<{
        input: z.ZodObject<{
            title: z.ZodString;
            hostDescription: z.ZodOptional<z.ZodString>;
            eventStartAt: z.ZodOptional<z.ZodString>;
            eventEndAt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        }, {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        }>;
        output: z.ZodObject<{
            id: z.ZodString;
            hostUserId: z.ZodString;
            title: z.ZodString;
            hostDescription: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
            qrSlug: z.ZodString;
            eventStartAt: z.ZodOptional<z.ZodString>;
            eventEndAt: z.ZodOptional<z.ZodString>;
            missionsLockedAt: z.ZodOptional<z.ZodString>;
            firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    }, {
        input: {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    }>;
    generate_memory_missions: z.ZodObject<{
        input: z.ZodObject<{
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
        output: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            hostUserId: string;
            title: string;
            requestedMissionCount: number;
            locale: string;
            hostDescription?: string | undefined;
        };
        output: {
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
        };
    }, {
        input: {
            eventId: string;
            hostUserId: string;
            title: string;
            requestedMissionCount: number;
            hostDescription?: string | undefined;
            locale?: string | undefined;
        };
        output: {
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
        };
    }>;
    update_event_mission: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            missionId: z.ZodString;
            prompt: z.ZodOptional<z.ZodString>;
            captureHint: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        }, {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        }>;
        output: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        };
    }, {
        input: {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        };
    }>;
    delete_event_mission: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            missionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            missionId: string;
        }, {
            eventId: string;
            missionId: string;
        }>;
        output: z.ZodObject<{
            success: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            success: boolean;
        }, {
            success: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            missionId: string;
        };
        output: {
            success: boolean;
        };
    }, {
        input: {
            eventId: string;
            missionId: string;
        };
        output: {
            success: boolean;
        };
    }>;
    reorder_event_missions: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            missionIdsInOrder: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            missionIdsInOrder: string[];
        }, {
            eventId: string;
            missionIdsInOrder: string[];
        }>;
        output: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            missionIdsInOrder: string[];
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        }[];
    }, {
        input: {
            eventId: string;
            missionIdsInOrder: string[];
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        }[];
    }>;
    publish_event: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
        }, {
            eventId: string;
        }>;
        output: z.ZodObject<{
            id: z.ZodString;
            hostUserId: z.ZodString;
            title: z.ZodString;
            hostDescription: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
            qrSlug: z.ZodString;
            eventStartAt: z.ZodOptional<z.ZodString>;
            eventEndAt: z.ZodOptional<z.ZodString>;
            missionsLockedAt: z.ZodOptional<z.ZodString>;
            firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    }, {
        input: {
            eventId: string;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    }>;
    get_host_event: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
        }, {
            eventId: string;
        }>;
        output: z.ZodObject<{
            event: z.ZodObject<{
                id: z.ZodString;
                hostUserId: z.ZodString;
                title: z.ZodString;
                hostDescription: z.ZodOptional<z.ZodString>;
                status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
                qrSlug: z.ZodString;
                eventStartAt: z.ZodOptional<z.ZodString>;
                eventEndAt: z.ZodOptional<z.ZodString>;
                missionsLockedAt: z.ZodOptional<z.ZodString>;
                firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            }, {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            }>;
            missions: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
            participants: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        }, {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        };
    }, {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        };
    }>;
    get_host_submissions: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            status: z.ZodOptional<z.ZodEnum<["pending", "approved", "hidden", "deleted"]>>;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        }, {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        }>;
        output: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        };
        output: {
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
        }[];
    }, {
        input: {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        };
        output: {
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
        }[];
    }>;
    moderate_submission: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            submissionId: z.ZodString;
            action: z.ZodEnum<["approve", "hide", "delete"]>;
            reason: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        }, {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        }>;
        output: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        };
        output: {
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
        };
    }, {
        input: {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        };
        output: {
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
        };
    }>;
    join_event_as_participant: z.ZodObject<{
        input: z.ZodObject<{
            qrSlug: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            qrSlug: string;
            displayName?: string | undefined;
        }, {
            qrSlug: string;
            displayName?: string | undefined;
        }>;
        output: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        input: {
            qrSlug: string;
            displayName?: string | undefined;
        };
        output: {
            id: string;
            eventId: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            role: "host" | "participant" | "cohost";
            joinedAt: string;
            displayName?: string | undefined;
        };
    }, {
        input: {
            qrSlug: string;
            displayName?: string | undefined;
        };
        output: {
            id: string;
            eventId: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            role: "host" | "participant" | "cohost";
            joinedAt: string;
            displayName?: string | undefined;
        };
    }>;
    get_participant_event_state: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
        }, {
            eventId: string;
        }>;
        output: z.ZodObject<{
            event: z.ZodObject<{
                id: z.ZodString;
                hostUserId: z.ZodString;
                title: z.ZodString;
                hostDescription: z.ZodOptional<z.ZodString>;
                status: z.ZodEnum<["draft", "published", "closed", "archived"]>;
                qrSlug: z.ZodString;
                eventStartAt: z.ZodOptional<z.ZodString>;
                eventEndAt: z.ZodOptional<z.ZodString>;
                missionsLockedAt: z.ZodOptional<z.ZodString>;
                firstMemorySubmittedAt: z.ZodOptional<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            }, {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            }>;
            participant: z.ZodObject<{
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
            progressCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        }, {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
        };
        output: {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        };
    }, {
        input: {
            eventId: string;
        };
        output: {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        };
    }>;
    get_participant_active_missions: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
        }, {
            eventId: string;
        }>;
        output: z.ZodObject<{
            participant: z.ZodObject<{
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
            missions: z.ZodArray<z.ZodObject<{
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
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        }, {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        };
    }, {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        };
    }>;
    submit_memory: z.ZodObject<{
        input: z.ZodObject<{
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
        output: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            mimeType?: string | undefined;
            fileSizeBytes?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        };
        output: {
            submissionId: string;
            completedMissionId: string;
            nextMissionId?: string | undefined;
        };
    }, {
        input: {
            eventId: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            mimeType?: string | undefined;
            fileSizeBytes?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        };
        output: {
            submissionId: string;
            completedMissionId: string;
            nextMissionId?: string | undefined;
        };
    }>;
    get_approved_memories: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
        }, {
            eventId: string;
        }>;
        output: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
        };
        output: {
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
        }[];
    }, {
        input: {
            eventId: string;
        };
        output: {
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
        }[];
    }>;
    react_to_memory: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            submissionId: z.ZodString;
            reactionKind: z.ZodLiteral<"love">;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        }, {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        }>;
        output: z.ZodObject<{
            active: z.ZodBoolean;
            reaction: z.ZodNullable<z.ZodObject<{
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
            }>>;
        }, "strip", z.ZodTypeAny, {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        }, {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        };
        output: {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        };
    }, {
        input: {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        };
        output: {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        };
    }>;
    get_moments_people_loved: z.ZodObject<{
        input: z.ZodObject<{
            eventId: z.ZodString;
            limit: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            eventId: string;
            limit: number;
        }, {
            eventId: string;
            limit?: number | undefined;
        }>;
        output: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            limit: number;
        };
        output: {
            eventId: string;
            createdAt: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            submissionId: string;
            loveCount: number;
        }[];
    }, {
        input: {
            eventId: string;
            limit?: number | undefined;
        };
        output: {
            eventId: string;
            createdAt: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            submissionId: string;
            loveCount: number;
        }[];
    }>;
    record_ai_suggestion_decision: z.ZodObject<{
        input: z.ZodObject<{
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
        output: z.ZodObject<{
            success: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            success: boolean;
        }, {
            success: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        input: {
            eventId: string;
            hostUserId: string;
            suggestionId: string;
            decision: "accepted" | "edited" | "rejected";
            editedPrompt?: string | undefined;
        };
        output: {
            success: boolean;
        };
    }, {
        input: {
            eventId: string;
            hostUserId: string;
            suggestionId: string;
            decision: "accepted" | "edited" | "rejected";
            editedPrompt?: string | undefined;
        };
        output: {
            success: boolean;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    create_event_draft: {
        input: {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    };
    generate_memory_missions: {
        input: {
            eventId: string;
            hostUserId: string;
            title: string;
            requestedMissionCount: number;
            locale: string;
            hostDescription?: string | undefined;
        };
        output: {
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
        };
    };
    update_event_mission: {
        input: {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        };
    };
    delete_event_mission: {
        input: {
            eventId: string;
            missionId: string;
        };
        output: {
            success: boolean;
        };
    };
    reorder_event_missions: {
        input: {
            eventId: string;
            missionIdsInOrder: string[];
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        }[];
    };
    publish_event: {
        input: {
            eventId: string;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    };
    get_host_event: {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        };
    };
    get_host_submissions: {
        input: {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        };
        output: {
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
        }[];
    };
    moderate_submission: {
        input: {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        };
        output: {
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
        };
    };
    join_event_as_participant: {
        input: {
            qrSlug: string;
            displayName?: string | undefined;
        };
        output: {
            id: string;
            eventId: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            role: "host" | "participant" | "cohost";
            joinedAt: string;
            displayName?: string | undefined;
        };
    };
    get_participant_event_state: {
        input: {
            eventId: string;
        };
        output: {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        };
    };
    get_participant_active_missions: {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        };
    };
    submit_memory: {
        input: {
            eventId: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            mimeType?: string | undefined;
            fileSizeBytes?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        };
        output: {
            submissionId: string;
            completedMissionId: string;
            nextMissionId?: string | undefined;
        };
    };
    get_approved_memories: {
        input: {
            eventId: string;
        };
        output: {
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
        }[];
    };
    react_to_memory: {
        input: {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        };
        output: {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        };
    };
    get_moments_people_loved: {
        input: {
            eventId: string;
            limit: number;
        };
        output: {
            eventId: string;
            createdAt: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            submissionId: string;
            loveCount: number;
        }[];
    };
    record_ai_suggestion_decision: {
        input: {
            eventId: string;
            hostUserId: string;
            suggestionId: string;
            decision: "accepted" | "edited" | "rejected";
            editedPrompt?: string | undefined;
        };
        output: {
            success: boolean;
        };
    };
}, {
    create_event_draft: {
        input: {
            title: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    };
    generate_memory_missions: {
        input: {
            eventId: string;
            hostUserId: string;
            title: string;
            requestedMissionCount: number;
            hostDescription?: string | undefined;
            locale?: string | undefined;
        };
        output: {
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
        };
    };
    update_event_mission: {
        input: {
            eventId: string;
            missionId: string;
            prompt?: string | undefined;
            captureHint?: string | undefined;
            category?: string | undefined;
            isActive?: boolean | undefined;
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        };
    };
    delete_event_mission: {
        input: {
            eventId: string;
            missionId: string;
        };
        output: {
            success: boolean;
        };
    };
    reorder_event_missions: {
        input: {
            eventId: string;
            missionIdsInOrder: string[];
        };
        output: {
            id: string;
            eventId: string;
            missionOrder: number;
            prompt: string;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
            captureHint?: string | undefined;
            category?: string | undefined;
        }[];
    };
    publish_event: {
        input: {
            eventId: string;
        };
        output: {
            id: string;
            createdAt: string;
            updatedAt: string;
            status: "draft" | "published" | "closed" | "archived";
            hostUserId: string;
            title: string;
            qrSlug: string;
            hostDescription?: string | undefined;
            eventStartAt?: string | undefined;
            eventEndAt?: string | undefined;
            missionsLockedAt?: string | undefined;
            firstMemorySubmittedAt?: string | undefined;
        };
    };
    get_host_event: {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            participants: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            }[];
        };
    };
    get_host_submissions: {
        input: {
            eventId: string;
            status?: "pending" | "approved" | "hidden" | "deleted" | undefined;
        };
        output: {
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
        }[];
    };
    moderate_submission: {
        input: {
            eventId: string;
            submissionId: string;
            action: "approve" | "hide" | "delete";
            reason?: string | undefined;
        };
        output: {
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
        };
    };
    join_event_as_participant: {
        input: {
            qrSlug: string;
            displayName?: string | undefined;
        };
        output: {
            id: string;
            eventId: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            role: "host" | "participant" | "cohost";
            joinedAt: string;
            displayName?: string | undefined;
        };
    };
    get_participant_event_state: {
        input: {
            eventId: string;
        };
        output: {
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
            event: {
                id: string;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "published" | "closed" | "archived";
                hostUserId: string;
                title: string;
                qrSlug: string;
                hostDescription?: string | undefined;
                eventStartAt?: string | undefined;
                eventEndAt?: string | undefined;
                missionsLockedAt?: string | undefined;
                firstMemorySubmittedAt?: string | undefined;
            };
            progressCount: number;
        };
    };
    get_participant_active_missions: {
        input: {
            eventId: string;
        };
        output: {
            missions: {
                id: string;
                eventId: string;
                missionOrder: number;
                prompt: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                captureHint?: string | undefined;
                category?: string | undefined;
            }[];
            participant: {
                id: string;
                eventId: string;
                createdAt: string;
                updatedAt: string;
                userId: string;
                role: "host" | "participant" | "cohost";
                joinedAt: string;
                displayName?: string | undefined;
            };
        };
    };
    submit_memory: {
        input: {
            eventId: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            mimeType?: string | undefined;
            fileSizeBytes?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
        };
        output: {
            submissionId: string;
            completedMissionId: string;
            nextMissionId?: string | undefined;
        };
    };
    get_approved_memories: {
        input: {
            eventId: string;
        };
        output: {
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
        }[];
    };
    react_to_memory: {
        input: {
            eventId: string;
            submissionId: string;
            reactionKind: "love";
        };
        output: {
            active: boolean;
            reaction: {
                id: string;
                eventId: string;
                createdAt: string;
                participantId: string;
                submissionId: string;
                reactionKind: "love";
            } | null;
        };
    };
    get_moments_people_loved: {
        input: {
            eventId: string;
            limit?: number | undefined;
        };
        output: {
            eventId: string;
            createdAt: string;
            participantId: string;
            missionId: string;
            thumbnailUrl: string;
            mainsizeUrl: string;
            submissionId: string;
            loveCount: number;
        }[];
    };
    record_ai_suggestion_decision: {
        input: {
            eventId: string;
            hostUserId: string;
            suggestionId: string;
            decision: "accepted" | "edited" | "rejected";
            editedPrompt?: string | undefined;
        };
        output: {
            success: boolean;
        };
    };
}>;
export type CreateEventDraftInput = z.infer<typeof CreateEventDraftInputSchema>;
export type CreateEventDraftResult = z.infer<typeof CreateEventDraftResultSchema>;
export type UpdateEventMissionInput = z.infer<typeof UpdateEventMissionInputSchema>;
export type DeleteEventMissionInput = z.infer<typeof DeleteEventMissionInputSchema>;
export type ReorderEventMissionsInput = z.infer<typeof ReorderEventMissionsInputSchema>;
export type PublishEventInput = z.infer<typeof PublishEventInputSchema>;
export type GetHostEventInput = z.infer<typeof GetHostEventInputSchema>;
export type GetHostEventResult = z.infer<typeof GetHostEventResultSchema>;
export type GetHostSubmissionsInput = z.infer<typeof GetHostSubmissionsInputSchema>;
export type ModerateSubmissionInput = z.infer<typeof ModerateSubmissionInputSchema>;
export type JoinEventAsParticipantInput = z.infer<typeof JoinEventAsParticipantInputSchema>;
export type GetParticipantEventStateInput = z.infer<typeof GetParticipantEventStateInputSchema>;
export type GetParticipantEventStateResult = z.infer<typeof GetParticipantEventStateResultSchema>;
export type GetParticipantActiveMissionsInput = z.infer<typeof GetParticipantActiveMissionsInputSchema>;
export type GetParticipantActiveMissionsResult = z.infer<typeof GetParticipantActiveMissionsResultSchema>;
export type GetApprovedMemoriesInput = z.infer<typeof GetApprovedMemoriesInputSchema>;
export type ReactToMemoryInput = z.infer<typeof ReactToMemoryInputSchema>;
export type ReactToMemoryResult = z.infer<typeof ReactToMemoryResultSchema>;
export type GetMomentsPeopleLovedInput = z.infer<typeof GetMomentsPeopleLovedInputSchema>;
export type RpcContractRegistry = z.infer<typeof RpcContractRegistrySchema>;
