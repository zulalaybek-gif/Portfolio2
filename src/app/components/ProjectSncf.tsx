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
import trainAsset from "../../assets/sncf-connect/assets/07.train.svg";
import vehiculesAsset from "../../assets/sncf-connect/assets/10.vehicules.svg";

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

function SectionTitle({ title, align = "left" }: { title: string; align?: "left" | "center" }) {
  const { r } = useTheme();
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={align === "center" ? "text-center" : ""}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(2rem, 5vw, 4.4rem)",
        fontWeight: 700,
        color: r(0.72),
        letterSpacing: "-0.045em",
        lineHeight: 0.92,
      }}
    >
      {title}
    </motion.h2>
  );
}

function AmbientLine({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <motion.img
      src={lineAsset}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      animate={{ x: [0, 22, 0], opacity: [0.12, 0.35, 0.12] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function PageParticleField({ active = false }: { active?: boolean }) {
  const dots = Array.from({ length: active ? 86 : 34 });
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 41) % 100;
        const top = (i * 67) % 100;
        const size = 1.4 + (i % 4) * 0.7;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 5 === 0 ? ACCENT : "rgba(255,255,255,0.64)",
              boxShadow: `0 0 ${active ? 20 : 8}px rgba(${ACCENT_RGB},${active ? 0.36 : 0.16})`,
            }}
            animate={{
              x: active ? [0, i % 2 ? 52 : -44, 0] : [0, i % 2 ? 8 : -8, 0],
              y: active ? [0, -64 - (i % 8) * 8, 8, 0] : [0, -12, 0],
              opacity: active ? [0.08, 0.62, 0.18] : [0.05, 0.22, 0.05],
              scale: active ? [0.7, 1.6, 0.8] : [0.75, 1, 0.75],
            }}
            transition={{
              duration: active ? 3.4 + (i % 5) * 0.28 : 8 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 13) * 0.08,
            }}
          />
        );
      })}
    </div>
  );
}

