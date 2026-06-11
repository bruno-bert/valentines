"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const countdownSteps = [
  { number: 10, phrase: "Carregando nossas caras favoritas..." },
  { number: 9, phrase: "Separando as melhores caretas..." },
  { number: 8, phrase: "Ativando modo WhatsApp sem vergonha..." },
  { number: 7, phrase: "Organizando a bagunça do nosso rolo da câmera..." },
  { number: 6, phrase: "Procurando a foto mais linda e mais duvidosa..." },
  { number: 5, phrase: "Calibrando risadas internas..." },
  { number: 4, phrase: "Adicionando um pouco de caos romântico..." },
  { number: 3, phrase: "Quase pronto, segura essa cara..." },
  { number: 2, phrase: "Sim, eu que construí o site. Não seria legal ter comprado, tá? Rsrs... as figurinhas são só pra você ter certeza disso. Kkk." },
  { number: 1, phrase: "Agora sim. Vem comigo." }
];

const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;
const stepDurationMs = 5_000;

interface CountdownSplashSlideProps {
  onComplete: () => void;
  onStartPerfect: () => void;
}

export function CountdownSplashSlide({ onComplete, onStartPerfect }: CountdownSplashSlideProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showVideoStep, setShowVideoStep] = useState(false);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (isFinalStep || showVideoStep) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setStepIndex((index) => index + 1);
    }, stepDurationMs);

    return () => window.clearTimeout(timeout);
  }, [isFinalStep, showVideoStep, stepIndex]);

  const handleFinalClick = () => {
    audioRef.current?.pause();
    setShowVideoStep(true);
    window.setTimeout(() => {
      void videoRef.current?.play();
    }, 0);
  };

  const handleTrueFinalClick = () => {
    onStartPerfect();
    onComplete();
  };

  if (showVideoStep) {
    return (
      <div className="romantic-countdown-splash romantic-countdown-video-step" aria-live="polite">
        <div className="romantic-countdown-background" aria-hidden="true">
          <Image
            alt=""
            fill
            priority
            src="/assets/countdown/1.webp"
          />
        </div>
        <div className="romantic-countdown-content romantic-countdown-video-content">
          <span className="romantic-countdown-label">iniciando nossa jornada</span>
          <strong className="romantic-countdown-number">0</strong>
          <div className="romantic-countdown-phrase">
            Espera... uma piadinha final. Ela é linda até com gases.
          </div>
          <video
            ref={videoRef}
            className="romantic-countdown-video"
            aria-label="Piadinha final"
            autoPlay
            controls
            playsInline
            preload="auto"
            src="/assets/countdown/video.mp4"
            onEnded={() => setHasVideoEnded(true)}
          />
          {hasVideoEnded ? (
            <button
              className="romantic-countdown-play"
              type="button"
              onClick={handleTrueFinalClick}
            >
              <span className="romantic-countdown-play-icon" aria-hidden="true" />
              Agora Vai, De Verdade
            </button>
          ) : null}
        </div>
      </div>
    );
  }

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
        <div className="romantic-countdown-phrase">{currentStep.phrase}</div>
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
