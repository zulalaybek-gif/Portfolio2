import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import svgLogoSncf from "../../imports/svg-xsk7542b73";
import svgSlideIcons from "../../imports/svg-8lle55gqj4";

import imgPhone1 from "../../assets/sncf-connect/01.splash-screen.png";
import imgPhone2 from "../../assets/sncf-connect/02.creez-vos-routines.png";
import imgPhone3 from "../../assets/sncf-connect/03.personnalisez-l-accueil.png";
import imgPhone4 from "../../assets/sncf-connect/04.parametrage.png";
import imgRoutineCreate from "../../assets/sncf-connect/05.creaton-routine.png";
import imgRoutineList from "../../assets/sncf-connect/06.mes-routines.png";
import imgNewsletter from "../../assets/sncf-connect/07.newsletter.png";
import imgCampaignPink from "../../assets/sncf-connect/10.jeu-concours-insta-rose.png";
import imgCampaignBlue from "../../assets/sncf-connect/16.jeu-concours-insta-bleu.png";
import imgSpotifyDark from "../../assets/sncf-connect/11.playlist-spotify-sombre.png";
import imgSpotifyLight from "../../assets/sncf-connect/12.playlist-spotify-clair.png";
import imgSpotifyMain from "../../assets/sncf-connect/13.playlist-spotify.png";
import videoMain from "../../assets/sncf-connect/14.video-finale-workshop.mp4";
import lineAsset from "../../assets/sncf-connect/assets/03.line.svg";
import lineAssetWide from "../../assets/sncf-connect/assets/04.line.svg";
import lineAssetLoop from "../../assets/sncf-connect/assets/05.line.svg";
import lineAssetLong from "../../assets/sncf-connect/assets/06.line.svg";
import trainAsset from "../../assets/sncf-connect/assets/07.train.svg";
import ampouleAsset from "../../assets/sncf-connect/assets/08.ampoule.svg";
import vehiculesAsset from "../../assets/sncf-connect/assets/10.vehicules.svg";
import maisonAsset from "../../assets/sncf-connect/assets/11.picto-maison.svg";
import horlogeAsset from "../../assets/sncf-connect/assets/12.picto-horloge.svg";
import trajetAsset from "../../assets/sncf-connect/assets/16.picto-trajet.svg";
import traficAsset from "../../assets/sncf-connect/assets/17.picto-trafic.svg";

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

const UGC_URL = "https://www.youtube.com/embed/_AJf2dtOLtQ";

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
            className="section-eyebrow uppercase tracking-[0.3em]"
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

function SceneName({ children, className = "" }: { children: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`pointer-events-none absolute z-20 uppercase tracking-[0.34em] ${className}`}
      style={{ color: "rgba(141,232,254,0.72)", fontFamily: "'Inter', sans-serif", fontSize: "0.66rem", fontWeight: 700 }}
    >
      {children}
    </motion.span>
  );
}

function StructuralLine({
  src = lineAssetWide,
  className = "",
  flip = false,
  rotate = 0,
  opacity = 0.42,
}: {
  src?: string;
  className?: string;
  flip?: boolean;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute max-w-none select-none ${className}`}
      style={{
        opacity,
        transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)`,
        filter: "drop-shadow(0 0 18px rgba(141,232,254,0.34))",
      }}
      animate={{ x: [0, 34, 0], y: [0, -10, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function GlobalParticleField({ active = false, mood = "cyan" }: { active?: boolean; mood?: "cyan" | "pink" | "blue" }) {
  const color = mood === "pink" ? "#FF72B8" : mood === "blue" ? "#2D8CFF" : ACCENT;
  const dots = Array.from({ length: active ? 150 : 72 });
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 61) % 100;
        const size = 1.2 + (i % 5) * 0.55;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 4 === 0 ? color : "rgba(255,255,255,0.64)",
              boxShadow: `0 0 ${active ? 22 : 9}px ${color}${active ? "80" : "3f"}`,
            }}
            animate={{
              x: active ? [0, i % 2 ? 62 : -54, 0] : [0, i % 2 ? 12 : -12, 0],
              y: active ? [0, -72 - (i % 9) * 10, 16, 0] : [0, -14, 0],
              opacity: active ? [0.08, 0.58, 0.12] : [0.04, 0.2, 0.04],
              scale: active ? [0.7, 1.65, 0.85] : [0.7, 1, 0.7],
            }}
            transition={{
              duration: active ? 3.2 + (i % 5) * 0.34 : 9 + (i % 7),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 17) * 0.07,
            }}
          />
        );
      })}
    </div>
  );
}

