import type { FeaturesSectionViewModel } from "../../lib/content/types";

import { SectionShell } from "./SectionShell";

export function FeaturesSection({ sectionId, title, titleId, items }: FeaturesSectionViewModel) {
  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="bg-landing-surface motion-fade-up"
      data-animate
    >
      <ul className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="motion-hover-lift min-w-[260px] flex-shrink-0 snap-start rounded-landing-lg border border-landing-border bg-landing-page p-5 shadow-landing-soft md:min-w-0"
          >
            <h3 className="font-semibold text-landing-text">{item.title}</h3>
            <p className="mt-2 text-landing-small text-landing-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
