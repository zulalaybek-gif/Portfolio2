import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import imgNoSenseA3 from "../../assets/mzw/01-affiche.png";
import imgSupportPrint1 from "../../assets/mzw/02-support-print.jpg";
import imgSupportPrint2 from "../../assets/mzw/03-support-print.jpg";
import imgVinyle from "../../assets/mzw/14-vinyle.png";
import imgTShirt from "../../assets/mzw/05-tshirt.png";
import imgMockup1 from "../../assets/mzw/06-mockup.png";
import imgMockup2 from "../../assets/mzw/07-mockup.png";
import imgPlayerSplash from "../../assets/mzw/08-player.png";
import imgPlayerCenter from "../../assets/mzw/13-player.png";
import imgPlayerLibrary from "../../assets/mzw/10-player.png";
import imgButterfly from "../../assets/mzw/11-papillon.png";
import imgMzwLogo from "../../assets/mzw/assets/01.logo.svg";
import imgSpectreLight from "../../assets/mzw/assets/02.spectre-light.png";
import imgSpectreDark from "../../assets/mzw/assets/03.spectre-dark.png";
import imgHeaderLight from "../../assets/mzw/assets/04.header-light.png";
import imgHeaderDark from "../../assets/mzw/assets/05.header-dark.png";

/* -- Helpers -- */
const ACCENT = "#5d4792";
const ACCENT_RGB = "93,71,146";
const DARK_BG = "#0f0817";

const MZW_SWIRL_PATHS_URL = "/assets/mzw-swirl-paths.json";

/* Butterfly tap animation generators */
const TAP_GENERATORS: Array<() => { x: number; y: number; scale: number; rotate: number; opacity: number; dur: number }> = [
  () => ({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20, scale: 0.02 + Math.random() * 0.12, rotate: (Math.random() - 0.5) * 40, opacity: 0, dur: 0.4 + Math.random() * 0.2 }),
  () => ({ x: (Math.random() - 0.5) * 80, y: -(150 + Math.random() * 150), scale: 0.4 + Math.random() * 0.4, rotate: -20 - Math.random() * 30, opacity: 0, dur: 0.5 + Math.random() * 0.25 }),
  () => ({ x: 80 + Math.random() * 120, y: -(40 + Math.random() * 80), scale: 0.05 + Math.random() * 0.15, rotate: 270 + Math.random() * 180, opacity: 0, dur: 0.6 + Math.random() * 0.2 }),
  () => ({ x: -(100 + Math.random() * 120), y: -20 + Math.random() * 60, scale: 0.3 + Math.random() * 0.3, rotate: -(10 + Math.random() * 20), opacity: 0, dur: 0.55 + Math.random() * 0.2 }),
  () => ({ x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30, scale: 2.5 + Math.random() * 1.5, rotate: 120 + Math.random() * 120, opacity: 0, dur: 0.45 + Math.random() * 0.2 }),
  () => ({ x: (Math.random() - 0.5) * 60, y: 180 + Math.random() * 150, scale: 0.2 + Math.random() * 0.2, rotate: 15 + Math.random() * 25, opacity: 0, dur: 0.7 + Math.random() * 0.2 }),
  () => ({ x: 60 + Math.random() * 100, y: -(80 + Math.random() * 100), scale: 0.02 + Math.random() * 0.08, rotate: -(60 + Math.random() * 60), opacity: 0, dur: 0.4 + Math.random() * 0.2 }),
  () => ({ x: -(60 + Math.random() * 100), y: -(60 + Math.random() * 120), scale: 0.1 + Math.random() * 0.2, rotate: -(200 + Math.random() * 200), opacity: 0, dur: 0.6 + Math.random() * 0.25 }),
  () => ({ x: (Math.random() - 0.5) * 15, y: -(10 + Math.random() * 20), scale: 1.8 + Math.random() * 0.8, rotate: (Math.random() - 0.5) * 50, opacity: 0, dur: 0.3 + Math.random() * 0.15 }),
  () => ({ x: 80 + Math.random() * 100, y: 100 + Math.random() * 120, scale: 0.15 + Math.random() * 0.2, rotate: 90 + Math.random() * 180, opacity: 0, dur: 0.65 + Math.random() * 0.2 }),
  () => ({ x: -(30 + Math.random() * 60), y: -(100 + Math.random() * 100), scale: 0.5 + Math.random() * 0.3, rotate: -(5 + Math.random() * 15), opacity: 0, dur: 0.8 + Math.random() * 0.3 }),
  () => ({ x: -(70 + Math.random() * 80), y: 120 + Math.random() * 100, scale: 0.08 + Math.random() * 0.12, rotate: 40 + Math.random() * 60, opacity: 0, dur: 0.55 + Math.random() * 0.2 }),
];
let lastTapIdx = -1;

