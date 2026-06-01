import { useEffect, useRef, useState } from 'react';
import type { BackgroundId } from '../engine/types';
import { BACKGROUND_ASSETS } from '../data/assets';

interface BackgroundProps {
  bgId: BackgroundId;
}

export function Background({ bgId }: BackgroundProps) {
  const [current, setCurrent] = useState(bgId);
  const [next, setNext] = useState<BackgroundId | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (bgId === current) return;

    setNext(bgId);
    setFadeIn(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFadeIn(true));
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setCurrent(bgId);
      setNext(null);
      setFadeIn(false);
    }, 1200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [bgId, current]);

  const url = BACKGROUND_ASSETS[current];
  const nextUrl = next ? BACKGROUND_ASSETS[next] : null;

  return (
    <div className="bg-image-root">
      <div
        className="bg-image-layer bg-image-current"
        style={{ backgroundImage: `url(${url})` }}
      />
      {nextUrl && (
        <div
          className={`bg-image-layer bg-image-next ${fadeIn ? 'visible' : ''}`}
          style={{ backgroundImage: `url(${nextUrl})` }}
        />
      )}
      <div className="bg-image-vignette" />
      {bgId === 'rain_street' && <div className="bg-rain-overlay" />}
    </div>
  );
}
