import type { SocialProofSectionViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

import { SectionShell } from "./SectionShell";

export function SocialProofSection({
  sectionId,
  title,
  titleId,
  testimonial,
  stat,
  trustBadges
}: SocialProofSectionViewModel) {
  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="bg-landing-subtleBg motion-fade-up"
      data-animate
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <blockquote className="relative rounded-landing-lg border border-landing-border bg-landing-surface p-6 shadow-landing-soft">
          <span
            className="pointer-events-none absolute -left-1 -top-2 text-4xl text-landing-primary opacity-40"
            aria-hidden
          >
            “
          </span>
          <p className="text-landing-body-lg text-landing-text">{testimonial.quote}</p>
          <footer className="mt-4 text-landing-small text-landing-muted">
            — {testimonial.attribution}
            {testimonial.disclaimer ? (
              <span className="mt-1 block text-landing-subtle">{testimonial.disclaimer}</span>
            ) : null}
          </footer>
        </blockquote>

        <div className="flex flex-col justify-center rounded-landing-lg border border-landing-border bg-landing-surface p-6 text-center shadow-landing-soft">
          <p className="text-landing-display text-landing-primary">{stat.value}</p>
          <p className="mt-2 text-landing-body text-landing-muted">{stat.label}</p>
        </div>

        <ul className="flex flex-col gap-4">
          {trustBadges.map((badge) => (
            <li
              key={badge.id}
              className="flex items-start gap-3 rounded-landing border border-landing-border bg-landing-surface p-4"
            >
              {badge.icon ? (
                <img src={toStaticAssetPath(badge.icon)} alt="" width={24} height={24} className="mt-0.5 shrink-0" />
              ) : null}
              <div>
                <p className="font-semibold text-landing-text">{badge.label}</p>
                {badge.description ? (
                  <p className="mt-1 text-landing-small text-landing-muted">{badge.description}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
