import { useRef, useEffect, useState } from "react";

/**
 * ParticleOrbit — OPTIMIZED cinematic background
 * Reduced counts, no trails, capped DPR, simplified rendering
 */

/* ── Simplex-like noise (compact 2D) ── */
function createNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad2 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  return (x: number, y: number): number => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);

    const aa = perm[perm[X] + Y] & 7;
    const ab = perm[perm[X] + Y + 1] & 7;
    const ba = perm[perm[X + 1] + Y] & 7;
    const bb = perm[perm[X + 1] + Y + 1] & 7;

    const dot = (g: number[], fx: number, fy: number) => g[0] * fx + g[1] * fy;

    const x1 = dot(grad2[aa], xf, yf) * (1 - u) + dot(grad2[ba], xf - 1, yf) * u;
    const x2 = dot(grad2[ab], xf, yf - 1) * (1 - u) + dot(grad2[bb], xf - 1, yf - 1) * u;

    return (x1 * (1 - v) + x2 * v + 1) * 0.5;
  };
}

/* ── Types ── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; color: string;
  alpha: number; baseAlpha: number;
  layer: 0 | 1 | 2;
  depth: number; phase: number; phaseSpeed: number;
  noiseOffX: number; noiseOffY: number;
  life: number; maxLife: number;
}

interface Nebula {
  x: number; y: number; baseX: number; baseY: number;
  radius: number; color: string;
  phase: number; speed: number; intensity: number;
}

interface Aurora {
  points: { x: number; y: number; baseY: number; phase: number; speed: number }[];
  color: string; alpha: number; width: number;
}

/* ── Palette ── */
const COLORS = {
  carbon: [35, 38, 36], graphite: [31, 31, 31],
  chartreuse: [223, 244, 64], platinum: [241, 241, 241],
  blue: [75, 129, 151], cherry: [193, 33, 68],
};
const COLOR_KEYS = Object.keys(COLORS) as (keyof typeof COLORS)[];
const rgb = (k: keyof typeof COLORS) => COLORS[k].join(",");
const rgbStr = () => COLORS[COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)]].join(",");

/* ── REDUCED Config ── */
const DUST_COUNT = 40;
const MEDIUM_COUNT = 12;
const LARGE_COUNT = 4;
const MOUSE_RAD = 200;
const MOUSE_FORCE = 0.3;
const BURST_COUNT = 8;
const NOISE_SCALE = 0.0006;
const NOISE_STRENGTH = 0.05;
const DAMPING = 0.975;

/* ── Section → Aurora color mapping ── */
type SectionTheme = { colors: [number[], number[], number[]] };

const SECTION_THEMES: Record<string, SectionTheme> = {
  hero:             { colors: [[75,129,151], [35,38,36], [223,244,64]] },
  services:         { colors: [[35,38,36], [75,129,151], [193,33,68]] },
  work:             { colors: [[75,129,151], [35,38,36], [223,244,64]]  },
  cta:              { colors: [[223,244,64], [75,129,151], [193,33,68]] },
  "projects-hero":  { colors: [[75,129,151], [35,38,36], [223,244,64]] },
  "projects-index": { colors: [[31,31,31], [75,129,151], [35,38,36]]  },
  "projects-reel":  { colors: [[35,38,36], [75,129,151], [193,33,68]] },
};

const DEFAULT_THEME: SectionTheme = { colors: [[75,129,151], [35,38,36], [223,244,64]] };

