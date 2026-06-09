<!--
Sync Impact Report
Version change: 7.0.1 -> 7.1.0
Modified principles:
- V. Content Delivery Contract (requires Next.js apps to render images with `next/image`, not raw `img` tags)
- VI. Design System Standards (adds image-rendering component discipline for Web and Landing UI)
- Development Workflow (requires Web/Landing plans to document `next/image` usage)
Added sections:
- Web and Landing image rendering rule for content-managed and product images
Removed sections:
- None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/checklist-template.md (reviewed, no update required)
- ✅ .specify/templates/agent-file-template.md (reviewed, no update required)
- ⚠ .specify/templates/commands/*.md (directory not present)
- ✅ README.md
- ✅ AGENTS.md
Follow-up TODOs:
- None
-->

# Nobu Monorepo Constitution

## Core Principles

### I. Monorepo Architecture, Workspace Boundaries & Type Safety (NON-NEGOTIABLE)

This repository MUST be maintained as a TypeScript `pnpm` workspace monorepo
orchestrated by Turborepo. Runtime code MUST live under approved `apps/` or
`packages/` workspaces, and package boundaries MUST communicate architectural
responsibility.

The approved application workspaces are:

- `apps/mobile`: primary Expo React Native mobile application.
- `apps/web`: Next.js application and cross-platform Core validation surface.
- `apps/landing`: public Next.js marketing and content application.
- `apps/backend-api`: backend API application.

The approved shared and infrastructure package families are:

- `packages/core`: platform-agnostic domain, ports, use cases, contracts, and
  business rules shared by frontend runtimes.
- `packages/backend-core`: platform-agnostic backend domain, aggregates, value
  objects, ports/interfaces, use cases, provider-neutral application-service
  implementations, and repository contracts.
- `packages/config`: shared project and tooling configuration.
- `packages/design-system`: shared design-system foundations.
- `packages/content-mobile`: mobile product content package for bundled JSON,
  local assets, typed manifests, and mobile content exports.
- `packages/content-web`: web product content package for build-time JSON,
  local assets, typed manifests, and web content exports.
- `packages/content-landing`: landing product content package for build-time
  JSON, local assets, typed manifests, and landing content exports.
- `packages/content-management`: shared business logic package for fetching,
  mapping, validating, caching, and versioning content from backend/CMS sources.
- `packages/common-api-client`: shared HTTP/API DTO client for mobile, web,
  backend-facing integration tests, sync APIs, and version-check APIs.
- `packages/common-infra-auth-google`: Google authentication provider adapter.
- `packages/common-infra-ai-openai`: OpenAI provider adapter.
- `packages/common-infra-ai-google`: Google AI/Gemini provider adapter.
- `packages/common-infra-storage-firebase-sql-connect`: Firebase Data Connect
  backend storage provider adapter.
- `packages/mobile-infra-storage-realm`: Realm local storage and sync queue
  implementation.
- `packages/mobile-infra-storage-watermelondb`: WatermelonDB local storage
  implementation for future replacement or experiments.
- `packages/mobile-infra-observability-sentry`: Sentry mobile observability
  provider implementation.
- `packages/mobile-infra-observability-crashlytics`: Firebase Crashlytics
  mobile observability provider implementation.
- `packages/mobile-infra-analytics-firebase`: Firebase Analytics provider
  implementation.

Infrastructure implementations MUST remain isolated by technology and
responsibility. Technology-specific package names are mandatory. Generic
implementation packages such as `mobile-infra-storage` are prohibited when the
actual implementation is technology-specific.

Examples:

- GOOD: `mobile-infra-storage-realm`
- GOOD: `mobile-infra-storage-watermelondb`
- BAD: `mobile-infra-storage`

Infrastructure packages MAY be mobile-specific, web-specific, backend-specific,
or common/shared across platforms. If an implementation is genuinely reusable
between mobile and web, a `common-*` infrastructure package MUST be preferred
over duplicating platform-specific code.

The following rules are mandatory:

- The repository MUST use `pnpm`; a committed `pnpm-lock.yaml` is mandatory.
- Workspace packages MUST be declared in `pnpm-workspace.yaml`.
- Root package scripts MUST run through Turborepo pipelines.
- Cross-package dependencies MUST be explicit in each package's `package.json`.
- Production code MUST use TypeScript strict mode.
- Exported functions, component props, service contracts, ports, repositories,
  adapters, route handlers, DTOs, and shared models MUST use explicit types.
- `any` is prohibited unless the plan documents a temporary exception isolated
  behind a typed adapter.
- New runtime top-level folders outside `apps/`, `packages/`, `.github/`,
  `.specify/`, or `.agents/` MUST be justified in the plan.

Rationale: The product platform depends on replaceable infrastructure,
portable business rules, and independently evolving runtime applications.
Precise workspace boundaries reduce coupling and make replacement practical.

### II. Frontend Core, Backend Core, Infrastructure Isolation & Composition (NON-NEGOTIABLE)

The Core package is the platform-agnostic source of truth for behavior shared
by frontend runtimes, especially Mobile and Web. Core defines frontend-shared
domain models, domain services, ports/interfaces, repository contracts, use
cases, synchronization contracts, conflict-resolution rules, observability
ports, analytics ports, validation logic, and business rules.

Core MUST NOT instantiate concrete infrastructure implementations directly.
Core MUST NOT select providers, open databases, call SDKs, call HTTP clients,
access native modules, read application environment variables, or make runtime
composition decisions.

Core is responsible for:

- frontend-shared domain models, aggregates, entities, and value objects
- frontend-shared repository and provider ports/interfaces
- frontend-shared use cases and application services
- synchronization contracts and business rules
- conflict-resolution contracts
- analytics and observability ports
- authentication and authorization contracts when business rules require them
- validation logic and public package exports

Core is not responsible for:

- concrete repositories
- API clients
- local database drivers
- remote storage implementations
- analytics SDK implementations
- crash-reporting SDK implementations
- authentication SDK implementations
- AI provider SDK implementations
- runtime environment selection
- dependency injection container setup
- backend domain models, backend application services, backend repository
  ports, or backend provider contracts

The Backend Core package at `packages/backend-core` is the platform-agnostic
source of truth for backend behavior. It MUST contain backend domain models,
aggregates, entities, value objects, ports/interfaces, repository contracts,
use cases, and provider-neutral application-service implementations needed by
backend workflows. Backend business rules and orchestration that do not depend
on a provider SDK, database driver, HTTP server, or runtime selection MUST be
implemented in Backend Core. Backend Core MUST remain provider-neutral and
MUST NOT instantiate SDKs, database drivers, HTTP servers, or runtime
composition.

`apps/backend-api` MUST consume `packages/backend-core` from its composition
root and HTTP/delivery adapters. It MUST NOT own backend domain models,
repository/provider port contracts, provider-neutral backend application
services, or backend use-case implementations.

Backend infrastructure packages MUST depend on `packages/backend-core` to
implement its ports. They MUST keep concrete SDK/database access in dedicated
technology-specific adapters, and MUST NOT be imported by Mobile or Web unless
a separate approved frontend-facing contract expressly requires it.

Concrete infrastructure implementations MUST live in dedicated infrastructure
packages or, for frontend-only runtime concerns, platform-specific application
layers. Backend infrastructure implementations MUST NOT live inside
`apps/backend-api`. Composition and factories MUST live in final runtime
applications:

- `apps/mobile`
- `apps/web`
- `apps/backend-api`

Composition roots are responsible for:

- wiring Frontend Core or Backend Core ports to infrastructure implementations
- dependency injection
- provider selection
- environment-specific configuration
- feature-flag-aware composition
- runtime orchestration setup

Core MUST expose intentional public exports through package entry points.
Internal implementation details MUST remain non-exported unless required by a
documented use case. Any pre-v6 concrete adapter in Core MUST be treated as
legacy scaffolding and migrated when touched by related work.

Rationale: Frontend-shared Core and Backend Core remain portable and testable
when runtime applications own composition. A dedicated Backend Core lets
technology-specific backend infrastructure packages implement stable contracts
without illegally depending on an application workspace.

### III. Application Boundaries & Backend API

Each application has a narrow responsibility and MUST remain isolated from the
others except through explicit workspace package dependencies.

#### Mobile Application

The Mobile application is the main Expo React Native experience. It owns UI/UX,
navigation, accessibility, animations, mobile runtime composition, local
offline storage wiring, sync orchestration wiring, native integrations, and
mobile-specific infrastructure composition.

Mobile MUST consume Core for business rules and use cases. Mobile MUST compose
Core with infrastructure packages such as Realm storage, API client,
observability providers, analytics providers, and authentication adapters.
Mobile screens MUST NOT trigger synchronization directly.

#### Web Application

The Web application MUST use Next.js. It validates that Core services remain
portable outside React Native and MAY compose Core with common infrastructure
when a web feature requires it. For every new Core use case exposed to users,
Web MUST provide a simple page, interaction, or test harness that proves the
use case can run outside Mobile.

#### Landing Page Application

The Landing application MUST use Next.js. It owns public marketing pages, SEO,
product presentation, onboarding entry points, and future install references.
Landing MUST remain independent from business logic whenever possible and MUST
NOT depend on Core unless a future plan explicitly approves a lightweight
business requirement.

#### Backend API Application

The Backend API is an official monorepo application at `apps/backend-api`.
It MUST follow DDD, Clean Architecture, ports/adapters, and dependency
inversion. The Backend API owns HTTP delivery and runtime composition for
server-side use cases and providers, and MUST consume backend business
behavior and provider-neutral application-service implementations from
`packages/backend-core`.

The Backend API is responsible for:

- HTTP delivery for authentication and authorization workflows
- composition of AI providers for Backend Core orchestration use cases
- HTTP delivery for OCR, quiz, flashcard, and tutoring workflows
- push synchronization API delivery
- pull synchronization API delivery
- application version governance API delivery
- request validation and delivery mapping
- Firebase Data Connect persistence as the default backend storage provider
- PostgreSQL persistence as an approved alternate or migration/local-tooling
  provider when explicitly selected by an approved feature plan

Firebase Data Connect persistence implementations MUST live in a
technology-specific infrastructure package such as
`packages/common-infra-storage-firebase-sql-connect`, MUST implement repository
ports exported by `packages/backend-core`, and MUST be composed only by
`apps/backend-api`. Any approved direct PostgreSQL persistence implementation
MUST likewise live in a dedicated technology-specific backend infrastructure
package implementing `packages/backend-core` ports. Mobile, Web, Landing, and
frontend Core MUST NOT open direct backend database connections.

Google is the default authentication provider. Google authentication
implementations MUST live in `packages/common-infra-auth-google` or a
technology-specific successor package. Backend business rules MUST consume
authentication providers through `packages/backend-core` ports and MUST NOT
hardcode provider SDKs.

AI delivery and provider composition belong to the Backend API; provider-neutral
AI business orchestration MUST live in Backend Core. AI providers MUST be
abstracted through ports/interfaces. OpenAI implementations MUST live in
`packages/common-infra-ai-openai`; Google AI/Gemini implementations MUST live
in `packages/common-infra-ai-google`. The Backend API composes the selected
providers through ports defined by `packages/backend-core` for backend
orchestration.

Rationale: Applications own delivery and runtime concerns; Backend Core owns
backend business contracts and provider-neutral application-service
implementations. Backend behavior has its own delivery, security, and
persistence constraints. Firebase Data Connect is the default managed backend
store, while PostgreSQL remains approved without becoming a direct
cross-platform dependency.

### IV. Offline-First Mobile & Synchronization Architecture (NON-NEGOTIABLE)

The Mobile application MUST follow an offline-first architecture. The majority
of core mobile user flows MUST continue functioning without internet
connectivity. The local database is the primary source of truth for Mobile.

Realm is the default local storage technology. The architecture MUST support
future replacement of Realm through Core ports and dedicated infrastructure
packages such as `mobile-infra-storage-watermelondb`.

Mobile MUST NOT depend directly on remote APIs to render core user data. Core
user data MUST flow from local storage through Core use cases into UI. Remote
APIs participate through synchronization, not direct screen rendering.

The synchronization architecture MUST follow this flow:

```text
UI
-> Core Use Cases
-> Repository Ports
-> Local Realm Storage
-> Sync Queue
-> Sync Engine
-> Remote API Client
-> Backend API
-> Backend Persistence Provider (Firebase Data Connect by default; PostgreSQL
   when explicitly approved and composed)
```

Synchronization business rules and contracts MUST live in Core. Runtime
composition and orchestration wiring MUST live in Mobile. The
`common-api-client` package is responsible for HTTP communication, API DTOs,
sync API calls, and version-check API calls.

Synchronization MUST be centralized through a Sync Orchestrator. UI screens
MUST NOT trigger sync directly.

Synchronization MUST be triggered primarily during:

- application startup
- first application load
- profile updates
- lesson completion
- lesson progress updates
- new educational content generation
- new local entity creation
- application foreground resume
- network restoration after offline mode

Mobile MUST maintain a local synchronization queue using Realm. The queue
stores pending synchronization operations and MUST survive app restarts,
crashes, offline usage, and network interruptions.

Sync operation states MUST include at least:

- `pending`
- `processing`
- `failed`
- `done`
- `conflict`

The queue implementation belongs to the mobile infrastructure layer, not Core.

#### Push Synchronization API

The Backend API MUST expose a push synchronization endpoint. Push operations
MUST include:

- event name
- entity payload
- timestamps
- idempotency keys

Event names MUST be lowercase and underscore separated, such as
`lesson_completed`, `profile_updated`, and `flashcard_created`.

Push synchronization sends local pending operations to the Backend API.

#### Pull Synchronization API

The Backend API MUST expose a pull synchronization endpoint. The pull API MUST
support dynamic filters:

- `what`: event name or wildcard `*`
- `since`: optional date filter

Pull rules:

- `what = *` and `since` omitted MUST return everything.
- `what = specific_event` and `since` omitted MUST return all events of that
  type.
- `what = *` and `since` provided MUST return all changes since that date.
- `what = specific_event` and `since` provided MUST return matching event
  changes since that date.

#### Conflict Resolution

Synchronization MUST use `updatedAt` timestamps for conflict resolution. The
most recent `updatedAt` value wins by default.

Conflict rules:

- If local `updatedAt` is newer, Mobile MUST push local data to Backend API.
- If remote `updatedAt` is newer, Mobile MUST update local Realm data.
- If timestamps are equal, no update is required.

This is the default Last Updated Wins strategy. Future features MAY introduce
merge strategies, entity revisioning, or advanced conflict resolution only
through an approved plan and tests.

Rationale: Children and families need reliable core learning functionality even
when connectivity is unstable. Offline-first data flow keeps the app responsive
and makes synchronization observable, testable, and replaceable.

### V. Content Delivery Contract (NON-NEGOTIABLE)

All user-facing product content, including text, images, videos, learning
prompts, educational copy, marketing copy, localization strings, and equivalent
media metadata, MUST originate from a configured content source. Content source
selection MUST be explicit, typed, and isolated from presentational components.

The repository MUST contain separate platform content packages:

- `packages/content-mobile` with package name `@nobu/content-mobile`
- `packages/content-web` with package name `@nobu/content-web`
- `packages/content-landing` with package name `@nobu/content-landing`

Each platform content package owns its product content files, JSON content,
local assets, typed manifests, typed mappers, and platform-specific content
exports. Applications that require product content MUST declare an explicit
dependency on the matching platform package in their `package.json`.

The repository MUST also contain `packages/content-management` with package
name `@nobu/content-management`. This package owns shared business logic for
fetching content from a backend or future CMS, mapping CMS/backend payloads into
typed content models, validating content contracts, handling content versions,
and exposing content delivery use cases. Platform apps and content packages MAY
consume `@nobu/content-management` when backend/CMS delivery is introduced.

Mobile, Web, and Landing MUST NOT own product content files inside their app
source trees except for temporary test fixtures or app-shell placeholders
documented in the plan.

The platform content packages exist so content-only changes can be made and
versioned independently per delivery surface. When a platform content package is
published or versioned independently, its consuming app SHOULD update the
matching content package version rather than modifying app code for content-only
changes.

The supported content-source posture is:

- JSON is the default and currently implemented strategy.
- Strapi is the planned CMS strategy, but it is NOT implemented yet.
- No other CMS strategy is approved for this repository.

The active content strategy MUST be selected through typed configuration.
Until the Strapi adapter is implemented and approved, production features MUST
use JSON content as the default source.

Each platform content package MUST use the same internal structure. Platform
identity belongs to the package name, not to nested folders.

```text
packages/content-mobile/
  content/
    json/
    images/
    videos/

packages/content-web/
  content/
    json/
    images/
    videos/

packages/content-landing/
  content/
    json/
    images/
    videos/
```

JSON text content MUST live under each package's `content/json` folder. Local
image assets MUST live under `content/images`. Local video assets MUST live
under `content/videos`. Additional media type folders MAY be added only when a
plan documents the need and keeps the folder directly under `content/`.

Supported local asset types include PNG, JPG, JPEG, WebP, GIF, SVG, MP4, WebM,
MOV, Lottie JSON, fonts, icons, audio, and other product-approved media files.
Assets MUST be referenced through typed manifests or mappers exported by
the matching platform content package; app components MUST NOT deep-link into
arbitrary content package internals.

Web and Landing content delivery MUST prefer static output. When Web or Landing
uses backend/CMS content, content MUST be fetched during the Next.js build
phase, converted into typed content models, and rendered as static pages or
static assets unless an approved plan explicitly requires runtime dynamic
content. Client-side components MUST NOT fetch CMS documents directly.

Mobile content delivery MUST be offline-first. With the JSON strategy, Mobile
loads bundled content from `@nobu/content-mobile` onto the device. With a future
CMS/backend strategy, Mobile MUST fetch content only once at the authenticated
application start/login bootstrap, persist the fetched content into Realm, and
read content from Realm after bootstrap. Mobile content delivery MUST NOT be
triggered by foreground resume, network restoration, screen rendering, lesson
completion, profile updates, or other user-data sync triggers.

Mobile content stored in Realm is the local source of truth for app rendering
after login bootstrap. Content bootstrap orchestration MUST be centralized in
the Mobile composition layer and MUST consume typed use cases from
`@nobu/content-management` when CMS/backend delivery exists. UI screens MUST NOT
directly trigger content fetching.

Switching from JSON to Strapi MUST require an approved plan that defines
content models, typed ports, infrastructure adapters, required secrets, preview
behavior, caching rules, migration path, rollback path, and tests.

Future Strapi clients, delivery adapters, preview helpers, schema mappers, and
content fetching helpers MUST live inside `packages/content-management` unless
a plan explicitly justifies a technology-specific package. Strapi logic MUST
NOT live directly inside Mobile, Web, Landing, Backend API, Core, or the
platform content packages.

UI components MUST NOT embed business content directly as ad hoc literals and
MUST NOT fetch raw content documents inside presentational component code.
Components that render business content MUST receive typed view-model objects
mapped from the active content source.

Web and Landing applications MUST render images through Next.js `next/image`.
Raw HTML `img` tags MUST NOT be used directly for product, content-managed,
marketing, or UI images in `apps/web` or `apps/landing`. Exceptions are
allowed only for documented framework incompatibilities, third-party library
escape hatches, or non-visual test fixtures, and the plan and code review MUST
record the reason.

Rationale: JSON keeps the current product simple and repo-local while the
architecture remains ready for Strapi without leaking CMS decisions into Core
or UI components. Separate platform content packages let Mobile, Web, and
Landing evolve content independently, while `content-management` keeps
backend/CMS delivery rules reusable and testable. `next/image` keeps Web and
Landing image rendering optimized, accessible, and aligned with Next.js
delivery semantics.

### VI. Design System Standards (NON-NEGOTIABLE)

The product MUST use a project-owned design system. Agents MUST read and
follow these design-system references before implementing or reviewing UI:

- `.specify/design-system.md`
- `.specify/design-system-colors.md`
- `.specify/design-system-typography.md`

Shared design principles MAY be global, but runtime color and typography
tokens MUST be owned per application.

Required token ownership:

- `apps/mobile/src/design-system/tokens/colors.ts`
- `apps/mobile/src/design-system/tokens/typography.ts`
- `apps/web/src/design-system/tokens/colors.ts`
- `apps/web/src/design-system/tokens/typography.ts`
- `apps/landing/src/design-system/tokens/colors.ts`
- `apps/landing/src/design-system/tokens/typography.ts`

`packages/core` MUST NOT contain UI color tokens, typography tokens, visual
themes, component styling, or app-specific design assets. Components MUST
consume semantic tokens rather than hardcoded colors, font sizes, spacing,
radius, shadow, or motion values.

Next.js UI components in `apps/web` and `apps/landing` MUST use the Next.js
`Image` component from `next/image` for image rendering. Direct `img` elements
MUST be treated as constitution violations unless a documented exception is
approved in the feature plan and review.

Rationale: Nobu needs a product-owned visual system while preserving different
runtime constraints for Mobile, Web, and Landing.

### VII. React Native, Offline-First & Mobile Runtime Standards (NON-NEGOTIABLE)

The Mobile application MUST be designed primarily as a React Native mobile
application for iOS and Android. Expo is the standard React Native toolchain.

The Mobile app MUST use:

- Expo SDK and Expo CLI
- Expo Application Services for build, submit, update, and delivery workflows
- React Navigation
- React Native primitives
- React Native `StyleSheet`
- Jest and `@testing-library/react-native`
- app-owned design tokens

Mobile code MUST NOT assume Next.js, DOM APIs, HTML elements, CSS files, SSR,
SSG, server components, or browser-specific routing. Mobile UI MUST use React
Native primitives such as `View`, `Text`, `Image`, `Pressable`, `ScrollView`,
`FlatList`, and `SafeAreaView`.

Navigation MUST be centralized inside `apps/mobile/src/navigation`. Screens
MUST NOT directly control complex navigation rules. Route names and navigation
params MUST be typed.

React Native `StyleSheet` is the default styling mechanism. Mobile MUST NOT
use Tailwind, NativeWind, CSS modules, styled-components, or web CSS as the
default styling approach.

Mobile native capabilities such as camera, file picker, storage, secure
storage, push notifications, microphone, speech/audio, image processing,
observability, and analytics MUST be isolated behind typed ports and
technology-specific infrastructure packages.

Lottie is the standard animation technology for mobile avatars and educational
characters. Animation rendering MUST be wrapped in reusable components. Screens
MUST NOT directly import or control raw Lottie files.

Mobile accessibility is mandatory. Interactive elements MUST have accessible
labels, text MUST remain readable, touch targets MUST be mobile-appropriate,
and animations MUST NOT block core learning actions.

Rationale: The primary product experience is mobile. Native-first standards
coexist with portable business logic and replaceable infrastructure.

### VIII. Testing, Sync & Contract Validation Standards (NON-NEGOTIABLE)

All meaningful changes MUST ship with automated tests proportionate to risk.
The project MUST maintain at least 90% coverage for changed code and MUST
prevent regressions in domain logic, application services, UI components,
sync behavior, API contracts, privacy safeguards, and primary user flows.

Required validation categories:

- Core unit tests for domain logic, use cases, ports, validators, sync
  contracts, conflict-resolution rules, analytics ports, and observability
  ports.
- Backend Core unit tests for backend domain rules, provider-neutral use cases,
  application-service implementations, repository ports, and adapter
  contracts.
- Mobile tests for React Native rendering, navigation, local storage wiring,
  sync orchestrator behavior, queue state transitions, offline behavior,
  telemetry privacy safeguards, and crash/analytics provider abstraction.
- Web tests proving exposed Core use cases can run outside React Native.
- Landing tests for public rendering, SEO-critical behavior, and Core
  independence.
- Backend API tests for authentication, authorization, sync push/pull,
  version governance, AI orchestration contracts, validation, and selected
  storage-provider repository adapters.
- Contract tests for `common-api-client` DTOs, sync APIs, version APIs,
  provider ports, and infrastructure package boundaries.
- Content mapping tests for JSON content, CMS/backend payload mapping, and
  future Strapi adapters.
- Content package tests for platform package JSON files, asset manifests,
  typed exports, mapper stability, and app dependency boundaries.
- Mobile content delivery tests proving login-time bootstrap writes content to
  Realm and later rendering reads from Realm without additional fetch triggers.

Tests MUST mock external providers, remote APIs, native modules, and databases
unless the plan explicitly calls for integration tests. Sync tests MUST cover
offline queue survival, retry behavior, idempotency keys, and Last Updated Wins
conflict resolution when those paths are changed.

Rationale: Tests enforce architecture, not just behavior. Offline-first sync,
privacy, provider isolation, and backend API contracts are product integrity
risks and require explicit validation.

### IX. Observability, Analytics & Child Privacy (NON-NEGOTIABLE)

Logs, metrics, traces, crash reports, analytics events, and breadcrumbs MUST
make failures diagnosable without exposing child personal data or sensitive
educational content.

Crash reporting providers MUST be abstracted behind ports/interfaces defined
in Core. Concrete implementations MUST live in infrastructure packages or
platform-specific layers.

Recommended mobile observability packages:

- `packages/mobile-infra-observability-sentry`
- `packages/mobile-infra-observability-crashlytics`

Crash reporting MUST support:

- JavaScript exceptions
- React Native runtime errors
- native iOS crashes
- native Android crashes
- ANRs
- sync failures
- offline-first synchronization issues
- offline buffering when connectivity is unavailable
- release tracking and issue correlation with deployments

Crash reports MUST automatically associate safe operational metadata when
available:

- app version
- build number
- device OS
- platform
- release channel
- feature flags

Structured breadcrumbs MUST exist for critical flows such as app startup,
authentication, synchronization, lesson completion, quiz submission, avatar
interactions, API requests, and offline queue processing.

Firebase Analytics is the default analytics provider. Analytics providers MUST
be abstracted through ports/interfaces defined in Core. Concrete
implementations MUST live in infrastructure packages, with
`packages/mobile-infra-analytics-firebase` as the default mobile package.

Analytics events MUST support offline buffering and delayed synchronization
when connectivity is unavailable. Analytics MUST focus on engagement,
performance, navigation, feature usage, and learning-flow metrics.

Sensitive child data MUST NEVER be sent to analytics, crash reporting, logs,
traces, telemetry, or external observability providers.

Forbidden telemetry data:

- uploaded PDF content
- child names
- free text answers
- photos
- OCR extracted educational content
- voice recordings
- sensitive educational data
- credentials, raw tokens, cookies, or secrets

The system MUST prefer anonymized identifiers, aggregated metrics, data
minimization, and safe operational telemetry. The platform MUST remain aligned
with child-oriented privacy standards whenever applicable.

Rationale: Observability is mandatory for operational safety, but Nobu handles
child-oriented learning flows. Privacy constraints are therefore architecture
rules, not implementation preferences.

### X. Runtime, Version Governance, Tooling & CI

The repository MUST support efficient local development across all packages and
applications. Continuous integration and deployment automation MUST use GitHub
Actions as the source-controlled CI/CD system.

Runtime and tooling rules:

- Root commands MUST use `pnpm`.
- Root orchestration MUST use Turborepo.
- Node.js version MUST be documented through `.nvmrc`, package metadata, or CI
  configuration.
- ESLint MUST be used for linting.
- Prettier MUST be used for formatting.
- CI MUST run linting, type checks, tests, and builds through Turborepo.
- CI MUST respect package boundaries and use Turborepo filters when practical.
- Workflow secrets MUST come from GitHub Actions secrets or protected
  environments and MUST NOT be committed or echoed in logs.

GitHub Actions workflow files MUST live under `.github/workflows`. Separate
workflow files MUST exist for official applications and primary reusable
packages when they have independent checks, secrets, previews, or deployment
paths.

Required application workflow ownership:

- `.github/workflows/mobile-ci.yml` for `apps/mobile`
- `.github/workflows/web-ci.yml` for `apps/web`
- `.github/workflows/landing-ci.yml` for `apps/landing`
- `.github/workflows/backend-api-ci.yml` for `apps/backend-api`
- `.github/workflows/core-ci.yml` for `packages/core`
- `.github/workflows/backend-core-ci.yml` for `packages/backend-core` once that
  package is introduced, unless its checks are explicitly included in the
  consuming backend workflow

Infrastructure package changes MUST be validated by either a dedicated
package workflow or the affected consuming application/backend workflow.
Missing commands are allowed only during initial scaffolding and MUST be
represented by explicit temporary no-op scripts documented in the plan.

#### Application Version Governance

The application MUST implement backend-driven version governance. Mobile MUST
check application version on startup through the Backend API.

The Backend API version endpoint MUST compare:

- installed app version
- latest available version
- minimum supported version
- platform

Allowed responses:

- `force_update`: user cannot continue until updating the app.
- `optional_update`: update is available but not mandatory.
- `up_to_date`: no update is required.

Optional update responses MAY include release notes, update summaries, and
feature highlights. The product MUST prefer backend-driven version governance
instead of relying exclusively on App Store or Play Store mechanisms.

Rationale: A multi-application monorepo succeeds only when local commands,
CI/CD workflows, and runtime version decisions are explicit and enforceable.

### XI. Security, Documentation & Dependency Discipline

Security hygiene, documentation, and controlled dependencies are mandatory
deliverables for every feature.

The following rules apply:

- Secrets MUST NOT be hardcoded in source files, test fixtures, mobile
  bundles, web bundles, logs, analytics events, or error payloads.
- Secrets MUST be accessed through dedicated providers or typed configuration
  services.
- Public-facing code MUST consume only values explicitly intended for client
  exposure.
- Authentication, authorization, AI, analytics, observability, storage, sync,
  and API client dependencies MUST be justified by feature needs and isolated
  behind ports/adapters.
- New libraries MUST be justified by maintenance quality, security posture,
  bundle impact, mobile performance, runtime portability, and replacement cost.
- Deprecated or redundant packages MUST be removed when touched by related
  work.
- `README.md` MUST be updated when a change introduces or alters setup,
  runtime commands, environment variables, scripts, CI steps, package
  boundaries, architecture rules, or integration steps.
- API-facing features MUST keep route contracts and API documentation current.
- Complex orchestration logic SHOULD include concise architectural notes.

Rationale: Shared packages increase leverage and blast radius. Security,
documentation, and dependency discipline keep the monorepo understandable and
safe to evolve.

## Additional Constraints

The project is a pnpm/Turborepo monorepo containing a platform-agnostic
frontend Core package, a platform-agnostic Backend Core package, Expo React
Native Mobile app, Next.js Web app, Next.js Landing app, Backend API app,
shared configuration/design packages, common API client, and
technology-specific infrastructure packages.

The default root structure is:

```text
apps/
  mobile/
  web/
  landing/
  backend-api/
packages/
  core/
  backend-core/
  config/
  design-system/
  content-mobile/
  content-web/
  content-landing/
  content-management/
  common-api-client/
  common-infra-auth-google/
  common-infra-ai-openai/
  common-infra-ai-google/
  common-infra-storage-firebase-sql-connect/
  mobile-infra-storage-realm/
  mobile-infra-storage-watermelondb/
  mobile-infra-observability-sentry/
  mobile-infra-observability-crashlytics/
  mobile-infra-analytics-firebase/
.github/
.specify/
.agents/
```

Folder names MUST communicate architectural intent. Nested organization under
approved roots MUST preserve responsibility boundaries. External integrations
for AI, OCR, storage, analytics, camera, documents, network providers,
authentication, and observability MUST be isolated behind typed ports and
technology-specific adapters.

JSON content is the default content source. Strapi is planned only and MUST
NOT be introduced without an approved feature plan.
Product content and content-managed assets MUST live in `packages/content-mobile`,
`packages/content-web`, or `packages/content-landing`, not directly inside
consuming application source trees. Backend/CMS content fetching business logic
MUST live in `packages/content-management`.

## Deployment Requirements

Deployment targets are application-specific and MUST be documented per app.
The monorepo MUST NOT assume that all packages deploy to the same runtime.

Deployment rules:

- `packages/core` MUST build as a reusable NPM package.
- `packages/backend-core` MUST build as a reusable backend-domain package that
  concrete backend infrastructure adapters and `apps/backend-api` can consume.
- `apps/mobile` MUST use Expo Application Services as the default build,
  submit, update, and deployment toolchain.
- `apps/mobile/eas.json` MUST define development, preview, and production
  profiles.
- Mobile release documentation MUST cover Expo SDK version, EAS profiles,
  build commands, submit commands, update channels, credentials, app
  identifiers, runtime versions, rollback paths, and environment-specific
  configuration.
- `apps/web` MUST document its Next.js deployment target when deployment is
  introduced.
- `apps/landing` MUST document its Next.js deployment target when deployment is
  introduced.
- `apps/backend-api` MUST document its hosting target, selected persistence
  provider strategy (Firebase Data Connect by default and any explicitly
  approved PostgreSQL usage), secrets, schema/migration strategy, health
  checks, rollback path, and deployment gates before deployment is enabled.
- CI failures in linting, type checks, tests, builds, required contract tests,
  or required end-to-end tests MUST block merge or deployment.
- Coverage thresholds configured by the repository MUST be enforced in CI.

## Approved Technology Stack

The approved baseline technology stack is:

- pnpm for package management
- Turborepo for monorepo orchestration
- TypeScript with strict mode
- React Native and Expo for `apps/mobile`
- Expo Application Services for mobile build, submit, update, and deployment
- React Navigation for mobile navigation
- Realm as the default mobile local database
- WatermelonDB as an approved future mobile local database alternative
- Next.js for `apps/web` and `apps/landing`
- Tailwind CSS for `apps/web` and `apps/landing`
- React Native `StyleSheet` for `apps/mobile`
- `@nobu/content-mobile` for mobile JSON content, local content assets, typed
  mappers, and bundled mobile content exports
- `@nobu/content-web` for web JSON content, local content assets, typed
  mappers, and Next.js build-time content exports
- `@nobu/content-landing` for landing JSON content, local content assets,
  typed mappers, and Next.js build-time content exports
- `@nobu/content-management` for backend/CMS content fetching, payload
  mapping, content versioning, validation, and future Strapi logic
- Backend API app using DDD, Clean Architecture, ports/adapters, and
  dependency inversion
- `@nobu/backend-core` for backend domain aggregates, value objects, ports,
  repository contracts, use cases, and provider-neutral application-service
  implementations
- Firebase Data Connect for default backend persistence
- PostgreSQL as an approved backend persistence alternative for explicitly
  planned environments, migrations, or local tooling
- Google authentication as the default authentication provider
- OpenAI and Google AI/Gemini as approved AI provider families
- Sentry and Firebase Crashlytics as approved mobile observability providers
- Firebase Analytics as the default analytics provider
- GitHub Actions for CI/CD workflow automation
- Jest for unit and component tests
- `@testing-library/react-native` for mobile component tests
- ESLint for linting
- Prettier for formatting

Specific dependency versions MUST be selected deliberately during project
setup, recorded in package manifests, and reviewed when upgraded.

## Development Workflow

All feature work MUST follow the Spec Kit workflow and MUST prove compliance
with this constitution before implementation is considered complete.

1. **Specification Phase**:
   - Capture prioritized user stories, acceptance criteria, edge cases,
     assumptions, affected workspaces, delivery impact, privacy impact, and
     data ownership.
2. **Planning Phase**:
   - Document the technical design, workspace boundaries, package structure,
     dependency direction, composition roots, data model, storage ownership,
     CI impact, deployment impact, and constitution check.
   - For frontend Core changes, document domain models, use cases, ports,
     repository contracts, synchronization contracts, telemetry ports, and
     public exports.
   - For Backend Core changes, document backend domain aggregates, value
     objects, provider-neutral use-case and application-service
     implementations, ports, repository contracts, public exports, and the
     consuming backend composition root.
   - For infrastructure changes, document the technology-specific package,
     implemented ports, provider SDK, replacement strategy, tests, and
     consuming composition root.
   - For Mobile changes, document offline-first impact, Realm/local storage
     impact, sync queue impact, Sync Orchestrator impact, React Navigation
     impact, Expo/EAS impact, accessibility, performance, observability, and
     analytics privacy.
   - For Backend API changes, document `packages/backend-core` dependencies,
     delivery/composition boundaries, selected infrastructure adapters and any
     approved PostgreSQL provider, auth/authorization, AI provider composition,
     sync API contracts, version governance, and deployment impact.
   - For Web and Landing changes, document Next.js routing, Tailwind/design
     token usage, `next/image` usage for image rendering, Core interaction or
     Core independence, SEO impact, and public content mapping.
   - For content-driven changes, document the affected platform content package,
     `content/json`, `content/images`, `content/videos`, typed content model,
     manifest/mapping layer, app package dependency, fallback behavior, and
     future Strapi assumptions.
   - For CMS/backend content delivery, document `packages/content-management`,
     Web/Landing build-time fetching, and Mobile login-time bootstrap into
     Realm with no additional content fetch triggers.
3. **Task Breakdown**:
   - Organize tasks by user story for independent delivery.
   - Include tasks for tests, Frontend Core or Backend Core ports and
     provider-neutral application services, adapters, composition roots, sync
     contracts, API contracts, privacy checks,
     observability/analytics safeguards, documentation, package exports,
     Turborepo scripts, and CI changes when required by the feature.
4. **Implementation Phase**:
   - Keep code and tests in the same change set.
   - Verify linting, type checks, tests, builds, and formatting before review.
   - Use root `pnpm` and Turborepo commands unless a package-specific command
     is documented and justified.
5. **Review & Deployment Phase**:
   - Reviewers MUST verify constitution compliance, package boundaries,
     dependency direction, user-story behavior, privacy safeguards, and
     rollback readiness for production-impacting changes.

Branching strategy:

- `main`: production-ready code only.
- `develop`: integration branch for ongoing work when the repository uses it.
- Feature branches: `feature/<work-item>` or the team-standard ticket format.
- Hotfix branches: `hotfix/<work-item>` for urgent production fixes.

## Governance

This constitution supersedes informal local practices for architecture,
delivery, privacy, and quality gates in this repository.

Amendment and compliance rules:

- Constitution changes MUST document rationale, impact, and any migration plan.
- Versioning follows semantic versioning for governance:
  - **MAJOR**: backward-incompatible principle changes, removals, or material
    redefinitions.
  - **MINOR**: new principles, new mandatory sections, or materially expanded
    guidance that does not redefine existing obligations.
  - **PATCH**: clarifications, wording improvements, or non-semantic cleanup.
- All feature plans MUST include a constitution check before implementation.
- Code reviews MUST explicitly verify compliance with relevant principles.
- GitHub Actions CI MUST enforce automated quality gates for linting, type
  checking, tests, build validation, and configured coverage thresholds.
- Dependent templates and guidance documents MUST be reviewed whenever this
  constitution changes.
- Exceptions to the constitution MUST be rare, time-boxed, documented in the
  plan and PR, and approved by responsible maintainers.
- A periodic review SHOULD be performed to remove outdated guidance and keep
  the constitution aligned with the actual stack and workflow.

**Version**: 7.1.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-05-29
