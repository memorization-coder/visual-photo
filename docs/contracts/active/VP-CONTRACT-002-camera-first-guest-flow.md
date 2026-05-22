---
id: VP-CONTRACT-002
title: Camera-First Guest Flow
status: active
version: v1
implementation_status: in_progress
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Defines the next guest-flow direction: direct camera entry, swipeable guided missions, live capture only, auto-advance after submit, and a mission-aware wall with compact progress cues.
related_routes:
  - /[locale]/e/demo
  - /[locale]/e/demo/capture/[missionId]
  - /[locale]/e/demo/preview/[missionId]
  - /[locale]/e/demo/wall
related_packages:
  - apps/web
  - packages/domain
  - packages/copy
related_docs:
  - "[[docs/contracts/active/VP-CONTRACT-001-static-demo]]"
  - "[[docs/routes]]"
  - "[[docs/adapters]]"
  - "[[docs/state-model]]"
tags:
  - camera
  - guest-flow
  - swipe
  - wall
---

# Camera-First Guest Flow

## Summary

Contract 2 moves the demo from a mission-list-first prototype toward the stronger product proof: guests go straight into the live camera, navigate prompts in place, capture only through the live flow, and advance automatically to the next incomplete moment.

## Implementation Status

`in_progress`

## Product Intent

- Make the product feel like a no-download guided memory camera.
- Reduce friction between opening the event and taking a meaningful photo.
- Keep the wall emotionally browseable without turning it into a social gallery clone.

## Active Behavior

- Guest entry should lead directly into the camera-first flow.
- Mission prompts live as an overlay on the live camera.
- Guests move between prompts by swipe and visible arrow controls.
- Upload-from-library and skip-for-now are removed from the primary guest flow.
- After successful submit, the next incomplete mission becomes the active camera mission.
- Wall keeps mission filtering and masonry/photo-print browsing.
- Wall gains compact captured-count and mini stack-preview cues rather than heavy gallery chrome.

## Non-Goals

- Disposable-camera framing like “shots remaining”
- Lock/unlock mechanics
- Upload-first guest behavior
- Heavy social/gallery toolbars

## Route And UX Implications

- `/[locale]/e/demo` acts as the camera-first entry surface.
- `/preview/[missionId]` remains the retake/submit checkpoint.
- `/submitted` is no longer the primary happy-path step after submit.
- `/wall` remains the review surface for captured memories.

## State And Adapter Implications

- Live camera stays behind `PhotoCaptureAdapter`.
- First incomplete mission determines entry focus.
- Completed mission IDs remain the main progress signal.
- Skip state should not drive the primary guest flow.

## Acceptance Criteria

- Guest lands in the camera-first experience.
- Mission prompt can change in place without leaving the camera.
- Submit advances to the next incomplete mission.
- Wall shows compact progress cues while preserving mission-based browsing.

## Related Docs And Lineage

- [[docs/contracts/active/VP-CONTRACT-001-static-demo]]
- [[docs/routes]]
- [[docs/adapters]]
- [[docs/state-model]]
