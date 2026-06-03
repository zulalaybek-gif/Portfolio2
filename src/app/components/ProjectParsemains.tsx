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
import shapeWaveA from "../../assets/parsemains/C.vagues-1.svg";
import shapeWaveB from "../../assets/parsemains/D.vagues-2.svg";
import shapeWaveC from "../../assets/parsemains/E.vagues-3.svg";
import extraIconA from "../../assets/parsemains/F.picto.svg";
import extraIconB from "../../assets/parsemains/G.picto.svg";
import extraIconC from "../../assets/parsemains/H.picto.svg";

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
        src={shapeWaveA}
        alt=""
        className="absolute -right-[18%] top-[5%] w-[58rem] opacity-[0.13]"
        animate={{ y: [0, 18, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={shapeWaveB}
        alt=""
        className="absolute left-[8%] bottom-[5%] w-[34rem] opacity-[0.08]"
        animate={{ x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
        className="absolute -right-24 top-[18rem] w-[24rem] opacity-[0.07]"
        animate={{ rotate: [0, 10, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={shapeSun}
        alt=""
        className="absolute -left-32 top-[190rem] w-[22rem] opacity-[0.06]"
        animate={{ rotate: [0, -8, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <img src={shapeWaveA} alt="" className="absolute -right-[20%] top-[74rem] w-[56rem] opacity-[0.08]" />
      <img src={shapeWaveB} alt="" className="absolute -left-[16%] top-[132rem] w-[48rem] opacity-[0.07]" />
      <img src={shapeWaveC} alt="" className="absolute right-[-18%] bottom-[34rem] w-[58rem] opacity-[0.08]" />
      <img src={extraIconA} alt="" className="absolute left-[7%] top-[116rem] w-24 opacity-[0.06]" />
      <img src={extraIconB} alt="" className="absolute right-[8%] top-[214rem] w-28 opacity-[0.055]" />
      <img src={extraIconC} alt="" className="absolute left-[10%] bottom-[72rem] w-24 opacity-[0.055]" />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="relative min-h-[78vh] overflow-hidden px-6 md:px-12 pt-28 pb-20">
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
            Branding — Papier ensemencé
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
            className="mb-9 max-w-xl"
          >
            <img src={logoMain} alt="Parsemains" className="w-full max-w-[33rem]" style={{ filter: isDark ? "invert(1)" : "none" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 1.7vw, 1.25rem)", lineHeight: 1.8, color: r(0.45) }}
          >
            Repenser l'identite d'une marque francaise specialisee dans le papier ensemence, avec un univers plus graphique, plus audacieux et plus memorisable que les codes ecologiques traditionnels.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
        <FadeIn>
          <SectionLabel>Direction visuelle</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2.6vw, 2rem)", fontWeight: 650, color: ORANGE }}>
            Une ecologie plus expressive, circulaire et contemporaine.
          </h2>
          <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            L'identite s'appuie sur la circularite, l'empreinte, l'energie et la fabrication locale. Les formes organiques et les contrastes colores installent une presence vivante, sans tomber dans une esthetique attendue de l'ecoresponsabilite.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <SectionLabel>Enjeu du projet</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.35rem, 2.6vw, 2rem)", fontWeight: 650, color: r(0.75) }}>
            Faire exister une marque engagee sans l'enfermer dans les codes verts.
          </h2>
          <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            Le travail ne se limite pas au logo : il construit un systeme complet, capable de vivre sur les supports imprimes, les reseaux sociaux, les interfaces web et les contenus video.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function LogoSection() {
  const { isDark } = useTheme();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Logo</SectionLabel>
          <SectionTitle>Logo principal</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div className="min-h-[8rem] flex items-center justify-start py-7 md:py-9">
            <img src={logoMain} alt="Logo principal Parsemains" className="w-full max-w-[15rem] md:max-w-[20rem]" style={{ filter: isDark ? "invert(1)" : "none" }} />
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
    <section className="px-6 md:px-12 py-16">
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
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Univers graphique</SectionLabel>
          <SectionTitle>Couleurs, typographies & signes</SectionTitle>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
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
          <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ background: isDark ? r(0.04) : "#fff", border: `1px solid ${r(0.06)}` }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: r(0.74) }}>Couleurs principales</h3>
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
        </FadeIn>

        <FadeIn>
          <div className="mt-10">
            <SectionLabel>Systeme de titrage</SectionLabel>
            <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 items-start">
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2.15rem)", fontWeight: 700, color: r(0.78) }}>
                  Un format label pour porter l'engagement.
                </h3>
                <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", lineHeight: 1.8, color: r(0.38) }}>
                  La typographie des titres est composee comme un label graphique : les mots se condensent, s'assemblent et deviennent des blocs d'affirmation, capables de rendre visible l'engagement de Parsemains.
                </p>
              </div>
              <div className="grid gap-5">
                <ImageCard src={titleSystemA} alt="Systeme de titrage Parsemains" className="aspect-[16/7]" imgClassName="w-full h-full object-contain" pad />
                <ImageCard src={titleSystemB} alt="Variation du systeme de titrage Parsemains" className="aspect-[16/7]" imgClassName="w-full h-full object-contain" pad />
              </div>
            </div>
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
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Pictogrammes</SectionLabel>
          <SectionTitle>Un vocabulaire simple et identifiable</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-16" style={{ background: ORANGE }}>
            <img src={shapeWaveA} alt="" className="absolute -left-24 -top-28 w-[34rem] opacity-[0.22] brightness-0 invert" />
            <img src={shapeWaveB} alt="" className="absolute -right-24 -bottom-32 w-[36rem] opacity-[0.18] brightness-0 invert" />
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
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Supports imprimes</SectionLabel>
          <SectionTitle>Objets, depliant & marque-pages</SectionTitle>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6">
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
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Reseaux sociaux</SectionLabel>
          <SectionTitle>Un systeme editorial reconnaissable</SectionTitle>
        </FadeIn>

        <FadeIn>
          <div>
            <SectionLabel>Instagram</SectionLabel>
            <motion.div
              className="overflow-hidden rounded-3xl p-5 md:p-8"
              style={{
                background: "#fff",
                border: `1px solid ${r(0.06)}`,
                boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.24)" : "0 28px 80px rgba(0,0,0,0.08)",
              }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <img src={imgSocialProfile} alt="Composition Instagram Parsemains" className="block w-full h-auto" loading="lazy" />
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
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Habillage video</SectionLabel>
          <SectionTitle>Habillage video</SectionTitle>
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
    <section className="px-6 md:px-12 py-20">
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
            <img src={shapeWaveA} alt="" className="absolute -right-24 -top-28 w-[34rem] opacity-[0.18]" />
            <div className="relative z-10 grid lg:grid-cols-[1.35fr_0.65fr] gap-8 md:gap-12 items-center">
              <motion.div
                className="relative mx-auto w-full max-w-[690px] rounded-[1.15rem] bg-black p-2 shadow-2xl"
                style={{ transform: "rotate(-4deg)" }}
                whileHover={{ rotate: -2, y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <div className="absolute left-1/2 top-2 z-10 h-3 w-20 -translate-x-1/2 rounded-b-xl bg-black" />
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-white flex items-center justify-center">
                  <img src={imgWebsite} alt="Refonte desktop du site Parsemains" className="max-h-full w-full object-contain" loading="lazy" />
                </div>
                <div className="mx-auto h-4 w-[82%] rounded-b-xl bg-gradient-to-b from-zinc-300 to-zinc-100" />
              </motion.div>

              <motion.div
                className="relative mx-auto w-full max-w-[250px] rounded-[2.4rem] bg-black p-2 shadow-2xl"
                style={{ transform: "rotate(6deg)" }}
                whileHover={{ rotate: 3, y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
                <div className="aspect-[390/760] overflow-hidden rounded-[1.9rem] bg-white flex items-center justify-center">
                  <img src={imgMobile} alt="Refonte mobile du site Parsemains" className="max-h-full w-full object-contain" loading="lazy" />
                </div>
              </motion.div>
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
    <section className="px-6 md:px-12 py-20">
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
            <img src={shapeSun} alt="" className="absolute -right-8 top-8 w-[17rem] opacity-[0.08]" />
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
    <section className="px-6 md:px-12 py-20">
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: r(0.32) }}>
            Parsemains affirme une identite responsable sans se limiter aux signes attendus de l'ecologie : une marque graphique, vivante et capable de pousser sur tous les supports.
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

export function ProjectParsemains() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageDecor />
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
