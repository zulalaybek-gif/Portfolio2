import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Bell,
  Brain,
  Clapperboard,
  Clock,
  Home,
  MapPin,
  Navigation,
  Pause,
  Play,
  Smartphone,
  Star,
  Ticket,
  Train,
  Users,
  Volume2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import svgLogoSncf from "../../imports/svg-xsk7542b73";
import svgSlideIcons from "../../imports/svg-8lle55gqj4";

import { SNCFFlowSystem } from "./SNCFFlowSystem";

import imgPhone1 from "../../assets/sncf-connect/01.splash-screen.png";
import imgPhone2 from "../../assets/sncf-connect/02.creez-vos-routines.png";
import imgPhone3 from "../../assets/sncf-connect/03.personnalisez-l-accueil.png";
import imgPhone4 from "../../assets/sncf-connect/04.parametrage.png";
import imgRoutineCreate from "../../assets/sncf-connect/05.creaton-routine.png";
import imgRoutineList from "../../assets/sncf-connect/06.mes-routines.png";
import imgNewsletter from "../../assets/sncf-connect/07.newsletter.png";
import imgCampaignPink from "../../assets/sncf-connect/10.jeu-concours-insta-rose.png";
import imgCampaignBlue from "../../assets/sncf-connect/16.jeu-concours-insta-bleu.png";
import imgSpotifyPlayer from "../../assets/sncf-connect/20.player-spotify.png";
import imgVideoCover1 from "../../assets/sncf-connect/21.image-de-couverture-video-1.png";
import imgVideoCover2 from "../../assets/sncf-connect/22.image-de-couverture-video-2.png";
import videoMain from "../../assets/sncf-connect/14.video-finale-workshop.mp4";
import lineAsset from "../../assets/sncf-connect/assets/03.line.svg";
import lineAssetWide from "../../assets/sncf-connect/assets/04.line.svg";
import lineAssetLoop from "../../assets/sncf-connect/assets/05.line.svg";
import lineAssetLong from "../../assets/sncf-connect/assets/06.line.svg";
import trainAsset from "../../assets/sncf-connect/assets/07.train.svg";
import ampouleAsset from "../../assets/sncf-connect/assets/08.ampoule.svg";
import maisonAsset from "../../assets/sncf-connect/assets/11.picto-maison.svg";
import horlogeAsset from "../../assets/sncf-connect/assets/12.picto-horloge.svg";
import trajetAsset from "../../assets/sncf-connect/assets/16.picto-trajet.svg";
import traficAsset from "../../assets/sncf-connect/assets/17.picto-trafic.svg";

const ACCENT = "var(--sncf-accent, #8DE8FE)";
const ACCENT_RGB = "var(--sncf-accent-rgb, 141,232,254)";
const ACCENT_DARK = "#8DE8FE";
const ACCENT_DARK_RGB = "141,232,254";
const ACCENT_LIGHT = "#1689A5";
const ACCENT_LIGHT_RGB = "22,137,165";
const BG_DARK = "#0C131F";

/* SNCF Brand palette from slide 11 */
const PALETTE = ["#002c4c", ACCENT, "#242b35", "#4695a8", "#3b3232"];

/* Icon paths from slide 11 bento icons (tickets, home, profile, calendar, notification) */
const BENTO_ICONS = [
  { viewBox: "0 0 60 48", path: svgSlideIcons.p19f94900 },
  { viewBox: "0 0 59 60", path: svgSlideIcons.pedf50c0 },
  { viewBox: "0 0 56 45", paths: [svgSlideIcons.p3aac2980, svgSlideIcons.p1f184100] },
  { viewBox: "0 0 64 56", paths: [svgSlideIcons.p1d8fc600, svgSlideIcons.p1f53cf00, svgSlideIcons.p12371f00] },
  { viewBox: "0 0 64 38", path: svgSlideIcons.p76cf280 },
];

const UGC_VIDEO_URL = "https://www.youtube.com/shorts/_AJf2dtOLtQ";

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

