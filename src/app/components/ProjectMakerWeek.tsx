import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, MousePointerClick } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { Sphere3D } from "./Sphere3D";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import svgLogoWhite from "../../imports/svg-izx27lwoj7";
import imgSphere from "../../assets/maker-week/00-sphere.png";
import imgMainPoster from "../../assets/maker-week/01-affiche-principale.png";
import imgBrochure1 from "../../assets/maker-week/02-brochure-1.png";
import imgBrochure2 from "../../assets/maker-week/03-brochure-2.png";
import imgDepliant1 from "../../assets/maker-week/04-depliant-1.png";
import imgDepliant2 from "../../assets/maker-week/05-depliant-2.png";
import imgPoster from "../../assets/maker-week/06-poster.jpg";
import imgKakemonos from "../../assets/maker-week/07-kakemonos.png";
import imgSignaletique from "../../assets/maker-week/08-signaletique-ateliers.png";
import imgPhotocall from "../../assets/maker-week/09-photocall.png";
import imgPhoto10 from "../../assets/maker-week/10-galerie.jpg";
import imgPhoto11 from "../../assets/maker-week/11-galerie.jpg";
import imgPhoto1 from "../../assets/maker-week/12-galerie.jpg";
import imgPhoto2 from "../../assets/maker-week/13-galerie.jpg";
import imgPhoto9 from "../../assets/maker-week/14-galerie.jpg";
import imgPhoto12 from "../../assets/maker-week/15-galerie.jpg";
import imgPhoto3 from "../../assets/maker-week/16-galerie.jpg";
import imgPhoto4 from "../../assets/maker-week/17-galerie.jpg";
import imgPhoto5 from "../../assets/maker-week/18-galerie.jpg";
import imgPhoto6 from "../../assets/maker-week/19-galerie.jpg";
import imgPhoto7 from "../../assets/maker-week/20-galerie.jpg";
import imgPhoto8 from "../../assets/maker-week/21-galerie.jpg";
import imgPhoto13 from "../../assets/maker-week/22-galerie.jpg";

/* -- Helpers -- */
const ACCENT = "#0095C1";
const ACCENT_RGB = "0,149,193";
const DARK_BLUE = "#0A1A2A";

