import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
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
import heroLight from "../../assets/snatsh/assets/14.hero-light.png";
import heroDark from "../../assets/snatsh/assets/15.hero-dark.png";
import footerVisual09 from "../../assets/snatsh/assets/09.footer-img.png";
import footerVisual10 from "../../assets/snatsh/assets/10.footer-img.jpg";
import footerVisual11 from "../../assets/snatsh/assets/11.footer-img.jpg";
import footerVisual12 from "../../assets/snatsh/assets/12.footer-img.jpg";
import footerVisual13 from "../../assets/snatsh/assets/13.footer-img.jpg";

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
   1. HERO
   =================================== */
function HeroSection() {
  const { isDark } = useTheme();
  const heroBg = isDark
    ? "radial-gradient(ellipse at 78% 20%, rgba(24,38,54,0.72), transparent 44%), radial-gradient(ellipse at 64% 54%, rgba(193,211,221,0.12), transparent 42%), radial-gradient(ellipse at 22% 30%, rgba(192,193,164,0.08), transparent 34%), linear-gradient(145deg, #08101a 0%, #0d1724 48%, #070c13 100%)"
    : "radial-gradient(ellipse at 78% 20%, rgba(193,211,221,0.34), transparent 44%), radial-gradient(ellipse at 64% 54%, rgba(244,244,242,0.88), transparent 42%), radial-gradient(ellipse at 24% 28%, rgba(192,193,164,0.18), transparent 34%), linear-gradient(145deg, #f4f4f2 0%, #ffffff 52%, #edf3f5 100%)";
  const textStrong = isDark ? "#ffffff" : "#000000";
  const textSoft = isDark ? "rgba(244,244,242,0.68)" : "rgba(0,0,0,0.58)";
  const heroVisual = isDark ? heroDark : heroLight;

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-16 md:px-16 md:pb-20 md:pt-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: heroBg }}
      />
      <div
        className="absolute right-[4%] top-[18%] h-px w-[min(760px,56vw)] opacity-45"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.35), rgba(${SECONDARY_RGB},0.28), transparent)`,
        }}
      />
      <div
        className="absolute right-[2%] top-[48%] h-px w-[min(900px,62vw)] opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.52), rgba(${SECONDARY_RGB},0.32), transparent)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, transparent, rgba(5,7,10,0.92))"
            : "linear-gradient(to bottom, transparent, rgba(244,244,242,0.86))",
        }}
      />
      {[
        { className: "left-[11%] top-[38%] h-10 w-10 rounded-2xl", color: SECONDARY_RGB, delay: 0 },
        { className: "left-[20%] top-[62%] h-7 w-7 rounded-xl", color: ACCENT_RGB, delay: 0.65 },
        { className: "left-[46%] top-[22%] h-9 w-9 rounded-2xl", color: SECONDARY_RGB, delay: 0.25 },
        { className: "left-[58%] bottom-[16%] h-11 w-11 rounded-2xl", color: ACCENT_RGB, delay: 0.85 },
        { className: "right-[14%] top-[30%] h-8 w-8 rounded-xl", color: ACCENT_RGB, delay: 0.45 },
        { className: "right-[8%] bottom-[30%] h-10 w-10 rounded-2xl", color: SECONDARY_RGB, delay: 1.05 },
      ].map((square) => (
        <motion.div
          key={square.className}
          className={`pointer-events-none absolute z-[2] ${square.className}`}
          animate={{ y: [0, -12, 0], x: [0, 7, 0], rotate: [-7, 5, -7] }}
          transition={{ duration: 7.8, delay: square.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `rgba(${square.color},${isDark ? 0.14 : 0.26})`,
            boxShadow: isDark ? "0 18px 46px rgba(0,0,0,0.2)" : "0 18px 42px rgba(0,0,0,0.055)",
            filter: "blur(0.15px)",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-4 pt-8 lg:grid-cols-[0.38fr_0.62fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[560px]"
        >
          <div className="mb-8 flex items-center gap-4">
            <span
              className="h-px w-9"
              style={{ background: ACCENT }}
            />
            <p
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                color: isDark ? "rgba(244,244,242,0.58)" : "rgba(0,0,0,0.48)",
              }}
            >
              PRODUCTION AUDIOVISUELLE — 2026
            </p>
          </div>

          <img
            src={isDark ? logoIconTxtWhite : logoIconTxtBlack}
            alt="SNATSH"
            className="mb-6 w-[230px] md:w-[320px]"
          />

          <h1
            className="mb-7 max-w-[34rem]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.85rem, 2.65vw, 2.8rem)",
              lineHeight: 1.14,
              fontWeight: 520,
              letterSpacing: "0",
              color: textStrong,
            }}
          >
            <span className="block whitespace-nowrap">Donner vie aux idées.</span>
            <span className="block whitespace-nowrap">Créer l'émotion.</span>
          </h1>

          <p
            className="max-w-md"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: textSoft,
            }}
          >
            De la première étincelle à l'image finale, nous concevons des contenus audiovisuels clairs, puissants et mémorables.
          </p>

          <div className="mt-8 grid max-w-[520px] grid-cols-1 gap-5 sm:grid-cols-2 sm:items-start">
            {[
              ["Vision créative", "Raconter juste.", ACCENT_RGB],
              ["Exécution maîtrisée", "Livrer fort.", SECONDARY_RGB],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3"
                style={{
                  color: textStrong,
                }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{
                    background: `rgba(${color},${isDark ? 0.28 : 0.5})`,
                    border: `1px solid ${isDark ? "rgba(244,244,242,0.08)" : "rgba(0,0,0,0.05)"}`,
                    boxShadow: isDark ? "0 16px 38px rgba(0,0,0,0.16)" : "0 16px 36px rgba(0,0,0,0.07)",
                  }}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: isDark ? "rgba(244,244,242,0.72)" : "rgba(255,255,255,0.86)" }}
                  />
                </span>
                <span>
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.13em",
                    color: isDark ? ACCENT : "rgba(0,0,0,0.48)",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: textStrong,
                  }}
                >
                  {value}
                </p>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none relative min-h-[420px] overflow-visible md:min-h-[560px] lg:min-h-[680px]"
          initial={{ opacity: 0, x: 38 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
        >
          <div
            className="absolute left-[54%] top-[27%] h-20 w-[128%] -translate-x-1/2 -rotate-[2deg] rounded-full blur-[2px]"
            style={{
              background: isDark
                ? `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.12), rgba(244,244,242,0.14), transparent)`
                : `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.2), rgba(255,255,255,0.72), transparent)`,
              opacity: isDark ? 0.52 : 0.68,
            }}
          />
          <div
            className="absolute left-[55%] top-[46%] h-24 w-[142%] -translate-x-1/2 rotate-[1deg] rounded-full blur-[3px]"
            style={{
              background: isDark
                ? `linear-gradient(90deg, transparent, rgba(${SECONDARY_RGB},0.16), rgba(244,244,242,0.1), transparent)`
                : `linear-gradient(90deg, transparent, rgba(${SECONDARY_RGB},0.32), rgba(255,255,255,0.78), transparent)`,
              opacity: isDark ? 0.5 : 0.74,
            }}
          />
          <div
            className="absolute left-[60%] top-[62%] h-16 w-[116%] -translate-x-1/2 rotate-[-1deg] rounded-full blur-[2px]"
            style={{
              background: isDark
                ? `linear-gradient(90deg, transparent, rgba(${SECONDARY_RGB},0.13), rgba(${ACCENT_RGB},0.08), transparent)`
                : `linear-gradient(90deg, transparent, rgba(${SECONDARY_RGB},0.26), rgba(${ACCENT_RGB},0.16), transparent)`,
              opacity: isDark ? 0.42 : 0.62,
            }}
          />
          <motion.img
            src={heroVisual}
            alt=""
            aria-hidden="true"
            className="absolute left-[54%] top-1/2 h-[1040px] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain md:h-[1350px] lg:h-[1650px] xl:h-[1800px]"
          />
          <motion.div
            className="absolute left-[10%] top-[12%] h-10 w-10 rounded-xl"
            animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `rgba(${SECONDARY_RGB},${isDark ? 0.2 : 0.38})`,
              boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.24)" : "0 18px 40px rgba(0,0,0,0.08)",
            }}
          />
          <motion.div
            className="absolute right-[8%] top-[18%] h-9 w-9 rounded-xl"
            animate={{ y: [0, -9, 0], x: [0, -5, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{
              background: `rgba(${ACCENT_RGB},${isDark ? 0.18 : 0.36})`,
              boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.22)" : "0 18px 38px rgba(0,0,0,0.08)",
            }}
          />
          <motion.div
            className="absolute bottom-[8%] left-[28%] h-11 w-11 rounded-xl"
            animate={{ y: [0, 12, 0], x: [0, -5, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `rgba(${ACCENT_RGB},${isDark ? 0.22 : 0.46})`,
              boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.22)" : "0 18px 38px rgba(0,0,0,0.08)",
            }}
          />
          <motion.div
            className="absolute bottom-[24%] right-[20%] h-8 w-8 rounded-lg"
            animate={{ y: [0, 10, 0], x: [0, 4, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{
              background: `rgba(${SECONDARY_RGB},${isDark ? 0.16 : 0.32})`,
              boxShadow: isDark ? "0 16px 34px rgba(0,0,0,0.2)" : "0 16px 34px rgba(0,0,0,0.07)",
            }}
          />
          <motion.div
            className="absolute left-[43%] top-[43%] h-6 w-6 rounded-lg"
            animate={{ y: [0, -12, 0], x: [0, 8, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{
              background: `rgba(${SECONDARY_RGB},${isDark ? 0.13 : 0.24})`,
              boxShadow: isDark ? "0 14px 30px rgba(0,0,0,0.18)" : "0 14px 30px rgba(0,0,0,0.06)",
            }}
          />
          <motion.div
            className="absolute bottom-[35%] right-[7%] h-7 w-7 rounded-lg"
            animate={{ y: [0, 11, 0], x: [0, -7, 0], rotate: [0, -7, 0] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              background: `rgba(${ACCENT_RGB},${isDark ? 0.15 : 0.3})`,
              boxShadow: isDark ? "0 14px 30px rgba(0,0,0,0.18)" : "0 14px 30px rgba(0,0,0,0.06)",
            }}
          />
          <motion.div
            className="absolute bottom-[7%] left-[62%] h-8 w-8 rounded-xl"
            animate={{ y: [0, 13, 0], x: [0, 6, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{
              background: `rgba(${ACCENT_RGB},${isDark ? 0.17 : 0.34})`,
              boxShadow: isDark ? "0 16px 34px rgba(0,0,0,0.2)" : "0 16px 34px rgba(0,0,0,0.07)",
            }}
          />
        </motion.div>
      </div>
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
    <section className="px-6 md:px-16 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <div
            className="absolute left-[36%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-3xl md:block"
            style={{ background: `rgba(${ACCENT_RGB},0.08)` }}
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-center lg:gap-10">
            <FadeIn className="max-w-lg md:pb-0">
              <p
                className="mb-5"
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
                className="mb-5 max-w-[31rem]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(1.78rem, 2.75vw, 2.55rem)",
                  lineHeight: 1.12,
                  fontWeight: 680,
                  color: isDark ? "#f4f4f2" : "#0a0c08",
                }}
              >
                Une identité simple, claire et mémorable.
              </h2>
              <p
                className="mb-7 max-w-[29rem]"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "0.94rem",
                  lineHeight: 1.78,
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
              <div className="relative min-h-[430px] md:min-h-[600px]">
                <div
                  className="absolute bottom-[10%] left-[13%] h-16 w-[50%] rounded-full blur-2xl"
                  style={{ background: "rgba(0,0,0,0.22)" }}
                />
                <motion.img
                  src={logoAsset08}
                  alt="SNATSH sage monogram block"
                  className="absolute left-[8%] top-[26%] z-20 w-[53%] min-w-[232px]"
                  animate={{ y: [0, -10, 0], rotate: [-1.5, -2.6, -1.5] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 36px 58px rgba(0,0,0,0.38))" }}
                />
                <motion.img
                  src={logoAsset05}
                  alt="SNATSH monogram block"
                  className="absolute right-[13%] top-[17%] z-10 w-[22%] min-w-[104px]"
                  animate={{ y: [0, -14, 0], rotate: [1.2, 2.4, 1.2] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                  style={{ filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.28))" }}
                />
                <motion.img
                  src={logoAsset06}
                  alt="SNATSH light logo block"
                  className="absolute right-[5%] top-[45%] z-30 w-[46%] min-w-[214px]"
                  animate={{ y: [0, -8, 0], rotate: [0.3, -0.5, 0.3] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  style={{ filter: "drop-shadow(0 28px 46px rgba(0,0,0,0.3))" }}
                />
                <motion.img
                  src={logoAsset07}
                  alt="SNATSH dark logo block"
                  className="absolute bottom-[5%] right-[15%] z-20 w-[40%] min-w-[190px]"
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
function PaletteSection({ onActiveColorChange }: { onActiveColorChange?: (color: string) => void }) {
  const { isDark, r } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [playhead, setPlayhead] = useState(48);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const timecodes = ["00:00", "00:01", "00:02", "00:03", "00:05"];
  const panelBorder = isDark ? "rgba(244,244,242,0.08)" : "rgba(10,12,8,0.08)";
  const textStrong = isDark ? "#f4f4f2" : "#0a0c08";
  const textSoft = isDark ? "rgba(244,244,242,0.68)" : "rgba(10,12,8,0.62)";
  const rail = isDark ? "rgba(244,244,242,0.28)" : "rgba(10,12,8,0.34)";
  const railBase = isDark ? "rgba(244,244,242,0.055)" : "rgba(10,12,8,0.075)";
  const cardBorder = isDark ? "rgba(244,244,242,0.16)" : "rgba(10,12,8,0.12)";
  const activeIndex = Math.min(4, Math.max(0, Math.round((playhead / 100) * 4)));
  const activeColor = PALETTE[activeIndex].hex;
  const activeAura = activeColor === "#000000"
    ? isDark
      ? "rgba(244,244,242,0.1)"
      : "rgba(0,0,0,0.18)"
    : activeColor === "#FFFFFF" || activeColor === "#F4F4F2"
      ? isDark
        ? "rgba(244,244,242,0.32)"
        : "rgba(192,193,164,0.26)"
      : `${activeColor}${isDark ? "5c" : "70"}`;
  const activeGlow = activeColor === "#000000"
    ? isDark ? "rgba(244,244,242,0.28)" : "rgba(0,0,0,0.24)"
    : `${activeColor}${isDark ? "8a" : "99"}`;

  useEffect(() => {
    onActiveColorChange?.(activeColor);
  }, [activeColor, onActiveColorChange]);

  const getTimelinePercent = (clientX: number) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
  };

  const updatePlayhead = (clientX: number) => {
    setPlayhead(getTimelinePercent(clientX));
  };

  const handleScrubStart = (event: PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePlayhead(event.clientX);
  };

  const handleScrubMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return;
    updatePlayhead(event.clientX);
  };

  return (
    <section className="px-6 md:px-16 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative isolate">
          <motion.div
            className="pointer-events-none absolute inset-x-[-12rem] top-[35%] z-0 h-[34rem] rounded-full blur-3xl"
            animate={{
              background: `radial-gradient(ellipse at 50% 50%, ${activeAura} 0%, transparent 70%)`,
              opacity: isDark ? 0.72 : 0.64,
              scale: isScrubbing ? 1.08 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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
                        {PALETTE.map((color, i) => {
                          const isActive = activeIndex === i;
                          const distance = Math.abs(activeIndex - i);
                          const isNear = distance === 1;

                          return (
                          <div key={color.hex} className="relative">
                            <motion.div
                              className="relative overflow-hidden aspect-[1.45] rounded-xl"
                              animate={{
                                y: isActive ? -12 : isNear ? -4 : 0,
                                scale: isActive ? 1.06 : isNear ? 1.015 : 0.98,
                                opacity: isActive ? 1 : isNear ? 0.82 : 0.62,
                              }}
                              transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                              style={{
                                background: color.hex,
                                border: `1px solid ${color.hex === "#000000" ? "rgba(244,244,242,0.22)" : cardBorder}`,
                                boxShadow: isDark
                                  ? `0 ${isActive ? 28 : isNear ? 18 : 10}px ${isActive ? 70 : isNear ? 44 : 24}px ${color.hex === "#000000" ? "rgba(0,0,0,0.76)" : `${color.hex}${isActive ? "70" : isNear ? "3d" : "20"}`}`
                                  : `0 ${isActive ? 24 : isNear ? 16 : 9}px ${isActive ? 54 : isNear ? 34 : 20}px rgba(10,12,8,${isActive ? 0.2 : isNear ? 0.12 : 0.06})`,
                              }}
                            >
                              <motion.span
                                className="pointer-events-none absolute inset-y-0 w-14 -skew-x-12"
                                animate={{ left: isActive || isNear ? ["-35%", "115%"] : "-35%" }}
                                transition={{
                                  duration: isActive ? 1.15 : 1.55,
                                  repeat: isActive || isNear ? Infinity : 0,
                                  repeatDelay: isActive ? 0.65 : 1.4,
                                  ease: "easeInOut",
                                }}
                                style={{
                                  background: color.hex === "#000000"
                                    ? "linear-gradient(90deg, transparent, rgba(244,244,242,0.18), transparent)"
                                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent)",
                                }}
                              />
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
                            </motion.div>
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
                          );
                        })}
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

                  <div
                    ref={timelineRef}
                    className="group relative mt-8 h-20 cursor-ew-resize select-none touch-none"
                    role="slider"
                    tabIndex={0}
                    aria-label="Curseur de palette"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(playhead)}
                    onPointerDown={handleScrubStart}
                    onPointerMove={handleScrubMove}
                    onPointerUp={() => setIsScrubbing(false)}
                    onPointerCancel={() => setIsScrubbing(false)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowLeft") setPlayhead((value) => Math.max(0, value - 5));
                      if (event.key === "ArrowRight") setPlayhead((value) => Math.min(100, value + 5));
                    }}
                  >
                    <div
                      className="absolute left-10 right-10 top-1/2 h-3 -translate-y-1/2 rounded-full"
                      style={{
                        background: railBase,
                        boxShadow: isDark ? "inset 0 0 18px rgba(244,244,242,0.045)" : "inset 0 0 14px rgba(10,12,8,0.08)",
                      }}
                    />
                    <div className="absolute left-10 right-10 top-1/2 h-px" style={{ background: rail }} />
                    <motion.div
                      className="absolute left-10 top-1/2 h-1 -translate-y-1/2 rounded-full"
                      animate={{ width: `calc((100% - 5rem) * ${playhead / 100})` }}
                      style={{
                        background: `linear-gradient(90deg, ${ACCENT}, ${activeColor})`,
                        boxShadow: `0 0 26px ${activeGlow}`,
                      }}
                    />
                    <div className="absolute left-10 right-10 top-1/2 flex -translate-y-1/2 justify-between">
                      {Array.from({ length: 34 }).map((_, i) => (
                        <span key={i} className="h-3 w-px" style={{ background: i % 5 === 0 ? r(0.24) : r(0.12) }} />
                      ))}
                    </div>
                    <motion.div
                      className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                      animate={{
                        left: `calc(2.5rem + (100% - 5rem) * ${playhead / 100})`,
                        scale: isScrubbing ? 1.05 : 1,
                      }}
                      transition={{ duration: isScrubbing ? 0.08 : 0.28, ease: "easeOut" }}
                      style={{
                        background: isDark ? "rgba(244,244,242,0.08)" : "rgba(255,255,255,0.68)",
                        border: `1px solid ${isDark ? "rgba(244,244,242,0.18)" : "rgba(10,12,8,0.12)"}`,
                        boxShadow: `0 12px 30px ${activeGlow}`,
                      }}
                    >
                      <span className="h-5 w-1.5 rounded-full" style={{ background: activeColor === "#000000" && isDark ? "#f4f4f2" : activeColor }} />
                    </motion.div>
                    <div
                      className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        fontFamily: "'Roboto Mono', monospace",
                        fontSize: "0.62rem",
                        letterSpacing: "0.14em",
                        color: textSoft,
                      }}
                    >
                      <span>GLISSER POUR EXPLORER</span>
                      <motion.span
                        animate={{ x: [4, -4, 4] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ color: activeColor === "#000000" && !isDark ? "#0a0c08" : activeColor }}
                      >
                        ←
                      </motion.span>
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
  const { isDark } = useTheme();
  const sectionText = isDark ? "#f4f4f2" : "#000000";
  const sectionMuted = isDark ? "rgba(244,244,242,0.62)" : "rgba(0,0,0,0.58)";
  const alphabet = "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1fr] md:items-end">
          <FadeIn>
            <div>
              <SectionLabel>TYPOGRAPHIE</SectionLabel>
              <span className="mt-3 block h-px w-14" style={{ background: ACCENT }} />
              <h2
                className="mt-8 max-w-[28rem]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(2.15rem, 4.8vw, 4.35rem)",
                  lineHeight: 1.02,
                  fontWeight: 720,
                  letterSpacing: "0",
                  color: sectionText,
                }}
              >
                Clarté, contraste et équilibre visuel.
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="max-w-md md:ml-auto">
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: sectionMuted,
                }}
              >
                Deux typographies aux rôles bien définis pour une communication lisible, cohérente et impactante.
              </p>
              <div className="mt-7 flex items-center">
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.72), rgba(${SECONDARY_RGB},0.42))` }} />
                <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.14}>
          <div
            className="relative grid overflow-hidden rounded-[28px] md:grid-cols-2"
            style={{
              border: `1px solid ${isDark ? "rgba(244,244,242,0.08)" : "rgba(0,0,0,0.06)"}`,
              boxShadow: isDark ? "0 34px 90px rgba(0,0,0,0.3)" : "0 32px 88px rgba(10,12,8,0.08)",
            }}
          >
            <span
              className="absolute left-0 top-0 z-20 hidden h-full w-2 md:block"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, rgba(${ACCENT_RGB},0.28))` }}
            />
            <span
              className="absolute bottom-0 left-1/2 top-0 z-20 hidden w-px md:block"
              style={{ background: isDark ? "rgba(244,244,242,0.1)" : "rgba(0,0,0,0.08)" }}
            />

            <div
              className="relative min-h-[460px] overflow-hidden p-8 md:p-12 lg:p-14"
              style={{
                background: isDark
                  ? "linear-gradient(145deg, #f4f4f2 0%, #ffffff 55%, #e9ece5 100%)"
                  : "linear-gradient(145deg, #ffffff 0%, #f4f4f2 58%, #eceee7 100%)",
                color: "#000000",
              }}
            >
              <span
                className="pointer-events-none absolute -right-10 top-4 select-none"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "12rem",
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "rgba(0,0,0,0.035)",
                }}
              >
                Aa
              </span>
              <div className="relative z-10 flex h-full flex-col">
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    lineHeight: 1.05,
                    fontWeight: 760,
                    letterSpacing: "0",
                  }}
                >
                  Plus Jakarta Sans
                </h3>
                <span
                  className="mt-5 inline-flex w-fit rounded-full px-3 py-1"
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    color: "#ffffff",
                    background: ACCENT,
                  }}
                >
                  TITRES · HEADINGS
                </span>
                <div className="my-8 h-px w-full" style={{ background: "rgba(0,0,0,0.1)" }} />
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                    lineHeight: 1.5,
                    fontWeight: 560,
                    color: "rgba(0,0,0,0.78)",
                  }}
                >
                  {alphabet}
                </p>
                <p
                  className="mt-auto pt-10 max-w-md"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.9,
                    color: "rgba(0,0,0,0.56)",
                  }}
                >
                  Plus Jakarta Sans apporte structure, modernité et chaleur. Idéale pour les titres, elle affirme la hiérarchie visuelle avec précision.
                </p>
              </div>
            </div>

            <div
              className="relative min-h-[460px] overflow-hidden p-8 md:p-12 lg:p-14"
              style={{
                background: "radial-gradient(ellipse at 78% 14%, rgba(193,211,221,0.13), transparent 38%), linear-gradient(145deg, #111923 0%, #060a10 58%, #020407 100%)",
                color: "#f4f4f2",
              }}
            >
              <span
                className="pointer-events-none absolute -right-8 top-4 select-none"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "12rem",
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "rgba(244,244,242,0.035)",
                }}
              >
                Aa
              </span>
              <div className="relative z-10 flex h-full flex-col">
                <h3
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    lineHeight: 1.05,
                    fontWeight: 760,
                    letterSpacing: "0",
                  }}
                >
                  Roboto
                </h3>
                <span
                  className="mt-5 inline-flex w-fit rounded-full px-3 py-1"
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    color: "#061018",
                    background: SECONDARY,
                  }}
                >
                  CORPS DE TEXTE · BODY
                </span>
                <div className="my-8 h-px w-full" style={{ background: "rgba(244,244,242,0.14)" }} />
                <p
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
                    lineHeight: 1.55,
                    fontWeight: 500,
                    color: "rgba(244,244,242,0.78)",
                  }}
                >
                  {alphabet}
                </p>
                <p
                  className="mt-auto pt-10 max-w-md"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.9,
                    color: "rgba(244,244,242,0.58)",
                  }}
                >
                  Roboto assure une lecture confortable et neutre. Elle accompagne les contenus longs, les descriptions et les interfaces du quotidien.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
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
    <section className="px-6 md:px-16 py-16 overflow-hidden">
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
  const { isDark } = useTheme();
  const processItems = [
    { label: "IDÉE", image: footerVisual09, position: "center center" },
    { label: "TOURNAGE", image: footerVisual10, position: "48% center" },
    { label: "MONTAGE", image: footerVisual11, position: "center center" },
    { label: "ÉTALONNAGE", image: footerVisual12, position: "52% center" },
    { label: "LIVRAISON", image: footerVisual13, position: "center center" },
  ];
  const sectionBg = isDark
    ? "radial-gradient(ellipse at 72% 26%, rgba(193,211,221,0.1), transparent 38%), radial-gradient(ellipse at 26% 78%, rgba(192,193,164,0.08), transparent 40%)"
    : "radial-gradient(ellipse at 70% 22%, rgba(193,211,221,0.26), transparent 40%), radial-gradient(ellipse at 30% 76%, rgba(192,193,164,0.18), transparent 42%)";
  const textStrong = isDark ? "#f4f4f2" : "#000000";
  const textMuted = isDark ? "rgba(244,244,242,0.58)" : "rgba(0,0,0,0.52)";
  const tickColor = isDark ? "rgba(244,244,242,0.1)" : "rgba(0,0,0,0.075)";
  const majorTickColor = isDark ? "rgba(244,244,242,0.16)" : "rgba(0,0,0,0.12)";
  const tickBg = `repeating-linear-gradient(90deg, ${majorTickColor} 0 1px, transparent 1px 64px), repeating-linear-gradient(90deg, ${tickColor} 0 1px, transparent 1px 12px)`;
  const footerTrackDrift = { x: [0, -8, 0] };
  const footerTrackTransition = { duration: 22, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <section className="relative px-3 py-20 md:px-8 md:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: sectionBg }}
      />
      <div
        className="relative z-10 mx-auto max-w-[1500px] overflow-visible px-1 py-10 md:px-5 lg:min-h-[620px] lg:px-2 lg:py-14 xl:px-4"
      >
        {[
          { className: "left-[9%] top-[18%] h-9 w-9", color: SECONDARY_RGB, delay: 0 },
          { className: "left-[6.5%] top-[13%] h-11 w-11", color: ACCENT_RGB, delay: 0.5 },
          { className: "bottom-[22%] left-[49%] h-9 w-9", color: SECONDARY_RGB, delay: 0.25 },
          { className: "bottom-[12%] left-[55%] h-8 w-8", color: ACCENT_RGB, delay: 0.75 },
        ].map((square) => (
          <motion.div
            key={square.className}
            className={`pointer-events-none absolute z-0 rounded-lg ${square.className}`}
            animate={{ y: [0, -8, 0], rotate: [-8, 4, -8] }}
            transition={{ duration: 7.5, delay: square.delay, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `rgba(${square.color},${isDark ? 0.12 : 0.24})`,
              filter: "blur(0.2px)",
              opacity: 0.72,
            }}
          />
        ))}

        <FadeIn>
          <div className="relative z-10 grid gap-12 lg:min-h-[500px] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.5fr)] lg:items-center lg:gap-0">
            <div className="relative overflow-visible pt-16 lg:-ml-10 lg:pt-20 xl:-ml-14">
              <div
                className="pointer-events-none absolute left-0 right-0 top-8 hidden h-10 lg:block"
                style={{
                  backgroundImage: tickBg,
                  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 3%, #000 96%, transparent 100%)",
                  maskImage: "linear-gradient(90deg, transparent 0%, #000 3%, #000 96%, transparent 100%)",
                }}
              />
              <div className="pointer-events-none absolute left-0 right-0 top-4 hidden lg:block">
                <span className="absolute left-[34%] font-mono text-[0.5rem] tracking-[0.08em]" style={{ color: textMuted }}>
                  00:00:00
                </span>
                <span className="absolute left-[72%] font-mono text-[0.5rem] tracking-[0.08em]" style={{ color: textMuted }}>
                  00:00:05
                </span>
                <span
                  className="absolute left-[35%] top-6 h-0 w-0 border-x-[4px] border-t-[8px] border-x-transparent"
                  style={{ borderTopColor: isDark ? "rgba(244,244,242,0.32)" : "rgba(0,0,0,0.2)" }}
                />
                <span
                  className="absolute left-[73%] top-6 h-0 w-0 border-x-[4px] border-t-[8px] border-x-transparent"
                  style={{ borderTopColor: isDark ? "rgba(244,244,242,0.32)" : "rgba(0,0,0,0.2)" }}
                />
              </div>

              <motion.div
                className="group absolute left-0 top-20 z-30 hidden h-[210px] w-[148px] overflow-visible rounded-l-[2.75rem] rounded-r-[8px] lg:block"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                style={{
                  border: `1px solid ${isDark ? "rgba(244,244,242,0.08)" : "rgba(0,0,0,0.04)"}`,
                  boxShadow: isDark ? "0 16px 36px rgba(0,0,0,0.2)" : "0 16px 34px rgba(0,0,0,0.065)",
                }}
              >
                <img
                  src={processItems[0].image}
                  alt={`SNATSH ${processItems[0].label.toLowerCase()}`}
                  className="absolute inset-y-0 left-[-2.25rem] h-full w-[190px] object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  style={{
                    width: "190px",
                    maxWidth: "none",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: processItems[0].position,
                    borderRadius: "2.75rem 8px 8px 2.75rem",
                  }}
                />
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:gap-px lg:pr-0"
                animate={footerTrackDrift}
                transition={footerTrackTransition}
              >
                {processItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={`group relative h-[170px] sm:h-[188px] lg:h-[210px] ${
                      index === 0 ? "overflow-hidden rounded-l-[2.75rem] rounded-r-[8px] lg:invisible" : "overflow-hidden rounded-[8px]"
                    }`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "120px 0px" }}
                    transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
                    style={{
                      border: `1px solid ${isDark ? "rgba(244,244,242,0.08)" : "rgba(0,0,0,0.04)"}`,
                      boxShadow: isDark ? "0 16px 36px rgba(0,0,0,0.2)" : "0 16px 34px rgba(0,0,0,0.065)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`SNATSH ${item.label.toLowerCase()}`}
	                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
	                      style={{
	                        width: "100%",
	                        height: "100%",
	                        display: "block",
	                        objectFit: "cover",
	                        objectPosition: item.position,
                        filter: index === 4
                          ? isDark
                            ? "blur(2px) saturate(0.78) contrast(0.94) opacity(0.72)"
                            : "blur(2px) saturate(0.82) contrast(0.98) opacity(0.78)"
                          : isDark
                            ? "saturate(0.86) contrast(0.96)"
                            : "saturate(0.92) contrast(0.98)",
                        transform: index === 4 ? "scale(1.04)" : undefined,
	                      }}
	                    />
                    {index === 0 && (
                      <div
                        className="pointer-events-none absolute inset-y-0 left-0 w-12"
                        style={{
                          background: isDark
                            ? "linear-gradient(90deg, rgba(8,16,26,0.18), transparent)"
                            : "linear-gradient(90deg, rgba(244,244,242,0.46), transparent)",
                        }}
                      />
                    )}
                    {index === 4 && (
                      <>
                        <div
                          className="absolute inset-0"
                          style={{
                            background: isDark
                              ? "linear-gradient(90deg, rgba(13,23,36,0.04), rgba(13,23,36,0.28) 66%, rgba(13,23,36,0.6)), radial-gradient(ellipse at 20% 42%, rgba(244,244,242,0.12), transparent 54%)"
                              : "linear-gradient(90deg, rgba(244,244,242,0.02), rgba(244,244,242,0.24) 66%, rgba(255,255,255,0.58)), radial-gradient(ellipse at 20% 42%, rgba(255,255,255,0.72), transparent 54%)",
                          }}
                        />
                        <div
                          className="absolute inset-y-0 right-0 w-1/2"
                          style={{
                            background: isDark
                              ? "linear-gradient(90deg, transparent, rgba(13,23,36,0.72))"
                              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.78))",
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <div
                className="mt-7 hidden h-10 lg:block"
                style={{
                  backgroundImage: tickBg,
                  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 3%, #000 96%, transparent 100%)",
                  maskImage: "linear-gradient(90deg, transparent 0%, #000 3%, #000 96%, transparent 100%)",
                }}
              />

              <motion.div
                className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:-mt-8 lg:gap-px"
                animate={footerTrackDrift}
                transition={footerTrackTransition}
              >
                {processItems.map((item, index) => (
                  <div key={`label-${item.label}`} className="text-center">
                    <span
                      className="mx-auto mb-3 block h-0 w-0 border-x-[4px] border-b-[8px] border-x-transparent"
                      style={{ borderBottomColor: index === 4 ? SECONDARY : isDark ? "rgba(244,244,242,0.28)" : "rgba(0,0,0,0.16)" }}
                    />
                    <p
                      style={{
                        fontFamily: "'Roboto Mono', monospace",
                        fontSize: "0.64rem",
                        letterSpacing: "0.1em",
                        color: index === 4 ? SECONDARY : textMuted,
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative z-20 lg:-ml-32 xl:-ml-40">
              <div className="relative mx-auto max-w-[440px] px-4 py-5 lg:mx-0 lg:px-0 lg:py-0">
                <div className="relative mb-9 w-[220px] md:w-[300px] lg:w-[430px]">
                  <span
                    className="absolute -left-4 -top-4 hidden h-8 w-8 border-l border-t lg:block"
                    style={{ borderColor: isDark ? "rgba(193,211,221,0.24)" : "rgba(193,211,221,0.72)" }}
                  />
                  <span
                    className="absolute -right-4 -top-4 hidden h-8 w-8 border-r border-t lg:block"
                    style={{ borderColor: isDark ? "rgba(193,211,221,0.24)" : "rgba(193,211,221,0.72)" }}
                  />
                  <span
                    className="absolute -bottom-4 -left-4 hidden h-8 w-8 border-b border-l lg:block"
                    style={{ borderColor: isDark ? "rgba(193,211,221,0.18)" : "rgba(193,211,221,0.5)" }}
                  />
                  <span
                    className="absolute -bottom-4 -right-4 hidden h-8 w-8 border-b border-r lg:block"
                    style={{ borderColor: isDark ? "rgba(193,211,221,0.18)" : "rgba(193,211,221,0.5)" }}
                  />
                  <img
                    src={isDark ? logoIconTxtWhite : logoIconTxtBlack}
                    alt="SNATSH"
                    className="relative z-10 w-full"
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(1.35rem, 1.55vw, 1.85rem)",
                    lineHeight: 1.22,
                    fontWeight: 520,
                    letterSpacing: "0",
                    color: textStrong,
                  }}
                >
                  Des idées claires.<br />
                  Des images qui <span style={{ color: ACCENT, fontWeight: 650 }}>marquent.</span>
                </h2>
                <div className="mt-8 flex items-center gap-0">
                  <span
                    className="h-px w-[205px]"
                    style={{ background: isDark ? "rgba(193,211,221,0.28)" : "rgba(193,211,221,0.86)" }}
                  />
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: isDark ? "rgba(193,211,221,0.45)" : "rgba(193,211,221,0.95)" }}
                  />
                </div>
              </div>
            </div>
          </div>
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
  const [paletteGlow, setPaletteGlow] = useState(PALETTE[2].hex);
  const pageGlow = paletteGlow === "#000000"
    ? isDark
      ? "rgba(244,244,242,0.09)"
      : "rgba(0,0,0,0.18)"
    : paletteGlow === "#FFFFFF" || paletteGlow === "#F4F4F2"
      ? isDark
        ? "rgba(244,244,242,0.18)"
        : "rgba(192,193,164,0.38)"
      : `${paletteGlow}${isDark ? "34" : "70"}`;

  return (
    <div className="relative isolate w-full">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-[-10rem]"
          animate={{
            background: [
              `radial-gradient(ellipse at 52% 12%, ${pageGlow} 0%, transparent ${isDark ? 34 : 42}%), radial-gradient(ellipse at 16% 36%, ${pageGlow} 0%, transparent ${isDark ? 32 : 40}%), radial-gradient(ellipse at 82% 63%, ${pageGlow} 0%, transparent ${isDark ? 34 : 42}%), radial-gradient(ellipse at 36% 92%, ${pageGlow} 0%, transparent ${isDark ? 30 : 38}%)`,
              `radial-gradient(ellipse at 56% 14%, ${pageGlow} 0%, transparent ${isDark ? 36 : 44}%), radial-gradient(ellipse at 18% 40%, ${pageGlow} 0%, transparent ${isDark ? 34 : 42}%), radial-gradient(ellipse at 78% 66%, ${pageGlow} 0%, transparent ${isDark ? 36 : 44}%), radial-gradient(ellipse at 40% 90%, ${pageGlow} 0%, transparent ${isDark ? 32 : 40}%)`,
            ],
            opacity: isDark ? 0.92 : 1,
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          animate={{
            background: `linear-gradient(180deg, ${pageGlow} 0%, transparent 22%, ${pageGlow} 46%, transparent 72%, ${pageGlow} 100%)`,
            opacity: isDark ? 0.16 : 0.36,
          }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
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

      <div className="relative z-10">
        <HeroSection />
        <IntroSection />
        <ContextSection />
        <LogoSection />
        <DirectionSection />
        <PaletteSection onActiveColorChange={setPaletteGlow} />
        <TypographySection />
        <ChoicesSection />
        <InteractiveBook />
        <MockupsSection />
        <FinalSection />
      </div>
    </div>
  );
}