function SncfLineIcon({ icon: Icon, size = 28 }: { icon: typeof MapPin; size?: number }) {
  const { isDark } = useTheme();
  return <Icon size={size} strokeWidth={1.55} color={isDark ? "#FFFFFF" : "#002c4c"} />;
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

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
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
                fontSize: "clamp(2.25rem, 4.35vw, 4.15rem)",
                fontWeight: 750,
                lineHeight: 1.02,
                letterSpacing: "-0.055em",
                maxWidth: "58rem",
              }}
            >
              Un onboarding pensé pour <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.28)` }}>guider</span> et{" "}
              <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.28)` }}>inspirer</span>
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {onboardingScreens.map((screen, index) => (
              <motion.img
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                loading="lazy"
                decoding="async"
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
              className="absolute left-[calc(12.5%-1rem)] right-[calc(12.5%-1rem)] top-4 hidden h-px lg:block"
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
                    className="relative z-10 mx-auto mb-5 block h-8 w-8 rounded-full"
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
    { icon: Navigation, title: "Itinéraires\npersonnalisés" },
    { icon: Clock, title: "Infos trafic\nen temps réel" },
    { icon: Ticket, title: "Titres &\nabonnements" },
    { icon: MapPin, title: "Prochains\ndéparts" },
    { icon: Bell, title: "Alertes\nperturbations" },
    { icon: Star, title: "Favoris &\nraccourcis" },
  ];
  const benefits = [
    { icon: MapPin, title: "Un accueil sur mesure", text: "qui évolue avec vous" },
    { icon: Bell, title: "Des routines intelligentes", text: "pour gagner du temps" },
    { icon: Brain, title: "Des informations fiables", text: "au moment clé" },
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
                fontSize: "clamp(2.25rem, 3.85vw, 3.95rem)",
                fontWeight: 750,
                lineHeight: 1.05,
                letterSpacing: "-0.052em",
                maxWidth: "54rem",
              }}
            >
              Connect Routine, votre <span style={{ color: ACCENT }}>compagnon</span> de route <span style={{ color: ACCENT }}>intelligent</span>
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
                    <SncfLineIcon icon={benefit.icon} size={28} />
                  </span>
                  <span>
                    <strong style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.02rem" }}>{benefit.title}</strong>
                    <span className="block" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.92rem" }}>{benefit.text}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[34rem] lg:min-h-[43rem]">
            <motion.img
              src={imgRoutineList}
              alt="Connect Routine - écran Mes routines"
              loading="lazy"
              decoding="async"
              className="absolute left-[68%] top-[8%] z-20 w-[min(25rem,78vw)] -translate-x-1/2 select-none md:w-[28rem] lg:left-[70%] lg:top-[8%] lg:w-[32rem]"
              initial={{ opacity: 0, y: 70, x: "-50%", rotate: -2.5, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, x: "-50%", rotate: -2.5, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 46px 58px rgba(0,0,0,0.42)) drop-shadow(0 0 34px rgba(141,232,254,0.18))" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[18%] left-[12%] h-px w-[82%]"
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
                <span className="mb-5 flex h-9 w-9 items-center justify-center">
                  <SncfLineIcon icon={item.icon} size={30} />
                </span>
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
          <div className="relative z-10">
            <h3 style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem,2.5vw,2.5rem)", fontWeight: 720, letterSpacing: "-0.04em" }}>
              Des <span style={{ color: ACCENT }}>routines</span> créées pour vous
            </h3>
            <p className="mt-5 max-w-md" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              Définissez vos trajets réguliers, horaires et préférences. Connect Routine s’occupe du reste.
            </p>
            <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-full" style={{ border: `1px solid rgba(${ACCENT_RGB},0.36)`, boxShadow: "0 0 26px rgba(141,232,254,0.18)" }}>
              <SncfLineIcon icon={MapPin} size={32} />
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
                  <SncfLineIcon icon={index === 0 ? Home : Train} size={20} />
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
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-start xl:gap-10">
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
                fontSize: "clamp(2.35rem, 4.3vw, 4.35rem)",
                fontWeight: 750,
                lineHeight: 1.04,
                letterSpacing: "-0.052em",
                maxWidth: "42rem",
              }}
            >
              Une newsletter pensée pour <span style={{ color: ACCENT, textShadow: `0 0 24px rgba(${ACCENT_RGB},0.26)` }}>vous accompagner.</span>
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
            className="relative pt-4 lg:self-start lg:pt-28"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <div
              className="relative mx-auto h-[34rem] w-full max-w-[24rem] overflow-y-auto rounded-[1.35rem] md:h-[38rem] lg:ml-4 lg:mr-auto lg:h-[38rem] xl:ml-8"
              style={{
                border: `1px solid ${panelBorder}`,
                boxShadow: isDark
                  ? `0 34px 90px rgba(0,0,0,0.28), 0 0 46px rgba(${ACCENT_RGB},0.08)`
                  : "0 34px 90px rgba(0,44,76,0.12)",
                scrollbarColor: `${ACCENT} transparent`,
                scrollbarWidth: "thin",
              }}
            >
              <img
                src={imgNewsletter}
                alt="Newsletter Connect Routine"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CommunicationScene() {
  const { isDark } = useTheme();
  const textColor = isDark ? "#F6FAFF" : "#071322";
  const mutedColor = isDark ? "rgba(230,240,255,0.7)" : "rgba(7,19,34,0.62)";

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <StructuralLine src={lineAssetLoop} className="bottom-[2%] right-[-26vw] w-[82vw]" rotate={5} opacity={isDark ? 0.3 : 0.2} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
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
                05. Communication & réseaux sociaux
              </span>
              <motion.span
                className="hidden h-px w-48 sm:block"
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
                fontSize: "clamp(2.25rem, 3.45vw, 3.55rem)",
                fontWeight: 750,
                lineHeight: 1.04,
                letterSpacing: "-0.052em",
                maxWidth: "48rem",
              }}
            >
              Une communication pensée pour prolonger <span style={{ color: ACCENT }}>l’expérience.</span>
            </h2>

            <p
              className="mt-8 max-w-[30rem]"
              style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1.04rem", lineHeight: 1.75 }}
            >
              Déclinaison de concepts créatifs imaginés pour les réseaux sociaux afin d’accompagner les temps forts du projet et renforcer sa visibilité.
            </p>
          </motion.div>

          <div className="relative min-h-[26rem] lg:min-h-[34rem]">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[19%] top-[31%] h-[18rem] w-[18rem] rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: isDark ? 0.2 : 0.13, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ background: "radial-gradient(circle, rgba(255,114,184,0.46), rgba(255,114,184,0) 70%)" }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute right-[16%] top-[27%] h-[19rem] w-[19rem] rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: isDark ? 0.19 : 0.13, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
              style={{ background: "radial-gradient(circle, rgba(45,140,255,0.42), rgba(45,140,255,0) 72%)" }}
            />

            <motion.img
              src={imgCampaignBlue}
              alt="Communication Instagram SNCF Connect bleue"
              loading="lazy"
              decoding="async"
              className="relative z-20 mx-auto mt-8 block w-[min(12.5rem,62vw)] select-none lg:absolute lg:right-[25%] lg:top-[14%] lg:mt-0 lg:w-[min(12.75rem,16vw)]"
              initial={{ opacity: 0, y: 56, x: 18, rotate: 1.1 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotate: 1.1 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 34px 70px rgba(45,140,255,0.24)) drop-shadow(0 0 26px rgba(45,140,255,0.12))" }}
            />
            <motion.img
              src={imgCampaignPink}
              alt="Communication Instagram SNCF Connect rose"
              loading="lazy"
              decoding="async"
              className="relative z-10 mx-auto mt-8 block w-[min(12rem,60vw)] select-none lg:absolute lg:left-[25%] lg:top-[24%] lg:mt-0 lg:w-[min(12.1rem,15.5vw)]"
              initial={{ opacity: 0, y: 48, x: -20, rotate: -1.4 }}
              whileInView={{ opacity: 0.9, y: 0, x: 0, rotate: -1.4 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 34px 70px rgba(255,114,184,0.2))" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotifyScene({ playing, setPlaying }: { playing: boolean; setPlaying: (value: boolean) => void }) {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [volume, setVolume] = useState(0.28);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const audioPulseRef = useRef<number | null>(null);
  const textColor = isDark ? "#F6FAFF" : "#071322";
  const mutedColor = isDark ? "rgba(230,240,255,0.7)" : "rgba(7,19,34,0.62)";

  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return null;
      const context = new AudioCtor();
      const masterGain = context.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(context.destination);
      audioContextRef.current = context;
      masterGainRef.current = masterGain;
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return audioContextRef.current;
  };

  const playTone = (frequency: number, start: number, duration: number, peak: number, type: OscillatorType = "sine") => {
    const context = audioContextRef.current;
    const master = masterGainRef.current;
    if (!context || !master) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  };

  const playSoundDesign = async () => {
    const context = await ensureAudioContext();
    if (!context) return;

    const now = context.currentTime;
    playTone(392, now, 0.42, 0.1, "triangle");
    playTone(523.25, now + 0.08, 0.34, 0.075, "sine");
    playTone(659.25, now + 0.16, 0.32, 0.055, "sine");
    playTone(117.5, now + 0.02, 0.58, 0.025, "sine");
  };

  const togglePlayback = async () => {
    if (playing) {
      setPlaying(false);
      return;
    }

    await playSoundDesign();
    setPlaying(true);
  };

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, audioContextRef.current?.currentTime ?? 0, 0.08);
    }
  }, [volume]);

  useEffect(() => {
    if (!playing) {
      if (audioPulseRef.current) window.clearInterval(audioPulseRef.current);
      audioPulseRef.current = null;
      return;
    }

    audioPulseRef.current = window.setInterval(() => {
      void playSoundDesign();
    }, 2200);

    return () => {
      if (audioPulseRef.current) window.clearInterval(audioPulseRef.current);
      audioPulseRef.current = null;
    };
  }, [playing]);

  const presentationItems = [
    ["Expérience sonore", "Un sound design doux pour accompagner la navigation."],
    ["Identité du projet", "Une extension audio discrète de l’univers SNCF Connect."],
    ["Immersion interactive", "La matière visuelle réagit quand le player s’active."],
  ];

  return (
    <section id="sncf-spotify-scene" className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <StructuralLine src={lineAssetWide} className="left-[-42vw] top-[56%] w-[118vw]" rotate={-3} opacity={playing ? 0.36 : 0.2} />
      <StructuralLine src={lineAssetLong} className="right-[-44vw] top-[30%] w-[112vw]" rotate={5} opacity={playing ? 0.24 : 0.13} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[28%] h-[28rem] w-[78vw] rounded-full blur-3xl"
        animate={{ opacity: playing ? (isDark ? 0.18 : 0.12) : isDark ? 0.08 : 0.05, scale: playing ? 1.08 : 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.46), transparent 68%)` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[0.84fr_1.16fr]">
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
                  border: `1px solid rgba(${ACCENT_RGB},${isDark ? 0.5 : 0.6})`,
                  color: ACCENT,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.74rem",
                  fontWeight: 800,
                  boxShadow: `0 0 22px rgba(${ACCENT_RGB},${isDark ? 0.14 : 0.16})`,
                }}
              >
                06. Playlist Spotify
              </span>
              <motion.span
                className="hidden h-px w-48 sm:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: "left", background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.86), rgba(${ACCENT_RGB},0.15))` }}
              />
              <span className="hidden h-2 w-2 rounded-full sm:block" style={{ background: ACCENT, boxShadow: `0 0 18px rgba(${ACCENT_RGB},0.9)` }} />
            </div>

            <h2
              style={{
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.35rem, 4.25vw, 4.25rem)",
                fontWeight: 750,
                lineHeight: 1.04,
                letterSpacing: "-0.052em",
              }}
            >
              Votre playlist
              <br />
              <span style={{ color: ACCENT }}>du quotidien.</span>
            </h2>

            <p className="mt-8 max-w-[27rem]" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "1.04rem", lineHeight: 1.75 }}>
              Une expérience sonore pensée pour accompagner les trajets et prolonger l’univers SNCF Connect.
            </p>

            <motion.div
              className="mt-10 w-full max-w-[30rem] rounded-[1.4rem] border p-4 backdrop-blur-2xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "120px 0px" }}
              transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
              style={{
                borderColor: isDark ? "rgba(141,232,254,0.22)" : "rgba(0,44,76,0.12)",
                background: isDark ? "rgba(5,14,25,0.52)" : "rgba(255,255,255,0.52)",
                boxShadow: playing ? `0 0 42px rgba(${ACCENT_RGB},0.18)` : `0 24px 70px rgba(0,0,0,${isDark ? 0.2 : 0.08})`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl"
                  style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,44,76,0.06)" }}
                >
                  <img src={imgSpotifyPlayer} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <div style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800 }}>Siesta sur les rails</div>
                  <div className="mt-0.5" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.78rem" }}>
                    Sound design SNCF Connect
                  </div>
                </div>
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full p-4 transition-transform hover:scale-105"
                  style={{ background: ACCENT, color: BG_DARK, boxShadow: `0 0 ${playing ? 44 : 24}px rgba(${ACCENT_RGB},0.55)` }}
                  aria-label={playing ? "Mettre en pause" : "Lancer le sound design"}
                >
                  {playing ? <Pause size={19} fill={BG_DARK} /> : <Play size={19} fill={BG_DARK} />}
                </button>
              </div>

              <div className="mt-5 flex items-end gap-1.5">
                {Array.from({ length: 36 }, (_, index) => (
                  <motion.span
                    key={index}
                    className="w-1 rounded-full"
                    style={{ background: index % 5 === 0 ? "#B870FF" : ACCENT }}
                    animate={shouldReduceMotion ? { height: 10 + (index % 6) * 3, opacity: 0.7 } : { height: playing ? [8, 18 + ((index * 7) % 34), 9 + ((index * 3) % 16)] : 9 + (index % 6) * 3, opacity: playing ? [0.58, 1, 0.72] : 0.46 }}
                    transition={{ duration: 0.75 + (index % 6) * 0.08, repeat: playing && !shouldReduceMotion ? Infinity : 0, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,44,76,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, #B870FF)` }}
                  animate={{ width: playing ? ["8%", "96%"] : "18%" }}
                  transition={playing && !shouldReduceMotion ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.35 }}
                />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Volume2 size={16} color={isDark ? "rgba(255,255,255,0.66)" : "rgba(7,19,34,0.55)"} />
                <input
                  aria-label="Volume du sound design"
                  type="range"
                  min="0"
                  max="0.55"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="h-1.5 w-full accent-[#8DE8FE]"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative min-h-[34rem] pt-8 lg:min-h-[41rem] lg:pt-24"
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-[14%] top-[14%] h-[28rem] w-[28rem] rounded-full blur-3xl"
              animate={{ opacity: playing ? 0.28 : 0.13, scale: playing ? 1.08 : 0.98 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ background: `rgba(${ACCENT_RGB},0.5)` }}
            />
            <motion.img
              src={imgSpotifyPlayer}
              alt="Playlist Spotify SNCF Connect"
              loading="lazy"
              decoding="async"
              className="relative z-10 mx-auto w-[min(34rem,86vw)] select-none lg:w-[min(38rem,40vw)]"
              animate={shouldReduceMotion ? undefined : { scale: playing ? 1.025 : 1, y: playing ? -8 : 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 56px 96px rgba(0,0,0,${isDark ? 0.54 : 0.22})) drop-shadow(0 0 ${playing ? 58 : 26}px rgba(${ACCENT_RGB},${playing ? 0.26 : 0.12}))`,
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid gap-8 border-t pt-9 md:grid-cols-3"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.72, ease: "easeOut" }}
          style={{ borderColor: isDark ? "rgba(141,232,254,0.16)" : "rgba(0,44,76,0.12)" }}
        >
          {presentationItems.map(([title, text]) => (
            <div key={title} className="flex gap-4">
              <span
                className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{
                  border: `1px solid rgba(${ACCENT_RGB},${isDark ? 0.38 : 0.48})`,
                  boxShadow: `0 0 20px rgba(${ACCENT_RGB},${playing ? 0.24 : 0.12})`,
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
              </span>
              <div>
                <h3 style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.02rem", fontWeight: 800 }}>{title}</h3>
                <p className="mt-2" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.65 }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VideoScene() {
  const { isDark } = useTheme();
  const textColor = isDark ? "#F8FAFC" : "#071426";
  const mutedColor = isDark ? "rgba(235,242,250,0.72)" : "rgba(7,20,38,0.68)";
  const cardBorder = isDark ? "rgba(141,232,254,0.26)" : "rgba(0,44,76,0.16)";
  const infoBorder = isDark ? "rgba(141,232,254,0.16)" : "rgba(0,44,76,0.12)";
  const videoCards = [
    {
      title: "Vidéo du projet",
      duration: "01:24",
      description: "Découvrez le concept, les objectifs et les étapes clés de la réalisation du projet.",
      thumbnail: imgVideoCover1,
      url: videoMain,
    },
    {
      title: "Vidéo UGC",
      duration: "00:45",
      description: "Format court destiné aux réseaux sociaux pour présenter l'opération et générer de l'engagement.",
      thumbnail: imgVideoCover2,
      url: UGC_VIDEO_URL,
    },
  ];
  const infoItems = [
    {
      icon: Clapperboard,
      title: "Un storytelling clair",
      text: "Un message structuré pour présenter le projet et ses enjeux.",
    },
    {
      icon: Smartphone,
      title: "Un format engageant",
      text: "Des vidéos pensées pour capter l'attention et maximiser l'impact.",
    },
    {
      icon: Users,
      title: "Adapté à chaque canal",
      text: "Des contenus optimisés selon les usages et les plateformes.",
    },
  ];

  const openVideo = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:py-32">
      <div className="relative z-10 mx-auto max-w-[92rem]">
        <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.72, ease: "easeOut" }}
          >
            <div className="mb-12 flex items-center gap-4">
              <span
                className="rounded-full border px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]"
                style={{
                  color: ACCENT,
                  borderColor: `rgba(${ACCENT_RGB},0.52)`,
                  boxShadow: `0 0 18px rgba(${ACCENT_RGB},0.12)`,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                07. Vidéos
              </span>
              <span className="h-px w-20 md:w-32" style={{ background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.58), rgba(${ACCENT_RGB},0.08))` }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 16px rgba(${ACCENT_RGB},0.65)` }} />
            </div>

            <h2
              className="max-w-[38rem] text-[2.35rem] font-black leading-[1.08] tracking-[-0.03em] md:text-[3.8rem] lg:text-[3.65rem]"
              style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Des vidéos qui racontent, <span style={{ color: ACCENT }}>inspirent</span> et engagent.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-8 md:text-xl" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif" }}>
              Deux formats vidéo pensés pour valoriser le projet et renforcer son impact sur les réseaux sociaux.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-7 md:grid-cols-2 lg:pt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "120px 0px" }}
            transition={{ duration: 0.78, ease: "easeOut", delay: 0.08 }}
          >
            {videoCards.map((card) => (
              <article key={card.title} className="group">
                <button
                  type="button"
                  onClick={() => openVideo(card.url)}
                  className="relative block aspect-[3/2] w-full overflow-hidden rounded-[1.45rem] text-left outline-none transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#8DE8FE]"
                  style={{ border: `1px solid ${cardBorder}` }}
                  aria-label={`Lire ${card.title}`}
                >
                  <img
                    src={card.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute inset-0 bg-[#06101c]/28 opacity-80 transition-opacity duration-500 group-hover:opacity-55" />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                    <span
                      className="flex h-20 w-20 items-center justify-center rounded-full border bg-black/24 backdrop-blur-md"
                      style={{
                        borderColor: "rgba(255,255,255,0.74)",
                        boxShadow: "0 18px 45px rgba(0,0,0,0.32)",
                      }}
                    >
                      <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" strokeWidth={1.8} />
                    </span>
                  </span>
                </button>

                <div className="px-2 pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-black md:text-3xl" style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {card.title}
                    </h3>
                    <span className="text-sm font-bold" style={{ color: ACCENT, fontFamily: "'Inter', sans-serif" }}>
                      {card.duration}
                    </span>
                  </div>
                  <p className="mt-4 max-w-md text-base leading-7" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif" }}>
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid gap-8 rounded-[1.45rem] border p-7 md:grid-cols-3 md:p-9"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "120px 0px" }}
          transition={{ duration: 0.74, ease: "easeOut", delay: 0.08 }}
          style={{
            borderColor: infoBorder,
            background: isDark ? "rgba(7,17,29,0.22)" : "rgba(255,255,255,0.24)",
            backdropFilter: "blur(10px)",
          }}
        >
          {infoItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5">
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `rgba(${ACCENT_RGB},0.38)`, color: ACCENT }}
              >
                <Icon className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <span>
                <h3 className="text-xl font-black" style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 md:text-base" style={{ color: mutedColor, fontFamily: "'Inter', sans-serif" }}>
                  {text}
                </p>
              </span>
            </div>
          ))}
        </motion.div>
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
  const { isDark } = useTheme();

  return (
    <div
      className="relative w-full"
      style={
        {
          "--sncf-accent": isDark ? ACCENT_DARK : ACCENT_LIGHT,
          "--sncf-accent-rgb": isDark ? ACCENT_DARK_RGB : ACCENT_LIGHT_RGB,
        } as React.CSSProperties
      }
    >
      <HeroSection />
      <main className="relative overflow-hidden">
        <SNCFFlowSystem spotifyActive={spotifyPlaying} />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.8), transparent)` }} />
        <div className="relative z-10">
          <OnboardingScene />
          <RoutineScene />
          <NewsletterScene />
          <CommunicationScene />
          <SpotifyScene playing={spotifyPlaying} setPlaying={setSpotifyPlaying} />
          <VideoScene />
        </div>
        <ClosingSection />
        <div className="h-24" />
      </main>
    </div>
  );
}
