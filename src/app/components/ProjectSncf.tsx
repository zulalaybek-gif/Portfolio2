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
  return (
    <section className="relative min-h-[110vh] overflow-hidden px-6 py-24 md:px-12 lg:py-28">
      <SceneName className="right-8 top-24 md:right-14">Connect Routine</SceneName>
      <SceneGlow className="left-[28%] top-[42%] h-[34rem] w-[42rem]" opacity={0.12} />
      <StructuralLine src={lineAssetLong} className="left-[-22vw] top-[48%] w-[132vw]" opacity={0.5} />
      <StructuralLine src={lineAssetLoop} className="right-[-24vw] bottom-[13%] w-[80vw]" rotate={-8} opacity={0.3} />
      <FloatingIcon src={trainAsset} className="left-[45%] top-[25%] h-12 w-12" />
      <FloatingIcon src={trajetAsset} className="left-[53%] top-[55%] h-10 w-10" delay={0.6} />
      <FloatingIcon src={horlogeAsset} className="right-[10%] top-[18%] h-10 w-10" delay={1.1} />
      <FloatingIcon src={traficAsset} className="left-[8%] bottom-[12%] h-9 w-9" delay={0.35} />

      <div className="relative z-10 mx-auto min-h-[52rem] max-w-7xl">
        <FloatingMockup src={imgRoutineCreate} alt="Création de routine" className="absolute left-[-7%] top-[7%] z-20 w-[min(48rem,58vw)] -rotate-2" />
        <FloatingMockup src={imgRoutineList} alt="Mes routines" className="absolute bottom-[5%] right-[-2%] z-30 w-[min(28rem,35vw)] rotate-2" delay={0.18} />
      </div>
    </section>
  );
}

function NewsletterScene() {
  const ribbons = [
    { word: "Trajets", className: "left-[12%] top-[18%] -rotate-6" },
    { word: "Personnalisés", className: "right-[7%] top-[39%] rotate-6" },
    { word: "Simplifiés", className: "left-[16%] bottom-[19%] rotate-3" },
  ];
  return (
    <section className="relative min-h-[105vh] overflow-hidden px-6 py-24 md:px-12 lg:py-28">
      <SceneName className="left-8 top-24 md:left-14">Newsletter</SceneName>
      <SceneGlow className="left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2" opacity={0.2} />
      <StructuralLine src={lineAssetWide} className="left-[-28vw] top-[29%] w-[150vw]" rotate={-7} opacity={0.32} />
      <StructuralLine src={lineAssetLoop} className="bottom-[15%] left-[-6vw] w-[62vw]" rotate={7} opacity={0.28} />
      {ribbons.map((item, index) => (
        <motion.div
          key={item.word}
          className={`pointer-events-none absolute z-20 hidden whitespace-nowrap rounded-full border border-cyan-200/20 px-8 py-3 text-white/90 backdrop-blur-xl lg:block ${item.className}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,3.8vw,4rem)", fontWeight: 700, letterSpacing: "-0.05em" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, index % 2 ? 14 : -14, 0] }}
          transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
        >
          {item.word}
        </motion.div>
      ))}
      <div className="relative z-10 flex min-h-[50rem] items-center justify-center">
        <FloatingMockup src={imgNewsletter} alt="Newsletter Connect Routine" className="max-h-[78vh] w-auto max-w-[min(30rem,72vw)] -rotate-1" />
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
      <main
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 4%, rgba(141,232,254,0.12), transparent 24%), linear-gradient(180deg, #08111f 0%, #050a13 38%, #080d16 100%)",
        }}
      >
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
