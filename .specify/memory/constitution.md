
# Valentines Monorepo Constitution

## Core Principles

### I. Monorepo Architecture, Workspace Boundaries & Type Safety (NON-NEGOTIABLE)

This repository MUST be maintained as a TypeScript `pnpm` workspace monorepo
orchestrated by Turborepo. Runtime code MUST live under approved `apps/` or
`packages/` workspaces, and package boundaries MUST communicate architectural
responsibility.

The approved application workspace is:

- `apps/landing`: public Next.js marketing and product experience application.

The approved shared package families are:

- `packages/core`: platform-agnostic domain, ports, use cases, contracts, and
  business rules shared by runtime applications.
- `packages/design-system`: shared design-system foundations.
- `packages/content-landing`: landing product content package for build-time
  JSON, local assets, typed manifests, and landing content exports.
- `packages/content-management`: shared business logic package for fetching,
  mapping, validating, caching, and versioning content from backend/CMS sources.

Infrastructure implementations MUST remain isolated by technology and
responsibility. Technology-specific package names are mandatory.

Examples:

- GOOD: `runtime-infra-storage-realm`
- GOOD: `runtime-infra-storage-watermelondb`
- BAD: `runtime-infra-storage`

Infrastructure packages MAY be runtime-specific or common/shared across
applications. If an implementation is genuinely reusable across runtimes, a
`common-*` infrastructure package SHOULD be preferred over duplicating
runtime-specific code.

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

### II. Frontend Core, Infrastructure Isolation & Composition (NON-NEGOTIABLE)

The Core package is the platform-agnostic source of truth for behavior shared
by frontend runtimes. Core defines frontend-shared domain models, domain
services, ports/interfaces, repository contracts, use cases, synchronization
contracts, conflict-resolution rules, observability ports, analytics ports,
validation logic, and business rules.

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

The `packages/core` package is the platform-agnostic source of truth for
behavior shared by runtime applications. It MUST contain domain models,
aggregates, entities, value objects, ports/interfaces, repository contracts,
use cases, and provider-neutral application-service implementations needed by
landing workflows. Core business rules that do not depend on a provider SDK,
database driver, HTTP server, or runtime selection MUST be implemented in
Core. Core MUST remain provider-neutral and MUST NOT instantiate SDKs, database
drivers, HTTP servers, or runtime composition.

Concrete infrastructure implementations MUST live in dedicated infrastructure
packages or, for frontend-only runtime concerns, platform-specific application
layers. Composition and factories MUST live in final runtime applications:

- `apps/landing`

Composition roots are responsible for:

- wiring Core ports to infrastructure implementations
- dependency injection
- provider selection
- environment-specific configuration
- feature-flag-aware composition
- runtime orchestration setup

Core MUST expose intentional public exports through package entry points.
Internal implementation details MUST remain non-exported unless required by a
documented use case. Any pre-v6 concrete adapter in Core MUST be treated as
legacy scaffolding and migrated when touched by related work.

Rationale: Frontend-shared Core remains portable and testable when runtime
applications own composition. Dedicated server-side infrastructure packages
may be introduced only as separate, approved workspaces.

### III. Application Boundaries

Each application has a narrow responsibility and MUST remain isolated from the
others except through explicit workspace package dependencies.

#### Landing Page Application

The Landing application MUST use Next.js. It owns public marketing pages, SEO,
product presentation, onboarding entry points, and future install references.
Landing MUST remain independent from business logic whenever possible and MUST
NOT depend on Core unless a future plan explicitly approves a lightweight
business requirement.

#### Future Backend API Workspace

This monorepo currently does not include a backend API application. Any
future backend API workspace must be introduced through an approved
architecture change and aligned with the current Core, content, and design-system
packages.


### V. Content Delivery Contract (NON-NEGOTIABLE)

All user-facing product content, including text, images, videos, learning
prompts, educational copy, marketing copy, localization strings, and equivalent
media metadata, MUST originate from a configured content source. Content source
selection MUST be explicit, typed, and isolated from presentational components.

The repository MUST contain a platform content package:

- `packages/content-landing` with package name `@nobu/content-landing`

This package owns product content files, JSON content, local assets, typed
manifests, typed mappers, and platform-specific content exports for landing.
Applications that require product content MUST declare an explicit dependency
on the matching package in their `package.json`.

The repository MUST also contain `packages/content-management` with package
name `@nobu/content-management`. This package owns shared business logic for
fetching content from a backend or future CMS, mapping CMS/backend payloads into
typed content models, validating content contracts, handling content versions,
and exposing content delivery use cases.

Landing MUST NOT own product content files inside its source tree except for
temporary test fixtures or app-shell placeholders documented in the plan.

The content packages exist so content-only changes can be made and versioned
independently of application code. When a content package is versioned
independently, its consuming app SHOULD update the matching package version
rather than modifying app code for content-only changes.

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
packages/content-landing/
  content/
    json/
    images/
    videos/
