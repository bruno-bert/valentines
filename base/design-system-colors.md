# Nobu Color System

## Philosophy

This color system is owned by Nobu and MUST remain independent from any
external company palette. Do not import, copy, reference, or approximate
external enterprise brand colors.

Nobu colors must feel:

- magical
- safe
- playful
- optimistic
- emotionally warm

The palette must avoid:

- corporate aesthetics
- grayscale-heavy UI
- muted enterprise colors
- aggressive red dominance

Colors must reinforce:

- encouragement
- curiosity
- confidence
- creativity

---

# Primary Brand Color

## Nobu Purple

Primary Brand Color:
#513aa1

This color represents:

- imagination
- creativity
- intelligence
- emotional warmth
- fantasy
- child-like wonder

Primary usage:

- buttons
- progress states
- highlights
- interactive elements
- mascot accents

---

# Secondary Colors

## Soft Purple

#A48BFF

Used for:

- secondary buttons
- gradients
- cards
- hover states
- soft highlights

---

## Magical Blue

#5CB8FF

Used for:

- informational states
- helper UI
- learning feedback
- supportive interactions

---

## Success Green

#58D68D

Used for:

- positive feedback
- progress
- achievements
- celebrations

Avoid aggressive neon greens.

---

## Warm Yellow

#FFD166

Used for:

- rewards
- stars
- achievements
- streak systems
- excitement moments

---

## Friendly Coral

#FF8A80

Used sparingly for:

- gentle warnings
- emotional reactions
- attention guidance

Never use aggressive error reds.

---

# Neutral Palette

## Background

Primary Background:
#FFFFFF

Secondary Background:
#F7F7FB

Card Background:
#FFFFFF

---

## Text Colors

Primary Text:
#2B2B3A

Secondary Text:
#666680

Disabled Text:
#A0A0B5

---

# Surface System

Cards must feel:

- elevated
- tactile
- soft
- floating

Avoid:

- hard shadows
- dark enterprise surfaces
- overly flat visuals

---

# Gradients

Gradients should feel:

- magical
- dreamy
- soft

Recommended gradient examples:

- purple → blue
- purple → pink
- blue → cyan

Avoid:

- dark gradients
- metallic gradients
- realistic textures

---

# Emotional Usage Rules

Colors must reinforce emotional states.

Examples:

- success → green + yellow
- celebration → purple + yellow
- encouragement → blue + purple
- calm learning → soft purple tones

Never use color alone to communicate meaning.

Always combine:

- icons
- motion
- labels
- illustrations

---

# Application Color Ownership

Color principles are shared across the product, but color token files MUST be
owned by each application. A color value may be shared only by intentionally
copying or importing from a lightweight design-token package approved in the
plan.

Core MUST NOT own UI color tokens because `packages/core` is platform-agnostic
business logic.

## Mobile Color Tokens

React Native color tokens MUST live in:

- `apps/mobile/src/design-system/tokens/colors.ts`
- `apps/mobile/src/design-system/theme/index.ts`

Mobile colors MUST be plain TypeScript values that can be consumed by React
Native `StyleSheet`.

Mobile token groups MUST include:

- `background`
- `surface`
- `text`
- `interactive`
- `feedback`
- `avatar`
- `learning`

Mobile MUST support at least:

- light theme
- dark theme
- custom brand theme

## Web Color Tokens

Web color tokens MUST live in:

- `apps/web/src/design-system/tokens/colors.ts`
- `apps/web/src/design-system/theme/index.ts`

Web colors MUST support Next.js and Tailwind CSS. Tailwind configuration or CSS
variables MAY consume these tokens, but React components MUST NOT hardcode
hex/rgb/hsl values.

The Web app is a validation cockpit. Its colors should be clear, minimal, and
functional while still following Nobu's friendly product tone.

## Landing Page Color Tokens

Landing color tokens MUST live in:

- `apps/landing/src/design-system/tokens/colors.ts`
- `apps/landing/src/design-system/theme/index.ts`

Landing colors MUST support public marketing, SEO pages, onboarding entry
points, and responsive product presentation. The Landing app MAY use more
expressive gradients and showcase colors than the Web validation app, but it
MUST preserve accessibility and avoid visual overload.

## Token Naming Contract

Application color tokens MUST use semantic names instead of raw color names in
components.

Allowed examples:

- `color.background.primary`
- `color.surface.card`
- `color.text.primary`
- `color.interactive.primary`
- `color.feedback.success`
- `color.feedback.warning`
- `color.learning.progress`

Disallowed examples:

- `purpleButton`
- `externalBrandRed`
- `brandBlueCopiedFromDeck`
- hardcoded `#513aa1` inside a component
