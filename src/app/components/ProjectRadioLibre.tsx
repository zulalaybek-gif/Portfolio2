import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import { ProjectBackButton } from "./ProjectBackButton";
import { useAnimationActive } from "./useAnimationActive";

/* ── SVG element files (graphic elements provided by user) ── */
import elemDarkRaw from "../../imports/Fichier_2-2.svg?raw";
import elemLightRaw from "../../imports/Fichier_1-2.svg?raw";

/* ── Palette ── */
const BLUE = "#afd1ea";
const PURPLE = "#bea9cb";
const PEACH = "#ecb59f";

const PALETTE = [
  { hex: BLUE, name: "Bleu clair", rgb: "175,209,234" },
  { hex: PURPLE, name: "Violet doux", rgb: "190,169,203" },
  { hex: PEACH, name: "Pêche", rgb: "236,181,159" },
  { hex: "#1d1d1b", name: "Noir", rgb: "29,29,27" },
  { hex: "#ffffff", name: "Blanc", rgb: "255,255,255" },
];

/* ── SVG path data from Fichier_3/4 (the logo) ── */
const ICON_PATH = "m54.62,222.93v-25.09c-5.21-1.45-10.06-2.54-14.73-4.15-11.09-3.81-20-10.78-27.13-19.95-6.21-7.99-10.37-17.03-11.89-27.1-.59-3.93-.82-7.94-.84-11.92C-.03,115.1.12,95.47,0,75.84c-.11-17.4,4.58-33.27,15.43-46.91C32.56,7.42,55.04-2.22,82.49.43c19.74,1.9,35.91,10.98,48.67,25.96,10.09,11.84,16.15,25.69,16.9,41.26.73,15.27.44,30.59.47,45.88.02,9.72.19,19.47-.37,29.17-.9,15.33-5.96,29.36-14.63,42.08-9.67,14.19-22.42,24.66-38.17,31.38-12.8,5.46-26.26,7.5-40.73,6.77Zm-.72-39.21c0-3.48-.12-6.71.04-9.92.11-2.16-.51-3.14-2.75-3.77-15.14-4.29-25.4-18.03-25.4-33.72,0-21.04.02-42.08.07-63.12,0-1.91.09-3.84.39-5.71,4.05-25.22,24.8-42.3,50.31-41.45,25.35.84,46.14,22.36,46.16,47.76,0,20.79.03,41.58.02,62.38,0,13.47-3.82,25.72-11.91,36.55-7.45,9.97-16.89,17.38-28.77,21.33-4.61,1.53-9.4,2.52-14.04,3.73v11.53c1.15-.06,2.08.02,2.94-.18,5.64-1.36,11.47-2.25,16.86-4.29,13.86-5.24,25.14-14.06,33.8-26.16,8.67-12.11,13.44-25.61,13.63-40.47.27-21.95.17-43.91.09-65.87-.03-8.59-2.04-16.81-5.81-24.54C117.44,22.96,90.85,8.16,61.55,14.15c-28.09,5.75-48.47,31.35-48.5,60.17-.02,20.38-.04,40.75.07,61.13.08,15.05,5.82,27.62,17.22,37.49,6.68,5.79,14.4,9.42,23.57,10.77Zm13.28.69c4.53-1.27,8.69-1.88,12.37-3.55,19.32-8.76,29.71-23.78,30.03-45.11.31-20.2.12-40.42.1-60.62,0-10.4-3.44-19.44-11.25-26.47-10.92-9.85-23.54-12.7-37.19-7.08-14.02,5.78-21.89,16.8-22.25,32.02-.48,20.86-.14,41.74-.08,62.62.01,5.44,1.93,10.27,5.5,14.36,2.4,2.76,5.15,5.09,8.94,6.21.03-.73.08-1.21.07-1.69-.32-16.7-.67-33.4-.98-50.1-.2-10.97-.63-21.94-.46-32.91.15-10.45,9.51-21.22,22.79-20.82,12.87.39,21.89,10.2,21.91,23.08.03,20.54.08,41.08-.02,61.62-.02,3.29-.31,6.72-1.27,9.84-4.03,13.1-12.74,21.47-26.11,24.92-.81.21-1.99,1.14-2.03,1.78-.19,3.71-.09,7.43-.09,11.92Zm-.89-26.79c9.67-1.95,17.3-11.31,17.36-20.91.14-20.95.09-41.89.06-62.84,0-5.1-4.16-9.34-9.04-9.49-5.12-.16-9.38,3.76-9.66,9.05-.11,2.06.14,4.14.18,6.22.37,17.52.79,35.04,1.08,52.57.14,8.37.02,16.75.02,25.42Z";

