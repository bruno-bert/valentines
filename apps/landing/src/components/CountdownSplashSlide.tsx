"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const countdownSteps = [
  { number: 10, phrase: "carregando nossas caras favoritas..." },
  { number: 9, phrase: "separando as melhores caretas..." },
  { number: 8, phrase: "ativando modo WhatsApp sem vergonha..." },
  { number: 7, phrase: "organizando a bagunca do nosso rolo da camera..." },
  { number: 6, phrase: "procurando a foto mais linda e mais duvidosa..." },
  { number: 5, phrase: "calibrando risadas internas..." },
  { number: 4, phrase: "adicionando um pouco de caos romantico..." },
  { number: 3, phrase: "quase pronto, segura essa cara..." },
  { number: 2, phrase: "sim eu que construí o site, não seria legal ter comprado tá. rsrs..as figurinhas são só pra você ter certeza disso..kkk" },
  { number: 1, phrase: "agora sim. vem comigo." }
];

const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;
const stepDurationMs = 5_000;

interface CountdownSplashSlideProps {
  onComplete: () => void;
  onStartPerfect: () => void;
}

export function CountdownSplashSlide({ onComplete, onStartPerfect }: CountdownSplashSlideProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentStep = countdownSteps[stepIndex];
  const isFinalStep = stepIndex >= countdownSteps.length - 1;

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      audio.muted = false;
      await audio.play();
    } catch {
      // Browser autoplay policies may wait for the first user interaction.
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    const playAfterInteraction = () => {
      void playAudio();
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, playAfterInteraction)
      );
    };

    audio.autoplay = true;
    audio.load();
    void playAudio();
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, playAfterInteraction, { once: true, passive: true })
    );

    return () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, playAfterInteraction)
      );
    };
  }, [playAudio]);

  useEffect(() => {
    if (isFinalStep) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setStepIndex((index) => index + 1);
    }, stepDurationMs);

    return () => window.clearTimeout(timeout);
  }, [isFinalStep, stepIndex]);

  const handleFinalClick = () => {
    onStartPerfect();
    onComplete();
  };

  return (
    <div className="romantic-countdown-splash" aria-live="polite">
      <audio
        ref={audioRef}
        aria-label="Música divertida da contagem regressiva"
        autoPlay
        loop
        playsInline
        preload="auto"
        src="/assets/countdown/music.mp3"
      />
      <div className="romantic-countdown-background" aria-hidden="true">
        <Image
          alt=""
          fill
          priority
          src={`/assets/countdown/${currentStep.number}.webp`}
        />
      </div>
      <div className="romantic-countdown-content">
        <span className="romantic-countdown-label">iniciando nossa jornada</span>
        <strong className="romantic-countdown-number">{currentStep.number}</strong>
        <div className="romantic-countdown-photo">
          <Image
            alt={`Foto divertida da contagem ${currentStep.number}`}
            fill
            priority
            sizes="(max-width: 767px) 82vw, 360px"
            src={`/assets/countdown/${currentStep.number}.webp`}
          />
        </div>
        <p className="romantic-countdown-phrase">{currentStep.phrase}</p>
        {isFinalStep ? (
          <button
            className="romantic-countdown-play"
            type="button"
            onClick={handleFinalClick}
          >
            <span className="romantic-countdown-play-icon" aria-hidden="true" />
            Agora Vai
          </button>
        ) : null}
        <div className="romantic-countdown-progress" aria-hidden="true">
          {countdownSteps.map((step, index) => (
            <span className={index <= stepIndex ? "is-active" : ""} key={step.number} />
          ))}
        </div>
      </div>
    </div>
  );
}
