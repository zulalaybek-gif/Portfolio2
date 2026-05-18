import { motion } from "motion/react";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* ── Assets — Logos ── */
import imgLogo1 from "figma:asset/1fb2477e9f6842dce8d7fb8348c8af0515635cf5.png";
import imgLogo2 from "figma:asset/3e77f851ca2067ed4c3ee254fba4784b62cc2e8c.png";

/* ── Signage / Stands ── */
import imgStandsRentree from "figma:asset/b4bfa5b93fd65e87b104a385fc8f08e0566a51ff.png";

/* ── Affichage photos ── */
import imgAffiche1 from "figma:asset/9b7139016bb92d2e4645e33bb69b2d7ab7890e53.png";
import imgAffiche2 from "figma:asset/2e43b250710102f2cfe1d148e0dae75ff41e7dca.png";
import imgAffiche3 from "figma:asset/a488c9b9d3f4082e6ce32702ca63abf7769b2487.png";
import imgAffiche4 from "figma:asset/edceb0e5a1ca2e578bb7dc765bbf53c8b02b7a01.png";
import imgAffiche5 from "figma:asset/d6af92e2a420c70dd48cea18de95703afdbd158a.png";

/* ── Social media posts — batch 1 (carousel) ── */
import imgPost11 from "figma:asset/ac2b44d8dc5211382add1c422fa04c123d891cd3.png";
import imgPost21 from "figma:asset/9af8401ca64fdd8eba442dd6ddfe08e158f52b03.png";
import imgPost31 from "figma:asset/11cbf80e6e31a55fc6b7ec28b0f63bf87e58aab5.png";
import imgPost41 from "figma:asset/c5e0238df3aac359489d3859ed3a33297227828c.png";
import imgPost51 from "figma:asset/7496f0a1f41665cfb5e73e340ae997ae240ca24d.png";
import imgPost61 from "figma:asset/e241467e3f69feebf6728840b7df601cf4b4afe7.png";
import imgPost71 from "figma:asset/fdbd0ed43df5d89a554e573e22d2e962cf3d1dea.png";
import imgPost81 from "figma:asset/53274f40c5bd6d8dd22ea74029838b304abc8da6.png";

/* ── Social media posts — batch 2 (carousel) ── */
import imgPost12 from "figma:asset/5bac8d08403ddb5e2e05ddb1b98ad382dec98ffc.png";
import imgPost22 from "figma:asset/8073eae9c29bb551bbf1538c3ce0f608b1d9413b.png";
import imgPost32 from "figma:asset/e498ef7baf69bd7a79fbbc40678930d03cccb0e2.png";
import imgPost42 from "figma:asset/84fd17b6e619f5ccef92b575219712b22e5f96f6.png";
import imgPost52 from "figma:asset/03affae8b468d95d4918feca1cdd7d3fd2d35233.png";
import imgPost62 from "figma:asset/51c11791965a62d92e661e0a99eb308d09804947.png";

/* ── Large photo ── */
import imgLargePhoto from "figma:asset/8027b7c51358eeba5d02f7a8960757f7c1cb6c39.png";

/* ── Infographie ── */
import imgInfographie from "figma:asset/e057f664db21e0e968054b433946d03fb840a379.png";

/* ── Print — Carnet de bord (échantillon 5 pages sur 64 pour publication) ── */
import imgCdb01 from "figma:asset/9abb9d48ce0f069891d6b4319ace5b2ff1713f78.png";
import imgCdb02 from "figma:asset/c7fbc25ccb3d03d5e4e3d7190512429cb84199c7.png";
import imgCdb32 from "figma:asset/ff540e01f03faa48ad1c34bb5ff7aaaf4f939b34.png";
import imgCdb62 from "figma:asset/1c0569bf1704f23340bc81e97236aee498974f87.png";
import imgCdb64 from "figma:asset/05bc21491f2dcac3f8bd9fa109d0128e8decddcc.png";

/* ── Print — Guide d'accueil 23-24 (4 pages) ── */
import imgGA1 from "figma:asset/80fc43be405d4fa0cb01579e353fae8e1a4873ed.png";
import imgGA2 from "figma:asset/18d2b739c4f826a3ea1ee3dea970250232752b5c.png";
import imgGA3 from "figma:asset/c2c7de302ad3b1371a979898e28e9090584911f6.png";
import imgGA4 from "figma:asset/5d97de29fe993972c65deeb5511e0279519e73e1.png";