const TEXT_PATHS = [
  "m192.69,88.96c1.12,4.59,2.85,8.31,7.19,8.31,1.49,0,3.22-.74,4.4-1.86l3.41,6.63c-2.85,2.23-5.21,3.72-9.67,3.72-10.29,0-13.45-11.53-13.95-16.12h-5.77v15.44h-9.55v-43.4h19.28c8.93,0,13.83,6.63,13.83,14.26,0,6.14-3.47,11.22-9.18,13.02Zm-5.89-7.01c3.41,0,5.46-2.48,5.46-6.08s-2.05-6.14-5.46-6.14h-8.49v12.21h8.49Z",
  "m207.76,105.08l16.74-43.4h9.36l16.99,43.4h-10.04l-3.1-8.12v.12h-17.05v-.12l-2.98,8.12h-9.92Zm15.5-15.87h11.72l-5.77-17.36-5.95,17.36Z",
  "m272.49,105.08h-16.24v-43.4h16.24c14.2,0,23.06,9.73,23.06,21.7s-8.87,21.7-23.06,21.7Zm0-35.77h-6.63v28.15h6.63c8.25,0,13.39-6.32,13.39-14.07s-5.15-14.07-13.39-14.07Z",
  "m312.79,105.08h-9.61v-43.4h9.61v43.4Z",
  "m342.92,61c12.4,0,22.5,10.04,22.5,22.38s-10.11,22.38-22.5,22.38-22.57-10.04-22.57-22.38,10.11-22.38,22.57-22.38Zm0,35.96c7.13,0,13.02-5.64,13.02-13.58s-5.89-13.58-13.02-13.58-13.08,5.64-13.08,13.58,5.89,13.58,13.08,13.58Z",
  "m198.09,154.45v7.63h-29.26v-43.4h9.61v35.77h19.65Z",
  "m214.08,162.08h-9.61v-43.4h9.61v43.4Z",
  "m248.87,139.57c5.21.93,9.05,5.83,9.05,10.29,0,7.38-6.14,12.21-15.38,12.21h-18.17v-43.46l16.31.06c8.8,0,15.25,4.46,15.25,11.84,0,3.66-2.42,7.44-7.07,9.05Zm-10.91-2.67c6.82,0,8.25-3.1,8.25-5.95,0-3.1-2.6-4.65-5.52-4.65h-6.7v10.6h3.97Zm-3.97,6.7v10.85h8.56c3.22,0,5.64-1.86,5.64-4.77s-1.18-6.08-9.18-6.08h-5.02Z",
  "m289.29,145.96c1.12,4.59,2.85,8.31,7.19,8.31,1.49,0,3.22-.74,4.4-1.86l3.41,6.63c-2.85,2.23-5.21,3.72-9.67,3.72-10.29,0-13.45-11.53-13.95-16.12h-5.77v15.44h-9.55v-43.4h19.28c8.93,0,13.83,6.63,13.83,14.26,0,6.14-3.47,11.22-9.18,13.02Zm-5.89-7.01c3.41,0,5.46-2.48,5.46-6.08s-2.05-6.14-5.46-6.14h-8.49v12.21h8.49Z",
  "m309.13,162.08v-43.4h28.83v7.63h-19.22v10.66h16.68v7.62h-16.68v9.86h19.22v7.63h-28.83Z",
];

/* ── Inline Logo Component ── */
function RadioLibreLogo({ className = "" }: { className?: string }) {
  const { isDark } = useTheme();
  const textColor = isDark ? "#ffffff" : "#1d1d1b";
  const uid = isDark ? "rlgd" : "rlgl";
  return (
    <svg viewBox="0 0 365.42 223.08" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={uid} x1="0" y1="111.54" x2="148.57" y2="111.54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#afd1ea" />
          <stop offset=".5" stopColor="#bea9cb" />
          <stop offset="1" stopColor="#ecb59f" />
        </linearGradient>
      </defs>
      <path fill={`url(#${uid})`} d={ICON_PATH} />
      {TEXT_PATHS.map((d, i) => (
        <path key={i} fill={textColor} d={d} />
      ))}
    </svg>
  );
}

