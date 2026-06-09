# Feature Specification: Romantic Journey Website

**Feature Branch**: `001-romantic-journey-website`

**Created**: 2026-06-09

**Status**: Clarified

**Input**: User description: "Create a static Next.js website dedicated to my girlfriend and our relationship journey with slide-based experience, mobile-first design, two intentional desktop/mobile implementations, romantic visual identity, and background music."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Girlfriend Scans QR Code and Enters Romantic Journey (Priority: P1)

User receives a gift basket with a printed QR code. She scans the code with her phone, which opens the website to the Hero slide. The website loads quickly and presents an emotionally compelling introduction that sets the tone for the entire experience. The design immediately feels personal, romantic, and professionally crafted.

**Why this priority**: This is the entry point and first impression. Without a compelling Hero slide that loads quickly and communicates love and personalization, the entire gift loses impact. This is the foundation of the entire experience.

**Independent Test**: Can be fully tested by opening the website on a mobile device via QR code and verifying that the Hero slide loads within acceptable time, displays the romantic intro, heading, surprise message, music status, and navigation button.

**Acceptance Scenarios**:

1. **Given** user scans QR code on a mobile device, **When** the page loads, **Then** the Hero slide displays with romantic intro, main emotional heading, surprise message, and music status within 2 seconds
2. **Given** the Hero slide is displayed, **When** user taps the "Next" button, **Then** the slide transitions smoothly to the Relationship Counter slide
3. **Given** the Hero slide is displayed on mobile, **When** user swipes right (or presses ArrowLeft), **Then** nothing happens (first slide, no previous slide)
4. **Given** the website loads, **When** the page renders, **Then** the music automatically begins playing or shows status that audio is waiting for user interaction
5. **Given** the Hero slide displays, **When** user views it, **Then** there is no relationship time counter visible on this slide

---

### User Story 2 - View Relationship Time Counter (Priority: P1)

User navigates to the second slide and sees a large, dynamic counter displaying exactly how long they have been together in years, months, days, hours, minutes, and seconds. The counter updates every second in real-time, creating a sense of intimate, shared time. A poetic Portuguese phrase reinforces the emotional significance of time spent together.

**Why this priority**: The counter is a core emotional element and the second slide the user will see. It must work flawlessly and be visually striking to deliver the intended emotional impact.

**Independent Test**: Can be fully tested by navigating to the Relationship Counter slide and verifying that the counter displays correctly, updates every second, and the Portuguese phrase displays properly on both mobile and desktop views.

**Acceptance Scenarios**:

1. **Given** user is on the Relationship Counter slide, **When** they view the counter, **Then** it displays years, months, days, hours, minutes, and seconds
2. **Given** the counter is displayed, **When** one second passes, **Then** the seconds value increments by 1
3. **Given** the counter is displayed, **When** one minute passes, **Then** the seconds reset and minutes increment by 1
4. **Given** the user is on the counter slide, **When** they view it, **Then** the Portuguese phrase is displayed: "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais."
5. **Given** the counter slide is displayed on mobile, **When** user swipes left or taps next button, **Then** the slide transitions to the first Journey slide
6. **Given** the counter slide is displayed on mobile, **When** user swipes right or presses ArrowLeft, **Then** the slide transitions back to Hero slide

---

### User Story 3 - Browse Through Journey Slides (Priority: P1)

User navigates through multiple Journey slides, each representing a chapter or moment in the relationship. Each slide uses a consistent, elegant layout with a beautiful photo, a meaningful title, and a romantic phrase. User can move backward and forward through the slides using intuitive navigation. The experience feels like flipping through a curated photo album with emotional captions.

**Why this priority**: The Journey slides are the main content of the website and comprise the majority of the user's time engaging with the experience. Without smooth, intuitive navigation and beautiful presentation, the core value is lost.

**Independent Test**: Can be fully tested by navigating through all journey slides using both next/previous buttons and keyboard/swipe gestures, verifying that each slide displays correctly with title, image, and caption on both mobile and desktop.

