# nobu Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-06-08

## Active Technologies
- TypeScript 5.8.x in strict mode on Node.js 22 with Expo React Native + Expo SDK 54, React 19, React Native 0.81, React Native core components, existing Nobu mobile design-system theme/tokens, `@valentines/content-mobile`, Jest, `@testing-library/react-native` (009-my-studies-screen)
- Bundled JSON and local assets from `packages/content-mobile`; no Realm schema or backend persistence changes in this delivery (009-my-studies-screen)
- TypeScript 5.8.x in strict mode on Node.js 22 (aligned with + Fastify 5, `@fastify/swagger`, `@fastify/swagger-ui`, (010-my-studies-backend)
- Realm local DB on mobile (source of truth for studies); Firebase (010-my-studies-backend)
- Realm local DB on mobile is the source of truth for `MaterialUpload` and draft `Study` rendering. Firebase SQL Connect/Data Connect stores backend material upload metadata and updated Study status. No file-content object storage is used in this feature. Bundled JSON/assets from `packages/content-mobile` provide copy, icons, and images. (011-material-upload-flow)
- TypeScript 5.8.x in strict mode on Node.js 22 (aligned with `.nvmrc`). + Expo SDK 54 / React Native 0.81, React 19, React Navigation, React Native primitives, app-owned mobile design tokens, `expo-document-picker` for platform file selection, Fastify 5, `@fastify/swagger`, `@fastify/swagger-ui`, Firebase SQL Connect/Data Connect Admin SDK generated operations, `@valentines/core`, `@valentines/backend-core`, `@valentines/common-api-client`, `@valentines/mobile-infra-storage-realm`, `@valentines/common-infra-storage-firebase-sql-connect`, `@valentines/content-mobile`, Jest, `@testing-library/react-native`, ESLint, pnpm workspaces, Turborepo. (011-material-upload-flow)

- TypeScript 5.8.x in strict mode on Node.js 22 + Fastify 5, `@fastify/swagger`, `@fastify/swagger-ui`, `pg`, Firebase Admin/Data Connect generated operations, `@valentines/backend-core`, Jest, ESLint, pnpm workspaces, Turborepo (008-backend-core-migration)
- Firebase Data Connect remains the active backend provider; PostgreSQL 16 adapter/schema and Docker-local tooling move from the Backend API application into `@valentines/common-infra-storage-postgresql`; no mobile/local storage change (008-backend-core-migration)

- TypeScript 5.8.x on Node.js 22 + Expo React Native (mobile), Next.js 15 (web/landing), `@valentines/content-web`, `@valentines/content-landing`, `@valentines/content-mobile`, `@valentines/content-management`, `@valentines/mobile-infra-storage-realm` (003-fix-content-delivery)
- `content/json/placeholder.json` per platform package (source); Realm in-memory placeholder (mobile rendering source after bootstrap) (003-fix-content-delivery)
- TypeScript 5.8.x on Node.js 22 + Fastify backend API, PostgreSQL via backend-only repository adapters, Expo React Native mobile app, React Navigation placeholders, `@valentines/common-api-client`, `@valentines/common-infra-auth-google`, `@valentines/content-mobile`, `@valentines/mobile-infra-storage-realm` (004-first-use-onboarding)
- PostgreSQL in `apps/backend-api` only; Realm repositories in `packages/mobile-infra-storage-realm`; JSON content in `packages/content-mobile/content/json` (004-first-use-onboarding)
- TypeScript 5.8.x on Node.js 22, aligned with `.nvmrc` and strict mode + Expo React Native mobile app, Fastify backend API, `@valentines/core`, `@valentines/content-mobile`, `@valentines/common-api-client`, `@valentines/mobile-infra-storage-realm`, existing observability/analytics placeholders (005-configuration-menu)
- Realm-shaped local storage for mobile source of truth; PostgreSQL behind `apps/backend-api` repository adapters only; JSON mobile content for menu definitions and localized labels (005-configuration-menu)
- TypeScript 5.8.x on Node.js 22 with Expo React Native, React Native core components, existing Nobu mobile design-system tokens, `@valentines/content-mobile`, `@valentines/mobile-infra-storage-realm`, `@valentines/core`, `@valentines/common-api-client` (006-mobile-dashboard-ui)
- Realm remains the mobile local source of truth for user/profile/configuration/avatar data; bundled JSON and image assets live in `packages/content-mobile` (006-mobile-dashboard-ui)
- TypeScript 5.8.x on Node.js 22 + Fastify backend API, Firebase CLI 15.18.0 already installed globally, Firebase Data Connect, Firebase Admin SDK for Node.js/Data Connect, generated Data Connect Admin SDK operations, Jest, ESLint, Turborepo/pnpm workspaces (007-firebase-sql-storage)
- Firebase Data Connect backed by managed Cloud SQL for PostgreSQL; Data Connect schema and connector operations owned by `packages/common-infra-storage-firebase-sql-connect`; existing direct PostgreSQL adapters are no longer composed for runtime persistent flows in this delivery (007-firebase-sql-storage)

- TypeScript 5.8.x on Node.js 22, aligned with `.nvmrc` and strict mode + pnpm workspaces, Turborepo, Expo React Native, React Navigation placeholders, Next.js 15, Fastify for backend API placeholder routes, Jest, Testing Library, ESLint flat config, Prettier (002-complete-architecture-skeleton)
- JSON content in platform content packages, Realm local storage placeholders for Mobile, WatermelonDB alternate storage placeholders, PostgreSQL repository placeholders only inside `apps/backend-api` (002-complete-architecture-skeleton)

- TypeScript strict mode on Node.js 22, aligned with `.nvmrc` + pnpm workspaces, Turborepo, React Native with Expo, Next.js for Web and Landing, platform content packages, `@valentines/content-management` for backend/CMS delivery logic, Jest, React Testing Library, `@testing-library/react-native`, ESLint, Prettier (001-monorepo-foundation)

## Project Structure

```text
apps/
├── mobile/
├── web/
├── landing/
└── backend-api/
packages/
├── core/
├── backend-core/
├── config/
├── design-system/
├── content-mobile/
├── content-web/
├── content-landing/
├── content-management/
├── common-api-client/
├── common-infra-auth-google/
├── common-infra-ai-openai/
├── common-infra-ai-google/
├── common-infra-storage-firebase-sql-connect/
├── mobile-infra-storage-realm/
├── mobile-infra-storage-watermelondb/
├── mobile-infra-observability-sentry/
├── mobile-infra-observability-crashlytics/
└── mobile-infra-analytics-firebase/
specs/
```

## Commands

pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format

pnpm --filter @valentines/mobile dev
pnpm --filter @valentines/web dev
pnpm --filter @valentines/landing dev

## Code Style

TypeScript strict mode on Node.js 22, aligned with `.nvmrc`: use explicit
types for exported APIs, preserve workspace boundaries, keep frontend Core and
Backend Core platform-agnostic, keep infrastructure technology-specific,
compose providers inside runtime apps, and run root pnpm/Turborepo quality
gates before review.

Frontend Core and Backend Core MUST NOT instantiate infrastructure
implementations directly. Backend domain aggregates, value objects, ports,
use cases, and provider-neutral application-service implementations MUST live
in `packages/backend-core`; `apps/backend-api` composes
services and adapters, while backend infrastructure packages implement Backend
Core ports. Mobile is offline-first with local storage as the source of truth,
Realm as the default storage implementation, synchronization through a Sync
Orchestrator, and child-safe telemetry rules for analytics, crash reporting,
logs, and traces.

Product content and content-managed assets MUST live in `@valentines/content-mobile`,
`@valentines/content-web`, or `@valentines/content-landing` under `content/json`,
`content/images`, and `content/videos`. Backend/CMS content fetching business
logic MUST live in `@valentines/content-management`; app source trees SHOULD NOT own
product content except documented fixtures or placeholders.

Web and Landing CMS/backend content MUST be fetched during the Next.js build.
Mobile CMS/backend content MUST be fetched once at authenticated app
startup/login, stored in Realm, and read from Realm after bootstrap.

Web and Landing image rendering MUST use Next.js `next/image`. Do not render
product, content-managed, marketing, or UI images with raw `img` tags unless a
feature plan documents an approved exception.

## Recent Changes
- 011-material-upload-flow: Added TypeScript 5.8.x in strict mode on Node.js 22 (aligned with `.nvmrc`). + Expo SDK 54 / React Native 0.81, React 19, React Navigation, React Native primitives, app-owned mobile design tokens, `expo-document-picker` for platform file selection, Fastify 5, `@fastify/swagger`, `@fastify/swagger-ui`, Firebase SQL Connect/Data Connect Admin SDK generated operations, `@valentines/core`, `@valentines/backend-core`, `@valentines/common-api-client`, `@valentines/mobile-infra-storage-realm`, `@valentines/common-infra-storage-firebase-sql-connect`, `@valentines/content-mobile`, Jest, `@testing-library/react-native`, ESLint, pnpm workspaces, Turborepo.
- 010-my-studies-backend: Added TypeScript 5.8.x in strict mode on Node.js 22 (aligned with + Fastify 5, `@fastify/swagger`, `@fastify/swagger-ui`,



<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

<!-- SPECKIT START -->
Current plan: `specs/001-romantic-journey-website/plan.md`
For additional context about technologies to be used, project structure,
and other important information, read the current plan
<!-- SPECKIT END -->
