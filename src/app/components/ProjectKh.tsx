import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { ExternalLink, Play, Zap, Sparkles, Star } from "lucide-react";
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
import imgPikatchu from "../../assets/kittyhub/14-pikatchu.png";
import videoIpadAnimation from "../../assets/kittyhub/15-animation-interface-ipad.mp4";
import imgPaletteOrange from "../../assets/kittyhub/assets/01.palette.png";
import imgPaletteViolet from "../../assets/kittyhub/assets/02.palette.png";
import imgPaletteBlue from "../../assets/kittyhub/assets/03.palette.png";
import imgPaletteDark from "../../assets/kittyhub/assets/04.palette.png";
import imgPaletteBooster from "../../assets/kittyhub/assets/05.palette.png";
import imgLogoDarkCard from "../../assets/kittyhub/assets/10.logo-dark.png";
import imgLogoLightCard from "../../assets/kittyhub/assets/11.logo-light.png";
import imgFooterLight from "../../assets/kittyhub/assets/12.footer-light.png";
import imgFooterDark from "../../assets/kittyhub/assets/13.footer-dark.png";
import imgFooterLogo from "../../assets/kittyhub/assets/14.footer-logo.png";

/* -- Helpers -- */
const ACCENT = "#FD6235";
const ACCENT_RGB = "253,98,53";
const DARK_BG = "#07020b";
const IPAD_PROTO_URL = "https://www.figma.com/proto/Yd1jdAY0vItJeAIf4tmsGa/kittyhub?page-id=547%3A2998&node-id=2000-8068&viewport=733%2C-7356%2C0.07&t=MdzZHiu2I41bwGOu-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2000%3A8068&show-proto-sidebar=1";
const WEB_PROTO_URL = "https://www.figma.com/proto/Yd1jdAY0vItJeAIf4tmsGa/kittyhub?node-id=3911-2622&viewport=212%2C-3898%2C0.11&t=xZg4qGYtJkw0EDwB-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=890%3A271&page-id=860%3A2";
const WEB_PROTO_EMBED_URL = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(WEB_PROTO_URL)}`;

const PALETTE = [
  { hex: "#FD6235", name: "Flame Orange" },
  { hex: "#8E25F7", name: "Electric Violet" },
  { hex: "#1DA4D0", name: "Cyan Blue" },
  { hex: "#2B253D", name: "Dark Onyx" },
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
   6. PALETTE — Chromatic Booster Pack
   =================================== */
function PaletteSection() {
  const { lang } = useI18n();
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const advantages = [
    {
      label: lang === "fr" ? "Identité forte" : "Strong identity",
      desc: lang === "fr" ? "Couleurs uniques et différenciantes." : "Unique and differentiating colors.",
      icon: Star
    },
    {
      label: lang === "fr" ? "Impact visuel" : "Visual impact",
      desc: lang === "fr" ? "Des contrastes qui captent l'attention." : "Contrasts that capture attention.",
      icon: Zap
    },
    {
      label: lang === "fr" ? "Valeur de collection" : "Collector value",
      desc: lang === "fr" ? "Une palette pensée pour durer." : "A palette designed to last.",
      icon: Sparkles
    },
  ];

  const paletteAssets = [
    {
      id: "orange",
      src: imgPaletteOrange,
      alt: "Kitty Hub orange collector card",
      className: isMobile 
        ? "left-[12px] top-0 w-[165px]" 
        : "left-[42px] top-[22px] w-[270px]",
      rotate: "-4deg",
      zIndex: 34,
    },
    {
      id: "violet",
      src: imgPaletteViolet,
      alt: "Kitty Hub violet collector card",
      className: isMobile 
        ? "left-[104px] top-[22px] w-[158px]" 
        : "left-[196px] top-[42px] w-[260px]",
      rotate: "1deg",
      zIndex: 31,
    },
    {
      id: "blue",
      src: imgPaletteBlue,
      alt: "Kitty Hub blue collector card",
      className: isMobile 
        ? "left-[184px] top-[44px] w-[150px]" 
        : "left-[338px] top-[66px] w-[250px]",
      rotate: "4deg",
      zIndex: 28,
    },
    {
      id: "dark",
      src: imgPaletteDark,
      alt: "Kitty Hub dark collector card",
      className: isMobile 
        ? "left-[246px] top-[64px] w-[142px]" 
        : "left-[468px] top-[92px] w-[238px]",
      rotate: "7deg",
      zIndex: 25,
    },
    {
      id: "booster",
      src: imgPaletteBooster,
      alt: "Kitty Hub chromatic booster pack",
      className: isMobile 
        ? "left-[78px] top-[168px] w-[205px]" 
        : "left-[150px] top-[238px] w-[315px]",
      rotate: "-7deg",
      zIndex: 45,
    },
  ];

  return (
    <section
      className="relative w-full overflow-visible"
      style={{
        paddingTop: '72px',
        paddingBottom: '136px',
        backgroundColor: isDark ? '#030303' : 'transparent',
      }}
    >
      {/* Background Grid Decoration */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)'
            : 'linear-gradient(#07020b 1px, transparent 1px), linear-gradient(90deg, #07020b 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-[1480px] mx-auto overflow-visible px-6 lg:px-[64px]">
        <div className="flex flex-col items-start gap-[48px] overflow-visible lg:flex-row lg:items-center lg:gap-[56px]">

          {/* LEFT COLUMN: 38% */}
          <div className="w-full z-20 lg:w-[38%] lg:shrink-0 overflow-visible">
            <FadeIn>
              <div
                className="inline-flex items-center px-4 rounded-[8px] mb-[44px] border"
                style={{
                  height: '34px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(7,2,11,0.035)',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(7,2,11,0.08)',
                }}
              >
                <span
                  className="uppercase tracking-[0.16em]"
                  style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(7,2,11,0.52)' }}
                >
                  {lang === "fr" ? "Palette chromatique" : "Chromatic Palette"}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2
                className="mb-[32px] font-semibold"
                style={{
                  fontSize: isMobile ? '38px' : '50px',
                  lineHeight: isMobile ? '44px' : '58px',
                  maxWidth: '360px',
                  color: isDark ? '#fff' : DARK_BG,
                }}
              >
                {lang === "fr" ? "Booster Pack" : "Chromatic"}<br />
                <span style={{
                  background: 'linear-gradient(to right, #1DA4D0, #8E25F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {lang === "fr" ? "Chromatique" : "Booster Pack"}
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                className="mb-[72px]"
                style={{
                  fontSize: '17px',
                  lineHeight: '27px',
                  maxWidth: '340px',
                  color: isDark ? 'rgba(255,255,255,0.68)' : 'rgba(7,2,11,0.58)',
                }}
              >
                {lang === "fr"
                  ? "Quatre teintes stratégiques. Une identité cohérente et mémorable. Collectionnez la palette de Kitty Hub et donnez du pouvoir à vos créations."
                  : "Four strategic hues. A consistent and memorable identity. Collect the Kitty Hub palette and empower your creations."}
              </p>
            </FadeIn>

            <div className="flex flex-col gap-[16px] w-full max-w-[340px]">
              {advantages.map((adv, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.1}>
                  <div
                    className="flex items-center gap-[20px] p-[22px_24px] rounded-[20px] border backdrop-blur-md"
                    style={{
                      background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.58)',
                      borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(7,2,11,0.08)',
                    }}
                  >
                    <div
                      className="w-[42px] h-[42px] rounded-full flex items-center justify-center border shrink-0"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(7,2,11,0.035)',
                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(7,2,11,0.08)',
                      }}
                    >
                      <adv.icon size={18} style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(7,2,11,0.62)' }} />
                    </div>
                    <div>
                      <h4
                        className="text-[16px] font-bold leading-tight"
                        style={{ color: isDark ? '#fff' : DARK_BG }}
                      >
                        {adv.label}
                      </h4>
                      <p
                        className="text-[13px] mt-1"
                        style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(7,2,11,0.48)' }}
                      >
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 62% */}
          <div className="relative mx-auto h-[380px] w-full max-w-[360px] overflow-visible lg:mx-0 lg:h-[610px] lg:w-[62%] lg:max-w-none lg:shrink-0">
            
            {/* LEVEL 1: BACKGROUND DECORATIVE BLOCK */}
            {!isMobile && (
              <div 
                className="absolute right-[140px] top-[40px] w-[640px] h-[500px] rounded-[32px] z-[1] overflow-visible border border-white/5 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(142,37,247,0.12) 0%, transparent 65%), radial-gradient(circle at 70% 70%, rgba(29,164,208,0.1) 0%, transparent 65%)',
                  backgroundColor: 'rgba(255,255,255,0.01)'
                }}
              />
            )}
            
            {/* GLOW (Optional, kept but independent) */}
            <div className="absolute left-[20px] top-[18px] z-[2] h-[250px] w-[300px] rounded-full bg-violet-500/10 blur-[70px] pointer-events-none md:left-[90px] md:top-[40px] md:h-[340px] md:w-[460px] lg:left-[120px] lg:top-[48px] lg:h-[380px] lg:w-[520px]" />

            {/* LEVEL 3: CARDS WRAPPER */}
            <motion.div
              className="relative overflow-visible pointer-events-none lg:absolute"
              style={isMobile ? {
                width: '100%',
                maxWidth: '360px',
                height: '380px',
                zIndex: 30
              } : {
                top: '72px',
                right: '-240px',
                width: '860px',
                height: '560px',
                zIndex: 30
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            >
                {paletteAssets.map((asset, i) => (
                  <motion.img
                    key={asset.id}
                    src={asset.src}
                    alt={asset.alt}
                    initial={{ opacity: 0, y: 42 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.14 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute h-auto object-contain pointer-events-none select-none drop-shadow-[0_34px_70px_rgba(0,0,0,0.55)] ${asset.className}`}
                    style={{
                      rotate: asset.rotate,
                      zIndex: asset.zIndex,
                      transformOrigin: "center center",
                    }}
                  />
                ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR */}
      <FadeIn delay={1} className="mt-[100px] lg:mt-[60px]">
        <div
          className="border-t py-8 px-6 lg:px-[64px] backdrop-blur-sm"
          style={{
            background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.44)',
            borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(7,2,11,0.08)',
          }}
        >
          <div className="max-w-[1480px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
             {/* Logo and Context */}
             <div className="flex items-center gap-4 shrink-0">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                   <div className="w-6 h-6 bg-[#030303] rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-[#FD6235] rounded-full shadow-[0_0_8px_#FD6235]" />
                   </div>
                </div>
                <div>
                  <span
                    className="font-bold text-[15px] block leading-none mb-1"
                    style={{ color: isDark ? '#fff' : DARK_BG }}
                  >
                    Kitty Hub
                  </span>
                  <span
                    className="text-[12px] font-medium tracking-tight"
                    style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(7,2,11,0.42)' }}
                  >
                    {lang === "fr" ? "Projet d'identité visuelle" : "Visual Identity Project"}
                  </span>
                </div>
             </div>

             {/* Color Gauge */}
             <div className="hidden md:flex items-center gap-2">
                {[ '#FD6235', '#8E25F7', '#1DA4D0', '#2B253D' ].map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    whileInView={{ width: '64px' }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
             </div>

             {/* Right Info */}
             <div className="flex items-center gap-4 shrink-0">
                <span
                  className="text-[11px] uppercase tracking-[0.25em] font-bold"
                  style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(7,2,11,0.42)' }}
                >
                  {lang === "fr" ? "Palette chromatique" : "Chromatic Palette"}
                </span>
                <div className="w-5 h-5 opacity-20"><Star size={20} fill={isDark ? "white" : DARK_BG} /></div>
             </div>
          </div>
        </div>
      </FadeIn>
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
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const logoAttributes = [
    { title: "Symbole iconique", text: "Un mark unique, pensé pour durer.", icon: Sparkles, color: "#FD6235" },
    { title: "Énergie & mouvement", text: "Une identité vivante et expressive.", icon: Zap, color: "#8E25F7" },
    { title: "Collectionnable", text: "Conçu pour être découvert, partagé et célébré.", icon: Star, color: "#1DA4D0" },
  ];

  const logoShards = [
    { left: "10%", top: "14%", width: 16, height: 72, rotate: -28, color: isDark ? "#8E25F7" : "#B887F8", delay: 0 },
    { left: "83%", top: "18%", width: 9, height: 42, rotate: 24, color: isDark ? "#1DA4D0" : "#78CDE5", delay: 0.8 },
    { left: "88%", top: "58%", width: 18, height: 82, rotate: -20, color: isDark ? "#8E25F7" : "#B887F8", delay: 0.3 },
    { left: "16%", top: "66%", width: 11, height: 52, rotate: -36, color: isDark ? "#1DA4D0" : "#78CDE5", delay: 1.1 },
    { left: "78%", top: "76%", width: 10, height: 45, rotate: 32, color: isDark ? "#FD6235" : "#FF8A62", delay: 0.5 },
    { left: "22%", top: "24%", width: 5, height: 5, rotate: 0, color: isDark ? "#FD6235" : "#FF8A62", delay: 0.2 },
    { left: "72%", top: "10%", width: 4, height: 4, rotate: 0, color: isDark ? "#FFFFFF" : "#8E25F7", delay: 0.9 },
    { left: "7%", top: "48%", width: 5, height: 5, rotate: 0, color: isDark ? "#8E25F7" : "#1DA4D0", delay: 1.4 },
  ];

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[34px] border px-5 py-5 md:px-8 md:py-7 lg:px-10 lg:py-8"
            style={{
              background: isDark
                ? "radial-gradient(circle at 74% 28%, rgba(142,37,247,0.18) 0%, transparent 32%), radial-gradient(circle at 78% 78%, rgba(29,164,208,0.12) 0%, transparent 34%), linear-gradient(135deg, #08050d 0%, #120a1b 48%, #07020b 100%)"
                : "radial-gradient(circle at 74% 28%, rgba(142,37,247,0.12) 0%, transparent 32%), radial-gradient(circle at 78% 78%, rgba(29,164,208,0.1) 0%, transparent 34%), linear-gradient(135deg, #ffffff 0%, #f7f4fb 50%, #f1eef5 100%)",
              borderColor: isDark ? "rgba(255,255,255,0.09)" : "rgba(7,2,11,0.08)",
              boxShadow: isDark ? "0 36px 110px rgba(0,0,0,0.5)" : "0 28px 80px rgba(32,18,48,0.12)",
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                  : "linear-gradient(#07020b 1px, transparent 1px), linear-gradient(90deg, #07020b 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px]">
              <div className="flex flex-wrap items-center gap-3 md:gap-5" style={{ color: isDark ? "rgba(255,255,255,0.58)" : "rgba(7,2,11,0.48)" }}>
                <span>KITTY HUB</span>
                <span style={{ color: ACCENT }}>/</span>
                <span>PORTFOLIO</span>
                <span style={{ color: ACCENT }}>/</span>
                <span>LOGO SYSTEM</span>
              </div>
              <div
                className="hidden rounded-full border px-4 py-2 md:block"
                style={{
                  color: isDark ? "rgba(255,255,255,0.72)" : "rgba(7,2,11,0.58)",
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(7,2,11,0.08)",
                  background: isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.58)",
                }}
              >
                KITTY HUB UNIVERSE
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 items-center gap-10 pt-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6 lg:pt-16">
              <div className="max-w-[440px]">
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
                  ✦ LOGO SYSTEM
                </p>
                <h2
                  className="mb-6 font-semibold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(2.25rem, 4.4vw, 3.4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: isDark ? "#fff" : DARK_BG,
                  }}
                >
                  Une carte.<br />
                  <span style={{ color: ACCENT }}>Un symbole rare. ✦</span>
                </h2>
                <p
                  className="mb-8 max-w-[390px] border-l pl-6"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                    lineHeight: 1.72,
                    color: isDark ? "rgba(255,255,255,0.62)" : "rgba(7,2,11,0.62)",
                    borderColor: ACCENT,
                  }}
                >
                  Plus qu'un logo, une pièce de collection.<br />
                  Chaque détail raconte notre énergie,<br />
                  notre créativité et notre univers.<br />
                  Reconnaissable. Intemporel. Iconique.
                </p>

                <div className="grid gap-3">
                  {logoAttributes.map((item) => (
                    <div
                      key={item.title}
                      className="grid grid-cols-[44px_1fr] items-center gap-4 rounded-[16px] border p-3.5"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.56)",
                        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(7,2,11,0.06)",
                      }}
                    >
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                        style={{
                          color: item.color,
                          background: isDark ? `${item.color}16` : `${item.color}0f`,
                          borderColor: isDark ? `${item.color}55` : `${item.color}35`,
                        }}
                      >
                        <item.icon size={18} fill={item.color} />
                      </div>
                      <div>
                        <h3 className="text-[13px] font-bold" style={{ color: isDark ? "#fff" : DARK_BG }}>
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12px]" style={{ color: isDark ? "rgba(255,255,255,0.46)" : "rgba(7,2,11,0.52)" }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[540px] overflow-visible lg:min-h-[620px]">
                <div className="absolute left-[46%] top-[64%] h-[58px] w-[420px] -translate-x-1/2 rounded-full blur-[18px]" style={{ background: isDark ? "rgba(253,98,53,0.28)" : "rgba(142,37,247,0.12)" }} />
                <div className="absolute left-[15%] top-[10%] h-[260px] w-[260px] rounded-full bg-[#8E25F7]/15 blur-[82px]" />
                <div className="absolute right-[6%] top-[36%] h-[230px] w-[230px] rounded-full bg-[#1DA4D0]/12 blur-[82px]" />

                {logoShards.map((shard, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    animate={shouldReduceMotion ? undefined : {
                      y: [0, index % 2 === 0 ? -8 : 7, 0],
                      rotate: [shard.rotate, shard.rotate + (index % 2 === 0 ? 4 : -4), shard.rotate],
                      opacity: [isDark ? 0.52 : 0.38, isDark ? 0.82 : 0.58, isDark ? 0.52 : 0.38],
                    }}
                    transition={{
                      duration: 6.5 + index * 0.4,
                      delay: shard.delay,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    style={{
                      left: shard.left,
                      top: shard.top,
                      width: shard.width,
                      height: shard.height,
                      rotate: `${shard.rotate}deg`,
                      background: shard.width <= 5
                        ? shard.color
                        : `linear-gradient(160deg, rgba(255,255,255,0.88) 0%, ${shard.color} 42%, transparent 100%)`,
                      border: shard.width <= 5 ? "none" : `1px solid ${shard.color}66`,
                      borderRadius: shard.width <= 5 ? "999px" : "999px 999px 3px 3px",
                      clipPath: shard.width <= 5 ? "none" : "polygon(50% 0%, 100% 20%, 70% 100%, 20% 82%)",
                      opacity: isDark ? 0.58 : 0.42,
                      filter: isDark ? `drop-shadow(0 0 14px ${shard.color}88)` : `drop-shadow(0 10px 18px ${shard.color}44)`,
                    }}
                  />
                ))}

                <motion.img
                  src={isDark ? imgLogoDarkCard : imgLogoLightCard}
                  alt={isDark ? "Carte logo Kitty Hub version sombre" : "Carte logo Kitty Hub version claire"}
                  className="absolute left-[50%] top-[49%] z-20 w-[min(80vw,410px)] -translate-x-1/2 -translate-y-1/2 object-contain md:w-[455px] lg:left-[46%] lg:w-[520px]"
                  initial={{ opacity: 0, y: 34, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    filter: isDark
                      ? "drop-shadow(0 36px 75px rgba(0,0,0,0.55)) drop-shadow(0 0 28px rgba(253,98,53,0.14))"
                      : "drop-shadow(0 30px 58px rgba(35,19,50,0.18))",
                  }}
                />

                <div className="absolute right-[-2%] top-[54%] z-30 hidden w-[104px] -translate-y-1/2 rounded-[18px] border p-4 text-right lg:block" style={{ background: isDark ? "rgba(7,2,11,0.58)" : "rgba(255,255,255,0.72)", borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(7,2,11,0.08)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: isDark ? "rgba(255,255,255,0.42)" : "rgba(7,2,11,0.42)" }}>Rarity</p>
                  <p className="mt-1 text-[18px] font-black uppercase" style={{ color: ACCENT }}>Rare</p>
                  <div className="my-4 h-px" style={{ background: isDark ? "rgba(255,255,255,0.09)" : "rgba(7,2,11,0.08)" }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: isDark ? "rgba(255,255,255,0.42)" : "rgba(7,2,11,0.42)" }}>ID</p>
                  <p className="mt-1 text-[18px] font-black" style={{ color: isDark ? "#fff" : DARK_BG }}>001</p>
                  <div className="my-4 h-px" style={{ background: isDark ? "rgba(255,255,255,0.09)" : "rgba(7,2,11,0.08)" }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: isDark ? "rgba(255,255,255,0.42)" : "rgba(7,2,11,0.42)" }}>ÉDITION</p>
                  <p className="mt-1 text-[13px] font-bold uppercase" style={{ color: isDark ? "rgba(255,255,255,0.76)" : "rgba(7,2,11,0.7)" }}>Originale</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-col gap-2 border-t pt-5 text-[10px] font-bold uppercase tracking-[0.24em] md:flex-row md:items-center md:justify-between" style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(7,2,11,0.08)", color: isDark ? "rgba(255,255,255,0.35)" : "rgba(7,2,11,0.38)" }}>
              <span>KITTY HUB © 2025</span>
              <span>Tous droits réservés.</span>
            </div>
          </div>
        </FadeIn>
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
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

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
            <motion.img
              src={imgPikatchu}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 z-20 w-16 md:right-8 md:top-8 md:w-24 lg:w-28"
              initial={{ opacity: 0, y: 12, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
              animate={{
                y: [0, -8, 0],
                rotate: [-4, 3, -4],
              }}
              style={{
                filter: isDark ? "drop-shadow(0 12px 30px rgba(136,35,247,0.35))" : "drop-shadow(0 14px 28px rgba(136,35,247,0.22))",
              }}
            />
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
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isAnimationPlaying ? "opacity-0" : "opacity-100"}`}
                />
                {isAnimationPlaying && (
                  <motion.video
                    src={videoIpadAnimation}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    controls
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                )}
                {!isAnimationPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsAnimationPlaying(true)}
                    className="group absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#fff",
                      background: "linear-gradient(135deg, rgba(253,98,53,0.95), rgba(136,35,247,0.9))",
                      border: "1px solid rgba(255,255,255,0.24)",
                      boxShadow: "0 18px 50px rgba(136,35,247,0.38), 0 10px 35px rgba(253,98,53,0.24)",
                    }}
                    aria-label={isDark ? "Lancer l'animation KittyHub" : "Lancer l'animation KittyHub"}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/18 transition-transform group-hover:scale-110">
                      <Play size={15} fill="currentColor" />
                    </span>
                    Play
                  </button>
                )}
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
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const footerDiamonds = [
    { left: "10%", top: "44%", width: 11, height: 22, color: "#1DA4D0", delay: 2.55, rotate: 26 },
    { left: "15%", top: "31%", width: 16, height: 28, color: "#FD6235", delay: 0, rotate: -22 },
    { left: "18%", top: "49%", width: 9, height: 18, color: "#FD9CC8", delay: 1.8, rotate: 34 },
    { left: "23%", top: "56%", width: 12, height: 20, color: "#8E25F7", delay: 0.35, rotate: 18 },
    { left: "27%", top: "22%", width: 13, height: 25, color: "#FD9CC8", delay: 2.75, rotate: -44 },
    { left: "33%", top: "25%", width: 10, height: 18, color: "#1DA4D0", delay: 0.8, rotate: -12 },
    { left: "35%", top: "43%", width: 18, height: 34, color: "#8E25F7", delay: 1.95, rotate: -38 },
    { left: "41%", top: "52%", width: 14, height: 26, color: "#FD6235", delay: 1.25, rotate: 31 },
    { left: "49%", top: "18%", width: 9, height: 18, color: "#1DA4D0", delay: 2.15, rotate: 18 },
    { left: "52%", top: "44%", width: 12, height: 23, color: "#8E25F7", delay: 2.95, rotate: -12 },
    { left: "57%", top: "20%", width: 12, height: 22, color: "#FD6235", delay: 0.55, rotate: 24 },
    { left: "63%", top: "52%", width: 13, height: 24, color: "#1DA4D0", delay: 1.4, rotate: -28 },
    { left: "68%", top: "33%", width: 16, height: 30, color: "#FD9CC8", delay: 2.35, rotate: 38 },
    { left: "72%", top: "48%", width: 12, height: 20, color: "#8E25F7", delay: 1.05, rotate: -18 },
    { left: "76%", top: "17%", width: 10, height: 21, color: "#1DA4D0", delay: 3.1, rotate: -28 },
    { left: "80%", top: "29%", width: 11, height: 22, color: "#FD6235", delay: 1.65, rotate: 12 },
    { left: "86%", top: "39%", width: 20, height: 36, color: "#1DA4D0", delay: 0.2, rotate: 28 },
    { left: "90%", top: "58%", width: 12, height: 24, color: "#8E25F7", delay: 0.95, rotate: -34 },
    { left: "94%", top: "49%", width: 9, height: 18, color: "#FD6235", delay: 3.35, rotate: 42 },
  ];

  const footerConfetti = [
    { left: "18%", top: "46%", size: 7, color: "#FD6235", delay: 0.2 },
    { left: "28%", top: "35%", size: 5, color: "#8E25F7", delay: 0.7 },
    { left: "35%", top: "55%", size: 6, color: "#1DA4D0", delay: 1.1 },
    { left: "47%", top: "26%", size: 5, color: "#FD9CC8", delay: 0.4 },
    { left: "58%", top: "55%", size: 7, color: "#FD6235", delay: 1.5 },
    { left: "70%", top: "38%", size: 6, color: "#8E25F7", delay: 0.9 },
    { left: "82%", top: "54%", size: 6, color: "#1DA4D0", delay: 1.8 },
  ];

  const footerLightDiamonds = [
    { left: "7%", top: "10%", width: 11, height: 23, color: "#8E25F7", delay: 0.4, rotate: -28 },
    { left: "15%", top: "24%", width: 9, height: 18, color: "#1DA4D0", delay: 1.2, rotate: 32 },
    { left: "24%", top: "9%", width: 16, height: 32, color: "#FD9CC8", delay: 0.8, rotate: -42 },
    { left: "12%", top: "42%", width: 10, height: 20, color: "#FD6235", delay: 1.6, rotate: 18 },
    { left: "74%", top: "10%", width: 12, height: 24, color: "#1DA4D0", delay: 0.2, rotate: -16 },
    { left: "81%", top: "25%", width: 15, height: 29, color: "#8E25F7", delay: 1.05, rotate: 34 },
    { left: "89%", top: "9%", width: 11, height: 22, color: "#FD6235", delay: 1.45, rotate: -30 },
    { left: "94%", top: "38%", width: 13, height: 26, color: "#FD9CC8", delay: 0.65, rotate: 24 },
    { left: "8%", top: "62%", width: 14, height: 28, color: "#1DA4D0", delay: 1.85, rotate: 38 },
    { left: "22%", top: "78%", width: 10, height: 21, color: "#FD6235", delay: 2.25, rotate: -24 },
    { left: "31%", top: "70%", width: 12, height: 24, color: "#8E25F7", delay: 2.55, rotate: 30 },
    { left: "70%", top: "80%", width: 9, height: 19, color: "#FD9CC8", delay: 2.05, rotate: -36 },
    { left: "91%", top: "76%", width: 15, height: 30, color: "#1DA4D0", delay: 2.75, rotate: 22 },
  ];

  const footerLightConfetti = [
    { left: "13%", top: "8%", size: 5, color: "#FD6235", delay: 0.2 },
    { left: "22%", top: "31%", size: 4, color: "#8E25F7", delay: 1.1 },
    { left: "29%", top: "18%", size: 6, color: "#1DA4D0", delay: 0.7 },
    { left: "9%", top: "48%", size: 5, color: "#FD9CC8", delay: 1.6 },
    { left: "70%", top: "8%", size: 4, color: "#FD6235", delay: 0.45 },
    { left: "76%", top: "32%", size: 6, color: "#1DA4D0", delay: 1.35 },
    { left: "94%", top: "18%", size: 5, color: "#8E25F7", delay: 0.9 },
    { left: "6%", top: "74%", size: 4, color: "#FD9CC8", delay: 1.9 },
    { left: "18%", top: "84%", size: 6, color: "#1DA4D0", delay: 2.4 },
    { left: "37%", top: "80%", size: 4, color: "#FD6235", delay: 2.1 },
    { left: "65%", top: "86%", size: 5, color: "#8E25F7", delay: 2.7 },
    { left: "78%", top: "78%", size: 4, color: "#FD9CC8", delay: 2.2 },
    { left: "95%", top: "84%", size: 6, color: "#1DA4D0", delay: 2.95 },
  ];

  return (
    <section
      className="relative overflow-hidden px-0 pb-20 pt-28 md:pb-24 md:pt-36"
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(3,3,3,0) 0%, #08040d 42%, #030303 100%)"
          : "linear-gradient(180deg, rgba(250,246,255,0) 0%, #fbf7ff 34%, #fbf7ff 72%, #fff 100%)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(180deg, transparent 0%, rgba(142,37,247,0.05) 42%, rgba(3,3,3,0.18) 100%)"
            : "linear-gradient(180deg, rgba(251,247,255,0) 0%, rgba(251,247,255,0.86) 58%, #fbf7ff 100%)",
        }}
      />
      <div className="mx-auto max-w-[1480px]">
        <FadeIn>
          <div
            className="relative h-[360px] overflow-hidden md:h-[500px] lg:h-[600px]"
            style={{
              background: isDark
                ? "radial-gradient(circle at 50% 54%, rgba(142,37,247,0.16) 0%, rgba(3,3,3,0) 48%), linear-gradient(180deg, rgba(3,3,3,0) 0%, #08040d 32%, #030303 100%)"
                : "radial-gradient(circle at 50% 54%, rgba(142,37,247,0.13) 0%, rgba(255,255,255,0) 54%), linear-gradient(180deg, rgba(251,247,255,0) 0%, #fbf7ff 38%, #fbf7ff 74%, #fff 100%)",
            }}
          >
            <div
              className="absolute inset-0 z-[1] opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)"
                  : "linear-gradient(#8E25F7 1px, transparent 1px), linear-gradient(90deg, #8E25F7 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "linear-gradient(180deg, transparent 0%, black 22%, black 72%, transparent 100%)",
              }}
            />

            <img
              src={isDark ? imgFooterDark : imgFooterLight}
              alt=""
              className="absolute inset-x-0 top-0 z-10 h-full w-full object-cover object-center"
              draggable={false}
              style={{
                maskImage: isDark
                  ? "radial-gradient(ellipse 74% 62% at 50% 50%, black 36%, rgba(0,0,0,0.82) 62%, transparent 100%)"
                  : "linear-gradient(180deg, transparent 0%, black 10%, black 70%, rgba(0,0,0,0.72) 84%, transparent 100%)",
              }}
            />

            {!isDark && (
              <div
                className="absolute inset-x-0 bottom-0 z-[16] h-[46%] pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(251,247,255,0) 0%, rgba(251,247,255,0.18) 42%, rgba(251,247,255,0.62) 74%, #fff 100%)",
                }}
              />
            )}

            <div
              className="absolute inset-x-0 top-0 z-[14] h-32 pointer-events-none"
              style={{
                background: isDark
                  ? "linear-gradient(180deg, #030303 0%, rgba(3,3,3,0.28) 44%, transparent 100%)"
                  : "linear-gradient(180deg, #fbf7ff 0%, rgba(251,247,255,0.7) 42%, transparent 100%)",
              }}
            />

            <div
              className="absolute inset-0 z-[12] pointer-events-none"
              style={{
                background: isDark
                  ? "radial-gradient(circle at 50% 56%, rgba(253,98,53,0.1) 0%, transparent 30%), radial-gradient(circle at 48% 48%, rgba(142,37,247,0.12) 0%, transparent 38%), linear-gradient(90deg, rgba(3,3,3,0.34), transparent 28%, transparent 72%, rgba(3,3,3,0.16))"
                  : "radial-gradient(circle at 50% 56%, rgba(253,98,53,0.08) 0%, transparent 30%), radial-gradient(circle at 48% 48%, rgba(142,37,247,0.1) 0%, transparent 38%), linear-gradient(90deg, rgba(255,255,255,0.26), transparent 30%, transparent 72%, rgba(255,255,255,0.18))",
              }}
            />

            <div
              className="absolute right-[4%] top-[56%] z-[18] h-[150px] w-[430px] rounded-full blur-[26px] md:right-[7%] md:top-[58%] md:h-[190px] md:w-[520px]"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse at center, rgba(8,4,13,0.56), rgba(142,37,247,0.2) 38%, rgba(29,164,208,0.1) 58%, transparent 82%)"
                  : "radial-gradient(ellipse at center, rgba(244,221,255,0.95), rgba(255,255,255,0.86) 38%, rgba(29,164,208,0.14) 62%, transparent 84%)",
              }}
            />

            <motion.div
              className="absolute left-1/2 top-[39%] z-20 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[28px] md:h-[300px] md:w-[300px] md:blur-[40px]"
              animate={shouldReduceMotion ? undefined : { opacity: [0.45, 0.78, 0.45], scale: [0.96, 1.08, 0.96] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: isDark
                  ? "radial-gradient(circle, rgba(253,98,53,0.36), rgba(142,37,247,0.18) 54%, transparent 72%)"
                  : "radial-gradient(circle, rgba(253,98,53,0.22), rgba(142,37,247,0.14) 54%, transparent 72%)",
              }}
            />

            <motion.img
              src={imgFooterLogo}
              alt=""
              className="absolute left-1/2 top-[39%] z-30 w-[210px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_26px_54px_rgba(253,98,53,0.46)] md:w-[340px] lg:w-[430px]"
              draggable={false}
              style={{ top: isDark ? "39%" : "22%" }}
              animate={shouldReduceMotion ? undefined : { y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute left-1/2 top-[60%] z-20 h-[44px] w-[360px] -translate-x-1/2 rounded-full blur-[22px] md:h-[64px] md:w-[560px]" style={{ background: isDark ? "rgba(142,37,247,0.18)" : "rgba(142,37,247,0.12)" }} />
            <motion.div
              className="absolute bottom-2 left-1/2 z-30 h-[2px] w-[86%] -translate-x-1/2 rounded-full"
              animate={shouldReduceMotion ? undefined : { opacity: isDark ? [0.38, 0.82, 0.38] : [0, 0, 0], scaleX: [0.92, 1.04, 0.92] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(253,98,53,0.95), rgba(142,37,247,0.9), rgba(29,164,208,0.78), rgba(253,156,200,0.68), transparent)",
                opacity: isDark ? 1 : 0,
                boxShadow: isDark ? "0 0 22px rgba(142,37,247,0.44), 0 0 12px rgba(253,98,53,0.28)" : "none",
              }}
            />

            {isDark && footerDiamonds.map((diamond, index) => (
              <motion.div
                key={index}
                className="absolute z-30 cursor-default"
                style={{
                  left: diamond.left,
                  top: diamond.top,
                  width: diamond.width,
                  height: diamond.height,
                  rotate: `${diamond.rotate}deg`,
                  background: `linear-gradient(145deg, rgba(255,255,255,0.88), ${diamond.color} 44%, rgba(255,255,255,0.16))`,
                  border: `1px solid ${diamond.color}66`,
                  clipPath: "polygon(50% 0%, 100% 28%, 72% 100%, 18% 76%)",
                  boxShadow: `0 0 22px ${diamond.color}66`,
                }}
                animate={shouldReduceMotion ? undefined : {
                  x: [0, index % 2 ? 8 : -7, index % 3 ? -4 : 6, 0],
                  y: [0, index % 2 ? -9 : 8, index % 3 ? 5 : -6, 0],
                  opacity: [0.38, 0.78, 0.52, 0.38],
                }}
                transition={{ duration: 8.5 + index * 0.45, delay: diamond.delay, repeat: Infinity, ease: "easeInOut" }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.2, rotate: diamond.rotate + 18, y: -7, boxShadow: `0 0 34px ${diamond.color}` }}
              />
            ))}

            {isDark && footerConfetti.map((dot, index) => (
              <motion.span
                key={index}
                className="absolute z-30 rounded-full"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  opacity: isDark ? 0.6 : 0.5,
                  boxShadow: `0 0 ${dot.size * 4}px ${dot.color}88`,
                }}
                animate={shouldReduceMotion ? undefined : {
                  x: [0, index % 2 ? 12 : -10, index % 3 ? -7 : 8, 0],
                  y: [0, index % 2 ? -10 : 9, index % 3 ? 6 : -8, 0],
                  opacity: [0.34, 0.78, 0.46, 0.34],
                }}
                transition={{ duration: 7.4 + index * 0.35, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {!isDark && footerLightDiamonds.map((diamond, index) => (
              <motion.div
                key={`light-diamond-${index}`}
                className="absolute z-30 cursor-default"
                style={{
                  left: diamond.left,
                  top: diamond.top,
                  width: diamond.width,
                  height: diamond.height,
                  rotate: `${diamond.rotate}deg`,
                  background: `linear-gradient(145deg, rgba(255,255,255,0.95), ${diamond.color} 48%, rgba(255,255,255,0.22))`,
                  border: `1px solid ${diamond.color}55`,
                  clipPath: "polygon(50% 0%, 100% 30%, 72% 100%, 18% 76%)",
                  boxShadow: `0 0 20px ${diamond.color}55`,
                }}
                animate={shouldReduceMotion ? undefined : {
                  x: [0, index % 2 ? 9 : -8, index % 3 ? -4 : 6, 0],
                  y: [0, index % 2 ? -10 : 8, index % 3 ? 5 : -7, 0],
                  opacity: [0.34, 0.72, 0.46, 0.34],
                }}
                transition={{ duration: 8.2 + index * 0.35, delay: diamond.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {!isDark && footerLightConfetti.map((dot, index) => (
              <motion.span
                key={`light-dot-${index}`}
                className="absolute z-30 rounded-full"
                style={{
                  left: dot.left,
                  top: dot.top,
                  width: dot.size,
                  height: dot.size,
                  background: dot.color,
                  opacity: 0.54,
                  boxShadow: `0 0 ${dot.size * 5}px ${dot.color}88`,
                }}
                animate={shouldReduceMotion ? undefined : {
                  x: [0, index % 2 ? 13 : -11, index % 3 ? -6 : 8, 0],
                  y: [0, index % 2 ? -9 : 10, index % 3 ? 6 : -7, 0],
                  opacity: [0.32, 0.72, 0.44, 0.32],
                }}
                transition={{ duration: 7.1 + index * 0.4, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {[0, 1, 2].map((item) => (
              <motion.div
                key={item}
                className="absolute z-30 hidden border md:block"
                style={{
                  left: `${30 + item * 19}%`,
                  top: `${28 + item * 9}%`,
                  width: item === 1 ? 18 : 14,
                  height: item === 1 ? 34 : 28,
                  rotate: `${-28 + item * 31}deg`,
                  borderColor: item === 0 ? "#FD623566" : item === 1 ? "#8E25F766" : "#1DA4D066",
                  background: item === 0
                    ? "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(253,98,53,0.16))"
                    : item === 1
                      ? "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(142,37,247,0.16))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(29,164,208,0.16))",
                  clipPath: "polygon(50% 0%, 100% 30%, 72% 100%, 18% 76%)",
                  filter: "drop-shadow(0 0 16px rgba(142,37,247,0.28))",
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -8, rotate: item === 0 ? -18 : item === 1 ? 12 : 42, scale: 1.12 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function KittyHubAmbientParticles() {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const particles = [
    { left: "8%", top: "7%", size: 5, color: "#FD6235", delay: 0 },
    { left: "82%", top: "9%", size: 4, color: "#8E25F7", delay: 0.8 },
    { left: "18%", top: "17%", size: 6, color: "#1DA4D0", delay: 1.4 },
    { left: "72%", top: "23%", size: 5, color: "#FD9CC8", delay: 0.5 },
    { left: "91%", top: "31%", size: 4, color: "#1DA4D0", delay: 1.1 },
    { left: "11%", top: "39%", size: 4, color: "#8E25F7", delay: 1.8 },
    { left: "58%", top: "46%", size: 6, color: "#FD6235", delay: 0.3 },
    { left: "32%", top: "54%", size: 5, color: "#1DA4D0", delay: 1.6 },
    { left: "86%", top: "61%", size: 5, color: "#8E25F7", delay: 0.9 },
    { left: "16%", top: "69%", size: 4, color: "#FD9CC8", delay: 2.1 },
    { left: "67%", top: "76%", size: 4, color: "#1DA4D0", delay: 1.3 },
    { left: "43%", top: "83%", size: 6, color: "#8E25F7", delay: 0.6 },
    { left: "6%", top: "91%", size: 5, color: "#1DA4D0", delay: 1.9 },
    { left: "79%", top: "94%", size: 5, color: "#FD6235", delay: 0.2 },
    { left: "94%", top: "73%", size: 6, color: "#FD9CC8", delay: 2.3 },
    { left: "24%", top: "88%", size: 4, color: "#FD6235", delay: 1.7 },
    { left: "38%", top: "11%", size: 5, color: "#FD9CC8", delay: 2.6 },
    { left: "52%", top: "19%", size: 4, color: "#1DA4D0", delay: 3.1 },
    { left: "4%", top: "28%", size: 6, color: "#8E25F7", delay: 2.4 },
    { left: "47%", top: "34%", size: 5, color: "#FD6235", delay: 3.4 },
    { left: "76%", top: "42%", size: 6, color: "#FD9CC8", delay: 2.9 },
    { left: "21%", top: "48%", size: 4, color: "#1DA4D0", delay: 3.8 },
    { left: "94%", top: "55%", size: 5, color: "#FD6235", delay: 3.2 },
    { left: "52%", top: "64%", size: 4, color: "#8E25F7", delay: 2.7 },
    { left: "35%", top: "73%", size: 5, color: "#FD9CC8", delay: 3.6 },
    { left: "88%", top: "86%", size: 4, color: "#1DA4D0", delay: 2.8 },
  ];

  const gradientLines = [
    { left: "12%", top: "28%", width: "22%", delay: 0 },
    { left: "68%", top: "34%", width: "15%", delay: 2.1 },
    { left: "60%", top: "52%", width: "18%", delay: 0.8 },
    { left: "10%", top: "66%", width: "16%", delay: 2.7 },
    { left: "24%", top: "86%", width: "26%", delay: 1.4 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {gradientLines.map((line, index) => (
        <motion.span
          key={`line-${index}`}
          className="absolute h-px rounded-full"
          style={{
            left: line.left,
            top: line.top,
            width: line.width,
            background: "linear-gradient(90deg, transparent, rgba(253,98,53,0.62), rgba(142,37,247,0.56), rgba(29,164,208,0.48), rgba(253,156,200,0.42), transparent)",
            opacity: isDark ? 0.36 : 0.42,
            boxShadow: isDark ? "0 0 18px rgba(142,37,247,0.24)" : "0 0 14px rgba(142,37,247,0.14)",
          }}
          animate={shouldReduceMotion ? undefined : { opacity: [0.18, isDark ? 0.5 : 0.56, 0.18], scaleX: [0.9, 1.08, 0.9] }}
          transition={{ duration: 7.5, delay: line.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size + 1.5,
            height: particle.size + 1.5,
            background: particle.color,
            opacity: isDark ? 0.62 : 0.5,
            boxShadow: `0 0 ${particle.size * 6}px ${particle.color}99`,
          }}
          animate={shouldReduceMotion ? undefined : {
            x: [0, index % 2 ? 18 : -16, index % 3 ? -10 : 14, 0],
            y: [0, index % 2 ? -14 : 16, index % 3 ? 12 : -10, 0],
            opacity: [isDark ? 0.38 : 0.3, isDark ? 0.82 : 0.66, isDark ? 0.52 : 0.42, isDark ? 0.38 : 0.3],
            scale: [1, 1.28, 0.88, 1],
          }}
          transition={{
            duration: 10 + index * 0.65,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
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
    <div
      className="relative w-full"
      style={{
        background: isDark
          ? "radial-gradient(circle at 50% 14%, rgba(142,37,247,0.08) 0%, transparent 34%), linear-gradient(180deg, #030303 0%, #08040d 42%, #030303 100%)"
          : "radial-gradient(circle at 50% 16%, rgba(142,37,247,0.07) 0%, transparent 34%), linear-gradient(180deg, #fbf7ff 0%, #f8f3ff 46%, #fff 100%)",
      }}
    >
      <KittyHubAmbientParticles />
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
