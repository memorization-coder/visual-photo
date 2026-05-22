---
id: VP-DOC-ROUTE-OWNERSHIP
title: Route Ownership Map
status: active
version: v1
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Maps key routes and route groups to the active contracts that currently govern their behavior.
related_routes:
  - /[locale]/e/demo
  - /[locale]/host/events/demo
related_packages:
  - apps/web
related_docs:
  - "[[docs/contracts/index]]"
  - "[[docs/routes]]"
tags:
  - routes
  - contracts
  - ownership
---

# Route Ownership Map

## Purpose

This note answers: which active contract currently governs a given surface?

## Guest Routes

### `/[locale]/e/demo`

- Primary contracts:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
  - [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]
- Notes:
  - Contract 1 establishes the demo route family.
  - Contract 2 governs the camera-first direction for this entry surface.

### `/[locale]/e/demo/missions`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
- Notes:
  - This route is part of the static demo baseline.
  - Contract 2 may reduce its centrality if camera-first entry becomes primary.

### `/[locale]/e/demo/capture/[missionId]`

- Primary contracts:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
  - [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]
- Notes:
  - Contract 1 establishes capture as part of the demo flow.
  - Contract 2 governs the live, swipeable, camera-first behavior.

### `/[locale]/e/demo/preview/[missionId]`

- Primary contracts:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
  - [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]

### `/[locale]/e/demo/submitted`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
- Notes:
  - Contract 2 suggests this route is no longer the primary happy path after submit.

### `/[locale]/e/demo/wall`

- Primary contracts:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
  - [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]
- Notes:
  - Contract 1 establishes the local wall.
  - Contract 2 governs the camera-first-compatible wall direction and compact progress cues.

## Host Routes

### `/[locale]/host/events/demo`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]

### `/[locale]/host/events/demo/missions`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]

### `/[locale]/host/events/demo/share`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]

### `/[locale]/host/events/demo/moderate`

- Primary contract:
  - [[docs/contracts/active/VP-CONTRACT-001-static-demo]]

## Foundation Coverage

All route groups also inherit:

- [[docs/contracts/active/VP-CONTRACT-000-foundation]]

This foundation contract governs shared contracts, domain-rule reuse, adapter boundaries, and backend layering expectations.
