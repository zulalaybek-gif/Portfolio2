import { motion, AnimatePresence } from "motion/react";
import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Mail, Maximize2, Minimize2, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import svgLogoSncf from "../../imports/svg-xsk7542b73";
import svgSlideIcons from "../../imports/svg-8lle55gqj4";

/* ── Lazy slide imports ── */
const SLIDE_LOADERS = [
  () => import("../../imports/1"),
  () => import("../../imports/2"),
  () => import("../../imports/3"),
  () => import("../../imports/4"),
  () => import("../../imports/5"),
  () => import("../../imports/6"),
  () => import("../../imports/7"),
  () => import("../../imports/8"),
  () => import("../../imports/9"),
  () => import("../../imports/10"),
  () => import("../../imports/11"),
  () => import("../../imports/13"),
  () => import("../../imports/14"),
  () => import("../../imports/15"),
  () => import("../../imports/16"),
  () => import("../../imports/17"),
  () => import("../../imports/18"),
  () => import("../../imports/19"),
  () => import("../../imports/20"),
  () => import("../../imports/21"),
  () => import("../../imports/22"),
  () => import("../../imports/23"),
  () => import("../../imports/24"),
  () => import("../../imports/25"),
];

import imgPhone1 from "../../assets/sncf-connect/01.splash-screen.png";
import imgPhone2 from "../../assets/sncf-connect/02.creez-vos-routines.png";
import imgPhone3 from "../../assets/sncf-connect/03.personnalisez-l-accueil.png";
import imgPhone4 from "../../assets/sncf-connect/04.parametrage.png";
import imgRoutineCreate from "../../assets/sncf-connect/05.creaton-routine.png";
import imgRoutineList from "../../assets/sncf-connect/06.mes-routines.png";
import imgNewsletter from "../../assets/sncf-connect/07.newsletter.png";
import imgCampaignBlue from "../../assets/sncf-connect/08.jeu-concours-bleu.png";
import imgCampaignPink from "../../assets/sncf-connect/09.jeu-concours-rose.png";
import imgCampaignPhone from "../../assets/sncf-connect/10.jeu-concours.png";
import imgSpotifyDark from "../../assets/sncf-connect/11.playlist-spotify-sombre.png";
import imgSpotifyLight from "../../assets/sncf-connect/12.playlist-spotify-clair.png";
import imgSpotifyMain from "../../assets/sncf-connect/13.playlist-spotify.png";
import videoMain from "../../assets/sncf-connect/14.video-finale-workshop.mp4";
import lineAsset from "../../assets/sncf-connect/assets/03.line.svg";

const SLIDES = SLIDE_LOADERS.map((load) => lazy(load));
const SLIDE_W = 1920;
const SLIDE_H = 1080;
const ACCENT = "#8DE8FE";
const ACCENT_RGB = "141,232,254";
const BG_DARK = "#0C131F";

/* SNCF Brand palette from slide 11 */
const PALETTE = ["#002c4c", "#8DE8FE", "#242b35", "#4695a8", "#3b3232"];

/* Icon paths from slide 11 bento icons (tickets, home, profile, calendar, notification) */
const BENTO_ICONS = [
  { viewBox: "0 0 60 48", path: svgSlideIcons.p19f94900 },
  { viewBox: "0 0 59 60", path: svgSlideIcons.pedf50c0 },
  { viewBox: "0 0 56 45", paths: [svgSlideIcons.p3aac2980, svgSlideIcons.p1f184100] },
  { viewBox: "0 0 64 56", paths: [svgSlideIcons.p1d8fc600, svgSlideIcons.p1f53cf00, svgSlideIcons.p12371f00] },
  { viewBox: "0 0 64 38", path: svgSlideIcons.p76cf280 },
];

const ONBOARDING_PHONES = [
  { src: imgPhone1, label: "Splash Screen" },
  { src: imgPhone2, label: "Créez vos routines" },
  { src: imgPhone3, label: "Personnalisez l'accueil" },
  { src: imgPhone4, label: "Paramétrage" },
];

const UGC_URL = "https://www.youtube.com/embed/_AJf2dtOLtQ";

