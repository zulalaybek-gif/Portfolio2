import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, Mail, Pause, Play } from "lucide-react";
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
import imgCampaignBlue from "../../assets/sncf-connect/08.jeu-concours-bleu.png";
import imgCampaignPink from "../../assets/sncf-connect/09.jeu-concours-rose.png";
import imgCampaignPhone from "../../assets/sncf-connect/10.jeu-concours.png";
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

function SectionHeader({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  const { r } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "120px 0px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={className}
    >
      <span
        className="section-eyebrow uppercase tracking-[0.3em] block mb-4"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.24) }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2rem, 5vw, 4.2rem)",
          fontWeight: 700,
          color: r(0.74),
          letterSpacing: "-0.045em",
          lineHeight: 0.95,
        }}
      >
        {title}
      </h2>
      {children ? (
        <p
          className="mt-5 max-w-2xl"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.98rem", lineHeight: 1.75, color: r(0.34) }}
        >
          {children}
        </p>
      ) : null}
    </motion.div>
  );
}

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative mx-auto rounded-[2.25rem] p-2 ${className}`}
      style={{
        background: isDark ? "linear-gradient(145deg, #172233, #050912)" : "linear-gradient(145deg, #07101f, #263a52)",
        boxShadow: `0 30px 80px rgba(0,0,0,${isDark ? 0.44 : 0.2}), 0 0 42px rgba(${ACCENT_RGB},0.1)`,
      }}
    >
      <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
      <img src={src} alt={alt} className="block w-full rounded-[1.7rem]" />
    </div>
  );
}

function AmbientLine({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <motion.img
      src={lineAsset}
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute opacity-25 ${className}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      animate={{ x: [0, 18, 0], opacity: [0.16, 0.32, 0.16] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ParticleField({ active = false, color = ACCENT }: { active?: boolean; color?: string }) {
  const particles = Array.from({ length: active ? 64 : 24 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 1.5 + (i % 4) * 0.8;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 4 === 0 ? color : "rgba(255,255,255,0.7)",
              boxShadow: `0 0 ${active ? 22 : 10}px ${color}${active ? "80" : "38"}`,
            }}
            animate={{
              x: active ? [0, (i % 2 ? 42 : -36), 0] : [0, (i % 2 ? 8 : -8), 0],
              y: active ? [0, -52 - (i % 7) * 8, 12, 0] : [0, -10, 0],
              opacity: active ? [0.12, 0.78, 0.28] : [0.1, 0.28, 0.1],
              scale: active ? [0.8, 1.7, 0.9] : [0.75, 1, 0.75],
            }}
            transition={{
              duration: active ? 3 + (i % 5) * 0.35 : 7 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 11) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}

function OnboardingSection() {
  const { r, isDark } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % ONBOARDING_PHONES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative px-6 md:px-12 py-20 overflow-hidden">
      <AmbientLine className="left-[-14rem] top-28 h-44 w-[34rem]" />
      <AmbientLine className="right-[-16rem] bottom-20 h-52 w-[40rem]" flip />
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="ONBOARDING" title="Une découverte guidée, écran par écran">
          Le parcours d’entrée est scénarisé comme une progression : accueil, création des routines, personnalisation, puis paramétrage.
        </SectionHeader>

        <div className="relative mt-14 min-h-[38rem] lg:min-h-[44rem]">
          <div
            className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.65), transparent)` }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.16 : 0.24})` }}
            animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {ONBOARDING_PHONES.map((phone, i) => {
            const isActive = active === i;
            const positions = [
              "left-[2%] top-10 rotate-[-8deg]",
              "left-[27%] top-0 rotate-[3deg]",
              "right-[25%] top-20 rotate-[-3deg]",
              "right-[3%] top-4 rotate-[8deg]",
            ];
            return (
              <motion.button
                key={phone.label}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`absolute ${positions[i]} hidden w-[min(14.5rem,24vw)] text-left lg:block`}
                animate={{ y: isActive ? -18 : 0, scale: isActive ? 1.08 : 0.92, zIndex: isActive ? 8 : 3 }}
              >
                <PhoneFrame src={phone.src} alt={phone.label} />
                <motion.div
                  className="mt-4 rounded-2xl px-4 py-3 backdrop-blur-xl"
                  animate={{ opacity: isActive ? 1 : 0.58 }}
                  style={{ background: isDark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.78)", border: `1px solid ${r(0.06)}` }}
                >
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: r(0.64), fontWeight: 650 }}>{phone.label}</span>
                </motion.div>
              </motion.button>
            );
          })}

          <div className="relative flex min-h-[36rem] items-center justify-center lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 70, rotate: 4 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -70, rotate: -4 }}
                transition={{ duration: 0.45 }}
                className="w-[min(16rem,72vw)]"
              >
                <PhoneFrame src={ONBOARDING_PHONES[active].src} alt={ONBOARDING_PHONES[active].label} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full p-2 backdrop-blur-xl" style={{ background: r(0.04), border: `1px solid ${r(0.08)}` }}>
            {ONBOARDING_PHONES.map((phone, i) => (
              <button
                key={phone.label}
                type="button"
                onClick={() => setActive(i)}
                className="h-3 rounded-full transition-all"
                style={{ width: active === i ? 34 : 12, background: active === i ? ACCENT : r(0.14) }}
                aria-label={`Afficher ${phone.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="relative px-6 md:px-12 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] items-center">
          <SectionHeader eyebrow="CONNECT ROUTINE" title="Une routine qui devient un raccourci vivant">
            Les écrans de création et de gestion sont présentés comme deux temps du même usage : composer son quotidien, puis le retrouver sans effort.
          </SectionHeader>

          <div className="relative min-h-[34rem]">
            <motion.div
              className="absolute left-4 top-8 w-[74%] overflow-hidden rounded-[2rem]"
              initial={{ opacity: 0, x: 50, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              style={{ boxShadow: `0 32px 90px rgba(0,0,0,${isDark ? 0.34 : 0.14})` }}
            >
              <img src={imgRoutineCreate} alt="Création de routine" className="w-full" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 right-0 w-[46%] overflow-hidden rounded-[1.7rem]"
              initial={{ opacity: 0, x: -42, y: 30, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
              style={{ boxShadow: `0 28px 80px rgba(${ACCENT_RGB},0.18)` }}
            >
              <img src={imgRoutineList} alt="Gestion des routines" className="w-full" />
            </motion.div>
            <motion.div
              className="absolute left-[13%] bottom-[16%] flex items-center gap-3 rounded-full px-5 py-3 backdrop-blur-xl"
              style={{ background: isDark ? "rgba(12,19,31,0.72)" : "rgba(255,255,255,0.76)", border: `1px solid rgba(${ACCENT_RGB},0.28)` }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={trainAsset} alt="" className="h-6 w-6 opacity-80" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: r(0.62), fontWeight: 650 }}>quotidien personnalisé</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const { r, isDark } = useTheme();
  const words = ["Trajets", "Personnalisés", "Simplifiés"];

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `rgba(${ACCENT_RGB},${isDark ? 0.12 : 0.22})` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="max-w-6xl mx-auto relative">
        <SectionHeader eyebrow="NEWSLETTER CONNECT ROUTINE" title="L’annonce produit devient une scène de lancement" className="text-center mx-auto" />
        <div className="relative mt-12 min-h-[46rem] flex items-center justify-center">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="absolute hidden text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-[-0.06em] lg:block"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: i === 1 ? ACCENT : r(0.12),
                left: i === 0 ? "2%" : i === 1 ? "55%" : "8%",
                top: i === 0 ? "18%" : i === 1 ? "42%" : "70%",
              }}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              {word}
            </motion.span>
          ))}
          <motion.div
            className="relative z-10 w-[min(22rem,78vw)]"
            initial={{ opacity: 0, y: 80, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            animate={{ y: [0, -12, 0] }}
          >
            <div className="rounded-[2.4rem] p-3" style={{ background: BG_DARK, boxShadow: `0 40px 120px rgba(${ACCENT_RGB},0.18)` }}>
              <img src={imgNewsletter} alt="Newsletter Connect Routine" className="w-full rounded-[1.9rem]" />
            </div>
          </motion.div>
          <motion.div className="absolute right-8 top-24 hidden lg:flex h-20 w-20 items-center justify-center rounded-3xl" style={{ background: ACCENT }} animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Mail size={32} color={BG_DARK} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ActivationSection() {
  const { r, isDark } = useTheme();
  const [variant, setVariant] = useState<"blue" | "pink">("blue");
  const config =
    variant === "blue"
      ? { image: imgCampaignBlue, color: "#2D8CFF", soft: "45,140,255", label: "Bleu" }
      : { image: imgCampaignPink, color: "#FF72B8", soft: "255,114,184", label: "Rose" };

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="COMMUNICATION & ACTIVATION" title="Une direction de campagne modulable">
          Deux choix chromatiques pilotent toute l’ambiance de la scène : visuel, halos, lignes et énergie graphique se transforment ensemble.
        </SectionHeader>

        <motion.div
          className="relative mt-12 min-h-[46rem] overflow-hidden rounded-[2.8rem] p-6 md:p-10"
          animate={{
            background: isDark
              ? `radial-gradient(circle at 50% 24%, rgba(${config.soft},0.26), transparent 28%), linear-gradient(135deg, #07101f, #0c1320)`
              : `radial-gradient(circle at 50% 24%, rgba(${config.soft},0.26), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(${ACCENT_RGB},0.15))`,
          }}
          transition={{ duration: 0.55 }}
          style={{ border: `1px solid ${r(0.08)}` }}
        >
          <motion.div className="absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl" animate={{ background: `rgba(${config.soft},0.28)`, scale: [1, 1.12, 1] }} transition={{ background: { duration: 0.5 }, scale: { duration: 4.8, repeat: Infinity } }} />
          <motion.div className="absolute -right-24 bottom-12 h-80 w-80 rounded-full blur-3xl" animate={{ background: `rgba(${config.soft},0.24)`, scale: [1.08, 1, 1.08] }} transition={{ background: { duration: 0.5 }, scale: { duration: 5.2, repeat: Infinity } }} />
          <motion.div className="absolute inset-x-[-10%] top-1/2 h-[1px]" animate={{ background: `linear-gradient(90deg, transparent, rgba(${config.soft},0.8), transparent)` }} />

          <div className="relative z-10 flex min-h-[40rem] flex-col items-center justify-center gap-8">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={variant}
                  src={config.image}
                  alt={`Visuel d'activation ${config.label.toLowerCase()}`}
                  className="absolute left-1/2 top-1/2 hidden w-64 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] md:block"
                  initial={{ opacity: 0, scale: 0.72, rotate: -10 }}
                  animate={{ opacity: 0.92, scale: 1.15, rotate: variant === "blue" ? -12 : 12, x: variant === "blue" ? -250 : 250 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.55 }}
                  style={{ boxShadow: `0 30px 90px rgba(${config.soft},0.34)` }}
                />
              </AnimatePresence>
              <PhoneFrame src={imgCampaignPhone} alt="Mockup Instagram concours" className="relative z-10 w-[min(18rem,74vw)]" />
            </div>

            <div className="flex items-center gap-4 rounded-full p-2 backdrop-blur-xl" style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.78)", border: `1px solid ${r(0.08)}` }}>
              {[
                { id: "blue" as const, color: "#2D8CFF", label: "Activation bleue" },
                { id: "pink" as const, color: "#FF72B8", label: "Activation rose" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  onClick={() => setVariant(item.id)}
                  className="relative h-12 w-12 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 ${variant === item.id ? 36 : 16}px ${item.color}88` }}
                >
                  <motion.span className="absolute inset-2 rounded-full border border-white/70" animate={{ scale: variant === item.id ? [1, 1.16, 1] : 1 }} transition={{ duration: 1.5, repeat: variant === item.id ? Infinity : 0 }} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpotifyExperienceSection() {
  const { r, isDark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const cover = mode === "dark" ? imgSpotifyDark : imgSpotifyLight;

  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="EXPÉRIENCE SPOTIFY" title="Le son imaginé comme une matière en mouvement">
          Le mockup désertique reste la scène principale. Le player active les particules comme si la playlist mettait l’environnement en vibration.
        </SectionHeader>

        <div className="relative mt-12 overflow-hidden rounded-[2.8rem] bg-black p-4 md:p-8">
          <ParticleField active={playing} color="#8DE8FE" />
          <motion.img
            src={imgSpotifyMain}
            alt="Mockup Spotify avec téléphone dans le désert"
            className="relative z-10 w-full rounded-[2rem]"
            animate={{ scale: playing ? 1.018 : 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="relative z-20 mx-auto -mt-10 grid max-w-4xl gap-5 rounded-[2rem] p-4 backdrop-blur-2xl md:grid-cols-[8rem_1fr_auto] md:p-5"
            style={{ background: "rgba(7,13,22,0.76)", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 90px rgba(0,0,0,0.38)" }}
          >
            <AnimatePresence mode="wait">
              <motion.img key={mode} src={cover} alt="Déclinaison playlist" className="w-full rounded-2xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} />
            </AnimatePresence>
            <div className="flex flex-col justify-center">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontSize: "1.25rem", fontWeight: 700 }}>Votre playlist du quotidien</span>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full" style={{ background: ACCENT }} animate={{ width: playing ? ["8%", "92%"] : "18%" }} transition={playing ? { duration: 5.5, repeat: Infinity, ease: "linear" } : { duration: 0.35 }} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <div className="flex rounded-full bg-white/10 p-1">
                {(["dark", "light"] as const).map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className="rounded-full px-3 py-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: mode === item ? BG_DARK : "rgba(255,255,255,0.65)", background: mode === item ? ACCENT : "transparent" }}>
                    {item === "dark" ? "Sombre" : "Clair"}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setPlaying((value) => !value)} className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: ACCENT, color: BG_DARK, boxShadow: `0 0 36px rgba(${ACCENT_RGB},0.5)` }} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={22} fill={BG_DARK} /> : <Play size={22} fill={BG_DARK} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="VIDÉO PRINCIPALE" title="Un film présenté comme une projection premium">
          La vidéo locale devient un moment cinématique, intégré dans la lumière bleue du projet plutôt qu’un simple lecteur posé sur la page.
        </SectionHeader>
        <div className="relative mt-12 overflow-hidden rounded-[2.8rem] p-3" style={{ background: isDark ? `radial-gradient(circle at 50% 0%, rgba(${ACCENT_RGB},0.2), transparent 36%), #050912` : `radial-gradient(circle at 50% 0%, rgba(${ACCENT_RGB},0.22), transparent 36%), rgba(255,255,255,0.86)`, border: `1px solid ${r(0.08)}` }}>
          <div className="absolute inset-x-10 top-6 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.7), transparent)` }} />
          <video src={videoMain} controls playsInline preload="metadata" className="relative z-10 block w-full rounded-[2.25rem]" style={{ boxShadow: "0 36px 110px rgba(0,0,0,0.35)" }} />
        </div>
      </div>
    </section>
  );
}

function UGCSection() {
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] items-center">
          <SectionHeader eyebrow="UGC" title="Une prise de parole plus sociale et directe">
            Le format UGC est traité comme un contenu mobile, plus spontané, plus humain, et volontairement distinct du film principal.
          </SectionHeader>
          <div className="relative mx-auto w-[min(24rem,78vw)]">
            <motion.div className="absolute -left-10 top-12 h-28 w-28 rounded-full blur-2xl" style={{ background: `rgba(${ACCENT_RGB},0.24)` }} animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} />
            <div className="relative overflow-hidden rounded-[2.5rem] p-2" style={{ background: isDark ? "#050912" : "#07101f", boxShadow: `0 32px 90px rgba(0,0,0,${isDark ? 0.38 : 0.2})` }}>
              <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black/80" />
              <div className="aspect-[9/16] overflow-hidden rounded-[1.85rem] bg-black">
                <iframe src={UGC_URL} title="Vidéo UGC SNCF Connect" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-full px-5 py-3" style={{ background: r(0.04), border: `1px solid ${r(0.08)}` }}>
              <img src={vehiculesAsset} alt="" className="h-6 w-6 opacity-70" />
              <span style={{ fontFamily: "'Inter', sans-serif", color: r(0.36), fontSize: "0.82rem" }}>format social media</span>
            </div>
          </div>
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
  return (
    <div className="relative w-full">
      <HeroSection />
      <OnboardingSection />
      <RoutineSection />
      <NewsletterSection />
      <ActivationSection />
      <SpotifyExperienceSection />
      <VideoSection />
      <UGCSection />
      <ClosingSection />
      <div className="h-24" />
    </div>
  );
}
