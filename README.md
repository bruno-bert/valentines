# Nobu

Nobu is a TypeScript pnpm/Turborepo monorepo for mobile, web, landing, backend
API, Core business logic, and technology-specific infrastructure packages.

- `packages/core`: reusable Core package with Clean Architecture boundaries.
- `packages/backend-core`: reusable backend domain, ports, use cases, and
  provider-neutral application-service implementations.
- `apps/mobile`: Expo React Native app consuming Core.
- `apps/web`: Next.js application consuming Core.
- `apps/landing`: Next.js landing page with standalone content.
- `apps/backend-api`: backend API for auth, sync, AI orchestration, version
  governance, and composed server persistence.
- `packages/config`: shared project configuration foundation.
- `packages/design-system`: shared TypeScript design-token foundation.
- `packages/content-mobile`: mobile content package with bundled JSON and
  local assets.
- `packages/content-web`: web content package for Next.js build-time content.
- `packages/content-landing`: landing content package for Next.js build-time
  content.
- `packages/content-management`: shared content fetching, mapping, validation,
  versioning, and future Strapi/CMS business logic.
- `packages/common-api-client`: shared API DTO and HTTP client package.
- `packages/common-infra-*`: shared technology-specific provider adapters.
- `packages/mobile-infra-*`: mobile-specific storage, observability, and
  analytics adapters.

## Requirements

- Node.js 22, matching `.nvmrc`
- pnpm via Corepack

```bash
corepack enable
corepack prepare pnpm@10.12.1 --activate
pnpm install
```

## Root Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format
```

## Run Applications

```bash
pnpm --filter @nobu/mobile dev
# to run in physical phone (so it reaches the backend correctly)
EXPO_PUBLIC_NOBU_API_BASE_URL=http://192.168.1.12:3001 pnpm --filter @nobu/mobile dev
EXPO_PUBLIC_NOBU_API_BASE_URL=https://api.nobueduca.com pnpm --filter @nobu/mobile dev
pnpm --filter @nobu/web dev
pnpm --filter @nobu/landing dev
pnpm --filter @nobu/common-infra-storage-postgresql db:start # optional local adapter tooling
NOBU_BACKEND_STORAGE=firebase pnpm --filter @nobu/backend-api dev
```

## Firebase SQL Connect Setup

Firebase SQL Connect service configuration, schema, and connectors are owned by
`packages/common-infra-storage-firebase-sql-connect`. Run setup and deployment
through that workspace so Firebase uses the package-owned configuration:

```bash
# Validate the schema and connector definitions.
pnpm --filter @nobu/common-infra-storage-firebase-sql-connect dataconnect:compile

# Review the SQL changes required in the hosted Cloud SQL database.
pnpm --filter @nobu/common-infra-storage-firebase-sql-connect dataconnect:diff

# Apply the reviewed SQL schema migration.
pnpm --filter @nobu/common-infra-storage-firebase-sql-connect dataconnect:migrate

# Deploy the SQL Connect schema and connector.
pnpm --filter @nobu/common-infra-storage-firebase-sql-connect dataconnect:deploy
```

`dataconnect:migrate` changes the hosted database schema. Review the output of
`dataconnect:diff` before running it.

## Landing Deployment

The static landing site is validated and deployed through
`.github/workflows/landing-ci.yml`. On pushes to `develop`, the workflow calls
the Render static-site deploy hook after the landing validation job succeeds.

Add `RENDER_DEPLOY_HOOK_URL` as a GitHub repository secret containing the full
Render deploy hook URL for the landing static site. Treat this URL as a secret:
anyone with it can trigger a deployment.

## Firebase Backend API Deployment

The backend API deploys as the Firebase HTTP Function `backendApi`; its
Functions configuration is owned by `apps/backend-api`, while Firebase SQL
Connect schema and connector files remain owned by their infrastructure
package.

```bash
# Build the deployable Firebase Function artifact.
pnpm --filter @nobu/backend-api functions:build

# Configure one-day cleanup for stored Functions build container images.
pnpm --filter @nobu/backend-api functions:artifacts:setpolicy

