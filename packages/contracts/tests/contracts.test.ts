import { describe, expect, it } from "vitest";
import {
  EventSchema,
  GenerateMemoryMissionsOutputSchema,
  RpcContractRegistrySchema,
  SubmitMemoryInputSchema
} from "../src";

describe("contracts", () => {
  it("accepts a valid event payload", () => {
    expect(() =>
      EventSchema.parse({
        id: "550e8400-e29b-41d4-a716-446655440000",
        hostUserId: "550e8400-e29b-41d4-a716-446655440001",
        title: "Wedding weekend",
        status: "draft",
        qrSlug: "wedding-weekend",
        createdAt: "2026-05-22T00:00:00.000Z",
        updatedAt: "2026-05-22T00:00:00.000Z"
      })
    ).not.toThrow();
  });

  it("rejects memory submissions without derivative URLs", () => {
    expect(() =>
      SubmitMemoryInputSchema.parse({
        eventId: "550e8400-e29b-41d4-a716-446655440000",
        participantId: "550e8400-e29b-41d4-a716-446655440002",
        missionId: "550e8400-e29b-41d4-a716-446655440003"
      })
    ).toThrow();
  });

  it("enforces JSON-only AI generation shape", () => {
    expect(() =>
      GenerateMemoryMissionsOutputSchema.parse({
        runId: "550e8400-e29b-41d4-a716-446655440004",
        status: "fallback",
        promptVersion: "v1",
        provider: "openai",
        model: "gpt-5",
        usedFallback: true,
        missions: [{ prompt: "Photograph the first hug." }]
      })
    ).not.toThrow();
  });

  it("publishes the full RPC registry", () => {
    expect(RpcContractRegistrySchema.keyof().options).toContain("submit_memory");
    expect(RpcContractRegistrySchema.keyof().options).toContain("generate_memory_missions");
  });
});