function FloatingMockup({ src, alt, className = "", delay = 0 }: { src: string; alt: string; className?: string; delay?: number }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`select-none ${className}`}
      initial={{ opacity: 0, y: 70, scale: 0.94, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ filter: `drop-shadow(0 42px 62px rgba(0,0,0,0.38)) drop-shadow(0 0 30px rgba(${ACCENT_RGB},0.16))` }}
    />
  );
}

function FloatingIcon({ src, className = "", delay = 0 }: { src: string; className?: string; delay?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      initial={{ opacity: 0, scale: 0.86 }}
      whileInView={{ opacity: 0.32, scale: 1 }}
      viewport={{ once: true }}
      animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ filter: `drop-shadow(0 0 16px rgba(${ACCENT_RGB},0.26))` }}
    />
  );
}

function SceneGlow({ className = "", color = ACCENT_RGB, opacity = 0.18 }: { className?: string; color?: string; opacity?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: `rgba(${color},${opacity})` }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.78, 0.45] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function OnboardingScene() {
  const { isDark, r } = useTheme();
  const onboardingScreens = [
    {
      src: imgPhone1,
      alt: "Splash screen SNCF Connect",
      step: "01",
      label: "Découvrir\nla fonctionnalité",
    },
    {
      src: imgPhone2,
      alt: "Créer vos routines",
      step: "02",
      label: "Comprendre\nles bénéfices",
    },
    {
      src: imgPhone3,
      alt: "Personnaliser l'accueil",
      step: "03",
      label: "Se projeter\ndans son usage",
    },
    {
      src: imgPhone4,
      alt: "Paramétrage",
      step: "04",
      label: "Personnaliser\ndès le départ",
    },
  ];
  const textColor = isDark ? "#F6FAFF" : "#071322";
  const mutedColor = isDark ? "rgba(230,240,255,0.68)" : "rgba(7,19,34,0.62)";
  const lineBase = isDark ? "rgba(141,232,254,0.24)" : "rgba(0,44,76,0.14)";

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 hidden h-56 w-[58vw] max-w-[58rem] lg:block"
        viewBox="0 0 900 240"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true, margin: "120px 0px" }}
      >
        <motion.path
          d="M0 42 H560 C642 42 621 152 702 164 C782 176 800 66 900 46"
          stroke="url(#onboarding-curve)"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{ d: ["M0 42 H560 C642 42 621 152 702 164 C782 176 800 66 900 46", "M0 42 H555 C640 42 624 142 705 156 C790 171 806 72 900 48", "M0 42 H560 C642 42 621 152 702 164 C782 176 800 66 900 46"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="onboarding-curve" x1="0" y1="42" x2="900" y2="164" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8DE8FE" stopOpacity={isDark ? "0.22" : "0.36"} />
            <stop offset="0.72" stopColor="#8DE8FE" stopOpacity={isDark ? "0.9" : "0.62"} />
            <stop offset="1" stopColor="#9E55FF" stopOpacity={isDark ? "0.9" : "0.52"} />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[48%] h-px w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          transformOrigin: "left",
          background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.18), rgba(141,232,254,0.5), transparent)`,
          boxShadow: `0 0 28px rgba(${ACCENT_RGB},0.25)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="mb-10 flex items-center gap-4">
              <span
                className="rounded-full px-4 py-1.5 uppercase tracking-[0.16em]"
                style={{
                  border: `1px solid rgba(${ACCENT_RGB},${isDark ? 0.42 : 0.58})`,
                  color: ACCENT,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  boxShadow: `0 0 22px rgba(${ACCENT_RGB},${isDark ? 0.12 : 0.16})`,
                }}
              >
                01. Onboarding
              </span>
              <motion.span
                className="hidden h-px w-36 sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                style={{
                  transformOrigin: "left",
                  background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.9), rgba(${ACCENT_RGB},0.18))`,
                }}
              />
              <span className="hidden h-1.5 w-1.5 rounded-full sm:block" style={{ background: ACCENT, boxShadow: `0 0 14px rgba(${ACCENT_RGB},0.8)` }} />
            </div>
            <h2
              style={{
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.4rem, 5.2vw, 4.85rem)",
                fontWeight: 750,
                lineHeight: 0.95,
                letterSpacing: "-0.055em",
              }}
            >
              Un onboarding
              <br />
              pensé pour <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.28)` }}>guider</span>
              <br />
              et <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.28)` }}>inspirer</span>
            </h2>
            <p
              className="mt-8 max-w-[24rem]"
              style={{
                color: mutedColor,
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              Un parcours progressif pour expliquer la valeur des routines et donner envie de personnaliser son expérience dès le premier lancement.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[48%] hidden h-px md:block"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.16), rgba(112,93,255,0.18), transparent)`,
              boxShadow: `0 0 28px rgba(${ACCENT_RGB},0.18)`,
            }}
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {onboardingScreens.map((screen, index) => (
              <motion.img
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                className="relative z-10 mx-auto w-[min(17rem,76vw)] select-none sm:w-[16rem] lg:w-full"
                initial={{ opacity: 0, y: 46, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "120px 0px" }}
                transition={{ duration: 0.78, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  filter: `drop-shadow(0 34px 50px rgba(0,0,0,${isDark ? 0.5 : 0.2})) drop-shadow(0 0 20px rgba(${ACCENT_RGB},${isDark ? 0.15 : 0.2}))`,
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl">
            <motion.div
              className="absolute left-[9%] right-[9%] top-5 h-px"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 1.25, ease: "easeOut" }}
              style={{
                transformOrigin: "left",
                background: "linear-gradient(90deg, #8DE8FE 0%, #786BFF 48%, #D15CFD 100%)",
                boxShadow: `0 0 18px rgba(${ACCENT_RGB},0.26)`,
              }}
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {onboardingScreens.map((screen, index) => (
                <motion.div
                  key={screen.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.62, delay: 0.18 + index * 0.12, ease: "easeOut" }}
                >
                  <span
                    className="mx-auto mb-5 block h-8 w-8 rounded-full"
                    style={{
                      border: `2px solid ${index === 0 ? ACCENT : index === 3 ? "#D15CFD" : "#686CFF"}`,
                      background: isDark ? "#07101d" : "#f7fbff",
                      boxShadow: `0 0 20px ${index === 0 ? "rgba(141,232,254,0.38)" : "rgba(126,98,255,0.3)"}`,
                    }}
                  />
                  <strong
                    className="block"
                    style={{
                      color: index === 0 ? ACCENT : index === 3 ? "#D15CFD" : "#686CFF",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(1.9rem,3vw,2.6rem)",
                      lineHeight: 1,
                    }}
                  >
                    {screen.step}
                  </strong>
                  <span
                    className="mt-3 block whitespace-pre-line"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.84)" : r(0.66),
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      lineHeight: 1.22,
                    }}
                  >
                    {screen.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineScene() {
  const { isDark, r } = useTheme();
  const textColor = isDark ? "#F6FAFF" : "#071322";
  const mutedColor = isDark ? "rgba(230,240,255,0.66)" : "rgba(7,19,34,0.62)";
  const panelBg = isDark ? "rgba(7,16,30,0.58)" : "rgba(255,255,255,0.58)";
  const panelBorder = isDark ? "rgba(141,232,254,0.13)" : "rgba(0,44,76,0.12)";
  const essentials = [
    { icon: trajetAsset, title: "Itinéraires\npersonnalisés" },
    { icon: traficAsset, title: "Infos trafic\nen temps réel" },
    { icon: trainAsset, title: "Titres &\nabonnements" },
    { icon: maisonAsset, title: "Prochains\ndéparts" },
    { icon: horlogeAsset, title: "Alertes\nperturbations" },
    { icon: ampouleAsset, title: "Favoris &\nraccourcis" },
  ];
  const benefits = [
    { icon: trajetAsset, title: "Un accueil sur mesure", text: "qui évolue avec vous" },
    { icon: horlogeAsset, title: "Des routines intelligentes", text: "pour gagner du temps" },
    { icon: ampouleAsset, title: "Des informations fiables", text: "au moment clé" },
  ];
  const transportDots = ["#ee5b95", "#ffd048", "#7a6dff", "#f29428", "#37ce7d"];

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-52 w-full lg:block"
        viewBox="0 0 1200 210"
        fill="none"
      >
        <motion.path
          d="M0 24 H392 C478 24 474 144 562 148 H820 C900 148 886 26 978 24 H1200"
          stroke="url(#routine-top-line)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "120px 0px" }}
          animate={{ d: ["M0 24 H392 C478 24 474 144 562 148 H820 C900 148 886 26 978 24 H1200", "M0 24 H392 C482 24 470 136 562 140 H820 C904 140 884 30 978 24 H1200", "M0 24 H392 C478 24 474 144 562 148 H820 C900 148 886 26 978 24 H1200"] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="routine-top-line" x1="0" y1="24" x2="1200" y2="148" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8DE8FE" stopOpacity={isDark ? "0.26" : "0.38"} />
            <stop offset="0.52" stopColor="#726BFF" stopOpacity={isDark ? "0.86" : "0.58"} />
            <stop offset="1" stopColor="#BA4CFF" stopOpacity={isDark ? "0.76" : "0.48"} />
          </linearGradient>
        </defs>
      </motion.svg>

      <SceneGlow className="left-[48%] top-[34%] h-[30rem] w-[34rem]" color="130,80,255" opacity={0.12} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8vw] top-[48%] h-px w-[116vw]"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "120px 0px" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        style={{
          transformOrigin: "left",
          background: "linear-gradient(90deg, transparent, rgba(141,232,254,0.72), rgba(148,85,255,0.6), transparent)",
          boxShadow: "0 0 28px rgba(141,232,254,0.25)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="mb-10 flex items-center gap-4">
              <span
                className="rounded-full px-4 py-1.5 uppercase tracking-[0.16em]"
                style={{
                  border: `1px solid rgba(${ACCENT_RGB},${isDark ? 0.42 : 0.58})`,
                  color: ACCENT,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  boxShadow: `0 0 22px rgba(${ACCENT_RGB},${isDark ? 0.12 : 0.16})`,
                }}
              >
                02. Connect Routine
              </span>
              <motion.span
                className="hidden h-px w-40 sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                style={{
                  transformOrigin: "left",
                  background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.86), rgba(${ACCENT_RGB},0.15))`,
                }}
              />
              <span className="hidden h-1.5 w-1.5 rounded-full sm:block" style={{ background: ACCENT, boxShadow: `0 0 14px rgba(${ACCENT_RGB},0.8)` }} />
            </div>
            <h2
              style={{
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.3rem, 4.5vw, 4.45rem)",
                fontWeight: 750,
                lineHeight: 1.02,
                letterSpacing: "-0.052em",
              }}
            >
              Connect Routine,
              <br />
              votre <span style={{ color: ACCENT }}>compagnon</span>
              <br />
              de route <span style={{ color: ACCENT }}>intelligent</span>
            </h2>
            <p
              className="mt-7 max-w-[25rem]"
              style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.72 }}
            >
              Connect Routine vous accompagne au quotidien grâce à des routines personnalisées et un accueil sur mesure qui anticipe, organise et simplifie chaque trajet.
            </p>

            <div className="mt-12 space-y-7">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                    style={{
                      border: `1px solid ${index === 2 ? "rgba(150,90,255,0.45)" : `rgba(${ACCENT_RGB},0.28)`}`,
                      background: isDark ? "rgba(7,16,30,0.26)" : "rgba(255,255,255,0.34)",
                      boxShadow: `0 0 20px ${index === 2 ? "rgba(150,90,255,0.16)" : "rgba(141,232,254,0.13)"}`,
                    }}
                  >
                    <img src={benefit.icon} alt="" aria-hidden="true" className="h-7 w-7 opacity-80" />
                  </span>
                  <span>
                    <strong style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.02rem" }}>{benefit.title}</strong>
                    <span className="block" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.92rem" }}>{benefit.text}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[36rem] lg:min-h-[44rem]">
            <motion.img
              src={imgRoutineList}
              alt="Connect Routine - écran principal"
              className="absolute left-[10%] top-[2%] z-20 w-[min(18rem,45vw)] select-none md:left-[18%] md:w-[20rem] lg:left-[12%] lg:w-[22rem]"
              initial={{ opacity: 0, y: 70, rotate: -4, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: -3, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 46px 58px rgba(0,0,0,0.42)) drop-shadow(0 0 34px rgba(141,232,254,0.18))" }}
            />
            <motion.img
              src={imgRoutineList}
              alt="Connect Routine - aperçu secondaire"
              className="absolute right-[4%] top-[12%] z-10 w-[min(16rem,39vw)] select-none md:right-[13%] md:w-[18rem] lg:right-[8%] lg:w-[20rem]"
              initial={{ opacity: 0, y: 80, rotate: 8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, rotate: 5, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 42px 54px rgba(0,0,0,0.38)) drop-shadow(0 0 38px rgba(150,90,255,0.22))" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[18%] left-[6%] h-px w-[90%]"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
              style={{
                transformOrigin: "left",
                background: "linear-gradient(90deg, rgba(141,232,254,0.1), rgba(141,232,254,0.85), rgba(151,85,255,0.78), rgba(141,232,254,0.12))",
                boxShadow: "0 0 26px rgba(141,232,254,0.22)",
              }}
            />
          </div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h3
            style={{
              color: textColor,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.55rem,2.2vw,2.15rem)",
              fontWeight: 720,
              letterSpacing: "-0.03em",
            }}
          >
            Vos <span style={{ color: ACCENT }}>essentiels</span>, réunis au même endroit
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {essentials.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex min-h-[9.8rem] flex-col items-center justify-center rounded-2xl px-4 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: "easeOut" }}
                style={{
                  border: `1px solid ${panelBorder}`,
                  background: panelBg,
                  boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.03)" : "0 16px 36px rgba(0,44,76,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <img src={item.icon} alt="" aria-hidden="true" className="mb-5 h-8 w-8 opacity-80" />
                <span className="whitespace-pre-line" style={{ color: textColor, fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", lineHeight: 1.45 }}>
                  {item.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mt-16 grid gap-10 overflow-hidden rounded-[2rem] p-8 md:grid-cols-[0.95fr_1.05fr] md:p-12"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          style={{
            border: `1px solid ${panelBorder}`,
            background: panelBg,
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute bottom-10 left-0 h-px w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
            style={{
              transformOrigin: "left",
              background: "linear-gradient(90deg, rgba(141,232,254,0.86), rgba(151,85,255,0.72), transparent)",
              boxShadow: "0 0 24px rgba(141,232,254,0.2)",
            }}
          />
          <div className="relative z-10">
            <h3 style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,2.5vw,2.5rem)", fontWeight: 720, letterSpacing: "-0.04em" }}>
              Des <span style={{ color: ACCENT }}>routines</span> créées pour vous
            </h3>
            <p className="mt-5 max-w-md" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              Définissez vos trajets réguliers, horaires et préférences. Connect Routine s’occupe du reste.
            </p>
            <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-full" style={{ border: `1px solid rgba(${ACCENT_RGB},0.36)`, boxShadow: "0 0 26px rgba(141,232,254,0.18)" }}>
              <img src={trajetAsset} alt="" aria-hidden="true" className="h-8 w-8 opacity-80" />
            </div>
          </div>

          <div
            className="relative z-10 rounded-2xl p-5"
            style={{
              border: `1px solid ${panelBorder}`,
              background: isDark ? "rgba(4,10,20,0.54)" : "rgba(255,255,255,0.48)",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <strong style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem" }}>Mes routines</strong>
              <span style={{ color: mutedColor, fontSize: "1.4rem", lineHeight: 1 }}>+</span>
            </div>
            {["Maison → Travail", "Travail → Maison"].map((name, index) => (
              <div
                key={name}
                className="mb-3 flex items-center gap-3 rounded-xl p-3"
                style={{ border: `1px solid ${panelBorder}`, background: isDark ? "rgba(10,19,33,0.56)" : "rgba(255,255,255,0.5)" }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `rgba(${ACCENT_RGB},0.15)` }}>
                  <img src={maisonAsset} alt="" aria-hidden="true" className="h-5 w-5 opacity-80" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block" style={{ color: textColor, fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>{name}</strong>
                  <span className="block" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.73rem" }}>
                    Lun, Mar, Mer, Jeu, Ven
                  </span>
                  <span className="block" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.73rem" }}>
                    {index === 0 ? "08:01 · Gare de Lyon" : "18:01 · Gare de Lyon"}
                  </span>
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  {transportDots.map((color, dotIndex) => (
                    <span key={color} className="flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] font-bold text-white" style={{ background: color }}>
                      {dotIndex === 3 ? "C" : dotIndex === 4 ? "D" : dotIndex + 8}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <button
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left"
              style={{ border: `1px solid ${panelBorder}`, color: textColor, fontFamily: "'Inter', sans-serif", fontSize: "0.86rem", background: "transparent" }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ border: `1px solid rgba(${ACCENT_RGB},0.42)`, color: ACCENT }}>+</span>
              Ajouter une routine
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-10 grid items-center gap-6 overflow-hidden rounded-[1.5rem] px-8 py-7 md:grid-cols-[0.36fr_1px_1fr_0.34fr]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ border: `1px solid ${panelBorder}`, background: panelBg, backdropFilter: "blur(12px)" }}
        >
          <img src={ampouleAsset} alt="" aria-hidden="true" className="h-14 w-14 opacity-85" />
          <span className="hidden h-14 w-px md:block" style={{ background: panelBorder }} />
          <p style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.25rem,1.8vw,1.8rem)", fontWeight: 700, lineHeight: 1.2 }}>
            Plus qu’une application,
            <br />
            <span style={{ color: ACCENT }}>un compagnon de route</span>
          </p>
          <img src={vehiculesAsset} alt="" aria-hidden="true" className="ml-auto hidden h-20 w-auto opacity-70 md:block" />
        </motion.div>
      </div>
    </section>
  );
}

function NewsletterScene() {
  const { isDark } = useTheme();
  const textColor = isDark ? "#F6FAFF" : "#071322";
  const mutedColor = isDark ? "rgba(230,240,255,0.7)" : "rgba(7,19,34,0.62)";
  const panelBorder = isDark ? "rgba(141,232,254,0.16)" : "rgba(0,44,76,0.14)";
  const newsletterItems = [
    {
      icon: traficAsset,
      title: "Actualités",
      text: "Les dernières nouvelles de Connect Routine.",
    },
    {
      icon: horlogeAsset,
      title: "Conseils & astuces",
      text: "Des idées pour optimiser vos déplacements.",
    },
    {
      icon: ampouleAsset,
      title: "Nouveautés",
      text: "Les nouvelles fonctionnalités expliquées simplement.",
    },
  ];
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <StructuralLine src={lineAssetLong} className="bottom-[8%] left-[-14vw] w-[82vw]" rotate={-8} opacity={isDark ? 0.32 : 0.22} />
      <StructuralLine src={lineAssetLoop} className="bottom-[3%] right-[-24vw] w-[70vw]" rotate={8} opacity={isDark ? 0.28 : 0.2} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="mb-12 flex items-center gap-4">
              <span
                className="rounded-full px-5 py-2 uppercase tracking-[0.16em]"
                style={{
                  border: `1px solid rgba(${ACCENT_RGB},${isDark ? 0.48 : 0.58})`,
                  color: ACCENT,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  boxShadow: `0 0 22px rgba(${ACCENT_RGB},${isDark ? 0.14 : 0.16})`,
                }}
              >
                04. Newsletter
              </span>
              <motion.span
                className="hidden h-px w-52 sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                style={{
                  transformOrigin: "left",
                  background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.86), rgba(${ACCENT_RGB},0.15))`,
                }}
              />
              <span className="hidden h-2 w-2 rounded-full sm:block" style={{ background: ACCENT, boxShadow: `0 0 18px rgba(${ACCENT_RGB},0.9)` }} />
            </div>

            <h2
              style={{
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.6rem, 5.1vw, 5rem)",
                fontWeight: 750,
                lineHeight: 1.04,
                letterSpacing: "-0.055em",
              }}
            >
              Une newsletter pensée
              <br />
              pour <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.26)` }}>vous accompagner.</span>
            </h2>

            <p
              className="mt-9 max-w-[27rem]"
              style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1.08rem", lineHeight: 1.75 }}
            >
              Chaque mois, recevez des contenus utiles pour vos trajets quotidiens.
            </p>

            <div className="mt-16 space-y-10">
              {newsletterItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-center gap-7"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <span
                    className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center rounded-full"
                    style={{
                      border: `1px solid ${index === 1 ? "rgba(150,90,255,0.42)" : `rgba(${ACCENT_RGB},0.36)`}`,
                      background: "transparent",
                      boxShadow: `0 0 24px ${index === 1 ? "rgba(150,90,255,0.15)" : "rgba(141,232,254,0.14)"}`,
                    }}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="h-9 w-9 opacity-90"
                      style={{ filter: isDark ? "brightness(0) invert(1)" : undefined }}
                    />
                  </span>
                  <span>
                    <strong style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.45rem", lineHeight: 1.2 }}>
                      {item.title}
                    </strong>
                    <span className="mt-2 block max-w-[17rem]" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.65 }}>
                      {item.text}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative pt-4 lg:pt-[14rem]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <div className="relative ml-auto w-full max-w-[27rem]">
              <img
                src={imgNewsletter}
                alt="Newsletter Connect Routine"
                className="h-auto w-full rounded-[1.35rem] object-contain"
                style={{
                  border: `1px solid ${panelBorder}`,
                  boxShadow: isDark
                    ? `0 34px 90px rgba(0,0,0,0.28), 0 0 46px rgba(${ACCENT_RGB},0.08)`
                    : "0 34px 90px rgba(0,44,76,0.12)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CommunicationScene({ setParticleMood }: { setParticleMood: (mood: "cyan" | "pink" | "blue") => void }) {
  const [variant, setVariant] = useState<"blue" | "pink">("pink");
  const config =
    variant === "blue"
      ? { image: imgCampaignBlue, color: "#2D8CFF", rgb: "45,140,255", accent: "#8DE8FE", line: lineAssetWide }
      : { image: imgCampaignPink, color: "#FF72B8", rgb: "255,114,184", accent: "#BA7CFF", line: lineAssetLoop };

  const handleVariant = (next: "blue" | "pink") => {
    setVariant(next);
    setParticleMood(next);
  };

  return (
    <section className="relative min-h-[118vh] overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <SceneName className="left-8 top-24 md:left-14">Communication</SceneName>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at 50% 45%, rgba(${config.rgb},0.28), transparent 28%), radial-gradient(circle at 14% 70%, rgba(${ACCENT_RGB},0.13), transparent 22%), radial-gradient(circle at 82% 24%, rgba(${config.rgb},0.18), transparent 24%)`,
        }}
        transition={{ duration: 0.7 }}
      />
      <StructuralLine src={config.line} className="left-[-26vw] top-[30%] w-[152vw]" rotate={variant === "blue" ? 2 : -8} opacity={0.45} />
      <StructuralLine src={variant === "blue" ? lineAssetLong : lineAssetWide} className="right-[-28vw] bottom-[17%] w-[140vw]" flip={variant === "pink"} opacity={0.34} />
      <FloatingIcon src={variant === "blue" ? trainAsset : ampouleAsset} className="left-[13%] top-[28%] h-16 w-16" />
      <FloatingIcon src={variant === "blue" ? vehiculesAsset : maisonAsset} className="right-[12%] bottom-[18%] h-20 w-20" delay={0.7} />

      <div className="relative z-10 flex min-h-[54rem] flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={variant}
            src={config.image}
            alt={`Instagram SNCF Connect ${variant === "blue" ? "bleu" : "rose"}`}
            className="w-[min(25rem,78vw)] select-none"
            initial={{ opacity: 0, y: 46, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -42, scale: 0.94, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 46px 76px rgba(${config.rgb},0.34)) drop-shadow(0 0 48px rgba(${config.rgb},0.26))` }}
          />
        </AnimatePresence>

        <div className="mt-9 flex items-center gap-6">
          {[
            { id: "blue" as const, color: "#2D8CFF", label: "Version bleue" },
            { id: "pink" as const, color: "#FF72B8", label: "Version rose" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => handleVariant(item.id)}
              className="relative h-14 w-14 rounded-full"
              style={{ background: item.color, boxShadow: `0 0 ${variant === item.id ? 46 : 18}px ${item.color}99` }}
            >
              <motion.span className="absolute inset-3 rounded-full border border-white/80" animate={{ scale: variant === item.id ? [1, 1.22, 1] : 1 }} transition={{ duration: 1.4, repeat: variant === item.id ? Infinity : 0 }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotifyScene({ playing, setPlaying }: { playing: boolean; setPlaying: (value: boolean) => void }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const cover = mode === "dark" ? imgSpotifyDark : imgSpotifyLight;

  return (
    <section className="relative min-h-[115vh] overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <SceneName className="right-8 top-24 md:right-14">Playlist Spotify</SceneName>
      <motion.div
        className="absolute inset-0"
        animate={{ background: playing ? "radial-gradient(circle at 50% 44%, rgba(141,232,254,0.2), transparent 32%)" : "radial-gradient(circle at 50% 44%, rgba(141,232,254,0.08), transparent 34%)" }}
        transition={{ duration: 0.8 }}
      />
      <StructuralLine src={lineAssetWide} className="left-[-20vw] top-[18%] w-[140vw]" rotate={4} opacity={playing ? 0.38 : 0.2} />
      <div className="relative z-10 mx-auto flex min-h-[54rem] max-w-7xl items-center justify-center">
        <motion.img
          src={imgSpotifyMain}
          alt="Playlist Spotify dans un univers de particules"
          className="w-[min(76rem,106vw)] select-none"
          animate={{ scale: playing ? 1.025 : 1, y: playing ? -8 : 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 52px 90px rgba(0,0,0,0.54)) drop-shadow(0 0 ${playing ? 54 : 24}px rgba(${ACCENT_RGB},${playing ? 0.24 : 0.12}))` }}
        />

        <motion.div className="absolute bottom-[8%] left-1/2 z-20 flex w-[min(48rem,88vw)] -translate-x-1/2 items-center gap-4 rounded-full border border-white/12 bg-black/56 px-4 py-3 backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.img key={mode} src={cover} alt="État playlist" className="h-14 w-14 rounded-2xl" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45 }} />
          </AnimatePresence>
          <div className="min-w-0 flex-1">
            <div style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Votre playlist du quotidien</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/14">
              <motion.div className="h-full rounded-full" style={{ background: ACCENT }} animate={{ width: playing ? ["8%", "92%"] : "18%" }} transition={playing ? { duration: 5.6, repeat: Infinity, ease: "linear" } : { duration: 0.35 }} />
            </div>
          </div>
          <div className="hidden items-center rounded-full bg-white/10 p-1 sm:flex">
            {(["dark", "light"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setMode(item)} className="rounded-full px-3 py-2" style={{ color: mode === item ? BG_DARK : "rgba(255,255,255,0.66)", background: mode === item ? ACCENT : "transparent", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem" }}>
                {item === "dark" ? "Sombre" : "Clair"}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setPlaying(!playing)} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full p-4" style={{ background: ACCENT, color: BG_DARK, boxShadow: `0 0 ${playing ? 48 : 28}px rgba(${ACCENT_RGB},0.55)` }} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause size={20} fill={BG_DARK} /> : <Play size={20} fill={BG_DARK} />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function VideoScene() {
  return (
    <section className="relative min-h-[105vh] overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <SceneName className="left-8 top-24 md:left-14">Vidéos</SceneName>
      <SceneGlow className="left-1/2 top-[42%] h-[44rem] w-[62rem] -translate-x-1/2 -translate-y-1/2" opacity={0.18} />
      <StructuralLine src={lineAssetLong} className="left-[-22vw] top-[26%] w-[140vw]" opacity={0.28} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.video
          controls
          playsInline
          preload="none"
          className="block w-full rounded-[1.6rem]"
          initial={{ opacity: 0, y: 42, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.9 }}
          style={{ boxShadow: `0 50px 120px rgba(0,0,0,0.5), 0 0 60px rgba(${ACCENT_RGB},0.14)` }}
        >
          <source src={videoMain} type="video/mp4" />
          Votre navigateur ne peut pas lire cette vidéo.
        </motion.video>
        <div className="mt-28 flex min-h-[34rem] items-center justify-center">
          <motion.div
            className="relative aspect-[9/16] w-[min(21rem,74vw)] overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ boxShadow: "0 38px 90px rgba(0,0,0,0.36)" }}
          >
            <iframe src={UGC_URL} title="Vidéo UGC SNCF Connect" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </motion.div>
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
          viewport={{ once: true, margin: "160px 0px" }}
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
  const [spotifyPlaying, setSpotifyPlaying] = useState(false);
  const [particleMood, setParticleMood] = useState<"cyan" | "pink" | "blue">("cyan");

  return (
    <div className="relative w-full">
      <HeroSection />
      <main className="relative overflow-hidden">
        <GlobalParticleField active={spotifyPlaying} mood={particleMood} />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.8), transparent)` }} />
        <div className="relative z-10">
          <OnboardingScene />
          <RoutineScene />
          <NewsletterScene />
          <CommunicationScene setParticleMood={setParticleMood} />
          <SpotifyScene playing={spotifyPlaying} setPlaying={setSpotifyPlaying} />
          <VideoScene />
        </div>
        <ClosingSection />
        <div className="h-24" />
      </main>
    </div>
  );
}
