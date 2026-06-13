import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import svgPaths from "../../imports/svg-8j0m9nldaw";
import imgNoSenseA3 from "../../assets/mzw/01-affiche.png";
import imgSupportPrint1 from "../../assets/mzw/02-support-print.jpg";
import imgSupportPrint2 from "../../assets/mzw/03-support-print.jpg";
import imgVinyle from "../../assets/mzw/04-vinyle.png";
import imgTShirt from "../../assets/mzw/05-tshirt.png";
import imgMockup1 from "../../assets/mzw/06-mockup.png";
import imgMockup2 from "../../assets/mzw/07-mockup.png";
import imgPlayerSplash from "../../assets/mzw/08-player.png";
import imgPlayerCenter from "../../assets/mzw/13-player.png";
import imgPlayerLibrary from "../../assets/mzw/10-player.png";
import imgButterfly from "../../assets/mzw/11-papillon.png";

/* -- Helpers -- */
const ACCENT = "#5d4792";
const ACCENT_RGB = "93,71,146";
const DARK_BG = "#0f0817";

const MZW_SWIRL_PATHS_URL = "/assets/mzw-swirl-paths.json";

/* Butterfly tap animation generators — each returns randomised values so no two clicks feel the same */
const TAP_GENERATORS: Array<() => { x: number; y: number; scale: number; rotate: number; opacity: number; dur: number }> = [
  // 1: Shrink & implode
  () => ({ x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20, scale: 0.02 + Math.random() * 0.12, rotate: (Math.random() - 0.5) * 40, opacity: 0, dur: 0.4 + Math.random() * 0.2 }),
  // 2: Fly up fast
  () => ({ x: (Math.random() - 0.5) * 80, y: -(150 + Math.random() * 150), scale: 0.4 + Math.random() * 0.4, rotate: -20 - Math.random() * 30, opacity: 0, dur: 0.5 + Math.random() * 0.25 }),
  // 3: Spiral right
  () => ({ x: 80 + Math.random() * 120, y: -(40 + Math.random() * 80), scale: 0.05 + Math.random() * 0.15, rotate: 270 + Math.random() * 180, opacity: 0, dur: 0.6 + Math.random() * 0.2 }),
  // 4: Drift left & dissolve
  () => ({ x: -(100 + Math.random() * 120), y: -20 + Math.random() * 60, scale: 0.3 + Math.random() * 0.3, rotate: -(10 + Math.random() * 20), opacity: 0, dur: 0.55 + Math.random() * 0.2 }),
  // 5: Zoom out & spin
  () => ({ x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30, scale: 2.5 + Math.random() * 1.5, rotate: 120 + Math.random() * 120, opacity: 0, dur: 0.45 + Math.random() * 0.2 }),
  // 6: Fall down heavy
  () => ({ x: (Math.random() - 0.5) * 60, y: 180 + Math.random() * 150, scale: 0.2 + Math.random() * 0.2, rotate: 15 + Math.random() * 25, opacity: 0, dur: 0.7 + Math.random() * 0.2 }),
  // 7: Diagonal top-right scatter
  () => ({ x: 60 + Math.random() * 100, y: -(80 + Math.random() * 100), scale: 0.02 + Math.random() * 0.08, rotate: -(60 + Math.random() * 60), opacity: 0, dur: 0.4 + Math.random() * 0.2 }),
  // 8: Spiral left upward
  () => ({ x: -(60 + Math.random() * 100), y: -(60 + Math.random() * 120), scale: 0.1 + Math.random() * 0.2, rotate: -(200 + Math.random() * 200), opacity: 0, dur: 0.6 + Math.random() * 0.25 }),
  // 9: Poof — quick scale up then vanish
  () => ({ x: (Math.random() - 0.5) * 15, y: -(10 + Math.random() * 20), scale: 1.8 + Math.random() * 0.8, rotate: (Math.random() - 0.5) * 50, opacity: 0, dur: 0.3 + Math.random() * 0.15 }),
  // 10: Tumble down-right
  () => ({ x: 80 + Math.random() * 100, y: 100 + Math.random() * 120, scale: 0.15 + Math.random() * 0.2, rotate: 90 + Math.random() * 180, opacity: 0, dur: 0.65 + Math.random() * 0.2 }),
  // 11: Float away gently upward-left
  () => ({ x: -(30 + Math.random() * 60), y: -(100 + Math.random() * 100), scale: 0.5 + Math.random() * 0.3, rotate: -(5 + Math.random() * 15), opacity: 0, dur: 0.8 + Math.random() * 0.3 }),
  // 12: Diagonal bottom-left plunge
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

function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span
      className="section-eyebrow uppercase tracking-[0.3em] block"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6rem",
        color: r(0.25),
        letterSpacing: "0.25em",
      }}
    >
      {children}
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
   1. HERO — Strong opening (poster)
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.12) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`,
        }}
      />

      <motion.div className="relative z-10 flex flex-col items-center" style={{ scale: imgScale, opacity: imgOpacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex items-center gap-4 justify-center"
        >
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.3) }}>
            {t("mzw.hero.label")} — {t("mzw.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-[110px] md:w-[160px]"
        >
          <svg className="w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40.9986 36.3546" aria-label="Logo MZW">
            <g>
              <path d={svgPaths.p3c9ec700} fill={isDark ? "white" : "black"} stroke={isDark ? "black" : "none"} strokeWidth="0.35" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
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
    <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
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
  const { r } = useTheme();
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

        {/* Main poster full width */}
        <FadeIn delay={0.15}>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden max-w-sm" style={{ border: `1px solid ${r(0.04)}` }}>
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
   6. PALETTE
   =================================== */
function PaletteSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("mzw.palette.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.palette.text")}</p>
          </FadeIn>
        </div>

        <div
          className="relative overflow-hidden rounded-[2rem] px-5 py-10 md:px-8 md:py-14"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(9,5,15,0.96), rgba(6,8,18,0.98))"
              : "linear-gradient(180deg, rgba(17,12,28,0.96), rgba(8,10,22,0.98))",
            border: `1px solid ${r(0.06)}`,
            boxShadow: isDark
              ? "0 28px 90px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 24px 70px rgba(20,22,35,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <svg className="absolute inset-0 size-full opacity-[0.12]" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 420" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <path
                key={i}
                d={`M-80 ${300 + i * 14} C 90 ${230 + i * 7}, 190 ${370 - i * 4}, 340 ${300 + i * 10} S 620 ${250 + i * 6}, 790 ${310 - i * 5} S 1030 ${330 + i * 4}, 1110 ${260 + i * 8}`}
                stroke="rgba(255,255,255,0.34)"
                strokeWidth="0.8"
              />
            ))}
          </svg>
          <div
            className="absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 opacity-80"
            style={{
              background:
                "linear-gradient(90deg, rgba(37,77,155,0.18), rgba(93,71,146,0.22), rgba(179,66,138,0.22), rgba(204,123,99,0.2), rgba(226,192,73,0.2))",
              filter: "blur(26px)",
            }}
          />
          <svg className="absolute inset-x-0 top-1/2 h-44 w-full -translate-y-1/2 opacity-80" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 220" aria-hidden="true">
            <path
              d="M0 110 C 55 40, 95 172, 145 112 S 240 52, 300 110 S 395 170, 455 110 S 550 48, 610 110 S 706 172, 765 110 S 870 48, 1000 110"
              stroke="url(#mzw-wave-grad)"
              strokeWidth="1.2"
            />
            <path
              d="M0 110 C 55 68, 95 146, 145 112 S 240 76, 300 110 S 395 144, 455 110 S 550 72, 610 110 S 706 146, 765 110 S 870 76, 1000 110"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="0.8"
            />
            <defs>
              <linearGradient id="mzw-wave-grad" x1="0" x2="1000" y1="0" y2="0">
                <stop stopColor="#254D9B" />
                <stop offset="0.25" stopColor="#5D4792" />
                <stop offset="0.5" stopColor="#B3428A" />
                <stop offset="0.75" stopColor="#CC7B63" />
                <stop offset="1" stopColor="#E2C049" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {PALETTE.map((color, i) => (
              <FadeIn key={color.hex} delay={0.12 + i * 0.06}>
                <div className="group relative flex min-h-[292px] flex-col items-center justify-between px-3 py-2 transition-transform duration-500 hover:-translate-y-1">
                  <span
                    className="relative z-10 uppercase"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.22em",
                      color: color.hex,
                    }}
                  >
                    {color.name}
                  </span>

                  <div className="relative z-10 flex h-44 w-full items-center justify-center">
                    <div
                      className="absolute left-1/2 top-1/2 h-[130%] w-px -translate-x-1/2 -translate-y-1/2 opacity-45"
                      style={{
                        background: `linear-gradient(180deg, transparent, ${color.hex}, transparent)`,
                      }}
                    />
                    <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-[3px]">
                      {Array.from({ length: 25 }).map((_, barIndex) => {
                        const distance = Math.abs(barIndex - 12);
                        const height = Math.max(12, 78 - distance * 5 + ((barIndex + i) % 4) * 7);
                        return (
                          <span
                            key={barIndex}
                            className="block w-px rounded-full"
                            style={{
                              height: `${height}%`,
                              background: `linear-gradient(180deg, transparent, ${color.hex}, transparent)`,
                              boxShadow: `0 0 10px ${color.hex}88`,
                              opacity: 0.2 + (12 - Math.min(distance, 12)) * 0.045,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div
                      className="relative z-10 h-28 w-16 rounded-[1.35rem] transition-transform duration-500 group-hover:scale-105 md:h-32 md:w-[4.6rem]"
                      style={{
                        background: `linear-gradient(180deg, ${color.hex}, ${color.hex}dd)`,
                        boxShadow: `0 0 30px ${color.hex}66, 0 0 70px ${color.hex}22, inset 0 1px 0 rgba(255,255,255,0.22)`,
                      }}
                    />
                  </div>

                  <div className="relative z-10 text-center">
                    <span
                      className="block uppercase"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.12em",
                        color: color.hex,
                      }}
                    >
                      {color.hex}
                    </span>
                    <span
                      className="mt-2 block uppercase"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.56rem",
                        letterSpacing: "0.18em",
                        color: "rgba(255,255,255,0.52)",
                      }}
                    >
                      {color.role}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("mzw.logo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* White logo on dark */}
          <FadeIn delay={0.08}>
            <div
              className="flex items-center justify-center rounded-2xl p-12 md:p-16 transition-all duration-700"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1020 0%, #0f0817 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <svg className="w-full max-w-[120px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40.9986 36.3546">
                <g>
                  <path d={svgPaths.p3c9ec700} fill="white" stroke="black" strokeWidth="0.35" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
          </FadeIn>

          {/* Black logo on light */}
          <FadeIn delay={0.14}>
            <div
              className="flex items-center justify-center rounded-2xl p-12 md:p-16 transition-all duration-700"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #f0ebe4 0%, #e8e2d9 100%)"
                  : "linear-gradient(160deg, #faf7f3 0%, #f0ebe4 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <svg className="w-full max-w-[120px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40.9986 36.3546">
                <g>
                  <path d={svgPaths.p3c9ec700} fill="black" />
                </g>
              </svg>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   8. SUPPORTS PRINT — Poster mockups
   =================================== */
function PrintSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("mzw.print.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.print.text")}</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgSupportPrint1} alt="Support print MZW 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
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
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("mzw.vinyl.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.vinyl.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="flex justify-center">
            <div
              className="rounded-2xl overflow-hidden max-w-md"
              style={{ border: `1px solid ${r(0.04)}` }}
            >
              <img src={imgVinyle} alt="Pochette vinyle MZW No Sense" className="w-full object-cover" />
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
  const { r } = useTheme();
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
            <img src={imgTShirt} alt="T-Shirt No Sense Mockup" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11. INTERFACE MOBILE — Immersive phone showcase with animated waveform
   =================================== */

const EQ_COLORS = ["#254d9b", "#5d4792", "#b3428a", "#5DA9FF", "#D8C7D1"];

const WAVEFORM_PLAYED = [62, 105, 89, 46, 62, 50, 121, 62, 62, 62, 42, 54, 22, 54, 113, 77, 54, 34, 77, 113, 77, 77, 89, 113, 70, 54, 77, 77, 62];
const WAVEFORM_UNPLAYED = [105, 89, 70, 62, 77, 121, 62, 62, 62, 30, 38, 14, 38, 77, 54, 38, 22, 54, 77, 54, 54, 62, 77, 50, 38, 54, 54];
const WF_MAX = 121;

function AnimatedWaveform() {
  const playedBars = useMemo(
    () =>
      WAVEFORM_PLAYED.map((h) => {
        const pct = (h / WF_MAX) * 100;
        const variance = 15 + Math.random() * 20;
        return {
          base: pct,
          high: Math.min(100, pct + variance),
          low: Math.max(15, pct - variance * 0.6),
          duration: 0.6 + Math.random() * 0.8,
          delay: Math.random() * 0.5,
        };
      }),
    []
  );
  const unplayedBars = useMemo(
    () =>
      WAVEFORM_UNPLAYED.map((h) => {
        const pct = (h / WF_MAX) * 100;
        const variance = 8 + Math.random() * 12;
        return {
          base: pct,
          high: Math.min(100, pct + variance),
          low: Math.max(10, pct - variance * 0.5),
          duration: 0.8 + Math.random() * 0.6,
          delay: Math.random() * 0.4,
        };
      }),
    []
  );

  return (
    <div className="flex items-center gap-[1.5px] w-full" style={{ height: "100%" }}>
      {playedBars.map((bar, i) => (
        <motion.div
          key={`p-${i}`}
          className="flex-1 rounded-full"
          style={{ background: "#60488e", minWidth: 1.5, maxWidth: 4 }}
          animate={{ height: [`${bar.base}%`, `${bar.high}%`, `${bar.low}%`, `${bar.base}%`] }}
          transition={{ duration: bar.duration, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {unplayedBars.map((bar, i) => (
        <motion.div
          key={`u-${i}`}
          className="flex-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.65)", minWidth: 1.5, maxWidth: 4 }}
          animate={{ height: [`${bar.base}%`, `${bar.high}%`, `${bar.low}%`, `${bar.base}%`] }}
          transition={{ duration: bar.duration, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* Decorative equalizer — ultra-wide with soft edge fade and slow motion */
function DecorativeEqualizer({ isDark }: { isDark: boolean }) {
  const barCount = 180;
  const center = barCount / 2;
  const bars = useMemo(
    () =>
      Array.from({ length: barCount }).map((_, i) => ({
        color: EQ_COLORS[i % EQ_COLORS.length],
        baseH: 15 + Math.random() * 25,
        peakH: 35 + Math.random() * 50,
        duration: 1.2 + Math.random() * 1.5,
        delay: Math.random() * 1.2,
        edgeOpacity: Math.max(0, 1 - (Math.abs(i - center) / center) * 1.15),
      })),
    []
  );

  return (
    <div className="flex items-end justify-center gap-[1.5px] w-full" style={{ height: "55px" }}>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-full"
          style={{
            background: `linear-gradient(to top, ${bar.color}${isDark ? "cc" : "99"}, ${bar.color}${isDark ? "44" : "33"})`,
            minWidth: 0.8,
            maxWidth: 3,
            opacity: bar.edgeOpacity,
          }}
          animate={{ height: [`${bar.baseH}%`, `${bar.peakH}%`, `${bar.baseH + 6}%`, `${bar.peakH - 10}%`, `${bar.baseH}%`] }}
          transition={{ duration: bar.duration, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AnimatedPlayerMockup() {
  return (
    <div className="relative">
      <div className="relative z-10 w-full" style={{ aspectRatio: "1080 / 1350" }}>
        <div
          className="absolute left-1/2 top-1/2 w-[54%] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] p-[1.2%]"
          style={{
            aspectRatio: "785 / 1766",
            background: "linear-gradient(145deg, #1c1d21 0%, #050507 48%, #2c2d32 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 0 3px rgba(0,0,0,0.86)",
          }}
        >
          <div className="relative size-full overflow-hidden rounded-[1.85rem]" style={{ background: "#090211" }}>
            <img src={imgPlayerCenter} alt="MZW — lecteur en cours de lecture" className="absolute inset-0 size-full object-cover" />
            <div
              className="absolute z-20"
              style={{
                left: "8%",
                right: "8%",
                top: "70.4%",
                height: "5%",
                filter: "drop-shadow(0 0 10px rgba(93,71,146,0.5))",
                mixBlendMode: "screen",
              }}
            >
              <AnimatedWaveform />
            </div>
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 z-20 rounded-full"
              style={{
                bottom: "7.6%",
                width: "19%",
                aspectRatio: "1 / 1",
                background: "radial-gradient(circle, rgba(255,255,255,0.18), rgba(93,71,146,0.12) 55%, transparent 72%)",
                transform: "translateX(-50%)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.62, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  const phoneShadow = (intense: boolean) =>
    isDark
      ? `drop-shadow(0 30px 60px rgba(0,0,0,0.65))${intense ? ` drop-shadow(0 0 50px rgba(${ACCENT_RGB},0.25))` : ""}`
      : `drop-shadow(0 25px 50px rgba(0,0,0,0.2))${intense ? ` drop-shadow(0 0 35px rgba(${ACCENT_RGB},0.12))` : ""}`;

  const sceneBg = isDark
    ? `radial-gradient(circle at 50% 48%, rgba(${ACCENT_RGB},0.2), transparent 36%),
       radial-gradient(circle at 18% 68%, rgba(37,77,155,0.16), transparent 28%),
       radial-gradient(circle at 82% 62%, rgba(226,192,73,0.08), transparent 24%),
       linear-gradient(180deg, rgba(15,18,16,0.94), rgba(11,13,12,0.98))`
    : `radial-gradient(circle at 50% 48%, rgba(${ACCENT_RGB},0.12), transparent 36%),
       radial-gradient(circle at 18% 68%, rgba(37,77,155,0.08), transparent 28%),
       linear-gradient(180deg, rgba(245,245,243,0.72), rgba(234,234,234,0.92))`;

  return (
    <section className="px-6 md:px-12 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-16">
          <FadeIn>
            <SectionLabel>{t("mzw.mobile.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.mobile.text")}</p>
          </FadeIn>
        </div>

        <div
          className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] px-4 pt-6 pb-12 md:px-10 md:pt-8 md:pb-14"
          style={{
            minHeight: "clamp(620px, 76vw, 900px)",
            background: sceneBg,
            border: `1px solid ${r(isDark ? 0.08 : 0.1)}`,
            boxShadow: isDark
              ? "0 40px 120px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 34px 100px rgba(35,38,36,0.12), inset 0 1px 0 rgba(255,255,255,0.75)",
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.24))" }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.18]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
          <motion.img
            src={imgButterfly}
            alt=""
            className="hidden md:block absolute z-10 pointer-events-none select-none"
            style={{ width: "clamp(70px, 8vw, 120px)", right: "11%", top: "32%", filter: `drop-shadow(0 0 24px rgba(${ACCENT_RGB},0.45)) brightness(${isDark ? 1.35 : 0.9}) contrast(1.18)` }}
            animate={{ y: [0, -12, 0], rotate: [-4, 5, -4], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={imgButterfly}
            alt=""
            className="hidden md:block absolute z-10 pointer-events-none select-none"
            style={{ width: "clamp(42px, 4vw, 68px)", right: "4%", bottom: "22%", filter: `drop-shadow(0 0 18px rgba(226,192,73,0.34)) brightness(${isDark ? 1.25 : 0.85}) contrast(1.2)`, transform: "rotate(22deg)" }}
            animate={{ y: [0, 16, 0], x: [0, -8, 0], opacity: [0.52, 0.9, 0.52] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-20 flex items-center justify-center min-h-[clamp(500px,64vw,760px)]">
            {/* Left phone — smaller and slightly behind */}
            <FadeIn delay={0.1} className="absolute left-[3%] md:left-[7%] bottom-[18%] z-10">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -70, rotate: -8, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.05, delay: 0.2, ease: "easeOut", y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                style={{ width: "clamp(165px, 22vw, 315px)", filter: phoneShadow(false) }}
              >
                <img src={imgPlayerSplash} alt="MZW — écran d'accueil mobile" className="w-full h-auto object-contain" />
              </motion.div>
            </FadeIn>

            {/* Center phone — hero player */}
            <FadeIn delay={0.15} className="relative z-30">
              <motion.div className="relative" initial={{ opacity: 0, y: 70, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}>
                <motion.div className="relative" style={{ width: "clamp(290px, 39vw, 540px)" }}
                  animate={{ y: [0, -6, 0], filter: [phoneShadow(true), `drop-shadow(0 40px 80px rgba(0,0,0,${isDark ? 0.7 : 0.3})) drop-shadow(0 0 60px rgba(${ACCENT_RGB},${isDark ? 0.35 : 0.18}))`, phoneShadow(true)] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <AnimatedPlayerMockup />
                </motion.div>
                {/* Reflection */}
                <div className="mt-2 mx-auto overflow-hidden pointer-events-none"
                  style={{ width: "80%", height: "45px", opacity: isDark ? 0.06 : 0.03, transform: "scaleY(-1) scaleX(0.92)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)", borderRadius: "0 0 20px 20px", background: "#0f0817" }} />
              </motion.div>
            </FadeIn>

            {/* Right phone — smaller and slightly behind */}
            <FadeIn delay={0.25} className="absolute right-[3%] md:right-[7%] bottom-[20%] z-10">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 70, rotate: 8, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotate: 4, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.05, delay: 0.4, ease: "easeOut", y: { duration: 6.8, repeat: Infinity, ease: "easeInOut" } }}
                style={{ width: "clamp(165px, 22vw, 315px)", filter: phoneShadow(false) }}
              >
                <img src={imgPlayerLibrary} alt="MZW — bibliothèque mobile" className="w-full h-auto object-contain" />
              </motion.div>
            </FadeIn>
          </div>

          {/* Anecdote */}
          <FadeIn delay={0.4}>
            <p className="text-center mt-8 mx-auto max-w-md italic" style={{ ...body, opacity: 0.55, fontSize: "clamp(0.72rem, 1.1vw, 0.82rem)" }}>
              {t("mzw.mobile.anecdote")}
            </p>
          </FadeIn>

        </div>
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
  { id: 0, size: 118, baseX: 79, baseY: 26, driftAmplitudeX: 2.6, driftAmplitudeY: 4.5, driftSpeed: 7, flapSpeed: 1.8, rotateBase: -6 },
  { id: 1, size: 76, baseX: 9, baseY: 64, driftAmplitudeX: 2.2, driftAmplitudeY: 3.8, driftSpeed: 9, flapSpeed: 1.5, rotateBase: 8 },
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

  const opacityVal = isDark ? 0.96 : 0.84;

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
              const color = EQ_COLORS[Math.floor(Math.random() * EQ_COLORS.length)];
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

function DecorativeSwirl({ isDark }: { isDark: boolean }) {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(MZW_SWIRL_PATHS_URL, { signal: controller.signal })
        .then((response) => (response.ok ? response.json() : []))
        .then((data) => {
          if (Array.isArray(data)) setPaths(data.filter((item): item is string => typeof item === "string"));
        })
        .catch(() => {
          if (!controller.signal.aborted) setPaths([]);
        });
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (paths.length === 0) return null;

  return (
    <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{ width: "clamp(900px, 100vw, 1800px)", top: "18%", left: "-25%", aspectRatio: "1112.71 / 1487.03" }}
        animate={{ rotate: [0, 3, -2, 0], scale: [1, 1.04, 0.97, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1112.71 1487.03"
          style={{ opacity: isDark ? 0.2 : 0.08 }}>
          <defs>
            <linearGradient id="swirl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#254d9b" />
              <stop offset="30%" stopColor="#5d4792" />
              <stop offset="60%" stopColor="#b3428a" />
              <stop offset="100%" stopColor="#D8C7D1" />
            </linearGradient>
          </defs>
          {paths.map((d, i) => (
            <path key={i} d={d} fill="url(#swirl-grad)" />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

/* ===================================
   12. MOCKUPS
   =================================== */
function MockupsSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("mzw.mockups.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.08}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgMockup1} alt="Mise en situation MZW 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgMockup2} alt="Mise en situation MZW 2" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   13. FINAL — Closing + back
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("mzw.final.label")}</SectionLabel>
        </FadeIn>

        <FadeIn>
          <p
            className="text-center max-w-md mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.3),
            }}
          >
            {t("mzw.final.text")}
          </p>
        </FadeIn>

        <FadeIn>
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              border: `1px solid ${r(0.1)}`,
              color: r(0.4),
            }}
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            {t("mzw.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectMzw() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="relative w-full">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          background: isDark ? "rgba(15,8,23,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {t("mzw.back")}
      </ProjectBackButton>

      <div className="relative z-[2]">
        <HeroSection />
        <IntroSection />
        <ContextSection />
        <DirectionSection />
        <NamingSection />
        <PaletteSection />
        <LogoSection />
        <MockupsSection />
        <PrintSection />
        <VinylSection />
        <MerchSection />
        <MobileSection />

        {/* Decorative equalizer — full width between Mockups and Final */}
        <FadeIn>
          <div className="py-10 overflow-hidden">
            <DecorativeEqualizer isDark={isDark} />
          </div>
        </FadeIn>

        <FinalSection />
      </div>

      {/* Decorative S-shape swirl — data loaded outside the JS bundle for lighter navigation */}
      <DecorativeSwirl isDark={isDark} />

      <FloatingButterfly />
    </div>
  );
}
