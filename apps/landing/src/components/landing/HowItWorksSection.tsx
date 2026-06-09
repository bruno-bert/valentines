import type { HowItWorksSectionViewModel } from "../../lib/content/types";
import { toStaticAssetPath } from "../../lib/static-paths";

import { SectionShell } from "./SectionShell";

type HowItWorksSectionProps = HowItWorksSectionViewModel;

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function HowItWorksSection({
  sectionId,
  title,
  titleId,
  description,
  layoutVariant,
  steps
}: HowItWorksSectionProps) {
  const isTimeline = layoutVariant === "timeline";
  const listClassName = isTimeline
    ? "flex flex-col gap-6 md:flex-row md:items-stretch md:gap-4"
    : "grid gap-6 md:grid-cols-2";

  return (
    <SectionShell
      sectionId={sectionId}
      title={title}
      titleId={titleId}
      className="bg-landing-subtleBg motion-fade-up"
      data-animate
    >
      <p className="-mt-4 mb-8 max-w-3xl text-landing-body-lg text-landing-muted">{description}</p>
      <ol className={listClassName}>
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`motion-hover-lift relative flex flex-1 flex-col rounded-landing-lg border border-landing-border bg-landing-surface p-6 shadow-landing-soft ${
              isTimeline && index < steps.length - 1
                ? "md:after:absolute md:after:left-full md:after:top-1/2 md:after:hidden md:after:h-0.5 md:after:w-4 md:after:-translate-y-1/2 md:after:bg-landing-border lg:after:block"
                : ""
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="text-landing-label font-bold text-landing-primary">
                {formatStepNumber(index)}
              </span>
              {step.icon ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-landing bg-landing-primaryTint/50">
                  <img src={toStaticAssetPath(step.icon)} alt="" width={24} height={24} className="h-6 w-6" />
                </span>
              ) : null}
            </div>
            <h3 className="text-base font-semibold text-landing-text">{step.title}</h3>
            <p className="mt-2 text-landing-small text-landing-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
