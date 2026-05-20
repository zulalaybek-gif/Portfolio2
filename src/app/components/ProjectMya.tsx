import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectBackButton } from "./ProjectBackButton";

/* ── Assets — SVG logo ── */
import svgPaths from "../../imports/svg-ksrs7ua06u";
import svgConstruction from "../../imports/svg-o0d2fxhm66";
import imgProcess from "../../assets/mya/01-processus-creatif.png";
import img1 from "../../assets/mya/02-applications.png";
import img2 from "../../assets/mya/03-applications.png";
import img3 from "../../assets/mya/04-applications.png";
import img4 from "../../assets/mya/05-applications.png";
import imgBox1 from "../../assets/mya/06-applications-boite-a-bijoux-1.jpg";
import imgBox2 from "../../assets/mya/07-applications-boite-a-bijoux-2.png";
import imgRing from "../../assets/mya/08-applications-bague-sans-fond.png";
import imgKeychain from "../../assets/mya/09-applications-portes-clefs.jpg";

/* ── Helpers ── */
const ACCENT = "#D0B0D4";
const ACCENT_RGB = "208,176,212";
const DARK_PURPLE = "#231332";

/* ── Floating MYA flowers — positioned like butterflies on MZW ── */
interface FloatingFlowerData {
  id: number;
  size: number;
  baseX: number;
  baseY: number;
  driftAmpX: number;
  driftAmpY: number;
  driftSpeed: number;
  rotateBase: number;
}
const FLOWERS: FloatingFlowerData[] = [
  { id: 0, size: 64, baseX: 88, baseY: 28, driftAmpX: 2.5, driftAmpY: 3.5, driftSpeed: 8, rotateBase: -5 },
  { id: 1, size: 44, baseX: 8, baseY: 52, driftAmpX: 2, driftAmpY: 3, driftSpeed: 10, rotateBase: 12 },
  { id: 2, size: 52, baseX: 92, baseY: 72, driftAmpX: 3, driftAmpY: 2.5, driftSpeed: 9, rotateBase: -8 },
];

/* ── Single floating flower — flees from cursor ── */
const FLEE_RADIUS = 160; // px — detection zone around cursor
const FLEE_STRENGTH = 120; // px — max displacement when cursor is right on top