/* ── Print — Guide de l'intervenant (échantillon 5 pages sur 28) ── */
import imgGI01 from "figma:asset/20f1ebb9f77b58f4afcccec782321c449412f131.png";
import imgGI02 from "figma:asset/3c078de81a1e422947af5df7c2d216d3c2483c7f.png";
import imgGI14 from "figma:asset/a488103faa120315a283ad1e6217b37a798e0080.png";
import imgGI27 from "figma:asset/de3fb076bfabc044ed7ebb517803492fb094abf1.png";
import imgGI28 from "figma:asset/3a805b56c93466a4a46bb56f39941d066e456be0.png";

/* ── Print — Livret blanc (échantillon 5 pages sur 16) ── */
import imgLB01 from "figma:asset/d3a71597faad6a9bceaee295ce75d352878064b9.png";
import imgLB02 from "figma:asset/95f76592bd9f45cd6d3ac373430e0ba13215177d.png";
import imgLB08 from "figma:asset/0e684c3bfa4f400eee8c15f176ec020c598d99ba.png";
import imgLB15 from "figma:asset/c9ec9fd3b3c7855a4c14d5ba5632cedaf10cec59.png";
import imgLB16 from "figma:asset/4478949746b7f706a9a7457d61d7a15da08a04de.png";

/* ── Print — Magazine IA (échantillon 5 pages sur 16) ── */
import imgMI01 from "figma:asset/df350a40750d63878bbf733917f0c335cf45a5d1.png";
import imgMI02 from "figma:asset/c1aedd04d60d20cd0269c19878c1b0f4cdda5d4b.png";
import imgMI08 from "figma:asset/1fd22ed43edf7ea06bb174e4531b1f78e69a787a.png";
import imgMI15 from "figma:asset/2f6a1fc93c085da81a5d01c4685ce0e381579d2b.png";
import imgMI16 from "figma:asset/7ab876c36ca6120d109cb7933a15057b714647d8.png";

/* ══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const ACCENT = "#7aded1";
const ACCENT_RGB = "122,222,209";

/* ── Color palette — tiered hierarchy ── */
const PALETTE_PRIMARY = [
  { hex: "#7aded1", label: "Turquoise", labelEn: "Turquoise" },
];
const PALETTE_SECONDARY = [
  { hex: "#e36329", label: "Orange", labelEn: "Orange" },
  { hex: "#000066", label: "Bleu marine", labelEn: "Navy Blue" },
  { hex: "#c7c7c7", label: "Gris", labelEn: "Grey" },
];
const PALETTE_TERTIARY = [
  { hex: "#000000", label: "Noir", labelEn: "Black" },
  { hex: "#ffffff", label: "Blanc", labelEn: "White", border: true as const },
];

/* ── Video categories ── */
const VIDEO_CATEGORIES = [
  {
    id: "challenges",
    labelFr: "Compet & Challenges",
    labelEn: "Competitions & Challenges",
    videos: [
      { url: "https://youtube.com/shorts/fHVKhwIx5fk", titleFr: "Compétition étudiante", titleEn: "Student Competition", aspect: "9/16" },
    ],
  },
  {
    id: "soirees",
    labelFr: "Soirées",
    labelEn: "Parties",
    videos: [
      { url: "https://youtube.com/shorts/IBwy8pgVmZ8", titleFr: "Soirée Narratiiv", titleEn: "Narratiiv Party", aspect: "9/16" },
    ],
  },
  {
    id: "pub",
    labelFr: "Publicité",
    labelEn: "Advertising",
    videos: [
      { url: "https://youtu.be/Z7QXfwZ_pBM", titleFr: "Spot publicitaire", titleEn: "Ad Spot", aspect: "16/9" },
    ],
  },

  {
    id: "loop",
    labelFr: "Loop JPO",
    labelEn: "Open Day Loop",
    videos: [
      { url: "https://youtu.be/rBEKoMltqps", titleFr: "Boucle Journée Portes Ouvertes", titleEn: "Open Day Loop", aspect: "16/9" },
    ],
  },
  {
    id: "campus",
    labelFr: "Campus & Vie scolaire",
    labelEn: "Campus & School Life",
    videos: [
      { url: "https://youtube.com/shorts/Y6FO4GZcb-0", titleFr: "Visite du campus", titleEn: "Campus Tour", aspect: "9/16" },
    ],
  },
];

