import type { Slide } from "../data/romanticJourneyContent";

interface OurPlansSlideProps {
  slide: Slide;
}

function PlanItems({ slide }: OurPlansSlideProps) {
  return (
    <ol className="romantic-plan-list">
      {slide.items?.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function OurPlansDesktopLayout({ slide }: OurPlansSlideProps) {
  return (
    <article className="romantic-plans romantic-plans-desktop">
      <div>
        <p className="romantic-script">{slide.subtitle}</p>
        <h2>{slide.title}</h2>
        <p className="romantic-lead">{slide.caption}</p>
      </div>
      <PlanItems slide={slide} />
    </article>
  );
}

export function OurPlansMobileLayout({ slide }: OurPlansSlideProps) {
  return (
    <article className="romantic-plans romantic-plans-mobile">
      <p className="romantic-script">{slide.subtitle}</p>
      <h2>{slide.title}</h2>
      <PlanItems slide={slide} />
      <p className="romantic-lead">{slide.caption}</p>
    </article>
  );
}

export function OurPlansSlide({ slide }: OurPlansSlideProps) {
  return (
    <>
      <OurPlansDesktopLayout slide={slide} />
      <OurPlansMobileLayout slide={slide} />
    </>
  );
}
