# Research: Static Romantic Journey Website in Next.js

## Decision: Implementation location
- Chosen: `apps/landing` Next.js application within the existing monorepo.
- Rationale: `apps/landing` is the approved landing runtime and already uses Next.js, TypeScript, and Tailwind CSS. It supports static deployment and direct public asset delivery.
- Alternatives considered: creating a new app or using another workspace. Rejected because that would violate approved app boundaries and add unnecessary runtime surface area.

## Decision: Asset delivery
- Chosen: local static assets under `apps/landing/public/assets/`.
- Rationale: Next.js serves files from its app-level `public` folder in static deployments. This meets the requirement for local-only images, audio, icons, and fonts.
- Alternatives considered: root-level `public/` or a content package. Rejected because the landing app deploys from its own public folder, and this feature requires hardcoded, feature-specific gift content.

## Decision: Desktop/Mobile layout strategy
- Chosen: dedicated component branches for desktop and mobile layouts using viewport breakpoint detection.
- Rationale: This ensures the feature is implemented as two first-class experiences rather than a single desktop layout scaled down responsively.
- Alternatives considered: fully responsive shared layout. Rejected because it would violate the explicit requirement for distinct desktop/mobile UI implementations.

## Decision: Background music playback
- Chosen: an audio element with autoplay attempt on mount and one-time user interaction fallback listeners for `click`, `touchstart`, `keydown`, and `pointerdown`.
- Rationale: This is the established browser-friendly pattern to support autoplay policies while keeping the UI free of a mandatory visible play button.
- Alternatives considered: visible audio controls or manual play button. Rejected because the spec explicitly requires no visible play button for startup.

## Decision: Relationship timer
- Chosen: a dedicated `relationshipTimer.ts` utility that computes elapsed years, months, days, hours, minutes, and seconds from a fixed start date.
- Rationale: Isolates time calculation from rendering, simplifies one-second updates, and ensures the counter logic is testable.

## Alternatives considered
- Using a content package for text copy: rejected because the feature is custom gift content and should remain self-contained.
- Using CSS-only responsive layouts: rejected because the requirement demands dedicated desktop and mobile implementations.