**Acceptance Scenarios**:

1. **Given** user is on a Journey slide, **When** they tap the "Next" button, **Then** the next slide transitions smoothly
2. **Given** user is on a Journey slide, **When** they tap the "Previous" button, **Then** the previous slide transitions smoothly
3. **Given** user is on a Journey slide on mobile, **When** they swipe left, **Then** the next slide transitions smoothly
4. **Given** user is on a Journey slide on mobile, **When** they swipe right, **Then** the previous slide transitions smoothly
5. **Given** user is on a Journey slide on desktop, **When** they press ArrowRight key, **Then** the next slide transitions
6. **Given** user is on a Journey slide on desktop, **When** they press ArrowLeft key, **Then** the previous slide transitions
7. **Given** a Journey slide is displayed, **When** user views it, **Then** the slide displays the title, large photo, and romantic phrase/caption in the correct layout
8. **Given** user navigates beyond the seven photo Journey slides, **When** they reach the "O que mais amo em você" slide, **Then** that dedicated slide displays with its own content
9. **Given** user navigates beyond the seven photo Journey slides, **When** they reach the "Nossos Planos" slide, **Then** that dedicated slide displays with its own content

---

### User Story 4 - View Desktop-Specific Journey Experience (Priority: P1)

User accesses the website from a desktop computer. The layout, typography, image sizing, and spacing are intentionally designed for large screens and keyboard interaction. The desktop experience feels premium and cinematic, taking full advantage of the larger screen space. Desktop implementations differ fundamentally from mobile—not simply scaled-up mobile layouts.

**Why this priority**: Desktop is explicitly required, and the feature specification demands "two intentionally designed experiences" where desktop is NOT a responsive resize of mobile. This is a core requirement that must be met independently.

**Independent Test**: Can be fully tested by accessing the website on a desktop browser and verifying that desktop-specific layouts, typography sizing, image composition, and navigation behavior are distinct from and optimized for the desktop experience.

**Acceptance Scenarios**:

1. **Given** user accesses website on desktop, **When** they view the Hero slide, **Then** the layout, spacing, typography, and image composition are optimized for desktop screens
2. **Given** user views a Journey slide on desktop, **When** they view the slide, **Then** the title, image, and caption are positioned differently than the mobile version for optimal desktop viewing
3. **Given** user is on desktop, **When** they press ArrowRight or ArrowLeft, **Then** the slides navigate smoothly with desktop-optimized transitions
4. **Given** desktop user views the website, **When** they view any slide, **Then** no mobile-specific sizing or mobile-first breakpoints are visible—the layout is intentionally designed for desktop aspect ratios
5. **Given** desktop and mobile devices display the same slide, **When** comparing side-by-side, **Then** the desktop version has distinctly different layout, image sizing, and typography compared to mobile

---

### User Story 5 - View Mobile-Specific Journey Experience (Priority: P1)

User accesses the website from a mobile device. The layout is specifically crafted for mobile screens with optimized touch interactions, safe area awareness (iPhone notches, home indicators), and portrait orientation. The experience feels like a native mobile app with smooth swipe gestures and full-viewport slide heights. Mobile is the primary experience according to the gift basket delivery model (QR code on printed material).

**Why this priority**: Mobile is the PRIMARY platform for this feature. The entire gift delivery model is built around mobile QR code scanning. Mobile must be perfect.

**Independent Test**: Can be fully tested by accessing the website on multiple mobile devices (iOS and Android) and verifying that the layout respects safe areas, viewport behaves correctly, swipe gestures work smoothly, and the overall experience is optimized for mobile-first interaction.

**Acceptance Scenarios**:

