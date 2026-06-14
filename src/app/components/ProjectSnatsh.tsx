import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { FloatingSquares } from "./FloatingSquares";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import imgPage1 from "../../assets/snatsh/01-brochure.png";
import imgPage2 from "../../assets/snatsh/02-brochure.png";
import imgPage3 from "../../assets/snatsh/03-brochure.png";
import imgPage4 from "../../assets/snatsh/04-brochure.png";
import imgPage5 from "../../assets/snatsh/05-brochure.png";
import imgMockup from "../../assets/snatsh/06-mockup.png";
import logoIconTxtBlack from "../../assets/snatsh/assets/01.logo-icon-txt-b.svg";
import logoIconTxtWhite from "../../assets/snatsh/assets/02.logo-icon-txt-w.svg";
import logoIconBlack from "../../assets/snatsh/assets/03.logo-icon-b.svg";
import logoIconWhite from "../../assets/snatsh/assets/04.logo-icon-w.svg";

/* -- Helpers -- */
const ACCENT = "#c0c1a4";
const ACCENT_RGB = "192,193,164";
const SECONDARY = "#c1d3dd";
const SECONDARY_RGB = "193,211,221";
const DARK_BG = "#0a0c08";

const PALETTE = [
  { hex: "#c0c1a4", name: "Sage Green" },
  { hex: "#c1d3dd", name: "Mist Blue" },
  { hex: "#f4f4f2", name: "Off-White" },
  { hex: "#ffffff", name: "White" },
  { hex: "#000000", name: "Black" },
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
    fontFamily: "'Roboto', sans-serif",
    fontSize: "0.85rem",
    lineHeight: 2,
    color: r(0.35),
  } as const;
}