function SectionParticleField({ active = false, color = ACCENT }: { active?: boolean; color?: string }) {
  const dots = Array.from({ length: active ? 48 : 22 });
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 1.6 + (i % 5) * 0.75;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 4 === 0 ? color : "rgba(255,255,255,0.62)",
              boxShadow: `0 0 ${active ? 24 : 10}px ${color}${active ? "80" : "38"}`,
            }}
            animate={{
              x: active ? [0, i % 2 ? 42 : -36, 0] : [0, i % 2 ? 10 : -10, 0],
              y: active ? [0, -56 - (i % 6) * 8, 0] : [0, -12, 0],
              opacity: active ? [0.12, 0.7, 0.16] : [0.08, 0.24, 0.08],
              scale: active ? [0.8, 1.55, 0.9] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: active ? 3.2 + (i % 5) * 0.3 : 7 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 11) * 0.08,
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
      className={`relative z-10 select-none ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: [0, -10, 0] }}
      style={{ filter: `drop-shadow(0 34px 48px rgba(0,0,0,0.28)) drop-shadow(0 0 28px rgba(${ACCENT_RGB},0.12))` }}
    />
  );
}

function OnboardingSection() {
  const { r, isDark } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % ONBOARDING_PHONES.length), 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <AmbientLine className="left-[-18rem] top-28 h-56 w-[46rem] opacity-30" />
      <AmbientLine className="right-[-18rem] bottom-8 h-64 w-[48rem] opacity-25" flip />
      <motion.div
        className="absolute left-1/2 top-[46%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.13 : 0.2})` }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Onboarding" />
        <div className="relative mt-14 min-h-[42rem] lg:min-h-[48rem]">
          <div className="absolute left-0 right-0 top-1/2 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.75), transparent)` }} />
          {ONBOARDING_PHONES.map((phone, i) => {
            const isActive = active === i;
            const positions = [
              "left-0 top-16 lg:w-[18rem] rotate-[-3deg]",
              "left-[24%] top-2 lg:w-[19rem] rotate-[2deg]",
              "right-[22%] top-24 lg:w-[18rem] rotate-[-2deg]",
              "right-0 top-8 lg:w-[18rem] rotate-[3deg]",
            ];
            return (
              <motion.button
                key={phone.label}
                type="button"
                onClick={() => setActive(i)}
                className={`absolute hidden lg:block ${positions[i]}`}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                animate={{ scale: isActive ? 1.06 : 0.9, opacity: isActive ? 1 : 0.56, y: isActive ? -16 : 0, zIndex: isActive ? 10 : 2 }}
              >
                <img src={phone.src} alt={phone.label} className="w-full" style={{ filter: `drop-shadow(0 34px 48px rgba(0,0,0,0.24)) drop-shadow(0 0 26px rgba(${ACCENT_RGB},0.16))` }} />
              </motion.button>
            );
          })}

          <div className="relative flex min-h-[38rem] items-center justify-center lg:hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={ONBOARDING_PHONES[active].src}
                alt={ONBOARDING_PHONES[active].label}
                className="w-[min(17rem,78vw)]"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.45 }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4">
            {ONBOARDING_PHONES.map((phone, i) => (
              <button
                key={phone.label}
                type="button"
                aria-label={`Afficher ${phone.label}`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full"
                style={{ width: active === i ? 54 : 18, background: active === i ? ACCENT : r(0.14) }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineSection() {
  const { r } = useTheme();
  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <AmbientLine className="left-[8%] top-12 h-44 w-[34rem] opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Connect Routine" />
        <div className="relative mt-12 min-h-[40rem]">
          <FloatingMockup src={imgRoutineCreate} alt="Création de routine" className="absolute left-0 top-0 w-[min(42rem,76vw)] rounded-[2rem]" />
          <FloatingMockup src={imgRoutineList} alt="Mes routines" className="absolute right-0 bottom-0 w-[min(24rem,44vw)] rounded-[1.6rem]" delay={0.12} />
          <motion.div
            className="absolute left-[42%] top-[48%] hidden -translate-x-1/2 -translate-y-1/2 items-center gap-3 lg:flex"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={trainAsset} alt="" className="h-10 w-10 opacity-80" />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: r(0.58), fontSize: "1.1rem", fontWeight: 650 }}>créer → retrouver</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { r, isDark } = useTheme();
  const ribbons = [
    { word: "Trajets", top: "14%", left: "8%", rotate: -8, delay: 0 },
    { word: "Personnalisés", top: "38%", right: "5%", rotate: 7, delay: 0.15 },
    { word: "Simplifiés", bottom: "12%", left: "12%", rotate: 4, delay: 0.3 },
  ];

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.15 : 0.25})` }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Newsletter" align="center" />
        <div className="relative mt-8 min-h-[48rem] flex items-center justify-center">
          {ribbons.map((item) => (
            <motion.div
              key={item.word}
              className="absolute hidden rounded-full px-8 py-4 backdrop-blur-xl lg:block"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                rotate: `${item.rotate}deg`,
                background: isDark ? "rgba(141,232,254,0.1)" : "rgba(255,255,255,0.74)",
                border: `1px solid rgba(${ACCENT_RGB},0.28)`,
                color: item.word === "Personnalisés" ? ACCENT : r(0.58),
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.4rem,3vw,2.6rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: item.delay }}
              animate={{ y: [0, -12, 0] }}
            >
              {item.word}
            </motion.div>
          ))}
          <motion.img
            src={imgNewsletter}
            alt="Newsletter Connect Routine complète"
            className="relative z-10 max-h-[42rem] w-auto max-w-[72vw]"
            initial={{ opacity: 0, y: 60, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            animate={{ y: [0, -10, 0] }}
            style={{ filter: `drop-shadow(0 40px 58px rgba(0,0,0,0.28)) drop-shadow(0 0 34px rgba(${ACCENT_RGB},0.16))` }}
          />
        </div>
      </div>
    </section>
  );
}

function ActivationSection() {
  const { r, isDark } = useTheme();
  const [variant, setVariant] = useState<"blue" | "pink">("pink");
  const config =
    variant === "blue"
      ? { image: imgCampaignBlue, color: "#2D8CFF", soft: "45,140,255", opposite: "#8DE8FE" }
      : { image: imgCampaignPink, color: "#FF72B8", soft: "255,114,184", opposite: "#BA7CFF" };

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? `radial-gradient(circle at 50% 42%, rgba(${config.soft},0.22), transparent 28%), radial-gradient(circle at 18% 70%, rgba(${ACCENT_RGB},0.1), transparent 24%)`
            : `radial-gradient(circle at 50% 42%, rgba(${config.soft},0.25), transparent 28%), radial-gradient(circle at 18% 70%, rgba(${ACCENT_RGB},0.16), transparent 24%)`,
        }}
        transition={{ duration: 0.55 }}
      />
      <AmbientLine className="left-[-18rem] top-1/3 h-64 w-[52rem] opacity-25" />
      <AmbientLine className="right-[-16rem] bottom-16 h-64 w-[52rem] opacity-25" flip />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Communication" align="center" />
        <div className="relative mt-10 min-h-[48rem] flex flex-col items-center justify-center">
          <motion.div className="absolute h-[34rem] w-[34rem] rounded-full blur-3xl" animate={{ background: `rgba(${config.soft},0.28)`, scale: [1, 1.12, 1] }} transition={{ background: { duration: 0.5 }, scale: { duration: 4.5, repeat: Infinity } }} />
          <AnimatePresence mode="wait">
            <motion.img
              key={variant}
              src={config.image}
              alt={`Instagram ${variant === "blue" ? "bleu" : "rose"}`}
              className="relative z-10 w-[min(22rem,76vw)]"
              initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -36, scale: 0.94, filter: "blur(8px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{ filter: `drop-shadow(0 42px 62px rgba(${config.soft},0.32)) drop-shadow(0 0 40px rgba(${config.soft},0.24))` }}
            />
          </AnimatePresence>

          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={`${variant}-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${8 + ((i * 17) % 84)}%`,
                top: `${12 + ((i * 23) % 74)}%`,
                width: 4 + (i % 4),
                height: 4 + (i % 4),
                background: i % 2 ? config.color : config.opposite,
                boxShadow: `0 0 18px ${config.color}`,
              }}
              animate={{ x: [0, i % 2 ? 24 : -24, 0], y: [0, -28, 0], opacity: [0.18, 0.72, 0.18] }}
              transition={{ duration: 3 + (i % 4) * 0.35, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <div className="relative z-20 mt-8 flex items-center gap-5">
            {[
              { id: "blue" as const, color: "#2D8CFF", label: "Version bleue" },
              { id: "pink" as const, color: "#FF72B8", label: "Version rose" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                onClick={() => setVariant(item.id)}
                className="relative h-14 w-14 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 ${variant === item.id ? 42 : 18}px ${item.color}99` }}
              >
                <motion.span className="absolute inset-3 rounded-full border border-white/75" animate={{ scale: variant === item.id ? [1, 1.18, 1] : 1 }} transition={{ duration: 1.4, repeat: variant === item.id ? Infinity : 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotifyExperienceSection({ playing, setPlaying }: { playing: boolean; setPlaying: (value: boolean) => void }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const cover = mode === "dark" ? imgSpotifyDark : imgSpotifyLight;

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Playlist Spotify" />
        <div className="relative mt-10 min-h-[44rem] flex items-center justify-center">
          <SectionParticleField active={playing} color={ACCENT} />
          <motion.img
            src={imgSpotifyMain}
            alt="Mockup Spotify avec téléphone dans le désert"
            className="relative z-10 w-full max-w-5xl"
            animate={{ scale: playing ? 1.018 : 1 }}
            transition={{ duration: 0.8 }}
            style={{ filter: `drop-shadow(0 44px 70px rgba(0,0,0,0.45))` }}
          />
          <motion.div
            className="absolute bottom-0 z-20 flex w-[min(54rem,90vw)] items-center gap-5 rounded-full px-5 py-4 backdrop-blur-2xl"
            style={{ background: "rgba(7,13,22,0.72)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img key={mode} src={cover} alt="Déclinaison playlist" className="h-16 w-16 rounded-2xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45 }} />
            </AnimatePresence>
            <div className="min-w-0 flex-1">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontWeight: 700 }}>Votre playlist du quotidien</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/12">
                <motion.div className="h-full rounded-full" style={{ background: ACCENT }} animate={{ width: playing ? ["10%", "90%"] : "18%" }} transition={playing ? { duration: 5.2, repeat: Infinity, ease: "linear" } : { duration: 0.35 }} />
              </div>
            </div>
            <div className="hidden rounded-full bg-white/10 p-1 sm:flex">
              {(["dark", "light"] as const).map((item) => (
                <button key={item} type="button" onClick={() => setMode(item)} className="rounded-full px-3 py-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: mode === item ? BG_DARK : "rgba(255,255,255,0.65)", background: mode === item ? ACCENT : "transparent" }}>
                  {item === "dark" ? "Sombre" : "Clair"}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setPlaying(!playing)} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: ACCENT, color: BG_DARK, boxShadow: `0 0 36px rgba(${ACCENT_RGB},0.5)` }} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause size={22} fill={BG_DARK} /> : <Play size={22} fill={BG_DARK} />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { isDark } = useTheme();
  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <motion.div className="absolute left-1/2 top-1/2 h-[38rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.14 : 0.22})` }} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 6, repeat: Infinity }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle title="Vidéos" />
        <div className="relative mt-12">
          <video src={videoMain} controls playsInline preload="metadata" className="block w-full rounded-[2rem]" style={{ boxShadow: "0 42px 110px rgba(0,0,0,0.38)" }} />
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1fr] items-center">
          <div className="relative mx-auto w-[min(22rem,76vw)]">
            <div className="relative overflow-hidden rounded-[2.4rem] bg-black p-2" style={{ boxShadow: "0 36px 90px rgba(0,0,0,0.32)" }}>
              <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
              <div className="aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-black">
                <iframe src={UGC_URL} title="Vidéo UGC SNCF Connect" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: ACCENT, fontSize: "clamp(1.7rem,4vw,3.4rem)", fontWeight: 700, letterSpacing: "-0.04em" }}>UGC</span>
            <p className="mt-4 max-w-md" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.58)", lineHeight: 1.75 }}>
              Un format plus social, vertical et spontané, traité différemment du film principal.
            </p>
            <img src={vehiculesAsset} alt="" className="mt-8 h-14 w-14 opacity-50" />
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

  return (
    <div className="relative w-full overflow-hidden">
      <PageParticleField active={spotifyPlaying} />
      <div className="relative z-10">
        <HeroSection />
        <OnboardingSection />
        <RoutineSection />
        <NewsletterSection />
        <ActivationSection />
        <SpotifyExperienceSection playing={spotifyPlaying} setPlaying={setSpotifyPlaying} />
        <VideoSection />
        <ClosingSection />
        <div className="h-24" />
      </div>
    </div>
  );
}
