import { useRef, useEffect, useState } from "react";
import { useAnimationActive } from "./useAnimationActive";

/**
 * ParticleDivider — OPTIMIZED horizontal particle stream
 * Reduced count, no connections, no glow for small particles
 */

interface StreamParticle {
  x: number; y: number;
  vx: number; radius: number;
  color: string; alpha: number;
  phase: number; amp: number; speed: number;
}

const STREAM_COLORS = [
  "32,19,42", "12,96,126", "83,166,184",
  "230,232,235", "199,164,106", "15,23,32",
];

interface Props {
  accent?: string;
  height?: number;
  count?: number;
  direction?: 1 | -1;
}

export function ParticleDivider({
  accent,
  height = 60,
  count = 30,
  direction = 1,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<StreamParticle[]>([]);
  const mouse = useRef({ x: -1, y: -1, active: false });
  const sizeRef = useRef({ w: 0, h: 0 });
  const isAnimationActive = useAnimationActive(canvasRef);

  // Skip on mobile for performance
  const [isMobile] = useState(() => window.innerWidth < 768);

  // Reduce actual count for performance
  const actualCount = Math.min(count, 15);

  useEffect(() => {
    if (isMobile || !isAnimationActive) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const parent = cvs.parentElement;
    if (!parent) return;
    let raf: number;

    const mkP = (w: number, h: number): StreamParticle => {
      const colors = accent ? [accent, "12,96,126", "32,19,42", ...STREAM_COLORS.slice(2, 4)] : STREAM_COLORS;
      return {
        x: Math.random() * w,
        y: h / 2 + (Math.random() - 0.5) * h * 0.5,
        vx: (0.15 + Math.random() * 0.45) * direction,
        radius: 0.4 + Math.random() * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.05 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        amp: 3 + Math.random() * 10,
        speed: 0.01 + Math.random() * 0.025,
      };
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      const w = parent.clientWidth;
      cvs.width = w * dpr; cvs.height = height * dpr;
      cvs.style.width = `${w}px`; cvs.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h: height };

      if (!particles.current.length) {
        for (let i = 0; i < actualCount; i++) particles.current.push(mkP(w, height));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouse.current.active = false; };
    cvs.addEventListener("mousemove", onMove);
    cvs.addEventListener("mouseleave", onLeave);

    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      const ps = particles.current;
      const m = mouse.current;

      // Center line
      ctx.beginPath();
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      for (const p of ps) {
        p.phase += p.speed;
        p.x += p.vx;

        const baseY = h / 2 + Math.sin(p.phase) * p.amp;
        p.y += (baseY - p.y) * 0.05;

        if (m.active) {
          const dx = p.x - m.x, dy = p.y - m.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 50 && d > 1) {
            p.y += (dy / d) * (1 - d / 50) * 1.2;
          }
        }

        if (direction > 0 && p.x > w + 10) p.x = -10;
        if (direction < 0 && p.x < -10) p.x = w + 10;

        // Draw body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();

        // Trail dot only
        ctx.beginPath();
        ctx.arc(p.x - p.vx * 3, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha * 0.25})`;
        ctx.fill();
      }

      // NO connections — removed O(n²) loop

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cvs.removeEventListener("mousemove", onMove);
      cvs.removeEventListener("mouseleave", onLeave);
    };
  }, [accent, height, actualCount, direction, isMobile, isAnimationActive]);

  if (isMobile) return <div style={{ height: height / 2 }} />;

  return (
    <div className="w-full px-8 md:px-12" style={{ height }}>
      <canvas
        ref={canvasRef}
        className="w-full pointer-events-auto cursor-crosshair"
        style={{ height, willChange: "transform" }}
      />
    </div>
  );
}
