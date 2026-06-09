# Valentines

Valentines is a TypeScript pnpm/Turborepo workspace for a static Next.js romantic
journey website. The current app lives in `apps/landing` and renders a
slide-based relationship experience with:

- 12 total slides: Hero, Relationship Counter, 7 Journey photo slides,
  "O que mais amo em você", "Nossos Planos", and Final Message
- dedicated desktop and mobile layouts
- keyboard, button, and mobile swipe navigation
- local background music fallback behavior
- local static assets under `apps/landing/public/assets`
- a fixed relationship counter starting at 14 January 2026, 20:00 local time

## Requirements

- Node.js 22, matching `.nvmrc`
- pnpm via Corepack

```bash
corepack enable
corepack prepare pnpm@10.12.1 --activate
pnpm install
```

## Run The Next.js App

```bash
pnpm --filter @nobu/landing dev
```

If port `3002` is already in use, choose another port:

```bash
PORT=3003 pnpm --filter @nobu/landing dev
```

Then open:

```text
http://localhost:3002
```

Or, when using a custom port:

```text
http://localhost:3003
```

## Validation

Run the landing app checks from the repository root:

```bash
pnpm --filter @nobu/landing typecheck
pnpm --filter @nobu/landing lint
pnpm --filter @nobu/landing test --coverage
pnpm --filter @nobu/landing build
```

The static build exports:

- `/`
- `/privacidade`
- `/termos`

## Project Structure

```text
apps/
  landing/
    public/assets/
      audio/
      fonts/
      icons/
      images/
      photos/
    src/
      app/
      components/
      data/
      utils/
packages/
  content-landing/
  content-legal/
  content-management/
  core/
  design-system/
specs/
  001-romantic-journey-website/
```

## Feature Notes

The first romantic journey version intentionally keeps relationship-specific
content and assets inside `apps/landing`, using the temporary constitution
exception documented in `.specify/memory/constitution.md`.

Images in the Next.js UI must use `next/image`. The feature currently uses local
SVG placeholder assets so the app builds and runs fully offline from local
project files. Replace the placeholders in `apps/landing/public/assets/photos`
and `apps/landing/public/assets/audio/perfect.mp3` with final private assets
when ready.

## Spec Kit

The active feature plan is:

```text
specs/001-romantic-journey-website/plan.md
```

Implementation tasks are tracked in:

```text
specs/001-romantic-journey-website/tasks.md
```
