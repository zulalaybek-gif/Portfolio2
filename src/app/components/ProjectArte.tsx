import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ColorGlow } from "./ColorGlow";
import { ProjectBackButton } from "./ProjectBackButton";

/* -- Assets -- */
import imgMockup2 from "../../assets/arte-en-scène/08-mockup.png";
import imgHero from "../../assets/arte-en-scène/assets/01.header.png";
import imgProposition1 from "../../assets/arte-en-scène/assets/02.proposition-1.png";
import imgPalette from "../../assets/arte-en-scène/assets/03.palette-1.png";
import imgPalette2 from "../../assets/arte-en-scène/assets/04.palette-2.png";
import imgProposition2 from "../../assets/arte-en-scène/assets/05.proposition-2.png";

/* -- Color constants -- */
// Proposition 1 — Pink / Magenta
const P1_COLORS = [
  { hex: "#e3b2c7", name: "Blush Pink" },
  { hex: "#dd6486", name: "Hot Pink" },
  { hex: "#6e3e55", name: "Dark Plum" },
  { hex: "#e1d7d5", name: "Warm Gray" },
];
const P1_GLOW_RGB = ["227,178,199", "221,100,134", "110,62,85"];

// Proposition 2 — Purple / Blue
const P2_COLORS = [
  { hex: "#9cc4e7", name: "Sky Blue" },
  { hex: "#9779df", name: "Soft Purple" },
  { hex: "#7b67be", name: "Deep Violet" },
  { hex: "#ffffff", name: "White" },
];
const P2_GLOW_RGB = ["156,196,231", "151,121,223", "123,103,190"];

const DARK_BG = "#0c0a10";

/* -- Shared helpers -- */
function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span
      className="section-eyebrow uppercase tracking-[0.3em] block"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6rem",
        color: r(0.25),
        letterSpacing: "0.25em",
      }}
    >
      {children}
    </span>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "160px 0px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useBodyStyle() {
  const { r } = useTheme();
  return {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "0.85rem",
    lineHeight: 2,
    color: r(0.35),
  } as const;
}

/* ===================================
   1. HERO
   =================================== */
function HeroSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          scale,
          backgroundImage: `url(${imgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(110,62,85,0.34) 0%, rgba(12,10,16,0.5) 48%, rgba(123,103,190,0.32) 100%)"
            : "linear-gradient(90deg, rgba(227,178,199,0.28) 0%, rgba(255,255,255,0.4) 48%, rgba(156,196,231,0.26) 100%)",
        }}
      />

      {/* Dual glow — pink + purple blended */}
      <ColorGlow colors={[...P1_GLOW_RGB, ...P2_GLOW_RGB]} count={12} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(221,100,134,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 60% 55%, rgba(151,121,223,0.06) 0%, transparent 50%)"
            : "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(221,100,134,0.1) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 60% 55%, rgba(151,121,223,0.1) 0%, transparent 50%)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex items-center gap-4 justify-center"
        >
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: r(0.3),
            }}
          >
            {t("arte.hero.label")} — {t("arte.hero.year")}
          </span>
          <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: isDark ? "#fff" : DARK_BG,
            lineHeight: 0.95,
          }}
        >
          ARTE
          <br />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.7rem, 2vw, 1rem)",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: r(0.35),
            }}
          >
            en scène
          </span>
        </motion.h1>
      </motion.div>
    </section>
  );
}

/* ===================================
   2. INTRO
   =================================== */
function IntroSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
      <FadeIn>
        <h2
          className="text-center mb-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: isDark ? "#fff" : DARK_BG,
            transition: "color 0.5s ease",
          }}
        >
          ARTE en scène
        </h2>
      </FadeIn>
      <FadeIn delay={0.05}>
        <p
          className="text-center mb-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#dd6486",
          }}
        >
          {t("arte.intro.tag")}
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p
          className="text-center"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            lineHeight: 1.9,
            color: r(0.45),
          }}
        >
          {t("arte.intro.subtitle")}
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div
          className="w-12 h-[1px] mx-auto my-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(221,100,134,0.3), rgba(151,121,223,0.3))",
          }}
        />
      </FadeIn>
      <FadeIn delay={0.2}>
        <p
          className="text-center max-w-2xl mx-auto"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.85rem",
            lineHeight: 2,
            color: r(0.3),
          }}
        >
          {t("arte.intro.desc")}
        </p>
      </FadeIn>
    </section>
  );
}

/* ===================================
   3. CONTEXT
   =================================== */
function ContextSection() {
  const { t } = useI18n();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("arte.context.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.context.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   PROPOSITION 1 — EDITORIAL STAGE
   =================================== */
function PropositionOneEditorial() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();
  const markers = [
    { number: "01", label: "Mouvement\net corps", style: { left: "34.8%", top: "67.5%" } },
    { number: "02", label: "Typographie\nsculpturale", style: { left: "60%", top: "73.5%" } },
    { number: "03", label: "Énergie\nscénique", style: { left: "91%", top: "71.8%" } },
  ];

  return (
    <section
      id="arte-proposition-1"
      className="relative px-0 py-16 lg:py-0 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(18,14,22,1), rgba(34,20,31,0.92))"
          : "linear-gradient(135deg, #ffffff 0%, #fbf8fa 42%, #f8eef2 100%)",
      }}
    >
      <div className="hidden lg:block relative mx-auto w-full max-w-[1672px] aspect-[1672/941] min-h-[760px] max-h-[941px] overflow-hidden">
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "37%",
            top: "-18%",
            width: "70%",
            height: "28%",
            background: isDark
              ? "rgba(227,178,199,0.08)"
              : "linear-gradient(180deg, rgba(110,62,85,0.1), rgba(227,178,199,0.24))",
            opacity: isDark ? 0.26 : 0.32,
            boxShadow: "0 34px 90px rgba(221,100,134,0.12)",
          }}
        />

        <img
          src={imgProposition1}
          alt="Trois affiches Proposition 1 Arte en scène disposées dans une scène lumineuse"
          className="absolute inset-0 z-20 h-full w-full object-contain pointer-events-none"
          loading="lazy"
          decoding="async"
        />

        <div
          className="absolute z-30"
          style={{ left: "5.7%", top: "23%" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.88rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#dd6486",
              fontWeight: 700,
            }}
          >
            PROPOSITION 01
          </span>
        </div>

        <h3
          className="absolute z-30 whitespace-nowrap"
          style={{
            left: "5.7%",
            top: "27%",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "4.1rem",
            fontWeight: 400,
            letterSpacing: "-0.055em",
            lineHeight: 0.95,
            color: isDark ? "#fff7fb" : "#1d1722",
          }}
        >
          {t("arte.prop1.label")}
        </h3>

        <span
          className="absolute z-30 h-[11px] w-[11px] rounded-full"
          style={{ left: "27.2%", top: "31.2%", background: "#dd6486" }}
        />

        <div
          className="absolute z-30 flex items-center gap-4"
          style={{ left: "5.7%", top: "38.2%" }}
        >
          <span className="h-[1px] w-16 bg-[#dd6486]/55" />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#dd6486",
              fontWeight: 700,
            }}
          >
            ARTE EN SCÈNE
          </p>
        </div>

        <p
          className="absolute z-30"
          style={{
            ...body,
            left: "5.7%",
            top: "44%",
            width: "27.5%",
            fontSize: "1.06rem",
            lineHeight: 1.82,
            color: isDark ? r(0.46) : "#8f96a3",
          }}
        >
          {t("arte.prop1.text")}
        </p>

        <a
          href="#arte-proposition-1"
          className="absolute z-30 inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            left: "5.7%",
            top: "70.5%",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#dd6486",
          }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ border: "1px solid rgba(221,100,134,0.45)" }}
            aria-hidden="true"
          >
            →
          </span>
          Voir le projet
        </a>

        <div
          className="absolute z-30 flex items-center gap-5"
          style={{ left: "5.7%", top: "90%" }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.66rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: isDark ? "#fff7fb" : "#211827",
              fontWeight: 700,
            }}
          >
            ARTE <span style={{ color: "#dd6486" }}>EN SCÈNE</span>
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              color: r(0.32),
            }}
          >
            Direction artistique
          </span>
        </div>

        <div
          className="absolute z-10 rounded-[50%] pointer-events-none"
          style={{
            left: "29%",
            top: "63%",
            width: "69%",
            height: "28%",
            border: "1px solid rgba(221,100,134,0.32)",
            transform: "rotate(4deg)",
          }}
        />

        {markers.map((marker) => (
          <div
            key={marker.number}
            className="absolute z-30 flex -translate-x-1/2 flex-col items-center text-center"
            style={marker.style}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "#dd6486",
              }}
            >
              {marker.number}
            </span>
            <span className="mt-1 h-10 border-l border-dotted border-[#dd6486]/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#dd6486]/65" />
            <span
              className="mt-4 whitespace-pre-line"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.86rem",
                lineHeight: 1.25,
                color: r(0.36),
              }}
            >
              {marker.label}
            </span>
          </div>
        ))}
      </div>

      <div className="lg:hidden relative z-10 px-6">
        <FadeIn>
          <div className="max-w-[420px] mx-auto">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.64rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#dd6486",
                fontWeight: 700,
              }}
            >
              PROPOSITION 01
            </span>
            <h3
              className="mt-6"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2.55rem, 12vw, 4rem)",
                fontWeight: 400,
                letterSpacing: "-0.055em",
                lineHeight: 0.95,
                color: isDark ? "#fff7fb" : "#211827",
              }}
            >
              {t("arte.prop1.label")}
            </h3>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-[1px] w-10 bg-[#dd6486]/55" />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.66rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#dd6486",
                  fontWeight: 600,
                }}
              >
                ARTE EN SCÈNE
              </p>
            </div>
            <p className="mt-8" style={{ ...body, color: r(0.42) }}>
              {t("arte.prop1.text")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <img
            src={imgProposition1}
            alt="Trois affiches Proposition 1 Arte en scène disposées dans une scène lumineuse"
            className="mt-12 block h-auto w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </FadeIn>

        <div className="relative z-30 grid w-full max-w-xl grid-cols-1 gap-3 pt-4 sm:grid-cols-3 mx-auto">
          {markers.map((marker) => (
            <div key={marker.number} className="text-center">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#dd6486",
                }}
              >
                {marker.number}
              </span>
              <p
                className="mt-2 whitespace-pre-line"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  lineHeight: 1.35,
                  color: r(0.36),
                }}
              >
                {marker.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================================
   PALETTE DE COULEURS
   =================================== */
function PaletteSection() {
  const { isDark } = useTheme();

  return (
    <section className="relative px-4 sm:px-6 md:px-16 py-16 md:py-20 overflow-hidden">
      <div
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] md:rounded-[36px] px-5 sm:px-8 md:px-14 py-14 md:py-16"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 42%, rgba(255,244,248,0.12) 0%, rgba(227,178,199,0.08) 36%, rgba(110,62,85,0.16) 100%)"
            : "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.98) 0%, rgba(248,238,241,0.94) 42%, rgba(227,178,199,0.38) 100%)",
          border: isDark
            ? "1px solid rgba(227,178,199,0.16)"
            : "1px solid rgba(110,62,85,0.08)",
          boxShadow: isDark
            ? "0 34px 90px rgba(0,0,0,0.32)"
            : "0 34px 90px rgba(110,62,85,0.12)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(110,62,85,0.1) 0%, transparent 18%, transparent 82%, rgba(110,62,85,0.1) 100%)",
          }}
        />
        <div
          className="absolute left-[-8rem] top-6 h-[78%] w-64 rounded-r-full pointer-events-none hidden md:block"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(110,62,85,0.14) 0 5px, rgba(227,178,199,0.08) 5px 13px, rgba(255,255,255,0.1) 13px 18px)",
            opacity: isDark ? 0.28 : 0.42,
          }}
        />
        <div
          className="absolute right-[-8rem] top-6 h-[78%] w-64 rounded-l-full pointer-events-none hidden md:block"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 5px, rgba(227,178,199,0.1) 5px 13px, rgba(110,62,85,0.14) 13px 18px)",
            opacity: isDark ? 0.28 : 0.42,
          }}
        />

        <FadeIn>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-7 h-12 w-20">
              <div
                className="absolute left-1/2 top-0 h-11 w-14 -translate-x-1/2 rounded-t-full"
                style={{ border: "1px solid rgba(110,62,85,0.32)" }}
              />
              <div
                className="absolute left-1/2 top-2 h-8 w-9 -translate-x-1/2 rounded-t-full"
                style={{ border: "1px solid rgba(110,62,85,0.22)" }}
              />
              <div
                className="absolute bottom-0 left-2 right-2 h-[1px]"
                style={{ background: "rgba(110,62,85,0.32)" }}
              />
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8 mb-5 w-full">
              <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#6e3e55]/20" />
              <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#6e3e55]/55" />
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1rem, 4vw, 2.55rem)",
                  fontWeight: 600,
                  letterSpacing: "clamp(0.12em, 1vw, 0.34em)",
                  textTransform: "uppercase",
                  color: isDark ? "#f3d7e2" : "#6e3e55",
                }}
              >
                Palette de couleurs
              </h3>
              <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#6e3e55]/55" />
              <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#6e3e55]/20" />
            </div>

            <p
              className="mb-12 md:mb-14"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: isDark ? "rgba(243,215,226,0.58)" : "rgba(110,62,85,0.48)",
              }}
            >
              ARTE EN SCÈNE
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="relative">
              <div
                className="absolute left-1/2 bottom-[-2.5rem] h-28 w-[118%] -translate-x-1/2 rounded-[50%] pointer-events-none"
                style={{
                  border: "1px dashed rgba(110,62,85,0.18)",
                  borderTopColor: "transparent",
                }}
              />
              <img
                src={imgPalette}
                alt="Quatre blocs couleur acrylique Arte en scène"
                className="relative z-10 block w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8 mt-1 md:mt-2">
              {P1_COLORS.map((color) => (
                <div key={color.hex} className="flex flex-col items-center text-center">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      border: "1px solid rgba(110,62,85,0.38)",
                      background: isDark ? "rgba(243,215,226,0.18)" : "rgba(255,255,255,0.7)",
                    }}
                  />
                  <div
                    className="h-8 border-l"
                    style={{ borderColor: "rgba(110,62,85,0.28)", borderLeftStyle: "dotted" }}
                  />
                  <span
                    className="mb-2"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      color: isDark ? "rgba(243,215,226,0.68)" : "rgba(110,62,85,0.68)",
                    }}
                  >
                    {color.hex}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                      color: isDark ? "#f3d7e2" : "#6e3e55",
                    }}
                  >
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="relative z-10 mt-14 flex items-center justify-center gap-4 pointer-events-none">
          <div className="h-[1px] w-24 bg-[#6e3e55]/18" />
          <span className="h-2.5 w-2.5 rotate-45 bg-[#6e3e55]/70" />
          <div className="h-[1px] w-24 bg-[#6e3e55]/18" />
        </div>
      </div>
    </section>
  );
}

/* ===================================
   PROPOSITION 2 — EDITORIAL STAGE
   =================================== */
function PropositionTwoEditorial() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();
  const markers = [
    { number: "01", label: "Mouvement\net tension" },
    { number: "02", label: "Lumière\net grain" },
    { number: "03", label: "Trace du\ncorps" },
  ];

  return (
    <section
      className="relative px-6 md:px-16 py-20 md:py-24 overflow-hidden"
      style={{
        background: isDark
          ? "radial-gradient(circle at 74% 18%, rgba(151,121,223,0.16) 0%, rgba(156,196,231,0.08) 30%, transparent 60%)"
          : "radial-gradient(circle at 74% 18%, rgba(210,222,255,0.72) 0%, rgba(246,248,255,0.92) 42%, rgba(255,255,255,0.98) 74%)",
      }}
    >
      <div className="absolute right-[-10rem] top-[-6rem] h-[28rem] w-[34rem] rounded-full bg-[#9779df]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] gap-14 lg:gap-8 items-center min-h-[700px]">
        <FadeIn>
          <div className="max-w-[460px]">
            <div className="mb-6">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.64rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#7b67be",
                  fontWeight: 700,
                }}
              >
                PROPOSITION 02
              </span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <h3
                className="whitespace-normal lg:whitespace-nowrap"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(2.55rem, 4.2vw, 4rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.055em",
                  lineHeight: 0.95,
                  color: isDark ? "#f5f3ff" : "#211827",
                }}
              >
                {t("arte.prop2.label")}
              </h3>
              <span
                className="hidden sm:block h-2.5 w-2.5 rounded-full"
                style={{ background: "#7b67be" }}
              />
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="h-[1px] w-10 bg-[#7b67be]/55" />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.66rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#7b67be",
                  fontWeight: 600,
                }}
              >
                ARTE EN SCÈNE
              </p>
            </div>

            <p style={{ ...body, color: r(0.42) }}>{t("arte.prop2.text")}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[610px] flex flex-col items-center justify-center lg:block">
            <div
              className="absolute left-[58%] top-[16%] bottom-[18%] w-[80%] -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 38%, rgba(151,121,223,0.16) 0%, rgba(156,196,231,0.12) 38%, transparent 72%)",
                filter: "blur(18px)",
              }}
            />

            <motion.div
              className="relative z-20 mx-auto w-full max-w-[900px] lg:absolute lg:left-[52%] lg:top-[10%] lg:w-[55vw] lg:max-w-[980px] lg:-translate-x-1/2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={imgProposition2}
                alt="Trois affiches Proposition 2 Arte en scène disposées dans une scène lumineuse"
                className="block h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
                style={{
                  filter: isDark
                    ? "drop-shadow(0 24px 44px rgba(0,0,0,0.22))"
                    : "drop-shadow(0 22px 40px rgba(123,103,190,0.12))",
                }}
              />
            </motion.div>

            <div className="hidden lg:grid absolute left-[52%] bottom-[7%] z-30 w-[70%] -translate-x-1/2 grid-cols-3 gap-6">
              {markers.map((marker) => (
                <div key={marker.number} className="flex flex-col items-center text-center">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#7b67be",
                    }}
                  >
                    {marker.number}
                  </span>
                  <span className="mt-1 h-9 border-l border-dotted border-[#7b67be]/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7b67be]/65" />
                  <span
                    className="mt-4 whitespace-pre-line"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      lineHeight: 1.35,
                      color: r(0.36),
                    }}
                  >
                    {marker.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative z-30 grid w-full max-w-xl grid-cols-1 gap-3 pt-2 sm:grid-cols-3 lg:hidden">
              {markers.map((marker) => (
                <div key={marker.number} className="text-center">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#7b67be",
                    }}
                  >
                    {marker.number}
                  </span>
                  <p
                    className="mt-2 whitespace-pre-line"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.68rem",
                      lineHeight: 1.35,
                      color: r(0.36),
                    }}
                  >
                    {marker.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn delay={0.05}>
            <SectionLabel>{t("arte.prop2.direction.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.prop2.direction.text")}</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-12">
          <FadeIn delay={0.05}>
            <SectionLabel>{t("arte.prop2.choices.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.prop2.choices.text")}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mb-14">
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[36px] px-5 sm:px-8 md:px-14 py-14 md:py-16"
            style={{
              background: isDark
                ? "radial-gradient(circle at 50% 42%, rgba(236,240,255,0.12) 0%, rgba(151,121,223,0.1) 38%, rgba(20,18,32,0.22) 100%)"
                : "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.98) 0%, rgba(239,243,255,0.95) 44%, rgba(156,196,231,0.26) 100%)",
              border: isDark
                ? "1px solid rgba(156,196,231,0.18)"
                : "1px solid rgba(123,103,190,0.1)",
              boxShadow: isDark
                ? "0 34px 90px rgba(0,0,0,0.28)"
                : "0 34px 90px rgba(123,103,190,0.12)",
            }}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-7 h-12 w-20">
                <div
                  className="absolute left-1/2 top-0 h-11 w-14 -translate-x-1/2 rounded-t-full"
                  style={{ border: "1px solid rgba(123,103,190,0.32)" }}
                />
                <div
                  className="absolute left-1/2 top-2 h-8 w-9 -translate-x-1/2 rounded-t-full"
                  style={{ border: "1px solid rgba(123,103,190,0.22)" }}
                />
                <div
                  className="absolute bottom-0 left-2 right-2 h-[1px]"
                  style={{ background: "rgba(123,103,190,0.32)" }}
                />
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8 mb-5 w-full">
                <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#7b67be]/20" />
                <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#7b67be]/55" />
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1rem, 4vw, 2.55rem)",
                    fontWeight: 600,
                    letterSpacing: "clamp(0.12em, 1vw, 0.34em)",
                    textTransform: "uppercase",
                    color: isDark ? "#e8e6ff" : "#4e3d7f",
                  }}
                >
                  {t("arte.palette.label")}
                </h3>
                <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#7b67be]/55" />
                <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#7b67be]/20" />
              </div>

              <p
                className="mb-12 md:mb-14"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: isDark ? "rgba(232,230,255,0.58)" : "rgba(78,61,127,0.48)",
                }}
              >
                ARTE EN SCÈNE
              </p>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
              <img
                src={imgPalette2}
                alt="Quatre blocs couleur acrylique Proposition 2 Arte en scène"
                className="relative z-10 block w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />

              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8 mt-1 md:mt-2">
                {P2_COLORS.map((color) => (
                  <div key={color.hex} className="flex flex-col items-center text-center">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        border: "1px solid rgba(123,103,190,0.38)",
                        background: isDark
                          ? "rgba(232,230,255,0.18)"
                          : "rgba(255,255,255,0.78)",
                      }}
                    />
                    <div
                      className="h-8 border-l"
                      style={{
                        borderColor: "rgba(123,103,190,0.28)",
                        borderLeftStyle: "dotted",
                      }}
                    />
                    <span
                      className="mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        color: isDark
                          ? "rgba(232,230,255,0.68)"
                          : "rgba(78,61,127,0.68)",
                      }}
                    >
                      {color.hex}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                        color: isDark ? "#e8e6ff" : "#4e3d7f",
                      }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${r(0.04)}` }}
          >
            <img
              src={imgMockup2}
              alt={`${t("arte.prop2.label")} mockup`}
              className="w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   PROPOSITION BLOCK (reusable)
   =================================== */
