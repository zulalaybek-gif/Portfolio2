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
import logoAsset05 from "../../assets/snatsh/assets/05.logo-asset.png";
import logoAsset06 from "../../assets/snatsh/assets/06.logo-asset.png";
import logoAsset07 from "../../assets/snatsh/assets/07.logo-asset.png";
import logoAsset08 from "../../assets/snatsh/assets/08.logo-asset.png";

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
        className="absolute inset-x-0 top-8 -bottom-16 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 5%, #000 72%, rgba(0,0,0,0.68) 88%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 5%, #000 72%, rgba(0,0,0,0.68) 88%, transparent 100%)",
        }}
      >
        <FloatingSquares
          count={20}
          className={isDark ? "" : "opacity-95 mix-blend-multiply contrast-125 saturate-125"}
        />
      </div>

      <div
        className="absolute inset-x-0 -top-16 -bottom-40 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`
            : `radial-gradient(ellipse 62% 52% at 50% 44%, rgba(${ACCENT_RGB},0.18) 0%, rgba(${SECONDARY_RGB},0.1) 48%, transparent 76%)`,
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
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div
            className="absolute left-[36%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-3xl md:block"
            style={{ background: `rgba(${ACCENT_RGB},0.08)` }}
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-center">
            <FadeIn className="max-w-md md:pb-10">
              <p
                className="mb-6"
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  color: ACCENT,
                }}
              >
                LOGO
              </p>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  lineHeight: 1.05,
                  fontWeight: 700,
                  color: isDark ? "#f4f4f2" : "#0a0c08",
                }}
              >
                Une identité simple, claire et mémorable.
              </h2>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.9,
                  color: r(0.34),
                }}
              >
                Le logotype et son monogramme expriment le mouvement, la précision et la clarté qui guident chaque projet.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {[ACCENT, "#f4f4f2", "#0a0c08", SECONDARY].map((color) => (
                  <span
                    key={color}
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: color,
                      boxShadow: "0 0 0 1px rgba(244,244,242,0.16)",
                    }}
                  />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative min-h-[500px] md:min-h-[650px]">
                <div
                  className="absolute bottom-[11%] left-[6%] h-20 w-[58%] rounded-full blur-2xl"
                  style={{ background: "rgba(0,0,0,0.22)" }}
                />
                <motion.img
                  src={logoAsset08}
                  alt="SNATSH sage monogram block"
                  className="absolute left-[-2%] top-[18%] z-20 w-[60%] min-w-[250px]"
                  animate={{ y: [0, -10, 0], rotate: [-1.5, -2.6, -1.5] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 36px 58px rgba(0,0,0,0.38))" }}
                />
                <motion.img
                  src={logoAsset05}
                  alt="SNATSH monogram block"
                  className="absolute right-[10%] top-[2%] z-10 w-[27%] min-w-[116px]"
                  animate={{ y: [0, -14, 0], rotate: [1.2, 2.4, 1.2] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                  style={{ filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.28))" }}
                />
                <motion.img
                  src={logoAsset06}
                  alt="SNATSH light logo block"
                  className="absolute right-[0%] top-[36%] z-30 w-[52%] min-w-[230px]"
                  animate={{ y: [0, -8, 0], rotate: [0.3, -0.5, 0.3] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  style={{ filter: "drop-shadow(0 28px 46px rgba(0,0,0,0.3))" }}
                />
                <motion.img
                  src={logoAsset07}
                  alt="SNATSH dark logo block"
                  className="absolute bottom-[5%] right-[13%] z-20 w-[47%] min-w-[210px]"
                  animate={{ y: [0, 10, 0], rotate: [-0.6, 0.2, -0.6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  style={{ filter: "drop-shadow(0 30px 54px rgba(0,0,0,0.38))" }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   7. PALETTE
   =================================== */
function PaletteSection() {
  const { isDark, r } = useTheme();
  const timecodes = ["00:00", "00:01", "00:02", "00:03", "00:05"];
  const panelBg = isDark
    ? "radial-gradient(circle at 18% 18%, rgba(193,211,221,0.1), transparent 28%), linear-gradient(145deg, #060b12 0%, #0b1824 55%, #05070a 100%)"
    : "linear-gradient(145deg, rgba(244,244,242,0.92) 0%, rgba(255,255,255,0.82) 100%)";
  const panelBorder = isDark ? "rgba(244,244,242,0.08)" : "rgba(10,12,8,0.08)";
  const textStrong = isDark ? "#f4f4f2" : "#0a0c08";
  const textSoft = isDark ? "rgba(244,244,242,0.68)" : "rgba(10,12,8,0.62)";
  const rail = isDark ? "rgba(244,244,242,0.24)" : "rgba(10,12,8,0.22)";
  const cardBorder = isDark ? "rgba(244,244,242,0.16)" : "rgba(10,12,8,0.12)";

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[28px] px-6 py-10 md:p-12 lg:p-14"
          style={{
            background: panelBg,
            border: `1px solid ${panelBorder}`,
            boxShadow: isDark ? "0 34px 100px rgba(0,0,0,0.28)" : "0 26px 70px rgba(10,12,8,0.08)",
          }}
        >
          <div
            className="absolute left-10 top-24 h-px w-44"
            style={{
              background: `linear-gradient(90deg, transparent, ${isDark ? "rgba(193,211,221,0.75)" : "rgba(192,193,164,0.68)"}, transparent)`,
              boxShadow: isDark ? "0 0 22px rgba(193,211,221,0.55)" : "0 0 18px rgba(192,193,164,0.35)",
            }}
          />
          <div
            className="absolute bottom-8 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: isDark ? "rgba(193,211,221,0.08)" : "rgba(192,193,164,0.13)" }}
          />

          <div className="relative z-10">
            <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-start">
              <FadeIn>
                <p
                  className="mb-5"
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.22em",
                    color: isDark ? "rgba(244,244,242,0.72)" : "rgba(10,12,8,0.58)",
                  }}
                >
                  PALETTE CHROMATIQUE
                </p>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2.6rem, 6vw, 5.4rem)",
                    lineHeight: 0.96,
                    fontWeight: 700,
                    color: textStrong,
                  }}
                >
                  Timeline de montage
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p
                  className="md:pt-6"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "1rem",
                    lineHeight: 1.9,
                    color: textSoft,
                  }}
                >
                  Une palette pensée comme une séquence. Cinq tonalités essentielles, en équilibre, pour donner du rythme, de la clarté et de l'impact à chaque projet.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.16}>
              <div className="mt-16 overflow-x-auto pb-3">
                <div className="min-w-[860px]">
                  <div className="grid grid-cols-5 px-12">
                    {timecodes.map((time) => (
                      <div key={time} className="relative text-center">
                        <span
                          style={{
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: "0.78rem",
                            color: textSoft,
                          }}
                        >
                          {time}
                        </span>
                        <span
                          className="absolute left-1/2 top-7 h-2 w-2 -translate-x-1/2 rounded-full"
                          style={{ background: isDark ? "rgba(244,244,242,0.55)" : "rgba(10,12,8,0.36)" }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-6">
                    <div className="absolute left-12 right-12 top-0 h-px" style={{ background: rail }} />
                    <div
                      className="relative rounded-[18px] px-10 py-5"
                      style={{
                        background: isDark ? "rgba(244,244,242,0.045)" : "rgba(255,255,255,0.54)",
                        border: `1px solid ${panelBorder}`,
                        boxShadow: isDark ? "inset 0 0 40px rgba(193,211,221,0.05)" : "inset 0 0 34px rgba(10,12,8,0.035)",
                      }}
                    >
                      <div className="absolute left-4 top-8 flex flex-col gap-2">
                        {[0, 1, 2, 3, 4, 5].map((dot) => (
                          <span key={dot} className="h-2 w-3 rounded-sm" style={{ background: r(0.16) }} />
                        ))}
                      </div>
                      <div className="absolute right-4 top-8 flex flex-col gap-2">
                        {[0, 1, 2, 3, 4, 5].map((dot) => (
                          <span key={dot} className="h-2 w-3 rounded-sm" style={{ background: r(0.16) }} />
                        ))}
                      </div>

                      <div className="grid grid-cols-5 gap-3">
                        {PALETTE.map((color, i) => (
                          <div key={color.hex} className="relative">
                            <div
                              className="aspect-[1.45] rounded-xl"
                              style={{
                                background: color.hex,
                                border: `1px solid ${color.hex === "#000000" ? "rgba(244,244,242,0.22)" : cardBorder}`,
                                boxShadow: isDark
                                  ? `0 14px 36px ${color.hex === "#000000" ? "rgba(0,0,0,0.7)" : `${color.hex}2b`}`
                                  : "0 12px 28px rgba(10,12,8,0.1)",
                              }}
                            >
                              <span
                                className="absolute left-3 top-3"
                                style={{
                                  fontFamily: "'Roboto Mono', monospace",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: color.hex === "#000000" ? "#f4f4f2" : "rgba(10,12,8,0.54)",
                                  textShadow: color.hex === "#ffffff" || color.hex === "#f4f4f2" ? "0 1px 8px rgba(0,0,0,0.16)" : "none",
                                }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            {i < PALETTE.length - 1 && (
                              <span
                                className="absolute -right-3 top-1/2 -translate-y-1/2"
                                style={{
                                  fontFamily: "'Roboto Mono', monospace",
                                  fontSize: "1rem",
                                  color: isDark ? "rgba(244,244,242,0.52)" : "rgba(10,12,8,0.34)",
                                }}
                              >
                                »
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3 px-10 pt-4">
                    {PALETTE.map((color) => (
                      <div key={color.hex} className="text-center">
                        <p
                          style={{
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            color: textStrong,
                          }}
                        >
                          {color.hex.toUpperCase()}
                        </p>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "0.72rem",
                            color: textSoft,
                          }}
                        >
                          {color.name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-8 h-10">
                    <div className="absolute left-10 right-10 top-1/2 h-px" style={{ background: rail }} />
                    <div className="absolute left-10 right-10 top-1/2 flex -translate-y-1/2 justify-between">
                      {Array.from({ length: 34 }).map((_, i) => (
                        <span key={i} className="h-3 w-px" style={{ background: i % 5 === 0 ? r(0.24) : r(0.12) }} />
                      ))}
                    </div>
                    <div
                      className="absolute left-1/2 top-1/2 flex h-8 -translate-x-1/2 -translate-y-1/2 items-center gap-1"
                      style={{ filter: isDark ? "drop-shadow(0 0 12px rgba(193,211,221,0.55))" : "drop-shadow(0 0 10px rgba(192,193,164,0.42))" }}
                    >
                      <span className="h-7 w-1.5 rounded-full" style={{ background: isDark ? "#c1d3dd" : ACCENT }} />
                      <span className="h-7 w-1.5 rounded-full" style={{ background: isDark ? "#f4f4f2" : "#0a0c08" }} />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {[
                {
                  label: "UTILISATION",
                  text: "À utiliser avec intention et parcimonie pour structurer vos compositions, créer des contrastes maîtrisés et guider le regard. Chaque couleur a son rôle, chaque combinaison renforce le message.",
                },
                {
                  label: "SIGNIFICATION",
                  text: "Cette palette incarne une approche élégante, contemporaine et humaine. Des tons doux et lumineux inspirent confiance, tandis qu'un noir profond ancre l'émotion et sublime chaque image.",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={0.18 + i * 0.06}>
                  <div
                    className="grid gap-5 md:grid-cols-[72px_1fr]"
                    style={{ borderLeft: i === 1 ? `1px solid ${panelBorder}` : "none", paddingLeft: i === 1 ? "2rem" : 0 }}
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        border: `1px solid ${panelBorder}`,
                        background: isDark ? "rgba(244,244,242,0.035)" : "rgba(255,255,255,0.48)",
                      }}
                    >
                      <span
                        className="h-8 w-8 rounded-full"
                        style={{
                          border: `1px solid ${isDark ? "rgba(244,244,242,0.62)" : "rgba(10,12,8,0.42)"}`,
                          boxShadow: i === 0
                            ? `12px 0 0 -6px ${isDark ? "rgba(244,244,242,0.42)" : "rgba(10,12,8,0.24)"}, -12px 0 0 -6px ${isDark ? "rgba(244,244,242,0.42)" : "rgba(10,12,8,0.24)"}`
                            : `0 0 0 7px transparent, 0 0 0 1px ${isDark ? "rgba(244,244,242,0.18)" : "rgba(10,12,8,0.14)"}`,
                        }}
                      />
                    </div>
                    <div>
                      <p
                        className="mb-3"
                        style={{
                          fontFamily: "'Roboto Mono', monospace",
                          fontSize: "0.78rem",
                          letterSpacing: "0.2em",
                          color: textStrong,
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: "0.95rem",
                          lineHeight: 1.85,
                          color: textSoft,
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
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
            className="relative"
            style={{
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
          <img src={imgMockup} alt="SNATSH brochure bi-fold mockup" className="w-full object-cover" />
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

        {/* Closing logo */}
        <FadeIn>
          <div className="flex justify-center mb-10">
            <img src={isDark ? logoIconWhite : logoIconBlack} alt="SNATSH" className="w-[96px] md:w-[128px]" />
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
