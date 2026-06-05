import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

/* ── SVG imports ── */
import svgCover from "../../imports/svg-z79q94sk1z";
import svgLogo from "../../imports/svg-aatdl08gls";
import svgIcons from "../../imports/svg-1ye22s9tf9";

/* ── Photos from Logo Concept slide ── */
import imgCitadelle from "../../assets/collectif-haiti-de-france/01.image.png";
import imgOcean from "../../assets/collectif-haiti-de-france/02.image.png";
import imgMountains from "../../assets/collectif-haiti-de-france/03.image.png";
import imgPeople from "../../assets/collectif-haiti-de-france/04.image.png";

/* ── Project imagery ── */
import imgMockupSituation from "../../assets/collectif-haiti-de-france/05.mise-en-situation.png";
import imgInstagram from "../../assets/collectif-haiti-de-france/06.reseaux-sociaux-2.png";
import imgPrototypeHome from "../../assets/collectif-haiti-de-france/25.homepage.png";
import imgPrototypeMobile from "../../assets/collectif-haiti-de-france/26.notre-histoire.png";
import imgOldLogo from "../../assets/collectif-haiti-de-france/27.ancien-logo.JPG";
import imgOldWebsite from "../../assets/collectif-haiti-de-france/28.ancien-site-web.png";
import videoHaiti from "../../assets/collectif-haiti-de-france/29.collectif-haiti-france.mp4";

/* ── Story SVGs ── */
import svgStoryGreen from "../../imports/svg-5ll5yqgwlz";
import svgStoryPurple from "../../imports/svg-gogfr2uyx9";
import svgStoryRed from "../../imports/svg-0hajrz4y61";
import svgStoryCyan from "../../imports/svg-3lua1n9wnj";

/* ── Family 1 story images ── */
import imgStoryGreen from "../../assets/collectif-haiti-de-france/19.thematique.png";
import imgStoryPurple from "../../assets/collectif-haiti-de-france/20.thematique.png";
import imgStoryRed from "../../assets/collectif-haiti-de-france/21.thematique.png";
import imgStoryCyan from "../../assets/collectif-haiti-de-france/22.thematique.png";

/* ── Family 2 story images ── */
import imgStory2Red from "../../assets/collectif-haiti-de-france/15.article.png";
import imgStory2Purple from "../../assets/collectif-haiti-de-france/16.article.png";
import imgStory2Cyan from "../../assets/collectif-haiti-de-france/17.article.png";
import imgStory2Green from "../../assets/collectif-haiti-de-france/18.article.png";

/* ── Family 3 story images ── */
import imgStory3Purple from "../../assets/collectif-haiti-de-france/11.actu.png";
import imgStory3Red from "../../assets/collectif-haiti-de-france/12.actu.png";
import imgStory3Cyan from "../../assets/collectif-haiti-de-france/13.actu.png";
import imgStory3Green from "../../assets/collectif-haiti-de-france/14.actu.png";

/* ── Family 4 story images ── */
import imgStory4Purple from "../../assets/collectif-haiti-de-france/07.chiffres-cles.png";
import imgStory4Red from "../../assets/collectif-haiti-de-france/08.chiffres-cles.png";
import imgStory4Cyan from "../../assets/collectif-haiti-de-france/09.chiffres-cles.png";
import imgStory4Green from "../../assets/collectif-haiti-de-france/10.chiffres-cles.png";

/* ── Brand Colors ── */
const RED = "#DA655C";
const CYAN = "#75BEC9";
const GREEN = "#BCD176";
const PURPLE = "#A295C3";
const NAVY = "#003C75";

const PALETTE = [
  { color: RED, label: "Corail" },
  { color: CYAN, label: "Cyan" },
  { color: GREEN, label: "Vert" },
  { color: PURPLE, label: "Violet" },
  { color: NAVY, label: "Marine" },
];

/* ── Fade In wrapper ── */
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

/* ── Section Label ── */
function SectionLabel({ text }: { text: string }) {
  const { r } = useTheme();
  return (
    <FadeIn>
      <span
        className="section-eyebrow uppercase tracking-[0.3em] block mb-4"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
      >
        {text}
      </span>
    </FadeIn>
  );
}

/* ── Section Title ── */
function SectionTitle({ text, color }: { text: string; color?: string }) {
  const { r } = useTheme();
  return (
    <FadeIn>
      <h2
        className="mb-6"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
          fontWeight: 600,
          color: color || r(0.7),
          letterSpacing: "-0.03em",
        }}
      >
        {text}
      </h2>
    </FadeIn>
  );
}

