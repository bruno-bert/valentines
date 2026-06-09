import type { ReactNode } from "react";

type SectionShellProps = {
  sectionId: string;
  title: string;
  titleId: string;
  children: ReactNode;
  className?: string;
  "data-animate"?: boolean;
};

export function SectionShell({
  sectionId,
  title,
  titleId,
  children,
  className = "",
  "data-animate": dataAnimate
}: SectionShellProps) {
  return (
    <section
      id={sectionId}
      aria-labelledby={titleId}
      data-animate={dataAnimate ? "" : undefined}
      className={`scroll-mt-24 px-6 py-16 ${className}`.trim()}
    >
      <div className="mx-auto max-w-6xl">
        <h2 id={titleId} className="mb-8 text-landing-section text-landing-text">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
