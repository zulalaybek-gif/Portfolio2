import { useEffect, useRef, useCallback } from "react";

/**
 * ColorGlow — Soft, pulsing colored light orbs on canvas.
 * Each orb drifts slowly and pulses in opacity, creating an
 * ambient glow effect matching a proposition's color palette.
 */

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string; // "r,g,b"
  opacity: number;
  phase: number;
  phaseSpeed: number;
  pulseAmp: number;
}

function createOrb(w: number, h: number, colors: string[]): Orb {
  const radius = 100 + Math.random() * 220;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: 0.15 + Math.random() * 0.2,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.004 + Math.random() * 0.008,
    pulseAmp: 0.06 + Math.random() * 0.08,
  };
}

interface Props {
  /** Array of "r,g,b" color strings */
  colors: string[];
  count?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ColorGlow({ colors, count = 6, className = "", style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const rafRef = useRef<number>(0);
  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  const init = useCallback(
    (w: number, h: number) => {
      const arr: Orb[] = [];
      for (let i = 0; i < count; i++) {
        arr.push(createOrb(w, h, colorsRef.current));
      }
      orbsRef.current = arr;
    },
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (orbsRef.current.length === 0) {
        init(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const orb of orbsRef.current) {
        // Drift
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce softly at edges
        if (orb.x < -orb.radius) orb.x = w + orb.radius;
        if (orb.x > w + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = h + orb.radius;
        if (orb.y > h + orb.radius) orb.y = -orb.radius;

        // Pulse
        orb.phase += orb.phaseSpeed;
        const alpha = orb.opacity + Math.sin(orb.phase) * orb.pulseAmp;

        // Draw radial gradient orb
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        grad.addColorStop(0, `rgba(${orb.color},${Math.max(0, alpha)})`);
        grad.addColorStop(0.5, `rgba(${orb.color},${Math.max(0, alpha * 0.4)})`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [init]);

  // Update colors when they change
  useEffect(() => {
    for (const orb of orbsRef.current) {
      orb.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: "-30%",
        height: "130%",
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        ...style,
      }}
    />
  );
}