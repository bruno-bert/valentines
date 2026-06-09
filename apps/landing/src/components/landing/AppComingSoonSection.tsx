import type { AppComingSoonSectionViewModel } from "../../lib/content/types";

import { AnchorLink } from "./AnchorLink";
import { SectionShell } from "./SectionShell";

export function AppComingSoonSection({
  sectionId,
  title,
  titleId,
  description,
  primaryCta,
  chips
}: AppComingSoonSectionViewModel) {
  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="bg-nobu-waitlist-gradient motion-fade-up"
      data-animate
    >
      <p className="-mt-4 mb-8 max-w-2xl text-landing-body-lg text-landing-muted">{description}</p>
      <div className="rounded-landing-xl border border-landing-border bg-landing-surface p-6 shadow-landing sm:p-8">
        <div className="flex flex-wrap gap-3">
          {chips.map((chip) => (
            <span
              key={chip.id}
              aria-disabled="true"
              className="inline-flex items-center rounded-full border border-landing-border bg-landing-page px-4 py-2 text-landing-small font-medium text-landing-text"
            >
              {chip.label}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <AnchorLink {...primaryCta} variant="primary" size="large" />
        </div>
      </div>
    </SectionShell>
  );
}