function SingleFlower({
  data,
  scrollPct,
  isDark,
  mousePos,
}: {
  data: FloatingFlowerData;
  scrollPct: number;
  isDark: boolean;
  mousePos: { x: number; y: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [flee, setFlee] = useState({ x: 0, y: 0, rotate: 0 });

  const logoFill = isDark ? ACCENT : DARK_PURPLE;

  // Scroll-based opacity
  const maxOpacity = isDark ? 0.75 : 0.6;
  let opacityVal = maxOpacity;
  if (scrollPct > 0.88 && scrollPct < 0.95) opacityVal = ((0.95 - scrollPct) / 0.07) * maxOpacity;
  else if (scrollPct >= 0.95) opacityVal = 0;

  // Calculate repulsion from cursor
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - mousePos.x;
    const dy = cy - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < FLEE_RADIUS && dist > 0) {
      const strength = ((FLEE_RADIUS - dist) / FLEE_RADIUS) ** 1.5;
      const angle = Math.atan2(dy, dx);
      setFlee({
        x: Math.cos(angle) * FLEE_STRENGTH * strength,
        y: Math.sin(angle) * FLEE_STRENGTH * strength,
        rotate: strength * (dx > 0 ? 20 : -20),
      });
    } else {
      setFlee((prev) =>
        prev.x === 0 && prev.y === 0 && prev.rotate === 0
          ? prev
          : { x: 0, y: 0, rotate: 0 }
      );
    }
  }, [mousePos.x, mousePos.y]);

  const isDisturbed = flee.x !== 0 || flee.y !== 0;

  return (
    <motion.div
      ref={ref}
      className="fixed z-20 pointer-events-none"
      style={{ top: 0, left: 0 }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: opacityVal,
        x: [
          `${data.baseX}vw`,
          `${data.baseX + data.driftAmpX}vw`,
          `${data.baseX - data.driftAmpX * 0.5}vw`,
          `${data.baseX}vw`,
        ],
        y: [
          `${data.baseY}vh`,
          `${data.baseY - data.driftAmpY}vh`,
          `${data.baseY + data.driftAmpY * 0.6}vh`,
          `${data.baseY}vh`,
        ],
        rotate: [data.rotateBase, data.rotateBase + 6, data.rotateBase - 4, data.rotateBase],
      }}
      transition={{
        x: { duration: data.driftSpeed, repeat: Infinity, ease: "easeInOut" },
        y: { duration: data.driftSpeed * 1.3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: data.driftSpeed * 0.9, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Inner container handles the flee displacement with spring physics */}
      <motion.div
        animate={{
          x: flee.x,
          y: flee.y,
          rotate: flee.rotate,
          scale: isDisturbed ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: isDisturbed ? 80 : 40,
          damping: isDisturbed ? 12 : 10,
          mass: 0.8,
        }}
      >
        <svg
          viewBox="0 0 146 145.989"
          fill="none"
          style={{
            width: data.size,
            height: data.size,
            filter: isDisturbed
              ? isDark
                ? `drop-shadow(0 0 14px rgba(${ACCENT_RGB},0.5)) drop-shadow(0 0 4px rgba(${ACCENT_RGB},0.3))`
                : `drop-shadow(0 0 14px rgba(${ACCENT_RGB},0.3)) drop-shadow(0 0 4px rgba(${ACCENT_RGB},0.15))`
              : isDark
                ? `drop-shadow(0 2px 6px rgba(${ACCENT_RGB},0.12))`
                : `drop-shadow(0 2px 6px rgba(${ACCENT_RGB},0.06))`,
            transition: "filter 0.4s ease",
          }}
        >
          <path d={svgPaths.p2e03cf00} fill={logoFill} />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ── Floating Flowers Controller — tracks global mouse position ── */
function FloatingFlowers() {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) setScrollPct(scrollTop / docHeight);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Track global mouse position
  useEffect(() => {
    let raf = 0;
    let nextMousePos = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      nextMousePos = { x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setMousePos(nextMousePos);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {FLOWERS.map((f) => (
        <SingleFlower key={f.id} data={f} scrollPct={scrollPct} isDark={isDark} mousePos={mousePos} />
      ))}
    </>
  );
}

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

/* ══════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Purple ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)`
            : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.1) 0%, transparent 70%)`,
        }}
      />

      <motion.div className="relative z-10 flex flex-col items-center" style={{ scale: logoScale, opacity: logoOpacity }}>
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 flex items-center gap-4"
        >
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.3) }}>
            {t("mya.hero.label")} — {t("mya.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Main Logo SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="w-[180px] md:w-[240px] aspect-square flex items-center justify-center"
        >
          <svg viewBox="0 0 146 145.989" fill="none" className="w-full h-full">
            <path
              d={svgPaths.p2e03cf00}
              fill={isDark ? ACCENT : DARK_PURPLE}
              className="transition-all duration-700"
            />
          </svg>
        </motion.div>

        {/* MYA title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: isDark ? "#fff" : DARK_PURPLE,
            WebkitTextFillColor: isDark ? "#fff" : DARK_PURPLE,
            transition: "color 0.5s ease",
          }}
        >
          MYA
        </motion.h1>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. INTRO
   ═════════════════════════════════════════ */
function IntroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <FadeIn>
        <p
          className="text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            lineHeight: 1.9,
            color: r(0.45),
          }}
        >
          {t("mya.intro.subtitle")}
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
          {t("mya.intro.desc")}
        </p>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. CONTEXT
   ═══════════════════════════════════════════ */
function ContextSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <FadeIn>
          <SectionLabel>{t("mya.context.label")}</SectionLabel>
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
            {t("mya.context.text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. LOGO REVEAL
   ═══════════════════════════════════════════ */
function LogoSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("mya.logo.label")}</SectionLabel>
        </FadeIn>

        {/* Large logo on colored bg */}
        <FadeIn>
          <div
            className="w-full rounded-2xl flex items-center justify-center py-20 md:py-28 transition-all duration-700"
            style={{
              background: isDark
                ? `linear-gradient(160deg, ${DARK_PURPLE} 0%, #1a0d24 100%)`
                : `linear-gradient(160deg, #f0e6f3 0%, #e8dced 100%)`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-[200px] md:w-[280px]"
            >
              <svg viewBox="0 0 146 145.989" fill="none" className="w-full">
                <path d={svgPaths.p2e03cf00} fill={isDark ? ACCENT : DARK_PURPLE} />
              </svg>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. INTENTION / SIGNIFICATION
   ═══════════════════════════════════════════ */
function IntentionSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <FadeIn>
          <SectionLabel>{t("mya.intention.label")}</SectionLabel>
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
            {t("mya.intention.text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   6. CONSTRUCTION
   ═══════════════════════════════════════════ */
function ConstructionSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start mb-12">
          <FadeIn>
            <SectionLabel>{t("mya.construction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 2, color: r(0.3) }}>
              {t("mya.construction.text")}
            </p>
          </FadeIn>
        </div>

        {/* Construction grid SVG */}
        <FadeIn>
          <div
            className="w-full max-w-xl mx-auto rounded-2xl p-10 md:p-16 flex items-center justify-center transition-all duration-700"
            style={{
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              border: `1px solid ${r(0.05)}`,
            }}
          >
            <svg viewBox="0 0 194.292 191.654" fill="none" className="w-full" style={{ maxWidth: 420 }}>
              {/* Logo with fill + stroke */}
              <path
                d={svgConstruction.p31d08800}
                fill={isDark ? ACCENT : DARK_PURPLE}
              />
              {/* Key point circles */}
              {[
                [52.17, 27.94],
                [142.36, 161.79],
                [164.19, 139.96],
                [164.19, 27.70],
                [30.34, 49.77],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={10.91}
                  fill={isDark ? "rgba(208,176,212,0.25)" : "rgba(209,209,209,0.6)"}
                />
              ))}
              {/* Horizontal dashed lines */}
              {[38.36, 172.20, 16.53, 150.38].map((y, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  x2={194.292}
                  y1={y}
                  y2={y}
                  stroke={isDark ? `rgba(${ACCENT_RGB},0.4)` : DARK_PURPLE}
                  strokeDasharray="2 2"
                />
              ))}
              {/* Vertical dashed lines */}
              {[19.93, 153.78, 41.76, 175.60].map((x, i) => (
                <line
                  key={`v-${i}`}
                  x1={x}
                  x2={x}
                  y1={0}
                  y2={191.654}
                  stroke={isDark ? `rgba(${ACCENT_RGB},0.4)` : DARK_PURPLE}
                  strokeDasharray="2 2"
                />
              ))}
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   7. VARIANTS
   ═════════════════════════════════════════ */
function VariantsSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("mya.variants.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light variant */}
          <FadeIn>
            <div
              className="rounded-2xl flex items-center justify-center py-14 md:py-20 transition-all duration-700"
              style={{
                background: isDark ? "#fff" : "#faf8f5",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <div className="w-[100px] md:w-[130px]">
                <svg viewBox="0 0 146 145.989" fill="none" className="w-full">
                  <path d={svgPaths.p2e03cf00} fill={DARK_PURPLE} />
                </svg>
              </div>
            </div>
          </FadeIn>

          {/* Dark variant */}
          <FadeIn delay={0.1}>
            <div
              className="rounded-2xl flex items-center justify-center py-14 md:py-20 transition-all duration-700"
              style={{
                background: DARK_PURPLE,
                border: `1px solid ${isDark ? "rgba(208,176,212,0.1)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <div className="w-[100px] md:w-[130px]">
                <svg viewBox="0 0 146 145.989" fill="none" className="w-full">
                  <path d={svgPaths.p2e03cf00} fill="#fff" />
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   8. PALETTE
   ═══════════════════════════════════════════ */
const colors = [
  { hex: "#D0B0D4", name: "Lavender", rgb: "208 · 176 · 212" },
  { hex: "#231332", name: "Deep Purple", rgb: "35 · 19 · 50" },
  { hex: "#000000", name: "Black", rgb: "0 · 0 · 0" },
  { hex: "#FFFFFF", name: "White", rgb: "255 · 255 · 255" },
];

function PaletteSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("mya.palette.label")}</SectionLabel>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colors.map((c, i) => (
            <FadeIn key={c.hex} delay={i * 0.08}>
              <div
                className="rounded-2xl overflow-hidden transition-all duration-700"
                style={{ border: `1px solid ${r(0.06)}` }}
              >
                <div
                  className="w-full aspect-[4/3]"
                  style={{
                    background: c.hex,
                    border: c.hex === "#FFFFFF" ? `1px solid ${r(0.1)}` : "none",
                  }}
                />
                <div className="p-4" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                  <span className="block mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: r(0.6) }}>
                    {c.hex}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}>
                    {c.rgb}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   9. CREATIVE PROCESS
   ═══════════════════════════════════════════ */
function ProcessSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("mya.process.label")}</SectionLabel>
        </FadeIn>

        <FadeIn>
          <div className="w-full rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.05)}` }}>
            <img src={imgProcess} alt="Creative process" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   10. MOCKUPS / APPLICATIONS
   ═══════════════════════════════════════════ */
function MockupsSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="mb-12">
          <SectionLabel>{t("mya.mockups.label")}</SectionLabel>
        </FadeIn>

        {/* Jewelry photo grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[img1, img2, img3, img4].map((src, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
                <img src={src} alt={`Jewelry ${i + 1}`} className="w-full object-contain" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Box mockups — side by side in a single white block */}
        <FadeIn delay={0.1} className="mb-3">
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden" style={{ background: "#fff" }}>
            <img src={imgBox2} alt="Box mockup" className="w-full md:w-1/2 object-cover block" />
            <img src={imgBox1} alt="Box mockup" className="w-full md:w-1/2 object-cover block" />
          </div>
        </FadeIn>

        {/* Ring mockup — no border, elegant floating showcase */}
        <FadeIn delay={0.2} className="mb-3">
          <div className="relative w-full max-w-2xl mx-auto">
            <motion.img
              src={imgRing}
              alt="Ring mockup"
              className="w-full rounded-2xl object-cover relative z-10"
              animate={{
                y: [0, -10, 0],
                rotateZ: [-1, 1, -1],
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Dynamic shadow underneath */}
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full z-0"
              style={{
                width: "60%",
                height: 18,
                background: isDark
                  ? `radial-gradient(ellipse, rgba(${ACCENT_RGB},0.18) 0%, transparent 70%)`
                  : `radial-gradient(ellipse, rgba(0,0,0,0.10) 0%, transparent 70%)`,
                filter: "blur(6px)",
              }}
              animate={{
                scaleX: [1, 0.92, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </FadeIn>

        {/* Keychain mockup */}
        <FadeIn delay={0.25}>
          <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.05)}` }}>
            <img src={imgKeychain} alt="Keychain mockup" className="w-full object-cover" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   11. FINAL
   ═══════════════════════════════════════════ */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("mya.final.label")}</SectionLabel>
        </FadeIn>

        {/* Final logo + small image */}
        <FadeIn className="w-full max-w-[22rem]">
          <div
            className="w-full rounded-2xl mb-10 transition-all duration-700 flex flex-col items-center justify-center"
            style={{
              aspectRatio: "1 / 1",
              background: isDark
                ? `linear-gradient(180deg, ${DARK_PURPLE} 0%, #0d0818 100%)`
                : `linear-gradient(180deg, #f3eaf5 0%, #ece2ef 100%)`,
            }}
          >
            <div className="w-[100px] md:w-[120px] mb-6">
              <svg viewBox="0 0 146 145.989" fill="none" className="w-full">
                <path d={svgPaths.p2e03cf00} fill={isDark ? "#fff" : DARK_PURPLE} />
              </svg>
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.15em", color: isDark ? "#fff" : DARK_PURPLE }}>
              MYA
            </span>
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
            {t("mya.final.text")}
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
            {t("mya.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */
export function ProjectMya() {
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
        {t("mya.back")}
      </ProjectBackButton>

      <FloatingFlowers />
      <div className="relative z-10">
        <HeroSection />
        <IntroSection />
        <ContextSection />
        <LogoSection />
        <IntentionSection />
        <ConstructionSection />
        <VariantsSection />
        <PaletteSection />
        <ProcessSection />
        <MockupsSection />
        <FinalSection />
      </div>
    </div>
  );
}