1. **Given** user accesses website on mobile portrait orientation, **When** they view the Hero slide, **Then** the layout uses the full viewport height (100dvh) and respects safe areas (notch, home indicator)
2. **Given** mobile user views the website, **When** they swipe left on a slide, **Then** the slide transitions smoothly with swipe gesture feedback
3. **Given** mobile user views the website, **When** they swipe right on a slide, **Then** the slide transitions smoothly in the opposite direction
4. **Given** user with an iPhone views the website, **When** they view any slide, **Then** content is not hidden behind the notch or safe area edges
5. **Given** mobile user views the website, **When** they rotate their device, **Then** the content adapts appropriately without breaking layout
6. **Given** mobile user views the website, **When** they interact with the page, **Then** the touch targets (buttons, swipe areas) are large enough for comfortable touch interaction
7. **Given** mobile and desktop versions display the same slide, **When** comparing side-by-side, **Then** the mobile version has distinctly different layout, image sizing, and typography compared to desktop

---

### User Story 6 - Listen to Background Music (Priority: P1)

The website includes "Perfect" by Ed Sheeran as background music. When the page loads, the music attempts to start automatically. If the browser blocks autoplay (common on mobile), the music starts on the first user interaction (tap, click, swipe, or key press). Once started, the music plays continuously throughout the entire journey. The user never needs to press a visible play button—music starts automatically or after first interaction.

**Why this priority**: Music is a core emotional element of the romantic experience. The automatic/interaction-triggered playback is critical to maintaining the emotional atmosphere without breaking the visual presentation with visible player controls.

**Independent Test**: Can be fully tested by loading the website on both mobile and desktop, attempting autoplay, verifying fallback to first-interaction trigger if needed, and confirming music plays continuously across slide transitions.

**Acceptance Scenarios**:

1. **Given** website loads, **When** the page initializes, **Then** the music attempts to start automatically
2. **Given** browser blocks autoplay, **When** user taps, clicks, swipes, or presses a key, **Then** the music starts playing
3. **Given** music is playing, **When** user navigates to the next slide, **Then** the music continues playing without interruption
4. **Given** music is playing, **When** user navigates to the previous slide, **Then** the music continues playing without interruption
5. **Given** website is displayed, **When** user views any slide, **Then** no visible play/pause button is required (music management happens automatically)
6. **Given** audio file is referenced, **When** page loads, **Then** the audio file (perfect.mp3) is loaded from local assets (assets/audio/perfect.mp3)

---

### User Story 7 - View Final Message Slide (Priority: P1)

User reaches the final slide after browsing the journey. The slide displays a romantic final message with a meaningful title like "Uma mensagem para você". It includes a photo, a heartfelt message card, "FIM" (the end), "(de um grande começo)" (of a great beginning), and a closing phrase indicating the best is still to come. The slide feels like the climactic emotional conclusion of the experience.

**Why this priority**: The final slide is the emotional bookend of the entire journey. It must deliver a powerful closing message that reinforces love and future together.

**Independent Test**: Can be fully tested by navigating to the final slide and verifying that all required elements are displayed (title, photo, message card, "FIM", closing phrase) with proper styling and emotional impact on both mobile and desktop.

**Acceptance Scenarios**:

1. **Given** user navigates to the final slide, **When** they view it, **Then** a romantic title (such as "Uma mensagem para você") is displayed
2. **Given** the final slide is displayed, **When** user views it, **Then** a photo is visible (at top or as background)
3. **Given** the final slide is displayed, **When** user views it, **Then** a heartfelt message card is visible
4. **Given** the final slide is displayed, **When** user views it, **Then** "FIM" text is displayed
5. **Given** the final slide is displayed, **When** user views it, **Then** "(de um grande começo)" text is displayed below "FIM"
6. **Given** the final slide is displayed, **When** user views it, **Then** a closing phrase appears indicating the best is still to come
7. **Given** user navigates to the final slide, **When** they tap next button, **Then** the experience cycles back to the first slide so the journey can replay continuously

---

### Edge Cases