/* ── Icon-only version of the logo ── */
function RadioLibreIcon({ className = "", fill }: { className?: string; fill?: string }) {
  const uid = "rli-" + Math.random().toString(36).slice(2, 6);
  return (
    <svg viewBox="0 0 148.57 223.08" className={className} xmlns="http://www.w3.org/2000/svg">
      {fill ? (
        <path fill={fill} d={ICON_PATH} />
      ) : (
        <>
          <defs>
            <linearGradient id={uid} x1="0" y1="111.54" x2="148.57" y2="111.54" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#afd1ea" />
              <stop offset=".5" stopColor="#bea9cb" />
              <stop offset="1" stopColor="#ecb59f" />
            </linearGradient>
          </defs>
          <path fill={`url(#${uid})`} d={ICON_PATH} />
        </>
      )}
    </svg>
  );
}

/* ── Helpers ── */
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "160px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
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

/* ── Radio waves CSS ── */
const radioWaveKeyframes = `
@keyframes rl-wave-pulse {
  0% { transform: scale(0.6); opacity: 0.7; }
  100% { transform: scale(1.4); opacity: 0; }
}
@keyframes rl-float-line {
  0%, 100% { transform: translateY(0) rotate(var(--rl-rot)); }
  50% { transform: translateY(-12px) rotate(var(--rl-rot)); }
}
`;

function sanitizeInlineSvg(svg: string) {
  return svg
    .replace(/<\?xml[^?]*\?>\s*/g, "")
    .replace(/<!doctype[\s\S]*?>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(?:href|xlink:href)\s*=\s*["']\s*(?:javascript:|data:text\/html)[^"']*["']/gi, "");
}

/* ═══════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opTitle = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 py-28">
      <style>{radioWaveKeyframes}</style>

      {/* Background radio waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              border: `1px solid`,
              borderColor: isDark ? `rgba(175,209,234,${0.08 - i * 0.012})` : `rgba(190,169,203,${0.12 - i * 0.018})`,
              animation: `rl-wave-pulse ${3 + i * 0.6}s ease-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "12%", y: "20%", w: 60, rot: -15, color: BLUE, delay: 0 },
          { x: "85%", y: "30%", w: 45, rot: 25, color: PURPLE, delay: 1.2 },
          { x: "8%", y: "70%", w: 35, rot: 40, color: PEACH, delay: 0.6 },
          { x: "90%", y: "75%", w: 50, rot: -30, color: BLUE, delay: 1.8 },
          { x: "25%", y: "85%", w: 30, rot: 10, color: PURPLE, delay: 2.4 },
          { x: "75%", y: "15%", w: 40, rot: -45, color: PEACH, delay: 0.3 },
        ].map((line, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: line.x,
              top: line.y,
              width: line.w,
              height: 2,
              background: line.color,
              opacity: isDark ? 0.15 : 0.2,
              ["--rl-rot" as string]: `${line.rot}deg`,
              transform: `rotate(${line.rot}deg)`,
              animation: `rl-float-line ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${line.delay}s`,
            }}
          />
        ))}
      </div>

      <motion.div className="relative z-10 flex flex-col items-center" style={{ y: yTitle, opacity: opTitle }}>
        {/* Inline SVG Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
          style={{ width: "clamp(260px, 45vw, 500px)" }}
        >
          <RadioLibreLogo className="w-full h-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-xl mb-8"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: r(0.35) }}
        >
          Identité visuelle complète pour une radio indépendante
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {["Identité visuelle", "Sprint créatif", "Logo", "Typographie", "Palette"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full"
              style={{ fontSize: "0.7rem", fontFamily: "'Inter', sans-serif", border: `1px solid ${r(0.08)}`, color: r(0.3) }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. INTRODUCTION
   ═══════════════════════════════════════════ */