# Deploy the HTTP function after SQL Connect has been migrated/deployed.
pnpm --filter @nobu/backend-api functions:deploy
```

On pushes to `develop`, `.github/workflows/backend-api-ci.yml` authenticates
with Google Application Default Credentials and performs the deployment
sequence after local validation:

```text
SQL Connect compile/generate/diff -> compatible SQL migration -> SQL Connect deploy -> Functions artifact cleanup policy -> Functions deploy
```

Add `FIREBASE_SERVICE_ACCOUNT_JSON` as a GitHub repository secret containing
the complete service-account JSON document. It is used by the authenticated
Data Connect validation and deployment jobs. The `firebase-develop` GitHub
Environment can be protected with an approval rule for controlled database
changes.

### Firebase Deployment Prerequisites

Before running the CI deployment flow, verify the service account represented
by `firebase-service-account.json` and stored in
`FIREBASE_SERVICE_ACCOUNT_JSON` has these IAM roles in project `nobu-29ce3`:

- **Cloud SQL Admin** (`roles/cloudsql.admin`): required for SQL Connect schema migration/deployment.
- **Cloud Functions Admin** (`roles/cloudfunctions.admin`): required for backend API Function deployment.
- **Service Account User** (`roles/iam.serviceAccountUser`): may be required for the CI service account to deploy a Function that runs as the Firebase Functions/Cloud Run runtime service account.
- **Artifact Registry Administrator** (`roles/artifactregistry.admin`): required for CI to configure the Functions build-image cleanup policy; it grants the required `artifactregistry.repositories.update` permission.

Enable these project APIs before deploying:

- **Cloud Billing API**: required for SQL Connect and Functions deployment eligibility checks. [Enable Cloud Billing API](https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com?project=nobu-29ce3)
- **Cloud Build API**: required to build and deploy Firebase Functions. [Enable Cloud Build API](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=nobu-29ce3)
- **Artifact Registry API**: stores Functions build container images and their cleanup policy. [Enable Artifact Registry API](https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=nobu-29ce3)
- **Eventarc API**: required by Firebase Functions deployment infrastructure. [Enable Eventarc API](https://console.cloud.google.com/apis/library/eventarc.googleapis.com?project=nobu-29ce3)
- **Cloud Run Admin API**: required for second-generation Firebase Functions runtime provisioning. [Enable Cloud Run Admin API](https://console.cloud.google.com/apis/library/run.googleapis.com?project=nobu-29ce3)

Assign roles to the `client_email` identity found inside
`firebase-service-account.json`, and allow several minutes for newly enabled
APIs or IAM changes to propagate before retrying the workflow.

Second-generation Functions generate container images in Artifact Registry.
The CI flow configures Firebase's cleanup policy in `us-east4` to delete build
images older than one day, limiting storage costs while retaining the most
recent artifacts briefly for inspection.

Firebase Extensions are optional pre-packaged backend features that can
provision their own Functions and supporting resources. Nobu does not require
Extensions for the current `backendApi` Function deployment. If Extensions are
introduced later, enable the **Firebase Extensions API** before managing or
deploying them: [Enable Firebase Extensions API](https://console.cloud.google.com/apis/library/firebaseextensions.googleapis.com?project=nobu-29ce3).

### Manual API Hosting And Custom Domain

Firebase Hosting exposes the deployed Function through a stable hosted URL and
can later serve `api.nobueduca.com`. Hosting deployment is manual for now and
is not part of the backend CI workflow.

From `apps/backend-api`, run the following once when creating the API Hosting
site and binding its local deployment target:

```bash
# Create the dedicated API Hosting site. Skip this command if nobu-api exists.
npx -y firebase-tools@latest hosting:sites:create nobu-api --project nobu-29ce3

