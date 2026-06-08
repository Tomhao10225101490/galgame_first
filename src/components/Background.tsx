import { useEffect, useRef, useState } from 'react';
import type { BackgroundId } from '../engine/types';
import { BACKGROUND_ASSETS } from '../data/assets';
import { SCENE_PROFILES, type SceneVfx } from '../data/sceneProfiles';

interface BackgroundProps {
  bgId: BackgroundId;
}

function SceneVfxLayer({ effects }: { effects: SceneVfx[] }) {
  return (
    <div className="scene-vfx" aria-hidden="true">
      {effects.includes('rain') && (
        <>
          <div className="vfx-rain vfx-rain-back" />
          <div className="vfx-rain vfx-rain-front" />
          <div className="vfx-puddles" />
        </>
      )}
      {effects.includes('stars') && <div className="vfx-stardust" />}
      {effects.includes('dust') && <div className="vfx-dust" />}
      {effects.includes('sunset') && <div className="vfx-light-rays" />}
      {effects.includes('machine') && (
        <>
          <div className="vfx-scanline" />
          <div className="vfx-energy-grid" />
        </>
      )}
      {effects.includes('station') && <div className="vfx-train-light" />}
      {effects.includes('ocean') && <div className="vfx-ocean-glow" />}
      {effects.includes('store') && <div className="vfx-neon-flicker" />}
      <div className="vfx-film-grain" />
      <div className="vfx-vignette" />
    </div>
  );
}

function BackgroundFrame({ bgId, state }: { bgId: BackgroundId; state: 'current' | 'previous' }) {
  const profile = SCENE_PROFILES[bgId];

  return (
    <div className={`bg-layer ${state} tone-${profile.temperature} depth-${profile.depth}`}>
      <img className="bg-image" src={BACKGROUND_ASSETS[bgId]} alt="" draggable={false} />
      <div className="bg-readable-gradient" />
      <SceneVfxLayer effects={profile.vfx} />
      {state === 'current' && (
        <div className="scene-caption" key={bgId}>
          <span>{profile.title}</span>
          <small>{profile.subtitle}</small>
        </div>
      )}
    </div>
  );
}

export function Background({ bgId }: BackgroundProps) {
  const [previousBg, setPreviousBg] = useState<BackgroundId | null>(null);
  const lastBg = useRef(bgId);

  useEffect(() => {
    if (lastBg.current === bgId) return;
    setPreviousBg(lastBg.current);
    lastBg.current = bgId;
    const timer = window.setTimeout(() => setPreviousBg(null), 1300);
    return () => window.clearTimeout(timer);
  }, [bgId]);

  return (
    <>
      {previousBg && <BackgroundFrame bgId={previousBg} state="previous" />}
      <BackgroundFrame bgId={bgId} state="current" />
    </>
  );
}
