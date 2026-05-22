---
id: VP-CONTRACT-SYSTEM
title: Visual Photo Product Contract System
status: active
version: v1
implementation_status: complete
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Defines how product contracts are stored, versioned, linked, and used to guide implementation work.
related_routes: []
related_packages:
  - apps/web
  - packages/contracts
  - packages/domain
  - supabase
related_docs:
  - "[[docs/contracts/index]]"
  - "[[docs/routes]]"
  - "[[docs/route-ownership]]"
  - "[[docs/contract-workflow]]"
  - "[[docs/agent-rules]]"
  - "[[docs/implementation-status]]"
  - "[[docs/adapters]]"
  - "[[docs/state-model]]"
  - "[[docs/decisions]]"
tags:
  - contracts
  - governance
  - obsidian
---

# Visual Photo Product Contract System

## Summary

This repo keeps two different kinds of contracts:

- `packages/contracts` holds code-level contracts such as DTOs, shared schemas, and typed payloads.
- `docs/contracts` holds product contracts such as routes, UX rules, scope, non-goals, success criteria, and implementation intent.

The repo is the source of truth for both. Obsidian should read these files directly from the repo so backlinks and Git history stay aligned.

## Source Of Truth

- Product behavior contracts live in `docs/contracts`.
- Code and schema contracts live in `packages/contracts`.
- Domain rules live in `packages/domain`.
- Backend and policy contracts live in `supabase`.

Do not mix product-behavior documentation into `packages/contracts`.

## Folder Structure

- `docs/contracts/index.md`: contract registry and navigation entrypoint
- `docs/contracts/active/`: current implementation-governing contracts
- `docs/contracts/archive/`: superseded contract history
- `docs/contracts/templates/`: reusable templates for new contracts and decision notes

## Agent Rules

- Agents must check relevant active product contracts before implementing substantial feature work.
- If a request conflicts with an active contract, the agent must ask whether the contract should be revised or whether the request is a one-off exception.
- Plans, PRs, and implementation summaries should cite the relevant contract IDs.
- New major feature work should not proceed without an active relevant contract unless the user explicitly chooses to proceed without one.
- Small fixes may inherit the nearest active contract when behavior is unchanged.

## Lifecycle

- `draft`: shaping or revising a feature
- `active`: approved implementation source of truth
- `archived`: preserved but no longer authoritative

Recommended `implementation_status` values:

- `planned`
- `in_progress`
- `partially_implemented`
- `complete`
- `superseded`

When a major behavioral change lands:

1. Create a new contract version.
2. Move the prior active version into `docs/contracts/archive/<contract-id>/`.
3. Set `supersedes` and `superseded_by` frontmatter correctly.
4. Update `docs/contracts/index.md` so the new file is the active reference.

## Required Frontmatter

Every product contract must include:

- `id`
- `title`
- `status`
- `version`
- `implementation_status`
- `last_updated`
- `supersedes`
- `superseded_by`
- `owner`
- `summary`
- `related_routes`
- `related_packages`
- `related_docs`
- `tags`

## Obsidian Use

Open the repo folder directly in Obsidian. Use wiki links between:

- active and archived contracts
- contracts and routes
- contracts and adapters
- contracts and state-model notes
- contracts and decision notes

Recommended reading order:

1. [[docs/contracts/index]]
2. relevant file in `docs/contracts/active/`
3. related route, adapter, and state-model docs

## Companion Docs

These notes support contract review and implementation tracing:

- [[docs/routes]]
- [[docs/route-ownership]]
- [[docs/contract-workflow]]
- [[docs/agent-rules]]
- [[docs/implementation-status]]
- [[docs/adapters]]
- [[docs/state-model]]
- [[docs/decisions]]
