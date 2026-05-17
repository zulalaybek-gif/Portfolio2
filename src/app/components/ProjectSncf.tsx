import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import svgLogoSncf from "../../imports/svg-xsk7542b73";
import svgSlideIcons from "../../imports/svg-8lle55gqj4";

/* ── Lazy slide imports ── */
import Slide1 from "../../imports/1";
import Slide2 from "../../imports/2";
import Slide3 from "../../imports/3";
import Slide4 from "../../imports/4";
import Slide5 from "../../imports/5";
import Slide6 from "../../imports/6";
import Slide7 from "../../imports/7";
import Slide8 from "../../imports/8";
import Slide9 from "../../imports/9";
import Slide10 from "../../imports/10";
import Slide11 from "../../imports/11";
import Slide13 from "../../imports/13";
import Slide14 from "../../imports/14";
import Slide15 from "../../imports/15";
import Slide16 from "../../imports/16";
import Slide17 from "../../imports/17";
import Slide18 from "../../imports/18";
import Slide19 from "../../imports/19";
import Slide20 from "../../imports/20";
import Slide21 from "../../imports/21";
import Slide22 from "../../imports/22";
import Slide23 from "../../imports/23";
import Slide24 from "../../imports/24";
import Slide25 from "../../imports/25";

/* ── Onboarding phone images ── */
import imgPhone1 from "figma:asset/2636e6ec7110e5eca67c760f081cd3058b72c3d8.png";
import imgPhone2 from "figma:asset/ab6ac30c707710def679592d42d3252ff64d76b2.png";
import imgPhone3 from "figma:asset/5af6ccef921b97ccb914a7aa411e5dad4d0d0326.png";
import imgPhone4 from "figma:asset/2b3c16c913980c097f83c4a8c1644d3fec07a85c.png";

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide19, Slide20, Slide21, Slide22, Slide23, Slide24, Slide25];
const SLIDE_W = 1920;
const SLIDE_H = 1080;
const ACCENT = "#8DE8FE";
const ACCENT_RGB = "141,232,254";
const BG_DARK = "#0C131F";

/* SNCF Brand palette from slide 11 */
const PALETTE = ["#002c4c", "#8DE8FE", "#242b35", "#4695a8", "#3b3232"];

/* Icon paths from slide 11 bento icons (tickets, home, profile, calendar, notification) */
const BENTO_ICONS = [
  { viewBox: "0 0 60 48", path: svgSlideIcons.p19f94900 },
  { viewBox: "0 0 59 60", path: svgSlideIcons.pedf50c0 },
  { viewBox: "0 0 56 45", paths: [svgSlideIcons.p3aac2980, svgSlideIcons.p1f184100] },
  { viewBox: "0 0 64 56", paths: [svgSlideIcons.p1d8fc600, svgSlideIcons.p1f53cf00, svgSlideIcons.p12371f00] },
  { viewBox: "0 0 64 38", path: svgSlideIcons.p76cf280 },
];

const ONBOARDING_PHONES = [
  { src: imgPhone1, label: "Splash Screen" },
  { src: imgPhone2, label: "Créez vos routines" },
  { src: imgPhone3, label: "Personnalisez l'accueil" },
  { src: imgPhone4, label: "Paramétrage" },
];