export function ParticleOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Skip on mobile for performance
  const [isMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    if (!ctx) return;

    const noise = createNoise();
    let raf: number;
    let W = 0, H = 0;
    let time = 0;
    let frame = 0;

    const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: 0, py: 0 };
    let clickWave: { x: number; y: number; t: number } | null = null;
    let scrollSpeed = 0;
    let scrollPrev = 0;
    let isVisible = !document.hidden;

    /* ── Section-aware aurora colors ── */
    const auroraCurrentColors: number[][] = [
      [...DEFAULT_THEME.colors[0]], [...DEFAULT_THEME.colors[1]], [...DEFAULT_THEME.colors[2]],
    ];
    const auroraTargetColors: number[][] = [
      [...DEFAULT_THEME.colors[0]], [...DEFAULT_THEME.colors[1]], [...DEFAULT_THEME.colors[2]],
    ];

    const sectionVisibility = new Map<string, number>();
    const observedSections = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section;
          if (!name) continue;
          if (entry.isIntersecting) sectionVisibility.set(name, entry.intersectionRatio);
          else sectionVisibility.delete(name);
        }
        let bestSection = "", bestRatio = 0;
        sectionVisibility.forEach((ratio, name) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestSection = name; }
        });
        const theme = SECTION_THEMES[bestSection] || DEFAULT_THEME;
        for (let i = 0; i < 3; i++) auroraTargetColors[i] = [...theme.colors[i]];
      },
      { threshold: [0, 0.25, 0.5, 1] }
    );

    const observeSections = () => {
      document.querySelectorAll("[data-section]").forEach((el) => {
        if (observedSections.has(el)) return;
        observedSections.add(el);
        observer.observe(el);
      });
    };
    let sectionObserveTimer = window.setTimeout(observeSections, 500);
    const scheduleSectionObserve = () => {
      window.clearTimeout(sectionObserveTimer);
      sectionObserveTimer = window.setTimeout(observeSections, 300);
    };
    const mutObs = new MutationObserver((mutations) => {
      const hasSectionChange = mutations.some((mutation) =>
        Array.from(mutation.addedNodes).some((node) => {
          if (!(node instanceof Element)) return false;
          return node.matches("[data-section]") || Boolean(node.querySelector("[data-section]"));
        })
      );
      if (hasSectionChange) scheduleSectionObserve();
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    /* ── Nebulae (reduced to 5) ── */
    const nebulae: Nebula[] = [];
    const initNebulae = () => {
      nebulae.length = 0;
      const spots = [[0.1, 0.15], [0.85, 0.1], [0.5, 0.45], [0.15, 0.8], [0.8, 0.85]];
      const cols: (keyof typeof COLORS)[] = ["green", "gold", "purple", "ltGreen", "warm"];
      spots.forEach(([px, py], i) => {
        nebulae.push({
          x: W * px, y: H * py, baseX: W * px, baseY: H * py,
          radius: 120 + Math.random() * 160,
          color: rgb(cols[i]),
          phase: Math.random() * Math.PI * 2,
          speed: 0.0003 + Math.random() * 0.0006,
          intensity: 0.015 + Math.random() * 0.02,
        });
      });
    };

    /* ── Aurora bands ── */
    const auroras: Aurora[] = [];
    const initAuroras = () => {
      auroras.length = 0;
      const bands = [
        { yPct: 0.25, color: rgb("green"), alpha: 0.01, width: 70 },
        { yPct: 0.6, color: rgb("purple"), alpha: 0.007, width: 55 },
        { yPct: 0.85, color: rgb("gold"), alpha: 0.005, width: 45 },
      ];
      for (const b of bands) {
        const pts = [];
        const segments = 8; // reduced from 12
        for (let i = 0; i <= segments; i++) {
          pts.push({
            x: (W / segments) * i, y: H * b.yPct, baseY: H * b.yPct,
            phase: Math.random() * Math.PI * 2,
            speed: 0.0008 + Math.random() * 0.0015,
          });
        }
        auroras.push({ points: pts, color: b.color, alpha: b.alpha, width: b.width });
      }
    };

    /* ── Particles ── */
    const particles: Particle[] = [];

    const mkParticle = (layer: 0 | 1 | 2, atX?: number, atY?: number, burst?: boolean): Particle => {
      const depth = layer === 0 ? 0.2 + Math.random() * 0.3
        : layer === 1 ? 0.4 + Math.random() * 0.3
        : 0.7 + Math.random() * 0.3;

      const sizes: Record<number, number> = { 0: 0.3 + Math.random() * 0.7, 1: 0.8 + Math.random() * 1.4, 2: 1.6 + Math.random() * 2 };
      const alphas: Record<number, number> = { 0: 0.06 + Math.random() * 0.1, 1: 0.1 + Math.random() * 0.2, 2: 0.2 + Math.random() * 0.3 };

      return {
        x: atX ?? Math.random() * W, y: atY ?? Math.random() * H,
        vx: burst ? (Math.random() - 0.5) * 2.5 : (Math.random() - 0.5) * 0.04 * depth,
        vy: burst ? (Math.random() - 0.5) * 2.5 : (Math.random() - 0.5) * 0.04 * depth,
        size: burst ? 0.6 + Math.random() * 1.5 : sizes[layer] * depth,
        color: rgbStr(),
        alpha: burst ? 0.8 : 0,
        baseAlpha: burst ? 0.6 : alphas[layer] * depth,
        layer, depth,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.002 + Math.random() * 0.006,
        noiseOffX: Math.random() * 1000,
        noiseOffY: Math.random() * 1000,
        life: 0,
        maxLife: burst ? 80 + Math.random() * 100 : Infinity,
      };
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < DUST_COUNT; i++) particles.push(mkParticle(0));
      for (let i = 0; i < MEDIUM_COUNT; i++) particles.push(mkParticle(1));
      for (let i = 0; i < LARGE_COUNT; i++) particles.push(mkParticle(2));
    };

    /* ── Setup ── */
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5); // capped lower
      W = innerWidth; H = innerHeight;
      cvs.width = W * dpr; cvs.height = H * dpr;
      cvs.style.width = `${W}px`; cvs.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNebulae(); initAuroras();
      if (!particles.length) initParticles();
    };
    resize();
    addEventListener("resize", resize);

    /* ── Events ── */
    const onMove = (e: MouseEvent) => {
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.px; mouse.vy = mouse.y - mouse.py;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onClick = (e: MouseEvent) => {
      clickWave = { x: e.clientX, y: e.clientY, t: Date.now() };
      for (let i = 0; i < BURST_COUNT; i++) {
        const layer = Math.random() < 0.4 ? 1 : 0;
        particles.push(mkParticle(layer as 0 | 1, e.clientX, e.clientY, true));
      }
    };
    const onScroll = () => { scrollSpeed = Math.abs(scrollY - scrollPrev); scrollPrev = scrollY; };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true; }
    };
    const onTouchEnd = () => { mouse.active = false; };
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    addEventListener("click", onClick);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("touchmove", onTouch, { passive: true });
    addEventListener("touchend", onTouchEnd);

    /* ── RENDER ── */
    const animate = () => {
      if (!isVisible) {
        raf = requestAnimationFrame(animate);
        return;
      }

      frame++;
      time += 0.016;
      const sSpeed = Math.min(scrollSpeed, 60);
      scrollSpeed *= 0.92;

      ctx.clearRect(0, 0, W, H);

      /* ── 1. Nebula clouds ── */
      for (const n of nebulae) {
        n.phase += n.speed;
        n.x = n.baseX + Math.sin(n.phase) * 35;
        n.y = n.baseY + Math.cos(n.phase * 0.7) * 25;
        const r = n.radius * (1 + Math.sin(n.phase * 1.5) * 0.12);
        const intensity = n.intensity * (1 + Math.sin(n.phase * 0.8) * 0.25);

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        g.addColorStop(0, `rgba(${n.color},${intensity})`);
        g.addColorStop(0.4, `rgba(${n.color},${intensity * 0.3})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── 2. Aurora bands ── */
      const LERP_SPEED = 0.04;
      for (let i = 0; i < 3; i++) {
        for (let c = 0; c < 3; c++) {
          auroraCurrentColors[i][c] += (auroraTargetColors[i][c] - auroraCurrentColors[i][c]) * LERP_SPEED;
        }
      }

      ctx.globalCompositeOperation = "screen";
      for (let ai = 0; ai < auroras.length; ai++) {
        const a = auroras[ai];
        const lerpedColor = auroraCurrentColors[ai]
          ? `${Math.round(auroraCurrentColors[ai][0])},${Math.round(auroraCurrentColors[ai][1])},${Math.round(auroraCurrentColors[ai][2])}`
          : a.color;

        for (const pt of a.points) {
          pt.phase += pt.speed;
          pt.y = pt.baseY + Math.sin(pt.phase) * 35 + Math.cos(pt.phase * 0.5 + pt.x * 0.001) * 20;
        }

        ctx.beginPath();
        ctx.moveTo(a.points[0].x, a.points[0].y - a.width / 2);
        for (let i = 1; i < a.points.length; i++) {
          const prev = a.points[i - 1], curr = a.points[i];
          const cpx = (prev.x + curr.x) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y - a.width / 2, cpx, (prev.y + curr.y) / 2 - a.width / 2);
        }
        for (let i = a.points.length - 1; i >= 1; i--) {
          const prev = a.points[i], curr = a.points[i - 1];
          const cpx = (prev.x + curr.x) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y + a.width / 2, cpx, (prev.y + curr.y) / 2 + a.width / 2);
        }
        ctx.closePath();
        const ag = ctx.createLinearGradient(0, a.points[0].y - a.width, 0, a.points[0].y + a.width);
        const aAlpha = a.alpha * (1 + Math.sin(time * 0.3) * 0.35);
        ag.addColorStop(0, "rgba(0,0,0,0)");
        ag.addColorStop(0.35, `rgba(${lerpedColor},${aAlpha})`);
        ag.addColorStop(0.5, `rgba(${lerpedColor},${aAlpha * 1.4})`);
        ag.addColorStop(0.65, `rgba(${lerpedColor},${aAlpha})`);
        ag.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ag;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      /* ── 3. Particles ── */
      const dead: number[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.phase += p.phaseSpeed;

        // Alpha
        if (p.maxLife === Infinity) {
          p.alpha += (p.baseAlpha * (1 + Math.sin(p.phase) * 0.2) - p.alpha) * 0.015;
        } else {
          if (p.life / p.maxLife > 0.4) p.alpha *= 0.97;
          if (p.life >= p.maxLife || p.alpha < 0.002) { dead.push(i); continue; }
        }

        // Noise flow — only every other frame for dust
        if (p.layer > 0 || (frame & 1) === 0) {
          const noiseT = time * 0.035;
          const nx = noise(p.x * NOISE_SCALE + p.noiseOffX + noiseT, p.y * NOISE_SCALE + p.noiseOffY) * 2 - 1;
          const ny = noise(p.x * NOISE_SCALE + p.noiseOffY + noiseT, p.y * NOISE_SCALE + p.noiseOffX) * 2 - 1;
          p.vx += nx * NOISE_STRENGTH * p.depth;
          p.vy += ny * NOISE_STRENGTH * p.depth;
        }

        // Gentle drift
        p.vx += Math.sin(p.phase * 0.3) * 0.002 * p.depth;
        p.vy += Math.cos(p.phase * 0.4) * 0.0015 * p.depth;

        // Scroll turbulence
        if (sSpeed > 5) {
          const turb = sSpeed * 0.008 * p.depth;
          p.vx += (Math.random() - 0.5) * turb;
          p.vy += (Math.random() - 0.5) * turb;
        }

        // Mouse interaction
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const mr = MOUSE_RAD * p.depth;
          if (d2 < mr * mr) {
            const d = Math.sqrt(d2);
            if (d > 1) {
              const falloff = 1 - (d / mr);
              const strength = falloff * falloff * MOUSE_FORCE * p.depth;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * strength * 0.7 + Math.cos(angle + 1.1) * strength * 0.3;
              p.vy += Math.sin(angle) * strength * 0.7 + Math.sin(angle + 1.1) * strength * 0.3;
              p.alpha = Math.min(p.alpha + 0.01 * falloff, p.baseAlpha * 2.2);
            }
          }
        }

        // Click shockwave
        if (clickWave) {
          const el = Date.now() - clickWave.t;
          if (el < 600) {
            const cdx = p.x - clickWave.x, cdy = p.y - clickWave.y;
            const cd = Math.sqrt(cdx * cdx + cdy * cdy);
            const waveR = el * 0.35;
            if (Math.abs(cd - waveR) < 60 && cd > 1) {
              const push = ((1 - Math.abs(cd - waveR) / 60) ** 2) * 1.2 * p.depth;
              p.vx += (cdx / cd) * push;
              p.vy += (cdy / cd) * push;
            }
          } else {
            clickWave = null;
          }
        }

        // Physics
        p.vx *= DAMPING; p.vy *= DAMPING;
        p.x += p.vx; p.y += p.vy;

        // Wrap
        if (p.maxLife === Infinity) {
          const m = 60;
          if (p.x < -m) p.x = W + m;
          if (p.x > W + m) p.x = -m;
          if (p.y < -m) p.y = H + m;
          if (p.y > H + m) p.y = -m;
        }

        if (p.alpha < 0.005) continue;

        // Draw — simplified: glow only for medium+large
        if (p.layer >= 1) {
          ctx.globalCompositeOperation = "screen";
          const glowR = p.size * (p.layer === 2 ? 8 : 5);
          const glowA = p.alpha * (p.layer === 2 ? 0.1 : 0.05);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          g.addColorStop(0, `rgba(${p.color},${glowA})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
        }

        // Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();

        // Sparkle for large
        if (p.layer === 2) {
          const sparkle = 0.5 + Math.sin(p.phase * 3) * 0.5;
          const sLen = p.size * 3 * sparkle;
          if (sLen > 1) {
            ctx.globalCompositeOperation = "screen";
            ctx.strokeStyle = `rgba(${p.color},${p.alpha * 0.3 * sparkle})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x - sLen, p.y); ctx.lineTo(p.x + sLen, p.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(p.x, p.y - sLen); ctx.lineTo(p.x, p.y + sLen); ctx.stroke();
            ctx.globalCompositeOperation = "source-over";
          }
        }
      }

      // Remove dead
      for (let i = dead.length - 1; i >= 0; i--) particles.splice(dead[i], 1);

      // Click ripple (simplified — 1 ring)
      if (clickWave) {
        const el = Date.now() - clickWave.t;
        if (el < 700) {
          const pct = el / 700;
          ctx.globalCompositeOperation = "screen";
          ctx.beginPath();
          ctx.arc(clickWave.x, clickWave.y, el * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb("green")},${(1 - pct) * (1 - pct) * 0.15})`;
          ctx.lineWidth = 1.5 * (1 - pct);
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
      }

      // Mouse glow
      if (mouse.active) {
        ctx.globalCompositeOperation = "screen";
        const mAlpha = Math.min(0.012 + Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) * 0.002, 0.035);
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
        mg.addColorStop(0, `rgba(${rgb("green")},${mAlpha})`);
        mg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      removeEventListener("click", onClick);
      removeEventListener("scroll", onScroll);
      removeEventListener("touchmove", onTouch);
      removeEventListener("touchend", onTouchEnd);
      window.clearTimeout(sectionObserveTimer);
      observer.disconnect();
      mutObs.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-700 particle-orbit-canvas"
      style={{ zIndex: 0, willChange: "transform" }}
    />
  );
}
