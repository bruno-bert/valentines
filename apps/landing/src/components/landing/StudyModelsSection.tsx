import type { StudyModelsSectionViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

import { SectionShell } from "./SectionShell";

export function StudyModelsSection({
  sectionId,
  title,
  titleId,
  subtitle,
  items
}: StudyModelsSectionViewModel) {
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
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured ? (
          <li className="motion-hover-lift rounded-landing-lg border-2 border-landing-primary bg-landing-primaryTint/30 p-6 shadow-landing sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div className="mb-4 flex items-start justify-between gap-3">
              {featured.icon ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-landing bg-landing-surface/80">
                  <img src={toStaticAssetPath(featured.icon)} alt="" width={24} height={24} className="h-6 w-6" />
                </span>
              ) : null}
            </div>
            <h3 className="text-lg font-bold text-landing-primary">{featured.title}</h3>
            <p className="mt-3 text-landing-body text-landing-text">{featured.description}</p>
          </li>
        ) : null}
        {rest.map((item) => (
          <li
            key={item.id}
            className="motion-hover-lift rounded-landing-lg border border-landing-border bg-landing-surface p-5 shadow-landing-soft"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              {item.icon ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-landing bg-landing-primaryTint/50">
                  <img src={toStaticAssetPath(item.icon)} alt="" width={20} height={20} className="h-5 w-5" />
                </span>
              ) : null}
            </div>
            <h3 className="text-base font-semibold text-landing-primary">{item.title}</h3>
            <p className="mt-2 text-landing-small text-landing-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
