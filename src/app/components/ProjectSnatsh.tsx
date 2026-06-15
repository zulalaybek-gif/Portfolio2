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

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-4 pt-8 lg:grid-cols-[0.34fr_0.66fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[470px]"
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
            className="mb-7 max-w-xl"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.9rem, 3vw, 3.05rem)",
              lineHeight: 1.14,
              fontWeight: 520,
              letterSpacing: "0",
              color: textStrong,
            }}
          >
            Donner vie aux idées.<br />Créer l'émotion.
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

          <div className="mt-8 grid max-w-lg gap-6 sm:grid-cols-2">
            {[
              ["Vision créative", "Raconter juste.", ACCENT_RGB],
              ["Exécution maîtrisée", "Livrer fort.", SECONDARY_RGB],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="flex items-center gap-3"
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
          className="pointer-events-none relative min-h-[360px] overflow-visible md:min-h-[500px] lg:min-h-[620px]"
          initial={{ opacity: 0, x: 38 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: "easeOut" }}
        >
          <motion.img
            src={heroVisual}
            alt=""
            aria-hidden="true"
            className="absolute left-[47%] top-1/2 w-[186%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain md:w-[176%] lg:w-[188%]"
            animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[18%] top-[14%] h-9 w-9 rounded-xl"
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `rgba(${SECONDARY_RGB},${isDark ? 0.18 : 0.34})`,
              boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.24)" : "0 18px 40px rgba(0,0,0,0.08)",
            }}
          />
          <motion.div
            className="absolute bottom-[12%] left-[34%] h-10 w-10 rounded-xl"
            animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: `rgba(${ACCENT_RGB},${isDark ? 0.2 : 0.42})`,
              boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.22)" : "0 18px 38px rgba(0,0,0,0.08)",
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
    <section className="px-6 md:px-16 py-20">
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
  const { isDark } = useTheme();
  const processItems = [
    { label: "IDÉE", image: footerVisual09, position: "center center" },
    { label: "TOURNAGE", image: footerVisual10, position: "center center" },
    { label: "MONTAGE", image: footerVisual11, position: "center center" },
    { label: "ÉTALONNAGE", image: footerVisual12, position: "center center" },
    { label: "LIVRAISON", image: footerVisual13, position: "center center" },
  ];
  const sectionBg = isDark
    ? "radial-gradient(ellipse at 72% 26%, rgba(193,211,221,0.08), transparent 34%), radial-gradient(ellipse at 26% 78%, rgba(192,193,164,0.08), transparent 36%), linear-gradient(145deg, #08101a 0%, #0d1724 54%, #070c13 100%)"
    : "radial-gradient(ellipse at 70% 22%, rgba(193,211,221,0.22), transparent 36%), radial-gradient(ellipse at 30% 76%, rgba(192,193,164,0.18), transparent 38%), linear-gradient(145deg, #f4f4f2 0%, #ffffff 56%, #eef3f5 100%)";
  const textStrong = isDark ? "#f4f4f2" : "#000000";
  const textMuted = isDark ? "rgba(244,244,242,0.58)" : "rgba(0,0,0,0.52)";

  return (
    <section className="px-4 py-20 md:px-10 md:py-24">
      <div
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] px-6 py-12 md:px-12 lg:min-h-[620px] lg:px-12 lg:py-14 xl:px-16"
        style={{
          background: sectionBg,
          border: `1px solid ${isDark ? "rgba(244,244,242,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isDark ? "0 34px 120px rgba(0,0,0,0.36)" : "0 34px 120px rgba(0,0,0,0.08)",
        }}
      >
        <div
          className="pointer-events-none absolute left-[9%] top-[18%] h-9 w-9 rounded-lg"
          style={{ background: `rgba(${SECONDARY_RGB},${isDark ? 0.16 : 0.34})` }}
        />
        <div
          className="pointer-events-none absolute left-[6.5%] top-[13%] h-11 w-11 rounded-lg"
          style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.18 : 0.42})` }}
        />
        <div
          className="pointer-events-none absolute bottom-[20%] left-[52%] h-10 w-10 rounded-lg"
          style={{ background: `rgba(${SECONDARY_RGB},${isDark ? 0.14 : 0.3})` }}
        />
        <div
          className="pointer-events-none absolute bottom-[15%] left-[55%] h-9 w-9 rounded-lg"
          style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.16 : 0.34})` }}
        />

        <FadeIn>
          <div className="relative z-10 grid gap-12 lg:min-h-[500px] lg:grid-cols-[minmax(0,1.48fr)_minmax(320px,0.72fr)] lg:items-center lg:gap-16">
            <div className="relative pt-16 lg:pt-20">
              <div
                className="pointer-events-none absolute left-0 right-0 top-8 hidden h-10 lg:block"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${isDark ? "rgba(244,244,242,0.1)" : "rgba(0,0,0,0.07)"} 0 1px, transparent 1px 12px)`,
                  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 7%, #000 94%, transparent 100%)",
                  maskImage: "linear-gradient(90deg, transparent 0%, #000 7%, #000 94%, transparent 100%)",
                }}
              />
              <div className="pointer-events-none absolute left-0 right-0 top-4 hidden lg:block">
                <span className="absolute left-[36%] font-mono text-[0.5rem] tracking-[0.08em]" style={{ color: textMuted }}>
                  00:00:00
                </span>
                <span className="absolute left-[73%] font-mono text-[0.5rem] tracking-[0.08em]" style={{ color: textMuted }}>
                  00:00:05
                </span>
                <span
                  className="absolute left-[37%] top-6 h-0 w-0 border-x-[4px] border-t-[8px] border-x-transparent"
                  style={{ borderTopColor: isDark ? "rgba(244,244,242,0.32)" : "rgba(0,0,0,0.2)" }}
                />
                <span
                  className="absolute left-[74%] top-6 h-0 w-0 border-x-[4px] border-t-[8px] border-x-transparent"
                  style={{ borderTopColor: isDark ? "rgba(244,244,242,0.32)" : "rgba(0,0,0,0.2)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:gap-[3px]">
                {processItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="group relative h-[170px] overflow-hidden rounded-[9px] sm:h-[188px] lg:h-[198px]"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "120px 0px" }}
                    transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
                    style={{
                      border: `1px solid ${isDark ? "rgba(244,244,242,0.1)" : "rgba(0,0,0,0.06)"}`,
                      boxShadow: isDark ? "0 18px 42px rgba(0,0,0,0.24)" : "0 18px 42px rgba(0,0,0,0.08)",
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
                            ? "blur(4px) saturate(0.72) contrast(0.92) opacity(0.58)"
                            : "blur(4px) saturate(0.78) contrast(0.96) opacity(0.68)"
                          : isDark
                            ? "saturate(0.86) contrast(0.96)"
                            : "saturate(0.92) contrast(0.98)",
                        transform: index === 4 ? "scale(1.06)" : undefined,
                      }}
                    />
                    {index === 4 && (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isDark
                            ? "linear-gradient(90deg, rgba(13,23,36,0.08), rgba(13,23,36,0.38) 72%, rgba(13,23,36,0.66))"
                            : "linear-gradient(90deg, rgba(244,244,242,0.04), rgba(244,244,242,0.34) 72%, rgba(255,255,255,0.62))",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              <div
                className="mt-7 hidden h-10 lg:block"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${isDark ? "rgba(244,244,242,0.1)" : "rgba(0,0,0,0.07)"} 0 1px, transparent 1px 12px)`,
                  WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                  maskImage: "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
                }}
              />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:-mt-8 lg:gap-[3px]">
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
              </div>
            </div>

            <div>
              <div className="relative mx-auto max-w-[430px] px-4 py-5 lg:mx-0 lg:px-0 lg:py-0">
                <span
                  className="absolute -left-2 -top-2 hidden h-7 w-7 border-l border-t lg:block"
                  style={{ borderColor: isDark ? "rgba(193,211,221,0.22)" : "rgba(193,211,221,0.7)" }}
                />
                <span
                  className="absolute -right-2 -top-2 hidden h-7 w-7 border-r border-t lg:block"
                  style={{ borderColor: isDark ? "rgba(193,211,221,0.22)" : "rgba(193,211,221,0.7)" }}
                />
                <span
                  className="absolute -bottom-2 -left-2 hidden h-7 w-7 border-b border-l lg:block"
                  style={{ borderColor: isDark ? "rgba(193,211,221,0.14)" : "rgba(193,211,221,0.46)" }}
                />
                <span
                  className="absolute -bottom-2 -right-2 hidden h-7 w-7 border-b border-r lg:block"
                  style={{ borderColor: isDark ? "rgba(193,211,221,0.14)" : "rgba(193,211,221,0.46)" }}
                />
                <img
                  src={isDark ? logoIconTxtWhite : logoIconTxtBlack}
                  alt="SNATSH"
                  className="mb-10 w-[220px] md:w-[300px] lg:w-full"
                />
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
                <p
                  className="mt-16"
                  style={{
                    fontFamily: "'Roboto Mono', monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.24em",
                    color: textMuted,
                  }}
                >
                  PRODUCTION AUDIOVISUELLE — 2026
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