- What happens when user rotates device from portrait to landscape and back?
- What happens if user's browser does not support the font files (fallback fonts Parisienne, Allura, Great Vibes must display)?
- How does the counter handle leap years and daylight saving time transitions?
- What happens if user's device has autoplay disabled and user mutes their device before first interaction?
- What happens if user navigates away from the slide (browser back button, direct URL) and returns—should counter resume from current time?
- How does the site behave on very small mobile screens (e.g., smaller iPhones) and larger tablets?
- What happens if the audio file fails to load (should site still work with visual experience)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Website MUST be implemented as a static Next.js site with no backend, database, authentication, CMS, forms, or API calls
- **FR-002**: Website MUST support two intentionally designed experiences: Desktop (optimized for large screens) and Mobile (optimized for touch, QR code scanning, viewport safety)
- **FR-003**: Desktop and Mobile layouts MUST be fundamentally different implementations, not responsive resizing of the same layout
- **FR-004**: Hero slide MUST include: romantic intro, main emotional heading, surprise message text, music status, and next navigation button
- **FR-005**: Hero slide MUST NOT include the relationship time counter
- **FR-006**: Relationship Counter slide MUST display: years, months, days, hours, minutes, seconds in real-time
- **FR-007**: Counter MUST update every second and accurately reflect time elapsed since relationship start date
- **FR-008**: Counter slide MUST display the Portuguese phrase: "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais."
- **FR-009**: Website MUST include exactly 12 slides total: 1 Hero slide, 1 Relationship Counter slide, 7 Journey photo slides, 1 "O que mais amo em você" slide, 1 "Nossos Planos" slide, and 1 Final Message slide
- **FR-010**: Journey slides MUST use reusable layout: title, large photo, short phrase/caption, previous button, next button
- **FR-011**: Relationship counter MUST use a fixed hardcoded relationship start date of 14 January 2026 at 20:00 local time
- **FR-012**: Website MUST include a dedicated slide titled "O que mais amo em você" with dedicated content
- **FR-013**: Website MUST include a dedicated slide titled "Nossos Planos" with dedicated content
- **FR-014**: Final Message slide MUST include: romantic title (e.g., "Uma mensagem para você"), photo, message card, "FIM" text, "(de um grande começo)" text, and closing phrase about future
- **FR-015**: Navigation MUST support: click/tap, keyboard (ArrowRight, ArrowLeft on desktop), optional swipe gestures (mobile)
- **FR-016**: Navigation buttons: next button round and positioned on right, previous button round and positioned on left
- **FR-017**: Pagination indicators MAY be included but MUST remain subtle
- **FR-018**: Website MUST include background music ("Perfect" by Ed Sheeran) as local audio file at assets/audio/perfect.mp3
- **FR-019**: Music MUST attempt automatic autoplay on page load
- **FR-020**: If browser blocks autoplay, music MUST start on first user interaction (tap, click, swipe, or key press)
- **FR-021**: Music MUST play continuously throughout entire journey without interruption across slide transitions
- **FR-022**: User MUST NOT be required to press a visible play button to start music
- **FR-023**: Website MUST follow romantic, warm, cinematic visual identity: dark background, sunset tones, rose-gold accents, peach accents, soft hearts, elegant serif typography, romantic handwritten script typography, large emotional photos, rounded cards, subtle borders, soft shadows, blur overlays
- **FR-024**: Fonts MUST use Brittany Signature (or fallbacks: Parisienne, Allura, Great Vibes) for romantic handwritten text: "para você", "Jornada", "Planos", "Você", "só nossa", "Obrigado por ser você", "Eu te amo infinitamente", "de um grande começo"
- **FR-025**: Fonts MUST use Cormorant Garamond for serif titles, body text, navigation labels, and "FIM"
- **FR-026**: Mobile viewport MUST use 100dvh where appropriate and respect iPhone safe areas (notch, home indicator)
- **FR-027**: Mobile content MUST NOT be hidden behind browser UI
- **FR-028**: Website MUST support modern iPhone screen sizes and Android mobile devices
- **FR-029**: Website MUST be optimized for static deployment and QR Code access
- **FR-030**: Website MUST load quickly, especially the first screen (Hero slide)
- **FR-031**: All assets (images, fonts, audio) MUST be local and referenced from project asset folders
- **FR-032**: All content (text, messages, relationship date) MUST be hardcoded in the website
- **FR-033**: Desktop reference images MUST be stored in assets/images/desktop/
- **FR-034**: Mobile reference images MUST be stored in assets/images/mobile/
- **FR-035**: Icons MUST be stored in assets/icons/
- **FR-036**: Fonts MUST be stored in assets/fonts/
- **FR-037**: Website MUST display all text in Portuguese (Brazilian Portuguese based on context clues in feature description)

