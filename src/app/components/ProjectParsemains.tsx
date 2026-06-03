import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ProjectBackButton } from "./ProjectBackButton";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

import logoMain from "../../assets/parsemains/01.logo-principal.svg";
import logoAltA from "../../assets/parsemains/02.declinaison-logo.svg";
import logoAltB from "../../assets/parsemains/03.declinaison-logo.svg";
import titleSystemA from "../../assets/parsemains/04.systeme-de-titrage.svg";
import titleSystemB from "../../assets/parsemains/05.systeme-de-titrage.svg";
import imgBrochure from "../../assets/parsemains/06.depliant.jpg";
import imgBookmarkMockup from "../../assets/parsemains/07.marque-page.png";
import iconRecover from "../../assets/parsemains/08.picto-recuperer-le-papier.svg";
import iconDry from "../../assets/parsemains/09.picto-secher-le-papier.svg";
import iconSift from "../../assets/parsemains/10.picto-tamiser-le-papier.svg";
import imgSocialProfile from "../../assets/parsemains/11.reseaux-sociaux.png";
import imgLinkedin from "../../assets/parsemains/12.linkedin.png";
import imgLinkedinPosts from "../../assets/parsemains/13.linkedin-publications.png";
import imgMotionHero from "../../assets/parsemains/14.habillage-video-1.png";
import imgMotionA from "../../assets/parsemains/15.habillage-video-2.png";
import imgMotionB from "../../assets/parsemains/16.habillage-video-3.png";
import imgMotionC from "../../assets/parsemains/17.habillage-video-4.png";
import imgWebsite from "../../assets/parsemains/18.refonte-de-site-web.png";
import imgMobile from "../../assets/parsemains/19.refonte-de-site-mobile.png";
import imgBookmarks from "../../assets/parsemains/23.marque-page-1-2-3.png";
import imgPosters from "../../assets/parsemains/24-mockup-affiches.png";
import imgPackaging from "../../assets/parsemains/25.mockup-packaging.png";
import shapeSun from "../../assets/parsemains/A.soleil.svg";
import extraIconA from "../../assets/parsemains/F.picto.svg";
import extraIconB from "../../assets/parsemains/G.picto.svg";
import extraIconC from "../../assets/parsemains/H.picto.svg";
import shapeWaveJ from "../../assets/parsemains/J.vagues.svg";

const shapeWaveA = shapeWaveJ;
const shapeWaveB = shapeWaveJ;
const shapeWaveC = shapeWaveJ;

const ORANGE = "#F08100";
const ORANGE_SOFT = "#F4A64A";
const PEACH = "#F8C27B";
const MAGENTA = "#C95BC1";
const PURPLE = "#A92DA7";
const BLUE = "#48A3DA";
const BLACK = "#050505";
const PAPER = "#F8F2E8";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "140px 0px" }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span
      className="section-eyebrow uppercase tracking-[0.28em] block mb-4"
      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.25) }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, color }: { children: string; color?: string }) {
  const { r } = useTheme();
  return (
    <h2
      className="mb-6"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(1.7rem, 4vw, 3rem)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        color: color || r(0.82),
      }}
    >
      {children}
    </h2>
  );
}

function ImageCard({
  src,
  alt,
  className = "",
  imgClassName = "w-full h-full object-cover",
  pad = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  pad?: boolean;
}) {
  const { r, isDark } = useTheme();
  return (
    <motion.div
      className={`overflow-hidden rounded-3xl ${className}`}
      style={{
        background: isDark ? r(0.04) : "#fff",
        border: `1px solid ${r(0.06)}`,
        boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)",
      }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
    >
      <img src={src} alt={alt} className={`${imgClassName} ${pad ? "p-5 md:p-7" : ""}`} loading="lazy" />
    </motion.div>
  );
}

