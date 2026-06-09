# Quickstart: Validate the Romantic Journey Website

## Prerequisites
- `pnpm install`
- Run from repository root: `/home/bruno/projects/valentines`
- Ensure `apps/landing` dependencies are installed via `pnpm`

## Local development
1. Start the landing app:
   ```bash
   pnpm --filter @nobu/landing dev
   ```
2. Open `http://localhost:3002` in a browser.

## Validation scenarios
- Hero slide loads first and displays:
  - romantic heading
  - intro copy
  - music status for “Perfect” by Ed Sheeran
  - next navigation button
  - no relationship counter
- Navigate to the second slide and verify:
  - the relationship counter shows years, months, days, hours, minutes, and seconds
  - the counter updates every second
  - the Portuguese phrase appears correctly
- Navigate through the journey slides and verify:
  - each slide displays a unique title, local couple photo, and caption
  - navigation works with next and previous buttons
  - mobile-style slides are distinct from desktop-style slides in layout
- Confirm the special slides exist:
  - “O que mais amo em você” slide
  - “Nossos Planos” slide
  - Final message slide with “FIM” and “(de um grande começo)”
- Confirm navigation behavior:
  - previous button on left, next button on right
  - keyboard ArrowRight and ArrowLeft navigate on desktop
  - next from final slide loops back to the first slide
- Confirm audio behavior:
  - audio source is `perfect.mp3`
  - autoplay is attempted on page load
  - if autoplay is blocked, audio starts on first interaction

## Static build validation
1. Run type checking:
   ```bash
   pnpm --filter @nobu/landing typecheck
   ```
   Expected outcome: TypeScript exits successfully with no diagnostics.
2. Run lint:
   ```bash
   pnpm --filter @nobu/landing lint
   ```
   Expected outcome: ESLint exits successfully with zero warnings.
3. Run tests with coverage:
   ```bash
   pnpm --filter @nobu/landing test --coverage
   ```
   Expected outcome: all landing tests pass and statement coverage remains at or above 90%.
4. Run build:
   ```bash
   pnpm --filter @nobu/landing build
   ```
   Expected outcome: Next.js compiles, prerenders `/`, `/privacidade`, and `/termos`, and exports static output successfully.
5. Verify build succeeds without external network calls.
6. Confirm the output is compatible with static hosting and the feature uses only local assets.

## Notes
- If browser autoplay is blocked, interact with the page once and verify that audio begins.
- Use mobile device emulation or a physical phone to verify the dedicated mobile experience and safe area handling.
