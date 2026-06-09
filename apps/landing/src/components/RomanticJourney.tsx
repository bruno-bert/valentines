"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { romanticJourneySlides, type Slide } from "../data/romanticJourneyContent";
import { BackgroundMusic } from "./BackgroundMusic";
import { CounterSlide } from "./CounterSlide";
import { FinalMessageSlide } from "./FinalMessageSlide";
import { HeroSlide } from "./HeroSlide";
import { JourneyPhotoSlide } from "./JourneyPhotoSlide";
import { NavigationButtons } from "./NavigationButtons";
import { SlideShell } from "./SlideShell";
import { WhatILoveSlide } from "./WhatILoveSlide";

interface RomanticJourneyProps {
  slides?: Slide[];
}

function renderSlide(slide: Slide, index: number, onNext: () => void, onPrevious: () => void) {
  switch (slide.type) {
    case "hero":
      return <HeroSlide slide={slide} onNext={onNext} />;
    case "counter":
      return <CounterSlide slide={slide} onNext={onNext} />;
    case "journey-photo":
      return <JourneyPhotoSlide slide={slide} index={index} onNext={onNext} onPrevious={onPrevious} />;
    case "what-i-love":
      return <WhatILoveSlide slide={slide} onNext={onNext} onPrevious={onPrevious} />;
    case "final-message":
      return <FinalMessageSlide slide={slide} />;
    default:
      return null;
  }
}

export function RomanticJourney({ slides = romanticJourneySlides }: RomanticJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalSlides = slides.length;

  const currentSlide = useMemo(() => slides[currentIndex], [currentIndex, slides]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % totalSlides);
  }, [totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide]);

  if (!currentSlide) {
    return null;
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(deltaX) >= 48) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    setTouchStartX(null);
  };

  return (
    <main
      className={`romantic-journey ${currentSlide.type === "hero" ? "is-hero-slide" : ""}`}
      onTouchEnd={handleTouchEnd}
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
    >
      <BackgroundMusic />
      <SlideShell
        backgroundImage={currentSlide.image}
        className={currentSlide.type === "hero" ? "romantic-slide-shell-hero" : (currentSlide.type === "counter" || currentSlide.type === "journey-photo" || currentSlide.type === "what-i-love") ? "romantic-slide-shell-full" : ""}
        navigation={
          <NavigationButtons
            ariaNextLabel="Ir para o próximo slide"
            ariaPreviousLabel="Voltar para o slide anterior"
            disableNext={false}
            disablePrevious={currentIndex === 0}
            hideNext={currentSlide.type === "counter" || currentSlide.type === "journey-photo" || currentSlide.type === "what-i-love"}
            hidePrevious={currentSlide.type === "journey-photo" || currentSlide.type === "what-i-love"}
            onNext={nextSlide}
            onPrevious={previousSlide}
          />
        }
        pagination={
          <div className="romantic-pagination" aria-label={`Slide ${currentIndex + 1} de ${totalSlides}`}>
            {slides.map((slide, index) => (
              <span
                aria-hidden="true"
                className={index === currentIndex ? "is-active" : ""}
                key={slide.id}
              />
            ))}
          </div>
        }
      >
        {renderSlide(currentSlide, currentIndex, nextSlide, previousSlide)}
      </SlideShell>
    </main>
  );
}
