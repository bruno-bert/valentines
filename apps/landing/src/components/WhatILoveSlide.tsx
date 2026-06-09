import Image from "next/image";

import type { Slide } from "../data/romanticJourneyContent";

interface WhatILoveSlideProps {
  slide: Slide;
}

function LoveItems({ slide }: WhatILoveSlideProps) {
  return (
    <div className="romantic-item-grid">
      {slide.items?.map((item) => (
        <div className="romantic-item-card" key={item.title}>
          {item.icon ? <Image alt="" aria-hidden="true" height={34} src={item.icon} width={34} /> : null}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function WhatILoveDesktopLayout({ slide }: WhatILoveSlideProps) {
  return (
    <article className="romantic-special romantic-special-desktop">
      <div>
        <p className="romantic-script">{slide.subtitle}</p>
        <h2>{slide.title}</h2>
        <p className="romantic-lead">{slide.caption}</p>
      </div>
      <LoveItems slide={slide} />
    </article>
  );
}

export function WhatILoveMobileLayout({ slide }: WhatILoveSlideProps) {
  return (
    <article className="romantic-special romantic-special-mobile">
      <p className="romantic-script">{slide.subtitle}</p>
      <h2>{slide.title}</h2>
      <p>{slide.caption}</p>
      <LoveItems slide={slide} />
    </article>
  );
}

export function WhatILoveSlide({ slide }: WhatILoveSlideProps) {
  return (
    <>
      <WhatILoveDesktopLayout slide={slide} />
      <WhatILoveMobileLayout slide={slide} />
    </>
  );
}
