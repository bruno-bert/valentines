"use client";

import { useEffect, useState } from "react";

import type { Slide } from "../data/romanticJourneyContent";
import {
  calculateRelationshipElapsedTime,
  type RelationshipElapsedTime
} from "../utils/relationshipTimer";

interface CounterSlideProps {
  slide: Slide;
}

const unitLabels: Array<[keyof RelationshipElapsedTime, string]> = [
  ["years", "anos"],
  ["months", "meses"],
  ["days", "dias"],
  ["hours", "horas"],
  ["minutes", "minutos"],
  ["seconds", "segundos"]
];

function CounterUnits({ elapsed }: { elapsed: RelationshipElapsedTime }) {
  return (
    <div className="romantic-counter-grid">
      {unitLabels.map(([key, label]) => (
        <div className="romantic-counter-card" key={key}>
          <strong>{elapsed[key]}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function CounterDesktopLayout({ slide, elapsed }: CounterSlideProps & { elapsed: RelationshipElapsedTime }) {
  return (
    <div className="romantic-counter romantic-counter-desktop">
      <p className="romantic-script">Jornada</p>
      <h2>{slide.title}</h2>
      <CounterUnits elapsed={elapsed} />
      <p className="romantic-quote">{slide.caption}</p>
    </div>
  );
}

export function CounterMobileLayout({ slide, elapsed }: CounterSlideProps & { elapsed: RelationshipElapsedTime }) {
  return (
    <div className="romantic-counter romantic-counter-mobile">
      <p className="romantic-script">Jornada</p>
      <h2>{slide.title}</h2>
      <CounterUnits elapsed={elapsed} />
      <p className="romantic-quote">{slide.caption}</p>
    </div>
  );
}

export function CounterSlide({ slide }: CounterSlideProps) {
  const [elapsed, setElapsed] = useState(() => calculateRelationshipElapsedTime());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setElapsed(calculateRelationshipElapsedTime());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <CounterDesktopLayout elapsed={elapsed} slide={slide} />
      <CounterMobileLayout elapsed={elapsed} slide={slide} />
    </>
  );
}
