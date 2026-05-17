import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

/* -- Assets -- */
import svgPaths from "../../imports/svg-8j0m9nldaw";
import playerSvg from "../../imports/svg-c1cvk0n26k";
import decorativeSvg from "../../imports/svg-dgqe0tacnj";
import imgNoSenseA3 from "figma:asset/f0782cd8941d77b28e775c2412d7b0004e3fc4a7.png";
import imgVinyle from "figma:asset/9770aceb814e4effa7b6e625ada52b430207efc8.png";
import imgTShirt from "figma:asset/21fe877e1d876a50789d329e49632e24452c7158.png";
import imgKids04 from "figma:asset/71b5b76ff5b2eb1226378b9686f91fa60ac7728e.png";
import imgKids02 from "figma:asset/32874648f507631cb3878df6ebb484a294c92f4d.png";
import imgMockupAffiche3 from "figma:asset/9a5009718ea630c0da86ed9381e0fee85993f407.png";
import imgMockupAffiche2 from "figma:asset/822b3b7fed95cc1119d1476b8d3f20373f26d73b.png";
import imgAlbumArt from "figma:asset/285aae2a2bd3a31891ce93006639e1f4cfc7f16b.png";
import imgCover1 from "figma:asset/b2dc3411ce1d7da5eedb5f043de453cdcea29c1d.png";
import imgCover2 from "figma:asset/26ae25ab6f07e30cafc892d0f17cb14a514a6034.png";
import imgCover3 from "figma:asset/4c9333cbad89d2b7b025a8b2eeb4a232cada0a5a.png";
import imgCover4 from "figma:asset/621f4ea03c85e1dd9558f377364da9bed12d680b.png";
import imgCover5 from "figma:asset/fafde56448e896ef13ef6ce3abb1701a45e00563.png";

/* Butterfly decorative elements */
import imgButterflyDark from "figma:asset/05779787c3aa30f3c5bf6223cef95b15e8dc4c6c.png";
import imgButterflyLight from "figma:asset/46e4854a99d69700fa6a55f340a876752fa36e42.png";

/* Phone mockups — device frames from Figma */
import imgPhoneSplash from "figma:asset/bcd888905a245dc8b177e96fd0999cc222dc74ea.png";
import imgPhonePlayer from "figma:asset/a482d7f9718ca2e04a1977f65d5b924b530f28a9.png";
import imgPhoneLibrary from "figma:asset/e40ef5803418bf97e54030fd41ac147b6b213cf8.png";

/* -- Helpers -- */
const ACCENT = "#5d4792";
const ACCENT_RGB = "93,71,146";
const DARK_BG = "#0f0817";

/* All decorative S-shape SVG path keys */
const SWIRL_PATHS = Object.values(decorativeSvg);

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
  { hex: "#254d9b", name: "Deep Blue" },
  { hex: "#5d4792", name: "Royal Violet" },
  { hex: "#b3428a", name: "Magenta" },
  { hex: "#cc7b63", name: "Warm Coral" },
  { hex: "#e2c049", name: "Golden" },
];

function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span
      className="uppercase tracking-[0.3em] block"
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
      viewport={{ once: true, margin: "-60px" }}
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
          className="w-[280px] md:w-[400px] rounded-2xl overflow-hidden"
          style={{
            boxShadow: isDark
              ? `0 40px 100px rgba(${ACCENT_RGB},0.25), 0 0 60px rgba(179,66,138,0.1)`
              : `0 40px 100px rgba(${ACCENT_RGB},0.15), 0 0 60px rgba(179,66,138,0.08)`,
          }}
        >
          <img src={imgNoSenseA3} alt="MZW — No Sense A3 Poster" className="w-full object-cover" />
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
            <p style={body}>{t("mzw.context.text")}</p>
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
            <p style={body}>{t("mzw.direction.text")}</p>
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
   5. CHOIX GRAPHIQUES
   =================================== */
function ChoicesSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.choices.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.choices.text")}</p>
          </FadeIn>
        </div>
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
   5c. INTENTION
   =================================== */
function IntentionSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("mzw.intention.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5">
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

        <div className="grid grid-cols-5 gap-3">
          {PALETTE.map((color, i) => (
            <FadeIn key={color.hex} delay={0.12 + i * 0.06}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-full aspect-square rounded-xl transition-transform duration-300 hover:scale-105"
                  style={{
                    background: color.hex,
                    boxShadow: isDark
                      ? `0 12px 30px ${color.hex}33`
                      : `0 8px 24px ${color.hex}22`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.05em",
                    color: r(0.25),
                  }}
                >
                  {color.hex}
                </span>
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
              <img src={imgMockupAffiche3} alt="Mockup affiche MZW 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgMockupAffiche2} alt="Mockup affiche MZW 2" className="w-full object-cover" />
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
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgTShirt} alt="T-Shirt No Sense Mockup" className="w-full object-cover" />
          </div>
        </FadeIn>

        {/* Kids wearing merch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgKids02} alt="Merchandising MZW — portés 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgKids04} alt="Merchandising MZW — portés 2" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   11. INTERFACE MOBILE — Immersive phone showcase with animated waveform
   =================================== */

const EQ_COLORS = ["#254d9b", "#5d4792", "#b3428a", "#cc7b63", "#e2c049"];

const WAVEFORM_PLAYED = [62, 105, 89, 46, 62, 50, 121, 62, 62, 62, 42, 54, 22, 54, 113, 77, 54, 34, 77, 113, 77, 77, 89, 113, 70, 54, 77, 77, 62];
const WAVEFORM_UNPLAYED = [105, 89, 70, 62, 77, 121, 62, 62, 62, 30, 38, 14, 38, 77, 54, 38, 22, 54, 77, 54, 54, 62, 77, 50, 38, 54, 54];
const WF_MAX = 121;

function AnimatedWaveform() {
  return (
    <div className="flex items-center gap-[1.5px] w-full" style={{ height: "100%" }}>
      {WAVEFORM_PLAYED.map((h, i) => {
        const pct = (h / WF_MAX) * 100;
        const v = 15 + Math.random() * 20;
        return (
          <motion.div key={`p-${i}`} className="flex-1 rounded-full" style={{ background: "#60488e", minWidth: 1.5, maxWidth: 4 }}
            animate={{ height: [`${pct}%`, `${Math.min(100, pct + v)}%`, `${Math.max(15, pct - v * 0.6)}%`, `${pct}%`] }}
            transition={{ duration: 0.6 + Math.random() * 0.8, delay: Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }} />
        );
      })}
      {WAVEFORM_UNPLAYED.map((h, i) => {
        const pct = (h / WF_MAX) * 100;
        const v = 8 + Math.random() * 12;
        return (
          <motion.div key={`u-${i}`} className="flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.65)", minWidth: 1.5, maxWidth: 4 }}
            animate={{ height: [`${pct}%`, `${Math.min(100, pct + v)}%`, `${Math.max(10, pct - v * 0.5)}%`, `${pct}%`] }}
            transition={{ duration: 0.8 + Math.random() * 0.6, delay: Math.random() * 0.4, repeat: Infinity, ease: "easeInOut" }} />
        );
      })}
    </div>
  );
}

/* Built-from-code player phone — the center hero phone */
function PlayerPhone() {
  return (
    <div className="relative overflow-hidden" style={{ background: "#0f0817", borderRadius: "clamp(18px, 3.5vw, 40px)", border: "1px solid rgba(186,168,237,0.12)", width: "100%", aspectRatio: "784 / 1766" }}>
      {/* Bottom glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "inherit" }}>
        <div className="absolute" style={{ width: "130%", height: "50%", bottom: "-10%", left: "-15%", background: "radial-gradient(ellipse at 40% 80%, rgba(94,70,248,0.18) 0%, transparent 60%), radial-gradient(ellipse at 65% 70%, rgba(192,62,254,0.14) 0%, transparent 55%)", filter: "blur(40px)" }} />
      </div>
      {/* Side decorative lines */}
      <div className="absolute top-[26%] bottom-[37%] left-[3%] w-[0.4%] rounded-full" style={{ background: "rgba(186,168,237,0.4)" }} />
      <div className="absolute top-[26%] bottom-[37%] right-[3%] w-[0.4%] rounded-full" style={{ background: "rgba(186,168,237,0.4)" }} />
      {/* Header */}
      <div className="relative flex items-center justify-between px-[9%] pt-[6%] pb-[2%]">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(7px, 1.5vw, 14px)", fontWeight: 600, color: "white" }}>9:41</span>
        <div className="flex items-center gap-[4px]">
          <svg viewBox="0 0 28 20.1" fill="white" style={{ width: "clamp(8px, 1.4vw, 14px)" }}><path d={playerSvg.p2c643cc0} /></svg>
          <svg viewBox="0 0 33 18.4" fill="white" style={{ width: "clamp(8px, 1.6vw, 16px)" }}><path d={playerSvg.p10769f80} /></svg>
          <svg viewBox="0 0 37 15.3" fill="white" style={{ width: "clamp(10px, 1.8vw, 18px)" }}><path d={playerSvg.p3f0ff600} /></svg>
        </div>
      </div>
      {/* Navigation */}
      <div className="relative flex items-center justify-between px-[9%] py-[3%]">
        <svg viewBox="0 0 19.068 33.369" fill="white" className="rotate-180" style={{ width: "clamp(5px, 1vw, 10px)" }}><path d={playerSvg.p1abbdff0} /></svg>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(8px, 1.6vw, 16px)", fontWeight: 600, color: "white" }}>Playslist</span>
        <svg viewBox="0 0 34.113 8.161" fill="white" className="-rotate-90" style={{ width: "clamp(6px, 1.2vw, 12px)" }}><path d={playerSvg.p3bd47c00} /></svg>
      </div>
      {/* Song title + heart */}
      <div className="relative flex items-start justify-between px-[9%] pt-[2%] pb-[1%]">
        <div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(10px, 2.2vw, 22px)", fontWeight: 700, color: "white", lineHeight: 1.3 }}>Schmetterling</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(8px, 1.6vw, 16px)", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>MZW</p>
        </div>
        <svg viewBox="0 0 42.5 42.3" fill="white" style={{ width: "clamp(10px, 2.2vw, 24px)", marginTop: "4px", flexShrink: 0 }}><path d={playerSvg.pee6a5c0} /></svg>
      </div>
      {/* Album art */}
      <div className="relative px-[9%] py-[3%]">
        <div className="relative rounded-[clamp(8px,1.5vw,16px)] overflow-hidden aspect-square">
          <img src={imgAlbumArt} alt="Schmetterling — Album Art" className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Animated Waveform */}
      <div className="relative px-[9%] py-[1.5%]" style={{ height: "9%" }}>
        <AnimatedWaveform />
      </div>
      {/* Time */}
      <div className="relative flex items-center justify-between px-[9%] py-[0.5%]">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(6px, 1.1vw, 11px)", color: "#60488e" }}>1:04</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(6px, 1.1vw, 11px)", color: "#c6c6c6" }}>3:29</span>
      </div>
      {/* Play controls */}
      <div className="relative flex items-center justify-center gap-[10%] px-[9%] py-[3%]">
        <svg viewBox="0 0 40.12 36" fill="#BAA8ED" style={{ width: "clamp(8px, 1.6vw, 16px)", opacity: 0.6 }}><path d={playerSvg.p1e846700} transform="translate(0,-99.4) scale(1)" /></svg>
        <motion.div className="relative flex items-center justify-center rounded-full"
          style={{ width: "clamp(28px, 5.5vw, 56px)", height: "clamp(28px, 5.5vw, 56px)", background: "linear-gradient(135deg, #e8e0f4 0%, #c8bde0 100%)" }}
          animate={{ boxShadow: ["0 4px 20px rgba(93,71,146,0.3), 0 0 30px rgba(93,71,146,0.1)", "0 6px 30px rgba(93,71,146,0.5), 0 0 50px rgba(93,71,146,0.2)", "0 4px 20px rgba(93,71,146,0.3), 0 0 30px rgba(93,71,146,0.1)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex items-center gap-[12%]">
            <div className="rounded-sm" style={{ width: "clamp(3px, 0.6vw, 6px)", height: "clamp(10px, 2vw, 20px)", background: "#1a1020" }} />
            <div className="rounded-sm" style={{ width: "clamp(3px, 0.6vw, 6px)", height: "clamp(10px, 2vw, 20px)", background: "#1a1020" }} />
          </div>
        </motion.div>
        <svg viewBox="0 0 40.12 36" fill="#BAA8ED" style={{ width: "clamp(8px, 1.6vw, 16px)", opacity: 0.6, transform: "scaleX(-1)" }}><path d={playerSvg.p1e846700} transform="translate(0,-99.4) scale(1)" /></svg>
      </div>
      {/* Lyrics */}
      <div className="relative flex justify-center pb-[5%]">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(6px, 1.1vw, 11px)", color: "#c6c6c6", letterSpacing: "0.3em" }}>Lyrics</span>
      </div>
    </div>
  );
}

/* Decorative equalizer — ultra-wide with soft edge fade and slow motion */
function DecorativeEqualizer({ isDark }: { isDark: boolean }) {
  const barCount = 180;
  const center = barCount / 2;
  return (
    <div className="flex items-end justify-center gap-[1.5px] w-full" style={{ height: "55px" }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const color = EQ_COLORS[i % EQ_COLORS.length];
        const baseH = 15 + Math.random() * 25;
        const peakH = 35 + Math.random() * 50;
        const dur = 1.2 + Math.random() * 1.5;
        const delay = Math.random() * 1.2;
        const distFromCenter = Math.abs(i - center) / center;
        const edgeOpacity = Math.max(0, 1 - distFromCenter * 1.15);
        return (
          <motion.div key={i} className="flex-1 rounded-full"
            style={{ background: `linear-gradient(to top, ${color}${isDark ? "cc" : "99"}, ${color}${isDark ? "44" : "33"})`, minWidth: 0.8, maxWidth: 3, opacity: edgeOpacity }}
            animate={{ height: [`${baseH}%`, `${peakH}%`, `${baseH + 6}%`, `${peakH - 10}%`, `${baseH}%`] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }} />
        );
      })}
    </div>
  );
}

/* Phone bezel mockup — wraps content in a realistic device frame */
function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ padding: "clamp(4px, 0.6vw, 8px)" }}>
      {/* Outer bezel */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "clamp(22px, 4.2vw, 48px)",
          background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #0e0e10 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
          padding: "clamp(6px, 1vw, 12px)",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-30"
          style={{
            width: "30%",
            height: "clamp(14px, 2.2vw, 28px)",
            background: "#0e0e10",
            borderRadius: "0 0 clamp(8px, 1.5vw, 16px) clamp(8px, 1.5vw, 16px)",
          }}
        />
        {/* Side buttons — left */}
        <div className="absolute top-[18%] -left-[2px] w-[2px] h-[5%] rounded-l-sm" style={{ background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)" }} />
        <div className="absolute top-[26%] -left-[2px] w-[2px] h-[8%] rounded-l-sm" style={{ background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)" }} />
        <div className="absolute top-[36%] -left-[2px] w-[2px] h-[8%] rounded-l-sm" style={{ background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)" }} />
        {/* Side button — right (power) */}
        <div className="absolute top-[30%] -right-[2px] w-[2px] h-[10%] rounded-r-sm" style={{ background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)" }} />
        {/* Inner screen */}
        <div className="relative overflow-hidden" style={{ borderRadius: "clamp(16px, 3.2vw, 38px)" }}>
          {children}
        </div>
        {/* Bottom home indicator */}
        <div
          className="absolute bottom-[clamp(3px,0.6vw,7px)] left-1/2 -translate-x-1/2 z-30 rounded-full"
          style={{ width: "28%", height: "clamp(3px, 0.4vw, 5px)", background: "rgba(255,255,255,0.15)" }}
        />
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

  return (
    <section className="px-6 md:px-16 py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-16">
          <FadeIn>
            <SectionLabel>{t("mzw.mobile.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mzw.mobile.text")}</p>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Ambient glow */}
          <div className="absolute pointer-events-none" style={{ width: "60%", height: "80%", top: "10%", left: "20%", background: `radial-gradient(ellipse at 50% 50%, rgba(${ACCENT_RGB},${isDark ? 0.1 : 0.05}) 0%, transparent 70%)`, filter: "blur(50px)" }} />

          <div className="relative flex items-end justify-center gap-3 md:gap-5" style={{ minHeight: "clamp(400px, 60vw, 680px)" }}>
            {/* Left phone — Splash — symmetric with right */}
            <FadeIn delay={0.1} className="relative z-10 self-start mt-4 md:mt-6">
              <motion.div className="relative" initial={{ opacity: 0, x: -40, rotate: 0 }} whileInView={{ opacity: 1, x: 0, rotate: -3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                style={{ width: "clamp(140px, 22vw, 260px)", filter: phoneShadow(false) }}>
                <img src={imgPhoneSplash} alt="MZW — Splash Screen" className="w-full h-auto object-contain" />
              </motion.div>
            </FadeIn>

            {/* Center phone — Player — BUILT IN CODE with phone mockup */}
            <FadeIn delay={0.15} className="relative z-20">
              <motion.div className="relative" initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}>
                <motion.div className="relative" style={{ width: "clamp(190px, 28vw, 320px)" }}
                  animate={{ y: [0, -6, 0], filter: [phoneShadow(true), `drop-shadow(0 40px 80px rgba(0,0,0,${isDark ? 0.7 : 0.3})) drop-shadow(0 0 60px rgba(${ACCENT_RGB},${isDark ? 0.35 : 0.18}))`, phoneShadow(true)] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <PhoneMockup>
                    <PlayerPhone />
                  </PhoneMockup>
                </motion.div>
                {/* Reflection */}
                <div className="mt-2 mx-auto overflow-hidden pointer-events-none"
                  style={{ width: "80%", height: "45px", opacity: isDark ? 0.06 : 0.03, transform: "scaleY(-1) scaleX(0.92)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)", borderRadius: "0 0 20px 20px", background: "#0f0817" }} />
              </motion.div>
            </FadeIn>

            {/* Right phone — Library — symmetric with left */}
            <FadeIn delay={0.25} className="relative z-5 self-start mt-4 md:mt-6">
              <motion.div className="relative" initial={{ opacity: 0, x: 40, rotate: 0 }} whileInView={{ opacity: 1, x: 0, rotate: 3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                style={{ width: "clamp(140px, 22vw, 260px)", filter: phoneShadow(false) }}>
                <img src={imgPhoneLibrary} alt="MZW — Library" className="w-full h-auto object-contain" />
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
  { id: 0, size: 52, baseX: 86, baseY: 30, driftAmplitudeX: 3.5, driftAmplitudeY: 5, driftSpeed: 7, flapSpeed: 1.8, rotateBase: -6 },
  { id: 1, size: 36, baseX: 90, baseY: 56, driftAmplitudeX: 2.5, driftAmplitudeY: 4, driftSpeed: 9, flapSpeed: 1.5, rotateBase: 8 },
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

function SingleButterfly({ data, scrollPct, isDark }: { data: ButterflyData; scrollPct: number; isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [hoverSparkles, setHoverSparkles] = useState<{ id: number; ox: number; oy: number }[]>([]);
  const sparkleCounter = useRef(0);
  const [randomOffset] = useState(() => ({
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 60,
    rot: (Math.random() - 0.5) * 100,
  }));
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

  // More visible opacity
  let opacityVal = 0;
  if (scrollPct < 0.04) opacityVal = 0;
  else if (scrollPct < 0.1) opacityVal = ((scrollPct - 0.04) / 0.06) * (isDark ? 0.8 : 0.65);
  else if (scrollPct < 0.88) opacityVal = isDark ? 0.8 : 0.65;
  else if (scrollPct < 0.95) opacityVal = ((0.95 - scrollPct) / 0.07) * (isDark ? 0.8 : 0.65);

  const handleTap = (e: React.MouseEvent) => {
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
        className="fixed z-20 cursor-pointer"
        style={{
          top: 0,
          left: 0,
          opacity: opacityVal,
        }}
        initial={{ opacity: 0, scale: 0.4 }}
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
                ? `drop-shadow(0 0 16px rgba(${ACCENT_RGB},0.6)) drop-shadow(0 0 4px rgba(${ACCENT_RGB},0.3))`
                : `drop-shadow(0 0 16px rgba(${ACCENT_RGB},0.4)) drop-shadow(0 0 4px rgba(${ACCENT_RGB},0.2))`
              : isDark
                ? `drop-shadow(0 3px 10px rgba(${ACCENT_RGB},0.25))`
                : `drop-shadow(0 3px 10px rgba(${ACCENT_RGB},0.12))`,
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
              src={isDark ? imgButterflyDark : imgButterflyLight}
              alt=""
              draggable={false}
              style={{
                width: `${data.size}px`,
                objectFit: "contain",
                userSelect: "none",
                mixBlendMode: isDark ? "screen" : "multiply",
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
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPct(scrollTop / docHeight);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {BUTTERFLIES.map((b) => (
        <SingleButterfly key={b.id} data={b} scrollPct={scrollPct} isDark={isDark} />
      ))}
    </>
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
              <img src={imgMockupAffiche3} alt="Mise en situation 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgMockupAffiche2} alt="Mise en situation 2" className="w-full object-cover" />
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
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("mzw.final.label")}</SectionLabel>
        </FadeIn>

        {/* Closing vinyl */}
        <FadeIn>
          <div className="flex justify-center mb-10">
            <div
              className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-2xl overflow-hidden"
              style={{
                boxShadow: isDark
                  ? `0 30px 80px rgba(${ACCENT_RGB},0.2)`
                  : `0 30px 80px rgba(${ACCENT_RGB},0.1)`,
              }}
            >
              <img src={imgVinyle} alt="MZW — closing" className="w-full h-full object-cover" />
            </div>
          </div>
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Back button — top left */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={() => navigate("/projects")}
        className="fixed top-6 left-6 z-50 group flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.05] active:scale-[0.97]"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.03em",
          background: isDark ? "rgba(15,8,23,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
        {t("mzw.back")}
      </motion.button>

      <div className="relative z-[2]">
        <HeroSection />
        <IntroSection />
        <ContextSection />
        <DirectionSection />
        <ChoicesSection />
        <NamingSection />
        <LogoSection />
        <IntentionSection />
        <PaletteSection />
        <PrintSection />
        <VinylSection />
        <MerchSection />
        <MobileSection />
        <MockupsSection />

        {/* Decorative equalizer — full width between Mockups and Final */}
        <FadeIn>
          <div className="py-10 overflow-hidden">
            <DecorativeEqualizer isDark={isDark} />
          </div>
        </FadeIn>

        <FinalSection />
      </div>

      {/* Decorative S-shape swirl — single large instance, behind content */}
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
                <stop offset="100%" stopColor="#e2c049" />
              </linearGradient>
            </defs>
            {SWIRL_PATHS.map((d, i) => (
              <path key={i} d={d} fill="url(#swirl-grad)" />
            ))}
          </svg>
        </motion.div>
      </div>

      <FloatingButterfly />
    </div>
  );
}