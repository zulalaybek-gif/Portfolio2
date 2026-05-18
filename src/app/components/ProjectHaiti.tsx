import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

/* ── SVG imports ── */
import svgCover from "../../imports/svg-z79q94sk1z";
import svgLogo from "../../imports/svg-aatdl08gls";
import svgIcons from "../../imports/svg-1ye22s9tf9";

/* ── Photos from Logo Concept slide ── */
import imgCitadelle from "figma:asset/6d18d2ef8a3eeeb9f70821217d88f9f508bc53b9.png";
import imgOcean from "figma:asset/3ec36564db007833b12c20998652cd420608b701.png";
import imgMountains from "figma:asset/a325ffc1e8e3b5ce6d7905d7fd85be4557151cea.png";
import imgPeople from "figma:asset/c5bc96110de225685fb2b06c21807da6a07fae60.png";

/* ── Instagram mockup ── */
import imgInstagram from "figma:asset/4eb8e1986f3b781df2ce0ff2b30ecdcd6c4b2db6.png";

/* ── Story SVGs ── */
import svgStoryGreen from "../../imports/svg-5ll5yqgwlz";
import svgStoryPurple from "../../imports/svg-gogfr2uyx9";
import svgStoryRed from "../../imports/svg-0hajrz4y61";
import svgStoryCyan from "../../imports/svg-3lua1n9wnj";

/* ── Family 1 story images ── */
import imgStoryGreen from "figma:asset/696cb7a86f28ff04f82114d9515d7871273fbd62.png";
import imgStoryPurple from "figma:asset/3b9648be09ea60b1d9990360846fbfad3eb0808d.png";
import imgStoryRed from "figma:asset/220872f5833c484b0bf2ac122a4d6d96f6d0a5b6.png";
import imgStoryCyan from "figma:asset/cff2c457be731d193311f5e604f800876541297c.png";

/* ── Family 2 story images ── */
import imgStory2Red from "figma:asset/b8dbeba0f966fbcdd378595f889bb2f54b30dae3.png";
import imgStory2Purple from "figma:asset/695579629e0aab6f5abd699457193e7d913b502b.png";
import imgStory2Cyan from "figma:asset/f5de8856b81c621f737d721d9f4b01c46418e740.png";
import imgStory2Green from "figma:asset/9f56cf3aa0ae000f7b27290f6eb0af1181919e56.png";

/* ── Family 3 story images ── */
import imgStory3Purple from "figma:asset/3b9648be09ea60b1d9990360846fbfad3eb0808d.png";
import imgStory3Red from "figma:asset/68a7a892febcc95f0ce1d44fb3cc2994ea2e3201.png";
import imgStory3Cyan from "figma:asset/f1e1de17d3d9715ff6a8a6f1586ba3432bf73eae.png";
import imgStory3Green from "figma:asset/7dfc5227fe684e0be24dff8b1b8a78e17d67d54d.png";

/* ── Family 4 story images ── */
import imgStory4Purple from "figma:asset/9f6e52fbe67e0809b3647d493b18c78d35b8a030.png";
import imgStory4Red from "figma:asset/6662bc1082de6ddc6d86dd8f9a06404b3e386caa.png";
import imgStory4Cyan from "figma:asset/d5bcad09939f9c2d98e21dafaac61780350e5f7c.png";
import imgStory4Green from "figma:asset/16491a86c3006d109b4416f632a1c07350afbb38.png";

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
        className="uppercase tracking-[0.3em] block mb-4"
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
            className="uppercase tracking-[0.3em]"
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
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <SectionLabel text="01" />
          <SectionTitle text={t("haiti.direction.title")} color={PURPLE} />
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
          <SectionLabel text="02" />
          <SectionTitle text={t("haiti.enjeu.title")} color={RED} />
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
    </section>
  );
}

/* ══════════════════════════════════════════
   3. LOGO SECTION
   ══════════════════════════════════════════ */
function LogoSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="03" />
        <SectionTitle text={t("haiti.logo.title")} />

        <FadeIn>
          <div
            className="mt-8 rounded-3xl flex items-center justify-center py-16 px-8"
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
        <SectionLabel text="04" />
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
        <SectionLabel text="05" />
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
  const { t } = useI18n();
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
        <SectionLabel text="06" />
        <SectionTitle text={t("haiti.decli.title")} />
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
            {t("haiti.decli.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {variations.map((v, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.div
                className="rounded-2xl p-6 md:p-8 flex items-center justify-center aspect-[16/10]"
                style={{ background: v.bg }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-1">
                    <IconEducation size={24} color={v.iconColors[0]} />
                    <IconInformation size={24} color={v.iconColors[1]} />
                    <IconSovereignty size={24} color={v.iconColors[2]} />
                    <IconMigrants size={24} color={v.iconColors[3]} />
                  </div>
                  <div style={{ color: v.text }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", fontWeight: 600, lineHeight: 1.2 }}>
                      Collectif
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.1 }}>
                      Ha&#239;ti
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", fontWeight: 600, lineHeight: 1.2 }}>
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
        <SectionLabel text="07" />
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
        <SectionLabel text="08" />
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
  const links = [
    { label: "Site web (prototype Figma)", url: "https://www.figma.com/proto/IEQpcT3LJXFg0Vh5X66Gim/Collectif-Ha%C3%AFti-de-France?page-id=4%3A2&type=design&node-id=230-188&viewport=-382%2C393%2C0.08&t=yBIhMimf8JMiraKN-1&scaling=scale-down-width&starting-point-node-id=230%3A188&mode=design", displayUrl: "Prototype Figma", color: PURPLE },
    { label: "Vidéo", url: "https://www.youtube.com/watch?v=y1wARMgXyCE", displayUrl: "youtube.com", color: CYAN },
  ];
  return (
    <section id="section-liens" className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="11" />
        <SectionTitle text="Liens" />
        <div className="grid md:grid-cols-2 gap-6">
          {links.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <motion.a href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl p-8 flex items-center gap-6 no-underline" style={{ background: isDark ? r(0.04) : "#f8f8f8", border: `1px solid ${r(0.06)}` }} whileHover={{ scale: 1.03, y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: link.color }}>
                  <div className="grid grid-cols-2 gap-0.5">
                    <IconEducation size={12} color="white" />
                    <IconInformation size={12} color="white" />
                    <IconSovereignty size={12} color="white" />
                    <IconMigrants size={12} color="white" />
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: r(0.7) }}>{link.label}</div>
                  <div className="underline" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: link.color, marginTop: 4 }}>{link.displayUrl}</div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
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
        <SectionLabel text="09" />
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
        <SectionLabel text="10" />
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
            <motion.div
              className="rounded-3xl overflow-hidden max-w-sm"
              style={{
                boxShadow: isDark
                  ? "0 30px 80px rgba(0,0,0,0.4)"
                  : "0 30px 80px rgba(0,0,0,0.1)",
                clipPath: "inset(0 1px 0 0)",
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              <img
                src={imgInstagram}
                alt="Instagram mockup — Collectif Haïti de France"
                className="w-full h-auto"
              />
            </motion.div>
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
      type: "thematic" as const,
      items: [
        { bgColor: GREEN, image: imgStoryGreen, title: ["Agriculture", "responsable"], iconSvg: (<><path d={svgStoryGreen.p1929f80} fill={GREEN} /><path d={svgStoryGreen.p14b19b00} fill={GREEN} /></>), iconViewBox: "0 0 267.079 266", iconColor: GREEN, highlightColor: "#a4bd5a" },
        { bgColor: PURPLE, image: imgStoryPurple, title: ["Contribution", "à la modernisation", "du système éducatif"], iconSvg: (<><path d={svgStoryPurple.p2f083c00} fill={PURPLE} /><path d={svgStoryPurple.p36e8f2f0} fill={PURPLE} /><path d={svgStoryPurple.pc11c700} fill={PURPLE} /></>), iconViewBox: "0 0 267.652 266", iconColor: PURPLE, highlightColor: PURPLE },
        { bgColor: "#c2504c", image: imgStoryRed, title: ["Atelier", "répondre", "aux défis", "de la coopération", "avec Haïti"], iconSvg: (<><path d={svgStoryRed.p148a2f00} fill="#c2504c" /><path d={svgStoryRed.p3a415300} fill="#c2504c" /><path d={svgStoryRed.p12f54b80} fill="#c2504c" /><path d={svgStoryRed.p1068c500} fill="#c2504c" /><path d={svgStoryRed.p3d774000} fill="#c2504c" /></>), iconViewBox: "0 0 267 266", iconColor: "#c2504c", highlightColor: "#c2504c" },
        { bgColor: "#5ac0cb", image: imgStoryCyan, title: ["Environnement", "& changement", "climatique"], iconSvg: (<><path d={svgStoryCyan.p36e42b80} fill="#5ac0cb" /><path d={svgStoryCyan.p3881cdf0} fill="#5ac0cb" /><path d={svgStoryCyan.p2d014500} fill="#5ac0cb" /><path d={svgStoryCyan.p2747d380} fill="#5ac0cb" /><path d={svgStoryCyan.p1aa00f40} fill="#5ac0cb" /><path d={svgStoryCyan.p5ab7200} fill="#5ac0cb" /></>), iconViewBox: "0 0 267.163 266", iconColor: "#5ac0cb", highlightColor: "#4ea0a8" },
      ],
    },
    {
      label: "Articles",
      color: RED,
      type: "article" as const,
      items: [
        { color: "#c2504c", overlay: "rgba(89,20,17,0.24)", banner: "#c2504c", image: imgStory2Red, title: "Projet reconstruction l'habitat dans le sud CHF/AMG" },
        { color: "#a595c7", overlay: "rgba(71,62,88,0.34)", banner: "#a595c7", image: imgStory2Purple, title: "Une assemblée générale ordinaire conviviale et riche d'échanges constructifs" },
        { color: "#5ac0cb", overlay: "rgba(66,149,158,0.34)", banner: "#4ea0a8", image: imgStory2Cyan, title: "Eau potable pour Chambellan — une initiative pour s'inspirer" },
        { color: "#bcd176", overlay: "rgba(145,168,76,0.34)", banner: "#a4bd5a", image: imgStory2Green, title: "Un programme de formation gratuite" },
      ],
    },
    {
      label: "Les 5 actus",
      color: CYAN,
      type: "thematic" as const,
      items: [
        { bgColor: PURPLE, image: imgStory3Purple, title: ["Contribution", "à la modernisation", "du système éducatif"], iconSvg: (<><path d={svgStoryPurple.p2f083c00} fill={PURPLE} /><path d={svgStoryPurple.p36e8f2f0} fill={PURPLE} /><path d={svgStoryPurple.pc11c700} fill={PURPLE} /></>), iconViewBox: "0 0 267.652 266", iconColor: PURPLE, highlightColor: PURPLE },
        { bgColor: "#c2504c", image: imgStory3Red, title: ["Atelier", "répondre", "aux défis", "de la coopération", "avec Haïti"], iconSvg: (<><path d={svgStoryRed.p148a2f00} fill="#c2504c" /><path d={svgStoryRed.p3a415300} fill="#c2504c" /><path d={svgStoryRed.p12f54b80} fill="#c2504c" /><path d={svgStoryRed.p1068c500} fill="#c2504c" /><path d={svgStoryRed.p3d774000} fill="#c2504c" /></>), iconViewBox: "0 0 267 266", iconColor: "#c2504c", highlightColor: "#c2504c" },
        { bgColor: "#5ac0cb", image: imgStory3Cyan, title: ["Environnement", "& changement", "climatique"], iconSvg: (<><path d={svgStoryCyan.p36e42b80} fill="#5ac0cb" /><path d={svgStoryCyan.p3881cdf0} fill="#5ac0cb" /><path d={svgStoryCyan.p2d014500} fill="#5ac0cb" /><path d={svgStoryCyan.p2747d380} fill="#5ac0cb" /><path d={svgStoryCyan.p1aa00f40} fill="#5ac0cb" /><path d={svgStoryCyan.p5ab7200} fill="#5ac0cb" /></>), iconViewBox: "0 0 267.163 266", iconColor: "#5ac0cb", highlightColor: "#4ea0a8" },
        { bgColor: GREEN, image: imgStory3Green, title: ["Agriculture", "responsable"], iconSvg: (<><path d={svgStoryGreen.p1929f80} fill={GREEN} /><path d={svgStoryGreen.p14b19b00} fill={GREEN} /></>), iconViewBox: "0 0 267.079 266", iconColor: GREEN, highlightColor: "#a4bd5a" },
      ],
    },
    {
      label: "Chiffres clés",
      color: GREEN,
      type: "facts" as const,
      items: [
        { bgColor: "#edeaf4", textColor: "#8271a5", accentColor: PURPLE, image: imgStory4Purple, headline: "Le GARR* dit avoir recensé 56 884 migrants haïtiens rapatriés au cours du mois de juillet 2023.", sub: "*Groupe d'appui aux rapatriés et réfugiés" },
        { bgColor: "#ffe8e7", textColor: "#d74e49", accentColor: "#eb5c57", image: imgStory4Red, headline: "85% des maîtres de l'enseignement primaire sont non qualifiés", sub: "" },
        { bgColor: "#e3f5f8", textColor: "#42959e", accentColor: "#5ac0cb", image: imgStory4Cyan, headline: "Partenariat avec le Groupe Médialternatif et le Collectif Haïti de France.", sub: "Le Groupe Médialternatif vise à créer et contribuer à dynamiser des espaces de communication et d'information." },
        { bgColor: "#f7fbe9", textColor: "#91a84c", accentColor: "#b7d168", image: imgStory4Green, headline: "Le projet Manman Bèf", sub: "A ce jour, Manman Bèf c'est près de 500 investisseurs solidaires, 700 familles bénéficiaires et 1827 vaches en gardiennage!" },
      ],
    },
  ];

  const current = families[activeFamily];
  const dotColors = [NAVY, RED, CYAN, GREEN];

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="10b" />
        <SectionTitle text="Stories Instagram" />
        <FadeIn>
          <p className="max-w-2xl mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.35) }}>
            Chaque thématique d'action dispose de sa propre famille de stories, reprenant l'icône et la couleur associée sur des photographies en noir et blanc.
          </p>
        </FadeIn>

        {/* Dot selector */}
        <div className="flex items-center gap-4 mb-10">
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

        {/* Stories grid — animated swap */}
        <motion.div
          key={activeFamily}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {current.type === "thematic" && (current.items as any[]).map((s: any, i: number) => (
            <StoryCard key={`s-${activeFamily}-${i}`} {...s} delay={i * 0.08} />
          ))}

          {current.type === "article" && (current.items as any[]).map((s: any, i: number) => (
            <div key={`a-${i}`} className="rounded-2xl overflow-hidden relative" style={{ background: s.color, aspectRatio: "9/16", transition: "transform 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03) translateY(-5px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" style={{ mixBlendMode: "luminosity", opacity: 0.7 }} />
              <div className="absolute inset-0" style={{ background: s.overlay }} />
              <div className="absolute left-[8%] right-[8%] top-[42%] -translate-y-1/2 flex flex-col items-center">
                <div className="px-3 py-2" style={{ background: s.banner }}>
                  <span className="text-center block" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(0.55rem, 1.3vw, 0.75rem)", color: "white", textTransform: "uppercase", lineHeight: 1.4 }}>{s.title}</span>
                </div>
              </div>
              <div className="absolute bottom-[15%] left-0 right-0 flex items-center justify-center gap-2">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.5rem, 1.2vw, 0.7rem)", color: "white" }}>Lire notre article</span>
                <span style={{ color: "white", fontSize: "0.7rem" }}>→</span>
              </div>
            </div>
          ))}

          {current.type === "facts" && (current.items as any[]).map((s: any, i: number) => (
            <motion.div
              key={`f-${i}`}
              className="rounded-2xl overflow-hidden relative flex flex-col"
              style={{ background: s.bgColor, aspectRatio: "9/16" }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Badge #1 */}
              <div className="relative mx-[8%] mt-[8%] mb-[4%]">
                <div className="rounded-sm px-3 py-1.5 inline-block" style={{ background: s.accentColor, boxShadow: "0 1px 6px rgba(0,0,0,0.1)" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.6rem)", color: "white", textTransform: "uppercase" }}>#1</span>
                </div>
              </div>
              {/* Headline */}
              <div className="px-[8%] flex-1">
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "clamp(0.6rem, 1.4vw, 0.82rem)", color: s.textColor, lineHeight: 1.4 }}>{s.headline}</p>
                {s.sub && <p className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.45rem, 1vw, 0.6rem)", color: s.textColor, opacity: 0.7, lineHeight: 1.4 }}>{s.sub}</p>}
              </div>
              {/* Photo bottom */}
              <div className="mx-[8%] mb-[8%] rounded-lg overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={s.image} alt={s.headline} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}
        </motion.div>
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection />
      <DirectionSection />
      <LogoSection />
      <LogoConceptSection />
      <IconographySection />
      <DeclinationsSection />
      <PatternSection />
      <PaletteSection />
      <ApplicationsNavSection />
      <InstagramSection />
      <StoriesSection />
      <LinksSection />
      <ClosingSection />
      <div className="h-24" />
    </div>
  );
}