function IntroSection() {
  const { r, p } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <SectionLabel>Le projet</SectionLabel>
          <h2
            className="mt-5 mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: p.text,
            }}
          >
            Une identité qui capte l'énergie d'une radio{" "}
            <span style={{ color: BLUE }}>jeune</span>,{" "}
            <span style={{ color: PURPLE }}>musicale</span> et{" "}
            <span style={{ color: PEACH }}>divertissante</span>.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p style={body}>
            Radio Libre est un projet d'identité visuelle réalisé dans le cadre d'un sprint créatif. La consigne consistait à concevoir en temps limité une identité pour une radio indépendante à la programmation jeune, musicale et divertissante, avec un rendu comprenant moodboard, recherches, piste finale, choix typographiques et ambiance colorée.
          </p>
        </FadeIn>

        {/* Equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Direction visuelle",
              text: "Le projet s'appuie sur un univers graphique souple, rythmé et accessible, en lien avec l'énergie de la radio et la diversité de sa programmation. Le système visuel mêle références au micro, aux ondes sonores et à l'empreinte, afin de construire une identité à la fois expressive, jeune et identifiable.",
            },
            {
              title: "Enjeu du projet",
              text: "L'enjeu était de créer une identité capable de traduire à la fois l'univers musical, la proximité avec les auditeurs et le ton vivant de la radio, tout en restant lisible et adaptable à différents supports — du print au digital, en passant par la signalétique.",
            },
          ].map((card, i) => (
            <FadeIn key={card.title} delay={0.15 + i * 0.05}>
              <div
                className="rounded-2xl p-8 h-full flex flex-col"
                style={{ background: r(0.02), border: `1px solid ${r(0.04)}` }}
              >
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 600, color: p.text }}
                >
                  {card.title}
                </h3>
                <p style={{ ...body, fontSize: "0.82rem", flex: 1 }}>{card.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. LOGO CONSTRUCTION
   ═══════════════════════════════════════════ */
function LogoConstructionSection() {
  const { isDark, r, p } = useTheme();
  const body = useBodyStyle();

  const concepts = [
    {
      label: "Micro",
      desc: "Le signe évoque la silhouette d'un micro de studio, symbole premier de la radio.",
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <ellipse cx="32" cy="20" rx="12" ry="16" fill="none" stroke="url(#cg1)" strokeWidth="2" />
          <line x1="32" y1="36" x2="32" y2="52" stroke="url(#cg1)" strokeWidth="2" />
          <path d="M22 48 L42 48" stroke="url(#cg1)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={BLUE} />
              <stop offset="100%" stopColor={PURPLE} />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      label: "Ondes",
      desc: "Les cercles concentriques traduisent la propagation des ondes sonores.",
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {[12, 20, 28].map((rr, i) => (
            <circle key={i} cx="32" cy="32" r={rr} fill="none" stroke="url(#cg2)" strokeWidth="1.5" opacity={1 - i * 0.25} />
          ))}
          <circle cx="32" cy="32" r="4" fill="url(#cg2)" />
          <defs>
            <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PURPLE} />
              <stop offset="100%" stopColor={PEACH} />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      label: "Empreinte",
      desc: "Les lignes concentriques rappellent une empreinte digitale — identité et proximité.",
      icon: (
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M ${20 + i * 3} ${44 - i * 4} Q 32 ${10 + i * 2} ${44 - i * 3} ${44 - i * 4}`}
              fill="none"
              stroke="url(#cg3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={1 - i * 0.2}
            />
          ))}
          <defs>
            <linearGradient id="cg3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={PEACH} />
              <stop offset="100%" stopColor={BLUE} />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel>Construction du logo</SectionLabel>
          <h2
            className="mt-5 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: p.text,
            }}
          >
            Micro. Ondes. Empreinte.
          </h2>
          <p style={{ ...body, maxWidth: "600px", marginBottom: "2.5rem" }}>
            Le logo a été pensé à partir de plusieurs références formelles : le micro de studio, les ondes sonores et l'empreinte humaine. Le signe laisse aussi apparaître les lettres R et L, en écho au nom Radio Libre.
          </p>
        </FadeIn>

        {/* Logo showcase */}
        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl p-10 md:p-16 flex flex-col items-center gap-12 mb-12"
            style={{
              background: isDark
                ? "linear-gradient(160deg, rgba(175,209,234,0.04) 0%, rgba(190,169,203,0.02) 50%, rgba(236,181,159,0.04) 100%)"
                : "linear-gradient(160deg, rgba(175,209,234,0.08) 0%, rgba(190,169,203,0.04) 50%, rgba(236,181,159,0.08) 100%)",
              border: `1px solid ${r(0.05)}`,
            }}
          >
            <div style={{ width: "clamp(180px, 35vw, 340px)" }}>
              <RadioLibreLogo className="w-full h-auto" />
            </div>

            {/* Variations */}
            <div className="flex items-stretch gap-6 flex-wrap justify-center">
              {[
                { label: "Sur fond sombre", bg: "#1d1d1b", border: undefined },
                { label: "Sur fond clair", bg: "#ffffff", border: `1px solid ${r(0.08)}` },
                { label: "Monochrome", bg: r(0.03), border: `1px solid ${r(0.06)}`, mono: true },
              ].map((v) => (
                <div key={v.label} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center p-2.5"
                    style={{ background: v.bg, border: v.border }}
                  >
                    <RadioLibreIcon
                      className="w-full h-full"
                      fill={(v as any).mono ? (isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)") : undefined}
                    />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.2) }}>{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3 concepts — same height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((c, i) => (
            <FadeIn key={c.label} delay={0.1 + i * 0.08}>
              <div
                className="rounded-2xl p-6 flex flex-col items-center text-center h-full"
                style={{ background: r(0.02), border: `1px solid ${r(0.04)}` }}
              >
                <div className="w-14 h-14 mb-4">{c.icon}</div>
                <h4 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: p.text }}>
                  {c.label}
                </h4>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: r(0.3), flex: 1 }}>
                  {c.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. PALETTE & TYPOGRAPHY
   ══════════════════════════════════════════ */
function PaletteTypoSection() {
  const { isDark, r, p } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── PALETTE ── */}
          <FadeIn>
            <div className="h-full flex flex-col">
              <SectionLabel>Palette chromatique</SectionLabel>
              <h3 className="mt-5 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: p.text }}>
                Doux mais dynamiques
              </h3>
              <p style={{ ...body, fontSize: "0.82rem", marginBottom: "1.5rem" }}>
                La palette associe des tons doux mais dynamiques. Les couleurs servent à donner du rythme à l'identité et à renforcer sa lisibilité, tout en gardant une impression légère et accessible.
              </p>

              <div className="flex gap-3 flex-1">
                {PALETTE.map((c) => (
                  <div key={c.hex} className="flex-1 flex flex-col">
                    <div
                      className="aspect-[1/1.5] rounded-xl mb-3 transition-transform duration-300 hover:scale-105"
                      style={{
                        background: c.hex,
                        border: c.hex === "#ffffff" ? `1px solid ${r(0.1)}` : undefined,
                        boxShadow: `0 4px 20px rgba(${c.rgb},0.15)`,
                      }}
                    />
                    <span className="block text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.6rem", color: r(0.35) }}>
                      {c.hex.toUpperCase()}
                    </span>
                    <span className="block text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.5rem", color: r(0.18) }}>
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Gradient strip */}
              <div className="mt-6 rounded-xl overflow-hidden" style={{ height: 6 }}>
                <div className="w-full h-full" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, ${PURPLE} 50%, ${PEACH} 100%)` }} />
              </div>
            </div>
          </FadeIn>

          {/* ── TYPOGRAPHY ── */}
          <FadeIn delay={0.15}>
            <div className="h-full flex flex-col">
              <SectionLabel>Typographies</SectionLabel>
              <h3 className="mt-5 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: p.text }}>
                Filson Pro & Avenir
              </h3>
              <p style={{ ...body, fontSize: "0.82rem", marginBottom: "1.5rem" }}>
                La typographie du logo et des titres est Filson Pro, choisie pour son caractère impactant mais aussi plus libre et plus souple. La police Avenir complète le système pour les textes courants.
              </p>

              <div className="space-y-4 flex-1 flex flex-col">
                {/* Filson Pro */}
                <div className="rounded-2xl p-6 flex-1" style={{ background: r(0.02), border: `1px solid ${r(0.04)}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.2), letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
                      Titres & Logo
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2rem", fontWeight: 700, color: p.text, letterSpacing: "-0.02em" }}>
                    Filson Pro
                  </div>
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                      <span key={l} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: r(0.25) }}>{l}</span>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => (
                      <span key={l} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: r(0.2) }}>{l}</span>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {"0123456789!@#$%&".split("").map((l, i) => (
                      <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", color: r(0.15) }}>{l}</span>
                    ))}
                  </div>

                  {/* Weight labels */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Bold", "Heavy", "Black"].map((w) => (
                      <span
                        key={w}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.5rem",
                          color: r(0.25),
                          padding: "3px 10px",
                          borderRadius: 20,
                          border: `1px solid ${r(0.06)}`,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Avenir */}
                <div className="rounded-2xl p-6 flex-1" style={{ background: r(0.02), border: `1px solid ${r(0.04)}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.2), letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
                      Corps de texte
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", fontWeight: 400, color: p.text }}>
                    Avenir
                  </div>
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
                      <span key={l} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.25) }}>{l}</span>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => (
                      <span key={l} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.2) }}>{l}</span>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {"0123456789!@#$%&".split("").map((l, i) => (
                      <span key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.15) }}>{l}</span>
                    ))}
                  </div>

                  {/* Weight labels */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Book", "Roman", "Medium"].map((w) => (
                      <span
                        key={w}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.5rem",
                          color: r(0.25),
                          padding: "3px 10px",
                          borderRadius: 20,
                          border: `1px solid ${r(0.06)}`,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. ÉLÉMENTS GRAPHIQUES (real SVGs from user)
   ═══════════════════════════════════════════ */
function ElementsSection() {
  const { isDark, r, p } = useTheme();
  const body = useBodyStyle();
  const rawSvg = isDark ? elemDarkRaw : elemLightRaw;
  const svgContent = sanitizeInlineSvg(rawSvg).trim();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel>Éléments graphiques</SectionLabel>
          <h2
            className="mt-5 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: p.text,
            }}
          >
            Continuité visuelle
          </h2>
          <p style={{ ...body, maxWidth: "600px", marginBottom: "2.5rem" }}>
            Des éléments graphiques complémentaires ont été développés à partir des lignes du logo afin d'étendre l'identité sur d'autres supports et de lui apporter une continuité visuelle.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl overflow-hidden p-8 md:p-12 flex items-center justify-center"
            style={{
              background: isDark
                ? "linear-gradient(160deg, rgba(175,209,234,0.03) 0%, rgba(190,169,203,0.015) 50%, rgba(236,181,159,0.03) 100%)"
                : "linear-gradient(160deg, rgba(175,209,234,0.06) 0%, rgba(190,169,203,0.03) 50%, rgba(236,181,159,0.06) 100%)",
              border: `1px solid ${r(0.05)}`,
            }}
          >
            <div
              className="max-w-sm [&>svg]:w-full [&>svg]:h-auto [&>svg]:block"
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{ lineHeight: 0 }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. INTERACTIVE SOUND STRINGS — cursor-reactive
   ═══════════════════════════════════════════ */
