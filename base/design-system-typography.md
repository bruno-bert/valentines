# Nobu Typography System

## Philosophy

This typography system is owned by Nobu and MUST remain independent from any
external company typography standard. Do not import, copy, reference, or
approximate external enterprise font systems.

Typography must feel:

- playful
- friendly
- soft
- expressive
- highly readable

Typography should emotionally support children.

The system must avoid:

- aggressive geometric fonts
- ultra-thin weights
- corporate typography
- condensed typography
- rigid academic visual language

---

# Typography Principles

Typography must prioritize:

- readability
- emotional warmth
- accessibility
- low cognitive load

Text should feel:

- conversational
- welcoming
- encouraging

---

# Recommended Font Families

Primary Font Recommendation:

- Nunito

Alternative Fonts:

- Fredoka
- Baloo
- Quicksand
- Poppins Rounded

---

# Typography Characteristics

Fonts should include:

- rounded corners
- soft geometry
- large x-height
- high readability
- thick friendly shapes

Avoid:

- serif fonts
- condensed fonts
- sharp geometric fonts
- thin weights

---

# Font Weight Standards

Recommended weights:

- Regular: 400
- SemiBold: 600
- Bold: 700
- ExtraBold: 800

Avoid:

- Thin
- ExtraLight
- Hairline

---

# Typography Scale

## Display

Used for:

- hero titles
- onboarding
- celebration moments

Size:
48px–56px

Weight:
700–800

---

## Heading 1

Size:
36px

Weight:
700

---

## Heading 2

Size:
28px

Weight:
700

---

## Heading 3

Size:
22px

Weight:
600

---

## Body Large

Size:
18px

Weight:
400–600

---

## Body Default

Size:
16px

Weight:
400

---

## Caption

Size:
14px

Weight:
400

Never use text below 14px for children-facing interfaces.

---

# Text Behavior

Text must:

- maintain strong contrast
- support dynamic resizing
- support accessibility scaling
- avoid long dense paragraphs

Educational content must prioritize:

- spacing
- readability
- scanning

---

# Emotional Typography Rules

Typography should reinforce:

- celebration
- confidence
- encouragement

Avoid:

- harsh uppercase overuse
- aggressive warning typography
- anxiety-inducing layouts

Use playful emphasis carefully.

The interface should feel:

- supportive
- emotionally safe
- fun to explore

---

# Application Typography Ownership

Typography principles are shared across the product, but typography token files
MUST be owned by each application. Core MUST NOT own UI typography tokens
because `packages/core` is platform-agnostic business logic.

## Mobile Typography Tokens

React Native typography tokens MUST live in:

- `apps/mobile/src/design-system/tokens/typography.ts`
- `apps/mobile/src/design-system/theme/index.ts`

Mobile typography MUST be compatible with React Native `Text` and
`StyleSheet`.

Mobile tokens MUST define:

- font families
- font sizes
- line heights
- font weights
- letter spacing
- accessibility scaling behavior

Mobile text styles MUST account for children and parents using small screens.
Text must remain readable with accessibility font scaling enabled.

## Web Typography Tokens

Web typography tokens MUST live in:

- `apps/web/src/design-system/tokens/typography.ts`
- `apps/web/src/design-system/theme/index.ts`

Web typography MUST support Next.js and Tailwind CSS. Tailwind configuration or
CSS variables MAY consume these tokens, but components MUST NOT hardcode font
families, sizes, weights, or line heights.

The Web app is a validation cockpit. Its type scale should be compact,
readable, and service-oriented.

## Landing Page Typography Tokens

Landing typography tokens MUST live in:

- `apps/landing/src/design-system/tokens/typography.ts`
- `apps/landing/src/design-system/theme/index.ts`

Landing typography MUST support public marketing pages, SEO content, app
showcase sections, and onboarding entry points. The Landing app MAY use a more
expressive display scale than the Web validation app, but it MUST remain
readable and responsive.

## Token Naming Contract

Application typography tokens MUST use semantic names in components.

Allowed examples:

- `typography.display`
- `typography.heading1`
- `typography.heading2`
- `typography.body`
- `typography.caption`
- `typography.button`

Disallowed examples:

- `externalBrandHeading`
- `deckTitle`
- `randomBigText`
- hardcoded `fontSize: 36` inside a screen
- hardcoded `text-4xl` in a component without a token-backed Tailwind mapping
