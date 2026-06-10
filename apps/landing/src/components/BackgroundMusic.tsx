"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface BackgroundMusicProps {
  ariaLabel?: string;
  source?: string;
  startOnMount?: boolean;
}

const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;
const playPerfectEventName = "romantic:play-perfect";

export function BackgroundMusic({
  ariaLabel = "Perfect by Ed Sheeran",
  source = "/assets/audio/perfect.mp3",
  startOnMount = true
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState("Música: preparando");

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      audio.muted = false;
      await audio.play();
      setStatus("Música: Perfect está tocando");
    } catch {
      setStatus("Música: tentando tocar Perfect automaticamente");
    }
  }, []);

  useEffect(() => {
    window.addEventListener(playPerfectEventName, playAudio);

    return () => {
      window.removeEventListener(playPerfectEventName, playAudio);
    };
  }, [playAudio]);

  useEffect(() => {
    if (!startOnMount) {
      return undefined;
    }

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
    audio.addEventListener("canplay", playAudio);
    audio.addEventListener("canplaythrough", playAudio);
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, playAfterInteraction, { once: true, passive: true })
    );

    return () => {
      audio.removeEventListener("canplay", playAudio);
      audio.removeEventListener("canplaythrough", playAudio);
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, playAfterInteraction)
      );
    };
  }, [playAudio, startOnMount]);

  return (
    <div className="romantic-music-status">
      <audio
        ref={audioRef}
        aria-label={ariaLabel}
        autoPlay={startOnMount}
        loop
        playsInline
        preload="auto"
        src={source}
      />
      <span className="romantic-music-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="romantic-visually-hidden">{status}</span>
    </div>
  );
}
