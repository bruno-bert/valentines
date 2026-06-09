# Implementation Plan: Static Romantic Journey Website in Next.js

**Branch**: `001-romantic-journey-website` | **Date**: 2026-06-09 | **Spec**: specs/001-romantic-journey-website/spec.md

**Input**: Feature specification from `specs/001-romantic-journey-website/spec.md`

## Summary

Implement a static, mobile-first romantic journey website inside the existing `apps/landing` Next.js application. The feature delivers a slide-based emotional narrative with dedicated desktop and mobile layouts for every major screen, local static assets for images, audio, icons, and fonts, and a real-time relationship counter based on a fixed start date.

## Technical Context

**Language/Version**: TypeScript 5.8 / Next.js 15 / React 19

**Primary Dependencies**: Next.js, React, Tailwind CSS, TypeScript, `next/image`

**Storage**: N/A

**Testing**: Jest, `@testing-library/react`, manual browser validation, static build validation

**Target Platform**: Browser-based static landing page, mobile-first on modern iOS/Android and desktop browsers

**Project Type**: Static web feature / frontend application

**Performance Goals**: Hero slide loads under 2 seconds on mobile 4G, first viewport prioritized, local assets preloaded, minimal initial JavaScript.

**Constraints**: No backend, no CMS, no database, no authentication, no API calls, no external asset loading; local assets only; distinct mobile/desktop feature layouts; safe area-aware mobile viewports; autoplay fallback for background audio; static deployment compatibility.

**Scale/Scope**: Single static landing page feature with 1 hero slide, 1 counter slide, 7 journey-photo slides, 1 "O que mais amo em você" slide, 1 "Nossos Planos" slide, and 1 final message slide.

## Constitution Check

- Approved runtime workspace is `apps/landing`. This plan uses `apps/landing` only, so the landing application boundary is respected.
- No new runtime packages outside `apps/landing` or existing approved packages are introduced.
- This feature uses the constitution's temporary first-version Romantic Journey exception to keep bespoke relationship content and local static assets under `apps/landing/src/data` and `apps/landing/public/assets/` for the initial static gift-page version.
- This feature uses the constitution's temporary first-version design-token exception to keep feature-scoped romantic color and typography declarations in `apps/landing/src/app/globals.css` for the initial static gift-page version.
- TypeScript strict mode is maintained through the existing `apps/landing` application.
- No backend API, database, CMS, or external content source is required.

> Re-check Constitution after Phase 1 design to verify that all content and asset handling remain within the approved app boundary and that no implicit backend dependency has been introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-romantic-journey-website/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (landing app)

```text
apps/landing/
├── public/
│   └── assets/
│       ├── audio/perfect.mp3
│       ├── fonts/
│       ├── icons/
│       ├── images/
│       │   ├── desktop/
│       │   └── mobile/
│       └── photos/
├── src/
│   ├── app/
│   │   └── page.tsx
│   ├── components/
│   │   ├── RomanticJourney.tsx
│   │   ├── SlideShell.tsx
│   │   ├── HeroSlide.tsx
│   │   ├── CounterSlide.tsx
│   │   ├── JourneyPhotoSlide.tsx
│   │   ├── WhatILoveSlide.tsx
│   │   ├── OurPlansSlide.tsx
│   │   ├── FinalMessageSlide.tsx
│   │   ├── NavigationButtons.tsx
│   │   └── BackgroundMusic.tsx
│   ├── data/
│   │   └── romanticJourneyContent.ts
│   └── utils/
│       └── relationshipTimer.ts
```

**Structure Decision**: Implement the feature inside the approved `apps/landing` workspace because it is the existing Next.js landing application. For the first static gift-page version, the constitution exception allows bespoke relationship content in `apps/landing/src/data` and static assets in `apps/landing/public/assets/`.

## Complexity Tracking

> No constitution violations are expected. The feature is self-contained in the approved `apps/landing` workspace and uses only static assets.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
```