/* ── Hero Section ── */
function HeroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-12 pt-10 pb-16 overflow-hidden">
      {/* Ambient cyan glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 50% 40% at 50% 30%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)`
            : `radial-gradient(ellipse 50% 40% at 50% 30%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Floating bento icons — decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BENTO_ICONS.map((icon, i) => {
          const positions = [
            { top: "8%", right: "8%", rotate: 12, delay: 0 },
            { top: "18%", right: "3%", rotate: -8, delay: 0.3 },
            { bottom: "25%", right: "5%", rotate: 6, delay: 0.6 },
            { bottom: "12%", right: "12%", rotate: -15, delay: 0.9 },
            { top: "35%", right: "15%", rotate: 10, delay: 1.2 },
          ];
          const pos = positions[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 + pos.delay, ease: "easeOut" }}
              className="absolute hidden lg:flex items-center justify-center rounded-2xl"
              style={{
                top: pos.top,
                right: pos.right,
                bottom: pos.bottom,
                width: 64,
                height: 64,
                transform: `rotate(${pos.rotate}deg)`,
                background: isDark ? "rgba(141,232,254,0.04)" : "rgba(0,44,76,0.04)",
                border: `1px solid ${isDark ? "rgba(141,232,254,0.08)" : "rgba(0,44,76,0.08)"}`,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox={icon.viewBox}
                fill="none"
                style={{ opacity: isDark ? 0.2 : 0.15 }}
              >
                {icon.path ? (
                  <path d={icon.path} fill={isDark ? ACCENT : "#002c4c"} />
                ) : (
                  icon.paths?.map((p, j) => (
                    <path key={j} d={p} fill={isDark ? ACCENT : "#002c4c"} />
                  ))
                )}
              </svg>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 mb-12 cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.3) }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("sncf.back")}
        </motion.button>

        <div className="flex items-start justify-between mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-eyebrow uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
          >
            {t("sncf.hero.label")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.15) }}
          >
            {t("sncf.hero.year")}
          </motion.span>
        </div>

        {/* SNCF Connect Logo — BEFORE the title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 inline-flex items-center justify-center rounded-2xl px-8 py-5"
          style={{
            background: isDark ? r(0.04) : BG_DARK,
            border: `1px solid ${isDark ? r(0.08) : "rgba(45,78,86,0.4)"}`,
          }}
        >
          <svg width="200" height="42" viewBox="0 0 318.761 98.68" fill="none">
            <path d={svgLogoSncf.p6783ef0} fill="#8DE8FE" />
            <path d={svgLogoSncf.p1d22fa00} fill="#8DE8FE" />
            <path d={svgLogoSncf.p372a7f80} fill="white" />
            <path d={svgLogoSncf.p5276400} fill="white" />
            <path d={svgLogoSncf.p3c0ffd70} fill={BG_DARK} />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: ACCENT }}>SNCF</span>
          <br />
          <span style={{ color: r(0.6) }}>Connect & Tech</span>
        </motion.h1>

        {/* Color palette strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 flex rounded-full overflow-hidden h-2 max-w-xs"
        >
          {PALETTE.map((color) => (
            <div key={color} className="flex-1 h-full" style={{ background: color }} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {["Workshop", "UX Research", "UX/UI Design"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full"
              style={{
                fontSize: "0.78rem",
                fontFamily: "'Inter', sans-serif",
                border: `1px solid ${r(0.07)}`,
                background: r(0.02),
                color: r(0.4),
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: r(0.35),
          }}
        >
          {t("sncf.intro.desc")}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Slideshow ── */
function PresentationViewer() {
  const { r, isDark } = useTheme();
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < total) setCurrent(idx);
    },
    [total]
  );
  const next = useCallback(() => goTo(Math.min(current + 1, total - 1)), [current, total, goTo]);
  const prev = useCallback(() => goTo(Math.max(current - 1, 0)), [current, goTo]);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, isFullscreen]);

  /* Scale calculation */
  useEffect(() => {
    const measure = () => {
      if (viewerRef.current) {
        const w = viewerRef.current.clientWidth;
        setScale(w / SLIDE_W);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isFullscreen]);

  useEffect(() => {
    void SLIDE_LOADERS[current]?.();
    void SLIDE_LOADERS[current + 1]?.();
    void SLIDE_LOADERS[current - 1]?.();
  }, [current]);

  const SlideComponent = SLIDES[current];

  const slideViewer = (
    <div
      ref={viewerRef}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        background: BG_DARK,
        border: `1px solid ${r(0.06)}`,
        boxShadow: `0 30px 80px rgba(0,0,0,${isDark ? 0.5 : 0.15}), 0 0 40px rgba(${ACCENT_RGB},0.05)`,
      }}
    >
      {/* Slide content */}
      <div
        style={{
          width: SLIDE_W * scale,
          height: SLIDE_H * scale,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: SLIDE_W,
              height: SLIDE_H,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              position: "relative",
            }}
          >
            <Suspense
              fallback={
                <div
                  className="flex items-center justify-center"
                  style={{ width: SLIDE_W, height: SLIDE_H, background: BG_DARK }}
                >
                  <div
                    className="h-8 w-8 rounded-full border-2 border-t-transparent opacity-40 animate-spin"
                    style={{ borderColor: ACCENT, borderTopColor: "transparent" }}
                  />
                </div>
              }
            >
              <SlideComponent />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation overlay */}
      <div className="absolute inset-0 flex">
        <button
          onClick={prev}
          className="w-1/3 h-full cursor-w-resize opacity-0 hover:opacity-100 transition-opacity flex items-center justify-start pl-4"
          disabled={current === 0}
        >
          {current > 0 && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronLeft size={18} color="white" />
            </div>
          )}
        </button>
        <div className="flex-1" />
        <button
          onClick={next}
          className="w-1/3 h-full cursor-e-resize opacity-0 hover:opacity-100 transition-opacity flex items-center justify-end pr-4"
          disabled={current === total - 1}
        >
          {current < total - 1 && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronRight size={18} color="white" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <section className="px-6 md:px-12 py-12" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="section-eyebrow uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
            >
              {t("sncf.prez.label")}
            </span>
            <div className="flex items-center gap-3">
              <span
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: r(0.3) }}
              >
                {current + 1} / {total}
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ border: `1px solid ${r(0.1)}`, color: r(0.3) }}
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
          </div>

          {/* Slide viewer */}
          {isFullscreen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              style={{ background: isDark ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                ESC
              </button>
              <div className="w-full max-w-7xl">{slideViewer}</div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                  {current + 1} / {total}
                </span>
              </div>
            </motion.div>
          ) : (
            slideViewer
          )}

          {/* Bottom controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={current === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${current > 0 ? r(0.15) : r(0.05)}`,
                  color: current > 0 ? r(0.5) : r(0.1),
                }}
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={next}
                disabled={current === total - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${current < total - 1 ? r(0.15) : r(0.05)}`,
                  color: current < total - 1 ? r(0.5) : r(0.1),
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex-1 mx-6 h-[2px] rounded-full overflow-hidden" style={{ background: r(0.05) }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: ACCENT }}
                animate={{ width: `${((current + 1) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Miniature dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? ACCENT : r(0.1),
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  const { r } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <span
        className="section-eyebrow uppercase tracking-[0.3em] block mb-4"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.24) }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 650,
          color: r(0.72),
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        {title}
      </h2>
      {children ? (
        <p
          className="mt-4 max-w-2xl"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: r(0.34) }}
        >
          {children}
        </p>
      ) : null}
    </motion.div>
  );
}

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative mx-auto rounded-[2.1rem] p-2 ${className}`}
      style={{
        background: isDark ? "linear-gradient(145deg, #172233, #050912)" : "linear-gradient(145deg, #07101f, #263a52)",
        boxShadow: `0 28px 70px rgba(0,0,0,${isDark ? 0.42 : 0.18}), 0 0 36px rgba(${ACCENT_RGB},0.08)`,
      }}
    >
      <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
      <img src={src} alt={alt} className="block w-full rounded-[1.55rem]" />
    </div>
  );
}

function ParticleField({ active = false }: { active?: boolean }) {
  const particles = Array.from({ length: active ? 46 : 18 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 2 + (i % 4);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 3 === 0 ? ACCENT : "rgba(255,255,255,0.72)",
              boxShadow: `0 0 ${active ? 18 : 10}px rgba(${ACCENT_RGB},${active ? 0.38 : 0.18})`,
            }}
            animate={{
              x: active ? [0, (i % 2 ? 32 : -28), 0] : [0, (i % 2 ? 8 : -6), 0],
              y: active ? [0, -38 - (i % 7) * 6, 8, 0] : [0, -10, 0],
              opacity: active ? [0.18, 0.78, 0.28] : [0.12, 0.3, 0.12],
              scale: active ? [0.8, 1.5, 0.9] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: active ? 3.2 + (i % 5) * 0.35 : 7 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 9) * 0.14,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Onboarding Section ── */
function OnboardingSection() {
  const { r, isDark } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % ONBOARDING_PHONES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="px-6 md:px-12 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="ONBOARDING" title="Un parcours d’entrée plus clair et progressif">
          Quatre écrans guident l’utilisateur de la découverte de l’application jusqu’au paramétrage, avec une logique de progression lisible dès le premier regard.
        </SectionHeader>

        <div
          className="relative mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center rounded-[2rem] p-5 md:p-8"
          style={{
            background: isDark
              ? `linear-gradient(135deg, rgba(${ACCENT_RGB},0.08), rgba(255,255,255,0.025))`
              : `linear-gradient(135deg, rgba(${ACCENT_RGB},0.18), rgba(255,255,255,0.78))`,
            border: `1px solid ${r(0.07)}`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
            <motion.div
              className="absolute -right-16 top-12 h-56 w-56 rounded-full blur-3xl"
              style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.16 : 0.22})` }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative min-h-[34rem] flex items-center justify-center">
            {ONBOARDING_PHONES.map((phone, i) => {
              const offset = i - active;
              const visible = Math.abs(offset) <= 1 || (active === 0 && i === ONBOARDING_PHONES.length - 1);
              return (
                <motion.div
                  key={phone.label}
                  className="absolute w-[min(15.5rem,72vw)]"
                  animate={{
                    opacity: i === active ? 1 : visible ? 0.34 : 0,
                    x: i === active ? 0 : offset > 0 ? 130 : -130,
                    y: i === active ? 0 : 26,
                    scale: i === active ? 1 : 0.82,
                    rotate: i === active ? 0 : offset > 0 ? 5 : -5,
                  }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PhoneFrame src={phone.src} alt={phone.label} />
                </motion.div>
              );
            })}
          </div>

          <div className="relative space-y-4">
            {ONBOARDING_PHONES.map((phone, i) => (
              <button
                key={phone.label}
                onClick={() => setActive(i)}
                className="group grid w-full grid-cols-[2rem_1fr] items-center gap-4 rounded-2xl p-4 text-left transition-colors"
                style={{
                  background: active === i ? (isDark ? "rgba(141,232,254,0.11)" : "rgba(0,44,76,0.06)") : "transparent",
                  border: `1px solid ${active === i ? `rgba(${ACCENT_RGB},0.32)` : r(0.06)}`,
                }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: active === i ? ACCENT : r(0.05),
                    color: active === i ? BG_DARK : r(0.4),
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", color: r(0.62), fontWeight: 600 }}>
                  {phone.label}
                </span>
              </button>
            ))}
            <div className="h-1 overflow-hidden rounded-full" style={{ background: r(0.06) }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: ACCENT }}
                animate={{ width: `${((active + 1) / ONBOARDING_PHONES.length) * 100}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="CONNECT ROUTINE" title="Créer, retrouver, personnaliser le quotidien">
          La fonctionnalité Connect Routine transforme les habitudes de trajet en raccourcis utiles, depuis la création jusqu’à la gestion des routines enregistrées.
        </SectionHeader>

        <div className="relative mt-12 grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
          {[
            { src: imgRoutineCreate, title: "Création de routine", text: "Un parcours guidé pour composer une routine autour des trajets récurrents." },
            { src: imgRoutineList, title: "Mes routines", text: "Une vue de gestion claire pour retrouver, modifier et activer ses habitudes." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              className="relative rounded-[2rem] p-5"
              style={{
                background: isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.74)",
                border: `1px solid ${r(0.07)}`,
                boxShadow: `0 24px 80px rgba(0,0,0,${isDark ? 0.22 : 0.08})`,
              }}
            >
              <PhoneFrame src={item.src} alt={item.title} className="w-[min(15rem,72vw)]" />
              <div className="mt-5">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", color: r(0.66), fontWeight: 650 }}>
                  {item.title}
                </h3>
                <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.86rem", lineHeight: 1.65, color: r(0.32) }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="hidden lg:flex h-full min-h-[26rem] items-center justify-center">
            <div className="relative h-[72%] w-28">
              <img src={lineAsset} alt="" className="absolute left-1/2 top-0 h-full -translate-x-1/2 opacity-40" />
              <motion.div
                className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: `rgba(${ACCENT_RGB},0.16)`, border: `1px solid rgba(${ACCENT_RGB},0.3)` }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-center rounded-[2rem] p-6 md:p-10"
          style={{
            background: isDark
              ? `linear-gradient(135deg, rgba(255,255,255,0.035), rgba(${ACCENT_RGB},0.07))`
              : `linear-gradient(135deg, rgba(255,255,255,0.88), rgba(${ACCENT_RGB},0.15))`,
            border: `1px solid ${r(0.07)}`,
          }}
        >
          <SectionHeader eyebrow="NEWSLETTER" title="Une communication produit au moment du lancement">
            La newsletter accompagne la sortie de la fonctionnalité avec un support clair, direct et identifiable dans l’écosystème SNCF Connect.
          </SectionHeader>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <motion.div
              className="absolute -left-6 top-8 hidden h-14 w-14 items-center justify-center rounded-2xl lg:flex"
              style={{ background: ACCENT, color: BG_DARK }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail size={22} />
            </motion.div>
            <img
              src={imgNewsletter}
              alt="Newsletter de lancement Connect Routine"
              className="w-full rounded-[1.5rem]"
              style={{ boxShadow: `0 28px 80px rgba(0,0,0,${isDark ? 0.34 : 0.14})` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ActivationSection() {
  const { r, isDark } = useTheme();
  const [variant, setVariant] = useState<"blue" | "pink">("blue");
  const config =
    variant === "blue"
      ? { image: imgCampaignBlue, color: "#2D8CFF", soft: "45,140,255", label: "Bleu" }
      : { image: imgCampaignPink, color: "#FF72B8", soft: "255,114,184", label: "Rose" };

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="COMMUNICATION & ACTIVATION" title="Une campagne dont l’ambiance se module">
          L’univers graphique réagit au choix de couleur pour montrer comment une même activation peut porter deux tonalités de campagne.
        </SectionHeader>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-[2.2rem] p-6 md:p-10"
          animate={{
            background: isDark
              ? `radial-gradient(circle at 74% 20%, rgba(${config.soft},0.22), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))`
              : `radial-gradient(circle at 74% 20%, rgba(${config.soft},0.25), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.94), rgba(${ACCENT_RGB},0.12))`,
          }}
          transition={{ duration: 0.45 }}
          style={{ border: `1px solid ${r(0.07)}` }}
        >
          <motion.div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
            animate={{ background: `rgba(${config.soft},0.34)`, scale: [1, 1.08, 1] }}
            transition={{ background: { duration: 0.45 }, scale: { duration: 4, repeat: Infinity } }}
          />
          <motion.div
            className="absolute left-10 bottom-10 hidden h-40 w-40 rounded-full blur-2xl md:block"
            animate={{ background: `rgba(${config.soft},0.18)`, x: [0, 14, 0] }}
            transition={{ background: { duration: 0.45 }, x: { duration: 5, repeat: Infinity } }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1fr] items-center">
            <div className="flex flex-col items-center">
              <PhoneFrame src={imgCampaignPhone} alt="Écran Instagram de campagne" className="w-[min(17rem,74vw)]" />
              <div className="mt-6 flex items-center gap-3">
                {[
                  { id: "blue" as const, color: "#2D8CFF", label: "Version bleue" },
                  { id: "pink" as const, color: "#FF72B8", label: "Version rose" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.label}
                    onClick={() => setVariant(item.id)}
                    className="relative h-11 w-11 rounded-full transition-transform"
                    style={{
                      background: item.color,
                      outline: variant === item.id ? `3px solid ${isDark ? "rgba(255,255,255,0.78)" : "rgba(0,44,76,0.32)"}` : "none",
                      boxShadow: `0 0 24px ${item.color}66`,
                    }}
                  >
                    <span className="absolute inset-2 rounded-full border border-white/60" />
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={variant}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative"
              >
                <img
                  src={config.image}
                  alt={`Déclinaison ${config.label.toLowerCase()} de l'activation`}
                  className="w-full rounded-[1.6rem]"
                  style={{ boxShadow: `0 30px 90px rgba(${config.soft},0.22)` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpotifyExperienceSection() {
  const { r, isDark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const cover = mode === "dark" ? imgSpotifyDark : imgSpotifyLight;

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="EXPÉRIENCE SPOTIFY" title="Un player qui donne du mouvement à l’univers">
          Le player transforme l’univers sable noir de la playlist en particules vivantes, calmes au repos et plus présentes quand l’expérience est activée.
        </SectionHeader>

        <div
          className="relative mt-12 overflow-hidden rounded-[2.2rem] p-6 md:p-10"
          style={{
            background: isDark ? "linear-gradient(135deg, #050912, #101927)" : "linear-gradient(135deg, #08111f, #20344c)",
            border: `1px solid ${isDark ? "rgba(141,232,254,0.15)" : "rgba(0,44,76,0.18)"}`,
          }}
        >
          <ParticleField active={playing} />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.img
              src={imgSpotifyMain}
              alt="Playlist Spotify SNCF Connect"
              className="w-full rounded-[1.6rem]"
              animate={{ scale: playing ? 1.015 : 1 }}
              transition={{ duration: 0.8 }}
              style={{ boxShadow: `0 32px 90px rgba(0,0,0,0.42)` }}
            />

            <div
              className="rounded-[1.7rem] p-5 backdrop-blur-xl"
              style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={mode}
                  src={cover}
                  alt={`Playlist Spotify version ${mode === "dark" ? "sombre" : "claire"}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="w-full rounded-[1.2rem]"
                />
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: ACCENT, color: BG_DARK, boxShadow: `0 0 30px rgba(${ACCENT_RGB},0.4)` }}
                  aria-label={playing ? "Mettre en pause" : "Lancer l'expérience"}
                >
                  {playing ? <Pause size={22} fill={BG_DARK} /> : <Play size={22} fill={BG_DARK} />}
                </button>
                <div className="flex-1">
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontWeight: 650 }}>
                    Playlist Connect
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ACCENT }}
                      animate={{ width: playing ? ["12%", "82%"] : "18%" }}
                      transition={playing ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.35 }}
                    />
                  </div>
                </div>
                <div className="flex rounded-full bg-white/10 p-1">
                  {(["dark", "light"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMode(item)}
                      className="rounded-full px-3 py-1.5"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        color: mode === item ? BG_DARK : "rgba(255,255,255,0.62)",
                        background: mode === item ? ACCENT : "transparent",
                      }}
                    >
                      {item === "dark" ? "Sombre" : "Clair"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="VIDÉO PRINCIPALE" title="Une présentation vidéo intégrée à l’expérience">
          Le motion principal conserve l’énergie lumineuse du projet dans un format fluide et responsive.
        </SectionHeader>
        <div
          className="mt-10 overflow-hidden rounded-[2rem] p-2"
          style={{ background: isDark ? "rgba(255,255,255,0.045)" : "rgba(0,44,76,0.06)", border: `1px solid ${r(0.07)}` }}
        >
          <video src={videoMain} controls playsInline preload="metadata" className="block w-full rounded-[1.55rem]" />
        </div>
      </div>
    </section>
  );
}

function UGCSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1fr] items-center">
          <SectionHeader eyebrow="UGC" title="Un format plus direct, pensé pour la prise de parole sociale">
            Le contenu UGC apporte une dimension plus humaine et spontanée, distincte du film principal.
          </SectionHeader>
          <div className="mx-auto w-[min(22rem,78vw)]">
            <div
              className="relative overflow-hidden rounded-[2.2rem] p-2"
              style={{
                background: isDark ? "#050912" : "#07101f",
                boxShadow: `0 28px 80px rgba(0,0,0,${isDark ? 0.36 : 0.18})`,
              }}
            >
              <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
              <div className="aspect-[9/16] overflow-hidden rounded-[1.65rem] bg-black">
                <iframe
                  src={UGC_URL}
                  title="Vidéo UGC SNCF Connect"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Closing ── */
function ClosingSection() {
  const { isDark, r } = useTheme();
  const { lang } = useI18n();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "160px 0px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
          <div className="w-20 h-20 mx-auto mb-6 opacity-20">
            <svg viewBox="0 0 164 51" className="w-full h-auto">
              <path d={svgLogoSncf.p1d22fa00} fill={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} />
            </svg>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "SNCF Connect & Tech — un workshop UX/UI centré sur l'accessibilité et l'innovation au service des voyageurs."
              : "SNCF Connect & Tech — a UX/UI workshop focused on accessibility and innovation for travelers."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export function ProjectSncf() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <PresentationViewer />
      <OnboardingSection />
      <RoutineSection />
      <NewsletterSection />
      <ActivationSection />
      <SpotifyExperienceSection />
      <VideoSection />
      <UGCSection />
      <ClosingSection />
      <div className="h-24" />
    </div>
  );
}
