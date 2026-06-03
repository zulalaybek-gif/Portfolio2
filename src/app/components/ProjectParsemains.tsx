import { motion } from "motion/react";
import { useState } from "react";
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
import imgBookmarkA from "../../assets/parsemains/20.marque-page-1.jpg";
import imgBookmarkB from "../../assets/parsemains/21-marque-page-2.jpg";
import imgBookmarkC from "../../assets/parsemains/22.marque-page-3.jpg";
import imgBookmarks from "../../assets/parsemains/23.marque-page-1-2-3.png";
import imgPosters from "../../assets/parsemains/24-mockup-affiches.png";
import imgPackaging from "../../assets/parsemains/25.mockup-packaging.png";
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
      <motion.div
        className="absolute -left-36 top-[18%] h-[22rem] w-[22rem] rounded-full opacity-[0.55]"
        style={{
          background: `repeating-radial-gradient(circle, transparent 0 18px, ${ORANGE} 19px 21px, transparent 22px 34px)`,
          maskImage: "radial-gradient(circle, black 0 58%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 0 58%, transparent 70%)",
        }}
        animate={{ rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
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

      <div className="relative z-10 max-w-6xl mx-auto min-h-[62vh] grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
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

        <motion.div
          initial={{ opacity: 0, y: 34, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.95, delay: 0.16, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem]" style={{ background: `linear-gradient(135deg, ${ORANGE}22, ${MAGENTA}12, ${BLUE}16)` }} />
          <ImageCard src={imgPackaging} alt="Packaging Parsemains" className="relative aspect-[4/3]" imgClassName="w-full h-full object-cover" />
        </motion.div>
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
  const { r, isDark } = useTheme();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Logo</SectionLabel>
          <SectionTitle>Logo principal</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div
            className="rounded-3xl min-h-[22rem] flex items-center justify-center px-8 md:px-16 py-16 relative overflow-hidden"
            style={{ background: isDark ? r(0.04) : PAPER, border: `1px solid ${r(0.06)}` }}
          >
            <img src={shapeWaveC} alt="" className="absolute -right-20 -top-24 w-[38rem] opacity-20" />
            <img src={logoMain} alt="Logo principal Parsemains" className="relative z-10 w-full max-w-[42rem]" style={{ filter: isDark ? "invert(1)" : "none" }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LogoVariationsSection() {
  const { r, isDark } = useTheme();
  const variations = [
    { src: logoAltA, bg: ORANGE, invert: false },
    { src: logoAltB, bg: BLACK, invert: true },
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
            <FadeIn key={item.bg} delay={index * 0.08}>
              <motion.div
                className="rounded-3xl min-h-[18rem] flex items-center justify-center p-10"
                style={{ background: item.bg, border: `1px solid ${r(0.06)}` }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <img src={item.src} alt="Declinaison du logo Parsemains" className="w-full max-w-[30rem]" style={{ filter: item.invert ? "invert(1)" : "none" }} />
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
  const colors = [
    { name: "Orange", value: ORANGE },
    { name: "Blanc", value: "#FFFFFF" },
    { name: "Noir", value: BLACK },
    { name: "Peche", value: ORANGE_SOFT },
    { name: "Sable", value: PEACH },
    { name: "Magenta", value: MAGENTA },
    { name: "Violet", value: PURPLE },
    { name: "Bleu", value: BLUE },
  ];
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Univers graphique</SectionLabel>
          <SectionTitle>Couleurs, typographies & signes</SectionTitle>
        </FadeIn>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <FadeIn>
            <div className="rounded-3xl p-6 md:p-8 h-full" style={{ background: isDark ? r(0.04) : "#fff", border: `1px solid ${r(0.06)}` }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 650, color: r(0.72) }}>Palette</h3>
              <div className="grid grid-cols-4 gap-3 mt-6">
                {colors.map((color) => (
                  <div key={color.name}>
                    <div className="aspect-square rounded-2xl" style={{ background: color.value, border: color.value === "#FFFFFF" ? `1px solid ${r(0.12)}` : "none" }} />
                    <span className="block mt-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.28) }}>{color.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4">
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>Titrage</span>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: r(0.75) }}>DAZZLE UNICASE</p>
                </div>
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.25) }}>Texte courant</span>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: r(0.65) }}>Avenir</p>
                </div>
              </div>
            </div>
          </FadeIn>
          <div className="grid gap-5">
            <FadeIn delay={0.08}>
              <ImageCard src={titleSystemA} alt="Systeme de titrage Parsemains" className="aspect-[16/8]" imgClassName="w-full h-full object-contain" pad />
            </FadeIn>
            <FadeIn delay={0.14}>
              <ImageCard src={titleSystemB} alt="Variation du systeme de titrage Parsemains" className="aspect-[16/8]" imgClassName="w-full h-full object-contain" pad />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function PictogramsSection() {
  const { r, isDark } = useTheme();
  const icons = [
    { src: iconRecover, label: "Recuperer le papier" },
    { src: iconDry, label: "Secher le papier" },
    { src: iconSift, label: "Tamiser le papier" },
    { src: extraIconA, label: "Circularite" },
    { src: extraIconB, label: "Transformation" },
    { src: extraIconC, label: "Fabrication" },
  ];
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Pictogrammes</SectionLabel>
          <SectionTitle>Un vocabulaire simple et identifiable</SectionTitle>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {icons.map((icon, index) => (
            <FadeIn key={icon.label} delay={index * 0.04}>
              <motion.div
                className="rounded-3xl p-5 aspect-square flex flex-col items-center justify-center gap-4"
                style={{ background: isDark ? r(0.04) : PAPER, border: `1px solid ${r(0.06)}` }}
                whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <img src={icon.src} alt={icon.label} className="h-16 w-16 object-contain" style={{ filter: isDark ? "invert(1)" : "none" }} />
                <span className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", lineHeight: 1.35, color: r(0.36) }}>{icon.label}</span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrintSection() {
  const { r } = useTheme();
  const [activeBookmark, setActiveBookmark] = useState(imgBookmarkA);
  const bookmarkOptions = [
    { src: imgBookmarkA, color: ORANGE },
    { src: imgBookmarkB, color: MAGENTA },
    { src: imgBookmarkC, color: BLUE },
  ];
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Supports imprimes</SectionLabel>
          <SectionTitle>Objets, affiches & marque-pages</SectionTitle>
        </FadeIn>
        <div className="grid lg:grid-cols-2 gap-6">
          <ImageCard src={imgBrochure} alt="Mise en situation du depliant Parsemains" className="aspect-[16/10]" />
          <ImageCard src={imgPosters} alt="Mockup affiches Parsemains" className="aspect-[16/10]" />
          <div className="lg:col-span-2 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            <ImageCard src={imgBookmarks} alt="Trois marque-pages Parsemains" className="aspect-[16/10]" imgClassName="w-full h-full object-contain" pad />
            <FadeIn>
              <div className="rounded-3xl p-5 md:p-6 h-full" style={{ background: `linear-gradient(135deg, ${ORANGE}16, ${BLUE}10)`, border: `1px solid ${r(0.06)}` }}>
                <p className="mb-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.38) }}>
                  Les marque-pages reprennent le meme systeme graphique avec des variations colorees. Survolez les pastilles pour isoler chaque version.
                </p>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-white">
                  <motion.img key={activeBookmark} src={activeBookmark} alt="Variation de marque-page Parsemains" className="absolute inset-0 h-full w-full object-cover" initial={{ scale: 1.04, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} />
                </div>
                <div className="flex gap-3 mt-5">
                  {bookmarkOptions.map((option) => (
                    <button
                      key={option.src}
                      type="button"
                      onMouseEnter={() => setActiveBookmark(option.src)}
                      onFocus={() => setActiveBookmark(option.src)}
                      onClick={() => setActiveBookmark(option.src)}
                      className="h-9 w-9 rounded-full transition-transform hover:scale-110 focus:outline-none"
                      style={{ background: option.color, boxShadow: activeBookmark === option.src ? `0 0 0 3px ${option.color}44` : "none" }}
                      aria-label="Afficher une variation de marque-page"
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          <ImageCard src={imgBookmarkMockup} alt="Mise en situation marque-page Parsemains" className="aspect-[16/10]" />
          <ImageCard src={imgPackaging} alt="Mockup packaging Parsemains" className="aspect-[16/10]" />
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Reseaux sociaux</SectionLabel>
          <SectionTitle>Un systeme editorial reconnaissable</SectionTitle>
        </FadeIn>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
          <ImageCard src={imgSocialProfile} alt="Profil reseaux sociaux Parsemains" className="aspect-[4/5]" imgClassName="w-full h-full object-contain" pad />
          <div className="grid gap-6">
            <ImageCard src={imgLinkedin} alt="Publication LinkedIn Parsemains" className="aspect-[16/9]" imgClassName="w-full h-full object-contain" pad />
            <ImageCard src={imgLinkedinPosts} alt="Publications LinkedIn Parsemains" className="aspect-[16/10]" imgClassName="w-full h-full object-contain" pad />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: r(0.38) }}>
              Les supports sociaux conservent le contraste fort du branding tout en mettant en scene les gestes de fabrication et les engagements de la marque.
            </p>
          </div>
        </div>
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
          <SectionTitle>Une identite en mouvement</SectionTitle>
        </FadeIn>
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
          <FadeIn>
            <div
              className="rounded-3xl p-5 md:p-7"
              style={{ background: isDark ? r(0.04) : PAPER, border: `1px solid ${r(0.06)}` }}
            >
              <img src={imgMotionHero} alt="Habillage video principal Parsemains" className="mx-auto max-h-[680px] w-auto max-w-full object-contain" loading="lazy" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-3 gap-4">
            {[imgMotionA, imgMotionB, imgMotionC].map((src, index) => (
              <FadeIn key={src} delay={index * 0.06}>
                <ImageCard src={src} alt="Variation d'habillage video Parsemains" className="aspect-[9/16]" imgClassName="w-full h-full object-contain" pad />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WebsiteSection() {
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Site web desktop</SectionLabel>
          <SectionTitle>Experience numerique</SectionTitle>
        </FadeIn>
        <BrowserMockup src={imgWebsite} alt="Refonte desktop du site Parsemains" />
      </div>
    </section>
  );
}

function MobileSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-12 items-center">
        <FadeIn>
          <SectionLabel>Site web mobile</SectionLabel>
          <SectionTitle>La marque dans un format vertical</SectionTitle>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            La version mobile conserve l'impact du systeme graphique tout en privilegiant la lecture, le rythme et la comprehension des engagements de la marque.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="flex justify-center">
            <PhoneMockup src={imgMobile} alt="Refonte mobile du site Parsemains" />
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
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Video de presentation</SectionLabel>
          <SectionTitle>Une section dediee au film</SectionTitle>
        </FadeIn>
        <FadeIn>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: isDark ? r(0.04) : "#fff", border: `1px solid ${r(0.06)}` }}
          >
            <div className="grid lg:grid-cols-[0.65fr_1.35fr]">
              <div className="p-6 md:p-8 flex items-center justify-center" style={{ background: ORANGE }}>
                <img src={imgMotionHero} alt="Apercu de la video Parsemains" className="max-h-[520px] w-auto max-w-full object-contain" loading="lazy" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.42) }}>
                  Le film prolonge le systeme graphique dans un format plus vivant : formes circulaires, contrastes francs et rythme editorial accompagnent la presentation de la marque sans perdre la clarte du message.
                </p>
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
      <MobileSection />
      <VideoSection />
      <ClosingSection />
    </main>
  );
}
