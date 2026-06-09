import type { LegalSectionViewModel } from "@nobu/content-legal";

type LegalDocumentBodyProps = {
  sections: LegalSectionViewModel[];
};

export function LegalDocumentBody({ sections }: LegalDocumentBodyProps) {
  return (
    <article className="space-y-8">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24">
          <h2 className="text-landing-section font-bold text-landing-text">{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.id}-${index}`} className="text-landing-body text-landing-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