/* ── Print documents ── */
const PRINT_DOCS = [
  {
    label: "Carnet de bord",
    labelEn: "Student Logbook",
    descFr: "Carnet distribué aux élèves, faisant office de bloc-notes et de guide regroupant les informations pratiques de l'école, un calendrier et des mini-jeux.",
    descEn: "Student logbook combining a notepad with school info, calendar, and mini-games.",
    pages: [imgCdb01, imgCdb02, imgCdb32, imgCdb62, imgCdb64],
  },
  {
    label: "Guide d'accueil",
    labelEn: "Welcome Guide",
    descFr: "Guide d'accueil remis à chaque nouvel étudiant lors de la rentrée 2023-2024.",
    descEn: "Welcome guide given to each new student at the 2023-2024 start of year.",
    pages: [imgGA1, imgGA2, imgGA3, imgGA4],
  },
  {
    label: "Guide de l'intervenant",
    labelEn: "Speaker's Guide",
    descFr: "Guide complet à destination des intervenants extérieurs de l'école.",
    descEn: "Comprehensive guide for the school's external speakers.",
    pages: [imgGI01, imgGI02, imgGI14, imgGI27, imgGI28],
  },
  {
    label: "Livret blanc",
    labelEn: "White Paper",
    descFr: "Publication institutionnelle présentant l'école et ses formations.",
    descEn: "Institutional publication presenting the school and its programs.",
    pages: [imgLB01, imgLB02, imgLB08, imgLB15, imgLB16],
  },
  {
    label: "Magazine IA",
    labelEn: "AI Magazine",
    descFr: "Magazine thématique consacré à l'intelligence artificielle, conçu pour les étudiants.",
    descEn: "Thematic magazine on artificial intelligence, designed for students.",
    pages: [imgMI01, imgMI02, imgMI08, imgMI15, imgMI16],
  },
];

