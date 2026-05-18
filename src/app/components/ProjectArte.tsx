import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ColorGlow } from "./ColorGlow";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import imgMockup2 from "figma:asset/643f467219777cb9c1e2a683ccd9ff139b50a7f0.png";
import imgMockup1 from "figma:asset/8ec711aa2a8e96750f83190b6bf872e0f39d0fee.png";
import imgPoster1A from "figma:asset/ce6df195729363b7e2b288eb8b06561b2ea06a2b.png";
import imgPoster1B from "figma:asset/21b17a4e5a9573e3fb15228ac14cd4b0ad0ea201.png";
import imgPoster1C from "figma:asset/e70634b16c3ab37c89e4e306e1d0098ba9108599.png";
import imgPoster2A from "figma:asset/3756986884ba0261fe4f428c15a36edc77f1d9ee.png";
import imgPoster2B from "figma:asset/c7f4397444e13ee0d6d1a983e24a5b9044257dca.png";
import imgPoster2C from "figma:asset/1bf4ba6d2595ba3f7cedc009ddab8bcd1ef49e82.png";

/* -- Color constants -- */
// Proposition 1 — Pink / Magenta
const P1_COLORS = [
  { hex: "#e3b2c7", name: "Blush Pink" },
  { hex: "#dd6486", name: "Hot Pink" },
  { hex: "#6e3e55", name: "Dark Plum" },
  { hex: "#e1d7d5", name: "Warm Gray" },
];
const P1_GLOW_RGB = ["227,178,199", "221,100,134", "110,62,85"];

// Proposition 2 — Purple / Blue
const P2_COLORS = [
  { hex: "#9cc4e7", name: "Sky Blue" },
  { hex: "#9779df", name: "Soft Purple" },
  { hex: "#7b67be", name: "Deep Violet" },
  { hex: "#ffffff", name: "White" },
];
const P2_GLOW_RGB = ["156,196,231", "151,121,223", "123,103,190"];

const DARK_BG = "#0c0a10";

/* -- Shared helpers -- */
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

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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
   1. HERO
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-visible px-6 py-20"
    >
      {/* Dual glow — pink + purple blended */}
      <ColorGlow colors={[...P1_GLOW_RGB, ...P2_GLOW_RGB]} count={12} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(221,100,134,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 60% 55%, rgba(151,121,223,0.06) 0%, transparent 50%)"
            : "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(221,100,134,0.1) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 60% 55%, rgba(151,121,223,0.1) 0%, transparent 50%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex items-center gap-4 justify-center"
        >
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: r(0.3),
            }}
          >
            {t("arte.hero.label")} — {t("arte.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: isDark ? "#fff" : DARK_BG,
            lineHeight: 0.95,
          }}
        >
          ARTE
          <br />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.7rem, 2vw, 1rem)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: r(0.35),
            }}
          >
            en scène
          </span>
        </motion.h1>
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
        <h2
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
          ARTE en scène
        </h2>
      </FadeIn>
      <FadeIn delay={0.05}>
        <p
          className="text-center mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#dd6486",
          }}
        >
          {t("arte.intro.tag")}
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
          {t("arte.intro.subtitle")}
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div
          className="w-12 h-[1px] mx-auto my-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(221,100,134,0.3), rgba(151,121,223,0.3))",
          }}
        />
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
          {t("arte.intro.desc")}
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
            <SectionLabel>{t("arte.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.context.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   PROPOSITION BLOCK (reusable)
   =================================== */
function PropositionBlock({
  titleKey,
  textKey,
  dirLabelKey,
  dirTextKey,
  choicesLabelKey,
  choicesTextKey,
  posters,
  mockup,
  palette,
  glowColors,
  accentHex,
}: {
  titleKey: TranslationKey;
  textKey: TranslationKey;
  dirLabelKey: TranslationKey;
  dirTextKey: TranslationKey;
  choicesLabelKey: TranslationKey;
  choicesTextKey: TranslationKey;
  posters: string[];
  mockup: string;
  palette: { hex: string; name: string }[];
  glowColors: string[];
  accentHex: string;
}) {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="relative px-6 md:px-16 py-20 overflow-visible">
      {/* Background glow for this proposition */}
      <ColorGlow colors={glowColors} count={8} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Proposition title */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-4">
            <div
              className="w-3 h-3 rounded-[3px]"
              style={{ background: accentHex }}
            />
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: isDark ? "#fff" : DARK_BG,
              }}
            >
              {t(titleKey)}
            </h3>
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.05}>
          <p
            className="max-w-2xl mb-12"
            style={body}
          >
            {t(textKey)}
          </p>
        </FadeIn>

        {/* Triptych of posters */}
        <FadeIn delay={0.1} className="mb-14">
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {posters.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${r(0.06)}`,
                  boxShadow: isDark
                    ? `0 12px 40px rgba(0,0,0,0.4)`
                    : `0 12px 40px rgba(0,0,0,0.08)`,
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src={src}
                  alt={`${t(titleKey)} poster ${i + 1}`}
                  className="w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Direction visuelle */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn delay={0.05}>
            <SectionLabel>{t(dirLabelKey)}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t(dirTextKey)}</p>
          </FadeIn>
        </div>

        {/* Choix graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-12">
          <FadeIn delay={0.05}>
            <SectionLabel>{t(choicesLabelKey)}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t(choicesTextKey)}</p>
          </FadeIn>
        </div>

        {/* Palette */}
        <FadeIn delay={0.1} className="mb-14">
          <SectionLabel>{t("arte.palette.label")}</SectionLabel>
          <div className="flex gap-3 md:gap-4 mt-5">
            {palette.map((color, i) => (
              <motion.div
                key={color.hex}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <div
                  className="w-14 h-14 md:w-18 md:h-18 rounded-[12px] md:rounded-[16px] transition-transform duration-300 hover:scale-110"
                  style={{
                    background: color.hex,
                    boxShadow: isDark
                      ? `0 8px 24px ${color.hex}33`
                      : `0 6px 20px ${color.hex}22`,
                    border:
                      color.hex === "#ffffff"
                        ? `1px solid ${r(0.12)}`
                        : "none",
                  }}
                />
                <span
                  className="hidden md:block"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    color: r(0.25),
                  }}
                >
                  {color.hex}
                </span>
                <span
                  className="hidden md:block"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.5rem",
                    color: r(0.18),
                  }}
                >
                  {color.name}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Mockup */}
        <FadeIn delay={0.12}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${r(0.04)}` }}
          >
            <img
              src={mockup}
              alt={`${t(titleKey)} mockup`}
              className="w-full object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   ENJEU
   =================================== */
function EnjeuSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("arte.enjeu.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.enjeu.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   FINAL
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-16 py-24 overflow-visible">
      {/* Final dual glow */}
      <ColorGlow colors={[...P1_GLOW_RGB, ...P2_GLOW_RGB]} count={10} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("arte.final.label")}</SectionLabel>
        </FadeIn>

        {/* Dual color squares */}
        <FadeIn>
          <div className="flex gap-4 mb-10">
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-[16px] md:rounded-[20px]"
              style={{
                background: "linear-gradient(140deg, #e3b2c7 0%, #dd6486 100%)",
                boxShadow: isDark
                  ? "0 20px 50px rgba(221,100,134,0.2)"
                  : "0 20px 50px rgba(221,100,134,0.12)",
              }}
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-[16px] md:rounded-[20px]"
              style={{
                background: "linear-gradient(140deg, #9cc4e7 0%, #9779df 100%)",
                boxShadow: isDark
                  ? "0 20px 50px rgba(151,121,223,0.2)"
                  : "0 20px 50px rgba(151,121,223,0.12)",
              }}
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
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
            {t("arte.final.text")}
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
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            {t("arte.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectArte() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          background: isDark ? "rgba(12,10,16,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {t("arte.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />

      {/* ── Proposition 1 — Pink/Magenta ── */}
      <PropositionBlock
        titleKey="arte.prop1.label"
        textKey="arte.prop1.text"
        dirLabelKey="arte.prop1.direction.label"
        dirTextKey="arte.prop1.direction.text"
        choicesLabelKey="arte.prop1.choices.label"
        choicesTextKey="arte.prop1.choices.text"
        posters={[imgPoster1A, imgPoster1B, imgPoster1C]}
        mockup={imgMockup1}
        palette={P1_COLORS}
        glowColors={P1_GLOW_RGB}
        accentHex="#dd6486"
      />

      {/* ── Proposition 2 — Purple/Blue ── */}
      <PropositionBlock
        titleKey="arte.prop2.label"
        textKey="arte.prop2.text"
        dirLabelKey="arte.prop2.direction.label"
        dirTextKey="arte.prop2.direction.text"
        choicesLabelKey="arte.prop2.choices.label"
        choicesTextKey="arte.prop2.choices.text"
        posters={[imgPoster2A, imgPoster2B, imgPoster2C]}
        mockup={imgMockup2}
        palette={P2_COLORS}
        glowColors={P2_GLOW_RGB}
        accentHex="#9779df"
      />

      <EnjeuSection />
      <FinalSection />
    </div>
  );
}