# Map the firebase.json target named api to the dedicated Hosting site.
npx -y firebase-tools@latest target:apply hosting api nobu-api --project nobu-29ce3
```

After the Function is deployed, publish or republish the Hosting rewrite:

```bash
npx -y firebase-tools@latest deploy --only hosting:api --config firebase.json --project nobu-29ce3
```

Verify the rewrite through the Firebase-provided Hosting URL:

```bash
curl https://nobu-api.web.app/health
```

To use the branded API domain, open the `nobu-api` site in Firebase Console
Hosting, select **Add custom domain**, enter `api.nobueduca.com`, and add the
DNS records Firebase provides. Firebase provisions HTTPS after DNS
verification. Once connected, mobile clients can use
`EXPO_PUBLIC_NOBU_API_BASE_URL=https://api.nobueduca.com`.

## Workspace Boundaries

Core defines frontend-shared ports, use cases, domain rules, sync contracts,
analytics ports, and observability ports for Mobile and Web. Backend domain
aggregates, value objects, ports, use cases, and provider-neutral backend
application-service implementations belong in `packages/backend-core`.
Runtime applications own composition roots and wire
Frontend Core or Backend Core ports to infrastructure packages.

Mobile is offline-first: local storage is the source of truth, Realm is the
default local database, synchronization flows through a Sync Orchestrator, and
screens must not trigger sync directly. Firebase Data Connect is the default
backend persistence provider; direct PostgreSQL access belongs in a dedicated
backend infrastructure package implementing `packages/backend-core` ports.
Backend Core owns backend configuration standards and validation independently
from frontend `@nobu/core`; the active API runtime continues selecting Firebase
only.

Landing is a marketing/content surface and must not import or depend on
`@nobu/core` unless a future plan explicitly approves the dependency.

Product content and content-managed assets live in the matching platform package:
`@nobu/content-mobile`, `@nobu/content-web`, or `@nobu/content-landing`.
Each package uses `content/json`, `content/images`, and `content/videos`.
Backend/CMS fetching logic belongs in `@nobu/content-management`.

Web and Landing fetch CMS/backend content at Next.js build time so output can
remain static. Mobile fetches CMS/backend content once at authenticated app
startup/login, stores it in Realm, and renders from Realm afterward. With the
current JSON strategy, Mobile loads bundled content from `@nobu/content-mobile`.
Web and Landing image rendering MUST use Next.js `next/image`; raw `img` tags
are not allowed for product, content-managed, marketing, or UI images unless a
feature plan documents an approved exception.

## CI

GitHub Actions workflows run the same workspace scripts used locally. Mobile
includes Expo/EAS configuration for future delivery readiness, but the
foundation does not require remote EAS preview builds or Expo secrets.

Official applications use workflows under `.github/workflows/`. Primary
reusable packages may have their own workflow or may be validated by the
consuming application workflow when dependency paths trigger it. Workflows
install dependencies with `pnpm install --frozen-lockfile` and run the
required workspace quality gates.

```bash
pnpm turbo run lint typecheck test build --filter=<workspace>
```

Deployment workflows require the repository secrets documented above:
`RENDER_DEPLOY_HOOK_URL` for the landing static site and
`FIREBASE_SERVICE_ACCOUNT_JSON` for the Firebase-backed backend API flow.

The constitution also requires backend-driven mobile version governance,
child-safe telemetry, Firebase Analytics abstraction, Sentry/Crashlytics
abstraction, and strict exclusion of child-sensitive content from logs,
analytics, crash reports, and telemetry.

## Architecture Trace

- Mobile: `apps/mobile/src/composition/create-mobile-app-services.ts` wires Core,
  bundled mobile content, Realm-shaped storage, sync, analytics, observability,
  and version placeholders.
- Web: `apps/web/src/composition/create-web-app-services.ts` wires Core and
  `@nobu/content-web` for static-ready content.
- Landing: `apps/landing/src/composition/create-landing-services.ts` wires only
  `@nobu/content-landing` and remains independent from Core.
- Backend API: `apps/backend-api/src/composition/create-backend-api-services.ts`
  consumes `@nobu/backend-core` and wires auth, AI, routes, and selected
  storage-provider adapters. Firebase Data Connect is the default backend
  persistence provider.
