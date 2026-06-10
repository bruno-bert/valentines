"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { romanticJourneySlides, type Slide } from "../data/romanticJourneyContent";
import { BackgroundMusic } from "./BackgroundMusic";
import { CountdownSplashSlide } from "./CountdownSplashSlide";
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

function renderSlide(slide: Slide, index: number, onCountdownComplete: () => void) {
  switch (slide.type) {
    case "countdown":
      return <CountdownSplashSlide onComplete={onCountdownComplete} />;
    case "hero":
      return <HeroSlide slide={slide} />;
    case "counter":
      return <CounterSlide slide={slide} />;
    case "journey-photo":
      return <JourneyPhotoSlide slide={slide} index={index} />;
    case "what-i-love":
      return <WhatILoveSlide slide={slide} />;
    case "final-message":
      return <FinalMessageSlide slide={slide} />;
    default:
      return null;
  }
}

function getSlideShellClass(slideType: Slide["type"]) {
  if (slideType === "hero") {
    return "romantic-slide-shell-hero";
  }

  return "romantic-slide-shell-full";
}

export function RomanticJourney({ slides = romanticJourneySlides }: RomanticJourneyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalSlides = slides.length;

  const currentSlide = useMemo(() => slides[currentIndex], [currentIndex, slides]);
  const isCountdownSlide = currentSlide?.type === "countdown";
  const visibleSlides = useMemo(() => slides.filter((slide) => slide.type !== "countdown"), [slides]);
  const visibleSlideIndex = useMemo(
    () => slides.slice(0, currentIndex + 1).filter((slide) => slide.type !== "countdown").length - 1,
    [currentIndex, slides]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((index) => {
      const nextIndex = (index + 1) % totalSlides;

      if (slides[nextIndex]?.type === "countdown" && totalSlides > 1) {
        return 1;
      }

      return nextIndex;
    });
  }, [slides, totalSlides]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        if (isCountdownSlide) {
          return;
        }

        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        if (isCountdownSlide) {
          return;
        }

        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCountdownSlide, nextSlide, previousSlide]);

  if (!currentSlide) {
    return null;
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX === null) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX;

    if (isCountdownSlide) {
      setTouchStartX(null);
      return;
    }

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
      className={`romantic-journey ${currentSlide.type === "hero" ? "is-hero-slide" : ""} ${isCountdownSlide ? "is-countdown-slide" : ""}`}
      onTouchEnd={handleTouchEnd}
      onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)}
    >
      {isCountdownSlide ? null : <BackgroundMusic />}
      <SlideShell
        backgroundImage={currentSlide.image}
        className={getSlideShellClass(currentSlide.type)}
        navigation={isCountdownSlide ? null : (
          <NavigationButtons
            ariaNextLabel="Ir para o próximo slide"
            ariaPreviousLabel="Voltar para o slide anterior"
            disableNext={false}
            disablePrevious={currentIndex === 0 || currentSlide.type === "hero"}
            onNext={nextSlide}
            onPrevious={previousSlide}
            showNext
            showPrevious={currentIndex > 0 && currentSlide.type !== "hero"}
          />
        )}
        pagination={isCountdownSlide ? null : (
          <div className="romantic-pagination" aria-label={`Slide ${visibleSlideIndex + 1} de ${visibleSlides.length}`}>
            {visibleSlides.map((slide, index) => (
              <span
                aria-hidden="true"
                className={index === visibleSlideIndex ? "is-active" : ""}
                key={slide.id}
              />
            ))}
          </div>
        )}
      >
        {renderSlide(currentSlide, currentIndex, nextSlide)}
      </SlideShell>
    </main>
  );
}
