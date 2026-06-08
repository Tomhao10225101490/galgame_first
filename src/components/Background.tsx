import { useEffect, useMemo, useRef, useState } from 'react';
import type { BackgroundId } from '../engine/types';
import { SCENE_PROFILES, type SceneVfx } from '../data/sceneProfiles';

interface BackgroundProps {
  bgId: BackgroundId;
}

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() / 1000;
      for (const s of stars) {
        const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 2 + s.twinkle));
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" style={{ width: '100%', height: '100%' }} />;
}

function StaticStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 64}%`,
        delay: `${Math.random() * 4}s`,
      })),
    [],
  );
  return (
    <>
      {stars.map((s) => (
        <div key={s.id} className="star-dot" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
      ))}
    </>
  );
}

function BackgroundContent({ bgId }: { bgId: BackgroundId }) {
  switch (bgId) {
    case 'convenience_night':
      return (
        <>
          <div className="shelf" />
          <div className="fridge-glow" />
          <div className="window-stars">
            <StaticStars />
          </div>
          <div className="store-counter" />
        </>
      );
    case 'convenience_day':
      return (
        <>
          <div className="shelf" />
          <div className="store-counter" />
        </>
      );
    case 'classroom_sunset':
      return (
        <>
          <div className="blackboard" />
          <div className="window-grid" />
        </>
      );
    case 'planetarium_old':
      return (
        <>
          <div className="dome" />
          <div className="crack" />
        </>
      );
    case 'rooftop_stars':
    case 'title_sky':
      return <StarCanvas />;
    case 'station_morning':
      return <div className="tracks" />;
    case 'rain_street':
      return (
        <>
          <div className="rain" />
          <div className="lamp" />
        </>
      );
    case 'underground_machine':
      return (
        <>
          <div className="machine-ring" />
          <div className="machine-core" />
        </>
      );
    case 'school_hallway':
      return <div className="lockers" />;
    case 'beach_dusk':
      return (
        <>
          <div className="horizon" />
          <div className="sand" />
        </>
      );
    default:
      return null;
  }
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
    <div className={`bg-layer ${state} bg-${bgId} tone-${profile.temperature} depth-${profile.depth}`}>
      <div className="bg-camera">
        <BackgroundContent bgId={bgId} />
      </div>
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