const NUM_STRINGS = 28;
const STRING_COLORS = [BLUE, PURPLE, PEACH];

function SoundStringsCanvas() {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isAnimationActive = useAnimationActive(canvasRef);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const stringsRef = useRef<Array<{ phase: number; freq: number; amp: number; damping: number; color: string; baseY: number }>>(
    Array.from({ length: NUM_STRINGS }, (_, i) => ({
      phase: Math.random() * Math.PI * 2,
      freq: 0.8 + Math.random() * 1.5,
      amp: 0,
      damping: 0.94 + Math.random() * 0.04,
      color: STRING_COLORS[i % 3],
      baseY: (i + 1) / (NUM_STRINGS + 1),
    }))
  );
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isAnimationActive) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;

      const strings = stringsRef.current;
      for (let s = 0; s < strings.length; s++) {
        const str = strings[s];
        const sy = str.baseY * h;
        const dist = Math.abs(my * h - sy) / h;

        // Pluck: cursor proximity excites the string
        if (active && dist < 0.08) {
          const excite = (1 - dist / 0.08) * 18;
          str.amp = Math.min(str.amp + excite * 0.3, 22);
          str.phase = t * str.freq;
        }

        // Dampen
        str.amp *= str.damping;
        if (str.amp < 0.05) str.amp = 0;

        // Idle subtle breathing
        const idleAmp = 1.2 + Math.sin(t * 0.4 + s * 0.5) * 0.6;
        const totalAmp = str.amp + idleAmp;

        // Draw string
        ctx.beginPath();
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const px = (i / steps) * w;
          const nx = i / steps; // 0→1
          // Envelope: stronger in middle, zero at edges
          const envelope = Math.sin(nx * Math.PI);
          // Cursor proximity along X influences the wave shape
          const xProx = active ? Math.exp(-((nx - mx) ** 2) * 12) : 0;
          const wave =
            Math.sin(nx * Math.PI * 3 + str.phase + t * str.freq) * totalAmp * envelope +
            Math.sin(nx * Math.PI * 5 + t * 0.7 + s) * idleAmp * 0.5 * envelope +
            xProx * str.amp * 3 * Math.sin(t * 8 + s);

          const py = sy + wave;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Parse color to rgba
        const opacity = isDark
          ? 0.12 + (str.amp / 22) * 0.35
          : 0.08 + (str.amp / 22) * 0.25;
        ctx.strokeStyle = str.color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 1 + (str.amp / 22) * 1.2;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Glow on active strings
        if (str.amp > 2) {
          ctx.save();
          ctx.shadowColor = str.color;
          ctx.shadowBlur = str.amp * 1.5;
          ctx.globalAlpha = (str.amp / 22) * 0.15;
          ctx.stroke();
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      // Cursor ripple ring
      if (active) {
        const ringR = 30 + Math.sin(t * 3) * 8;
        ctx.beginPath();
        ctx.arc(mx * w, my * h, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = PURPLE;
        ctx.globalAlpha = isDark ? 0.08 : 0.06;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isDark, isAnimationActive]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = (e.clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full rounded-3xl cursor-crosshair"
      style={{ height: "clamp(280px, 40vw, 480px)", display: "block" }}
    />
  );
}

function SoundStringsSection() {
  const { isDark, r, p } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <SectionLabel>Interaction</SectionLabel>
          <h2
            className="mt-5 mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: p.text,
            }}
          >
            Cordes sonores
          </h2>
          <p style={{ ...body, maxWidth: "600px", marginBottom: "2.5rem" }}>
            Déplacez le curseur sur la zone ci-dessous pour faire vibrer les cordes. Chaque ligne réagit à la proximité et à la vitesse du mouvement — une traduction visuelle de l'énergie sonore de la radio.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: isDark
                ? "linear-gradient(160deg, rgba(175,209,234,0.02) 0%, rgba(190,169,203,0.01) 50%, rgba(236,181,159,0.02) 100%)"
                : "linear-gradient(160deg, rgba(175,209,234,0.04) 0%, rgba(190,169,203,0.02) 50%, rgba(236,181,159,0.04) 100%)",
              border: `1px solid ${r(0.05)}`,
            }}
          >
            <SoundStringsCanvas />
          </div>
          <p
            className="mt-4 text-center"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.15) }}
          >
            Survolez pour interagir
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. CLOSING SECTION
   ═══════════════════════════════════════════ */
function ClosingSection() {
  const { isDark, r } = useTheme();
  const { lang } = useI18n();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${PURPLE}, transparent)` }} />
          <div className="w-20 mx-auto mb-6 opacity-20">
            <RadioLibreIcon className="w-full h-auto" fill={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "Radio Libre — une identité visuelle conçue lors d'un sprint créatif, entre ondes, empreinte et énergie musicale."
              : "Radio Libre — a visual identity crafted during a creative sprint, blending radio waves, fingerprint and musical energy."}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════ */
export function ProjectRadioLibre() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <div className="relative w-full overflow-hidden">
      <ProjectBackButton
        delay={0.3}
        top="7rem"
        onClick={() => navigate("/projects")}
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          background: r(0.03),
          border: `1px solid ${r(0.08)}`,
          fontSize: "0.75rem",
          color: r(0.4),
        }}
      >
        {t("rl.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <LogoConstructionSection />
      <PaletteTypoSection />
      <ElementsSection />
      <SoundStringsSection />
      <ClosingSection />
    </div>
  );
}
