---
id: VP-DOC-AGENT-RULES
title: Agent Rules
status: active
version: v1
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Short operational rules for agents working in the Visual Photo repo so implementation stays aligned with active contracts.
related_routes: []
related_packages:
  - apps/web
  - packages/domain
  - supabase
related_docs:
  - "[[docs/contracts/README]]"
  - "[[docs/contracts/index]]"
  - "[[docs/contract-workflow]]"
tags:
  - agents
  - contracts
---

# Agent Rules

## Before Implementing

1. Read the relevant files in `docs/contracts/active/`.
2. Check [[docs/route-ownership]] if the work touches a route surface.
3. Check companion docs like [[docs/adapters]] and [[docs/state-model]] if the work touches those concerns.

## During Planning

- Cite the relevant contract IDs.
- If active contracts conflict with the requested work, ask whether the contract should change or whether the request is an exception.
- Do not silently reinterpret contract-governed behavior.

## During Implementation

- Keep code aligned with the active contract behavior.
- If implementation reveals a contract gap, raise it explicitly instead of patching around it invisibly.
- Treat `packages/contracts` as code/schema contracts and `docs/contracts` as product-behavior contracts.

## In Summaries And PRs

Use a short contract reference:

- `Contract: VP-CONTRACT-001`
- `Contracts: VP-CONTRACT-000, VP-CONTRACT-002`
