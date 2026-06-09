import Image from "next/image";

import type { Slide } from "../data/romanticJourneyContent";

interface JourneyPhotoSlideProps {
  slide: Slide;
}

export function JourneyPhotoDesktopLayout({ slide }: JourneyPhotoSlideProps) {
  return (
    <article className="romantic-journey-photo romantic-journey-desktop">
      <div className="romantic-photo-frame romantic-journey-image">
        <Image alt={`Foto romantica: ${slide.title}`} fill sizes="50vw" src={slide.image} />
      </div>
      <div className="romantic-copy-panel">
        <p className="romantic-script">só nossa</p>
        <h2>{slide.title}</h2>
        <p className="romantic-lead">{slide.caption}</p>
      </div>
    </article>
  );
}

export function JourneyPhotoMobileLayout({ slide }: JourneyPhotoSlideProps) {
  return (
    <article className="romantic-journey-photo romantic-journey-mobile">
      <p className="romantic-script">só nossa</p>
      <h2>{slide.title}</h2>
      <div className="romantic-photo-frame romantic-mobile-photo">
        <Image alt={`Foto romantica: ${slide.title}`} fill sizes="100vw" src={slide.image} />
      </div>
      <p>{slide.caption}</p>
    </article>
  );
}

export function JourneyPhotoSlide({ slide }: JourneyPhotoSlideProps) {
  return (
    <>
      <JourneyPhotoDesktopLayout slide={slide} />
      <JourneyPhotoMobileLayout slide={slide} />
    </>
  );
}
