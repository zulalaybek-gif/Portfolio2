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
import imgStandsRentree from "../../assets/narratiiv/01.stands-de-rentee.png";

/* ── Affichage photos ── */
import imgAffiche1 from "../../assets/narratiiv/02.affichage.png";
import imgAffiche2 from "../../assets/narratiiv/03.affichage.png";
import imgAffiche3 from "../../assets/narratiiv/04.affichage.png";
import imgAffiche4 from "../../assets/narratiiv/05.affichage.png";
import imgAffiche5 from "../../assets/narratiiv/06.affichage.png";

/* ── Social media posts — batch 1 (carousel) ── */
import imgPost11 from "../../assets/narratiiv/07.carrousel-1-candidater.png";
import imgPost21 from "../../assets/narratiiv/08.carrousel-1-candidater.png";
import imgPost31 from "../../assets/narratiiv/09.carrousel-1-candidater.png";
import imgPost41 from "../../assets/narratiiv/10.carrousel-1-candidater.png";
import imgPost51 from "../../assets/narratiiv/11.carrousel-1-candidater.png";
import imgPost61 from "../../assets/narratiiv/12.carrousel-1-candidater.png";
import imgPost71 from "../../assets/narratiiv/13.carrousel-1-candidater.png";
import imgPost81 from "../../assets/narratiiv/14.carrousel-1-candidater.png";

/* ── Social media posts — batch 2 (carousel) ── */
import imgPost12 from "../../assets/narratiiv/15.carnet-de-bord.png";
import imgPost22 from "../../assets/narratiiv/16.carnet-de-bord.png";
import imgPost32 from "../../assets/narratiiv/17.carnet-de-bord.png";
import imgPost42 from "../../assets/narratiiv/18.carnet-de-bord.png";
import imgPost52 from "../../assets/narratiiv/19.carnet-de-bord.png";
import imgPost62 from "../../assets/narratiiv/20.carnet-de-bord.png";
import imgPost72 from "../../assets/narratiiv/21.carnet-de-bord.png";

/* ── Large photo ── */
import imgLargePhoto from "../../assets/narratiiv/22.mockup-carrousel.png";

/* ── Infographie ── */
import imgInfographie from "../../assets/narratiiv/23.infographie.png";

/* ── Videos ── */
import videoCompetition from "../../assets/narratiiv/vidéos/01.competition-tf1.mp4";
import videoSoiree from "../../assets/narratiiv/vidéos/02.soiree.mp4";
import videoLoopJpo from "../../assets/narratiiv/vidéos/03.loop-jpo.mp4";
import videoPublicite from "../../assets/narratiiv/vidéos/04.publicite.mp4";
import videoAmd from "../../assets/narratiiv/vidéos/05.amd.mp4";
import videoItwLaurent from "../../assets/narratiiv/vidéos/06.itw-laurent-buanec.mp4";
import videoLoopNarratiiv from "../../assets/narratiiv/vidéos/07.loop-narratiiv.mp4";
import videoWorkshopLoopsider from "../../assets/narratiiv/vidéos/08.workshop-loopsider.mp4";
import videoInfluenceurs from "../../assets/narratiiv/vidéos/09.semaine-des-influenceurs.mp4";
import videoCampus from "../../assets/narratiiv/vidéos/10.campus.mp4";
import videoWorkshopVoici from "../../assets/narratiiv/vidéos/11.workshop-voici-magazine.mp4";

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

function sortedAssetUrls(modules: Record<string, string>) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);
}

const printCarnetDeBord = sortedAssetUrls(import.meta.glob<string>("../../assets/narratiiv/documents-print/01.carnet-de-bord/*.png", { eager: true, import: "default" }));
const printGuideAccueil = sortedAssetUrls(import.meta.glob<string>("../../assets/narratiiv/documents-print/02.guide-d-accueil/*.png", { eager: true, import: "default" }));
const printGuideIntervenant = sortedAssetUrls(import.meta.glob<string>("../../assets/narratiiv/documents-print/03..guide-de-l-intervenant/*.png", { eager: true, import: "default" }));
const printLivretBlanc = sortedAssetUrls(import.meta.glob<string>("../../assets/narratiiv/documents-print/04.livret-blanc/*.png", { eager: true, import: "default" }));
const printMagazineIa = sortedAssetUrls(import.meta.glob<string>("../../assets/narratiiv/documents-print/05.magazine-ia/*.png", { eager: true, import: "default" }));