/* ── Hero Section ── */
function HeroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-12 pt-10 pb-16 overflow-hidden">
      {/* Ambient cyan glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 50% 40% at 50% 30%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)`
            : `radial-gradient(ellipse 50% 40% at 50% 30%, rgba(${ACCENT_RGB},0.08) 0%, transparent 70%)`,
        }}
      />

      {/* Floating bento icons — decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BENTO_ICONS.map((icon, i) => {
          const positions = [
            { top: "8%", right: "8%", rotate: 12, delay: 0 },
            { top: "18%", right: "3%", rotate: -8, delay: 0.3 },
            { bottom: "25%", right: "5%", rotate: 6, delay: 0.6 },
            { bottom: "12%", right: "12%", rotate: -15, delay: 0.9 },
            { top: "35%", right: "15%", rotate: 10, delay: 1.2 },
          ];
          const pos = positions[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 + pos.delay, ease: "easeOut" }}
              className="absolute hidden lg:flex items-center justify-center rounded-2xl"
              style={{
                top: pos.top,
                right: pos.right,
                bottom: pos.bottom,
                width: 64,
                height: 64,
                transform: `rotate(${pos.rotate}deg)`,
                background: isDark ? "rgba(141,232,254,0.04)" : "rgba(0,44,76,0.04)",
                border: `1px solid ${isDark ? "rgba(141,232,254,0.08)" : "rgba(0,44,76,0.08)"}`,
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox={icon.viewBox}
                fill="none"
                style={{ opacity: isDark ? 0.2 : 0.15 }}
              >
                {icon.path ? (
                  <path d={icon.path} fill={isDark ? ACCENT : "#002c4c"} />
                ) : (
                  icon.paths?.map((p, j) => (
                    <path key={j} d={p} fill={isDark ? ACCENT : "#002c4c"} />
                  ))
                )}
              </svg>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 mb-12 cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.3) }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("sncf.back")}
        </motion.button>

        <div className="flex items-start justify-between mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
          >
            {t("sncf.hero.label")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.15) }}
          >
            {t("sncf.hero.year")}
          </motion.span>
        </div>

        {/* SNCF Connect Logo — BEFORE the title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 inline-flex items-center justify-center rounded-2xl px-8 py-5"
          style={{
            background: isDark ? r(0.04) : BG_DARK,
            border: `1px solid ${isDark ? r(0.08) : "rgba(45,78,86,0.4)"}`,
          }}
        >
          <svg width="200" height="42" viewBox="0 0 318.761 98.68" fill="none">
            <path d={svgLogoSncf.p6783ef0} fill="#8DE8FE" />
            <path d={svgLogoSncf.p1d22fa00} fill="#8DE8FE" />
            <path d={svgLogoSncf.p372a7f80} fill="white" />
            <path d={svgLogoSncf.p5276400} fill="white" />
            <path d={svgLogoSncf.p3c0ffd70} fill={BG_DARK} />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: ACCENT }}>SNCF</span>
          <br />
          <span style={{ color: r(0.6) }}>Connect & Tech</span>
        </motion.h1>

        {/* Color palette strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 flex rounded-full overflow-hidden h-2 max-w-xs"
        >
          {PALETTE.map((color) => (
            <div key={color} className="flex-1 h-full" style={{ background: color }} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {["Workshop", "UX Research", "UX/UI Design"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full"
              style={{
                fontSize: "0.78rem",
                fontFamily: "'Inter', sans-serif",
                border: `1px solid ${r(0.07)}`,
                background: r(0.02),
                color: r(0.4),
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-2xl"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: r(0.35),
          }}
        >
          {t("sncf.intro.desc")}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Slideshow ── */
function PresentationViewer() {
  const { r, isDark } = useTheme();
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < total) setCurrent(idx);
    },
    [total]
  );
  const next = useCallback(() => goTo(Math.min(current + 1, total - 1)), [current, total, goTo]);
  const prev = useCallback(() => goTo(Math.max(current - 1, 0)), [current, goTo]);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, isFullscreen]);

  /* Scale calculation */
  useEffect(() => {
    const measure = () => {
      if (viewerRef.current) {
        const w = viewerRef.current.clientWidth;
        setScale(w / SLIDE_W);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isFullscreen]);

  const SlideComponent = SLIDES[current];

  const slideViewer = (
    <div
      ref={viewerRef}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        background: BG_DARK,
        border: `1px solid ${r(0.06)}`,
        boxShadow: `0 30px 80px rgba(0,0,0,${isDark ? 0.5 : 0.15}), 0 0 40px rgba(${ACCENT_RGB},0.05)`,
      }}
    >
      {/* Slide content */}
      <div
        style={{
          width: SLIDE_W * scale,
          height: SLIDE_H * scale,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: SLIDE_W,
              height: SLIDE_H,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              position: "relative",
            }}
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation overlay */}
      <div className="absolute inset-0 flex">
        <button
          onClick={prev}
          className="w-1/3 h-full cursor-w-resize opacity-0 hover:opacity-100 transition-opacity flex items-center justify-start pl-4"
          disabled={current === 0}
        >
          {current > 0 && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronLeft size={18} color="white" />
            </div>
          )}
        </button>
        <div className="flex-1" />
        <button
          onClick={next}
          className="w-1/3 h-full cursor-e-resize opacity-0 hover:opacity-100 transition-opacity flex items-center justify-end pr-4"
          disabled={current === total - 1}
        >
          {current < total - 1 && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <ChevronRight size={18} color="white" />
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <section className="px-6 md:px-12 py-12" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
            >
              {t("sncf.prez.label")}
            </span>
            <div className="flex items-center gap-3">
              <span
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: r(0.3) }}
              >
                {current + 1} / {total}
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ border: `1px solid ${r(0.1)}`, color: r(0.3) }}
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
          </div>

          {/* Slide viewer */}
          {isFullscreen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              style={{ background: isDark ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                ESC
              </button>
              <div className="w-full max-w-7xl">{slideViewer}</div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                  {current + 1} / {total}
                </span>
              </div>
            </motion.div>
          ) : (
            slideViewer
          )}

          {/* Bottom controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={current === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${current > 0 ? r(0.15) : r(0.05)}`,
                  color: current > 0 ? r(0.5) : r(0.1),
                }}
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={next}
                disabled={current === total - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  border: `1px solid ${current < total - 1 ? r(0.15) : r(0.05)}`,
                  color: current < total - 1 ? r(0.5) : r(0.1),
                }}
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex-1 mx-6 h-[2px] rounded-full overflow-hidden" style={{ background: r(0.05) }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: ACCENT }}
                animate={{ width: `${((current + 1) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Miniature dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? ACCENT : r(0.1),
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Onboarding Section ── */
function OnboardingSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] block mb-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
        >
          {t("sncf.onboarding.label")}
        </motion.span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontWeight: 600,
            color: r(0.7),
            letterSpacing: "-0.03em",
          }}
        >
          {t("sncf.onboarding.title")}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-2xl mb-14"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: r(0.3),
          }}
        >
          {t("sncf.onboarding.desc")}
        </motion.p>

        {/* Phone grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {ONBOARDING_PHONES.map((phone, i) => (
            <motion.div
              key={phone.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.img
                src={phone.src}
                alt={phone.label}
                className="w-full h-auto cursor-pointer"
                whileHover={{ scale: 1.18 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <span
                className="text-center w-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: r(0.3),
                }}
              >
                {phone.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Closing ── */
function ClosingSection() {
  const { isDark, r } = useTheme();
  const { lang } = useI18n();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
          <div className="w-20 h-20 mx-auto mb-6 opacity-20">
            <svg viewBox="0 0 164 51" className="w-full h-auto">
              <path d={svgLogoSncf.p1d22fa00} fill={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} />
            </svg>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "SNCF Connect & Tech — un workshop UX/UI centré sur l'accessibilité et l'innovation au service des voyageurs."
              : "SNCF Connect & Tech — a UX/UI workshop focused on accessibility and innovation for travelers."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export function ProjectSncf() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection />
      <PresentationViewer />
      <OnboardingSection />
      <ClosingSection />
      <div className="h-24" />
    </div>
  );
}