/* ===================================
   1. HERO — Logo on dark
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-visible px-6 py-20">
      {/* Floating rounded squares animation */}
      <div
        className="absolute inset-x-0 top-0 -bottom-24 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.75) 86%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,0.75) 86%, transparent 100%)",
        }}
      >
        <FloatingSquares
          count={20}
          className={isDark ? "-translate-y-14" : "-translate-y-14 opacity-95 mix-blend-multiply contrast-125 saturate-125"}
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 -bottom-20 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`
            : `radial-gradient(ellipse 62% 52% at 50% 44%, rgba(${ACCENT_RGB},0.18) 0%, rgba(${SECONDARY_RGB},0.1) 48%, transparent 76%)`,
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 74%, rgba(0,0,0,0.65) 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 0%, #000 74%, rgba(0,0,0,0.65) 88%, transparent 100%)",
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
            {t("sn.hero.label")} — {t("sn.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Logo text */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-[280px] md:w-[400px]"
        >
          <img
            src={isDark ? logoIconTxtWhite : logoIconTxtBlack}
            alt="SNATSH"
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===================================
   2. INTRO
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
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: isDark ? "#fff" : DARK_BG,
            transition: "color 0.5s ease",
          }}
        >
          SNATSH
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
          {t("sn.intro.tag")}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p
          className="text-center"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            lineHeight: 1.9,
            color: r(0.45),
          }}
        >
          {t("sn.intro.subtitle")}
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div className="w-12 h-[1px] mx-auto my-8" style={{ background: `rgba(${ACCENT_RGB},0.3)` }} />
      </FadeIn>
      <FadeIn delay={0.2}>
        <p
          className="text-center max-w-2xl mx-auto"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.85rem",
            lineHeight: 2,
            color: r(0.3),
          }}
        >
          {t("sn.intro.desc")}
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
            <SectionLabel>{t("sn.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.context.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   4. DIRECTION VISUELLE
   =================================== */
function DirectionSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("sn.direction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.direction.text")}</p>
          </FadeIn>
        </div>
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
            <SectionLabel>{t("sn.choices.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.choices.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   6. LOGO
   =================================== */
function LogoSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("sn.logo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Icon logo — white on dark */}
          <FadeIn delay={0.08}>
            <div
              className="flex items-center justify-center rounded-xl p-6 md:p-8 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1c18 0%, #0a0c08 100%)"
                  : "#0a0c08",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <img src={logoIconWhite} alt="SNATSH icon" className="w-full max-w-[80px]" />
            </div>
          </FadeIn>

          {/* Icon logo — black on light */}
          <FadeIn delay={0.14}>
            <div
              className="flex items-center justify-center rounded-xl p-6 md:p-8 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #f0ebe4 0%, #e8e2d9 100%)"
                  : "linear-gradient(160deg, #faf7f3 0%, #f0ebe4 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <img src={logoIconBlack} alt="SNATSH icon" className="w-full max-w-[80px]" />
            </div>
          </FadeIn>

          {/* Text logo — white on dark */}
          <FadeIn delay={0.2}>
            <div
              className="flex items-center justify-center rounded-xl p-5 md:p-7 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1c18 0%, #0a0c08 100%)"
                  : "#0a0c08",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <img src={logoIconTxtWhite} alt="SNATSH" className="w-full max-w-[140px]" />
            </div>
          </FadeIn>

          {/* Text logo — black on light */}
          <FadeIn delay={0.26}>
            <div
              className="flex items-center justify-center rounded-xl p-5 md:p-7 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #f0ebe4 0%, #e8e2d9 100%)"
                  : "linear-gradient(160deg, #faf7f3 0%, #f0ebe4 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <img src={logoIconTxtBlack} alt="SNATSH" className="w-full max-w-[140px]" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   7. PALETTE
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
            <SectionLabel>{t("sn.palette.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.palette.text")}</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-5 gap-3 md:gap-4 mb-12">
          {PALETTE.map((color, i) => (
            <FadeIn key={color.hex} delay={0.12 + i * 0.06}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-full aspect-square rounded-[20px] md:rounded-[28px] transition-transform duration-300 hover:scale-105"
                  style={{
                    background: color.hex,
                    boxShadow: isDark
                      ? `0 12px 30px ${color.hex === "#000000" ? "rgba(0,0,0,0.6)" : `${color.hex}33`}`
                      : `0 8px 24px ${color.hex === "#ffffff" ? "rgba(0,0,0,0.08)" : `${color.hex}22`}`,
                    border: (color.hex === "#ffffff" || color.hex === "#f4f4f2")
                      ? `1px solid ${r(0.1)}`
                      : "none",
                  }}
                />
                <span
                  className="hidden md:block"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                    color: r(0.3),
                  }}
                >
                  {color.hex}
                </span>
                <span
                  className="hidden md:block"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    color: r(0.2),
                  }}
                >
                  {color.name}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Role + Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-3">
              <SectionLabel>{t("sn.palette.role.label")}</SectionLabel>
              <p style={body}>{t("sn.palette.role.text")}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-3">
              <SectionLabel>{t("sn.palette.meaning.label")}</SectionLabel>
              <p style={body}>{t("sn.palette.meaning.text")}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   8. TYPOGRAPHY
   =================================== */
function TypographySection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("sn.typo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plus Jakarta Sans */}
          <FadeIn delay={0.08}>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col h-full"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #181c16 0%, #0a0c08 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              {/* Fixed-height name zone */}
              <div className="flex flex-col gap-4" style={{ minHeight: "clamp(5.5rem, 10vw, 8rem)" }}>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Plus<br />Jakarta Sans
                </p>
                <span
                  className="inline-block px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    border: `1px solid rgba(${ACCENT_RGB},0.3)`,
                    background: `rgba(${ACCENT_RGB},0.08)`,
                    width: "fit-content",
                  }}
                >
                  Titres &middot; Headings
                </span>
              </div>
              <div className="w-full h-[1px] my-4" style={{ background: "rgba(255,255,255,0.08)" }} />
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                }}
              >
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <p
                className="mt-auto pt-4"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.7rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t("sn.typo.jakarta.desc")}
              </p>
            </div>
          </FadeIn>

          {/* Roboto */}
          <FadeIn delay={0.14}>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col h-full"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #181c16 0%, #0a0c08 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              {/* Fixed-height name zone */}
              <div className="flex flex-col gap-4" style={{ minHeight: "clamp(5.5rem, 10vw, 8rem)" }}>
                <p
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 0.9,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Roboto
                </p>
                <span
                  className="inline-block px-3 py-1 rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: SECONDARY,
                    border: `1px solid rgba(${SECONDARY_RGB},0.3)`,
                    background: `rgba(${SECONDARY_RGB},0.08)`,
                    width: "fit-content",
                  }}
                >
                  Corps de texte &middot; Body
                </span>
              </div>
              <div className="w-full h-[1px] my-4" style={{ background: "rgba(255,255,255,0.08)" }} />
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.2,
                }}
              >
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <p
                className="mt-auto pt-4"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.7rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t("sn.typo.roboto.desc")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   9. INTERACTIVE BOOK — Page-flip carousel
   =================================== */
const BOOK_PAGES = [imgPage1, imgPage2, imgPage3, imgPage4, imgPage5];

function InteractiveBook() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right

  const goNext = () => {
    if (current < BOOK_PAGES.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      rotateY: dir === 0 ? 0 : dir > 0 ? 16 : -16,
      opacity: 0,
      scale: 0.985,
      x: dir === 0 ? 0 : dir > 0 ? 28 : -28,
      filter: "blur(6px)",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      rotateY: dir === 0 ? 0 : dir > 0 ? -12 : 12,
      opacity: 0,
      scale: 0.985,
      x: dir === 0 ? 0 : dir > 0 ? -24 : 24,
      filter: "blur(5px)",
    }),
  };

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("sn.supports.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.supports.text")}</p>
          </FadeIn>
        </div>

        {/* Book container */}
        <FadeIn delay={0.15}>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: isDark
                ? "linear-gradient(160deg, #141612 0%, #0a0c08 100%)"
                : "linear-gradient(160deg, #f7f6f3 0%, #edece8 100%)",
              border: `1px solid ${r(0.06)}`,
              perspective: "1200px",
            }}
          >
            {/* Page display */}
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden flex items-center justify-center p-4 md:p-8">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.45, ease: "easeOut" },
                  }}
                  className="absolute inset-4 md:inset-8 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={BOOK_PAGES[current]}
                    alt={`SNATSH brochure page ${current + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={{
                      boxShadow: isDark
                        ? "0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)"
                        : "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={goPrev}
                disabled={current === 0}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 disabled:opacity-20 disabled:cursor-default"
                style={{
                  background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  border: `1px solid ${r(0.08)}`,
                  color: r(0.6),
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                disabled={current === BOOK_PAGES.length - 1}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 disabled:opacity-20 disabled:cursor-default"
                style={{
                  background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  border: `1px solid ${r(0.08)}`,
                  color: r(0.6),
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Page indicator */}
            <div className="flex items-center justify-center gap-3 pb-5">
              {BOOK_PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === current ? ACCENT : r(0.12),
                  }}
                />
              ))}
              <span
                className="ml-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  color: r(0.25),
                  letterSpacing: "0.05em",
                }}
              >
                {current + 1} / {BOOK_PAGES.length}
              </span>
            </div>
          </div>

          {/* Hint */}
          <p
            className="text-center mt-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              color: r(0.2),
              letterSpacing: "0.05em",
            }}
          >
            {t("sn.book.hint")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   10. MOCKUPS
   =================================== */
function MockupsSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("sn.mockups.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("sn.mockups.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgMockup} alt="SNATSH brochure bi-fold mockup" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11. FINAL
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("sn.final.label")}</SectionLabel>
        </FadeIn>

        {/* Closing logo — icon with sage gradient */}
        <FadeIn>
          <div className="flex justify-center mb-10">
            <div
              className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-[36px] overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(160deg, ${ACCENT} 0%, ${SECONDARY} 100%)`,
                boxShadow: isDark
                  ? `0 30px 80px rgba(${ACCENT_RGB},0.2)`
                  : `0 30px 80px rgba(${ACCENT_RGB},0.15)`,
              }}
            >
              <img src={logoIconWhite} alt="SNATSH" className="w-[55%]" />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p
            className="text-center max-w-md mb-12"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.3),
            }}
          >
            {t("sn.final.text")}
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
            {t("sn.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectSnatsh() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          background: isDark ? "rgba(10,12,8,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {t("sn.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />
      <LogoSection />
      <DirectionSection />
      <PaletteSection />
      <TypographySection />
      <ChoicesSection />
      <InteractiveBook />
      <MockupsSection />
      <FinalSection />
    </div>
  );
}
