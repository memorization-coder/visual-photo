---
id: VP-DOC-ADAPTERS
title: Adapter Map
status: active
version: v1
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Companion note describing platform adapter boundaries referenced by active product contracts.
related_routes: []
related_packages:
  - apps/web
  - packages/domain
related_docs:
  - "[[docs/contracts/index]]"
tags:
  - adapters
---

# Adapter Map

## Current Boundaries

- `AuthAdapter`
- `PhotoCaptureAdapter`
- `MemoryUploadAdapter`
- `DeepLinkAdapter`
- `AnalyticsAdapter`
- `StorageAdapter`

## Current Intent

- Platform APIs stay behind adapters.
- Product flows should not scatter browser-specific capture logic across pages.
- Camera-first behavior should evolve the adapter rather than bypass it.

## Related Contracts

- [[docs/contracts/active/VP-CONTRACT-000-foundation]]
- [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
- [[docs/contracts/active/VP-CONTRACT-002-camera-first-guest-flow]]
