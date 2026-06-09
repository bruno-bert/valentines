# UI Contract: Romantic Journey Slide Data

## Purpose
This contract defines the interface between the static slide content model and the `RomanticJourney` UI feature.

## Slide data shape
```ts
export type SlideType =
  | 'hero'
  | 'counter'
  | 'journey-photo'
  | 'what-i-love'
  | 'our-plans'
  | 'final-message';

export interface SlideItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  caption?: string;
  message?: string;
  image: string;
  desktopImage?: string;
  mobileImage?: string;
  photo?: string;
  items?: SlideItem[];
  referenceImageDesktop?: string;
  referenceImageMobile?: string;
}
```

## Component contract
- `RomanticJourney` receives a static `Slide[]` dataset from `romanticJourneyContent.ts`.
- Each slide component accepts a single `Slide` entry and renders a dedicated desktop or mobile branch.
- `SlideShell` accepts:
  - `children`
  - `backgroundImage?`
  - `overlay?`
  - `navigation`
  - `className?`
- `NavigationButtons` accepts:
  - `onPrevious: () => void`
  - `onNext: () => void`
  - `disablePrevious: boolean`
  - `disableNext: boolean`
  - `ariaPreviousLabel: string`
  - `ariaNextLabel: string`

## Asset contract
- All image and icon references must resolve to local files under `apps/landing/public/assets/`.
- Audio source must be `apps/landing/public/assets/audio/perfect.mp3`.
- Font references must use local assets under `apps/landing/public/assets/fonts/` or fall back to safe script/serif fonts.
