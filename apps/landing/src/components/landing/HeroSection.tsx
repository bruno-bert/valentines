import type { HeroViewModel, StoreButtonsViewModel } from "../../lib/content/types";

import { AnchorLink } from "./AnchorLink";
import { HeroVisual } from "./HeroVisual";
import { StoreButtonsGroup } from "./StoreButtonsGroup";

type HeroSectionProps = HeroViewModel & {
  storeButtons: StoreButtonsViewModel;
};

export function HeroSection({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  visual,
  storeButtons
}: HeroSectionProps) {
  return (
    <section className="relative scroll-mt-24 overflow-hidden pb-12 pt-8 md:pb-16 md:pt-12">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-landing-primaryTint/40 blur-3xl motion-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-landing-magicalBlue/20 blur-3xl motion-float"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="order-1 lg:order-1">
          {eyebrow ? (
            <p className="mb-4 inline-block rounded-full bg-landing-primaryTint/50 px-3 py-1 text-landing-label uppercase text-landing-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-landing-display text-landing-text md:text-landing-hero">{headline}</h1>
          <p className="mt-4 max-w-xl text-landing-body-lg text-landing-muted">{subheadline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AnchorLink {...primaryCta} variant="primary" size="large" />
            <AnchorLink {...secondaryCta} variant="secondary" size="large" />
          </div>
          <div className="mt-8">
            <StoreButtonsGroup {...storeButtons} />
          </div>
        </div>

        <div className="order-2 flex w-full justify-center lg:order-2 lg:justify-end">
          <div className="w-full max-w-md lg:w-full lg:max-w-none">
            <HeroVisual image={visual} priority />
          </div>
        </div>
      </div>
    </section>
  );
}
