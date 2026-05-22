---
id: VP-DOC-CONTRACT-WORKFLOW
title: Contract Workflow
status: active
version: v1
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Defines how product contracts are created, revised, activated, archived, and cited during implementation.
related_routes: []
related_packages:
  - apps/web
  - packages/domain
  - supabase
related_docs:
  - "[[docs/contracts/README]]"
  - "[[docs/contracts/index]]"
  - "[[docs/decisions]]"
tags:
  - workflow
  - contracts
  - governance
---

# Contract Workflow

## Purpose

Use this workflow whenever feature behavior changes materially enough that implementation should be guided by an explicit product contract.

## When To Create Or Revise

Create or revise a contract when:

- a new major feature area starts
- route behavior changes materially
- guest or host flow changes materially
- adapter expectations change
- scope or non-goals change in a way that would affect implementation decisions

Do not create a new contract for:

- typo fixes
- isolated visual polish that does not change behavior
- implementation-only refactors that preserve active behavior

## Lifecycle

### Draft

Use `draft` while shaping a feature or revising scope.

### Active

Use `active` when the contract is approved as the current implementation source of truth.

### Archived

Use `archived` when the contract has been superseded and should be preserved only for lineage and historical review.

## Revision Rules

If a behavioral change is large enough to alter implementation decisions:

1. Create a new contract file or new contract version.
2. Move the old active contract into `docs/contracts/archive/<contract-id>/` if it is being replaced.
3. Set `supersedes` on the new contract.
4. Set `superseded_by` on the old contract.
5. Update `docs/contracts/index.md`.
6. Update any route, adapter, or state notes affected by the change.

## Agent Rules

- Read relevant active contracts before implementing substantial work.
- If a request conflicts with an active contract, do not silently improvise.
- Ask whether the contract should be revised or whether the request is a one-off exception.
- Cite relevant contract IDs in plans and implementation summaries.

## Suggested Summary Format

Use a short contract reference in plans, reviews, and summaries:

- `Contract: VP-CONTRACT-001`
- `Contracts: VP-CONTRACT-000, VP-CONTRACT-002`

Use the same field in PRs for major feature work.

## Related Docs

- [[docs/contracts/README]]
- [[docs/contracts/index]]
- [[docs/route-ownership]]
- [[docs/agent-rules]]
- [[docs/implementation-status]]
- [[docs/decisions]]
