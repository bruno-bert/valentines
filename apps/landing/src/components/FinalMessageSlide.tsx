import Image from "next/image";

import type { Slide } from "../data/romanticJourneyContent";

interface FinalMessageSlideProps {
  slide: Slide;
}

export function FinalMessageDesktopLayout({ slide }: FinalMessageSlideProps) {
  return (
    <article className="romantic-final romantic-final-desktop">
      <div className="romantic-photo-frame romantic-final-photo">
        <Image alt="Imagem romantica abstrata da mensagem final" fill sizes="42vw" src={slide.image} />
      </div>
      <div className="romantic-copy-panel">
        <p className="romantic-script">{slide.subtitle}</p>
        <h2>{slide.title}</h2>
        <p>{slide.message}</p>
        <strong>FIM</strong>
        <span>(de um grande começo)</span>
        <p className="romantic-lead">{slide.caption}</p>
      </div>
    </article>
  );
}

export function FinalMessageMobileLayout({ slide }: FinalMessageSlideProps) {
  return (
    <article className="romantic-final romantic-final-mobile">
      <div className="romantic-photo-frame romantic-mobile-photo">
        <Image alt="Imagem romantica abstrata da mensagem final" fill sizes="100vw" src={slide.image} />
      </div>
      <h2>{slide.title}</h2>
      <p>{slide.message}</p>
      <strong>FIM</strong>
      <span>(de um grande começo)</span>
      <p className="romantic-lead">{slide.caption}</p>
    </article>
  );
}

export function FinalMessageSlide({ slide }: FinalMessageSlideProps) {
  return (
    <>
      <FinalMessageDesktopLayout slide={slide} />
      <FinalMessageMobileLayout slide={slide} />
    </>
  );
}
