---
id: VP-CONTRACT-000
title: Foundation
status: active
version: v1
implementation_status: complete
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Establishes the durable monorepo foundation for shared contracts, domain rules, Supabase boundaries, adapters, and i18n-ready client structure.
related_routes:
  - /[locale]
related_packages:
  - packages/contracts
  - packages/domain
  - packages/copy
  - apps/web
  - supabase
related_docs:
  - "[[docs/contracts/index]]"
  - "[[docs/routes]]"
  - "[[docs/adapters]]"
  - "[[docs/state-model]]"
tags:
  - foundation
  - contracts
  - domain
  - supabase
---

# Foundation

## Summary

Contract 0 defines the permanent product foundation for Visual Photo. Durable product logic belongs in shared contracts, reusable domain rules, Supabase boundaries, storage conventions, and platform adapters rather than ad hoc client-only behavior.

## Implementation Status

`complete`

## Product Intent

- Keep product rules reusable across web and future native clients.
- Prevent React components from becoming the source of truth for business rules.
- Start i18n, adapters, and backend boundaries early so later feature work builds on stable primitives.

## Active Behavior

- `packages/contracts` holds shared DTOs and schema shapes.
- `packages/domain` holds framework-agnostic business rules.
- `supabase` holds durable backend schema, RPC, and policy boundaries.
- `apps/web` consumes those shared layers rather than redefining product rules locally.
- User-facing copy flows through `packages/copy`.

## Non-Goals

- Full feature implementation
- Mature native clients
- Production AI flows
- Finalized event experience

## Route And UX Implications

- Web foundation route exists under locale-prefixed Next.js app routing.
- Placeholder and prototype routes may exist, but they must respect shared contracts and adapter boundaries.

## State And Adapter Implications

- Platform concerns are isolated behind adapters.
- Shared rules decide submission eligibility, reveal rules, and memory visibility intent.
- Client state may prototype behavior, but should not replace durable domain decisions.

## Acceptance Criteria

- Shared contracts and domain packages are consumed by the web app.
- Web routing and auth helpers compile against shared foundations.
- Supabase layer has durable schema and policy scaffolding.

## Related Docs And Lineage

- [[docs/contracts/index]]
- [[docs/routes]]
- [[docs/adapters]]
- [[docs/state-model]]
