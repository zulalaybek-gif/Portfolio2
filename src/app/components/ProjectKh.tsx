import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import svgPaths from "../../imports/svg-h5iq7vbtzp";
import imgMew from "../../assets/kittyhub/01-mew.png";
import imgPictoOrbit from "../../assets/kittyhub/02-picto.png";
import imgPictoCrystal from "../../assets/kittyhub/03-picto.png";
import imgCards from "../../assets/kittyhub/04-cards.png";
import imgInterfaceMobile1 from "../../assets/kittyhub/05-interface-mobile.png";
import imgInterfaceMobile2 from "../../assets/kittyhub/06-interface-mobile.png";
import imgIpadApplication from "../../assets/kittyhub/07-application-ipad.png";
import imgTeamWhite from "../../assets/kittyhub/08-equipe-version-blanc.png";
import imgTeamBlack from "../../assets/kittyhub/09-equipe-version-noir.png";
import imgBentoMockup from "../../assets/kittyhub/10-mockup-bento.jpg";
import imgSituation from "../../assets/kittyhub/11-mise-en-situation.png";
import imgMockup1 from "../../assets/kittyhub/12-MOCKUP-1.png";
import imgMockup2 from "../../assets/kittyhub/13-MOCKUP-2.png";

/* -- Helpers -- */
const ACCENT = "#FD6235";
const ACCENT_RGB = "253,98,53";
const DARK_BG = "#07020b";
const IPAD_PROTO_URL = "https://www.figma.com/proto/Yd1jdAY0vItJeAIf4tmsGa/kittyhub?page-id=547%3A2998&node-id=2000-8068&viewport=733%2C-7356%2C0.07&t=MdzZHiu2I41bwGOu-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2000%3A8068&show-proto-sidebar=1";
const WEB_PROTO_URL = "https://www.figma.com/proto/Yd1jdAY0vItJeAIf4tmsGa/kittyhub?node-id=3911-2622&viewport=212%2C-3898%2C0.11&t=xZg4qGYtJkw0EDwB-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=890%3A271&page-id=860%3A2";
const WEB_PROTO_EMBED_URL = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(WEB_PROTO_URL)}`;

const PALETTE = [
  { hex: "#FD6235", name: "Flame Orange" },
  { hex: "#8823F7", name: "Electric Violet" },
  { hex: "#1DA4D0", name: "Cyan Blue" },
  { hex: "#26252D", name: "Dark Onyx" },
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
   1. HERO
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
            {t("kh.hero.label")} — {t("kh.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Logo icon */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-[220px] md:w-[300px] rounded-[40px] overflow-hidden flex items-center justify-center aspect-square"
          style={{
            background: ACCENT,
            boxShadow: isDark
              ? `0 40px 100px rgba(${ACCENT_RGB},0.3), 0 0 60px rgba(136,35,247,0.12)`
              : `0 40px 100px rgba(${ACCENT_RGB},0.2), 0 0 60px rgba(136,35,247,0.08)`,
          }}
        >
          <svg className="w-[55%]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="60 38 100 130">
            <path d={svgPaths.pe2c7b00} fill="white" />
            <path d={svgPaths.p1a04ad00} fill="white" />
            <path d={svgPaths.p188bda80} fill="white" />
          </svg>
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
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: isDark ? "#fff" : DARK_BG,
            transition: "color 0.5s ease",
          }}
        >
          KittyHub
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
          {t("kh.intro.tag")}
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
          {t("kh.intro.subtitle")}
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
          {t("kh.intro.desc")}
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
            <SectionLabel>{t("kh.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.context.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   4. DIRECTION
   =================================== */
function DirectionSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("kh.direction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.direction.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   5. VISUAL DIRECTION — with images
   =================================== */
function VisualDirectionSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("kh.visual.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.visual.text")}</p>
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
            <SectionLabel>{t("kh.palette.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.palette.text")}</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PALETTE.map((color, i) => (
            <FadeIn key={color.hex} delay={0.12 + i * 0.06}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-full aspect-square rounded-[28px] transition-transform duration-300 hover:scale-105"
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
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                    color: r(0.3),
                  }}
                >
                  {color.hex}
                </span>
                <span
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
      </div>
    </section>
  );
}

/* ===================================
   7. TYPOGRAPHY
   =================================== */
function TypographySection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("kh.typo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Darker Grotesque */}
          <FadeIn delay={0.08}>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-4 h-full"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1020 0%, #0f0817 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                }}
              >
                Darker<br />Grotesque
              </p>
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {t("kh.typo.desc")}
              </p>
            </div>
          </FadeIn>

          {/* Alphabet specimen */}
          <FadeIn delay={0.14}>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col justify-center h-full"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1020 0%, #0f0817 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <div className="w-full h-[1px] my-4" style={{ background: "rgba(255,255,255,0.08)" }} />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(0.8rem, 2vw, 1.2rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.2,
                }}
              >
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   8. LOGO SYSTEM
   =================================== */
function LogoSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("kh.logo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Logo on accent */}
          <FadeIn delay={0.08}>
            <div
              className="flex items-center justify-center rounded-2xl p-10 md:p-12 transition-all duration-700 aspect-square"
              style={{
                background: ACCENT,
                border: `1px solid ${r(0.05)}`,
                boxShadow: isDark ? `0 20px 60px rgba(${ACCENT_RGB},0.2)` : `0 12px 40px rgba(${ACCENT_RGB},0.15)`,
              }}
            >
              <svg className="w-full max-w-[100px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="60 38 100 130">
                <path d={svgPaths.pe2c7b00} fill="white" />
                <path d={svgPaths.p1a04ad00} fill="white" />
                <path d={svgPaths.p188bda80} fill="white" />
              </svg>
            </div>
          </FadeIn>

          {/* Logo dark on light */}
          <FadeIn delay={0.14}>
            <div
              className="flex items-center justify-center rounded-2xl p-10 md:p-12 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #f0ebe4 0%, #e8e2d9 100%)"
                  : "linear-gradient(160deg, #faf7f3 0%, #f0ebe4 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <svg className="w-full max-w-[100px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="60 38 100 130">
                <path d={svgPaths.p152f9b60} fill="#202020" />
                <path d={svgPaths.p3326ab00} fill="#202020" />
                <path d={svgPaths.p3a8ccd00} fill="#202020" />
              </svg>
            </div>
          </FadeIn>

          {/* Full cat shape */}
          <FadeIn delay={0.2}>
            <div
              className="flex items-center justify-center rounded-2xl p-10 md:p-12 transition-all duration-700 aspect-square"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1020 0%, #0f0817 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <svg className="w-full max-w-[100px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 336 444">
                <path d={svgPaths.p3ede9b00} fill={ACCENT} />
                <path d={svgPaths.p318b8200} fill={ACCENT} />
                <path d={svgPaths.p39a19400} fill={ACCENT} />
              </svg>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   9. APP ICONS
   =================================== */
function AppIconsSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  const icons = [
    { bg: "#FD6235", fillLogo: "white", label: "Orange" },
    { bg: "#8823F7", fillLogo: "white", label: "Violet" },
    { bg: "#ffffff", fillLogo: "#202020", label: "Light" },
    { bg: "linear-gradient(180deg, #FD6235 0%, #8823F7 100%)", fillLogo: "white", label: "Gradient" },
  ];

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("kh.icons.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {icons.map((icon, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.06}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-full aspect-square rounded-[32px] flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  style={{
                    background: icon.bg,
                    boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 8px 30px rgba(0,0,0,0.1)",
                    border: icon.bg === "#ffffff" ? `1px solid ${r(0.1)}` : "none",
                  }}
                >
                  <svg className="w-[45%]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="60 38 100 130">
                    <path d={svgPaths.pe2c7b00} fill={icon.fillLogo} />
                    <path d={svgPaths.p1a04ad00} fill={icon.fillLogo} />
                    <path d={svgPaths.p188bda80} fill={icon.fillLogo} />
                  </svg>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.25), letterSpacing: "0.05em" }}>
                  {icon.label}
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
   10. CARDS / VISUAL SYSTEM
   =================================== */
function CardsSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("kh.cards.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.cards.text")}</p>
          </FadeIn>
        </div>

        {/* Visual direction images — smaller, before cards */}
        <div className="grid grid-cols-2 gap-3 mb-4 max-w-[180px] mr-auto">
          <FadeIn delay={0.15}>
            <div className="rounded-lg overflow-hidden p-3" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgPictoOrbit} alt="KittyHub visual element" className="w-full object-contain" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-lg overflow-hidden p-3" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgPictoCrystal} alt="KittyHub unit element" className="w-full object-contain" />
            </div>
          </FadeIn>
        </div>

        {/* Full-width cards image */}
        <FadeIn delay={0.25}>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgCards} alt="KittyHub cards system" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11. INTERFACE — Screenshots
   =================================== */
function InterfaceSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("kh.interface.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.interface.text")}</p>
          </FadeIn>
        </div>

        {/* UI screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgInterfaceMobile1} alt="KittyHub UI screen 1" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgInterfaceMobile2} alt="KittyHub UI screen 2" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   11a. iPAD PROTOTYPE
   =================================== */
function IPadPrototypeSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn>
            <SectionLabel>{t("kh.ipad.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.ipad.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              border: `1px solid ${r(0.06)}`,
              boxShadow: isDark
                ? "0 30px 80px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.05)"
                : "0 30px 80px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.08)",
              background: isDark ? "#0d0a11" : "#f8f7fa",
              aspectRatio: "4/3",
            }}
          >
            {/* iPad bezel */}
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <div
                className="relative w-full h-full rounded-[20px] overflow-hidden"
                style={{
                  border: isDark ? "6px solid #2a2530" : "6px solid #d8d5dc",
                  boxShadow: isDark
                    ? "inset 0 0 30px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.3)"
                    : "inset 0 0 20px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={imgIpadApplication}
                  alt="KittyHub iPad application"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA link */}
        <FadeIn delay={0.2}>
          <div className="mt-6 flex justify-center">
            <a
              href={IPAD_PROTO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                border: `1px solid ${r(0.1)}`,
                color: r(0.4),
              }}
            >
              {t("kh.ipad.cta")}
              <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11b. WEB INTERFACE — Full page preview
   =================================== */
function WebInterfaceSection() {
  const { r, isDark } = useTheme();
  const { lang } = useI18n();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{lang === "fr" ? "Interface web" : "Web interface"}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: `1px solid ${r(0.06)}`,
              boxShadow: isDark
                ? "0 30px 80px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.05)"
                : "0 30px 80px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)",
              background: isDark ? "#0d0a11" : "#f8f7fa",
            }}
          >
            {/* Browser bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5"
              style={{
                background: isDark ? "#1a1520" : "#f0eef2",
                borderBottom: `1px solid ${r(0.06)}`,
              }}
            >
              <div className="flex gap-1.5">
                <div className="w-[10px] h-[10px] rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-[10px] h-[10px] rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-[10px] h-[10px] rounded-full" style={{ background: "#28C840" }} />
              </div>
              <div
                className="flex-1 mx-4 py-1 px-3 rounded-md text-center"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.55rem",
                  color: r(0.3),
                  letterSpacing: "0.02em",
                }}
              >
                kittyhub.app
              </div>
            </div>

            <div className="relative aspect-[16/10] min-h-[420px] md:min-h-[560px]">
              <iframe
                title={lang === "fr" ? "Prototype web KittyHub" : "KittyHub web prototype"}
                src={WEB_PROTO_EMBED_URL}
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   11b. TEAM
   =================================== */
function TeamSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("kh.team.label")}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={isDark ? imgTeamBlack : imgTeamWhite} alt="KittyHub team" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   12. BENTO UI — Two screens mockup
   =================================== */
function BentoSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-10">
          <SectionLabel>{t("kh.bento.label")}</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgBentoMockup} alt="KittyHub Bento UI mockup" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   13. MOCKUPS — Print & situations
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
            <SectionLabel>{t("kh.mockups.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("kh.mockups.text")}</p>
          </FadeIn>
        </div>

        {/* Bus stop + poster frames */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden h-full" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgSituation} alt="KittyHub bus stop mockup" className="w-full h-full object-cover" />
            </div>
          </FadeIn>
          <div className="flex flex-col gap-4">
            <FadeIn delay={0.2}>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
                <img src={imgMockup1} alt="KittyHub poster frame 1" className="w-full object-cover" />
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
                <img src={imgMockup2} alt="KittyHub poster frame 2" className="w-full object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   14. FINAL
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("kh.final.label")}</SectionLabel>
        </FadeIn>

        {/* Closing logo */}
        <FadeIn>
          <div className="flex justify-center mb-10">
            <div
              className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] rounded-[36px] overflow-hidden flex items-center justify-center"
              style={{
                background: "linear-gradient(180deg, #FD6235 0%, #8823F7 100%)",
                boxShadow: isDark
                  ? `0 30px 80px rgba(${ACCENT_RGB},0.2)`
                  : `0 30px 80px rgba(${ACCENT_RGB},0.1)`,
              }}
            >
              <svg className="w-[50%]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="60 38 100 130">
                <path d={svgPaths.pe2c7b00} fill="white" />
                <path d={svgPaths.p1a04ad00} fill="white" />
                <path d={svgPaths.p188bda80} fill="white" />
              </svg>
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
            {t("kh.final.text")}
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
            {t("kh.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   FLOATING MEW — Interactive cursor companion
   =================================== */
type MewState = "idle" | "curious" | "petted";

const MEW_MESSAGES = [
  "Mew~!",
  "Prrr...",
  "Nya~",
  "Mrow?",
  ":3",
  "Mew mew!",
  "*purr*",
];

function FloatingMew() {
  const mewRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MewState>("idle");
  const [bubble, setBubble] = useState<string | null>(null);
  const [hearts, setHearts] = useState<number[]>([]);
  const [petCount, setPetCount] = useState(0);
  const lastInteraction = useRef(Date.now());
  const heartId = useRef(0);

  useEffect(() => {
    const check = setInterval(() => {
      const elapsed = Date.now() - lastInteraction.current;
      if (elapsed > 2600 && state === "curious") {
        setState("idle");
      }
    }, 900);
    return () => clearInterval(check);
  }, [state]);

  // Hover = petting
  const onEnter = useCallback(() => {
    lastInteraction.current = Date.now();
    setState("petted");
  }, []);

  const onLeave = useCallback(() => {
    if (state === "petted") setState("curious");
    setTimeout(() => setState("idle"), 900);
  }, [state]);

  // Click = speech bubble + hearts
  const onClick = useCallback(() => {
    lastInteraction.current = Date.now();
    setState("petted");
    const msg = MEW_MESSAGES[Math.floor(Math.random() * MEW_MESSAGES.length)];
    setBubble(msg);
    setPetCount((c) => c + 1);
    // Spawn hearts
    const newHearts = Array.from({ length: 3 }, () => heartId.current++);
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => setBubble(null), 1800);
    setTimeout(() => setHearts((h) => h.filter((id) => !newHearts.includes(id))), 2000);
    setTimeout(() => setState("curious"), 1100);
  }, []);

  const mewPose = state === "petted"
      ? { y: [0, -9, 0], rotate: [-5, 6, -2], scale: [1, 1.08, 1.03] }
      : state === "curious"
        ? { y: [0, -13, -4, 0], rotate: [-4, 5, 2, -4], scale: [1, 1.03, 1] }
        : { y: [0, -10, 0], rotate: [-3, 3, -3], scale: [1, 1.02, 1] };

  const mewTransition = state === "petted"
      ? { duration: 1.1, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" }
      : { duration: state === "curious" ? 2.8 : 4.4, repeat: Infinity, ease: "easeInOut" };

  return (
    <motion.div
      ref={mewRef}
      initial={{ opacity: 0, y: -10, scale: 0.82 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.82, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-24 z-40 cursor-pointer hidden md:block"
      style={{ willChange: "transform" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Speech bubble */}
      {bubble && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.5 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full z-50"
          style={{
            background: "rgba(253,98,53,0.92)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(253,98,53,0.32)",
          }}
        >
          {bubble}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
            style={{ background: "rgba(253,98,53,0.92)" }}
          />
        </motion.div>
      )}

      {/* Floating hearts on click */}
      {hearts.map((id, i) => (
        <motion.span
          key={id}
          className="absolute pointer-events-none"
          initial={{ opacity: 1, y: 0, x: 40 + (i - 1) * 20, scale: 0.5 }}
          animate={{ opacity: 0, y: -80 - i * 20, x: 40 + (i - 1) * 25, scale: 1.2, rotate: (i - 1) * 15 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ fontSize: "1.2rem", top: -5 }}
        >
          {["💖", "🧡", "💜"][i % 3]}
        </motion.span>
      ))}

      {/* Pet counter badge */}
      {petCount > 0 && (
        <motion.div
          key={petCount}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-50"
          style={{
            background: "#8823F7",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 700,
            boxShadow: "0 2px 10px rgba(136,35,247,0.4)",
          }}
        >
          {petCount > 99 ? "99+" : petCount}
        </motion.div>
      )}

      {/* Mew image */}
      <motion.div
        animate={mewPose}
        transition={mewTransition}
        style={{ transformOrigin: "50% 78%" }}
      >
        <motion.img
          src={imgMew}
          alt=""
          className="w-[120px] select-none"
          draggable={false}
          animate={{
            filter:
              state === "petted"
                ? "drop-shadow(0 12px 32px rgba(253,98,53,0.5)) brightness(1.1)"
                : "drop-shadow(0 8px 24px rgba(0,0,0,0.15))",
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Glowing ring when petted */}
      {state === "petted" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            borderRadius: "50%",
            boxShadow: "0 0 40px 10px rgba(253,98,53,0.2), 0 0 80px 20px rgba(136,35,247,0.1)",
          }}
        />
      )}

      {/* Sparkle trail when curious/petted */}
      {(state === "curious" || state === "petted") && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={`spark-${i}`}
              className="absolute rounded-full pointer-events-none"
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0, 1, 0],
                x: [60, 60 + Math.cos(i * 1.05) * (50 + i * 8)],
                y: [60, 60 + Math.sin(i * 1.05) * (50 + i * 8)],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
              style={{
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background: ["#FD6235", "#8823F7", "#1DA4D0", "#26252D", "#FD6235", "#fff"][i],
                boxShadow: `0 0 8px 2px ${["#FD6235", "#8823F7", "#1DA4D0", "#26252D", "#FD6235", "#fff"][i]}44`,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectKh() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          background: isDark ? "rgba(15,8,23,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {t("kh.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />
      <DirectionSection />
      <VisualDirectionSection />
      <PaletteSection />
      <TypographySection />
      <LogoSection />
      <AppIconsSection />
      <CardsSection />
      <InterfaceSection />
      <IPadPrototypeSection />
      <WebInterfaceSection />
      <TeamSection />
      <BentoSection />
      <MockupsSection />
      <FinalSection />

      {/* Floating Mew — desktop only */}
      <FloatingMew />
    </div>
  );
}