```

JSON text content MUST live under `content/json`. Local image assets MUST live
under `content/images`. Local video assets MUST live under `content/videos`.
Additional media type folders MAY be added only when a plan documents the need
and keeps the folder directly under `content/`.

Supported local asset types include PNG, JPG, JPEG, WebP, GIF, SVG, MP4, WebM,
MOV, Lottie JSON, fonts, icons, audio, and other product-approved media files.
Assets MUST be referenced through typed manifests or mappers exported by the
content package; app components MUST NOT deep-link into arbitrary content
package internals.

Landing content delivery MUST prefer static output. When Landing uses backend/
CMS content, content MUST be fetched during the Next.js build phase, converted
into typed content models, and rendered as static pages or static assets unless
an approved plan explicitly requires runtime dynamic content. Client-side
components MUST NOT fetch CMS documents directly.

Switching from JSON to Strapi MUST require an approved plan that defines
content models, typed ports, infrastructure adapters, required secrets, preview
behavior, caching rules, migration path, rollback path, and tests.

Future Strapi clients, delivery adapters, preview helpers, schema mappers, and
content fetching helpers MUST live inside `packages/content-management` unless a
plan explicitly justifies a technology-specific package. Strapi logic MUST NOT
live directly inside any application runtime, Core, or the platform content
packages.

UI components MUST NOT embed business content directly as ad hoc literals and
MUST NOT fetch raw content documents inside presentational component code.
Components that render business content MUST receive typed view-model objects
mapped from the active content source.


UI components MUST NOT embed business content directly as ad hoc literals and
MUST NOT fetch raw content documents inside presentational component code.
Components that render business content MUST receive typed view-model objects
mapped from the active content source.

Landing applications MUST render images through Next.js `next/image`.
Raw HTML `img` tags MUST NOT be used directly for product, content-managed,
marketing, or UI images in `apps/landing`. Exceptions are allowed only for
documented framework incompatibilities, third-party library escape hatches,
or non-visual test fixtures, and the plan and code review MUST record the
reason.

#### First-Version Romantic Journey Exception

Feature `001-romantic-journey-website` is granted a temporary first-version
exception to keep relationship-specific text, photos, icons, fonts, and audio
inside `apps/landing` instead of `packages/content-landing`. This exception is
limited to the first static gift-page version because the content is bespoke,
private, and not intended to be product-managed or reused across applications.

For this exception, typed in-app content models and local static asset paths MAY
be used in `apps/landing`, including under `apps/landing/src/data` and
`apps/landing/public/assets`. The feature plan and tasks MUST explicitly record
the exception, and the implementation MUST still keep presentational components
receiving typed view-model data rather than scattering copy literals throughout
component bodies.

The exception MUST be revisited before any second version, reusable landing
experience, content-management migration, CMS integration, or public product
content expansion. At that point, relationship content and managed assets MUST
move to `packages/content-landing` with typed manifests or mappers.

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

Approved brand typography for the product identity MUST be captured in
application token files and design-system documentation: `Parisienne` and
`Great Vibes` for main titles and large expressive headlines, and `Cormorant
Garamond` for subtitles, section headings, and supporting typographic accents.

Color tokens MUST be derived from the approved design reference artwork in
`assets/desktop/` and reflect the product’s core palette, semantic UI states,
and accessibility contrast needs. Brand palette guidance MUST be documented
in `.specify/design-system-colors.md` and application token files.

Required token ownership:

- `apps/landing/src/design-system/tokens/colors.ts`
- `apps/landing/src/design-system/tokens/typography.ts`

`packages/core` MUST NOT contain UI color tokens, typography tokens, visual
themes, component styling, or app-specific design assets. Components MUST
consume semantic tokens rather than hardcoded colors, font sizes, spacing,
radius, shadow, or motion values.

Next.js UI components in `apps/landing` MUST use the Next.js `Image`
component from `next/image` for image rendering. Direct `img` elements MUST be
treated as constitution violations unless a documented exception is approved in
the feature plan and review.

Feature `001-romantic-journey-website` is granted a temporary first-version
exception to keep romantic color and typography declarations in
`apps/landing/src/app/globals.css` while the gift-page visual system is being
proven. The first-version implementation MAY use CSS variables and font-face
declarations in `globals.css` for this feature, provided the implementation
keeps the declarations feature-scoped and does not add UI tokens to
`packages/core`. This exception MUST be revisited before a second version or
reusable product theme work, when app-owned token files should be introduced.

Rationale: Valentines needs a product-owned visual system while anchoring the
brand identity in the approved typography and color palette.


### VIII. Testing, Sync & Contract Validation Standards (NON-NEGOTIABLE)

All meaningful changes MUST ship with automated tests proportionate to risk.
The project MUST maintain at least 90% coverage for changed code and MUST
prevent regressions in domain logic, application services, UI components,
sync behavior, API contracts, privacy safeguards, and primary user flows.

Required validation categories:

- Core unit tests for domain logic, use cases, ports, validators, analytics
  ports, observability ports, and shared package behavior.
- Content management package tests for shared content delivery business logic,
  content contract validation, and typed model mapping.
- Landing tests for public rendering, SEO-critical behavior, content package
  consumption, and Core independence.
- Content mapping tests for JSON content, CMS/backend payload mapping, and
  future Strapi adapters.
- Content package tests for JSON files, asset manifests, typed exports, mapper
  stability, and app dependency boundaries.

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

Crash reporting providers MUST be abstracted behind ports/interfaces defined
in Core. Concrete implementations MUST live in infrastructure packages or
platform-specific layers.

Crash reporting MUST support:

- JavaScript exceptions
- runtime errors
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
interactions, API requests, and operational queue processing.

Firebase Analytics is the default analytics provider. Analytics providers MUST
be abstracted through ports/interfaces defined in Core. Concrete
implementations MUST live in infrastructure packages.

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

Required application/workflow ownership:

- `.github/workflows/landing-ci.yml` for `apps/landing`
- `.github/workflows/core-ci.yml` for `packages/core`

Infrastructure package changes MUST be validated by either a dedicated
package workflow or the affected consuming application workflow.
Missing commands are allowed only during initial scaffolding and MUST be
represented by explicit temporary no-op scripts documented in the plan.

#### Application Version Governance

Version governance and runtime upgrade strategies are currently out of scope
for this Landing-only repository. Any future versioning strategy involving a
server endpoint or runtime gating MUST be introduced through an approved
architecture change.

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
frontend Core package, a shared design-system package, a landing Next.js
application, content packages, and technology-specific infrastructure packages.

The default root structure is:

```text
apps/
  landing/
