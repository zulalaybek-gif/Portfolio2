import { useRef, useEffect, useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import { CompositeTitle } from "./CompositeTitle";

/* ── Magnetic cursor canvas ── */
function MagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1, active: false });
  const { isDark } = useTheme();
  const dots = useRef<Array<{ ox: number; oy: number; x: number; y: number; vx: number; vy: number }>>([]);
  const raf = useRef(0);
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    return !reduceMotion && canHover && window.innerWidth >= 1024;
  });

  useEffect(() => {
    if (!enabled) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    let isVisible = !document.hidden;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = cvs.getBoundingClientRect();
      cvs.width = rect.width * dpr;
      cvs.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-create grid
      const cols = Math.max(1, Math.floor(rect.width / 48));
      const rows = Math.max(1, Math.floor(rect.height / 48));
      dots.current = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = (c + 0.5) * (rect.width / cols);
          const oy = (r + 0.5) * (rect.height / rows);
          dots.current.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      if (!isVisible) {
        raf.current = requestAnimationFrame(animate);
        return;
      }
      const rect = cvs.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const m = mouse.current;
      const baseAlpha = isDark ? 0.055 : 0.038;
      const accentRGB = isDark ? "127,214,255" : "93,169,255";

      for (const d of dots.current) {
        let fx = 0, fy = 0;
        if (m.active) {
          const dx = d.ox - m.x, dy = d.oy - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 1) {
            const force = (1 - dist / 150) * 20;
            fx = (dx / dist) * force;
            fy = (dy / dist) * force;
          }
        }
        // Spring back to origin
        const sx = (d.ox + fx - d.x) * 0.08;
        const sy = (d.oy + fy - d.y) * 0.08;
        d.vx = d.vx * 0.85 + sx;
        d.vy = d.vy * 0.85 + sy;
        d.x += d.vx;
        d.y += d.vy;

        const displacement = Math.sqrt((d.x - d.ox) ** 2 + (d.y - d.oy) ** 2);
        const alpha = baseAlpha + Math.min(displacement / 20, 1) * 0.25;
        const radius = 1 + Math.min(displacement / 15, 1.5);

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRGB},${alpha})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, isDark]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);
  const onLeave = useCallback(() => { mouse.current.active = false; }, []);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
}

