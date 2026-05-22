# Visual Photo

Contract 0 establishes the permanent product foundation for Visual Photo as a monorepo. The first client is the web app, but durable product rules live in shared contracts, shared domain code, Supabase schema/RPCs/Edge Functions, storage conventions, and testable RLS policy boundaries.

## Workspace Layout

- `apps/web`: Next.js web client foundation
- `apps/ios`: placeholder for future iOS and App Clip client
- `apps/android`: placeholder for future Android client
- `docs/contracts`: product contracts, implementation intent, and Obsidian-friendly navigation
- `docs/route-ownership.md`: route-to-contract ownership reference
- `docs/contract-workflow.md`: how contracts are revised, activated, and archived
- `docs/agent-rules.md`: implementation rules for contract-aware agents
- `docs/implementation-status.md`: current repo alignment status for active contracts
- `packages/contracts`: shared DTOs and Zod schemas
- `packages/domain`: framework-agnostic business rules
- `packages/copy`: locale files and shared copy
- `supabase/migrations`: durable database schema, RLS, and RPCs
- `supabase/functions`: Edge Function scaffolding
- `supabase/tests`: database and policy test scripts

## Environment Variables

Client-safe:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `APP_BASE_URL`

Server-only:

- `SUPABASE_SERVICE_ROLE_KEY`
- `AI_API_KEY`

Never expose server-only variables to the browser. `.env.local` is intentionally ignored.

## Durable Product Principles

- React should not decide mission completion, participant eligibility, memory visibility, or reaction permissions.
- Multi-step product actions should flow through RPCs or Edge Functions rather than direct client writes to several tables.
- Shared DTOs and domain rules must be reusable by future native clients.
- Product behavior changes should align with active files in `docs/contracts/active`.

## Supabase Foundation

The initial migration creates:

- product tables for events, missions, participants, memory submissions, reactions, AI runs, AI suggestions, and mission interactions
- RLS enablement on all product tables
- baseline policies for ownership, participation, cross-event isolation, and hidden-memory protection
- stub RPCs with durable names matching the product contract

The `generate_memory_missions` Edge Function is scaffolded to validate JSON-only AI output, store generation metadata, and return fallback missions on failure.

## Testing

- Unit tests cover contract schemas, shared domain rules, and web route/auth helpers.
- SQL tests in `supabase/tests` assert RLS enablement, function presence, and critical database constraints.
- Broader feature and E2E flows are deferred until product features are implemented.

## Quality Gates

Before deployment:

- workspace typecheck passes
- web app builds
- critical tests pass
- RLS policies are applied
- no secrets are committed
- auth redirect preserves event context
- photo upload is verified on a real phone browser
- AI fallback behavior is exercised

## GitHub Actions Deployment

Production deployment is handled by `.github/workflows/ci-memory-hunt-web.yml`.

- Pull requests to `main` run CI only.
- Pushes to `main` run CI only.
- Vercel deploys Git changes after merge based on its Git integration.
- Successful Vercel Preview deployments trigger `.github/workflows/vercel-preview-smoke.yml`.

Required GitHub repository secrets:

- none for the CI workflow itself

Required Vercel project setup:

- Link this repository to a Vercel project for the web app.
- Set the Vercel project Root Directory to `apps/web`.
- Configure Preview environment variables in Vercel for:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `APP_BASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `AI_API_KEY`
- Configure Production environment variables in Vercel for:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `APP_BASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `AI_API_KEY`
- Keep Vercel Git deployments enabled.
- Map Preview env vars to dev Supabase and Production env vars to prod Supabase.
- In GitHub branch protection for `main`, require:
  - `Memory Hunt Web CI / Contracts - Primitives - Lint - Typecheck - Test - Build`
  - `Vercel Preview Smoke Test / Smoke Test Preview`

## Notes

This workspace is scaffolded for `pnpm` workspaces. If `pnpm` is not installed locally, install or enable it before running the workspace scripts.
