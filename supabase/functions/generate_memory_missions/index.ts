type MissionSuggestion = {
  prompt: string;
  captureHint?: string;
  category?: string;
};

type MissionGenerationPayload = {
  eventId: string;
  hostUserId: string;
  title: string;
  hostDescription?: string;
  requestedMissionCount: number;
  locale?: string;
};

type MissionGenerationResult = {
  runId: string;
  status: "succeeded" | "failed" | "fallback";
  promptVersion: string;
  provider: string;
  model: string;
  usedFallback: boolean;
  missions: MissionSuggestion[];
};

const PROMPT_VERSION = "contract-0-v1";
const PROVIDER = "configured-server-provider";
const MODEL = "configured-server-model";

const fallbackMissions: MissionSuggestion[] = [
  { prompt: "Capture a moment that feels warm.", category: "emotion" },
  { prompt: "Photograph a small detail people might miss.", category: "detail" },
  { prompt: "Take a photo of a moment people will laugh about later.", category: "joy" }
];

function buildRunId(): string {
  return crypto.randomUUID();
}

function isMissionSuggestion(value: unknown): value is MissionSuggestion {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.prompt === "string";
}

function assertPayload(input: unknown): MissionGenerationPayload {
  if (!input || typeof input !== "object") {
    throw new Error("Expected JSON object payload.");
  }

  const candidate = input as Record<string, unknown>;

  if (
    typeof candidate.eventId !== "string" ||
    typeof candidate.hostUserId !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.requestedMissionCount !== "number"
  ) {
    throw new Error("Missing required mission generation fields.");
  }

  return {
    eventId: candidate.eventId,
    hostUserId: candidate.hostUserId,
    title: candidate.title,
    hostDescription: typeof candidate.hostDescription === "string" ? candidate.hostDescription : undefined,
    requestedMissionCount: candidate.requestedMissionCount,
    locale: typeof candidate.locale === "string" ? candidate.locale : "en"
  };
}

function validateMissionArray(value: unknown): MissionSuggestion[] {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => !isMissionSuggestion(item))) {
    throw new Error("AI output did not match the mission JSON schema.");
  }

  return value.map((item) => ({
    prompt: item.prompt.trim(),
    captureHint: item.captureHint?.trim(),
    category: item.category?.trim()
  }));
}

async function callProvider(_payload: MissionGenerationPayload): Promise<MissionSuggestion[]> {
  throw new Error("AI provider integration is not configured in Contract 0.");
}

async function persistGenerationRun(result: MissionGenerationResult, payload: MissionGenerationPayload) {
  console.info("Persist AI generation run", {
    runId: result.runId,
    eventId: payload.eventId,
    hostUserId: payload.hostUserId,
    promptVersion: result.promptVersion,
    provider: result.provider,
    model: result.model,
    status: result.status,
    usedFallback: result.usedFallback
  });
}

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }

  try {
    const payload = assertPayload(await request.json());
    let result: MissionGenerationResult;

    try {
      const missions = validateMissionArray(await callProvider(payload));
      result = {
        runId: buildRunId(),
        status: "succeeded",
        promptVersion: PROMPT_VERSION,
        provider: PROVIDER,
        model: MODEL,
        usedFallback: false,
        missions
      };
    } catch (error) {
      result = {
        runId: buildRunId(),
        status: "fallback",
        promptVersion: PROMPT_VERSION,
        provider: PROVIDER,
        model: MODEL,
        usedFallback: true,
        missions: fallbackMissions.slice(0, Math.max(1, Math.min(payload.requestedMissionCount, fallbackMissions.length)))
      };

      console.error("AI mission generation fallback", error);
    }

    await persistGenerationRun(result, payload);
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Mission generation request failed", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unexpected error."
      },
      { status: 400 }
    );
  }
});

