# Tasks: Static Romantic Journey Website in Next.js

**Input**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the landing app structure, shared components, and asset directories needed for the romantic journey website.

- [ ] T001 Create public asset directories in apps/landing/public/assets/ for `audio/`, `fonts/`, `icons/`, `images/desktop/`, `images/mobile/`, and `photos/`
- [ ] T002 Create `apps/landing/src/app/page.tsx` to render the `RomanticJourney` feature component
- [ ] T003 Create `apps/landing/src/components/RomanticJourney.tsx` with slide rendering hooks and initial layout
- [ ] T004 Create `apps/landing/src/components/SlideShell.tsx` for shared slide layout, safe-area padding, and overlay support
- [ ] T005 Create `apps/landing/src/components/NavigationButtons.tsx` with left/right round buttons and accessible aria labels
- [ ] T006 Create `apps/landing/src/components/BackgroundMusic.tsx` with local audio element support
- [ ] T007 Create `apps/landing/src/data/romanticJourneyContent.ts` for the static slide content model
- [ ] T008 Create `apps/landing/src/utils/relationshipTimer.ts` to calculate elapsed years, months, days, hours, minutes, and seconds from the fixed start date
- [ ] T009 Update `apps/landing/src/app/globals.css` with the romantic theme, safe-area CSS, 100dvh support, and serif/script font declarations
- [ ] T010 Create slide component files: `apps/landing/src/components/HeroSlide.tsx`, `apps/landing/src/components/CounterSlide.tsx`, `apps/landing/src/components/JourneyPhotoSlide.tsx`, `apps/landing/src/components/WhatILoveSlide.tsx`, `apps/landing/src/components/OurPlansSlide.tsx`, and `apps/landing/src/components/FinalMessageSlide.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the shared behavior, data model, audio lifecycle, and navigation infrastructure that all user stories depend on.

- [ ] T011 [P] Define the `Slide` data model and story-specific fields in `apps/landing/src/data/romanticJourneyContent.ts`
- [ ] T012 [P] Implement the `relationshipTimer` utility in `apps/landing/src/utils/relationshipTimer.ts` and export precise year/month/day/hour/minute/second values
- [ ] T013 [P] Implement `BackgroundMusic` playback in `apps/landing/src/components/BackgroundMusic.tsx` with autoplay attempt, `playsInline`, `loop`, and first-interaction fallback listeners
- [ ] T014 [P] Implement `SlideShell` in `apps/landing/src/components/SlideShell.tsx` with a dark romantic background, overlay gradient, transition container, and optional desktop/mobile layout helpers
- [ ] T015 [P] Implement `NavigationButtons` in `apps/landing/src/components/NavigationButtons.tsx` with round left and right buttons, touch-friendly sizing, and arrow icon references from `apps/landing/public/assets/icons/`
- [ ] T016 Implement keyboard navigation and optional swipe handling in `apps/landing/src/components/RomanticJourney.tsx` for ArrowRight/ArrowLeft and mobile touch interactions
- [ ] T017 Implement slide state management in `apps/landing/src/components/RomanticJourney.tsx` with `currentIndex`, `nextSlide`, `previousSlide`, looping from final slide back to hero, and total slide count
- [ ] T018 Implement `apps/landing/src/app/page.tsx` to import slide content from `apps/landing/src/data/romanticJourneyContent.ts` and render `RomanticJourney`
- [ ] T019 Add local font declarations and theme variables in `apps/landing/src/app/globals.css` for Cormorant Garamond, Brittany Signature fallback fonts, peach/rose-gold accents, and sufficient contrast for text over images
- [ ] T020 Add placeholder or actual local assets for `apps/landing/public/assets/audio/perfect.mp3`, `apps/landing/public/assets/icons/`, and sample couple photos in `apps/landing/public/assets/photos/`

---

## Phase 3: User Story 1 - Hero slide experience (Priority: P1) 🎯 MVP

**Goal**: Deliver the first mobile-first hero slide with romantic intro content, music status, and next navigation button.

**Independent Test**: Open the page and verify the hero slide appears first with the correct heading, intro copy, music status, and next button, without the relationship counter.

- [ ] T021 [US1] Implement `HeroDesktopLayout` in `apps/landing/src/components/HeroSlide.tsx` with desktop reference composition, rich intro, and romantic brand styling
- [ ] T022 [US1] Implement `HeroMobileLayout` in `apps/landing/src/components/HeroSlide.tsx` with portrait-first layout, full-screen photo treatment, overlay, and thumb-friendly next button
- [ ] T023 [US1] Add hero slide content to `apps/landing/src/data/romanticJourneyContent.ts` and flag it as the first slide
- [ ] T024 [US1] Integrate `HeroSlide` into `RomanticJourney.tsx` and ensure it renders at slide index 0 with the next button navigating to the counter slide
- [ ] T025 [US1] Validate the hero slide loads first on mobile and desktop with no counter visible and with the local music status text present

---

## Phase 4: User Story 2 - Relationship counter (Priority: P1)

**Goal**: Deliver the second slide with a real-time relationship counter and romantic Portuguese phrase.

**Independent Test**: Navigate to the second slide and verify the counter updates every second, displays years/months/days/hours/minutes/seconds, and shows the specified Portuguese phrase.

- [ ] T026 [US2] Implement `CounterDesktopLayout` in `apps/landing/src/components/CounterSlide.tsx` with a cinematic desktop counter presentation and the full romantic phrase
- [ ] T027 [US2] Implement `CounterMobileLayout` in `apps/landing/src/components/CounterSlide.tsx` with stacked or two-column cards for counter units and mobile-friendly typography
- [ ] T028 [US2] Add counter slide content to `apps/landing/src/data/romanticJourneyContent.ts` and wire it to the `relationshipTimer` utility
- [ ] T029 [US2] Integrate `CounterSlide` into `RomanticJourney.tsx` and verify slide navigation works between hero, counter, and next journey slides
- [ ] T030 [US2] Verify the counter updates every second on both mobile and desktop and the Portuguese phrase renders without overflow

---

## Phase 5: User Story 3 - Journey photo slides (Priority: P1)

**Goal**: Deliver seven dedicated journey photo slides with unique titles, local couple photos, captions, and smooth navigation.

**Independent Test**: Navigate through all journey-photo slides and verify each displays a unique title, image, caption, and previous/next controls on both desktop and mobile.

- [ ] T031 [US3] Implement `JourneyPhotoDesktopLayout` in `apps/landing/src/components/JourneyPhotoSlide.tsx` with a dedicated desktop presentation for photo, title, and caption
- [ ] T032 [US3] Implement `JourneyPhotoMobileLayout` in `apps/landing/src/components/JourneyPhotoSlide.tsx` with a portrait-first image card, title on top, and caption below
- [ ] T033 [US3] Add seven journey-photo entries in `apps/landing/src/data/romanticJourneyContent.ts` referencing local photos in `apps/landing/public/assets/photos/`
- [ ] T034 [US3] Integrate `JourneyPhotoSlide` entries into `RomanticJourney.tsx` with proper indexing and transition support
- [ ] T035 [US3] Verify the journey slides navigate smoothly using next/previous buttons and swipe/keyboard actions, and ensure the mobile layout is distinct from the desktop layout

---

## Phase 6: User Story 4 - "O que mais amo em você" slide (Priority: P1)

**Goal**: Deliver the dedicated love-items slide with an emotional list of reasons and readable dedicated layouts.

**Independent Test**: Open the love-items slide directly and verify the title, intro copy, item cards, and icons render correctly on desktop and mobile.

- [ ] T036 [US4] Implement `WhatILoveDesktopLayout` in `apps/landing/src/components/WhatILoveSlide.tsx` with a desktop grid or split layout for love items
- [ ] T037 [US4] Implement `WhatILoveMobileLayout` in `apps/landing/src/components/WhatILoveSlide.tsx` with stacked cards and large touch-friendly text
- [ ] T038 [US4] Add the love-item content to `apps/landing/src/data/romanticJourneyContent.ts` using local icon references in `apps/landing/public/assets/icons/`
- [ ] T039 [US4] Integrate `WhatILoveSlide` into `RomanticJourney.tsx` and verify it appears as its own slide
- [ ] T040 [US4] Validate the slide content displays with the required emotional tone and that mobile layout does not look like a shrunken desktop design

---

## Phase 7: User Story 5 - "Nossos Planos" slide (Priority: P1)

**Goal**: Deliver the plans slide with future-focused items and dedicated desktop/mobile layouts.

**Independent Test**: Open the plans slide and verify the title, plan items, closing phrase, and layout differ meaningfully across desktop and mobile.

- [ ] T041 [US5] Implement `OurPlansDesktopLayout` in `apps/landing/src/components/OurPlansSlide.tsx` with a desktop forward-looking layout
- [ ] T042 [US5] Implement `OurPlansMobileLayout` in `apps/landing/src/components/OurPlansSlide.tsx` with stacked mobile cards and clear touch interaction spacing
- [ ] T043 [US5] Add the plans content to `apps/landing/src/data/romanticJourneyContent.ts`
- [ ] T044 [US5] Integrate `OurPlansSlide` into `RomanticJourney.tsx`
- [ ] T045 [US5] Verify the plans slide renders correctly on both desktop and mobile and displays the closing phrase “O melhor ainda está por vir.”

---

## Phase 8: User Story 6 - Background music (Priority: P1)

**Goal**: Deliver continuous background audio playback for the entire journey without requiring a visible play button.

**Independent Test**: Load the site and verify audio attempts to autoplay, falls back to first interaction if blocked, and continues playing across slide transitions.

- [ ] T046 [US6] Add the local audio source `apps/landing/public/assets/audio/perfect.mp3` to `apps/landing/src/components/BackgroundMusic.tsx`
- [ ] T047 [US6] Implement autoplay attempt and one-time first-interaction playback fallback in `BackgroundMusic.tsx`
- [ ] T048 [US6] Integrate `BackgroundMusic` into `apps/landing/src/components/RomanticJourney.tsx` so the audio persists across slide changes
- [ ] T049 [US6] Verify the audio starts on load or after first interaction, continues through slides, and does not expose a mandatory visible play button

---

## Phase 9: User Story 7 - Final message slide (Priority: P1)

**Goal**: Deliver the final romantic message slide with photo, message card, “FIM”, “(de um grande começo)”, and looping navigation.

**Independent Test**: Navigate to the final slide and verify the final message content, image, closing text, and next-loop behavior.

- [ ] T050 [US7] Implement `FinalMessageDesktopLayout` in `apps/landing/src/components/FinalMessageSlide.tsx` with a cinematic split or full-width layout
- [ ] T051 [US7] Implement `FinalMessageMobileLayout` in `apps/landing/src/components/FinalMessageSlide.tsx` with a photo-first mobile layout and prominent final text
- [ ] T052 [US7] Add final message content to `apps/landing/src/data/romanticJourneyContent.ts`
- [ ] T053 [US7] Integrate `FinalMessageSlide` into `RomanticJourney.tsx` as the last slide and ensure next loops back to the hero slide
- [ ] T054 [US7] Verify the final slide displays “FIM” and “(de um grande começo)” and that next from the final slide cycles to the first slide

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improve accessibility, styling consistency, static validation, and mobile/desktop divergence across the feature.

- [ ] T055 [P] Refine responsive styling in `apps/landing/src/app/globals.css` and component CSS so mobile-first layouts remain distinct from desktop layouts
- [ ] T056 [P] Confirm all photo alt text is meaningful in component props for `apps/landing/src/components/*Slide.tsx`
- [ ] T057 [P] Confirm `NavigationButtons` uses `aria-label` attributes in `apps/landing/src/components/NavigationButtons.tsx`
- [ ] T058 [P] Run `pnpm --filter @nobu/landing build` and verify static build success for `apps/landing`
- [ ] T059 [P] Update `specs/001-romantic-journey-website/quickstart.md` with exact validation commands and expected outcomes
- [ ] T060 [P] Review `specs/001-romantic-journey-website/data-model.md` and `contracts/ui-contract.md` for consistency with the implemented component props

---

## Dependencies & Execution Order

### Phase Dependencies
- Setup (Phase 1) must complete before Foundational (Phase 2)
- Foundational (Phase 2) must complete before any User Story phase
- User Story phases (Phase 3+) may proceed in parallel after foundational completion
- Polish (Phase 10) depends on all user stories being implemented

### User Story Dependencies
- US1: Hero slide experience
- US2: Relationship counter
- US3: Journey photo slides
- US4: "O que mais amo em você" slide
- US5: "Nossos Planos" slide
- US6: Background music
- US7: Final message slide

### Parallel Opportunities
- T011, T012, T013, T014, and T015 can run in parallel as independent foundational implementation tasks
- Hero slide, counter slide, journey-photo slides, love slide, plans slide, audio, and final slide can be developed in parallel after foundational completion by separate developers
- T055 through T060 are cross-cutting polish tasks that can be completed in parallel once the main slides are implemented

## Suggested MVP Scope
- Deliver Phase 1, Phase 2, and Phase 3 as the MVP: the hero slide experience with mobile-first layout, next navigation, and local asset structure
- Validate the MVP independently before expanding to the remaining slides and polish phase

## Task Summary
- Total task count: 60
- User story task counts:
  - US1: 5 tasks
  - US2: 5 tasks
  - US3: 5 tasks
  - US4: 5 tasks
  - US5: 5 tasks
  - US6: 4 tasks
  - US7: 5 tasks
- Setup tasks: 10
- Foundational tasks: 9
- Polish tasks: 6

## Notes
- All tasks include exact file paths and story labels where required.
- Tasks are written to be immediately executable by an implementation LLM with no additional high-level context.
