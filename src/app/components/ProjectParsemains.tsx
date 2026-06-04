import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router";
import { ProjectBackButton } from "./ProjectBackButton";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

import logoMain from "../../assets/parsemains/01.logo-principal.svg";
import logoVariantA from "../../assets/parsemains/02.declinaison-logo.svg";
import logoVariantB from "../../assets/parsemains/03.declinaison-logo.svg";
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
import imgInstagramFeatureA from "../../assets/parsemains/26.img.png";
import imgInstagramFeatureB from "../../assets/parsemains/27.img.png";
import imgInstagramFeatureC from "../../assets/parsemains/28.img.png";

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
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const lineColor = isDark ? "rgba(240,129,0,0.34)" : "rgba(240,129,0,0.56)";
  const lineOpacity = isDark ? 0.72 : 0.9;
  const mainHaloOpacity = isDark ? [0.46, 0.66, 0.46] : [0.7, 0.92, 0.7];
  const secondaryHaloOpacity = isDark ? [0.34, 0.5, 0.34] : [0.46, 0.66, 0.46];
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
        className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full md:h-[48rem] md:w-[48rem]"
        style={{
          background:
            "radial-gradient(circle at 42% 38%, rgba(240,129,0,0.42), rgba(240,129,0,0.18) 30%, rgba(240,129,0,0.06) 50%, transparent 72%), radial-gradient(circle at 52% 46%, rgba(255,255,255,0.22) 0 1px, transparent 1.4px)",
          backgroundSize: "auto, 10px 10px",
          filter: "blur(34px)",
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], x: [0, -10, 0], y: [0, 5, 0], opacity: mainHaloOpacity }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-6 left-4 h-56 w-56 rounded-full md:left-12 md:h-72 md:w-72"
        style={{
          background:
            "radial-gradient(circle at 40% 44%, rgba(240,129,0,0.26), rgba(240,129,0,0.08) 48%, transparent 68%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16) 0 1px, transparent 1.5px)",
          backgroundSize: "auto, 9px 9px",
          filter: "blur(11px)",
        }}
        animate={reduceMotion ? undefined : { x: [0, 8, 0], y: [0, -5, 0], opacity: secondaryHaloOpacity }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[38rem] w-[66rem] max-w-[165vw] -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: lineOpacity }}
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
            stroke={lineColor}
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
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24% 32%, rgba(0,0,0,0.08) 0 0.55px, transparent 0.9px), radial-gradient(circle at 72% 48%, rgba(240,129,0,0.16) 0 0.7px, transparent 1px)",
          backgroundSize: "14px 14px, 20px 20px",
        }}
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
  const { r, isDark } = useTheme();
  const versions = [
    { alt: "Logo principal Parsemains noir", background: "#fff", filter: "none", border: "rgba(0,0,0,0.08)" },
    { alt: "Logo principal Parsemains blanc", background: "#050505", filter: "invert(1)", border: "rgba(255,255,255,0.12)" },
  ];
  const variants = [
    { src: logoVariantA, alt: "Déclinaison du logo Parsemains" },
    { src: logoVariantB, alt: "Déclinaison secondaire du logo Parsemains" },
  ];

  return (
    <section className="px-6 py-12 md:px-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionTitle>Logo principal</SectionTitle>
          <p className="mb-8 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.36) }}>
            Le logo associe une typographie impactante mais lisible à des traits latéraux inspirés des traits de coupe du papier. Il évoque l'édition, la fabrication et la découpe sans perdre sa force de marque.
          </p>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-2">
          {versions.map((version, index) => (
            <FadeIn key={version.alt} delay={index * 0.06}>
              <figure
                className="flex min-h-[13rem] items-center justify-center rounded-3xl px-8 py-10 md:min-h-[16rem]"
                style={{
                  background: version.background,
                  border: `1px solid ${version.border}`,
                  boxShadow: "0 26px 70px rgba(0,0,0,0.08)",
                }}
              >
                <img src={logoMain} alt={version.alt} className="w-[58%] max-w-[10rem] md:max-w-[13rem]" style={{ filter: version.filter }} />
              </figure>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.08}>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {variants.map((variant) => (
              <figure
                key={variant.src}
                className="flex min-h-[11rem] items-center justify-center rounded-3xl px-8 py-8 md:min-h-[13rem]"
                style={{
                  background: isDark ? r(0.035) : "rgba(255,255,255,0.72)",
                  border: `1px solid ${r(0.06)}`,
                  boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.16)" : "0 22px 62px rgba(0,0,0,0.055)",
                }}
              >
                <img src={variant.src} alt={variant.alt} className="max-h-[7rem] w-full object-contain md:max-h-[8rem]" loading="lazy" style={{ filter: isDark ? "invert(1)" : "none" }} />
              </figure>
            ))}
          </div>
        </FadeIn>
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
              <img
                key={item.src}
                src={item.src}
                alt="Système de titrage Parsemains"
                className={`w-full max-h-[12rem] object-contain md:max-h-[15rem] ${item.className}`}
                loading="lazy"
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
  const typographicNotes = [
    ["Usage", "Titrage, labels, mots-signaux"],
    ["Rôle", "Impact visuel, rythme, personnalité"],
    ["Équilibre", "Contraste avec une base texte plus lisible"],
  ];
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
                Une typographie de titrage expressive, pensée pour composer des labels, renforcer l'impact des messages et installer une présence immédiatement reconnaissable.
              </p>
              <div className="mt-7 grid gap-3">
                {typographicNotes.map(([label, text]) => (
                  <div key={label} className="flex items-baseline justify-between gap-5 border-t pt-3" style={{ borderColor: r(0.07) }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: r(0.28) }}>{label}</span>
                    <span className="text-right" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: r(0.46) }}>{text}</span>
                  </div>
                ))}
              </div>
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
                Une base plus sobre pour le texte courant, choisie pour sa lisibilité et son équilibre éditorial face aux compositions de titrage plus affirmées.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3 border-t pt-5" style={{ borderColor: r(0.07) }}>
                {["Lisibilité", "Sobriété", "Hiérarchie", "Respiration"].map((item) => (
                  <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: r(0.44) }}>
                    {item}
                  </span>
                ))}
              </div>
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
          <div className="mt-10 grid gap-7">
            {[
              ["Couleurs principales", primaryColors],
              ["Couleurs secondaires", secondaryColors],
            ].map(([title, colors]) => (
              <div key={title as string} className="grid gap-5 border-t pt-6 md:grid-cols-[13rem_1fr]" style={{ borderColor: r(0.07) }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.98rem", fontWeight: 700, color: r(0.68) }}>{title as string}</h3>
                <div className="flex flex-wrap gap-4">
                  {(colors as typeof primaryColors).map((color) => {
                    const darkSwatch = color.value === "#050505" || color.value === PURPLE || color.value === MAGENTA;
                    return (
                    <div key={color.name} className="w-[7.2rem]">
                      <div
                        className="flex h-24 flex-col justify-end rounded-t-[2.4rem] rounded-b-[0.85rem] p-3"
                        style={{
                          background: color.value,
                          border: color.value === "#FFFFFF" ? `1px solid ${r(0.14)}` : "none",
                          boxShadow: color.value === "#FFFFFF" ? "none" : "0 18px 42px rgba(0,0,0,0.075)",
                        }}
                      >
                        <span className="block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: darkSwatch ? "#fff" : "#111" }}>{color.name}</span>
                        <span className="mt-0.5 block" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.58rem", fontWeight: 700, color: darkSwatch ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.56)" }}>{color.value}</span>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InteractivePictogram({
  src,
  label,
  behavior,
}: {
  src: string;
  label: string;
  behavior: "recover" | "dry" | "sift";
}) {
  const { r, isDark } = useTheme();
  const eyeColor = isDark ? "#0b1118" : ORANGE;
  const expressionColor = isDark ? "#fff" : ORANGE;
  const sizeClass =
    behavior === "dry"
      ? "h-24 md:h-32"
      : behavior === "sift"
        ? "h-20 md:h-28"
        : "h-[5.5rem] md:h-[7.5rem]";
  const facePosition =
    behavior === "recover"
      ? "left-[24%] top-[46%]"
      : behavior === "dry"
        ? "left-[33%] top-[52%]"
        : "left-[58%] top-[27%]";

  return (
    <div className="group flex flex-col items-center gap-5">
      <div className="relative flex h-32 items-center justify-center md:h-40">
        <img src={src} alt={label} className={`${sizeClass} w-full object-contain`} loading="lazy" />
        <svg className={`absolute ${facePosition} h-8 w-10 overflow-visible opacity-0 transition-opacity duration-300 group-hover:opacity-100`} viewBox="0 0 44 32" aria-hidden="true">
          {behavior === "recover" && (
            <>
              <motion.circle cx="15" cy="11" r="2.6" fill={eyeColor} whileHover={{ cx: 17 }} />
              <motion.circle cx="28" cy="11" r="2.6" fill={eyeColor} whileHover={{ cx: 30 }} />
              <motion.path d="M15 22 C20 27 28 27 33 21" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" initial={false} />
            </>
          )}
          {behavior === "dry" && (
            <>
              <motion.path d="M12 11 C15 8 18 8 21 11" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />
              <motion.path d="M25 11 C28 8 31 8 34 11" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />
              <motion.ellipse cx="23" cy="22" rx="4.5" ry="2.6" fill={expressionColor} initial={false} />
            </>
          )}
          {behavior === "sift" && (
            <>
              <motion.ellipse cx="15" cy="11" rx="2.4" ry="4" fill={eyeColor} whileHover={{ cy: 9 }} />
              <motion.ellipse cx="29" cy="11" rx="2.4" ry="4" fill={eyeColor} whileHover={{ cy: 9 }} />
              <motion.path d="M16 23 C22 19 28 19 34 23" fill="none" stroke={expressionColor} strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>
      <span className="text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.78rem, 1.5vw, 1rem)", fontWeight: 600, color: r(0.64) }}>
        {label}
      </span>
    </div>
  );
}

function GraphicSystemSection() {
  const { r, isDark } = useTheme();
  const pictograms = [
    { src: isDark ? iconRecoverDark : iconRecoverLight, label: "Récupérer le papier", behavior: "recover" as const },
    { src: isDark ? iconDryDark : iconDryLight, label: "Sécher le papier", behavior: "dry" as const },
    { src: isDark ? iconSiftDark : iconSiftLight, label: "Tamiser le papier", behavior: "sift" as const },
  ];

  return (
    <section className="px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <FadeIn>
            <SectionTitle>Système graphique</SectionTitle>
            <p className="max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.36) }}>
              Les pictogrammes, traits de coupe, lignes topographiques et références symboliques construisent un langage visuel à la fois structuré, vivant et reconnaissable.
            </p>
            <p className="mt-4 max-w-md" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.76rem", lineHeight: 1.7, color: r(0.3) }}>
              Formes circulaires, courbes de territoire et références symboliques servent de repères communs à l'ensemble de l'univers.
            </p>
          </FadeIn>
          <FadeIn>
          <div
            className="rounded-[2rem] px-5 py-8 md:px-8 md:py-10"
            style={{
              background: isDark ? r(0.028) : "rgba(255,255,255,0.58)",
              border: `1px solid ${r(0.055)}`,
              boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.16)" : "0 22px 65px rgba(0,0,0,0.045)",
            }}
          >
            <div className="grid grid-cols-3 items-end gap-6 md:gap-10">
              {pictograms.map((icon) => (
                <InteractivePictogram key={icon.label} {...icon} />
              ))}
            </div>
          </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function FloralStem({
  className,
  side = "left",
  variant = "field",
  delay = 0,
}: {
  className: string;
  side?: "left" | "right";
  variant?: "field" | "climb" | "bloom" | "sprig";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const stroke = ORANGE;
  const mirror = side === "right" ? "translate(220 0) scale(-1 1)" : undefined;
  const strokeOpacity = 0.92;
  const mainPath =
    variant === "climb"
      ? "M58 516 C44 454 64 402 56 348 C48 292 76 246 72 198 C69 144 91 86 132 28"
      : variant === "bloom"
        ? "M68 516 C82 452 62 406 78 350 C96 288 78 236 98 176 C112 134 138 87 176 38"
        : variant === "sprig"
          ? "M62 516 C62 458 74 404 70 344 C65 286 90 242 88 184 C86 126 106 75 146 28"
          : "M54 516 C50 456 72 408 62 350 C52 292 80 244 74 190 C69 138 86 79 126 30";
  const branches =
    variant === "bloom"
      ? [
          "M82 384 C120 363 137 326 112 306",
          "M92 292 C54 272 45 236 80 218",
          "M106 190 C145 176 165 139 144 116",
          "M128 118 C96 101 93 70 122 54",
        ]
      : variant === "climb"
        ? [
            "M58 390 C24 363 18 324 54 305",
            "M70 262 C112 244 132 205 104 184",
            "M88 150 C55 131 49 96 82 76",
          ]
        : variant === "sprig"
          ? [
              "M72 374 C112 352 126 316 98 295",
              "M84 246 C44 231 33 194 68 174",
              "M104 116 C142 100 158 68 132 48",
            ]
          : [
              "M60 364 C25 344 19 308 54 290",
              "M74 258 C112 238 126 202 98 184",
              "M86 158 C50 141 46 104 80 84",
              "M98 96 C137 88 158 54 136 34",
            ];
  const leaves =
    variant === "bloom"
      ? [
          { d: "M81 383 C116 368 128 343 111 322 C92 332 78 356 81 383Z", delay: 0.64 },
          { d: "M93 292 C61 278 55 251 80 228 C98 246 103 272 93 292Z", delay: 0.72 },
          { d: "M107 189 C141 178 151 150 135 126 C117 139 106 163 107 189Z", delay: 0.84 },
        ]
      : [
          { d: "M60 364 C30 345 29 319 55 299 C72 319 75 344 60 364Z", delay: 0.58 },
          { d: "M74 258 C107 243 116 216 98 194 C80 208 70 233 74 258Z", delay: 0.7 },
          { d: "M88 158 C57 143 55 116 80 94 C98 113 103 139 88 158Z", delay: 0.82 },
        ];
  const flowers =
    variant === "field"
      ? [
          { x: 126, y: 30, size: 1, delay: 1.05 },
          { x: 98, y: 184, size: 0.72, delay: 1.18 },
        ]
      : variant === "climb"
        ? [
            { x: 132, y: 28, size: 0.86, delay: 1.05 },
            { x: 54, y: 305, size: 0.62, delay: 1.22 },
          ]
        : variant === "sprig"
          ? [
              { x: 146, y: 28, size: 0.78, delay: 1.05 },
              { x: 68, y: 174, size: 0.58, delay: 1.22 },
            ]
          : [
              { x: 176, y: 38, size: 1.05, delay: 1.08 },
              { x: 112, y: 306, size: 0.66, delay: 1.24 },
              { x: 144, y: 116, size: 0.56, delay: 1.34 },
            ];

  const drawProps = reduceMotion
    ? { initial: false }
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: strokeOpacity },
        viewport: { once: true, amount: 0.18 },
      };
  const revealProps = reduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, scale: 0.55 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.18 },
      };

  return (
    <motion.svg
      className={`absolute pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 220 540"
      fill="none"
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      <g transform={mirror} stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d={mainPath}
          strokeWidth="2.15"
          {...drawProps}
          transition={{ duration: 1.85, delay, ease: "easeInOut" }}
        />
        {branches.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            strokeWidth={index === 0 ? 1.7 : 1.45}
            opacity="0.86"
            {...drawProps}
            transition={{ duration: 1.05, delay: delay + 0.42 + index * 0.13, ease: "easeInOut" }}
          />
        ))}
        {leaves.map((leaf, index) => (
          <motion.path
            key={leaf.d}
            d={leaf.d}
            strokeWidth="1.35"
            fill="rgba(240,129,0,0.035)"
            style={{ transformOrigin: `${index % 2 ? 94 : 64}px ${index % 2 ? 235 : 340}px` }}
            {...revealProps}
            transition={{ duration: 0.62, delay: delay + leaf.delay, ease: "easeOut" }}
          />
        ))}
        {flowers.map((flower, index) => (
          <motion.g
            key={`${flower.x}-${flower.y}`}
            transform={`translate(${flower.x} ${flower.y}) scale(${flower.size})`}
            style={{ transformOrigin: `${flower.x}px ${flower.y}px` }}
            {...revealProps}
            transition={{ duration: 0.72, delay: delay + flower.delay, ease: "easeOut" }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-10"
                rx={index === 0 ? 4.4 : 3.4}
                ry={index === 0 ? 14 : 10}
                transform={`rotate(${angle})`}
                strokeWidth="1.25"
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="2.4" fill={stroke} opacity="0.82" />
          </motion.g>
        ))}
      </g>
    </motion.svg>
  );
}

function FloralScrollDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <FloralStem
        side="left"
        variant="field"
        delay={0.02}
        className="left-[-2.7rem] top-[46rem] w-[9rem] opacity-[0.86] md:left-[-1.4rem] md:top-[48rem] md:w-[13.5rem]"
      />
      <FloralStem
        side="right"
        variant="bloom"
        delay={0.08}
        className="right-[-3.4rem] top-[78rem] w-[10rem] opacity-[0.88] md:right-[-1.6rem] md:top-[82rem] md:w-[15rem]"
      />
      <FloralStem
        side="left"
        variant="climb"
        delay={0.12}
        className="left-[-3rem] top-[138rem] hidden w-[14rem] opacity-[0.72] md:block lg:left-[-1.1rem] lg:w-[16rem]"
      />
      <FloralStem
        side="right"
        variant="sprig"
        delay={0.04}
        className="right-[-3rem] top-[210rem] w-[9rem] opacity-[0.76] md:right-[-1.2rem] md:top-[222rem] md:w-[13rem]"
      />
      <FloralStem
        side="left"
        variant="bloom"
        delay={0.1}
        className="left-[-3.2rem] top-[294rem] w-[9.5rem] opacity-[0.78] md:left-[-1.7rem] md:top-[310rem] md:w-[14rem]"
      />
      <FloralStem
        side="right"
        variant="climb"
        delay={0.16}
        className="right-[-2.9rem] top-[382rem] hidden w-[13rem] opacity-[0.68] md:block lg:right-[-1.4rem]"
      />
    </div>
  );
}

function PrintSection() {
  const { r, isDark } = useTheme();
  const mainPrintItems = [
    { src: imgBrochure, alt: "Mise en situation du dépliant Parsemains", label: "Dépliant", fit: "cover", background: isDark ? r(0.035) : "#d8c9b6" },
    { src: imgBookmarkMockup, alt: "Mise en situation marque-page Parsemains", label: "Marque-page", fit: "cover", background: isDark ? r(0.035) : "#d8c9b6" },
    { src: imgBookmarks, alt: "Trois marque-pages Parsemains", label: "Variations", fit: "contain", background: isDark ? r(0.035) : "#d8c9b6" },
  ];
  const pairedPrintItems = [
    { src: imgPosters, alt: "Mockup affiches Parsemains", label: "Affiches", background: isDark ? r(0.035) : "#d8c9b6" },
    { src: imgPackaging, alt: "Mockup packaging Parsemains", label: "Packaging", background: isDark ? r(0.035) : "#d8c9b6" },
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
                <figure>
                  <figcaption className="mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: r(0.66) }}>
                    {item.label}
                  </figcaption>
                  <div
                    className="flex h-[17rem] items-center justify-center overflow-hidden rounded-3xl md:h-[19rem]"
                    style={{
                      background: item.background,
                      border: `1px solid ${r(0.045)}`,
                      boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.2)" : "0 24px 70px rgba(0,0,0,0.065)",
                    }}
                  >
                    <img src={item.src} alt={item.alt} className={`h-full w-full ${item.fit === "contain" ? "object-contain p-5" : "object-cover"}`} loading="lazy" />
                  </div>
                </figure>
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
                  <div
                    className="overflow-hidden rounded-3xl"
                    style={{
                      background: item.background,
                      boxShadow: isDark ? "0 28px 80px rgba(0,0,0,0.2)" : "0 28px 80px rgba(0,0,0,0.075)",
                    }}
                  >
                    <img src={item.src} alt={item.alt} className="h-[17rem] w-full object-cover md:h-[23rem]" loading="lazy" />
                  </div>
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
    { src: imgInstagramFeatureA, words: ["graphic", "punchy", "ludique"] },
    { src: imgInstagramFeatureB, words: ["zoom sur...", "coloré", "élégant"] },
    { src: imgInstagramFeatureC, words: ["produits", "mise en situation", "territoire"] },
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
              <div className="grid gap-7 lg:grid-cols-[0.78fr_1fr] lg:items-center">
                <img
                  src={imgSocialProfile}
                  alt="Déclinaisons Instagram Parsemains"
                  className="mx-auto max-h-[34rem] w-full object-contain lg:max-h-[38rem]"
                  loading="lazy"
                />
                <div className="grid gap-5">
                  {instagramFeatures.map((feature) => (
                    <div key={feature.src} className="grid grid-cols-[7rem_1fr] items-center gap-5 sm:grid-cols-[9rem_1fr] md:gap-7">
                      <img
                        src={feature.src}
                        alt="Déclinaison Instagram Parsemains"
                        className="aspect-square w-full rounded-[1.1rem] object-cover"
                        loading="lazy"
                      />
                      <div>
                        {feature.words.map((word) => (
                        <span key={word} className="block uppercase" style={{ fontFamily: "'Dazzle Unicase', 'Space Grotesk', sans-serif", fontSize: "clamp(1.05rem, 2.1vw, 1.7rem)", fontWeight: 800, lineHeight: 1.04, color: BLACK }}>
                          {word}
                        </span>
                        ))}
                      </div>
                    </div>
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
                <div
                  key={item.src}
                  className="flex h-[18rem] items-center justify-center overflow-hidden rounded-3xl bg-white p-4 md:h-[22rem]"
                  style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 24px 70px rgba(0,0,0,0.2)" : "0 24px 70px rgba(0,0,0,0.07)" }}
                >
                  <img src={item.src} alt={item.alt} className="max-h-full w-full object-contain" loading="lazy" />
                </div>
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
      <FloralScrollDecor />
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
