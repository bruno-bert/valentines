"use client";

import Image from "next/image";
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

const playPerfectEventName = "romantic:play-perfect";

function renderSlide(
  slide: Slide,
  index: number,
  onCountdownComplete: () => void,
  onStartPerfect: () => void
) {
  switch (slide.type) {
    case "countdown":
      return <CountdownSplashSlide onComplete={onCountdownComplete} onStartPerfect={onStartPerfect} />;
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

interface SwipeHintProps {
  showNext: boolean;
  showPrevious: boolean;
}

function SwipeHint({ showNext, showPrevious }: SwipeHintProps) {
  if (!showNext && !showPrevious) {
    return null;
  }

  return (
    <div
      className={`romantic-swipe-hint ${showNext && showPrevious ? "romantic-swipe-hint-both" : ""}`}
      aria-label="Dica: arraste para esquerda ou direita para navegar"
    >
      {showPrevious ? (
        <div className="romantic-swipe-hint-item">
          <Image
            alt=""
            aria-hidden="true"
            className="romantic-swipe-icon"
            height={278}
            src="/assets/icons/swipe-right.png"
            width={322}
          />
          <span>Arraste para direita</span>
        </div>
      ) : null}
      {showNext ? (
        <div className="romantic-swipe-hint-item">
          <Image
            alt=""
            aria-hidden="true"
            className="romantic-swipe-icon"
            height={440}
            src="/assets/icons/swipe-left.png"
            width={567}
          />
          <span>Arraste para esquerda</span>
        </div>
      ) : null}
    </div>
  );
}

export function RomanticJourney({ slides = romanticJourneySlides }: RomanticJourneyProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalSlides = slides.length;
  const firstVisibleSlideIndex = useMemo(
    () => Math.max(slides.findIndex((slide) => slide.type !== "countdown"), 0),
    [slides]
  );

  const currentSlide = useMemo(() => slides[currentIndex], [currentIndex, slides]);
  const isCountdownSlide = currentSlide?.type === "countdown";
  const visibleSlides = useMemo(() => slides.filter((slide) => slide.type !== "countdown"), [slides]);
  const canNavigatePrevious = currentIndex > firstVisibleSlideIndex && currentSlide?.type !== "hero";
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
    setCurrentIndex((index) => Math.max(index - 1, firstVisibleSlideIndex));
  }, [firstVisibleSlideIndex]);

  const startPerfect = useCallback(() => {
    window.dispatchEvent(new Event(playPerfectEventName));
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

  if (!hasStarted) {
    return (
      <main className="romantic-journey is-start-slide">
        <section className="romantic-start-gate" aria-label="Iniciar jornada">
          <div className="romantic-start-gate-background" aria-hidden="true" />
          <button
            className="romantic-start-button"
            type="button"
            onClick={() => setHasStarted(true)}
          >
            <span className="romantic-start-play" aria-hidden="true" />
            <span className="romantic-start-text">clique para iniciar</span>
          </button>
        </section>
      </main>
    );
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
      <BackgroundMusic
        ariaLabel={isCountdownSlide ? "" : "Perfect by Ed Sheeran"}
        startOnMount={!isCountdownSlide}
      />
      <SlideShell
        backgroundImage={currentSlide.image}
        className={getSlideShellClass(currentSlide.type)}
        navigation={isCountdownSlide ? null : (
          <NavigationButtons
            ariaNextLabel="Ir para o próximo slide"
            ariaPreviousLabel="Voltar para o slide anterior"
            disableNext={false}
            disablePrevious={!canNavigatePrevious}
            onNext={nextSlide}
            onPrevious={previousSlide}
            showNext
            showPrevious={canNavigatePrevious}
          />
        )}
        pagination={isCountdownSlide ? null : (
          <>
            <SwipeHint showNext showPrevious={canNavigatePrevious} />
            <div className="romantic-pagination" aria-label={`Slide ${visibleSlideIndex + 1} de ${visibleSlides.length}`}>
              {visibleSlides.map((slide, index) => (
                <span
                  aria-hidden="true"
                  className={index === visibleSlideIndex ? "is-active" : ""}
                  key={slide.id}
                />
              ))}
            </div>
          </>
        )}
      >
        {renderSlide(currentSlide, currentIndex, nextSlide, startPerfect)}
      </SlideShell>
    </main>
  );
}
