import { useRef, useEffect, useState } from "react";

/**
 * ParticleOverlay — OPTIMIZED foreground ember layer
 * Reduced count, no connections, simplified glow
 */

interface Ember {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; color: string;
  alpha: number; baseAlpha: number;
  drift: number; phase: number;
  speed: number; depth: number;
}

const EMBER_COLORS = [
  "32,19,42", "12,96,126", "12,96,126",
  "83,166,184", "230,232,235", "199,164,106",
];

const EMBER_COUNT = 20;
const MOUSE_INFLUENCE = 100;

export function ParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embers = useRef<Ember[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const containerRef = useRef({ w: 0, h: 0 });
  const time = useRef(0);

  // Skip on mobile for performance
  const [isMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const parent = cvs.parentElement;
    if (!parent) return;

    let raf: number;
    let isVisible = !document.hidden;

    const mkEmber = (w: number, h: number): Ember => {
      const depth = 0.3 + Math.random() * 0.7;
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.06 + Math.random() * 0.2) * depth,
        radius: (0.3 + Math.random() * 1.1) * depth,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        alpha: 0,
        baseAlpha: (0.04 + Math.random() * 0.15) * depth,
        drift: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.015,
        depth,
      };
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5);
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = parent.scrollHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      cvs.style.width = `${w}px`; cvs.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      containerRef.current = { w, h };

      if (!embers.current.length) {
        for (let i = 0; i < EMBER_COUNT; i++) embers.current.push(mkEmber(w, h));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + parent.scrollTop,
        active: true,
      };
    };
    const onLeave = () => { mouse.current.active = false; };
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      if (!isVisible) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const { w, h } = containerRef.current;
      ctx.clearRect(0, 0, w, h);
      time.current += 0.016;
      const t = time.current;
      const m = mouse.current;
      const es = embers.current;

      for (const e of es) {
        e.phase += e.speed;

        e.vx += Math.sin(e.phase + e.drift * t) * 0.002;
        e.vy += Math.cos(e.phase * 0.7) * 0.0008 - 0.0015 * e.depth;

        if (m.active) {
          const dx = m.x - e.x, dy = m.y - e.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_INFLUENCE * MOUSE_INFLUENCE && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / MOUSE_INFLUENCE) * 0.012 * e.depth;
            e.vx += (dx / d) * f;
            e.vy += (dy / d) * f;
            e.alpha = Math.min(e.alpha + 0.002, e.baseAlpha * 2);
          }
        }

        e.vx *= 0.993; e.vy *= 0.993;
        e.x += e.vx; e.y += e.vy;

        e.alpha += (e.baseAlpha * (1 + Math.sin(e.phase) * 0.2) - e.alpha) * 0.012;

        if (e.y < -20) { e.y = h + 20; e.x = Math.random() * w; }
        if (e.y > h + 20) { e.y = -20; e.x = Math.random() * w; }
        if (e.x < -20) e.x = w + 20;
        if (e.x > w + 20) e.x = -20;

        if (e.alpha < 0.005) continue;

        // Simplified glow — single gradient stop
        if (e.radius > 0.5) {
          const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius * 6);
          g.addColorStop(0, `rgba(${e.color},${e.alpha * 0.3})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${e.color},${e.alpha})`;
        ctx.fill();
      }

      // NO connections — removed O(n²) loop

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none particle-overlay-canvas"
      style={{ zIndex: 1, willChange: "transform" }}
    />
  );
}