function PhoneMockup({ image, alt, fit = "cover" }: { image: string; alt: string; fit?: "cover" | "contain" }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      className="relative w-full max-w-[315px] rounded-[2.4rem] p-[10px]"
      style={{
        aspectRatio: "390 / 844",
        background: isDark
          ? "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 38%, rgba(0,0,0,0.34))"
          : "linear-gradient(145deg, rgba(20,20,20,0.92), rgba(0,0,0,0.98))",
        boxShadow: isDark ? "0 30px 90px rgba(0,0,0,0.34)" : "0 30px 90px rgba(0,0,0,0.14)",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[98px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="h-full w-full overflow-hidden rounded-[1.85rem]" style={{ background: "#f8f8f8" }}>
        <img
          src={image}
          alt={alt}
          className="h-full w-full"
          style={{ objectFit: fit }}
          loading="lazy"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

function ScrollPhoneMockup({ image, alt }: { image: string; alt: string }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      className="relative w-full max-w-[330px] rounded-[2.5rem] p-[10px]"
      style={{
        aspectRatio: "390 / 844",
        background: isDark
          ? "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 38%, rgba(0,0,0,0.34))"
          : "linear-gradient(145deg, rgba(20,20,20,0.92), rgba(0,0,0,0.98))",
        boxShadow: isDark ? "0 30px 90px rgba(0,0,0,0.34)" : "0 30px 90px rgba(0,0,0,0.14)",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[98px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
      <div className="h-full w-full overflow-y-auto overflow-x-hidden rounded-[1.85rem]" style={{ background: "#f8f8f8", scrollbarWidth: "thin" }}>
        <img src={image} alt={alt} className="block w-full h-auto" loading="lazy" draggable={false} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   INDIVIDUAL ICON SVG COMPONENTS
   ══════════════════════════════════════════ */

/* Education icon (red cross/monument) */
function IconEducation({ size = 120, color = RED }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path d="M53.33 0H0V53.33H53.33V0Z" fill={color} />
      <path d={svgLogo.pbc7fc00} fill={color} />
      <path d="M160 0H106.67V53.33H160V0Z" fill={color} />
      <path d={svgLogo.p289fce70} fill={color} />
      <path d={svgLogo.p96cd600} fill={color} />
    </svg>
  );
}

/* Information icon (cyan waves) — 3 stacked wave pairs from the logo */
function IconInformation({ size = 120, color = CYAN }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      {/* Top wave pair */}
      <g transform="translate(0, 0)">
        <svg x="0" y="0" width="160" height="52.32" viewBox="0 0 160.03 52.32">
          <path d={svgLogo.p183b4e00} fill={color} />
          <path d={svgLogo.p22d25840} fill={color} />
        </svg>
      </g>
      {/* Middle wave pair */}
      <g transform="translate(0, 54)">
        <svg x="0" y="0" width="160" height="52.32" viewBox="0 0 160.03 52.32">
          <path d={svgLogo.p3688a900} fill={color} />
          <path d={svgLogo.p3a985680} fill={color} />
        </svg>
      </g>
      {/* Bottom wave pair */}
      <g transform="translate(0, 108)">
        <svg x="0" y="0" width="160" height="52.29" viewBox="0 0 160.03 52.29">
          <path d={svgLogo.p592c00} fill={color} />
          <path d={svgLogo.pf41a700} fill={color} />
        </svg>
      </g>
    </svg>
  );
}

/* Food sovereignty icon (green leaf) */
function IconSovereignty({ size = 120, color = GREEN }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path d={svgLogo.p175ec500} fill={color} />
      <path d={svgLogo.p1620ee80} fill={color} />
    </svg>
  );
}

/* Migrants rights icon (purple smiley) */
function IconMigrants({ size = 120, color = PURPLE }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <path d={svgLogo.p12e16250} fill={color} />
      <path d={svgLogo.pf86b680} fill={color} />
    </svg>
  );
}

/* ══════════════════════════════════════════
   COMPOSITE LOGO (4 icons grid + text)
   ══════════════════════════════════════════ */
function LogoComposite({ scale = 1 }: { scale?: number }) {
  const s = 80 * scale;
  const gap = 8 * scale;
  /* The original Figma logo is 309×127px. Icons take ~48% left, text ~52% right.
     We reproduce the exact same inset-based layout. */
  const W = 309 * scale;
  const H = 127 * scale;
  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* Icon grid — left ~48% */}
      {/* Education (top-left): inset-[0_81.49%_55.23%_0] */}
      <div className="absolute" style={{ top: 0, left: 0, right: `${81.49}%`, bottom: `${55.23}%` }}>
        <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
          <path d="M53.33 0H0V53.33H53.33V0Z" fill={RED} />
          <path d={svgLogo.pbc7fc00} fill={RED} />
          <path d="M160 0H106.67V53.33H160V0Z" fill={RED} />
          <path d={svgLogo.p289fce70} fill={RED} />
          <path d={svgLogo.p96cd600} fill={RED} />
        </svg>
      </div>
      {/* Information/waves (top-right): inset-[0_58.31%_55.24%_23.17%] */}
      <div className="absolute overflow-hidden" style={{ top: 0, left: `${23.17}%`, right: `${58.31}%`, bottom: `${55.24}%` }}>
        <svg className="absolute" style={{ top: 0, left: 0, width: "100%", height: "33%" }} viewBox="0 0 160.03 52.32" preserveAspectRatio="none" fill="none">
          <path d={svgLogo.p183b4e00} fill={CYAN} />
          <path d={svgLogo.p22d25840} fill={CYAN} />
        </svg>
        <svg className="absolute" style={{ top: "33.6%", left: 0, width: "100%", height: "33%" }} viewBox="0 0 160.03 52.32" preserveAspectRatio="none" fill="none">
          <path d={svgLogo.p3688a900} fill={CYAN} />
          <path d={svgLogo.p3a985680} fill={CYAN} />
        </svg>
        <svg className="absolute" style={{ top: "67.2%", left: 0, width: "100%", height: "33%" }} viewBox="0 0 160.03 52.29" preserveAspectRatio="none" fill="none">
          <path d={svgLogo.p592c00} fill={CYAN} />
          <path d={svgLogo.pf41a700} fill={CYAN} />
        </svg>
      </div>
      {/* Sovereignty/leaf (bottom-left): inset-[52.12%_81.49%_3.11%_0] */}
      <div className="absolute" style={{ top: `${52.12}%`, left: 0, right: `${81.49}%`, bottom: `${3.11}%` }}>
        <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
          <path d={svgLogo.p175ec500} fill={GREEN} />
          <path d={svgLogo.p1620ee80} fill={GREEN} />
        </svg>
      </div>
      {/* Migrants/smiley (bottom-right): inset-[52.12%_58.32%_3.11%_23.18%] */}
      <div className="absolute" style={{ top: `${52.12}%`, left: `${23.18}%`, right: `${58.32}%`, bottom: `${3.11}%` }}>
        <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
          <path d={svgLogo.p12e16250} fill={PURPLE} />
          <path d={svgLogo.pf86b680} fill={PURPLE} />
        </svg>
      </div>

      {/* Text — "Collectif": inset-[0.88%_0_74.53%_48.35%] */}
      <div className="absolute" style={{ top: `${0.88}%`, left: `${48.35}%`, right: 0, bottom: `${74.53}%` }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 446.47 87.91" preserveAspectRatio="xMinYMid meet" fill="none">
          <path d={svgLogo.p338618c0} fill="currentColor" />
          <path d={svgLogo.p24970600} fill="currentColor" />
          <path d={svgLogo.p22e1e200} fill="currentColor" />
          <path d={svgLogo.p37980cf0} fill="currentColor" />
          <path d={svgLogo.p18170400} fill="currentColor" />
          <path d={svgLogo.pf476800} fill="currentColor" />
          <path d={svgLogo.p1f832790} fill="currentColor" />
          <path d={svgLogo.p12dbe680} fill="currentColor" />
          <path d={svgLogo.p8ac1e00} fill="currentColor" />
        </svg>
      </div>
      {/* Text — "Haïti": inset-[31.89%_0.27%_24.9%_49.81%] */}
      <div className="absolute" style={{ top: `${31.89}%`, left: `${49.81}%`, right: `${0.27}%`, bottom: `${24.9}%` }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 431.57 154.45" preserveAspectRatio="xMinYMid meet" fill="none">
          <path d={svgLogo.p29b5f580} fill="currentColor" />
          <path d={svgLogo.p2cdcbe80} fill="currentColor" />
          <path d={svgLogo.p2ff51900} fill="currentColor" />
          <path d={svgLogo.p2d78800} fill="currentColor" />
          <path d={svgLogo.p27155780} fill="currentColor" />
        </svg>
      </div>
      {/* Text — "de France": inset-[80.31%_0.31%_0_48.22%] */}
      <div className="absolute" style={{ top: `${80.31}%`, left: `${48.22}%`, right: `${0.31}%`, bottom: 0 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 445.015 70.37" preserveAspectRatio="xMinYMid meet" fill="none">
          <path d={svgLogo.p95ec700} fill="currentColor" />
          <path d={svgLogo.p739200} fill="currentColor" />
          <path d={svgLogo.p7341b00} fill="currentColor" />
          <path d={svgLogo.pc06080} fill="currentColor" />
          <path d={svgLogo.p1976b00} fill="currentColor" />
          <path d={svgLogo.p20c3780} fill="currentColor" />
          <path d={svgLogo.p3e621740} fill="currentColor" />
          <path d={svgLogo.p39bc9500} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/* ════════════════════════════════���═════════
   DECORATIVE FLOATING SHAPES (from cover)
   ══════════════════════════════════════════ */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Purple arc — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1, y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ opacity: { duration: 1.5, delay: 0.5 }, scale: { duration: 1.5, delay: 0.5 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -left-[15%] -bottom-[10%]"
        style={{ width: 600, height: 320 }}
      >
        <svg viewBox="0 0 957.192 490.8" fill="none" className="w-full h-full" style={{ transform: "rotate(-150deg)" }}>
          <path d={svgCover.p35fa6300} fill={PURPLE} />
        </svg>
      </motion.div>

      {/* Green leaf — far top right */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 0.1, y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ opacity: { duration: 1.5, delay: 0.8 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, x: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -top-[5%] -right-[8%]"
        style={{ width: 240, height: 230 }}
      >
        <svg viewBox="0 0 440.108 425.917" fill="none" className="w-full h-full" style={{ transform: "rotate(-99deg)" }}>
          <path d={svgCover.p23946d30} fill={GREEN} />
        </svg>
      </motion.div>

      {/* Red square — bottom right */}
      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.08, rotate: [27, 35, 27] }}
        transition={{ opacity: { duration: 1.5, delay: 0.3 }, rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-[8%] right-[5%]"
        style={{ width: 110, height: 110 }}
      >
        <svg viewBox="0 0 308.972 308.972" fill="none" className="w-full h-full">
          <path d={svgCover.p17ef8480} fill={RED} />
        </svg>
      </motion.div>

      {/* Navy circle — mid-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: [1, 1.1, 1], y: [0, 8, 0] }}
        transition={{ opacity: { duration: 1.5, delay: 1 }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-[30%] right-[3%]"
        style={{ width: 65, height: 65 }}
      >
        <svg viewBox="0 0 207.889 207.608" fill="none" className="w-full h-full">
          <path d={svgCover.p7026b80} fill={NAVY} />
        </svg>
      </motion.div>

      {/* Cyan waves — right side, drifting */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.1, x: [0, -10, 0], y: [0, 6, 0] }}
        transition={{ opacity: { duration: 1.5, delay: 1.2 }, x: { duration: 8, repeat: Infinity, ease: "easeInOut" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-[55%] -right-[3%]"
        style={{ width: 200, height: 65 }}
      >
        <svg viewBox="0 0 345.292 112.889" fill="none" className="w-full h-full">
          <path d={svgCover.p28c9c7c0} fill={CYAN} />
          <path d={svgCover.p318a7a00} fill={CYAN} />
        </svg>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════
   1. HERO
   ══════════════════════════════════════════ */
function HeroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-12 pt-10 pb-20 overflow-hidden min-h-[70vh] flex flex-col justify-center">
      <FloatingShapes />

      {/* Ambient purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 50% 40% at 50% 40%, rgba(162,149,195,0.08) 0%, transparent 70%)`
            : `radial-gradient(ellipse 50% 40% at 50% 40%, rgba(162,149,195,0.12) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 mb-12 cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.3) }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {t("haiti.back")}
        </motion.button>

        <div className="flex items-start justify-between mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-eyebrow uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}
          >
            {t("haiti.hero.label")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.15) }}
          >
            {t("haiti.hero.year")}
          </motion.span>
        </div>

        {/* Logo composite — BEFORE the title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8"
          style={{ color: isDark ? r(0.85) : "#181818" }}
        >
          <LogoComposite scale={0.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.2rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: PURPLE }}>Collectif</span>{" "}
          <span style={{ color: r(0.7) }}>Ha&#239;ti</span>
          <br />
          <span style={{ color: r(0.5) }}>de France</span>
        </motion.h1>

        {/* Color palette strip */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 flex rounded-full overflow-hidden h-2 max-w-xs"
        >
          {PALETTE.map((p) => (
            <div key={p.color} className="flex-1 h-full" style={{ background: p.color }} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {["Workshop", "Identit\u00e9 Visuelle", "Branding", "Iconographie"].map((tag) => (
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
          {t("haiti.intro.desc")}
        </motion.p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2. DIRECTION VISUELLE + ENJEU
   ══════════════════════════════════════════ */
function DirectionSection() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-12 py-14">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span
            className="section-eyebrow uppercase tracking-[0.28em] block mb-8"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.22) }}
          >
            Introduction
          </span>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <FadeIn>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
                  fontWeight: 600,
                  color: PURPLE,
                }}
              >
                {t("haiti.direction.title")}
              </h2>
            </FadeIn>
          <FadeIn>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: r(0.35),
              }}
            >
              {t("haiti.direction.desc")}
            </p>
          </FadeIn>
        </div>
        <div>
          <FadeIn delay={0.08}>
            <h2
              className="mb-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
                fontWeight: 600,
                color: RED,
              }}
            >
              {t("haiti.enjeu.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: r(0.35),
              }}
            >
              {t("haiti.enjeu.desc")}
            </p>
          </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   2b. AVANT REFONTE
   ══════════════════════════════════════════ */
function BeforeRefonteSection() {
  const { r, isDark } = useTheme();

  const cards = [
    {
      image: imgOldLogo,
      title: "Ancien logo",
      desc: "Une base institutionnelle à clarifier pour mieux exprimer les axes d'action du collectif.",
      fit: "contain",
    },
    {
      image: imgOldWebsite,
      title: "Ancien site web",
      desc: "Une présence digitale à restructurer pour rendre l'information plus lisible et plus identifiable.",
      fit: "cover",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span
            className="section-eyebrow uppercase tracking-[0.28em] block mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.22) }}
          >
            État existant
          </span>
        </FadeIn>
        <SectionTitle text="Point de départ" color={NAVY} />
        <FadeIn>
          <p
            className="max-w-2xl mb-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            L'analyse de l'existant permet de séparer clairement ce qui relevait de l'ancien territoire visuel et ce que la refonte devait apporter : plus de structure, plus de cohérence et un système de repères immédiatement reconnaissable.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.08}>
              <motion.div
                className="rounded-3xl overflow-hidden h-full"
                style={{
                  background: isDark ? r(0.04) : "#f8f8f8",
                  border: `1px solid ${r(0.06)}`,
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="aspect-[16/10] overflow-hidden" style={{ background: isDark ? r(0.03) : "#fff" }}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full p-4"
                    style={{ objectFit: card.fit as "cover" | "contain", objectPosition: "top center" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 600, color: r(0.65) }}>
                    {card.title}
                  </h3>
                  <p className="mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.32) }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. SYSTEME COULEUR & PICTOGRAMMES
   ══════════════════════════════════════════ */
function VisualSystemSection() {
  const { r, isDark } = useTheme();

  const colors = [
    {
      title: "Rouge",
      theme: "Droit à l'éducation",
      color: RED,
      desc: "Repère les contenus liés à l'accès aux savoirs.",
    },
    {
      title: "Bleu",
      theme: "Droit à l'information",
      color: CYAN,
      desc: "Guide vers les ressources et la transmission.",
    },
    {
      title: "Vert",
      theme: "Souveraineté alimentaire",
      color: GREEN,
      desc: "Signale les sujets liés au vivant et à l'autonomie.",
    },
    {
      title: "Violet",
      theme: "Droits des migrants",
      color: PURPLE,
      desc: "Identifie les sujets d'accueil, de dignité et de protection.",
    },
    {
      title: "Bleu marine",
      theme: "Structure, contraste, cohérence globale",
      color: NAVY,
      desc: "Ancre l'identité et stabilise l'ensemble du système.",
    },
  ];

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Système visuel" />
        <SectionTitle text="Code couleur & repérage visuel" />
        <FadeIn>
          <div
            className="rounded-3xl p-6 md:p-8 mb-8"
            style={{
              background: isDark ? r(0.04) : "#f8f8f8",
              border: `1px solid ${r(0.06)}`,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.98rem, 1.6vw, 1.08rem)",
                lineHeight: 1.85,
                color: r(0.45),
              }}
            >
              L'identité visuelle repose sur un système de repères associant une couleur à une thématique. Ce principe permet d'identifier rapidement chaque axe d'action, que ce soit sur le site web, les publications, les vidéos ou les supports de communication.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {colors.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <motion.div
                className="rounded-2xl overflow-hidden h-full"
                style={{
                  background: isDark ? r(0.04) : "#fff",
                  border: `1px solid ${r(0.06)}`,
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="h-28 md:h-32" style={{ background: item.color }} />
                <div className="p-5">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>{item.color}</span>
                  <h3 className="mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 650, color: r(0.68) }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 min-h-[3.2rem]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", fontWeight: 600, lineHeight: 1.35, color: r(0.58) }}>
                    {item.theme}
                  </p>
                  <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.6, color: r(0.32) }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. LOGO SECTION
   ══════════════════════════════════════════ */
function LogoSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Logo" />
        <SectionTitle text="Nouveau logo & principe de construction" />
        <FadeIn>
          <p
            className="max-w-2xl mb-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            Le logo repose sur l'assemblage de quatre icônes complémentaires, chacune liée à une thématique et à une couleur. Chaque élément possède sa propre fonction dans l'identité, tout en participant à l'équilibre global du signe.
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="rounded-3xl flex items-center justify-center py-16 px-8"
            style={{
              background: isDark ? r(0.04) : "#f8f8f8",
              border: `1px solid ${r(0.06)}`,
            }}
          >
            <div style={{ color: isDark ? r(0.85) : "#181818" }}>
              <LogoComposite scale={0.7} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════
   4. LOGO CONCEPT (icons + photos grid)
   ══════════════════════════════════════════ */
function LogoConceptSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  const items = [
    { icon: <IconEducation size={100} />, img: imgCitadelle, label: "Le droit \u00e0 l'\u00e9ducation", color: RED },
    { icon: <IconInformation size={100} />, img: imgOcean, label: "Le droit \u00e0 l'information", color: CYAN },
    { icon: <IconSovereignty size={100} />, img: imgMountains, label: "La souverainet\u00e9 alimentaire", color: GREEN },
    { icon: <IconMigrants size={100} />, img: imgPeople, label: "Le respect des droits des migrants", color: PURPLE },
  ];

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Logo concept" />
        <SectionTitle text={t("haiti.logoConcept.title")} />
        <FadeIn>
          <p
            className="max-w-2xl mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            {t("haiti.logoConcept.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                {/* Icon */}
                <div
                  className="w-full aspect-square rounded-2xl flex items-center justify-center"
                  style={{
                    background: isDark ? r(0.04) : "#f8f8f8",
                    border: `1px solid ${r(0.06)}`,
                  }}
                >
                  {item.icon}
                </div>
                {/* Photo */}
                <motion.div
                  className="w-full aspect-square rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Label */}
                <span
                  className="text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: item.color,
                  }}
                >
                  {item.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   5. ICONOGRAPHIE
   ══════════════════════════════════════════ */
function IconographySection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  const icons = [
    { icon: <IconEducation size={120} />, label: "Le droit \u00e0 l'\u00e9ducation", color: "#c23f3b" },
    { icon: <IconInformation size={120} />, label: "Le droit \u00e0 l'information", color: "#42959e" },
    { icon: <IconSovereignty size={120} />, label: "La souverainet\u00e9 alimentaire", color: "#91a84c" },
    { icon: <IconMigrants size={120} />, label: "Le respect des droits des migrants", color: "#8271a5" },
  ];

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Iconographie" />
        <SectionTitle text={t("haiti.icono.title")} />
        <FadeIn>
          <p
            className="max-w-2xl mb-14"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            {t("haiti.icono.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {icons.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-8">
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.icon}
                </motion.div>
                <span
                  className="text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: item.color,
                  }}
                >
                  {item.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════���══════════
   6. DECLINAISONS (Color variations)
   ═════════════════════════════════════════ */
function DeclinationsSection() {
  const { r } = useTheme();

  const variations = [
    { bg: NAVY, iconColors: [RED, CYAN, GREEN, PURPLE], text: "white" },
    { bg: "#eb5c57", iconColors: ["white", "white", "white", "white"], text: "white" },
    { bg: "#b7d168", iconColors: ["white", "white", "white", "white"], text: "white" },
    { bg: "#5ac0cb", iconColors: ["white", "white", "white", "white"], text: "white" },
    { bg: "#a595c7", iconColors: ["white", "white", "white", "white"], text: "white" },
    { bg: "#f8f8f8", iconColors: [RED, CYAN, GREEN, PURPLE], text: "#181818" },
  ];

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Déclinaisons" />
        <SectionTitle text="Déclinaisons" />
        <FadeIn>
          <p
            className="max-w-2xl mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            Pensées comme un système modulable, les déclinaisons permettent au logo de s’adapter aux fonds, aux usages et aux supports sans perdre son identité.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {variations.map((v, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl p-5 md:p-7 flex items-center justify-center aspect-[16/10]"
                style={{ background: v.bg }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 md:gap-5 scale-110 md:scale-125">
                  <div className="grid grid-cols-2 gap-1.5">
                    <IconEducation size={32} color={v.iconColors[0]} />
                    <IconInformation size={32} color={v.iconColors[1]} />
                    <IconSovereignty size={32} color={v.iconColors[2]} />
                    <IconMigrants size={32} color={v.iconColors[3]} />
                  </div>
                  <div style={{ color: v.text }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.2 }}>
                      Collectif
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.05 }}>
                      Ha&#239;ti
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", fontWeight: 600, lineHeight: 1.2 }}>
                      de France
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   7. PATTERN
   ══════════════════════════════════════════ */
function PatternSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  /* Wide horizontal pattern — cycle E/S/I/M to never repeat side by side */
  const cycle = [IconEducation, IconSovereignty, IconInformation, IconMigrants];
  const cols = 10;
  const rows = 3;
  const patternIcons: React.ReactNode[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = (col + row) % 4;
      const Icon = cycle[idx];
      patternIcons.push(<Icon key={`p-${row}-${col}`} size={44} />);
    }
  }

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Motif" />
        <SectionTitle text={t("haiti.pattern.title")} />
        <FadeIn>
          <p
            className="max-w-2xl mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            {t("haiti.pattern.desc")}
          </p>
        </FadeIn>

        <FadeIn>
          <div
            className="relative rounded-3xl py-10 px-6 overflow-x-auto"
            style={{
              background: isDark ? r(0.04) : "#f8f8f8",
              border: `1px solid ${r(0.06)}`,
            }}
          >
            <div className="grid gap-4 md:gap-5 min-w-[800px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {patternIcons.map((icon, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   7b. MISE EN SITUATION
   ══════════════════════════════════════════ */
function MockupSituationSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span
            className="section-eyebrow uppercase tracking-[0.28em] block mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.22) }}
          >
            Application
          </span>
        </FadeIn>
        <SectionTitle text="Mise en situation" />
        <FadeIn>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: isDark ? r(0.04) : "#f8f8f8",
              border: `1px solid ${r(0.06)}`,
              boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.28)" : "0 28px 80px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={imgMockupSituation}
              alt="Mise en situation de l'identité Collectif Haïti de France"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   9. APPLICATIONS DE L'IDENTITE
   ══════════════════════════════════════════ */
function ApplicationsIdentitySection() {
  const { r, isDark } = useTheme();
  const figmaUrl = "https://www.figma.com/proto/IEQpcT3LJXFg0Vh5X66Gim/Collectif-Ha%C3%AFti-de-France?page-id=4%3A2&type=design&node-id=230-188&viewport=-382%2C393%2C0.08&t=yBIhMimf8JMiraKN-1&scaling=scale-down-width&starting-point-node-id=230%3A188&mode=design";
  const mobileFigmaUrl = "https://www.figma.com/proto/IEQpcT3LJXFg0Vh5X66Gim/Collectif-Ha%C3%AFti-de-France?node-id=290-824&viewport=-8910%2C1454%2C0.33&t=fpQcaYpiYTek55uE-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=320%3A1200&show-proto-sidebar=1&page-id=4%3A2";

  const cardStyle = {
    background: isDark ? r(0.04) : "#f8f8f8",
    border: `1px solid ${r(0.06)}`,
    boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.07)",
  };

  const Button = ({ label, href }: { label: string; href?: string }) => {
    const content = (
      <>
        {label}
        <ArrowUpRight size={14} />
      </>
    );

    const style = {
      background: NAVY,
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.72rem",
      fontWeight: 600,
    };

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={style}
        >
          {content}
        </a>
      );
    }

    return (
      <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-2"
      style={style}
    >
        {content}
      </span>
    );
  };

  return (
    <section id="section-applications" className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Prototypes" />
        <SectionTitle text="Prototypes web & mobile" />
        <FadeIn>
          <p className="max-w-2xl mb-12" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>
            Les prototypes montrent comment le système couleur et pictogramme guide la navigation, structure les contenus et rend chaque axe d'action rapidement identifiable sur les interfaces.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <FadeIn>
            <motion.div
              className="group block rounded-3xl overflow-hidden h-full cursor-pointer"
              style={cardStyle}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${r(0.06)}` }}>
                {[RED, GREEN, CYAN].map((color) => (
                  <span key={color} className="block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                ))}
                <span className="ml-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>
                  site web
                </span>
              </div>
              <div className="h-[330px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin", background: isDark ? r(0.02) : "#fff" }}>
                <img src={imgPrototypeHome} alt="Aperçu de la proposition de homepage Collectif Haïti de France" className="block w-full" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 650, color: r(0.68) }}>Site web</h3>
                <p className="mt-2 mb-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.34) }}>
                  Une refonte structurée autour des axes d'action, avec des couleurs qui guident la lecture.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button label="Version web" href={figmaUrl} />
                  <Button label="Version mobile" href={mobileFigmaUrl} />
                </div>
              </div>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <motion.div
              className="group block rounded-3xl overflow-hidden h-full"
              style={cardStyle}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="h-[330px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin", background: isDark ? r(0.02) : "#fff" }}>
                <img src={imgPrototypeMobile} alt="Aperçu mobile de la proposition Collectif Haïti de France" className="block w-full" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 650, color: r(0.68) }}>Prototype mobile</h3>
                <p className="mt-2 mb-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.34) }}>
                  Une version pensée pour vérifier la lisibilité du système sur un format plus contraint.
                </p>
                <Button label="Version mobile" href={mobileFigmaUrl} />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   8a. APPLICATIONS NAV (clickable cards that scroll to sections)
   ══════════════════════════════════════════ */
function ApplicationsNavSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const apps = [
    { label: "Site web", color: PURPLE, target: "section-liens" },
    { label: "Réseaux sociaux", color: RED, target: "section-reseaux" },
    { label: "Vidéo", color: CYAN, target: "section-liens" },
  ];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Applications" />
        <SectionTitle text={t("haiti.apps.title")} />
        <FadeIn><p className="max-w-2xl mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>{t("haiti.apps.desc")}</p></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <FadeIn key={app.label} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl p-8 flex flex-col items-center justify-center aspect-[4/3] cursor-pointer"
                style={{ background: app.color, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                whileHover={{ scale: 1.04, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => scrollTo(app.target)}
              >
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <IconEducation size={32} color="rgba(255,255,255,0.9)" />
                  <IconInformation size={32} color="rgba(255,255,255,0.9)" />
                  <IconSovereignty size={32} color="rgba(255,255,255,0.9)" />
                  <IconMigrants size={32} color="rgba(255,255,255,0.9)" />
                </div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "white" }}>{app.label}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   8b. LINKS SECTION (at the end)
   ══════════════════════════════════════════ */
function LinksSection() {
  const { r, isDark } = useTheme();
  return (
    <section id="section-liens" className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Prototype & vidéo" />
        <SectionTitle text="Prototype, vidéo & refonte" />
        <FadeIn>
          <p className="max-w-2xl mb-12" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>
            Aperçu du déploiement digital de l'identité : proposition de refonte web, vidéo de présentation et comparaison avec l'existant.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          <FadeIn>
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: isDark ? r(0.04) : "#f8f8f8",
                border: `1px solid ${r(0.06)}`,
                boxShadow: isDark ? "0 30px 90px rgba(0,0,0,0.28)" : "0 30px 90px rgba(0,0,0,0.08)",
              }}
            >
              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${r(0.06)}` }}>
                {[RED, GREEN, CYAN].map((color) => (
                  <span key={color} className="block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                ))}
                <span className="ml-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>
                  collectif-haiti-de-france.fr
                </span>
              </div>
              <div className="max-h-[620px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin" }}>
                <img src={imgPrototypeHome} alt="Aperçu de la proposition de homepage Collectif Haïti de France" className="block w-full" loading="lazy" />
              </div>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: isDark ? r(0.04) : "#f8f8f8",
                  border: `1px solid ${r(0.06)}`,
                }}
              >
                <div className="relative w-full aspect-video">
                  <iframe
                    title="Vidéo Collectif Haïti de France"
                    src="https://www.youtube-nocookie.com/embed/y1wARMgXyCE"
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden" style={{ background: isDark ? r(0.04) : "#f8f8f8", border: `1px solid ${r(0.06)}` }}>
                  <img src={imgOldLogo} alt="Ancien logo du Collectif Haïti de France" className="w-full aspect-[4/3] object-contain p-4" loading="lazy" />
                  <div className="px-4 pb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.3) }}>
                    Ancien logo
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ background: isDark ? r(0.04) : "#f8f8f8", border: `1px solid ${r(0.06)}` }}>
                  <img src={imgOldWebsite} alt="Ancienne page web avant refonte" className="w-full aspect-[4/3] object-cover object-top" loading="lazy" />
                  <div className="px-4 pb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.3) }}>
                    Site avant refonte
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   9. PALETTE
   ══════════════════════════════════════════ */
function PaletteSection() {
  const { r } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Palette" />
        <SectionTitle text="Palette" />

        <div className="flex gap-4 mt-8">
          {PALETTE.map((p, i) => (
            <FadeIn key={p.color} delay={i * 0.08} className="flex-1">
              <motion.div
                className="rounded-2xl aspect-[3/4] flex flex-col justify-end p-4"
                style={{ background: p.color }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "white",
                    opacity: 0.9,
                  }}
                >
                  {p.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {p.color}
                </span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   10. INSTAGRAM MOCKUP
   ══════════════════════════════════════════ */
function InstagramSection() {
  const { r, isDark } = useTheme();

  return (
    <section id="section-reseaux" className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Réseaux sociaux" />
        <SectionTitle text="Réseaux sociaux" />
        <FadeIn>
          <p
            className="max-w-2xl mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.35),
            }}
          >
            Déclinaison de l'identité visuelle sur le compte Instagram du Collectif Haïti de France, avec une grille cohérente mêlant les 4 thématiques d'action.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex justify-center">
            <PhoneMockup image={imgInstagram} alt="Réseaux sociaux — Collectif Haïti de France" fit="contain" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   10b. INSTAGRAM STORIES
   ══════════════════════════════════════════ */
function StoryCard({
  bgColor,
  image,
  title,
  iconSvg,
  iconViewBox,
  iconColor,
  highlightColor,
  delay = 0,
}: {
  bgColor: string;
  image: string;
  title: string[];
  iconSvg: React.ReactNode;
  iconViewBox: string;
  iconColor: string;
  highlightColor: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        style={{ background: bgColor, aspectRatio: "9/16" }}
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background photo */}
        <img
          src={image}
          alt={title.join(" ")}
          className="absolute inset-0 w-full h-full object-cover grayscale"
        />

        {/* Icon top-left */}
        <div className="absolute top-[2%] left-0 w-[25%] aspect-square">
          <svg className="w-full h-full" viewBox={iconViewBox} fill="none" preserveAspectRatio="xMinYMin meet">
            {iconSvg}
          </svg>
        </div>

        {/* Text overlay */}
        <div className="absolute bottom-[20%] left-[12%] right-[8%]">
          {title.map((line, i) => (
            <div
              key={i}
              className="inline-block mb-0.5"
              style={{
                background: i === 0 ? highlightColor : "transparent",
                padding: i === 0 ? "2px 8px" : "0 0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.6rem, 1.5vw, 0.85rem)",
                  color: "white",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                  display: "block",
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </FadeIn>
  );
}

function StoriesSection() {
  const { r, isDark } = useTheme();
  const [activeFamily, setActiveFamily] = useState(0);

  const families = [
    {
      label: "Thématiques",
      color: NAVY,
      items: [
        { image: imgStoryGreen, alt: "Story thématique agriculture responsable" },
        { image: imgStoryPurple, alt: "Story thématique éducation" },
        { image: imgStoryRed, alt: "Story thématique coopération" },
        { image: imgStoryCyan, alt: "Story thématique environnement" },
      ],
    },
    {
      label: "Articles",
      color: RED,
      items: [
        { image: imgStory2Red, alt: "Story article rouge" },
        { image: imgStory2Purple, alt: "Story article violet" },
        { image: imgStory2Cyan, alt: "Story article cyan" },
        { image: imgStory2Green, alt: "Story article vert" },
      ],
    },
    {
      label: "Les 5 actus",
      color: CYAN,
      items: [
        { image: imgStory3Purple, alt: "Story actualité violet" },
        { image: imgStory3Red, alt: "Story actualité rouge" },
        { image: imgStory3Cyan, alt: "Story actualité cyan" },
        { image: imgStory3Green, alt: "Story actualité vert" },
      ],
    },
    {
      label: "Chiffres clés",
      color: GREEN,
      items: [
        { image: imgStory4Purple, alt: "Story chiffre clé violet" },
        { image: imgStory4Red, alt: "Story chiffre clé rouge" },
        { image: imgStory4Cyan, alt: "Story chiffre clé cyan" },
        { image: imgStory4Green, alt: "Story chiffre clé vert" },
      ],
    },
  ];

  const current = families[activeFamily];
  const dotColors = [NAVY, RED, CYAN, GREEN];

  return (
    <section id="stories-instagram" className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span
            className="section-eyebrow uppercase tracking-[0.28em] block mb-4"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.22) }}
          >
            Supports réseaux sociaux
          </span>
        </FadeIn>
        <SectionTitle text="Stories Instagram" />
        <FadeIn>
          <p className="max-w-2xl mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>
            Les formats sociaux prolongent le même langage visuel : chaque famille de contenus reprend les codes de couleur et les repères graphiques associés, sans ajouter d'éléments parasites aux visuels fournis.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <FadeIn>
            <div className="flex justify-center lg:justify-start">
              <ScrollPhoneMockup image={imgInstagram} alt="Profil réseaux sociaux Collectif Haïti de France" />
            </div>
          </FadeIn>

          <div>
            {/* Dot selector */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              {families.map((fam, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFamily(i)}
                  className="flex items-center gap-2 cursor-pointer transition-all duration-300"
                  style={{ opacity: activeFamily === i ? 1 : 0.4 }}
                >
                  <motion.div
                    className="rounded-full"
                    style={{ background: dotColors[i], width: activeFamily === i ? 12 : 8, height: activeFamily === i ? 12 : 8 }}
                    animate={{ scale: activeFamily === i ? 1 : 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: activeFamily === i ? r(0.6) : r(0.25),
                      transition: "color 0.3s",
                    }}
                  >
                    {fam.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Stories grid — image assets only */}
            <motion.div
              key={activeFamily}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {current.items.map((s, i) => (
                <motion.div
                  key={`${activeFamily}-${i}`}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: isDark ? r(0.04) : "#f8f8f8",
                    border: `1px solid ${r(0.06)}`,
                    aspectRatio: "9/16",
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={s.image} alt={s.alt} className="h-full w-full object-contain" loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Vidéo" />
        <SectionTitle text="Support vidéo" />
        <FadeIn>
          <p className="max-w-2xl mb-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>
            Un support animé où le système d'icônes devient un langage de transition et de reconnaissance, séparé des prototypes pour garder une lecture plus claire des applications.
          </p>
        </FadeIn>
        <FadeIn>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: isDark ? r(0.04) : "#f8f8f8",
              border: `1px solid ${r(0.06)}`,
              boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.07)",
            }}
          >
            <div className="relative w-full aspect-video" style={{ background: isDark ? r(0.02) : "#fff" }}>
              <video
                src={videoHaiti}
                className="absolute inset-0 h-full w-full object-cover"
                controls
                preload="metadata"
                playsInline
              />
            </div>
            <div className="p-6">
              <a
                href={videoHaiti}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: NAVY,
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                }}
              >
                Ouvrir la vidéo
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CLOSING
   ══════════════════════════════════════════ */
function ClosingSection() {
  const { isDark, r } = useTheme();
  const { lang } = useI18n();
  const logoColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${PURPLE}, transparent)` }} />
          <div className="flex items-center justify-center gap-3 mb-6 opacity-40">
            <IconEducation size={24} color={logoColor} />
            <IconInformation size={24} color={logoColor} />
            <IconSovereignty size={24} color={logoColor} />
            <IconMigrants size={24} color={logoColor} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "Collectif Haïti de France — une identité visuelle complète pensée pour incarner la richesse culturelle et la solidarité."
              : "Collectif Haïti de France — a complete visual identity designed to embody cultural richness and solidarity."}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════ */
export function ProjectHaiti() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <DirectionSection />
      <BeforeRefonteSection />
      <LogoSection />
      <LogoConceptSection />
      <VisualSystemSection />
      <DeclinationsSection />
      <MockupSituationSection />
      <ApplicationsIdentitySection />
      <StoriesSection />
      <VideoSection />
      <ClosingSection />
      <div className="h-24" />
    </div>
  );
}