/* ── Video categories ── */
const VIDEO_CATEGORIES = [
  {
    id: "challenges",
    labelFr: "Compet & Challenges",
    labelEn: "Competitions & Challenges",
    videos: [
      { src: videoCompetition, titleFr: "Compétition TF1", titleEn: "TF1 Competition", aspect: "9/16" },
      { src: videoWorkshopLoopsider, titleFr: "Workshop Loopsider", titleEn: "Loopsider Workshop", aspect: "9/16" },
      { src: videoWorkshopVoici, titleFr: "Workshop Voici Magazine", titleEn: "Voici Magazine Workshop", aspect: "9/16" },
    ],
  },
  {
    id: "soirees",
    labelFr: "Soirées",
    labelEn: "Parties",
    videos: [
      { src: videoSoiree, titleFr: "Soirée Narratiiv", titleEn: "Narratiiv Party", aspect: "9/16" },
      { src: videoInfluenceurs, titleFr: "Semaine des influenceurs", titleEn: "Influencers Week", aspect: "9/16" },
    ],
  },
  {
    id: "pub",
    labelFr: "Publicité",
    labelEn: "Advertising",
    videos: [
      { src: videoPublicite, titleFr: "Spot publicitaire", titleEn: "Ad Spot", aspect: "16/9" },
      { src: videoAmd, titleFr: "AMD", titleEn: "AMD", aspect: "16/9" },
    ],
  },

  {
    id: "loop",
    labelFr: "Loop JPO",
    labelEn: "Open Day Loop",
    videos: [
      { src: videoLoopJpo, titleFr: "Boucle Journée Portes Ouvertes", titleEn: "Open Day Loop", aspect: "16/9" },
      { src: videoLoopNarratiiv, titleFr: "Loop Narratiiv", titleEn: "Narratiiv Loop", aspect: "16/9" },
    ],
  },
  {
    id: "campus",
    labelFr: "Campus & Vie scolaire",
    labelEn: "Campus & School Life",
    videos: [
      { src: videoCampus, titleFr: "Campus", titleEn: "Campus", aspect: "9/16" },
      { src: videoItwLaurent, titleFr: "Interview Laurent Buanec", titleEn: "Laurent Buanec Interview", aspect: "16/9" },
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
    pages: printCarnetDeBord,
  },
  {
    label: "Guide d'accueil",
    labelEn: "Welcome Guide",
    descFr: "Guide d'accueil remis à chaque nouvel étudiant lors de la rentrée 2023-2024.",
    descEn: "Welcome guide given to each new student at the 2023-2024 start of year.",
    pages: printGuideAccueil,
  },
  {
    label: "Guide de l'intervenant",
    labelEn: "Speaker's Guide",
    descFr: "Guide complet à destination des intervenants extérieurs de l'école.",
    descEn: "Comprehensive guide for the school's external speakers.",
    pages: printGuideIntervenant,
  },
  {
    label: "Livret blanc",
    labelEn: "White Paper",
    descFr: "Publication institutionnelle présentant l'école et ses formations.",
    descEn: "Institutional publication presenting the school and its programs.",
    pages: printLivretBlanc,
  },
  {
    label: "Magazine IA",
    labelEn: "AI Magazine",
    descFr: "Magazine thématique consacré à l'intelligence artificielle, conçu pour les étudiants.",
    descEn: "Thematic magazine on artificial intelligence, designed for students.",
    pages: printMagazineIa,
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

function VideoCard({ url, src, title, aspect }: { url?: string; src?: string; title: string; aspect: string }) {
  const { r, isDark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(0);
  const id = url ? getYouTubeId(url) : "";
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
      {src ? (
        <video
          src={src}
          controls
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : playing ? (
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
          <VideoCard key={`${v.catId}-${i}`} url={v.url} src={v.src} title={lang === "fr" ? v.titleFr : v.titleEn} aspect={v.aspect} />
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
  const SOCIAL_BATCH_2 = [imgPost12, imgPost22, imgPost32, imgPost42, imgPost52, imgPost62, imgPost72];

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