/* ── Infinite marquee ── */
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const { r, isDark } = useTheme();
  const dotAccents = isDark
    ? ["#7FD6FF", "#5DA9FF", "#7B2D52", "#0D1B2A", "#7FD6FF"]
    : ["#0D1B2A", "#5DA9FF", "#7B2D52", "#0D1B2A", "#5DA9FF"];
  const content = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-3" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <div
        className="inline-flex gap-8 marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: r(0.2), textTransform: "uppercase" as const, letterSpacing: "0.15em" }}>
              {item}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: dotAccents[i % dotAccents.length], opacity: 0.55 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const statAccents = isDark ? ["#7FD6FF", "#F4F5F7", "#5DA9FF"] : ["#5DA9FF", "#0D1B2A", "#7B2D52"];

  const marqueeItems1 = lang === "fr"
    ? ["Design Graphique", "Direction Artistique", "Identité Visuelle", "Brand Content", "Motion Design", "Print & Édition", "Web Design", "Photographie"]
    : ["Graphic Design", "Art Direction", "Visual Identity", "Brand Content", "Motion Design", "Print & Editorial", "Web Design", "Photography"];

  return (
    <section ref={ref} data-section="hero" className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: "clamp(420px, 60vw, 980px)",
          height: "clamp(420px, 60vw, 980px)",
          right: "-22%",
          top: "-24%",
          background: "radial-gradient(circle, rgba(93,169,255,0.26), rgba(127,214,255,0.08) 42%, transparent 72%)",
          filter: "blur(24px)",
          opacity: isDark ? 0.9 : 0.74,
          mixBlendMode: isDark ? "screen" : "multiply",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: "-16%",
          bottom: "6%",
          width: "clamp(260px, 38vw, 680px)",
          height: "clamp(260px, 38vw, 680px)",
          background: "radial-gradient(circle, rgba(123,45,82,0.08), rgba(93,169,255,0.14) 44%, transparent 72%)",
          filter: "blur(30px)",
          opacity: isDark ? 0.72 : 0.54,
          zIndex: 0,
        }}
      />
      {/* Magnetic dot field */}
      <div className="absolute inset-0 pointer-events-auto z-0">
        <MagneticField />
      </div>

      {/* Main content — vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-16">
        {/* Role badge */}
        <div className="mb-7 animate-soft-enter" style={{ animationDelay: "0.15s" }}>
          <span
            className="inline-block px-5 py-2 rounded-full uppercase tracking-widest"
            style={{
              fontSize: "0.65rem",
              fontFamily: "'Inter', sans-serif",
              backdropFilter: "blur(12px)",
              background: p.badgeBg,
              border: `1px solid ${p.badgeBorder}`,
              color: r(0.5),
            }}
          >
            {t("hero.badge")}
          </span>
        </div>

        {/* Name — massive typographic treatment */}
        <div className="text-center mb-8">
          <CompositeTitle
            as="h1"
            align="center"
            size="hero"
            className="animate-soft-enter"
            primary={lang === "fr" ? "CRÉER" : "CREATE"}
            secondary={lang === "fr" ? "l'inoubliable." : "the unforgettable."}
          />
        </div>

        {/* Tagline + CTA — asymmetric layout */}
        <div
          className="flex flex-col items-center gap-8 max-w-lg text-center animate-soft-enter"
          style={{ animationDelay: "0.45s" }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
              color: r(0.45),
            }}
          >
            {t("hero.desc")}
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              className="group flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #7FD6FF 0%, #5DA9FF 58%, #5DA9FF 145%)"
                  : "linear-gradient(135deg, #0D1B2A 0%, #5DA9FF 62%, #7B2D52 145%)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: isDark ? "#0D1B2A" : "#F4F5F7",
                boxShadow: isDark
                  ? "0 18px 54px rgba(127,214,255,0.16), 0 0 28px rgba(93,169,255,0.12)"
                  : "0 18px 48px rgba(13,27,42,0.18), 0 0 28px rgba(93,169,255,0.08), 0 0 18px rgba(123,45,82,0.06)",
              }}
              onClick={() => navigate("/contact")}
            >
              {t("hero.cta1")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                backdropFilter: "blur(10px)",
                border: `1px solid ${r(0.15)}`,
                color: r(0.7),
              }}
              onClick={() => navigate("/projects")}
            >
              {t("hero.cta2")}
            </button>
          </div>
        </div>

        {/* Stats — floating pills at bottom */}
        <div
          className="mt-20 flex items-center gap-6 md:gap-10 flex-wrap justify-center animate-soft-enter"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { value: "11+", labelKey: "hero.stat1" as const },
            { value: "3+", labelKey: "hero.stat2" as const },
            { value: "9", labelKey: "hero.stat3" as const },
          ].map((stat, i) => (
            <div
              key={stat.labelKey}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-sm"
              style={{
                background: r(0.02),
                border: `1px solid ${r(0.06)}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: statAccents[i % statAccents.length],
                  textShadow: `0 0 24px ${statAccents[i % statAccents.length]}44`,
                }}
              >
                {stat.value}
              </span>
              <span
                className="uppercase tracking-wider"
                style={{
                  fontSize: "0.6rem",
                  fontFamily: "'Inter', sans-serif",
                  color: r(0.35),
                  maxWidth: 80,
                  lineHeight: 1.3,
                }}
              >
                {t(stat.labelKey)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip at bottom */}
      <div
        className="relative z-10 border-t border-b animate-soft-enter"
        style={{ borderColor: r(0.04), animationDelay: "0.75s" }}
      >
        <Marquee items={marqueeItems1} />
      </div>
    </section>
  );
}