const PALETTE = [
  { hex: "#254D9B", name: "Basse", role: "Profondeur" },
  { hex: "#5D4792", name: "Harmonie", role: "Tension" },
  { hex: "#B3428A", name: "Énergie", role: "Intensité" },
  { hex: "#CC7B63", name: "Pulsation", role: "Chaleur" },
  { hex: "#E2C049", name: "Résonance", role: "Éclat" },
];

/* -- Decorative Components -- */

function TopographicWaves({ isDark, density = 10, opacity = 0.3, height = "50%", position = "center", speed = 30, spread = 140 }: { isDark: boolean; density?: number; opacity?: number; height?: string; position?: "top" | "center" | "bottom" | "full"; speed?: number; spread?: number }) {
  const posClass = position === "top" ? "top-0" : position === "bottom" ? "bottom-0" : position === "full" ? "inset-0" : "top-1/2 -translate-y-1/2";
  
  return (
    <div className={`absolute inset-x-0 ${posClass} pointer-events-none`} style={{ height: position === "full" ? "100%" : height, opacity }} aria-hidden="true">
      <svg className="size-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 400">
        <defs>
          <linearGradient id="mzw-wave-grad-hairline" x1="0" x2="1000" y1="0" y2="0">
            <stop stopColor="#254D9B" stopOpacity="0.4" />
            <stop offset="0.25" stopColor="#5D4792" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#B3428A" />
            <stop offset="0.75" stopColor="#CC7B63" stopOpacity="0.8" />
            <stop offset="1" stopColor="#E2C049" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {Array.from({ length: density }).map((_, i) => (
          <motion.path
            key={i}
            d={`M-250 ${150 + i * spread/density} C 150 ${100 + i * 15}, 350 ${300 - i * 10}, 550 ${150 + i * 20} S 850 ${100 + i * 12}, 1250 ${150 + i * spread/density}`}
            stroke="url(#mzw-wave-grad-hairline)"
            strokeWidth={0.5 + (i % 3) * 0.2}
            animate={{ 
              d: [
                `M-250 ${150 + i * spread/density} C 150 ${100 + i * 15}, 350 ${300 - i * 10}, 550 ${150 + i * 20} S 850 ${100 + i * 12}, 1250 ${150 + i * spread/density}`,
                `M-250 ${170 + i * spread/density} C 200 ${120 + i * 12}, 380 ${280 - i * 8}, 580 ${170 + i * 18} S 830 ${80 + i * 15}, 1250 ${140 + i * spread/density}`,
                `M-250 ${150 + i * spread/density} C 150 ${100 + i * 15}, 350 ${300 - i * 10}, 550 ${150 + i * 20} S 850 ${100 + i * 12}, 1250 ${150 + i * spread/density}`
              ]
            }}
            transition={{ duration: speed + i * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

function EnergyGrid({ isDark, opacity = 0.35 }: { isDark: boolean; opacity?: number }) {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)"} 1.5px, transparent 1.5px), 
                         linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)"} 1.5px, transparent 1.5px)`,
        backgroundSize: "64px 64px",
        opacity,
        maskImage: "radial-gradient(circle at center, black, transparent 95%)",
        WebkitMaskImage: "radial-gradient(circle at center, black, transparent 95%)",
      }}
    />
  );
}

function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span
      className="section-eyebrow uppercase tracking-[0.3em] block"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6rem",
        color: r(0.3),
        letterSpacing: "0.25em",
      }}
    >
      <span className="mb-4 flex h-5 items-center gap-[3px]" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => {
          const height = 5 + ((i * 7) % 13);
          const color = PALETTE[i % PALETTE.length].hex;
          return (
            <motion.span
              key={i}
              className="block w-px rounded-full"
              style={{
                height,
                background: color,
                opacity: 0.18 + (i % 5) * 0.035,
                boxShadow: `0 0 8px ${color}55`,
              }}
              animate={{ height: [height, height * 1.5, height] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </span>
      <span>{children}</span>
    </span>
  );
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "160px 0px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useBodyStyle() {
  const { r } = useTheme();
  return {
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.85rem",
    lineHeight: 2,
    color: r(0.35),
  } as const;
}

/* ===================================
   1. HERO — SPECTACULAR IMMERSION
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-12 md:min-h-screen"
      style={{ background: isDark ? "#07040d" : "#fcfaf7" }}>
      
      {/* ── ATMOSPHERIC CANVAS — Clean & Wide ── */}
      <div className="absolute inset-0 z-0">
        <EnergyGrid isDark={isDark} opacity={isDark ? 0.15 : 0.08} />
        
        {/* Subtle Panoramic Topography */}
        <div className="absolute inset-0 flex flex-col justify-center">
          <TopographicWaves isDark={isDark} density={8} opacity={isDark ? 0.4 : 0.25} height="60%" position="center" speed={40} spread={160} />
          <div className="rotate-180 opacity-40">
            <TopographicWaves isDark={isDark} density={6} opacity={isDark ? 0.3 : 0.15} height="60%" position="center" speed={55} spread={200} />
          </div>
        </div>

        {/* Ambient Glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: isDark
              ? `radial-gradient(circle at 50% 50%, rgba(${ACCENT_RGB}, 0.12) 0%, transparent 70%)`
              : `radial-gradient(circle at 50% 50%, rgba(${ACCENT_RGB}, 0.06) 0%, transparent 70%)`
          }}
        />

        {/* Minimal Particles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 1.5,
                height: 1.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: PALETTE[i % PALETTE.length].hex,
                opacity: 0,
              }}
              animate={{
                y: [0, -150],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* ── CENTRAL COMPOSITION — Compact & Elegant ── */}
      <motion.div 
        className="relative z-10 flex flex-col items-center w-full max-w-6xl" 
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Back button — Original placement */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => navigate("/projects")}
          className="group absolute left-0 top-[-40px] flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.3) }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("mzw.back")}
        </motion.button>

        {/* Minimal Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15, letterSpacing: "1.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.8em" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="mb-14 flex flex-col items-center gap-6"
        >
          <span style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: "0.6rem", 
            textTransform: "uppercase", 
            fontWeight: 400,
            color: r(isDark ? 0.6 : 0.4) 
          }}>
            {t("mzw.hero.label")}
          </span>
          <div className="w-12 h-px bg-current opacity-20" />
        </motion.div>

        {/* Refined Central Core */}
        <div className="relative flex items-center justify-center size-[240px] md:size-[360px]">
          {/* Subtle Halos */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/5"
              style={{ width: "100%", height: "100%" }}
              animate={{
                scale: [0.8, 1.1 + i * 0.1],
                opacity: [0, 0.3 - i * 0.1, 0],
              }}
              transition={{
                duration: 8,
                delay: i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Soft Core Glow */}
          <div className="absolute size-[80%] rounded-full blur-[70px] opacity-40"
               style={{ background: `radial-gradient(circle, ${ACCENT}, #b3428a, transparent)` }} />

          {/* The Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            className="relative z-10 w-[140px] md:w-[220px]"
            style={{
              filter: isDark
                ? `drop-shadow(0 0 35px rgba(${ACCENT_RGB}, 0.5))`
                : `drop-shadow(0 15px 30px rgba(0,0,0,0.1))`
            }}
          >
            <img
              src={imgMzwLogo}
              alt="Logo MZW"
              className="block w-full"
              style={{ filter: isDark ? "brightness(0) invert(1)" : "brightness(0)" }}
            />
          </motion.div>
        </div>

        {/* Minimal Year */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 1.8 }}
          className="mt-14 text-[0.6rem] tracking-[0.6em] font-light"
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          {t("mzw.hero.year")}
        </motion.div>
      </motion.div>
      
      {/* Simple Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="w-px h-14 bg-current" />
      </motion.div>
    </section>
  );
}

/* ===================================
   2. INTRO — Title + short intro
   =================================== */
function IntroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="relative px-6 md:px-16 py-24 max-w-4xl mx-auto overflow-hidden">
      <TopographicWaves isDark={isDark} density={10} opacity={0.3} height="100%" />
      <div className="relative z-10">
        <FadeIn>
          <h1
            className="text-center mb-2"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: isDark ? "#fff" : DARK_BG,
              transition: "color 0.5s ease",
            }}
          >
            MZW
          </h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p
            className="text-center mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            No Sense
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            className="text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              lineHeight: 1.9,
              color: r(0.45),
            }}
          >
            {t("mzw.intro.subtitle")}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="w-12 h-[1px] mx-auto my-8" style={{ background: `rgba(${ACCENT_RGB},0.3)` }} />
        </FadeIn>
        <FadeIn delay={0.2}>
          <p
            className="text-center max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.3),
            }}
          >
            {t("mzw.intro.desc")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   3. CONTEXT
   =================================== */
function ContextSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <p style={body}>{t("mzw.context.text")}</p>
              <p style={body}>{t("mzw.intention.text1")}</p>
              <p style={body}>{t("mzw.intention.text2")}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   4. DIRECTION VISUELLE — Text + Poster
   =================================== */
function DirectionSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("mzw.direction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <p style={body}>{t("mzw.direction.text")}</p>
              <p style={body}>{t("mzw.choices.text")}</p>
            </div>
          </FadeIn>
        </div>

        {/* Main poster considerably scaled down */}
        <FadeIn delay={0.15}>
          <div className="flex justify-center">
            <div className="rounded-xl overflow-hidden max-w-[240px] relative group" style={{ border: `1px solid ${r(isDark ? 0.08 : 0.04)}` }}>
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <img src={imgNoSenseA3} alt="Affiche MZW No Sense" className="w-full object-cover" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   5b. CONSTRUCTION DU NOM / BASELINE / PAPILLON
   =================================== */
function NamingSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Construction du nom */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.name.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.name.text")}</p>
          </FadeIn>
        </div>

        {/* Baseline */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.baseline.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.baseline.text")}</p>
          </FadeIn>
        </div>

        {/* Choix du papillon */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.butterfly.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.butterfly.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   6. PALETTE — RESTORED ANIMATION
   =================================== */
function PaletteSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const body = useBodyStyle();

  return (
    <section className="py-16">
      <div className="px-6 md:px-16">
        <div className="mx-auto mb-10 grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-[1fr_2fr]">
          <FadeIn>
            <SectionLabel>{t("mzw.palette.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.palette.text")}</p>
          </FadeIn>
        </div>
      </div>

      <div
        className="relative min-h-[620px] overflow-hidden rounded-none px-4 py-12 md:min-h-[660px] md:px-10 md:py-16"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(12,8,19,0.98), rgba(5,4,10,0.98))"
            : "#fff",
          borderTop: `1px solid ${r(isDark ? 0.06 : 0.08)}`,
          borderBottom: `1px solid ${r(isDark ? 0.06 : 0.08)}`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(circle at 50% 40%, rgba(${ACCENT_RGB},0.12), transparent 70%)`
              : `radial-gradient(circle at 50% 40%, rgba(${ACCENT_RGB},0.06), transparent 70%)`,
          }}
        />
        <img
          src={imgSpectreLight}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[11%] w-[112%] max-w-none -translate-x-1/2 object-contain transition-opacity duration-700"
          style={{ opacity: isDark ? 0 : 0.86 }}
        />
        <img
          src={imgSpectreDark}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[11%] w-[112%] max-w-none -translate-x-1/2 object-contain transition-opacity duration-700"
          style={{ opacity: isDark ? 0.74 : 0 }}
        />

        <div className="relative z-10 hidden md:flex h-[600px] max-w-6xl mx-auto items-end justify-between px-12 pb-20">
          {PALETTE.map((color, i) => {
            return (
              <FadeIn key={color.hex} delay={0.2 + i * 0.1} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex flex-col items-center">
                  <motion.div
                    className="mb-8 flex flex-col items-center opacity-60"
                    animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.2em",
                        color: color.hex,
                        fontWeight: 600,
                        textTransform: "uppercase"
                      }}
                    >
                      {color.name}
                    </span>
                    <div className="w-[1px] h-12 mt-4" style={{ background: `linear-gradient(to bottom, ${color.hex}, transparent)` }} />
                  </motion.div>

                  <div className="relative h-[320px] w-full flex items-center justify-center">
                    {/* Frequency bars — RESTORED ANIMATION */}
                    <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-[2px] rounded-full"
                          style={{ background: color.hex, opacity: 0.1 + (j/12) * 0.2 }}
                          animate={{ height: [40 + Math.random() * 60, 100 + Math.random() * 120, 40 + Math.random() * 60] }}
                          transition={{ duration: 0.8 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: j * 0.1 }}
                        />
                      ))}
                    </div>
                    
                    {/* Main pillar */}
                    <motion.div
                      className="relative z-10 w-6 rounded-full"
                      style={{ 
                        background: `linear-gradient(to top, ${color.hex}, ${color.hex}cc)`,
                        boxShadow: `0 0 30px ${color.hex}33`,
                        height: 280
                      }}
                    />
                  </div>

                  <div className="mt-8 text-center opacity-70">
                    <span
                      className="block mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        color: color.hex,
                        fontWeight: 600
                      }}
                    >
                      {color.hex}
                    </span>
                    <span
                      className="block uppercase"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        color: isDark ? "rgba(255,255,255,0.4)" : "rgba(15,8,23,0.4)",
                      }}
                    >
                      {color.role}
                    </span>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="relative z-10 grid grid-cols-1 gap-8 md:hidden px-8 pb-16">
          {PALETTE.map((color, i) => (
            <FadeIn key={color.hex} delay={0.1 + i * 0.05} className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full" style={{ background: color.hex, boxShadow: `0 0 20px ${color.hex}44` }} />
              <div>
                <span className="block uppercase text-[0.7rem] tracking-widest font-bold" style={{ color: color.hex }}>{color.name}</span>
                <span className="block text-[0.6rem] tracking-wider opacity-60 uppercase mt-1" style={{ color: isDark ? "#fff" : "#000" }}>{color.hex} — {color.role}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================
   7. LOGO
   =================================== */
function LogoSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("mzw.logo.label")}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
            <div
              className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl"
              style={{
                background: DARK_BG,
                border: `1px solid ${r(0.04)}`,
              }}
            >
              <img
                src={imgMzwLogo}
                alt="Logo MZW blanc"
                className="w-20 md:w-24"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            <div
              className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl"
              style={{
                background: "#f6f3ef",
                border: `1px solid ${r(0.04)}`,
              }}
            >
              <img
                src={imgMzwLogo}
                alt="Logo MZW noir"
                className="w-20 md:w-24"
                style={{ filter: "brightness(0)" }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   8. SUPPORTS PRINT — Poster mockups
   =================================== */
function PrintSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-32 relative overflow-hidden">
      <TopographicWaves isDark={isDark} density={12} opacity={0.3} height="100%" position="full" spread={90} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-16">
          <FadeIn>
            <SectionLabel>{t("mzw.print.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.print.text")}</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700" style={{ border: `1px solid ${r(isDark ? 0.06 : 0.04)}` }}>
              <img src={imgSupportPrint1} alt="Support print MZW 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700" style={{ border: `1px solid ${r(isDark ? 0.06 : 0.04)}` }}>
              <img src={imgSupportPrint2} alt="Support print MZW 2" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   9. VINYLE
   =================================== */
function VinylSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-32 relative overflow-hidden">
      <TopographicWaves isDark={isDark} density={15} opacity={0.35} height="80%" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start mb-16">
          <FadeIn>
            <SectionLabel>{t("mzw.vinyl.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...body, fontSize: "1rem" }}>{t("mzw.vinyl.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="flex justify-center">
            <div className="relative max-w-md">
              <img src={imgVinyle} alt="Pochette vinyle MZW No Sense" className="relative z-10 w-full object-contain shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.02] duration-700" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   10. MERCHANDISING — T-shirts
   =================================== */
function MerchSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("mzw.merch.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.merch.text")}</p>
          </FadeIn>
        </div>

        {/* T-shirt mockup full width */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgTShirt} alt="T-Shirt No Sense Mockup" className="block w-[106%] max-w-none -translate-x-[3%] object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11. INTERFACE MOBILE
   =================================== */

function MobileSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  const phoneShadow = (intense: boolean) =>
    isDark
      ? `drop-shadow(0 30px 60px rgba(0,0,0,0.65))${intense ? ` drop-shadow(0 0 50px rgba(${ACCENT_RGB},0.25))` : ""}`
      : `drop-shadow(0 25px 50px rgba(0,0,0,0.2))${intense ? ` drop-shadow(0 0 35px rgba(${ACCENT_RGB},0.12))` : ""}`;

  return (
    <section className="px-6 md:px-12 py-32 overflow-hidden relative">
      <TopographicWaves isDark={isDark} density={15} opacity={0.4} height="100%" position="full" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start mb-20">
          <FadeIn>
            <SectionLabel>{t("mzw.mobile.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ ...body, fontSize: "1.05rem" }}>{t("mzw.mobile.text")}</p>
          </FadeIn>
        </div>

        <div className="relative z-20 flex items-center justify-center min-h-[clamp(500px,60vw,800px)] mt-12">
          {/* Left phone */}
          <FadeIn delay={0.25} className="absolute left-[0%] md:left-[5%] bottom-[10%] z-10">
            <div className="relative" style={{ width: "clamp(160px, 20vw, 300px)", filter: phoneShadow(false) }}>
              <img src={imgPlayerSplash} alt="MZW — écran d'accueil mobile" className="w-full h-auto object-contain" />
            </div>
          </FadeIn>

          {/* Center phone — SCALED DOWN to clamp(240px, 26vw, 360px) */}
          <FadeIn delay={0.4} className="relative z-30">
            <div className="relative" style={{ width: "clamp(220px, 24vw, 340px)", filter: phoneShadow(true) }}>
              <img src={imgPlayerCenter} alt="MZW — lecteur en cours de lecture" className="relative z-10 mx-auto h-auto w-full object-contain" />
            </div>
          </FadeIn>

          {/* Right phone */}
          <FadeIn delay={0.55} className="absolute right-[0%] md:right-[5%] bottom-[12%] z-10">
            <div className="relative" style={{ width: "clamp(160px, 20vw, 300px)", filter: phoneShadow(false) }}>
              <img src={imgPlayerLibrary} alt="MZW — bibliothèque mobile" className="w-full h-auto object-contain" />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.8}>
          <p className="text-center mt-20 mx-auto max-w-xl italic font-medium tracking-widest leading-loose" 
             style={{ ...body, color: r(0.45), fontSize: "clamp(0.85rem, 1.4vw, 1rem)" }}>
            {t("mzw.mobile.anecdote")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function MockupsSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-32 relative overflow-hidden">
      <TopographicWaves isDark={isDark} density={10} opacity={0.1} height="100%" position="full" />
      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn className="mb-16">
          <SectionLabel>{t("mzw.mockups.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.08}>
            <div className="rounded-xl overflow-hidden shadow-2xl group" style={{ border: `1px solid ${r(0.06)}` }}>
              <img src={imgMockup1} alt="Mise en situation MZW 1" className="w-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="rounded-xl overflow-hidden shadow-2xl group" style={{ border: `1px solid ${r(0.06)}` }}>
              <img src={imgMockup2} alt="Mise en situation MZW 2" className="w-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden px-6 py-32 md:px-16 md:py-48"
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(7,5,14,0) 0%, rgba(11,8,22,0.6) 20%, #07040d 100%)"
          : "linear-gradient(180deg, rgba(246,244,241,0) 0%, rgba(252,250,247,0.7) 30%, #fcfaf7 100%)",
      }}
    >
      <TopographicWaves isDark={isDark} density={14} opacity={0.35} height="70%" />
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.03)" : "rgba(15,8,23,0.04)"} 1px, transparent 1px),
                           linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(15,8,23,0.04)"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      />
      
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[500px] w-[min(800px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: isDark
            ? `radial-gradient(ellipse, rgba(${ACCENT_RGB},0.2) 0%, rgba(179,66,138,0.08) 40%, transparent 70%)`
            : `radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(${ACCENT_RGB},0.1) 40%, rgba(204,123,99,0.06) 60%, transparent 80%)`,
          filter: "blur(60px)",
        }}
        animate={{ 
          opacity: isDark ? [0.4, 0.6, 0.4] : [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <FadeIn className="mb-12 text-center">
          <SectionLabel>{t("mzw.final.label")}</SectionLabel>
          <h2 className="mt-6 text-2xl md:text-4xl font-bold tracking-tight" style={{ color: isDark ? "#fff" : "#000", fontFamily: "'Space Grotesk', sans-serif" }}>
            Resonance & Frequency
          </h2>
        </FadeIn>

        <FadeIn>
          <p
            className="text-center max-w-lg mb-16 leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: r(0.4),
            }}
          >
            {t("mzw.final.text")}
          </p>
        </FadeIn>

        <FadeIn>
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-4 rounded-full px-10 py-5 backdrop-blur-xl transition-all duration-500 hover:scale-[1.05] active:scale-[0.98] relative overflow-hidden"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(15,8,23,0.12)"}`,
              color: isDark ? "#fff" : "#000",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)",
              boxShadow: isDark
                ? `0 20px 50px rgba(0,0,0,0.3), 0 0 20px rgba(${ACCENT_RGB},0.1)`
                : "0 20px 50px rgba(45,38,31,0.1)",
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1.5" />
            {t("mzw.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   FLOATING BUTTERFLIES
   =================================== */
interface ButterflyData {
  id: number;
  size: number;
  baseX: number;
  baseY: number;
  driftAmplitudeX: number;
  driftAmplitudeY: number;
  driftSpeed: number;
  flapSpeed: number;
  rotateBase: number;
}

const BUTTERFLIES: ButterflyData[] = [
  { id: 0, size: 108, baseX: 86, baseY: 22, driftAmplitudeX: 1.6, driftAmplitudeY: 3.8, driftSpeed: 7, flapSpeed: 1.8, rotateBase: -6 },
  { id: 1, size: 72, baseX: 7, baseY: 68, driftAmplitudeX: 1.8, driftAmplitudeY: 3.4, driftSpeed: 9, flapSpeed: 1.5, rotateBase: 8 },
];

/* Sparkle particles emitted on click */
interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

function ParticleBurst({ originX, originY, onDone }: { originX: number; originY: number; onDone: () => void }) {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: originX,
      y: originY,
      angle: (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.6,
      distance: 40 + Math.random() * 60,
      size: 2 + Math.random() * 4,
      duration: 0.5 + Math.random() * 0.4,
    }))
  );

  useEffect(() => {
    const t = setTimeout(onDone, 1000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: `rgba(${ACCENT_RGB}, 0.9)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(${ACCENT_RGB}, 0.6)`,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function SingleButterfly({ data, isDark }: { data: ButterflyData; isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [hoverSparkles, setHoverSparkles] = useState<{ id: number; ox: number; oy: number }[]>([]);
  const sparkleCounter = useRef(0);
  const [tapVariant, setTapVariant] = useState(() => TAP_GENERATORS[0]());

  // Continuous sparkle emission on hover — dense, wider spread
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      // Spawn 2-3 particles per tick across wider area
      const count = 2 + Math.floor(Math.random() * 2);
      for (let n = 0; n < count; n++) {
        const ox = rect.left + rect.width * (0.1 + Math.random() * 0.8);
        const oy = rect.top + rect.height * (0.1 + Math.random() * 0.8);
        sparkleCounter.current += 1;
        const id = sparkleCounter.current;
        setHoverSparkles((prev) => [...prev.slice(-20), { id, ox, oy }]);
        setTimeout(() => {
          setHoverSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 900);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [isHovered]);

  const opacityVal = isDark ? 0.82 : 0.68;

  const handleTap = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    // Pick a random disappear animation — never the same twice in a row
    let idx = Math.floor(Math.random() * TAP_GENERATORS.length);
    if (idx === lastTapIdx) idx = (idx + 1 + Math.floor(Math.random() * (TAP_GENERATORS.length - 1))) % TAP_GENERATORS.length;
    lastTapIdx = idx;
    setTapVariant(TAP_GENERATORS[idx]());
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 1000);
  };

  return (
    <>
      {burst && <ParticleBurst originX={burst.x} originY={burst.y} onDone={() => setBurst(null)} />}
      {/* Hover sparkles — floating upward from butterfly */}
      {hoverSparkles.length > 0 && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <AnimatePresence>
            {hoverSparkles.map((s) => {
              const sz = 2 + Math.random() * 3;
              const color = PALETTE[Math.floor(Math.random() * PALETTE.length)].hex;
              return (
                <motion.div
                  key={s.id}
                  className="absolute rounded-full"
                  style={{
                    width: sz,
                    height: sz,
                    left: s.ox,
                    top: s.oy,
                    background: color,
                    boxShadow: `0 0 ${sz * 3}px ${color}99`,
                  }}
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{
                    y: -(25 + Math.random() * 40),
                    x: (Math.random() - 0.5) * 35,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
      <motion.div
        ref={ref}
        className="fixed z-[70] cursor-pointer"
        style={{
          top: 0,
          left: 0,
          opacity: opacityVal,
          pointerEvents: "auto",
        }}
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{
          x: isTapped
            ? tapVariant.x
            : [
                `${data.baseX}vw`,
                `${data.baseX + data.driftAmplitudeX}vw`,
                `${data.baseX - data.driftAmplitudeX * 0.5}vw`,
                `${data.baseX}vw`,
              ],
          y: isTapped
            ? tapVariant.y
            : [
                `${data.baseY}vh`,
                `${data.baseY - data.driftAmplitudeY}vh`,
                `${data.baseY + data.driftAmplitudeY * 0.6}vh`,
                `${data.baseY}vh`,
              ],
          rotate: isTapped
            ? tapVariant.rotate
            : [data.rotateBase, data.rotateBase + 10, data.rotateBase - 6, data.rotateBase],
          scale: isTapped ? tapVariant.scale : isHovered ? 1.35 : 1,
          opacity: isTapped ? tapVariant.opacity : opacityVal,
        }}
        transition={
          isTapped
            ? { duration: tapVariant.dur, ease: "easeOut" }
            : {
                x: { duration: data.driftSpeed, repeat: Infinity, ease: "easeInOut" },
                y: { duration: data.driftSpeed * 1.3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: data.driftSpeed * 0.9, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.35, ease: "easeOut" },
                opacity: { duration: 0.3 },
              }
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleTap}
      >
        <motion.div
          style={{
            filter: isHovered
              ? isDark
                ? `drop-shadow(0 0 26px rgba(127,214,255,0.6)) drop-shadow(0 12px 28px rgba(0,0,0,0.38)) brightness(1.28) contrast(1.14)`
                : `drop-shadow(0 0 24px rgba(93,169,255,0.34)) drop-shadow(0 12px 28px rgba(13,27,42,0.18)) brightness(0.78) contrast(1.28)`
              : isDark
                ? `drop-shadow(0 0 18px rgba(127,214,255,0.32)) drop-shadow(0 10px 24px rgba(0,0,0,0.34)) brightness(1.16) contrast(1.1)`
                : `drop-shadow(0 0 16px rgba(93,169,255,0.22)) drop-shadow(0 10px 24px rgba(13,27,42,0.16)) brightness(0.72) contrast(1.3)`,
            transition: "filter 0.3s ease",
          }}
        >
          {/* Wing-flap — scaleX for left/right fold */}
          <motion.div
            animate={{
              scaleX: [1, 0.25, 1, 0.3, 1],
              rotateY: [0, 50, 0, -45, 0],
            }}
            transition={{
              duration: data.flapSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "center center", perspective: 200 }}
          >
            <img
              src={imgButterfly}
              alt=""
              draggable={false}
              style={{
                width: `${data.size}px`,
                mixBlendMode: "normal",
                objectFit: "contain",
                userSelect: "none",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

function FloatingButterfly() {
  const { isDark } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMounted || isCompact) return null;

  return createPortal(
    <>
      {BUTTERFLIES.map((b) => (
        <SingleButterfly key={b.id} data={b} isDark={isDark} />
      ))}
    </>,
    document.body
  );
}

function WaveSeparator({ isDark }: { isDark: boolean }) {
  return (
    <div className="w-full h-24 overflow-hidden pointer-events-none opacity-40" aria-hidden="true">
      <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <motion.path
          d="M0 50 Q 250 10 500 50 T 1000 50"
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}
          strokeWidth="0.5"
          animate={{
            d: [
              "M0 50 Q 250 10 500 50 T 1000 50",
              "M0 50 Q 250 90 500 50 T 1000 50",
              "M0 50 Q 250 10 500 50 T 1000 50"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectMzw() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden">
      {/* GLOBAL STUDIO LAYERS */}
      
      {/* 1. Cinematic Grain Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* 2. Global Precision Grid */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px), 
                           linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: isDark ? 0.6 : 0.4,
        }}
      />

      <div className="relative z-[2]">
        <HeroSection />
        <IntroSection />
        <WaveSeparator isDark={isDark} />
        <ContextSection />
        <DirectionSection />
        <WaveSeparator isDark={isDark} />
        <NamingSection />
        <PaletteSection />
        <WaveSeparator isDark={isDark} />
        <LogoSection />
        <MockupsSection />
        <WaveSeparator isDark={isDark} />
        <PrintSection />
        <VinylSection />
        <MerchSection />
        <WaveSeparator isDark={isDark} />
        <MobileSection />

        <FinalSection />
      </div>

      {/* Floating butterflies */}
      <FloatingButterfly />
    </div>
  );
}
