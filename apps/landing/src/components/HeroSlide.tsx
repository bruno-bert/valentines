import Image from "next/image";

import type { Slide } from "../data/romanticJourneyContent";

interface HeroSlideProps {
  slide: Slide;
  onNext: () => void;
}

export function HeroDesktopLayout({ slide, onNext }: HeroSlideProps) {
  return (
    <div className="romantic-hero romantic-hero-desktop">
      <div className="romantic-copy-panel">
        <p className="romantic-script">{slide.subtitle}</p>
        <h1>{slide.title}</h1>
        <p className="romantic-lead">{slide.caption}</p>
        <p>{slide.message}</p>
        <button className="romantic-primary-action" onClick={onNext} type="button">
          Comecar nossa jornada
        </button>
      </div>
      <div className="romantic-photo-frame romantic-hero-photo">
        <Image alt="Imagem romantica abstrata da nossa jornada" fill priority src={slide.image} />
      </div>
    </div>
  );
}

export function HeroMobileLayout({ slide, onNext }: HeroSlideProps) {
  return (
    <div className="romantic-hero romantic-hero-mobile">
      <div className="romantic-photo-frame romantic-mobile-photo">
        <Image alt="Imagem romantica abstrata da nossa jornada" fill priority src={slide.image} />
      </div>
      <div className="romantic-mobile-copy">
        <p className="romantic-script">{slide.subtitle}</p>
        <h1>{slide.title}</h1>
        <p>{slide.message}</p>
        <button className="romantic-primary-action" onClick={onNext} type="button">
          Proximo
        </button>
      </div>
    </div>
  );
}

export function HeroSlide({ slide, onNext }: HeroSlideProps) {
  return (
    <>
      <HeroDesktopLayout slide={slide} onNext={onNext} />
      <HeroMobileLayout slide={slide} onNext={onNext} />
    </>
  );
}
