import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import imgPhoto1 from "figma:asset/2756264f6abdd38df440bd337310e5af10009b21.png";
import imgPhoto2 from "figma:asset/1157426f3f0af6733020c152f6b6f489fd171042.png";
import imgPhoto3 from "figma:asset/9cc9df0f407c86cf7bb363ba177056ca5884a0d7.png";
import imgPoster1 from "figma:asset/b7bf5c481864083c1b0ec51c9bbb5e17bf93665b.png";
import imgPoster2 from "figma:asset/42789f20dbc1c74b38f641fcb5138e47f4fc6470.png";
import imgPoster3 from "figma:asset/a511767aeddb866d5ca5a953cddd4032238cebc1.png";
import imgMockup from "figma:asset/ad2c64276560bba68ae641b20d3e11238345b48d.png";

/* -- Helpers -- */
const ACCENT = "#B8A88A";
const ACCENT_RGB = "184,168,138";
const DARK_STONE = "#2e2b26";

const DriftingPhoto = ({
  src,
  alt,
  borderColor,
  className = "",
  aspect = "1 / 1",
}: {
  src: string;
  alt: string;
  borderColor: string;
  className?: string;
  aspect?: string;
}) => {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: aspect,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

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
      viewport={{ once: true, margin: "160px 0px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===================================
   1. HERO (Mockup fort)
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[75vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.1) 0%, transparent 70%)`,
        }}
      />

      <motion.div className="relative z-10 w-full max-w-4xl" style={{ scale: imgScale, opacity: imgOpacity }}>
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex items-center gap-4 justify-center"
        >
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.3) }}>
            {t("roma.hero.label")} — {t("roma.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Mockup image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-full rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${r(0.05)}` }}
        >
          <img src={imgMockup} alt="Gallery mockup — Mairie de Paris posters" className="w-full object-cover" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===================================
   2. INTRO (Titre + intro)
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
            color: isDark ? "#fff" : DARK_STONE,
            transition: "color 0.5s ease",
          }}
        >
          {t("roma.hero.title")}
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
          {t("roma.intro.subtitle")}
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
          {t("roma.intro.desc")}
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
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <FadeIn>
          <SectionLabel>{t("roma.context.label")}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.35),
            }}
          >
            {t("roma.context.text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   4. SOURCE PHOTOGRAPHS
   =================================== */
function PhotosSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("roma.photos.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FadeIn>
            <DriftingPhoto
              src={imgPhoto1}
              alt="Architecture — Institut de France"
              borderColor={r(0.04)}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <DriftingPhoto
              src={imgPhoto2}
              alt="Architecture — Saint-Sulpice"
              borderColor={r(0.04)}
            />
          </FadeIn>
          <FadeIn delay={0.16}>
            <DriftingPhoto
              src={imgPhoto3}
              alt="Architecture — Statue detail"
              borderColor={r(0.04)}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   5. VISUAL DIRECTION
   =================================== */
function DirectionSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <FadeIn>
          <SectionLabel>{t("roma.direction.label")}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.35),
            }}
          >
            {t("roma.direction.text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   7. INDIVIDUAL POSTERS
   =================================== */
function PostersSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("roma.posters.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-3 gap-3">
          {[imgPoster1, imgPoster2, imgPoster3].map((src, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${r(0.04)}` }}
              >
                <img src={src} alt={`Individual poster ${i + 1}`} className="w-full object-contain" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================
   8. GRAPHIC CHOICES
   =================================== */
function ChoicesSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <FadeIn>
          <SectionLabel>{t("roma.choices.label")}</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.35),
            }}
          >
            {t("roma.choices.text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   9. FINAL (Mockup final)
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("roma.final.label")}</SectionLabel>
        </FadeIn>

        {/* Final mockup reprise */}
        <FadeIn>
          <div
            className="w-full rounded-2xl overflow-hidden mb-10 transition-all duration-700"
            style={{ border: `1px solid ${r(0.05)}` }}
          >
            <img src={imgMockup} alt="Final gallery mockup" className="w-full object-cover" />
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
            {t("roma.final.text")}
          </p>
        </FadeIn>

        {/* Back button */}
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
            {t("roma.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectRoma() {
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
        {t("roma.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />
      <PhotosSection />
      <DirectionSection />
      <PostersSection />
      <ChoicesSection />
      <FinalSection />
    </div>
  );
}