packages/
  core/
  design-system/
  content-landing/
  content-management/
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
Product content and content-managed assets MUST live in `packages/content-landing`,
not directly inside consuming application source trees. Backend/CMS content
fetching business logic MUST live in `packages/content-management`.

## Deployment Requirements

Deployment targets are application-specific and MUST be documented per app.
The monorepo MUST NOT assume that all packages deploy to the same runtime.

Deployment rules:

- `packages/core` MUST build as a reusable NPM package.
- `apps/landing` MUST document its Next.js deployment target when deployment is
  introduced.
- `apps/landing` deployment documentation MUST include hosting target,
  static build strategy, CDN/cache configuration, secrets, site metadata,
  health checks, rollback path, and deployment gates before deployment is
  enabled.
- CI failures in linting, type checks, tests, builds, required contract tests,
  or required end-to-end tests MUST block merge or deployment.
- Coverage thresholds configured by the repository MUST be enforced in CI.

## Approved Technology Stack

The approved baseline technology stack is:

- pnpm for package management
- Turborepo for monorepo orchestration
- TypeScript with strict mode
- Next.js for `apps/landing`
- Tailwind CSS for `apps/landing`
- `@nobu/content-landing` for landing JSON content, local content assets,
  typed mappers, and build-time landing content exports
- `@nobu/content-management` for shared content delivery business logic,
  backend/CMS payload mapping, content versioning, validation, and future
  Strapi integration
- `packages/core` for platform-agnostic domain models, use cases, ports, and
  shared business rules
- `packages/design-system` for shared design-system foundations
- Google authentication as the default authentication provider
- OpenAI and Google AI/Gemini as approved AI provider families
- Sentry and Firebase Crashlytics as approved observability providers
- Firebase Analytics as an approved analytics provider
- GitHub Actions for CI/CD workflow automation
- Jest for unit and component tests
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
   - For Core changes, document domain aggregates, value objects, provider-
     neutral use-case and application-service implementations, ports, repository
     contracts, public exports, and the consuming composition root.
   - For infrastructure changes, document the technology-specific package,
     implemented ports, provider SDK, replacement strategy, tests, and
     consuming composition root.
   - For Landing changes, document Next.js routing, Tailwind/design token usage,
     `next/image` usage for image rendering, Core interaction or
     Core independence, SEO impact, and public content mapping.
   - For content-driven changes, document the affected platform content package,
     `content/json`, `content/images`, `content/videos`, typed content model,
     manifest/mapping layer, app package dependency, fallback behavior, and
     future Strapi assumptions.
   - For CMS/backend content delivery, document `packages/content-management`,
     Landing build-time fetching, and any runtime content hydration requirements.
3. **Task Breakdown**:
   - Organize tasks by user story for independent delivery.
   - Include tasks for tests, Core ports and provider-neutral application
     services, adapters, composition roots, sync
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

**Version**: 7.2.1 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-06-09
