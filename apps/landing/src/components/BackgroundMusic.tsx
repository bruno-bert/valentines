"use client";

import { useEffect, useRef, useState } from "react";

export interface BackgroundMusicProps {
  source?: string;
}

const interactionEvents = ["click", "touchstart", "keydown", "pointerdown"] as const;

export function BackgroundMusic({ source = "/assets/audio/perfect.mp3" }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState("Música: preparando Perfect");

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    let cleanedUp = false;

    const playAudio = async () => {
      try {
        await audio.play();
        if (!cleanedUp) {
          setStatus("Música: Perfect está tocando");
        }
      } catch {
        if (!cleanedUp) {
          setStatus("Música: toque na tela para começar Perfect");
        }
      }
    };

    const playAfterInteraction = () => {
      void playAudio();
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, playAfterInteraction)
      );
    };

    void playAudio();
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, playAfterInteraction, { once: true, passive: true })
    );

    return () => {
      cleanedUp = true;
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, playAfterInteraction)
      );
    };
  }, []);

  return (
    <div className="romantic-music-status">
      <audio ref={audioRef} aria-label="Perfect by Ed Sheeran" loop playsInline preload="auto" src={source} />
      <span>{status}</span>
    </div>
  );
}