function BrowserMockup({ src, alt }: { src: string; alt: string }) {
  const { r, isDark } = useTheme();
  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{
        background: isDark ? r(0.04) : "#fff",
        border: `1px solid ${r(0.06)}`,
        boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.28)" : "0 28px 80px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${r(0.06)}` }}>
        {[ORANGE, PEACH, BLACK].map((color) => (
          <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        ))}
        <span className="ml-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>
          parsemains.fr
        </span>
      </div>
      <div className="max-h-[620px] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin" }}>
        <img src={src} alt={alt} className="block w-full" loading="lazy" />
      </div>
    </div>
  );
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  const { isDark } = useTheme();
  return (
    <motion.div
      className="relative w-full max-w-[330px] rounded-[2.55rem] p-[10px]"
      style={{
        aspectRatio: "390 / 844",
        background: isDark
          ? "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 38%, rgba(0,0,0,0.34))"
          : "linear-gradient(145deg, rgba(20,20,20,0.9), rgba(0,0,0,0.98))",
        boxShadow: isDark ? "0 30px 90px rgba(0,0,0,0.34)" : "0 30px 90px rgba(0,0,0,0.14)",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div className="absolute left-1/2 top-[18px] z-10 h-[22px] w-[98px] -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full w-full overflow-y-auto overflow-x-hidden rounded-[1.9rem]" style={{ background: "#fff", scrollbarWidth: "thin" }}>
        <img src={src} alt={alt} className="block w-full h-auto" loading="lazy" />
      </div>
    </motion.div>
  );
}

function DecorativeLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.img
        src={shapeWaveJ}
        alt=""
        className="absolute right-0 top-10 w-[42rem] max-w-[88vw] opacity-[0.42]"
        animate={{ y: [0, 18, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={shapeWaveA}
        alt=""
        className="absolute left-4 bottom-6 w-[28rem] max-w-[78vw] opacity-[0.26]"
        animate={{ x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={shapeSun}
        alt=""
        className="absolute right-[10%] bottom-[18%] w-20 opacity-[0.34] md:w-28"
        animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={extraIconA}
        alt=""
        className="absolute right-[18%] top-[24%] hidden w-20 opacity-[0.18] md:block"
        animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function PageDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.img
        src={shapeSun}
        alt=""
        className="absolute -right-24 top-[18rem] w-[24rem] opacity-[0.14]"
        animate={{ rotate: [0, 10, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={shapeSun}
        alt=""
        className="absolute -left-32 top-[190rem] w-[22rem] opacity-[0.12]"
        animate={{ rotate: [0, -8, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <img src={shapeWaveA} alt="" className="absolute -right-[20%] top-[74rem] w-[56rem] opacity-[0.18]" />
      <img src={shapeWaveB} alt="" className="absolute -left-[16%] top-[132rem] w-[48rem] opacity-[0.15]" />
      <img src={shapeWaveC} alt="" className="absolute right-[-18%] bottom-[34rem] w-[58rem] opacity-[0.18]" />
      <img src={extraIconA} alt="" className="absolute left-[7%] top-[116rem] w-28 opacity-[0.13]" />
      <img src={extraIconB} alt="" className="absolute right-[8%] top-[214rem] w-32 opacity-[0.12]" />
      <img src={extraIconC} alt="" className="absolute left-[10%] bottom-[72rem] w-28 opacity-[0.12]" />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="relative min-h-[78vh] overflow-hidden px-6 md:px-12 pt-28 pb-16 md:pb-20">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          color: r(0.55),
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.72)",
          border: `1px solid ${r(0.12)}`,
        }}
      >
        {lang === "fr" ? "Retour aux projets" : "Back to projects"}
      </ProjectBackButton>
      <DecorativeLayer />

      <div className="relative z-10 max-w-6xl mx-auto min-h-[62vh] flex items-center">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-eyebrow uppercase tracking-[0.28em] block mb-7"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.28) }}
          >
            Workshop — Refonte d'identite visuelle & direction artistique
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
            className="mb-9 max-w-xl"
          >
            <img src={logoMain} alt="Parsemains" className="w-full max-w-[13rem] md:max-w-[17rem]" style={{ filter: isDark ? "invert(1)" : "none" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 1.7vw, 1.25rem)", lineHeight: 1.8, color: r(0.45) }}
          >
            Parsemains est un projet de refonte d'identite visuelle pense autour du papier, du territoire et de la transmission. L'objectif etait de construire un univers plus contemporain, expressif et memorable, tout en conservant l'ancrage artisanal et local de la marque.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-5 max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", lineHeight: 1.75, color: r(0.36) }}
          >
            Projet realise en equipe dans le cadre d'un workshop. J'ai participe a la construction de la direction artistique, aux recherches graphiques et a la formalisation de l'univers visuel de la marque.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-14 md:py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
        <FadeIn>
          <SectionLabel>Direction visuelle</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2.6vw, 2rem)", fontWeight: 650, color: ORANGE }}>
            Une identite plus contemporaine, expressive et memorisable.
          </h2>
          <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            Le projet s'appuie sur un storytelling fort : celui de papiers recuperes localement, transformes et perpetues a travers une identite visuelle chaleureuse, elegante et legerement decalee.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <SectionLabel>Enjeu du projet</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2.6vw, 2rem)", fontWeight: 650, color: r(0.75) }}>
            Raconter l'histoire de la marque sans devenir trop institutionnel.
          </h2>
          <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            L'enjeu etait de donner a Parsemains une identite reconnaissable, capable de raconter son histoire sans devenir trop institutionnelle. Le workshop nous a permis de construire une direction artistique plus affirmee, entre elegance, matiere, reemploi et spontaneite.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function LogoSection() {
  const { r, isDark } = useTheme();
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-16 md:py-[4.5rem]">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Logo</SectionLabel>
          <SectionTitle>Logo principal</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-12 md:py-14"
            style={{
              background: isDark ? `linear-gradient(135deg, ${r(0.03)}, rgba(240,129,0,0.08))` : `linear-gradient(135deg, #fff, ${PAPER})`,
              border: `1px solid ${r(0.06)}`,
            }}
          >
            <img src={shapeWaveJ} alt="" className="absolute right-5 top-4 w-[32rem] max-w-[86vw] opacity-[0.36]" />
            <img src={shapeWaveA} alt="" className="absolute left-4 bottom-0 w-[24rem] max-w-[70vw] opacity-[0.22]" />
            <motion.img
              src={shapeSun}
              alt=""
              className="absolute right-8 bottom-8 w-16 opacity-[0.32] md:w-20"
              animate={{ rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="flex min-h-[5rem] items-center">
                <img src={logoMain} alt="Logo principal Parsemains" className="w-full max-w-[6rem] md:max-w-[8rem]" style={{ filter: isDark ? "invert(1)" : "none" }} />
              </div>
              <div className="flex items-end gap-3 md:gap-4">
                {[ORANGE, "#FFFFFF", BLACK].map((color) => (
                  <span
                    key={color}
                    className="block h-12 w-12 rounded-2xl md:h-16 md:w-16"
                    style={{ background: color, border: color === "#FFFFFF" ? `1px solid ${r(0.14)}` : "none" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LogoVariationsSection() {
  const { r, isDark } = useTheme();
  const variations = [
    { src: logoAltA, label: "Version noire", filter: isDark ? "invert(1)" : "none" },
    { src: logoAltB, label: "Version orange", filter: "none" },
  ];
  return (
    <section className="px-6 md:px-12 py-14 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Declinaisons</SectionLabel>
          <SectionTitle>Declinaisons du logo</SectionTitle>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-5">
          {variations.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.08}>
              <motion.div
                className="min-h-[15rem] md:min-h-[18rem] flex items-center justify-center px-8 py-10"
                style={{ borderTop: `1px solid ${r(0.06)}`, borderBottom: `1px solid ${r(0.06)}` }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <img src={item.src} alt={item.label} className="h-auto max-h-[13rem] md:max-h-[15rem] w-auto max-w-full" style={{ filter: item.filter }} />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function UniverseSection() {
  const { r, isDark } = useTheme();
  const primaryColors = [
    { name: "Orange", value: ORANGE },
    { name: "Blanc", value: "#FFFFFF" },
    { name: "Noir", value: BLACK },
  ];
  const secondaryColors = [
    { name: "Peche", value: ORANGE_SOFT },
    { name: "Sable", value: PEACH },
    { name: "Magenta", value: MAGENTA },
    { name: "Violet", value: PURPLE },
    { name: "Bleu", value: BLUE },
  ];
  const typoSamples = [
    {
      label: "Titrage",
      name: "DAZZLE UNICASE",
      family: "'Dazzle Unicase', 'Space Grotesk', sans-serif",
      weight: 800,
      usage: "Titres, mots-signaux et compositions graphiques de marque.",
      weights: ["Bold", "Display", "Label"],
    },
    {
      label: "Texte courant",
      name: "Avenir",
      family: "'Avenir', 'Inter', sans-serif",
      weight: 400,
      usage: "Paragraphes, informations pratiques et contenus editoriaux.",
      weights: ["Book", "Roman", "Medium"],
    },
  ];
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-[4.5rem] md:py-24">
      <img src={shapeWaveB} alt="" className="pointer-events-none absolute right-8 top-10 w-[36rem] max-w-[80vw] opacity-[0.18]" />
      <img src={shapeSun} alt="" className="pointer-events-none absolute left-6 top-28 w-16 opacity-[0.22] md:left-12 md:w-20" />
      <img src={extraIconC} alt="" className="pointer-events-none absolute right-10 bottom-12 hidden w-24 opacity-[0.16] md:block" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Univers graphique</SectionLabel>
          <SectionTitle>Couleurs, typographies & signes</SectionTitle>
          <p className="max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            L'identite repose sur une typographie forte et genereuse, associee a une typographie plus sobre pour equilibrer caractere et lisibilite.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
          {typoSamples.map((typo, index) => (
            <FadeIn key={typo.name} delay={index * 0.08}>
              <div className="rounded-3xl p-6 md:p-7 h-full" style={{ background: isDark ? r(0.04) : "#fff", border: `1px solid ${r(0.06)}` }}>
                <span className="uppercase tracking-[0.18em]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", color: r(0.24) }}>
                  {typo.label}
                </span>
                <h3 className="mt-4" style={{ fontFamily: typo.family, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: typo.weight, color: r(0.76), letterSpacing: typo.name === "DAZZLE UNICASE" ? "-0.04em" : "0" }}>
                  {typo.name}
                </h3>
                <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.34) }}>
                  {typo.usage}
                </p>
                <div className="mt-5 flex gap-1 flex-wrap">
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <span key={letter} style={{ fontFamily: typo.family, fontSize: "0.72rem", fontWeight: typo.weight, color: r(0.28) }}>{letter}</span>
                  ))}
                </div>
                <div className="mt-1 flex gap-1 flex-wrap">
                  {"0123456789!&?".split("").map((letter, letterIndex) => (
                    <span key={`${letter}-${letterIndex}`} style={{ fontFamily: typo.family, fontSize: "0.72rem", fontWeight: typo.weight, color: r(0.2) }}>{letter}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {typo.weights.map((weight) => (
                    <span key={weight} className="rounded-full px-3 py-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", color: r(0.32), border: `1px solid ${r(0.08)}` }}>
                      {weight}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div
            className="relative mt-8 overflow-hidden rounded-[2rem] p-6 md:p-8"
            style={{ background: isDark ? r(0.035) : "#fff", border: `1px solid ${r(0.06)}` }}
          >
            <img src={shapeWaveJ} alt="" className="absolute right-4 top-0 w-[34rem] max-w-[82vw] opacity-[0.19]" />
            <div className="relative z-10">
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: r(0.74) }}>Couleurs principales</h3>
            <p className="mt-3 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", lineHeight: 1.75, color: r(0.34) }}>
              La palette principale s'articule autour d'un orange monochrome, choisi pour son energie, sa chaleur et sa vitalite, accompagne de blanc pour la simplicite et de noir pour le contraste.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4 md:gap-5">
              {primaryColors.map((color) => (
                <div key={color.name}>
                  <div className="aspect-[1.35/1] rounded-2xl" style={{ background: color.value, border: color.value === "#FFFFFF" ? `1px solid ${r(0.14)}` : "none" }} />
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem", color: r(0.34) }}>{color.name}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: r(0.5) }}>{color.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: r(0.74) }}>Couleurs secondaires</h3>
            <p className="mt-3 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", lineHeight: 1.75, color: r(0.34) }}>
              Les touches colorees secondaires apportent un aspect plus vivant et plus floral a l'univers de marque.
            </p>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
              {secondaryColors.map((color) => (
                <div key={color.name}>
                  <div className="aspect-square rounded-2xl" style={{ background: color.value }} />
                  <span className="block mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.74rem", color: r(0.34) }}>{color.name}</span>
                  <span className="block mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", fontWeight: 700, color: r(0.5) }}>{color.value}</span>
                </div>
              ))}
            </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="relative mt-12 overflow-hidden">
            <img src={shapeWaveC} alt="" className="pointer-events-none absolute right-0 top-0 hidden w-[28rem] opacity-[0.16] md:block" />
            <SectionLabel>Systeme de titrage</SectionLabel>
            <div className="relative z-10 grid lg:grid-cols-[0.82fr_1.18fr] gap-8 items-start">
              <div className="max-w-2xl">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2.15rem)", fontWeight: 700, color: r(0.78) }}>
                  Un format label pour porter l'engagement.
                </h3>
                <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", lineHeight: 1.8, color: r(0.38) }}>
                  Le systeme graphique reprend des elements lies au papier, a l'edition et a la fabrication : labels, traits de coupe, compositions de titrage et reperes visuels. Ces elements creent une identite structuree, tout en rappelant l'univers artisanal du projet.
                </p>
              </div>
              <div className="grid gap-10">
                {[titleSystemA, titleSystemB].map((src) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Systeme de titrage Parsemains"
                    className="w-full max-h-[16rem] object-contain"
                    style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }}
                    loading="lazy"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Formes circulaires", "Les formes circulaires evoquent l'unite, le cycle de vie et la diffusion."],
              ["Lignes topographiques", "Les lignes inspirees des cartes topographiques rappellent le territoire, les volumes et l'ancrage local."],
              ["References symboliques", "Les references aux runes et a la mythologie nordique apportent une dimension de protection, de transmission et de singularite."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl p-5 md:p-6" style={{ background: isDark ? r(0.035) : "rgba(255,255,255,0.82)", border: `1px solid ${r(0.06)}` }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontWeight: 700, color: r(0.72) }}>{title}</h3>
                <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: r(0.34) }}>{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PictogramsSection() {
  const icons = [
    { src: iconRecover, label: "Recuperer le papier" },
    { src: iconDry, label: "Secher le papier" },
    { src: iconSift, label: "Tamiser le papier" },
  ];
  return (
    <section className="px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Pictogrammes</SectionLabel>
          <SectionTitle>Un vocabulaire simple et identifiable</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] px-6 py-12 md:px-12 md:py-16" style={{ background: ORANGE }}>
            <img src={shapeWaveJ} alt="" className="absolute left-4 top-0 w-[42rem] max-w-[90vw] opacity-[0.34] brightness-0 invert" />
            <img src={shapeWaveB} alt="" className="absolute right-4 bottom-0 w-[36rem] max-w-[88vw] opacity-[0.27] brightness-0 invert" />
            <img src={extraIconB} alt="" className="absolute right-8 top-8 hidden w-20 opacity-[0.18] brightness-0 invert md:block" />
            <p className="relative z-10 mb-10 max-w-2xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.82)" }}>
              Les pictogrammes ajoutent une touche plus decalee et humoristique a l'identite. Ils cassent les codes trop doux ou trop floraux, tout en rendant l'univers plus accessible, vivant et memorable.
            </p>
            <div className="relative z-10 grid md:grid-cols-3 gap-10 md:gap-12 items-end">
              {icons.map((icon, index) => (
                <motion.div
                  key={icon.label}
                  className="flex flex-col items-center justify-end gap-8"
                  whileHover={{ y: -6, rotate: index === 1 ? -1 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className="h-[11rem] md:h-[14rem] w-full object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                    loading="lazy"
                  />
                  <h3 className="text-center uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.15rem, 2.4vw, 1.85rem)", fontWeight: 500, letterSpacing: "0", color: "#fff" }}>
                    {icon.label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PrintSection() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Supports imprimes</SectionLabel>
          <SectionTitle>Objets, depliant & marque-pages</SectionTitle>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
          <ImageCard src={imgBrochure} alt="Mise en situation du depliant Parsemains" className="aspect-[16/10]" />
          <ImageCard src={imgBookmarks} alt="Trois marque-pages Parsemains" className="aspect-[16/10]" imgClassName="w-full h-full object-contain" pad />
          <ImageCard src={imgBookmarkMockup} alt="Mise en situation marque-page Parsemains" className="aspect-[16/10]" />
        </div>

        <FadeIn>
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            <div>
              <SectionLabel>Affiches</SectionLabel>
              <ImageCard src={imgPosters} alt="Mockup affiches Parsemains" className="aspect-[16/10]" />
            </div>
            <div>
              <SectionLabel>Packaging</SectionLabel>
              <ImageCard src={imgPackaging} alt="Mockup packaging Parsemains" className="aspect-[16/10]" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function SocialSection() {
  const { r, isDark } = useTheme();
  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-[4.5rem] md:py-24">
      <img src={shapeWaveA} alt="" className="pointer-events-none absolute left-6 top-20 w-[32rem] max-w-[80vw] opacity-[0.18]" />
      <motion.img
        src={shapeSun}
        alt=""
        className="pointer-events-none absolute right-10 top-28 w-16 opacity-[0.28] md:w-20"
        animate={{ rotate: [0, -9, 0], y: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Reseaux sociaux</SectionLabel>
          <SectionTitle>Un systeme editorial reconnaissable</SectionTitle>
          <p className="max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            L'identite a ete pensee pour plusieurs supports : logo principal, declinaisons social media, systemes de titrage, pictogrammes, visuels Instagram et LinkedIn.
          </p>
        </FadeIn>

        <FadeIn>
          <div>
            <SectionLabel>Instagram</SectionLabel>
            <motion.div
              className="relative overflow-hidden rounded-[2rem] px-4 py-8 md:px-8 md:py-10"
              style={{
                background: "#fff",
                border: `1px solid ${r(0.06)}`,
                boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)",
              }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <img src={shapeWaveJ} alt="" className="absolute right-6 top-0 w-[34rem] max-w-[84vw] opacity-[0.34]" />
              <img src={shapeWaveB} alt="" className="absolute right-0 bottom-0 w-[24rem] max-w-[70vw] opacity-[0.22]" />
              <img src={extraIconA} alt="" className="absolute right-[8%] top-[9%] w-16 opacity-[0.2]" />
              <img src={imgSocialProfile} alt="Composition Instagram Parsemains" className="relative z-10 mx-auto block w-full max-w-[760px] h-auto" loading="lazy" />
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-14">
            <SectionLabel>LinkedIn</SectionLabel>
            <div className="grid lg:grid-cols-2 gap-6">
              {[{ src: imgLinkedin, alt: "Publication LinkedIn Parsemains" }, { src: imgLinkedinPosts, alt: "Publications LinkedIn Parsemains" }].map((item) => (
                <motion.div
                  key={item.src}
                  className="overflow-hidden rounded-3xl p-5 md:p-7 aspect-[16/10] flex items-center justify-center"
                  style={{
                    background: "#fff",
                    border: `1px solid ${r(0.06)}`,
                    boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)",
                  }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  <img src={item.src} alt={item.alt} className="max-h-full w-full object-contain" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MotionSection() {
  const { r, isDark } = useTheme();
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Habillage video</SectionLabel>
          <SectionTitle>Identite en mouvement</SectionTitle>
        </FadeIn>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
          <FadeIn>
            <div
              className="rounded-3xl p-5 md:p-7"
              style={{ background: "#fff", border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)" }}
            >
              <img src={imgMotionHero} alt="Habillage video principal Parsemains" className="mx-auto max-h-[500px] w-auto max-w-full object-contain" loading="lazy" />
            </div>
          </FadeIn>
          <div className="rounded-3xl p-4 md:p-5 grid grid-cols-3 gap-4" style={{ background: "#fff", border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)" }}>
            {[imgMotionA, imgMotionB, imgMotionC].map((src, index) => (
              <FadeIn key={src} delay={index * 0.06}>
                <img src={src} alt="Variation d'habillage video Parsemains" className="h-auto max-h-[360px] w-full object-contain" loading="lazy" />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsiteSection() {
  const { r, isDark } = useTheme();
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Experience numerique</SectionLabel>
          <SectionTitle>Experience numerique</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-3xl bg-white px-5 py-10 md:px-10 md:py-14"
            style={{
              border: `1px solid ${r(0.06)}`,
              boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)",
            }}
          >
            <img src={shapeWaveJ} alt="" className="absolute right-6 top-0 w-[34rem] max-w-[82vw] opacity-[0.2]" />
            <div className="relative z-10 grid lg:grid-cols-[1.35fr_0.65fr] gap-8 md:gap-12 items-center">
              <motion.img
                src={imgWebsite}
                alt="Refonte desktop du site Parsemains"
                className="mx-auto w-full max-w-[760px] object-contain"
                loading="lazy"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              />
              <motion.img
                src={imgMobile}
                alt="Refonte mobile du site Parsemains"
                className="mx-auto w-full max-w-[270px] object-contain"
                loading="lazy"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function VideoSection() {
  const { r, isDark } = useTheme();
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
        <FadeIn>
          <SectionLabel>Video de presentation</SectionLabel>
          <SectionTitle>Une section dediee au film</SectionTitle>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            Le film prolonge l'identite dans un format vertical, avec une presence plus vivante, rythmique et directement adaptee aux supports mobiles.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="relative flex justify-center">
            <img src={shapeSun} alt="" className="absolute right-4 top-6 w-24 opacity-[0.22]" />
            <div
              className="relative w-full max-w-[270px] rounded-[2.8rem] bg-black p-2.5"
              style={{ boxShadow: isDark ? "0 32px 90px rgba(0,0,0,0.38)" : "0 32px 90px rgba(0,0,0,0.16)" }}
            >
              <div className="absolute left-1/2 top-5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="overflow-hidden rounded-[2.1rem] bg-white">
                <img src={imgMotionHero} alt="Apercu de la video Parsemains" className="block h-auto w-full" loading="lazy" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ClosingSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-16 md:py-20">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: r(0.32) }}>
            Les reseaux sociaux alternent entre contenus graphiques, anecdotes, storytelling, mises en situation produits et publications plus informatives.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

export function ProjectParsemains() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <HeroSection />
        <IntroSection />
        <LogoSection />
        <LogoVariationsSection />
        <UniverseSection />
        <PictogramsSection />
        <PrintSection />
        <SocialSection />
        <MotionSection />
        <WebsiteSection />
        <VideoSection />
        <ClosingSection />
      </div>
    </main>
  );
}
