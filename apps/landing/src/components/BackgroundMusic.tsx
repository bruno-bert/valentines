"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface BackgroundMusicProps {
  source?: string;
}

const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;

export function BackgroundMusic({ source = "/assets/audio/perfect.mp3" }: BackgroundMusicProps) {
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
  }, [playAudio]);

  return (
    <div className="romantic-music-status">
      <audio
        ref={audioRef}
        aria-label="Perfect by Ed Sheeran"
        autoPlay
        loop
        playsInline
        preload="auto"
        src={source}
      />
      <span>{status}</span>
    </div>
  );
}