const PALETTE = [
  { hex: "#E5775B", name: "Coral Maker" },
  { hex: "#0095C1", name: "Digital Blue" },
  { hex: "#DA3483", name: "Neon Fuchsia" },
  { hex: "#1C5481", name: "Deep Ocean" },
  { hex: "#A95693", name: "Amethyst" },
  { hex: "#D8272B", name: "Signal Red" },
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

/* helper for small body text style */
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
   1. HERO — Strong opening visual (sphere)
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
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.12) 0%, transparent 70%)`,
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
            {t("mw.hero.label")} — {t("mw.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        <Sphere3D backgroundUrl={imgSphere} size="large" />

        {/* Hint — drag to rotate */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-4 flex items-center gap-2"
        >
          <MousePointerClick size={13} style={{ color: r(0.2) }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: r(0.2),
            }}
          >
            {t("mw.hero.hint")}
          </span>
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
          className="text-center mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: isDark ? "#fff" : DARK_BLUE,
            transition: "color 0.5s ease",
          }}
        >
          Maker Week
        </h1>
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
          {t("mw.intro.subtitle")}
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
          {t("mw.intro.desc")}
        </p>
      </FadeIn>
    </section>
  );
}

/* ===================================
   3. CONTEXT — Text + Main poster
   =================================== */
function ContextSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Label + text */}
        <div className="grid grid-cols-1 gap-4 items-start mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>{t("mw.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mw.context.text")}</p>
          </FadeIn>
        </div>

        {/* Main poster directly below */}
        <FadeIn delay={0.15}>
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
            <img src={imgMainPoster} alt="Affiche principale Maker Week" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   4. DIRECTION VISUELLE — Text + Brochures
   =================================== */
function DirectionSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Label + text */}
        <div className="grid grid-cols-1 gap-4 items-start mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>{t("mw.direction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mw.direction.text")}</p>
          </FadeIn>
        </div>

        {/* Brochures — the visual that illustrates direction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.15}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgBrochure1} alt="Brochure Maker Week — extérieur" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgBrochure2} alt="Brochure Maker Week — intérieur" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   5. CHOIX GRAPHIQUES — Text only (logo follows)
   =================================== */
function ChoicesSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-14">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4 items-start">
          <FadeIn>
            <SectionLabel>{t("mw.choices.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mw.choices.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   5b. DÉPLIANTS — Editorial print materials
   =================================== */
function DepliantSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-8 md:mb-10">
          <SectionLabel>{t("mw.editorial.label")}</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FadeIn delay={0.06}>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgDepliant2} alt="Dépliant Maker Week — recto" className="w-full object-cover" />
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <img src={imgDepliant1} alt="Dépliant Maker Week — verso" className="w-full object-cover" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   6. PALETTE — Text + Color swatches
   =================================== */
function PaletteSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Label + text */}
        <div className="grid grid-cols-1 gap-4 items-start mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>{t("mw.palette.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mw.palette.text")}</p>
          </FadeIn>
        </div>

        {/* Color swatches */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
                    fontSize: "0.6rem",
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
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-8 md:mb-10">
          <SectionLabel>{t("mw.logo.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* White logo on dark */}
          <FadeIn delay={0.08}>
            <div
              className="flex items-center justify-center rounded-2xl p-12 md:p-16 transition-all duration-700"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)"
                  : "linear-gradient(160deg, #1a1a2a 0%, #0a0a14 100%)",
                border: `1px solid ${r(0.05)}`,
              }}
            >
              <svg className="w-full max-w-[185px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 144.41 92.37">
                <g id="Calque 1">
                  <g id="Group">
                    <path d={svgLogoWhite.p331d6500} fill="white" />
                    <path d={svgLogoWhite.p11732800} fill="white" />
                    <path d={svgLogoWhite.p32ee6800} fill="white" />
                    <path d={svgLogoWhite.p32a71980} fill="white" />
                    <path d={svgLogoWhite.p296d0900} fill="white" />
                  </g>
                  <path d={svgLogoWhite.pb0e7500} fill="white" />
                  <g id="Group_2">
                    <path d={svgLogoWhite.p5ce4700} fill="white" />
                    <path d={svgLogoWhite.p2002ea40} fill="white" />
                    <path d={svgLogoWhite.p35a5ec80} fill="white" />
                    <path d={svgLogoWhite.p2e1b500} fill="white" />
                    <path d={svgLogoWhite.p3d296200} fill="white" />
                    <path d={svgLogoWhite.p3eb3fd80} fill="white" />
                    <path d={svgLogoWhite.p33778a00} fill="white" />
                    <path d={svgLogoWhite.p3aeb1000} fill="white" />
                    <path d={svgLogoWhite.p24af4880} fill="white" />
                    <path d={svgLogoWhite.p19a76400} fill="white" />
                    <path d={svgLogoWhite.p1d54d840} fill="white" />
                    <path d={svgLogoWhite.p20997000} fill="white" />
                  </g>
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
              <svg className="w-full max-w-[185px]" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 143.58 92.37">
                <g id="Calque 1">
                  <g id="Group">
                    <path d={svgLogoWhite.p3b7d9440 ?? svgLogoWhite.p331d6500} fill="black" />
                    <path d={svgLogoWhite.p5aee500 ?? svgLogoWhite.p11732800} fill="black" />
                    <path d={svgLogoWhite.p179e400 ?? svgLogoWhite.p32ee6800} fill="black" />
                    <path d={svgLogoWhite.p37d6af80 ?? svgLogoWhite.p32a71980} fill="black" />
                    <path d={svgLogoWhite.p1ea74500 ?? svgLogoWhite.p296d0900} fill="black" />
                  </g>
                  <path d={svgLogoWhite.pb0e7500} fill="black" />
                  <g id="Group_2">
                    <path d={svgLogoWhite.p9818a80 ?? svgLogoWhite.p5ce4700} fill="black" />
                    <path d={svgLogoWhite.p3e91b1c0 ?? svgLogoWhite.p2002ea40} fill="black" />
                    <path d={svgLogoWhite.p3dd053e0 ?? svgLogoWhite.p35a5ec80} fill="black" />
                    <path d={svgLogoWhite.p3e0cc380 ?? svgLogoWhite.p2e1b500} fill="black" />
                    <path d={svgLogoWhite.p32927c00 ?? svgLogoWhite.p3d296200} fill="black" />
                    <path d={svgLogoWhite.p3c6026c0 ?? svgLogoWhite.p3eb3fd80} fill="black" />
                    <path d={svgLogoWhite.p1e881900 ?? svgLogoWhite.p33778a00} fill="black" />
                    <path d={svgLogoWhite.p18109480 ?? svgLogoWhite.p3aeb1000} fill="black" />
                    <path d={svgLogoWhite.p15e06540 ?? svgLogoWhite.p24af4880} fill="black" />
                    <path d={svgLogoWhite.p8398971 ?? svgLogoWhite.p19a76400} fill="black" />
                    <path d={svgLogoWhite.p97bc000 ?? svgLogoWhite.p1d54d840} fill="black" />
                    <path d={svgLogoWhite.p13dd1700 ?? svgLogoWhite.p20997000} fill="black" />
                  </g>
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
   8. SUPPORTS ÉVÉNEMENTIELS — Text + Kakemonos, poster, signalétique, photocall
   =================================== */
function EventSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-14">
      <div className="max-w-4xl mx-auto">
        {/* Label + text */}
        <div className="grid grid-cols-1 gap-4 items-start mb-8 md:mb-10">
          <FadeIn>
            <SectionLabel>{t("mw.event.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("mw.event.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="-mx-6 md:mx-0 overflow-x-auto scroll-smooth pb-3">
            <div className="flex w-max gap-4 px-6 md:px-0 snap-x snap-mandatory">
              {[
                { src: imgPoster, alt: "Poster — stands", position: "50% 50%", scale: 1.14 },
                { src: imgKakemonos, alt: "Kakemonos", position: "50% 50%", scale: 1.16 },
                { src: imgSignaletique, alt: "Signalétique ateliers", position: "50% 50%", scale: 1.08 },
                { src: imgPhotocall, alt: "Photocall Maker Week", position: "50% 50%", scale: 1.1 },
              ].map((image) => (
                <div
                  key={image.src}
                  className="w-[82vw] max-w-[560px] md:w-[46vw] md:max-w-[520px] lg:w-[420px] aspect-[4/3] shrink-0 snap-start rounded-2xl overflow-hidden"
                  style={{ border: `1px solid ${r(0.04)}` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: image.position,
                      transform: `scale(${image.scale})`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   9. GALERIE — Photos de l'événement
   =================================== */
function GallerySection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const [isGalleryPaused, setIsGalleryPaused] = React.useState(false);
  const resumeTimerRef = React.useRef<number | null>(null);

  const photos: Array<{ src: string; alt: string; position?: string }> = [
    { src: imgPhoto10, alt: "Photo de groupe Maker Week", position: "50% 43%" },
    { src: imgPhoto11, alt: "Présentation Maker Week sur scène", position: "50% 44%" },
    { src: imgPhoto1, alt: "Affichage Design d'interface", position: "50% 50%" },
    { src: imgPhoto2, alt: "Programme Maker Week imprimé", position: "50% 48%" },
    { src: imgPhoto9, alt: "Stand Maker Week dans le hall", position: "50% 45%" },
    { src: imgPhoto12, alt: "Étudiants avec une affiche Maker Week", position: "50% 48%" },
    { src: imgPhoto3, alt: "Atelier Maker Week en salle", position: "50% 50%" },
    { src: imgPhoto4, alt: "Signalétique de salle Maker Week", position: "58% 50%" },
    { src: imgPhoto5, alt: "Kakemono Maker Week dans le hall", position: "50% 48%" },
    { src: imgPhoto6, alt: "Détail d'un support Maker Week", position: "50% 50%" },
    { src: imgPhoto7, alt: "Salle de cours Maker Week", position: "52% 50%" },
    { src: imgPhoto13, alt: "Signalétique de porte Maker Week", position: "50% 50%" },
  ];
  const firstRow = photos.slice(0, 6);
  const secondRow = photos.slice(6);
  const galleryRows = [
    { photos: firstRow, direction: "right", duration: 150 },
    { photos: secondRow, direction: "left", duration: 165 },
  ];
  const pauseGallery = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    setIsGalleryPaused(true);
  };
  const resumeGallery = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => setIsGalleryPaused(false), 900);
  };

  return (
    <section className="px-6 md:px-16 py-20 md:py-24">
      <div className="max-w-6xl mx-auto">
        <style>{`
          @keyframes makerWeekGalleryLeft {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }

          @keyframes makerWeekGalleryRight {
            from { transform: translate3d(-50%, 0, 0); }
            to { transform: translate3d(0, 0, 0); }
          }

          .maker-week-gallery-row {
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-x;
          }

          .maker-week-gallery-row::-webkit-scrollbar {
            display: none;
          }

          .maker-week-gallery-track {
            will-change: transform;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-play-state: running;
          }

          .maker-week-gallery-track.is-paused,
          .maker-week-gallery-row:hover .maker-week-gallery-track {
            animation-play-state: paused;
          }
        `}</style>

        <FadeIn className="mb-8 md:mb-10">
          <SectionLabel>{t("mw.gallery.label")}</SectionLabel>
        </FadeIn>

        <FadeIn>
          <div className="relative -mx-6 overflow-hidden py-2 md:mx-0">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
              style={{
                background: isDark
                  ? "linear-gradient(90deg, rgba(0,0,0,0.84) 0%, transparent 100%)"
                  : "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, transparent 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
              style={{
                background: isDark
                  ? "linear-gradient(270deg, rgba(0,0,0,0.84) 0%, transparent 100%)"
                  : "linear-gradient(270deg, rgba(255,255,255,0.92) 0%, transparent 100%)",
              }}
            />

            <div className="space-y-4 md:space-y-5">
              {galleryRows.map((row, rowIndex) => {
                const rowPhotos = [...row.photos, ...row.photos];

                return (
                  <div
                    key={row.direction}
                    className="maker-week-gallery-row overflow-x-auto overscroll-x-contain"
                    onPointerDown={pauseGallery}
                    onPointerUp={resumeGallery}
                    onPointerCancel={resumeGallery}
                    onTouchStart={pauseGallery}
                    onTouchEnd={resumeGallery}
                    onScroll={() => {
                      pauseGallery();
                      resumeGallery();
                    }}
                  >
                    <div
                      className={`maker-week-gallery-track flex w-max gap-3 md:gap-4 ${isGalleryPaused ? "is-paused" : ""}`}
                      style={{
                        animationName: row.direction === "left" ? "makerWeekGalleryLeft" : "makerWeekGalleryRight",
                        animationDuration: `${row.duration}s`,
                      }}
                    >
                      {rowPhotos.map((photo, index) => (
                        <div
                          key={`${row.direction}-${photo.src}-${index}`}
                          className="w-[62vw] max-w-[340px] shrink-0 overflow-hidden rounded-2xl sm:w-[300px] md:w-[340px] lg:w-[380px]"
                          style={{
                            aspectRatio: rowIndex === 0 ? "4 / 3" : "16 / 10",
                            border: `1px solid ${r(0.05)}`,
                            background: isDark ? "rgba(255,255,255,0.045)" : "rgba(10,26,42,0.035)",
                            boxShadow: isDark
                              ? "0 20px 48px rgba(0,0,0,0.34)"
                              : "0 20px 48px rgba(10,26,42,0.13)",
                          }}
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="block h-full w-full object-cover"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: photo.position ?? "50% 50%",
                              transform: "scale(1.1)",
                            }}
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   10. FINAL — Closing visual + back
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("mw.final.label")}</SectionLabel>
        </FadeIn>

        {/* Closing sphere */}
        <FadeIn>
          <div className="flex justify-center mb-10">
            <Sphere3D backgroundUrl={imgSphere} size="small" />
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
            {t("mw.final.text")}
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
            {t("mw.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectMakerWeek() {
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
        {t("mw.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />
      <DirectionSection />
      <PaletteSection />
      <ChoicesSection />
      <LogoSection />
      <DepliantSection />
      <EventSection />
      <GallerySection />
      <FinalSection />
    </div>
  );
}
