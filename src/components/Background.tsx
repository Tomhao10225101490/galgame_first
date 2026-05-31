import { useEffect, useRef } from 'react';
import type { BackgroundId } from '../engine/types';

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
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
  }));
  return (
    <>
      {stars.map((s) => (
        <div key={s.id} className="star-dot" style={{ left: s.left, top: s.top }} />
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
          <div className="window-stars"><StaticStars /></div>
        </>
      );
    case 'convenience_day':
      return <div className="shelf" />;
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

export function Background({ bgId }: BackgroundProps) {
  return (
    <div className={`bg-layer visible bg-${bgId}`}>
      <BackgroundContent bgId={bgId} />
    </div>
  );
}
