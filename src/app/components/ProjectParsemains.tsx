import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import { ProjectBackButton } from "./ProjectBackButton";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

import logoMain from "../../assets/parsemains/01.logo-principal.svg";
import titleSystemA from "../../assets/parsemains/04.systeme-de-titrage.svg";
import titleSystemB from "../../assets/parsemains/05.systeme-de-titrage.svg";
import imgBrochure from "../../assets/parsemains/06.depliant.jpg";
import imgBookmarkMockup from "../../assets/parsemains/07.marque-page.png";
import iconRecoverLight from "../../assets/parsemains/X.picto-recuperer-orange.svg";
import iconRecoverDark from "../../assets/parsemains/X.picto-recuperer-blanc.svg";
import iconDryLight from "../../assets/parsemains/Y.picto-sechage-orange.svg";
import iconDryDark from "../../assets/parsemains/Y.picto-sechage-blanc.svg";
import iconSiftLight from "../../assets/parsemains/Z.picto-tamiser-orange.svg";
import iconSiftDark from "../../assets/parsemains/Z.picto-tamiser-blanc.svg";
import imgSocialProfile from "../../assets/parsemains/11.reseaux-sociaux.png";
import imgLinkedin from "../../assets/parsemains/12.linkedin.png";
import imgLinkedinPosts from "../../assets/parsemains/13.linkedin-publications.png";
import imgBookmarks from "../../assets/parsemains/23.marque-page-1-2-3.png";
import imgPosters from "../../assets/parsemains/24-mockup-affiches.png";
import imgPackaging from "../../assets/parsemains/25.mockup-packaging.png";

const ORANGE = "#F08100";
const ORANGE_SOFT = "#F4A64A";
const PEACH = "#F8C27B";
const MAGENTA = "#C95BC1";
const PURPLE = "#A92DA7";
const BLUE = "#48A3DA";
const BLACK = "#050505";

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

