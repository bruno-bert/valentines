# Design System

This document is the design-system companion to the project constitution. It is
the source of truth for UI assets, theme structure, component usage, and where
implementation agents must read product design rules.

This design system is product-owned and market-oriented. It MUST NOT reference,
inherit from, or depend on any external company design system, brand guide,
typography, colors, iconography, assets, naming, or governance model.

## Required Rule Files

Agents MUST read these Markdown files before implementing or reviewing UI:

- `.specify/design-system-colors.md`
- `.specify/design-system-typography.md`

When working from the baseline assets before `.specify/` is generated, agents
MUST use:

- `resources/assets/design-system.md`
- `resources/assets/design-system-colors.md`
- `resources/assets/design-system-typography.md`

# Nobu Design System

## Philosophy

Nobu is not a traditional educational application.

Nobu is an emotional learning platform designed for children.

The design system must prioritize:

- emotional safety
- encouragement
- playfulness
- curiosity
- celebration
- low cognitive load
- friendliness
- accessibility
- tactile interactions

Every visual and motion decision must reinforce:

- positive reinforcement
- engagement
- emotional attachment
- confidence-building

The interface should feel:

- alive
- playful
- soft
- welcoming
- magical
- expressive

The system must avoid:

- corporate aesthetics
- enterprise UI patterns
- rigid layouts
- sharp edges
- aggressive colors
- visually overloaded interfaces

---

# Core UX Principles

## Child-Friendly Interactions

All interactions must be intuitive for children.

The interface must:

- minimize friction
- avoid hidden actions
- avoid complex navigation
- provide immediate feedback
- guide the user visually
- prioritize touch interactions

Touch targets must be oversized and accessible.

Children should always understand:

- what happened
- what is expected
- what to do next

---

# Emotional Feedback

Nobu must reward effort, not only correctness.

Animations, sounds, and visual states must:

- celebrate progress
- encourage retries
- reduce frustration
- avoid punishment language

Negative emotional feedback is forbidden.

The application must never:

- shame mistakes
- create anxiety
- use aggressive red error states
- punish learning attempts

---

# Motion Design

Motion is part of the learning system.

Animations must:

- feel soft
- feel elastic
- feel playful
- reinforce emotional states

Use:

- bounce
- squash/stretch
- smooth transitions
- breathing/idle animations
- celebratory animations

Avoid:

- robotic transitions
- abrupt movement
- excessive motion
- distracting effects

---

# Character System

Animated puppets and avatars are core UX elements.

Characters are not decorative.

Characters must:

- guide learning
- explain concepts
- celebrate progress
- encourage retries
- emotionally react to learning states

Characters must support emotional states such as:

- idle
- happy
- celebrating
- thinking
- explaining
- encouraging
- confused
- surprised

---

# Animation Standards

Primary animation technology:

- Lottie

Lottie should be used for:

- animated avatars
- puppets
- educational characters
- lightweight celebratory animations
- simple motion assets
- non-interactive effects

Rive MAY be introduced later only when a plan justifies interactive state
machines that cannot be handled well with Lottie.

Animations must:

- be reusable
- be lightweight
- support lazy loading
- avoid impacting startup performance

---

# Shape Language

The entire interface must follow a rounded visual language.

Recommended standards:

- large border radius
- soft corners
- thick buttons
- floating card feeling
- playful depth

Avoid:

- sharp corners
- thin borders
- tiny touch targets
- flat enterprise visuals

Recommended radius scale:

- small: 12px
- medium: 18px
- large: 24px
- extra large: 32px

---

# Accessibility

Accessibility is mandatory.

The interface must:

- support large readable text
- maintain high contrast
- support screen readers when possible
- avoid visual overload
- remain understandable with animations disabled

Animations must never block:

- navigation
- answering questions
- reading content

---

# Architecture Standards

The design system must be platform-agnostic.

The same tokens and principles must support:

- React Native
- Web
- PWA
- future platforms

All styling decisions must come from design tokens.

No hardcoded colors, spacing, or typography values are allowed in components.

Shared design principles are global, but token implementation is per
application. Each app MUST own its runtime-compatible color and typography
tokens:

- `apps/mobile/src/design-system/tokens/colors.ts`
- `apps/mobile/src/design-system/tokens/typography.ts`
- `apps/web/src/design-system/tokens/colors.ts`
- `apps/web/src/design-system/tokens/typography.ts`
- `apps/landing/src/design-system/tokens/colors.ts`
- `apps/landing/src/design-system/tokens/typography.ts`

Mobile tokens MUST be compatible with React Native `StyleSheet`. Web and
Landing tokens MUST be compatible with Next.js and Tailwind CSS.

---

# Design Tokens

All tokens must be centralized.

Recommended structure:

apps/<application>/src/design-system/
tokens/
colors.ts
spacing.ts
typography.ts
radius.ts
shadows.ts
motion.ts
theme/
index.ts

Themes must support:

- light mode
- dark mode
- future branded themes

Theme switching must not require component rewrites.
