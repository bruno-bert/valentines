import type { BenefitsSectionViewModel } from "../../lib/content/types";

import { SectionShell } from "./SectionShell";

export function BenefitsSection({
  sectionId,
  title,
  titleId,
  subtitle,
  items
}: BenefitsSectionViewModel) {
  const [featured, ...rest] = items;

  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="motion-fade-up"
      data-animate
    >
      {subtitle ? (
        <p className="-mt-4 mb-8 max-w-3xl text-landing-body-lg text-landing-muted">{subtitle}</p>
      ) : null}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featured ? (
          <li className="motion-hover-lift rounded-landing-lg border-2 border-landing-primary bg-landing-primaryTint/30 p-6 shadow-landing md:col-span-2 lg:row-span-2">
            <h3 className="text-lg font-bold text-landing-primary">{featured.title}</h3>
            <p className="mt-3 text-landing-body text-landing-text">{featured.description}</p>
          </li>
        ) : null}
        {rest.map((item) => (
          <li
            key={item.id}
            className="motion-hover-lift rounded-landing-lg border border-landing-border bg-landing-surface p-5 shadow-landing-soft"
          >
            <h3 className="text-base font-semibold text-landing-primary">{item.title}</h3>
            <p className="mt-2 text-landing-small text-landing-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
