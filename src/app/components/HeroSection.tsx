import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

/* ── Magnetic cursor canvas ── */
function MagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1, active: false });
  const { isDark } = useTheme();
  const dots = useRef<Array<{ ox: number; oy: number; x: number; y: number; vx: number; vy: number }>>([]);
  const raf = useRef(0);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = cvs.getBoundingClientRect();
      cvs.width = rect.width * dpr;
      cvs.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-create grid
      const cols = Math.floor(rect.width / 32);
      const rows = Math.floor(rect.height / 32);
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

    const animate = () => {
      const rect = cvs.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const m = mouse.current;
      const baseAlpha = isDark ? 0.06 : 0.04;
      const accentRGB = isDark ? "139,173,74" : "74,107,42";

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
    };
  }, [isDark]);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  }, []);
  const onLeave = useCallback(() => { mouse.current.active = false; }, []);

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
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const content = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-3" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: r(0.2), textTransform: "uppercase" as const, letterSpacing: "0.15em" }}>
              {item}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: accent, opacity: 0.4 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opContent = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const marqueeItems1 = lang === "fr"
    ? ["Design Graphique", "Direction Artistique", "Identité Visuelle", "Brand Content", "Motion Design", "Print & Édition", "Web Design", "Photographie"]
    : ["Graphic Design", "Art Direction", "Visual Identity", "Brand Content", "Motion Design", "Print & Editorial", "Web Design", "Photography"];

  return (
    <section ref={ref} data-section="hero" className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Magnetic dot field */}
      <div className="absolute inset-0 pointer-events-auto z-0">
        <MagneticField />
      </div>

      {/* Main content — vertically centered */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-16"
        style={{ y: yContent, opacity: opContent }}
      >
        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-10"
        >
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
        </motion.div>

        {/* Name — massive typographic treatment */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.8rem, 10vw, 8rem)",
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: p.text,
                textTransform: "uppercase",
              }}
            >
              {lang === "fr" ? "CRÉER" : "CREATE"}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                fontSize: "clamp(2.2rem, 7vw, 6rem)",
                fontWeight: 400,
                lineHeight: 1,
                display: "block",
                marginTop: "-0.05em",
                background: isDark
                  ? "linear-gradient(135deg, #8BAD4A 0%, #C8D94A 50%, #6B8F3A 100%)"
                  : "linear-gradient(135deg, #4A6B2A 0%, #8BAD4A 50%, #3D5A20 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {lang === "fr" ? "l'inoubliable." : "the unforgettable."}
            </span>
          </motion.div>
        </div>

        {/* Tagline + CTA — asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col items-center gap-8 max-w-lg text-center"
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
                  ? "linear-gradient(135deg, #8BAD4A 0%, #6B8F3A 100%)"
                  : "linear-gradient(135deg, #4A6B2A 0%, #3D5A20 100%)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: isDark ? "#0a0a0a" : "#ffffff",
              }}
              onClick={() => window.location.href = "mailto:zulal.aybek@gmail.com"}
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
        </motion.div>

        {/* Stats — floating pills at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-20 flex items-center gap-6 md:gap-10 flex-wrap justify-center"
        >
          {[
            { value: "11+", labelKey: "hero.stat1" as const },
            { value: "3+", labelKey: "hero.stat2" as const },
            { value: "9", labelKey: "hero.stat3" as const },
          ].map((stat) => (
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
                  color: accent,
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
        </motion.div>
      </motion.div>

      {/* Marquee strip at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="relative z-10 border-t border-b"
        style={{ borderColor: r(0.04) }}
      >
        <Marquee items={marqueeItems1} />
      </motion.div>
    </section>
  );
}