# Supabase Foundation

Contract 0 puts durable product logic into the database and server layer:

- schema and constraints in `migrations`
- RPC names and transaction boundaries in SQL functions
- AI-only server execution in `functions/generate_memory_missions`
- structural RLS and contract checks in `tests`

## Storage Convention

Memory uploads should live under:

`events/{eventId}/participants/{participantId}/missions/{missionId}/`

Only derivative assets are part of Contract 0:

- `thumbnail`
- `mainsize`

No `original_url` is introduced at this stage.