### Key Entities *(include if feature involves data)*

- **Journey Slide**: Entity representing a single chapter/moment in the relationship. Attributes: title (string), image (reference to assets/images/[mobile|desktop]), phrase/caption (string), slide order (number)
- **Relationship Counter**: Real-time entity tracking time elapsed. Attributes: relationship start date (fixed datetime), current time (updates every second), calculated values (years, months, days, hours, minutes, seconds)
- **Navigation State**: Entity tracking current slide position. Attributes: current slide index (number), total slides (number), can navigate previous (boolean), can navigate next (boolean)
- **Audio State**: Entity tracking music playback. Attributes: is playing (boolean), is muted (boolean), autoplay attempted (boolean), user interacted (boolean)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Website loads within 2 seconds on mobile 4G connection on the Hero slide
- **SC-002**: Relationship counter displays and updates every second without visible lag or glitches
- **SC-003**: User can navigate through all slides using three different methods (tap/click button, keyboard arrow keys, swipe gesture) without errors
- **SC-004**: Music starts automatically on page load OR within 1 second of first user interaction
- **SC-005**: All 12 required slides are implemented with dedicated content: Hero, Counter, seven Journey photo slides, "O que mais amo em você", "Nossos Planos", and Final Message
- **SC-006**: Desktop and Mobile experiences are visually and functionally distinct when viewed side-by-side on same slide
- **SC-007**: Mobile viewport respects safe areas on iPhone devices with notch/home indicator
- **SC-008**: Counter slide displays the full Portuguese phrase without text overflow on mobile screens
- **SC-009**: All fonts (Brittany Signature and Cormorant Garamond) display correctly on both desktop and mobile browsers, with fallback fonts rendering if primary fonts unavailable
- **SC-010**: All images load from local assets without external CDN or internet requests
- **SC-011**: Website is deployable as a static Next.js build (next export) with no runtime dependencies or API calls
- **SC-012**: User can reach the final slide within 10 seconds of page load using normal navigation speed
- **SC-013**: 95% of romantic text elements match the specified Portuguese phrases and emotional tone

## Assumptions

- Relationship start date is known and fixed (will be hardcoded). Counter calculates from this date to current time.
- Browser supports modern CSS (Flexbox, Grid, CSS Variables) and modern JavaScript (ES6+, async/await)
- Users have stable internet or can load website offline once cached (static site)
- Mobile users will primarily access via QR code on printed material, not direct URL entry
- Desktop users may access via direct URL or QR code, but desktop optimization is still required
- Font files (Brittany Signature, Cormorant Garamond) will be sourced and included in assets/fonts/
- If Brittany Signature is unavailable, fallback fonts (Parisienne, Allura, Great Vibes) are acceptable
- Perfect by Ed Sheeran audio file exists locally at assets/audio/perfect.mp3 and will be referenced by the site
- Desktop reference designs exist at assets/images/desktop/ and Mobile reference designs exist at assets/images/mobile/
- All content text (journey titles, captions, messages) is final and will not change (hardcoded)
- Relationship start date is fixed and does not need to be configurable
- Browser autoplay policies are accepted—if autoplay is blocked, first interaction trigger is acceptable
- Website does not need to support offline viewing of audio (music can be silently skipped if offline)
- No analytics, logging, or telemetry required
- No social sharing, comments, or user-generated content
- No security considerations beyond HTTPS for QR code delivery
- Next.js version 15 with TypeScript strict mode is approved technology
- Tailwind CSS is approved for styling if used
- Single feature delivery—all slides delivered together, no phased rollout
