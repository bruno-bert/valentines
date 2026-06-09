import type { DifferentiatorsSectionViewModel } from "../../lib/content/types";

export function DifferentiatorsSection({
  sectionId,
  title,
  titleId,
  items
}: DifferentiatorsSectionViewModel) {
  return (
    <section
      id={sectionId}
      aria-labelledby={titleId}
      data-animate
      className="scroll-mt-24 bg-landing-primary px-6 py-16 text-white motion-fade-up"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id={titleId} className="mb-8 text-landing-section">
          {title}
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-landing-lg border border-white/20 bg-white/10 p-5 backdrop-blur"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-landing-small text-white/90">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