/* ══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "160px 0px" }} transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  const { r } = useTheme();
  return (
    <span className="block mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.25) }}>
      {children}
    </span>
  );
}

function ImgCard({ src, alt, aspect = "16/9", className = "" }: { src: string; alt: string; aspect?: string; className?: string }) {
  const { r, isDark } = useTheme();
  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)" }}>
      <ImageWithFallback src={src} alt={alt} loading="lazy" className="w-full h-auto block" style={{ aspectRatio: aspect, objectFit: "cover" }} />
    </div>
  );
}

/* ── ScrollRow with arrows + scroll indicator ── */
function ScrollRow({ children, className = "", fullBleed = false }: { children: React.ReactNode; className?: string; fullBleed?: boolean }) {
  const { r, isDark } = useTheme();
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    if (el.scrollLeft > 20) setHasScrolled(true);
  };

  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  const wrapperClass = fullBleed ? "relative group w-screen left-1/2 -translate-x-1/2" : "relative group";
  const fadeBg = isDark ? "10,10,10" : "255,255,255";

  return (
    <div className={wrapperClass}>
      <div className="relative">
        {/* Left fade + animated arrow */}
        <div className="absolute left-0 top-0 bottom-2 w-16 md:w-20 z-[5] pointer-events-none transition-opacity duration-300 flex items-center pl-2" style={{ background: `linear-gradient(to right, rgba(${fadeBg},0.9), rgba(${fadeBg},0))`, opacity: canScrollLeft ? 1 : 0 }}>
          <motion.div animate={{ x: [0, -4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronLeft size={18} style={{ color: r(0.4) }} />
          </motion.div>
        </div>
        {/* Right fade + animated arrow */}
        <div className="absolute right-0 top-0 bottom-2 w-16 md:w-20 z-[5] pointer-events-none transition-opacity duration-300 flex items-center justify-end pr-2" style={{ background: `linear-gradient(to left, rgba(${fadeBg},0.9), rgba(${fadeBg},0))`, opacity: canScrollRight ? 1 : 0 }}>
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronRight size={18} style={{ color: r(0.4) }} />
          </motion.div>
        </div>
        {/* Clickable nav buttons on hover */}
        {canScrollLeft && (
          <button onClick={() => scroll(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)", border: `1px solid ${r(0.1)}` }}>
            <ChevronLeft size={16} style={{ color: r(0.6) }} />
          </button>
        )}
        <div ref={ref} onScroll={checkScroll} className={`relative flex gap-4 overflow-x-auto pb-2 ${fullBleed ? "px-6 md:px-12" : ""} ${className}`} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {children}
        </div>
        {canScrollRight && (
          <button onClick={() => scroll(1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)", border: `1px solid ${r(0.1)}` }}>
            <ChevronRight size={16} style={{ color: r(0.6) }} />
          </button>
        )}
        {/* Scroll hint — overlay inside container, bottom-right */}
        {canScrollRight && !hasScrolled && (
          <motion.div
            className="absolute bottom-4 right-4 z-[6] flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)", border: `1px solid ${r(0.08)}` }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: r(0.35) }}>
              {lang === "fr" ? "Défiler" : "Scroll"}
            </span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight size={10} style={{ color: r(0.35) }} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   YOUTUBE EMBED HELPER
   ═══════════════════════════════════════════ */
function getYouTubeId(url: string): string {
  // shorts
  const shortsMatch = url.match(/shorts\/([^?&]+)/);
  if (shortsMatch) return shortsMatch[1];
  // youtu.be
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  // full
  const fullMatch = url.match(/[?&]v=([^?&]+)/);
  if (fullMatch) return fullMatch[1];
  return "";
}

function VideoCard({ url, title, aspect }: { url: string; title: string; aspect: string }) {
  const { r, isDark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(0);
  const id = getYouTubeId(url);
  /* Try maxresdefault first, then sddefault, then mqdefault */
  const thumbs = [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  ];
  const thumb = thumbs[Math.min(thumbError, thumbs.length - 1)];

  return (
    <div
      className="overflow-hidden rounded-xl relative cursor-pointer group w-full"
      style={{
        aspectRatio: aspect,
        border: `1px solid ${r(0.06)}`,
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)",
        background: isDark ? "#111" : "#f0f0f0",
      }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <>
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setThumbError((e) => Math.min(e + 1, thumbs.length - 1))}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={20} fill="#000" color="#000" className="ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)" }}>{title}</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   PRINT — horizontal scroll gallery (reliable)
   ═══════════════════════════════════════════ */
function PrintGallery() {
  const { lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const [activeDoc, setActiveDoc] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const doc = PRINT_DOCS[activeDoc];
  const pages = doc.pages;

  const centerFirstPage = () => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const offset = firstCard.offsetLeft - (el.clientWidth / 2) + (firstCard.clientWidth / 2);
    el.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  };

  const selectDoc = (idx: number) => {
    if (idx === activeDoc) return;
    setActiveDoc(idx);
    setTimeout(centerFirstPage, 80);
  };

  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });

  return (
    <FadeIn>
      <SectionLabel>{lang === "fr" ? "Supports editoriaux" : "Editorial Materials"}</SectionLabel>
      <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
        {lang === "fr" ? "Documents Print" : "Print Documents"}
      </h2>
      <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
        {lang === "fr"
          ? "Ensemble de publications conçues dans le cadre de la communication de l'école : guides, livrets, magazines et supports de rentrée."
          : "Collection of publications designed for the school's communications: guides, booklets, magazines, and back-to-school materials."}
      </p>

      {/* Document selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PRINT_DOCS.map((d, i) => (
          <button
            key={i}
            onClick={() => selectDoc(i)}
            className="px-4 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
              border: `1px solid ${activeDoc === i ? `rgba(${ACCENT_RGB},0.4)` : r(0.08)}`,
              background: activeDoc === i ? `rgba(${ACCENT_RGB},0.08)` : "transparent",
              color: activeDoc === i ? ACCENT : r(0.35),
            }}
          >
            {lang === "fr" ? d.label : d.labelEn}
            <span className="px-1.5 py-0.5 rounded" style={{ fontSize: "0.55rem", background: r(0.05), color: r(0.25) }}>
              {d.pages.length}p
            </span>
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.7, color: r(0.3), maxWidth: 500 }}>
        {lang === "fr" ? doc.descFr : doc.descEn}
      </p>

      {/* Horizontal page gallery — full bleed, first page centered */}
      <div className="relative group w-screen left-1/2 -translate-x-1/2">
        {/* Fade hints */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-[5] pointer-events-none" style={{ background: `linear-gradient(to right, ${isDark ? "rgba(10,10,10,0.9)" : "rgba(255,255,255,0.9)"}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-[5] pointer-events-none flex items-center justify-end pr-3" style={{ background: `linear-gradient(to left, ${isDark ? "rgba(10,10,10,0.9)" : "rgba(255,255,255,0.9)"}, transparent)` }}>
          <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronRight size={18} style={{ color: r(0.25) }} />
          </motion.div>
        </div>

        <button onClick={() => scroll(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)", border: `1px solid ${r(0.1)}` }}>
          <ArrowLeft size={16} style={{ color: r(0.6) }} />
        </button>

        <div
          ref={scrollRef}
          className="relative flex gap-4 overflow-x-auto pb-4 items-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", paddingLeft: "calc(50vw - clamp(90px, 11vw, 140px))", paddingRight: "calc(50vw - clamp(90px, 11vw, 140px))" }}
        >
          {pages.map((page, i) => (
            <div key={`${activeDoc}-${i}`} className="flex-none snap-center">
              <div
                className="rounded-xl overflow-hidden relative"
                style={{
                  width: "clamp(180px, 22vw, 280px)",
                  aspectRatio: "7/10",
                  border: `1px solid ${r(0.06)}`,
                  boxShadow: isDark ? "0 6px 30px rgba(0,0,0,0.35)" : "0 6px 30px rgba(0,0,0,0.08)",
                }}
              >
                <ImageWithFallback src={page} alt={`Page ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-3">
                  <span className="px-2 py-0.5 rounded-full backdrop-blur-md" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)", color: r(0.35) }}>
                    {i + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => scroll(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.8)", border: `1px solid ${r(0.1)}` }}>
          <ArrowRight size={16} style={{ color: r(0.6) }} />
        </button>
      </div>

      {/* Page count */}
      <div className="text-center mt-6">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.2) }}>
          {pages.length} {lang === "fr" ? "pages" : "pages"}
        </span>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   VIDEO SECTION — flat grid with category tabs
   ═══════════════════════════════════════════ */
function VideoSection() {
  const { lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const [activeCat, setActiveCat] = useState<string>("all");

  const allVideos = VIDEO_CATEGORIES.flatMap((cat) =>
    cat.videos.map((v) => ({ ...v, catId: cat.id, catLabel: lang === "fr" ? cat.labelFr : cat.labelEn }))
  );
  const filtered = activeCat === "all" ? allVideos : allVideos.filter((v) => v.catId === activeCat);

  return (
    <FadeIn>
      <SectionLabel>{lang === "fr" ? "Audiovisuel" : "Audiovisual"}</SectionLabel>
      <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
        {lang === "fr" ? "Vidéos & Montages" : "Videos & Edits"}
      </h2>
      <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
        {lang === "fr"
          ? "Sélection de contenus vidéo réalisés pour les différents besoins de communication de l'école : réseaux sociaux, événements, publicité et vie scolaire."
          : "Selection of video content produced for the school's communication needs: social media, events, advertising, and school life."}
      </p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCat("all")}
          className="px-4 py-2 rounded-full transition-all duration-300"
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
            border: `1px solid ${activeCat === "all" ? `rgba(${ACCENT_RGB},0.4)` : r(0.08)}`,
            background: activeCat === "all" ? `rgba(${ACCENT_RGB},0.08)` : "transparent",
            color: activeCat === "all" ? ACCENT : r(0.35),
          }}
        >
          {lang === "fr" ? "Tout" : "All"} <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>({allVideos.length})</span>
        </button>
        {VIDEO_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className="px-4 py-2 rounded-full transition-all duration-300"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
              border: `1px solid ${activeCat === cat.id ? `rgba(${ACCENT_RGB},0.4)` : r(0.08)}`,
              background: activeCat === cat.id ? `rgba(${ACCENT_RGB},0.08)` : "transparent",
              color: activeCat === cat.id ? ACCENT : r(0.35),
            }}
          >
            {lang === "fr" ? cat.labelFr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((v, i) => (
          <VideoCard key={`${v.catId}-${i}`} url={v.url} title={lang === "fr" ? v.titleFr : v.titleEn} aspect={v.aspect} />
        ))}
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export function ProjectNrtv() {
  const { t, lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const navigate = useNavigate();

  const SOCIAL_BATCH_1 = [imgPost11, imgPost21, imgPost31, imgPost41, imgPost51, imgPost61, imgPost71, imgPost81];
  const SOCIAL_BATCH_2 = [imgPost12, imgPost22, imgPost32, imgPost42, imgPost52, imgPost62];

  return (
    <div className="relative w-full">
      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: isDark ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)` : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.1) 0%, transparent 70%)` }} />

        <motion.div className="relative z-10 flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="mb-10 flex items-center gap-4">
            <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.3) }}>
              {lang === "fr" ? "Brand Content & Community Management" : "Brand Content & Community Management"}
            </span>
            <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          </motion.div>

          {/* Hero Logo — gentle float */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 0.5 }, y: { duration: 4, delay: 1.3, repeat: Infinity, ease: "easeInOut" } }}
            className="mb-6"
          >
            <ImageWithFallback src={imgLogo1} alt="Narratiiv" className="h-16 w-auto" style={{ filter: isDark ? "none" : "invert(1)" }} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-center max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", lineHeight: 1.7, color: r(0.35) }}>
            {lang === "fr"
              ? "Deploiement d'une nouvelle direction artistique et production de contenus pour un etablissement d'enseignement superieur"
              : "Deployment of a new artistic direction and content production for a higher education institution"}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="flex items-center gap-6 mt-10">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.2) }}>
              {lang === "fr" ? "Community Manager & Brand Content Manager" : "Community Manager & Brand Content Manager"}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-28 pb-28">
        {/* Back button */}
        <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onClick={() => navigate("/projects")} className="flex items-center gap-2 group" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.3) }}>
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          {lang === "fr" ? "Retour aux projets" : "Back to projects"}
        </motion.button>

        {/* ─── INTRODUCTION ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Contexte de la mission" : "Mission Context"}</SectionLabel>
          <p className="mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: r(0.4), maxWidth: 700 }}>
            {lang === "fr"
              ? "Chez Narratiiv, j'ai occupe les fonctions de Community Manager et Brand Content Manager au moment ou l'ecole venait d'emmenager dans de nouveaux locaux et d'adopter une nouvelle direction artistique. Si cette identite venait d'etre definie, aucun contenu n'avait encore ete produit a partir de celle-ci. Mon role a donc consiste a la faire exister concretement a travers les differentes prises de parole de l'ecole."
              : "At Narratiiv, I served as Community Manager and Brand Content Manager when the school had just moved into new premises and adopted a new artistic direction. While this identity had just been defined, no content had yet been produced from it. My role was therefore to bring it to life through the school's various communications."}
          </p>
        </FadeIn>

        {/* ─── PROJECT DETAILS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {([
            {
              labelFr: "Cadre du projet", labelEn: "Project Context",
              textFr: "Cette mission recouvrait un ensemble large de productions destinees a des contextes varies : reseaux sociaux, communication institutionnelle, supports digitaux, visuels evenementiels, presentations, signaletique et contenus audiovisuels. Le travail s'inscrivait dans une logique de production continue, avec des besoins quotidiens et des formats multiples a concevoir et a adapter.",
              textEn: "This mission covered a broad range of productions for varied contexts: social media, institutional communication, digital materials, event visuals, presentations, signage, and audiovisual content. The work followed a continuous production logic, with daily needs and multiple formats to design and adapt.",
            },
            {
              labelFr: "Enjeu du projet", labelEn: "Project Challenge",
              textFr: "L'enjeu principal etait de transformer une charte graphique nouvellement posee en un systeme de communication reellement vivant, coherent et identifiable. Il fallait non seulement respecter cette nouvelle identite, mais surtout lui donner une presence concrete et durable sur l'ensemble des supports de l'ecole.",
              textEn: "The main challenge was to transform a newly established visual identity into a truly living, coherent, and recognizable communication system. It was necessary not only to respect this new identity but above all to give it a concrete and lasting presence across all the school's media.",
            },
            {
              labelFr: "Approche de travail", labelEn: "Work Approach",
              textFr: "Mon travail consistait a decliner cette nouvelle direction artistique sur une grande variete de formats, tout en veillant a maintenir coherence, lisibilite et efficacite visuelle. Cette mission demandait une forte capacite d'adaptation, aussi bien dans la production de contenus que dans leur hierarchisation et leur ajustement selon les usages.",
              textEn: "My work consisted of adapting this new artistic direction across a wide variety of formats, while ensuring coherence, readability, and visual effectiveness. This mission required strong adaptability, both in content production and in their prioritization and adjustment according to use cases.",
            },
            {
              labelFr: "Productions realisees", labelEn: "Completed Work",
              textFr: "Les realisations presentees dans ce projet regroupent une selection de contenus concus dans ce cadre : visuels pour les reseaux sociaux, contenus de marque, supports institutionnels, affichage, signaletique, presentations, videos, tournages, montages et autres productions developpees selon les besoins de communication de l'ecole.",
              textEn: "The work presented in this project includes a selection of content designed in this context: social media visuals, brand content, institutional materials, posters, signage, presentations, videos, shoots, edits, and other productions developed according to the school's communication needs.",
            },
          ] as const).map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <h3 className="mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: p.text }}>{lang === "fr" ? item.labelFr : item.labelEn}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: r(0.35) }}>{lang === "fr" ? item.textFr : item.textEn}</p>
            </FadeIn>
          ))}
        </div>

        {/* ─── IDENTITE VISUELLE ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Identite graphique" : "Graphic Identity"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {lang === "fr" ? "Direction artistique" : "Art Direction"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "La nouvelle identite visuelle de Narratiiv repose sur une palette dynamique et un systeme de logos declinables. Voici les elements fondateurs de cette charte."
              : "Narratiiv's new visual identity is built on a dynamic palette and a system of adaptable logos. Here are the founding elements of this brand identity."}
          </p>

          {/* Logos */}
          <div className="mb-8">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Logotypes" : "Logotypes"}
            </span>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[{ src: imgLogo1, label: "Logo principal" }, { src: imgLogo2, label: "Logo secondaire" }].map((logo, i) => (
                <div key={i} className="rounded-xl p-6 flex items-center justify-center" style={{ background: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5", border: `1px solid ${r(0.06)}` }}>
                  <ImageWithFallback src={logo.src} alt={logo.label} className="max-h-14 w-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Palette — tiered */}
          <div className="mb-8">
            <span className="block mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Palette chromatique" : "Color Palette"}
            </span>

            {/* Primary */}
            <div className="mb-6">
              <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: r(0.2) }}>
                {lang === "fr" ? "Couleur principale" : "Primary Color"}
              </span>
              {PALETTE_PRIMARY.map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-2xl" style={{ width: 80, height: 80, background: c.hex, border: `1px solid ${r(0.06)}` }} />
                  <div>
                    <span className="block" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: p.text }}>{lang === "fr" ? c.label : c.labelEn}</span>
                    <span className="block mt-0.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: r(0.25), fontVariant: "tabular-nums" }}>{c.hex.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary */}
            <div className="mb-6">
              <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: r(0.2) }}>
                {lang === "fr" ? "Couleurs secondaires" : "Secondary Colors"}
              </span>
              <div className="flex flex-wrap gap-5">
                {PALETTE_SECONDARY.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-xl" style={{ width: 52, height: 52, background: c.hex, border: `1px solid ${r(0.06)}` }} />
                    <div>
                      <span className="block" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: p.text }}>{lang === "fr" ? c.label : c.labelEn}</span>
                      <span className="block mt-0.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25), fontVariant: "tabular-nums" }}>{c.hex.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tertiary */}
            <div>
              <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: r(0.2) }}>
                {lang === "fr" ? "Neutres" : "Neutrals"}
              </span>
              <div className="flex flex-wrap gap-5">
                {PALETTE_TERTIARY.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-lg" style={{ width: 40, height: 40, background: c.hex, border: ("border" in c && c.border) ? `1px solid ${r(0.15)}` : `1px solid ${r(0.06)}` }} />
                    <div>
                      <span className="block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.4) }}>{lang === "fr" ? c.label : c.labelEn}</span>
                      <span className="block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.2), fontVariant: "tabular-nums" }}>{c.hex.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── SIGNALETIQUE / STANDS ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Signaletique & Affichage" : "Signage & Display"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {lang === "fr" ? "Stands de rentree" : "Back-to-School Stands"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Affichage concu pour les stands d'accueil lors de la rentree scolaire, declinant la nouvelle identite visuelle de l'ecole."
              : "Display materials designed for welcome stands during back-to-school, adapting the school's new visual identity."}
          </p>
          <ImgCard src={imgStandsRentree} alt="Stands de rentree" aspect="16/9" />
        </FadeIn>

        {/* ─── AFFICHAGE PHOTOS ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Communication visuelle" : "Visual Communication"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {lang === "fr" ? "Affichage & Visuels" : "Posters & Visuals"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Visuels grand format concus pour l'affichage interne et externe de l'ecole."
              : "Large-format visuals designed for the school's internal and external display."}
          </p>
          <ScrollRow fullBleed>
            {[imgAffiche1, imgAffiche2, imgAffiche3, imgAffiche4, imgAffiche5].map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(200px, 25vw, 300px)" }}>
                <ImgCard src={img} alt={`Affiche ${i + 1}`} aspect="7/10" />
              </div>
            ))}
          </ScrollRow>
        </FadeIn>

        {/* ─── RESEAUX SOCIAUX ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Reseaux sociaux" : "Social Media"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {lang === "fr" ? "Contenus pour les reseaux" : "Social Media Content"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Posts et carrousels concus pour les reseaux sociaux de l'ecole, declinant l'identite visuelle sur differents formats et thematiques."
              : "Posts and carousels designed for the school's social media, adapting the visual identity across various formats and topics."}
          </p>

          {/* Batch 1 — Carrousel */}
          <div className="mb-6">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Carrousel 1" : "Carousel 1"}
            </span>
          </div>
          <ScrollRow fullBleed className="mb-10">
            {SOCIAL_BATCH_1.map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(180px, 22vw, 260px)" }}>
                <ImgCard src={img} alt={`Post ${i + 1}`} aspect="1/1" />
              </div>
            ))}
          </ScrollRow>

          {/* Batch 2 — Carrousel */}
          <div className="mb-6">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Carrousel 2" : "Carousel 2"}
            </span>
          </div>
          <ScrollRow fullBleed className="mb-10">
            {SOCIAL_BATCH_2.map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(180px, 22vw, 260px)" }}>
                <ImgCard src={img} alt={`Post ${i + 1}`} aspect="1/1" />
              </div>
            ))}
          </ScrollRow>


        </FadeIn>

        {/* ─── PHOTO ─── */}
        <FadeIn>
          <div className="-mx-6 md:-mx-12 lg:-mx-20">
            <ImageWithFallback src={imgLargePhoto} alt="Vue d'ensemble" loading="lazy" className="w-full h-auto block" />
            <div className="w-full" style={{ height: 1, background: r(0.08) }} />
          </div>
        </FadeIn>

        {/* ─── VIDEOS ─── */}
        <VideoSection />

        {/* ─── INFOGRAPHIE ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Data & Contenu" : "Data & Content"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {lang === "fr" ? "Infographie" : "Infographic"}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Infographie realisee pour le magazine IA de l'ecole, synthetisant des donnees complexes en format visuel accessible."
              : "Infographic created for the school's AI magazine, synthesizing complex data into an accessible visual format."}
          </p>
          <div className="max-w-xl overflow-hidden rounded-xl" style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.06)" }}>
            <ImageWithFallback src={imgInfographie} alt="Infographie IA" loading="lazy" className="w-full h-auto block" style={{ objectFit: "contain" }} />
          </div>
        </FadeIn>

        {/* ─── DOCUMENTS PRINT (FLIPBOOK) ─── */}
        <PrintGallery />

        {/* ─── CLOSING ─── */}
        <FadeIn className="text-center py-16">
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
          <ImageWithFallback src={imgLogo1} alt="Narratiiv" className="h-8 w-auto mx-auto mb-6 opacity-20" style={{ filter: isDark ? "none" : "invert(1)" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "Narratiiv — une selection de realisations concues dans le cadre de mes fonctions de Community Manager et Brand Content Manager."
              : "Narratiiv — a selection of works created during my role as Community Manager and Brand Content Manager."}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