function GeologicalDecor() {
  const reduceMotion = useReducedMotion();
  const topographicLines = [
    "M73 236 C102 173 169 139 243 137 C315 135 362 159 431 136 C511 109 590 74 677 98 C765 122 821 181 812 251 C803 318 738 350 663 359 C578 369 521 345 454 373 C381 403 296 436 213 409 C130 382 47 319 73 236Z",
    "M127 245 C151 196 206 171 265 173 C327 175 372 196 428 178 C497 156 560 125 633 143 C703 160 751 207 746 259 C741 313 681 331 626 337 C554 344 505 322 449 345 C386 371 315 398 250 377 C184 355 102 299 127 245Z",
    "M182 258 C201 225 238 204 287 206 C344 208 376 226 426 210 C478 193 531 169 584 181 C635 193 681 228 675 267 C669 306 622 317 574 319 C518 322 480 306 432 325 C382 345 324 366 271 349 C221 333 160 296 182 258Z",
    "M239 263 C254 245 280 233 313 236 C354 239 382 249 421 237 C459 226 495 209 532 219 C569 229 603 249 599 278 C595 307 559 314 524 313 C486 312 458 300 421 313 C381 328 341 337 306 326 C272 315 222 287 239 263Z",
    "M292 273 C307 260 326 258 349 263 C378 270 394 279 423 270 C450 262 477 251 500 261 C521 270 540 285 534 301 C528 318 503 319 479 316 C456 313 439 306 414 314 C390 322 364 326 340 318 C316 311 277 288 292 273Z",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -right-28 -top-24 h-[26rem] w-[26rem] rounded-full opacity-70 md:h-[38rem] md:w-[38rem]"
        style={{
          background:
            "radial-gradient(circle at 42% 38%, rgba(240,129,0,0.32), rgba(240,129,0,0.11) 34%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], x: [0, -8, 0], opacity: [0.48, 0.7, 0.48] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 left-8 h-44 w-44 rounded-full opacity-45 md:left-20 md:h-56 md:w-56"
        style={{
          background:
            "radial-gradient(circle, rgba(240,129,0,0.16), transparent 62%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14) 0 1px, transparent 1.5px)",
          backgroundSize: "auto, 9px 9px",
          filter: "blur(11px)",
        }}
        animate={reduceMotion ? undefined : { x: [0, 8, 0], y: [0, -5, 0], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[54rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 opacity-55"
        animate={reduceMotion ? undefined : { x: ["-50%", "calc(-50% + 10px)", "-50%"], y: ["-50%", "calc(-50% + 8px)", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 880 520" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <filter id="parsemains-topo-soften">
              <feGaussianBlur stdDeviation="0.18" />
            </filter>
          </defs>
          <motion.g
            fill="none"
            stroke="rgba(240,129,0,0.34)"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#parsemains-topo-soften)"
            animate={reduceMotion ? undefined : { rotate: [-1.2, -0.2, -1.2], scaleX: [1, 1.012, 1], scaleY: [1, 0.992, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            {topographicLines.map((path, index) => (
              <motion.path
                key={path}
                d={path}
                strokeWidth={index === 0 ? 1.25 : 0.95}
                opacity={0.68 - index * 0.07}
                animate={reduceMotion ? undefined : { pathLength: [0.96, 1, 0.96], pathOffset: [0, index % 2 ? 0.008 : -0.006, 0] }}
                transition={{ duration: 16 + index * 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(180deg, transparent, rgba(248,242,232,0.08))" }}
      />
    </div>
  );
}

function HeroSection() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="relative min-h-[82vh] overflow-hidden px-6 md:px-12 pt-28 pb-16 md:pb-20">
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
      <GeologicalDecor />

      <div className="relative z-10 mx-auto flex min-h-[64vh] max-w-6xl items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-eyebrow mb-8 block uppercase tracking-[0.28em]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.28) }}
          >
            Workshop — Refonte d'identité visuelle & direction artistique
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: "easeOut" }}
            className="w-[16rem] md:w-[24rem]"
          >
            <img src={logoMain} alt="Parsemains" className="w-full" style={{ filter: isDark ? "invert(1)" : "none" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const { r } = useTheme();
  const items = [
    {
      title: "Rôle",
      text: "J'ai participé à la construction de la direction artistique, aux recherches graphiques, au système visuel et aux déclinaisons de marque.",
    },
    {
      title: "Direction visuelle",
      text: "L'identité s'appuie sur une typographie forte, une palette orange chaleureuse et des éléments graphiques inspirés de l'édition, du papier et du territoire.",
    },
    {
      title: "Enjeu",
      text: "L'enjeu était de donner à Parsemains une identité plus affirmée, capable de raconter son histoire sans devenir trop institutionnelle ni trop attendue.",
    },
  ];

  return (
    <section className="px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.035em", color: r(0.78) }}>
              Contexte
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.98rem, 1.5vw, 1.12rem)", lineHeight: 1.9, color: r(0.42) }}>
              Parsemains est un workshop réalisé en équipe autour de la refonte d'une identité visuelle. Le projet explore l'univers du papier ensemencé, du réemploi et de la transmission, avec l'objectif de construire une image plus contemporaine, chaleureuse et mémorable.
            </p>
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06}>
              <div className="h-full border-t pt-5" style={{ borderColor: r(0.08) }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: r(0.7) }}>{item.title}</h3>
                <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.84rem", lineHeight: 1.75, color: r(0.34) }}>
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoSection() {
  const { r } = useTheme();
  const versions = [
    { alt: "Logo principal Parsemains noir", background: "#fff", filter: "none", border: "rgba(0,0,0,0.08)" },
    { alt: "Logo principal Parsemains blanc", background: "#050505", filter: "invert(1)", border: "rgba(255,255,255,0.12)" },
  ];

  return (
    <section className="px-6 py-12 md:px-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Logo principal</SectionTitle>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2">
          {versions.map((version, index) => (
            <FadeIn key={version.alt} delay={index * 0.06}>
              <motion.figure
                className="flex min-h-[13rem] items-center justify-center rounded-3xl px-8 py-10 md:min-h-[16rem]"
                style={{
                  background: version.background,
                  border: `1px solid ${version.border}`,
                  boxShadow: "0 26px 70px rgba(0,0,0,0.08)",
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <img src={logoMain} alt={version.alt} className="w-[58%] max-w-[10rem] md:max-w-[13rem]" style={{ filter: version.filter }} />
              </motion.figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TitleSystemSection() {
  const { r } = useTheme();
  return (
    <section className="px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Système de titrage</SectionTitle>
          <p className="mb-8 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.36) }}>
            Le système de titrage reprend les codes du label, de l'édition et des traits de coupe. Les mots se condensent en blocs graphiques, pensés comme des repères visuels capables de porter les messages de la marque avec plus d'impact et de singularité.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            {[
              { src: titleSystemA, className: "md:justify-self-start" },
              { src: titleSystemB, className: "md:justify-self-end" },
            ].map((item) => (
              <motion.img
                key={item.src}
                src={item.src}
                alt="Système de titrage Parsemains"
                className={`w-full max-h-[12rem] object-contain md:max-h-[15rem] ${item.className}`}
                loading="lazy"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function TypographySection() {
  const { r, isDark } = useTheme();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <section className="px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Typographies</SectionTitle>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-[1.08fr_0.92fr]">
          <FadeIn>
            <div className="h-full rounded-3xl p-6 md:p-8" style={{ background: isDark ? r(0.035) : "#fff", border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.2)" : "0 24px 70px rgba(0,0,0,0.06)" }}>
              <span className="uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", color: r(0.24) }}>Typographie principale</span>
              <h3 className="mt-8" style={{ fontFamily: "'Dazzle Unicase', 'Space Grotesk', sans-serif", fontSize: "clamp(2.4rem, 7vw, 5.6rem)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.055em", color: isDark ? "#fff" : BLACK }}>
                DAZZLE<br />UNICASE
              </h3>
              <p className="mt-6 max-w-sm" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.34) }}>
                Titrage, labels et mots-signaux.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="h-full rounded-3xl p-6 md:p-8" style={{ background: isDark ? r(0.035) : "#fff", border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.18)" : "0 24px 70px rgba(0,0,0,0.055)" }}>
              <span className="uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.58rem", color: r(0.24) }}>Texte courant</span>
              <h3 className="mt-7" style={{ fontFamily: "'Avenir', 'Inter', sans-serif", fontSize: "clamp(2rem, 5vw, 4.2rem)", fontWeight: 400, color: r(0.78) }}>
                Avenir
              </h3>
              <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1">
                {alphabet.split("").map((letter) => (
                  <span key={letter} style={{ fontFamily: "'Avenir', 'Inter', sans-serif", fontSize: "0.78rem", color: r(0.38) }}>{letter}</span>
                ))}
              </div>
              <p className="mt-6" style={{ fontFamily: "'Avenir', 'Inter', sans-serif", fontSize: "0.88rem", lineHeight: 1.75, color: r(0.34) }}>
                Une base plus sobre pour équilibrer les compositions expressives.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PaletteSection() {
  const { r } = useTheme();
  const primaryColors = [
    { name: "Orange", value: ORANGE },
    { name: "Blanc", value: "#FFFFFF" },
    { name: "Noir", value: BLACK },
  ];
  const secondaryColors = [
    { name: "Pêche", value: ORANGE_SOFT },
    { name: "Sable", value: PEACH },
    { name: "Magenta", value: MAGENTA },
    { name: "Violet", value: PURPLE },
    { name: "Bleu", value: BLUE },
  ];

  return (
    <section className="px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Palette chromatique</SectionTitle>
          <p className="max-w-2xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.36) }}>
            Une base chaude et contrastée, complétée par des touches plus florales.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mt-10 grid gap-8">
            {[
              ["Couleurs principales", primaryColors],
              ["Couleurs secondaires", secondaryColors],
            ].map(([title, colors]) => (
              <div key={title as string} className="grid gap-4 border-t pt-6 md:grid-cols-[12rem_1fr]" style={{ borderColor: r(0.07) }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: r(0.68) }}>{title as string}</h3>
                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {(colors as typeof primaryColors).map((color) => (
                    <div key={color.name} className="group">
                      <div
                        className="h-20 rounded-[1.15rem] transition-transform duration-300 group-hover:-translate-y-1 md:h-24"
                        style={{
                          background: color.value,
                          border: color.value === "#FFFFFF" ? `1px solid ${r(0.14)}` : "none",
                          boxShadow: color.value === "#FFFFFF" ? "none" : "0 18px 42px rgba(0,0,0,0.08)",
                        }}
                      />
                      <div className="mt-3 flex items-baseline justify-between gap-3 border-t pt-2" style={{ borderColor: r(0.06) }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.38) }}>{color.name}</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.62rem", fontWeight: 700, color: r(0.48) }}>{color.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function GraphicSystemSection() {
  const { r, isDark } = useTheme();
  const pictograms = [
    { src: isDark ? iconRecoverDark : iconRecoverLight, label: "Récupérer le papier" },
    { src: isDark ? iconDryDark : iconDryLight, label: "Sécher le papier" },
    { src: isDark ? iconSiftDark : iconSiftLight, label: "Tamiser le papier" },
  ];

  return (
    <section className="px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Système graphique</SectionTitle>
          <p className="max-w-2xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.36) }}>
            Les pictogrammes, traits de coupe, lignes topographiques et références symboliques construisent un langage visuel à la fois structuré, vivant et reconnaissable.
          </p>
          <p className="mt-3 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", lineHeight: 1.7, color: r(0.3) }}>
            Formes circulaires, courbes de territoire et références symboliques servent de repères communs à l'ensemble de l'univers.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mt-8 border-y py-7 md:py-9" style={{ borderColor: r(0.08) }}>
            <div className="grid grid-cols-3 items-end gap-4 md:gap-8">
              {pictograms.map((icon, index) => (
                <motion.div
                  key={icon.label}
                  className="flex flex-col items-center gap-4"
                  animate={{ y: [0, index === 1 ? -3 : 3, 0] }}
                  whileHover={{ y: -4, rotate: index === 1 ? -1 : 1 }}
                  transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className="h-16 w-full object-contain md:h-24"
                    loading="lazy"
                  />
                  <span className="text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 1rem)", fontWeight: 600, color: r(0.64) }}>
                    {icon.label}
                  </span>
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
  const { r, isDark } = useTheme();
  const mainPrintItems = [
    { src: imgBrochure, alt: "Mise en situation du dépliant Parsemains", label: "Dépliant" },
    { src: imgBookmarkMockup, alt: "Mise en situation marque-page Parsemains", label: "Marque-page" },
    { src: imgBookmarks, alt: "Trois marque-pages Parsemains", label: "Variations" },
  ];
  const pairedPrintItems = [
    { src: imgPosters, alt: "Mockup affiches Parsemains", label: "Affiches" },
    { src: imgPackaging, alt: "Mockup packaging Parsemains", label: "Packaging" },
  ];

  return (
    <section className="px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Supports imprimés</SectionTitle>
        </FadeIn>
        <div className="grid gap-5 md:gap-6">
          <div className="grid gap-5 md:grid-cols-3">
            {mainPrintItems.map((item, index) => (
              <FadeIn key={item.src} delay={index * 0.05}>
                <motion.figure
                  className="overflow-hidden rounded-3xl"
                  style={{
                    background: isDark ? r(0.035) : "#fff",
                    border: `1px solid ${r(0.06)}`,
                    boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.2)" : "0 24px 70px rgba(0,0,0,0.065)",
                  }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  <img src={item.src} alt={item.alt} className={`h-[16rem] w-full ${index === 2 ? "object-contain p-5" : "object-cover"}`} loading="lazy" />
                  <figcaption className="px-5 py-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: r(0.34) }}>
                    {item.label}
                  </figcaption>
                </motion.figure>
              </FadeIn>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {pairedPrintItems.map((item, index) => (
              <FadeIn key={item.src} delay={index * 0.06}>
                <div>
                  <h3 className="mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", fontWeight: 700, color: r(0.68) }}>
                    {item.label}
                  </h3>
                  <motion.div
                    className="overflow-hidden rounded-3xl"
                    style={{
                      background: "#fff",
                      border: `1px solid ${r(0.06)}`,
                      boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.2)" : "0 28px 80px rgba(0,0,0,0.075)",
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  >
                    <img src={item.src} alt={item.alt} className="h-[17rem] w-full object-cover md:h-[23rem]" loading="lazy" />
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  const { r, isDark } = useTheme();
  const instagramFeatures = [
    ["graphic", "punchy", "ludique"],
    ["zoom sur...", "coloré", "élégant"],
    ["produits", "mise en situation", "territoire"],
  ];

  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-14 md:py-20">
      <div className="relative z-10 max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Déclinaisons social media</SectionTitle>
          <p className="max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: r(0.38) }}>
            L'identité a été déclinée sur plusieurs supports : logo, système de titrage, supports imprimés, pictogrammes, contenus social media et mises en situation digitales.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-8">
          <FadeIn>
            <div className="rounded-3xl bg-white p-5 md:p-8" style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.22)" : "0 28px 80px rgba(0,0,0,0.075)" }}>
              <h3 className="mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: BLACK }}>
                Instagram
              </h3>
              <div className="grid gap-7 lg:grid-cols-[1fr_0.7fr] lg:items-center">
                <motion.img
                  src={imgSocialProfile}
                  alt="Déclinaisons Instagram Parsemains"
                  className="mx-auto max-h-[34rem] w-full object-contain lg:max-h-[38rem]"
                  loading="lazy"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                />
                <div className="grid gap-6 lg:-ml-3">
                  {instagramFeatures.map((words) => (
                    <motion.div
                      key={words.join("-")}
                      className="border-l-2 pl-5"
                      style={{ borderColor: ORANGE }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 240, damping: 24 }}
                    >
                      {words.map((word) => (
                        <span key={word} className="block uppercase" style={{ fontFamily: "'Dazzle Unicase', 'Space Grotesk', sans-serif", fontSize: "clamp(1.05rem, 2.1vw, 1.7rem)", fontWeight: 800, lineHeight: 1.04, color: BLACK }}>
                          {word}
                        </span>
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="border-t pt-8" style={{ borderColor: r(0.08) }}>
              <h3 className="mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 700, color: r(0.72) }}>
                LinkedIn
              </h3>
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  { src: imgLinkedin, alt: "Publication LinkedIn Parsemains" },
                  { src: imgLinkedinPosts, alt: "Publications LinkedIn Parsemains" },
                ].map((item) => (
                <motion.div
                  key={item.src}
                  className="flex h-[18rem] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 md:h-[22rem]"
                  style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.2)" : "0 24px 70px rgba(0,0,0,0.07)" }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                >
                  <img src={item.src} alt={item.alt} className="max-h-full w-full object-contain" loading="lazy" />
                </motion.div>
              ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
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
        <TitleSystemSection />
        <TypographySection />
        <PaletteSection />
        <GraphicSystemSection />
        <PrintSection />
        <SocialSection />
      </div>
    </main>
  );
}