function PropositionBlock({
  titleKey,
  textKey,
  dirLabelKey,
  dirTextKey,
  choicesLabelKey,
  choicesTextKey,
  posters,
  mockup,
  palette,
  glowColors,
  accentHex,
}: {
  titleKey: TranslationKey;
  textKey: TranslationKey;
  dirLabelKey: TranslationKey;
  dirTextKey: TranslationKey;
  choicesLabelKey: TranslationKey;
  choicesTextKey: TranslationKey;
  posters: string[];
  mockup: string;
  palette: { hex: string; name: string }[];
  glowColors: string[];
  accentHex: string;
}) {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="relative px-6 md:px-16 py-20 overflow-hidden">
      {/* Background glow for this proposition */}
      <ColorGlow colors={glowColors} count={8} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Proposition title */}
        <FadeIn className="mb-12">
          <div className="flex items-center gap-4">
            <div
              className="w-3 h-3 rounded-[3px]"
              style={{ background: accentHex }}
            />
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: isDark ? "#fff" : DARK_BG,
              }}
            >
              {t(titleKey)}
            </h3>
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.05}>
          <p
            className="max-w-2xl mb-12"
            style={body}
          >
            {t(textKey)}
          </p>
        </FadeIn>

        {/* Triptych of posters */}
        <FadeIn delay={0.1} className="mb-14">
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {posters.map((src, i) => (
              <motion.div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  border: `1px solid ${r(0.06)}`,
                  boxShadow: isDark
                    ? `0 12px 40px rgba(0,0,0,0.4)`
                    : `0 12px 40px rgba(0,0,0,0.08)`,
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src={src}
                  alt={`${t(titleKey)} poster ${i + 1}`}
                  className="w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Direction visuelle */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-10">
          <FadeIn delay={0.05}>
            <SectionLabel>{t(dirLabelKey)}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t(dirTextKey)}</p>
          </FadeIn>
        </div>

        {/* Choix graphiques */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start mb-12">
          <FadeIn delay={0.05}>
            <SectionLabel>{t(choicesLabelKey)}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t(choicesTextKey)}</p>
          </FadeIn>
        </div>

        {/* Palette */}
        <FadeIn delay={0.1} className="mb-14">
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[36px] px-5 sm:px-8 md:px-14 py-14 md:py-16"
            style={{
              background: isDark
                ? "radial-gradient(circle at 50% 42%, rgba(236,240,255,0.12) 0%, rgba(151,121,223,0.1) 38%, rgba(20,18,32,0.22) 100%)"
                : "radial-gradient(circle at 50% 42%, rgba(255,255,255,0.98) 0%, rgba(239,243,255,0.95) 44%, rgba(156,196,231,0.26) 100%)",
              border: isDark
                ? "1px solid rgba(156,196,231,0.18)"
                : "1px solid rgba(123,103,190,0.1)",
              boxShadow: isDark
                ? "0 34px 90px rgba(0,0,0,0.28)"
                : "0 34px 90px rgba(123,103,190,0.12)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(123,103,190,0.1) 0%, transparent 18%, transparent 82%, rgba(123,103,190,0.1) 100%)",
              }}
            />
            <div
              className="absolute left-[-8rem] top-6 h-[78%] w-64 rounded-r-full pointer-events-none hidden md:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(123,103,190,0.16) 0 5px, rgba(151,121,223,0.1) 5px 13px, rgba(255,255,255,0.12) 13px 18px)",
                opacity: isDark ? 0.3 : 0.42,
              }}
            />
            <div
              className="absolute right-[-8rem] top-6 h-[78%] w-64 rounded-l-full pointer-events-none hidden md:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 5px, rgba(151,121,223,0.1) 5px 13px, rgba(123,103,190,0.16) 13px 18px)",
                opacity: isDark ? 0.3 : 0.42,
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-7 h-12 w-20">
                <div
                  className="absolute left-1/2 top-0 h-11 w-14 -translate-x-1/2 rounded-t-full"
                  style={{ border: "1px solid rgba(123,103,190,0.32)" }}
                />
                <div
                  className="absolute left-1/2 top-2 h-8 w-9 -translate-x-1/2 rounded-t-full"
                  style={{ border: "1px solid rgba(123,103,190,0.22)" }}
                />
                <div
                  className="absolute bottom-0 left-2 right-2 h-[1px]"
                  style={{ background: "rgba(123,103,190,0.32)" }}
                />
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8 mb-5 w-full">
                <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#7b67be]/20" />
                <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#7b67be]/55" />
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1rem, 4vw, 2.55rem)",
                    fontWeight: 600,
                    letterSpacing: "clamp(0.12em, 1vw, 0.34em)",
                    textTransform: "uppercase",
                    color: isDark ? "#e8e6ff" : "#4e3d7f",
                  }}
                >
                  {t("arte.palette.label")}
                </h3>
                <span className="hidden sm:block h-2 w-2 rotate-45 bg-[#7b67be]/55" />
                <div className="hidden sm:block h-[1px] w-20 md:w-32 bg-[#7b67be]/20" />
              </div>

              <p
                className="mb-12 md:mb-14"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: isDark ? "rgba(232,230,255,0.58)" : "rgba(78,61,127,0.48)",
                }}
              >
                ARTE EN SCÈNE
              </p>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="relative">
                <div
                  className="absolute left-1/2 bottom-[-2.5rem] h-28 w-[118%] -translate-x-1/2 rounded-[50%] pointer-events-none"
                  style={{
                    border: "1px dashed rgba(123,103,190,0.18)",
                    borderTopColor: "transparent",
                  }}
                />
                <img
                  src={imgPalette2}
                  alt="Quatre blocs couleur acrylique Proposition 2 Arte en scène"
                  className="relative z-10 block w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8 mt-1 md:mt-2">
                {palette.map((color) => (
                  <div key={color.hex} className="flex flex-col items-center text-center">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        border: "1px solid rgba(123,103,190,0.38)",
                        background: isDark
                          ? "rgba(232,230,255,0.18)"
                          : "rgba(255,255,255,0.78)",
                      }}
                    />
                    <div
                      className="h-8 border-l"
                      style={{
                        borderColor: "rgba(123,103,190,0.28)",
                        borderLeftStyle: "dotted",
                      }}
                    />
                    <span
                      className="mb-2"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        color: isDark
                          ? "rgba(232,230,255,0.68)"
                          : "rgba(78,61,127,0.68)",
                      }}
                    >
                      {color.hex}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                        color: isDark ? "#e8e6ff" : "#4e3d7f",
                      }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-14 flex items-center justify-center gap-4 pointer-events-none">
              <div className="h-[1px] w-24 bg-[#7b67be]/18" />
              <span className="h-2.5 w-2.5 rotate-45 bg-[#7b67be]/70" />
              <div className="h-[1px] w-24 bg-[#7b67be]/18" />
            </div>
          </div>
        </FadeIn>

        {/* Mockup */}
        <FadeIn delay={0.12}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${r(0.04)}` }}
          >
            <img
              src={mockup}
              alt={`${t(titleKey)} mockup`}
              className="w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   ENJEU
   =================================== */
function EnjeuSection() {
  const { t } = useI18n();
  const { r } = useTheme();
  const body = useBodyStyle();

  return (
    <section className="px-6 md:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-start">
          <FadeIn>
            <SectionLabel>{t("arte.enjeu.label")}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={body}>{t("arte.enjeu.text")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ===================================
   FINAL
   =================================== */
function FinalSection() {
  const { t } = useI18n();
  const { isDark, r } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="relative px-6 md:px-16 py-24 overflow-visible">
      {/* Final dual glow */}
      <ColorGlow colors={[...P1_GLOW_RGB, ...P2_GLOW_RGB]} count={10} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn className="mb-6">
          <SectionLabel>{t("arte.final.label")}</SectionLabel>
        </FadeIn>

        {/* Dual color squares */}
        <FadeIn>
          <div className="flex gap-4 mb-10">
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-[16px] md:rounded-[20px]"
              style={{
                background: "linear-gradient(140deg, #e3b2c7 0%, #dd6486 100%)",
                boxShadow: isDark
                  ? "0 20px 50px rgba(221,100,134,0.2)"
                  : "0 20px 50px rgba(221,100,134,0.12)",
              }}
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="w-20 h-20 md:w-28 md:h-28 rounded-[16px] md:rounded-[20px]"
              style={{
                background: "linear-gradient(140deg, #9cc4e7 0%, #9779df 100%)",
                boxShadow: isDark
                  ? "0 20px 50px rgba(151,121,223,0.2)"
                  : "0 20px 50px rgba(151,121,223,0.12)",
              }}
              whileHover={{ rotate: -5, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </FadeIn>

        <FadeIn>
          <p
            className="text-center max-w-md mb-12"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "0.85rem",
              lineHeight: 2,
              color: r(0.3),
            }}
          >
            {t("arte.final.text")}
          </p>
        </FadeIn>

        <FadeIn>
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              border: `1px solid ${r(0.1)}`,
              color: r(0.4),
            }}
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            {t("arte.back")}
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===================================
   MAIN EXPORT
   =================================== */
export function ProjectArte() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          background: isDark ? "rgba(12,10,16,0.7)" : "rgba(255,255,255,0.7)",
          border: `1px solid ${r(0.08)}`,
          color: r(0.5),
          boxShadow: isDark
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {t("arte.back")}
      </ProjectBackButton>

      <HeroSection />
      <IntroSection />
      <ContextSection />

      {/* ── Proposition 1 — Pink/Magenta ── */}
      <PropositionOneEditorial />

      <PaletteSection />

      {/* ── Proposition 2 — Purple/Blue ── */}
      <PropositionTwoEditorial />

      <EnjeuSection />
      <FinalSection />
    </div>
  );
}
