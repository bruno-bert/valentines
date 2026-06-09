import type { ProblemSectionViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

import { SectionShell } from "./SectionShell";

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function ProblemSection({
  sectionId,
  title,
  titleId,
  introduction,
  painPoints
}: ProblemSectionViewModel) {
  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="bg-landing-surface motion-fade-up"
      data-animate
    >
      <p className="mb-8 max-w-3xl text-landing-body-lg text-landing-muted">{introduction}</p>
      <ul className="grid gap-6 md:grid-cols-3">
        {painPoints.map((point, index) => (
          <li
            key={point.id}
            className="motion-hover-lift relative flex flex-col rounded-landing-lg border border-landing-border bg-landing-page p-6 shadow-landing-soft"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-landing-primaryTint/60 text-sm font-bold text-landing-primary"
                aria-hidden
              >
                {formatStepNumber(index)}
              </div>
              {point.icon ? (
                <img src={toStaticAssetPath(point.icon)} alt="" width={24} height={24} className="h-6 w-6 shrink-0 opacity-70" />
              ) : null}
            </div>
            <h3 className="text-base font-semibold text-landing-text">{point.title}</h3>
            <p className="mt-2 text-landing-small text-landing-muted">{point.description}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
