---
id: VP-CONTRACT-001
title: Static Demo Prototype
status: active
version: v1
implementation_status: partially_implemented
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Defines the static mobile-first demo prototype with local state, one demo event, guided missions, preview flow, and a local memory wall.
related_routes:
  - /[locale]/e/demo
  - /[locale]/e/demo/missions
  - /[locale]/e/demo/capture/[missionId]
  - /[locale]/e/demo/preview/[missionId]
  - /[locale]/e/demo/wall
  - /[locale]/host/events/demo
related_packages:
  - apps/web
  - packages/domain
  - packages/copy
related_docs:
  - "[[docs/contracts/active/VP-CONTRACT-000-foundation]]"
  - "[[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]"
  - "[[docs/routes]]"
  - "[[docs/state-model]]"
tags:
  - demo
  - guest-flow
  - wall
  - host
---

# Static Demo Prototype

## Summary

Contract 1 establishes a mobile-first local-state demo that proves the participant experience before full backend complexity. It keeps one static event, seeded missions, local submissions, and a memory wall that can be reviewed without real auth or storage.

## Implementation Status

`partially_implemented`

## Product Intent

- Test whether guided moments are more understandable than a generic uploader.
- Keep the structure future-friendly without building full backend complexity.
- Give host and guest surfaces enough shape to communicate the product concept.

## Active Behavior

- One demo event: `Little Moments Together`.
- Static guided missions and mocked participant state.
- Local preview and submission flow.
- Completed mission behavior managed locally.
- Wall mixes seeded and locally submitted memories.
- Host pages are thin and explanatory.

## Non-Goals

- Real Supabase writes
- Real auth
- Real AI generation
- Native apps
- Payments
- TV wall

## Route And UX Implications

- Guest and host routes are locale-prefixed.
- Demo routes mirror future product route shape.
- Preview and wall routes remain part of the demo journey.

## State And Adapter Implications

- State is session-local only.
- Photo handling goes through a capture adapter boundary.
- Demo state provider owns mission completion, draft photos, and love state.

## Acceptance Criteria

- User can move through demo event routes.
- User can capture or preview a mission photo locally.
- Submitted memory appears on the wall.
- Host overview communicates the concept without backend dependencies.

## Related Docs And Lineage

- [[docs/contracts/active/VP-CONTRACT-000-foundation]]
- [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]
- [[docs/routes]]
- [[docs/adapters]]
- [[docs/state-model]]
