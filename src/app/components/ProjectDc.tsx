import { motion } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/* ── Assets ── */
import svgPaths from "../../imports/svg-t7oxiwk9z2";
import logoSvgPaths from "../../imports/svg-m9u3nftpad";
import imgLogoDcBlack from "../../assets/digital-campus/logos/01.dc-logo-complet-noir.svg";

// Signalétique — entrée étages
import imgSign1 from "../../assets/digital-campus/01.signaletique.png";
import imgSign2 from "../../assets/digital-campus/02.signaletique.png";
import imgSign3 from "../../assets/digital-campus/03.signaletique.png";
import imgSign4 from "../../assets/digital-campus/04.signaletique.png";
import imgSign5 from "../../assets/digital-campus/05.signaletique.png";

// Signalétique — plans étages
import imgSng1 from "../../assets/digital-campus/06.plans-etages.png";
import imgSng0 from "../../assets/digital-campus/07.plans-etages.png";
import imgSngA from "../../assets/digital-campus/08.plans-etages.png";
import imgSng2 from "../../assets/digital-campus/09.plans-etages.png";
import imgSng3 from "../../assets/digital-campus/10.plans-etages.png";
import imgSng4 from "../../assets/digital-campus/11.plans-etages.png";
import imgSng5 from "../../assets/digital-campus/12.plans-etages.png";

// Signalétique ascenseur
import imgElevator from "../../assets/digital-campus/13.signaletique-ascenseur.png";

// Cartes étudiantes
import imgCartes from "../../assets/digital-campus/14.cartes-etudiantes.png";

// Écrans
import imgScreen1 from "../../assets/digital-campus/15.visuels-ecrans.png";
import imgScreen2 from "../../assets/digital-campus/16.visuels-ecrans.png";
import imgScreen3 from "../../assets/digital-campus/17.visuels-ecrans.png";

// Affiches
import imgAffiches from "../../assets/digital-campus/18.affiches.png";

// Bannières & réseaux sociaux
import imgBanniere from "../../assets/digital-campus/19.jpo.png";
import imgDcTalk from "../../assets/digital-campus/20.dc-talk.png";
import imgCampagne from "../../assets/digital-campus/21.flyer.png";
import imgPost from "../../assets/digital-campus/22.flyer.png";

// Parcours & Timeline
import imgParcours from "../../assets/digital-campus/23.parcours-d-etudes.png";
import imgTimeline from "../../assets/digital-campus/24.timeline.png";

// Pack salons
import imgKakemono01 from "../../assets/digital-campus/25.kakemono.png";
import imgKakemono02 from "../../assets/digital-campus/26.kakemono.png";
import imgKakemono03 from "../../assets/digital-campus/27.kakemono.png";
import imgKakemono04 from "../../assets/digital-campus/28.kakemono.png";
import imgKakemono05 from "../../assets/digital-campus/29.kakemono.png";
import imgStand1 from "../../assets/digital-campus/30.salon-etudiant.jpg";
import imgStand2 from "../../assets/digital-campus/32.salon-etudiant.jpg";
import imgStand3 from "../../assets/digital-campus/33.salon-etudiant.jpg";

// Print — Guide d'utilisation des outils
import imgGuide34 from "../../assets/digital-campus/34.guide-utilisation.pdf.png";
import imgGuide35 from "../../assets/digital-campus/35.guide-utilisation.png";
import imgGuide36 from "../../assets/digital-campus/36.guide-utilisation.png";
import imgGuide37 from "../../assets/digital-campus/37.guide-utilisation.png";
import imgGuide38 from "../../assets/digital-campus/38.guide-utilisation.png";
import imgGuide39 from "../../assets/digital-campus/39.guide-utilisation.png";

// Print — Guide de l'admis
import imgAdmis40 from "../../assets/digital-campus/40.guide-de-l-admis.png";
import imgAdmis41 from "../../assets/digital-campus/41.guide-de-l-admis.png";
import imgAdmis42 from "../../assets/digital-campus/42.guide-de-l-admis.png";
import imgAdmis43 from "../../assets/digital-campus/43.guide-de-l-admis.png";
import imgAdmis44 from "../../assets/digital-campus/44.guide-de-l-admis.png";
import imgAdmis45 from "../../assets/digital-campus/45.guide-de-l-admis.png";
import imgAdmis46 from "../../assets/digital-campus/46.guide-de-l-admis.png";
import imgAdmis47 from "../../assets/digital-campus/47.guide-de-l-admis.png";

// Print — Plaquette FC
import imgFC48 from "../../assets/digital-campus/48.plaquette-fc.png";
import imgFC49 from "../../assets/digital-campus/49.plaquette-fc.png";
import imgFC50 from "../../assets/digital-campus/50.plaquette-fc.png";
import imgFC51 from "../../assets/digital-campus/51.plaquette-fc.png";
import imgFC52 from "../../assets/digital-campus/52.plaquette-fc.png";
import imgFC53 from "../../assets/digital-campus/53.plaquette-fc.png";
import imgFC54 from "../../assets/digital-campus/54.plaquette-fc.png";
import imgFC55 from "../../assets/digital-campus/55.plaquette-fc.png";
import imgFC56 from "../../assets/digital-campus/56.plaquette-fc.png";
import imgFC57 from "../../assets/digital-campus/57.plaquette-fc.png";
import imgFC58 from "../../assets/digital-campus/58.plaquette-fc.png";
import imgFC59 from "../../assets/digital-campus/59.plaquette-fc.png";
import imgFC60 from "../../assets/digital-campus/60.plaquette-fc.png";
import imgFC61 from "../../assets/digital-campus/61.plaquette-fc.png";
import imgFC62 from "../../assets/digital-campus/62.plaquette-fc.png";
import imgFC63 from "../../assets/digital-campus/63.plaquette-fc.png";
import imgFC64 from "../../assets/digital-campus/64.plaquette-fc.png";
import imgFC65 from "../../assets/digital-campus/65.plaquette-fc.png";
import imgFC66 from "../../assets/digital-campus/66.plaquette-fc.png";
import imgFC67 from "../../assets/digital-campus/67.plaquette-fc.png";
import imgFC68 from "../../assets/digital-campus/68.plaquette-fc.png";
import imgFC69 from "../../assets/digital-campus/69.plaquette-fc.png";
import imgFC70 from "../../assets/digital-campus/70.plaquette-fc.png";
import imgFC71 from "../../assets/digital-campus/71.plaquette-fc.png";
import imgFC72 from "../../assets/digital-campus/72.plaquette-fc.png";
import imgFC73 from "../../assets/digital-campus/73.plaquette-fc.png";
import imgFC74 from "../../assets/digital-campus/74.plaquette-fc.png";
import imgFC75 from "../../assets/digital-campus/75.plaquette-fc.png";
import imgFC76 from "../../assets/digital-campus/76.plaquette-fc.png";

// Print — Plaquette formations
import imgPlaq77 from "../../assets/digital-campus/77.plaquette-formation.png";
import imgPlaq78 from "../../assets/digital-campus/78.plaquette-formation.png";
import imgPlaq79 from "../../assets/digital-campus/79.plaquette-formation.png";
import imgPlaq80 from "../../assets/digital-campus/80.plaquette-formation.png";
import imgPlaq81 from "../../assets/digital-campus/81.plaquette-formation.png";
import imgPlaq82 from "../../assets/digital-campus/82.plaquette-formation.png";
import imgPlaq83 from "../../assets/digital-campus/83.plaquette-formation.png";
import imgPlaq84 from "../../assets/digital-campus/84.plaquette-formation.png";

// Print — Livret préparer sa recherche
import imgLiv85 from "../../assets/digital-campus/85.livret-preparer-sa-recherche.png";
import imgLiv86 from "../../assets/digital-campus/86.livret-preparer-sa-recherche.png";
import imgLiv87 from "../../assets/digital-campus/87.livret-preparer-sa-recherche.png";
import imgLiv88 from "../../assets/digital-campus/88.livret-preparer-sa-recherche.png";
import imgLiv89 from "../../assets/digital-campus/89.livret-preparer-sa-recherche.png";
import imgLiv90 from "../../assets/digital-campus/90.livret-preparer-sa-recherche.png";
import imgLiv91 from "../../assets/digital-campus/91.livret-preparer-sa-recherche.png";
import imgLiv92 from "../../assets/digital-campus/92.livret-preparer-sa-recherche.png";
import imgLiv93 from "../../assets/digital-campus/93.livret-preparer-sa-recherche.png";
import imgLiv94 from "../../assets/digital-campus/94.livret-preparer-sa-recherche.png";
import imgLiv95 from "../../assets/digital-campus/95.livret-preparer-sa-recherche.png";
import imgLiv96 from "../../assets/digital-campus/96.livret-preparer-sa-recherche.png";
import imgLiv97 from "../../assets/digital-campus/97.livret-preparer-sa-recherche.png";
import imgLiv98 from "../../assets/digital-campus/98.livret-preparer-sa-recherche.png";
import imgLiv99 from "../../assets/digital-campus/99.livret-preparer-sa-recherche.png";
import imgLiv100 from "../../assets/digital-campus/100.livret-preparer-sa-recherche.png";
import imgLiv101 from "../../assets/digital-campus/101.livret-preparer-sa-recherche.png";
import imgLiv102 from "../../assets/digital-campus/102.livret-preparer-sa-recherche.png";
import imgLiv103 from "../../assets/digital-campus/103.livret-preparer-sa-recherche.png";
import imgLiv104 from "../../assets/digital-campus/104.livret-preparer-sa-recherche.png";
import imgLiv105 from "../../assets/digital-campus/105.livret-preparer-sa-recherche.png";
import imgLiv106 from "../../assets/digital-campus/106.livret-preparer-sa-recherche.png";

/* ── Constants ── */
const ACCENT = "#0092BD";
const ACCENT_RGB = "0,146,189";
const SECONDARY = "#A34A6A";
const SECONDARY_RGB = "248,124,86";



/* ── Horizontal scroll row with arrows ── */
function ScrollRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { r, isDark } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  const updateButtons = useCallback(() => {
    const node = scrollRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!node) return;
    if (left) left.style.opacity = node.scrollLeft > 10 ? "1" : "0";
    if (right) right.style.opacity = node.scrollLeft < node.scrollWidth - node.clientWidth - 10 ? "1" : "0";
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateButtons();
      });
    };
    node.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      node.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [updateButtons]);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className={`relative group ${className}`}>
      <div ref={scrollRef} data-scroll-container={className} className="relative flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
        {children}
      </div>
      {/* Left arrow */}
      <button ref={leftRef} data-scroll-left onClick={() => scroll(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0" style={{ background: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)", border: `1px solid ${r(0.1)}`, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <ChevronLeft size={16} style={{ color: r(0.6) }} />
      </button>
      {/* Right arrow */}
      <button ref={rightRef} data-scroll-right onClick={() => scroll(1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0" style={{ background: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)", border: `1px solid ${r(0.1)}`, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <ChevronRight size={16} style={{ color: r(0.6) }} />
      </button>
      {/* Scroll hint */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        <ChevronLeft size={10} style={{ color: r(0.15) }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: r(0.15) }}>scroll</span>
        <ChevronRight size={10} style={{ color: r(0.15) }} />
      </div>
    </div>
  );
}

/* ── Print flipbook data ── */
const PRINT_DOCS = [
  { label: "Guide d'utilisation", labelEn: "Usage Guide", pages: [imgGuide34, imgGuide35, imgGuide36, imgGuide37, imgGuide38, imgGuide39] },
  { label: "Guide de l'admis", labelEn: "Admission Guide", pages: [imgAdmis40, imgAdmis41, imgAdmis42, imgAdmis43, imgAdmis44, imgAdmis45, imgAdmis46, imgAdmis47] },
  {
    label: "Plaquette FC",
    labelEn: "FC Brochure",
    pages: [
      imgFC48,
      imgFC49,
      imgFC50,
      imgFC51,
      imgFC52,
      imgFC53,
      imgFC54,
      imgFC55,
      imgFC56,
      imgFC57,
      imgFC58,
      imgFC59,
      imgFC60,
      imgFC61,
      imgFC62,
      imgFC63,
      imgFC64,
      imgFC65,
      imgFC66,
      imgFC67,
      imgFC68,
      imgFC69,
      imgFC70,
      imgFC71,
      imgFC72,
      imgFC73,
      imgFC74,
      imgFC75,
      imgFC76,
    ],
  },
  { label: "Plaquette formations", labelEn: "Training Brochure", pages: [imgPlaq77, imgPlaq78, imgPlaq79, imgPlaq80, imgPlaq81, imgPlaq82, imgPlaq83, imgPlaq84] },
  {
    label: "Livret recherche",
    labelEn: "Job Search Booklet",
    pages: [
      imgLiv85,
      imgLiv86,
      imgLiv87,
      imgLiv88,
      imgLiv89,
      imgLiv90,
      imgLiv91,
      imgLiv92,
      imgLiv93,
      imgLiv94,
      imgLiv95,
      imgLiv96,
      imgLiv97,
      imgLiv98,
      imgLiv99,
      imgLiv100,
      imgLiv101,
      imgLiv102,
      imgLiv103,
      imgLiv104,
      imgLiv105,
      imgLiv106,
    ],
  },
];

/* ── Helpers ── */
function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span className="section-eyebrow uppercase tracking-[0.3em] block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25) }}>
      {children}
    </span>
  );
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "160px 0px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

function ImgCard({ src, alt, aspect = "auto", className = "" }: { src: string; alt: string; aspect?: string; className?: string }) {
  const { r, isDark } = useTheme();
  return (
    <div className={`relative rounded-xl overflow-hidden group ${className}`} style={{ border: `1px solid ${r(0.06)}`, aspectRatio: aspect }}>
      <ImageWithFallback src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: isDark ? "inset 0 0 60px rgba(0,0,0,0.2)" : "inset 0 0 60px rgba(0,0,0,0.03)" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   FLIPBOOK CSS 3D — PRINT DOCUMENTS
   ═══════════════════════════════════════════ */
function PrintFlipbook() {
  const { t, lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const [activeDoc, setActiveDoc] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [pendingPage, setPendingPage] = useState(0);

  const pages = PRINT_DOCS[activeDoc].pages;
  const totalPages = pages.length;

  const selectDoc = (idx: number) => {
    if (idx === activeDoc) return;
    setActiveDoc(idx);
    setCurrentPage(0);
    setPendingPage(0);
    setIsFlipping(false);
  };

  const flipTo = useCallback((dir: "next" | "prev") => {
    if (isFlipping) return;
    const target = dir === "next" ? currentPage + 1 : currentPage - 1;
    if (target < 0 || target >= totalPages) return;
    setFlipDirection(dir);
    setPendingPage(target);
    setIsFlipping(true);
  }, [isFlipping, currentPage, totalPages]);

  const onFlipComplete = useCallback(() => {
    setCurrentPage(pendingPage);
    setIsFlipping(false);
  }, [pendingPage]);

  /*
   * Direction-aware static pages:
   *   next → overlay covers RIGHT at start, LEFT at end
   *     static left  = OLD left (visible at start)
   *     static right = NEW right (hidden at start by overlay front)
   *   prev → overlay covers LEFT at start, RIGHT at end
   *     static left  = NEW left (hidden at start by overlay front)
   *     static right = OLD right (visible at start)
   */
  let destLeft: string;
  let destRight: string | null;
  let flipFront: string;
  let flipBack: string;

  if (!isFlipping) {
    destLeft = pages[currentPage];
    destRight = pages[currentPage + 1] ?? null;
    flipFront = pages[currentPage];
    flipBack = pages[currentPage];
  } else if (flipDirection === "next") {
    destLeft = pages[currentPage];
    destRight = pages[pendingPage + 1] ?? null;
    flipFront = pages[currentPage + 1] ?? pages[currentPage];
    flipBack = pages[pendingPage];
  } else {
    destLeft = pages[pendingPage];
    destRight = pages[currentPage + 1] ?? null;
    flipFront = pages[currentPage];
    flipBack = pages[pendingPage + 1] ?? pages[pendingPage];
  }

  return (
    <FadeIn>
      <SectionLabel>{lang === "fr" ? "Supports éditoriaux" : "Editorial Materials"}</SectionLabel>
      <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
        {t("dc.print.label" as TranslationKey)}
      </h2>
      <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
        {t("dc.print.text" as TranslationKey)}
      </p>

      {/* Document selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PRINT_DOCS.map((doc, i) => (
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
            {lang === "fr" ? doc.label : doc.labelEn}
            {doc.note && <span className="px-1.5 py-0.5 rounded" style={{ fontSize: "0.55rem", background: `rgba(${SECONDARY_RGB},0.12)`, color: SECONDARY }}>{doc.note}</span>}
            <span className="px-1.5 py-0.5 rounded" style={{ fontSize: "0.55rem", background: r(0.05), color: r(0.25) }}>
              {doc.pages.length} p.
            </span>
          </button>
        ))}
      </div>

      {/* Book */}
      <div className="flex flex-col items-center">
        {/* Single-page cover/back-cover vs spread */}
        {(() => {
          const isCover = currentPage === 0 && !isFlipping;
          const isBackCover = currentPage === totalPages - 1 && !isFlipping;
          const isSingle = isCover || isBackCover;

          if (isSingle) {
            return (
              <div className="relative mx-auto" style={{ width: "clamp(200px, 30vw, 380px)", aspectRatio: "7/10" }}>
                <div className="w-full h-full rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.06)}`, boxShadow: isDark ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(0,0,0,0.1)" }}>
                  <ImageWithFallback src={pages[currentPage]} alt={isCover ? "Couverture" : "Quatrième de couverture"} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="px-3 py-1 rounded-full backdrop-blur-md" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)", color: r(0.35), border: `1px solid ${r(0.06)}` }}>
                    {isCover ? (lang === "fr" ? "Couverture" : "Cover") : (lang === "fr" ? "4e de couverture" : "Back Cover")}
                  </span>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-5 rounded-full pointer-events-none" style={{ background: isDark ? "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%)", filter: "blur(6px)" }} />
              </div>
            );
          }

          return (
            <div className="relative mx-auto" style={{ perspective: 1800, width: "clamp(300px, 55vw, 700px)", aspectRatio: "7/5" }}>
              <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                {/* Left page */}
                <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden rounded-l-lg" style={{ border: `1px solid ${r(0.06)}`, borderRight: "none", boxShadow: isDark ? "inset -8px 0 20px rgba(0,0,0,0.3)" : "inset -8px 0 20px rgba(0,0,0,0.06)" }}>
                  <ImageWithFallback src={destLeft} alt="Left page" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-4">
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)" }}>
                      {String((isFlipping && flipDirection === "prev" ? pendingPage : currentPage) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Right page */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-r-lg" style={{ border: `1px solid ${r(0.06)}`, borderLeft: "none", boxShadow: isDark ? "inset 8px 0 20px rgba(0,0,0,0.3)" : "inset 8px 0 20px rgba(0,0,0,0.06)" }}>
                  {destRight ? (
                    <ImageWithFallback src={destRight} alt="Right page" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: isDark ? "rgba(30,30,30,0.8)" : "rgba(245,245,245,0.9)" }}>
                      <div className="text-center">
                        <BookOpen size={24} style={{ color: r(0.12), margin: "0 auto 8px" }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.15) }}>Fin</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Flipping overlay */}
                {isFlipping && (
                  <motion.div
                    key={`flip-${activeDoc}-${pendingPage}-${flipDirection}`}
                    className="absolute top-0 w-1/2 h-full"
                    style={{ transformStyle: "preserve-3d", transformOrigin: flipDirection === "next" ? "left center" : "right center", left: flipDirection === "next" ? "50%" : 0, zIndex: 10 }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: flipDirection === "next" ? -180 : 180 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    onAnimationComplete={onFlipComplete}
                  >
                    <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden", borderRadius: flipDirection === "next" ? "0 8px 8px 0" : "8px 0 0 8px", boxShadow: `0 0 40px rgba(0,0,0,${isDark ? 0.5 : 0.2})` }}>
                      <ImageWithFallback src={flipFront} alt="Flip front" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: flipDirection === "next" ? "8px 0 0 8px" : "0 8px 8px 0", boxShadow: `0 0 40px rgba(0,0,0,${isDark ? 0.5 : 0.2})` }}>
                      <ImageWithFallback src={flipBack} alt="Flip back" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                )}

                {/* Center binding */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full z-20 pointer-events-none" style={{ background: `linear-gradient(180deg, ${r(0.02)}, ${r(0.1)}, ${r(0.02)})`, boxShadow: `-3px 0 8px rgba(0,0,0,${isDark ? 0.15 : 0.04}), 3px 0 8px rgba(0,0,0,${isDark ? 0.15 : 0.04})` }} />

                {/* Click zones */}
                <button onClick={() => flipTo("prev")} disabled={currentPage === 0 || isFlipping} className="absolute top-0 left-0 w-1/2 h-full z-30 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ cursor: currentPage > 0 && !isFlipping ? "pointer" : "default" }}>
                  <div className="absolute inset-0 flex items-center justify-start pl-4">
                    {currentPage > 0 && !isFlipping && <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)", border: `1px solid ${r(0.1)}` }}><ChevronLeft size={16} style={{ color: r(0.5) }} /></div>}
                  </div>
                </button>
                <button onClick={() => flipTo("next")} disabled={currentPage >= totalPages - 1 || isFlipping} className="absolute top-0 right-0 w-1/2 h-full z-30 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ cursor: currentPage < totalPages - 1 && !isFlipping ? "pointer" : "default" }}>
                  <div className="absolute inset-0 flex items-center justify-end pr-4">
                    {currentPage < totalPages - 1 && !isFlipping && <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)", border: `1px solid ${r(0.1)}` }}><ChevronRight size={16} style={{ color: r(0.5) }} /></div>}
                  </div>
                </button>
              </div>
              {/* Book shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-6 rounded-full pointer-events-none" style={{ background: isDark ? "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%)", filter: "blur(8px)" }} />
            </div>
          );
        })()}

        {/* Controls */}
        <div className="flex items-center gap-6 mt-10">
          <button onClick={() => flipTo("prev")} disabled={currentPage === 0 || isFlipping} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: `1px solid ${currentPage > 0 ? r(0.15) : r(0.05)}`, color: currentPage > 0 ? r(0.5) : r(0.1) }}>
            <ArrowLeft size={16} />
          </button>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: r(0.3) }}>
            {currentPage + 1} / {totalPages}
          </span>
          <button onClick={() => flipTo("next")} disabled={currentPage >= totalPages - 1 || isFlipping} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: `1px solid ${currentPage < totalPages - 1 ? r(0.15) : r(0.05)}`, color: currentPage < totalPages - 1 ? r(0.5) : r(0.1) }}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   DC SHAPE SVG COMPONENT
   ═══════════════════════════════════════════ */
function DcShape({ path, fill, size = 80 }: { path: string; fill: string; size?: number }) {
  const viewBox = path === svgPaths.p24af9400 ? "0 0 412 412" : "0 0 462 462";
  return (
    <svg viewBox={viewBox} fill="none" style={{ width: size, height: size }}>
      <path d={path} fill={fill} />
    </svg>
  );
}

function DigitalCampusLogo({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1500 605.27" fill="none" aria-label="Digital Campus" className="w-full h-auto">
      <path d={logoSvgPaths.p10bc1a00} fill={fill} />
    </svg>
  );
}

function DigitalCampusLogoImage({ isDark, className = "" }: { isDark: boolean; className?: string }) {
  return (
    <ImageWithFallback
      src={imgLogoDcBlack}
      alt="Digital Campus"
      className={className}
      style={{ filter: isDark ? "invert(1)" : undefined }}
    />
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export function ProjectDc() {
  const { t, lang } = useI18n();
  const { p, r, isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* ─── HERO ─── */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0 pointer-events-none" style={{ background: isDark ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.06) 0%, transparent 70%)` : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${ACCENT_RGB},0.1) 0%, transparent 70%)` }} />

        <motion.div className="relative z-10 flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="mb-10 flex items-center gap-4">
            <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: r(0.3) }}>
              {t("dc.hero.label" as TranslationKey)} — {t("dc.hero.year" as TranslationKey)}
            </span>
            <div className="w-8 h-[1px]" style={{ background: r(0.1) }} />
          </motion.div>

          {/* DC Logo */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="w-[200px] md:w-[280px] mb-8">
            <DigitalCampusLogoImage isDark={isDark} className="w-full h-auto" />
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="mt-4 text-center max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35) }}>
            {t("dc.intro.subtitle" as TranslationKey)}
          </motion.p>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-28 pb-28">
        {/* Back button */}
        <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onClick={() => navigate("/projects")} className="flex items-center gap-2 group" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.3) }}>
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          {t("dc.back" as TranslationKey)}
        </motion.button>

        {/* ─── INTRODUCTION ─── */}
        <FadeIn>
          <SectionLabel>{t("dc.intro.tag" as TranslationKey)}</SectionLabel>
          <p className="mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.8, color: r(0.4), maxWidth: 700 }}>
            {t("dc.intro.desc" as TranslationKey)}
          </p>
        </FadeIn>

        {/* ─── PROJECT DETAILS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {(["dc.context", "dc.particular", "dc.challenge", "dc.approach"] as const).map((key, i) => (
            <FadeIn key={key} delay={i * 0.1}>
              <h3 className="mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: p.text }}>{t(`${key}.label` as TranslationKey)}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.75, color: r(0.35) }}>{t(`${key}.text` as TranslationKey)}</p>
            </FadeIn>
          ))}
        </div>

        {/* ─── SYSTÈME VISUEL ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Identité graphique" : "Graphic Identity"}</SectionLabel>
          <h2 className="mt-3 mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.system.label" as TranslationKey)}
          </h2>

          {/* Logos — 4 types × 3 couleurs via SVG */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Logotype" : "Logotype"}
            </span>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
              {lang === "fr"
                ? "Le logotype se compose d'un monogramme DC et d'un titre Digital Campus. Il existe sous quatre déclinaisons : logo complet, logo complet responsive, logo mono et logo responsive."
                : "The logotype consists of a DC monogram and the Digital Campus title. It comes in four variants: complete logo, responsive complete logo, mono logo, and responsive logo."}
            </p>
          </div>
          {/* Logo complet — full size */}
          {[
            { label: lang === "fr" ? "Logo complet" : "Complete Logo", path: logoSvgPaths.p10bc1a00, vb: "0 0 1500 605.27", maxH: 60, square: false },
            { label: lang === "fr" ? "Logo complet responsive" : "Responsive Complete Logo", path: logoSvgPaths.p1f430f00, vb: "0 0 1500 1500", maxH: 72, square: true },
          ].map((variant, vi) => (
            <div key={vi} className="mb-8">
              <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.25), textTransform: "uppercase", letterSpacing: "0.15em" }}>{variant.label}</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { fill: ACCENT, bg: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5" },
                  { fill: isDark ? "#fff" : "#000", bg: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5" },
                  { fill: isDark ? "#000" : "#fff", bg: isDark ? "rgba(40,40,40,0.6)" : "#1a1a1a" },
                ].map((c, ci) => (
                  <div key={ci} className={`rounded-xl flex items-center justify-center ${variant.square ? "p-3 md:p-4" : "p-6 md:p-8"}`} style={{ background: c.bg, border: `1px solid ${r(0.06)}`, aspectRatio: variant.square ? "1/1" : undefined, minHeight: variant.square ? undefined : 80, maxWidth: variant.square ? 150 : undefined }}>
                    <svg viewBox={variant.vb} fill="none" className="w-full h-auto" style={{ maxHeight: variant.maxH }}>
                      <path d={variant.path} fill={c.fill} />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Logo mono + responsive — smaller, below */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[
              { label: lang === "fr" ? "Logo mono" : "Mono Logo", path: logoSvgPaths.p3fff4b00, vb: "0 0 1500 1500", maxH: 56 },
              { label: lang === "fr" ? "Logo responsive" : "Responsive Logo", path: logoSvgPaths.p39a18800, vb: "0 0 566.35 1500", maxH: 56 },
            ].map((variant, vi) => (
              <div key={vi}>
                <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.25), textTransform: "uppercase", letterSpacing: "0.15em" }}>{variant.label}</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { fill: ACCENT, bg: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5" },
                    { fill: isDark ? "#fff" : "#000", bg: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5" },
                    { fill: isDark ? "#000" : "#fff", bg: isDark ? "rgba(40,40,40,0.6)" : "#1a1a1a" },
                  ].map((c, ci) => (
                    <div key={ci} className="rounded-lg p-4 flex items-center justify-center" style={{ background: c.bg, border: `1px solid ${r(0.06)}`, aspectRatio: "1/1" }}>
                      <svg viewBox={variant.vb} fill="none" className="h-auto" style={{ maxHeight: variant.maxH, maxWidth: vi === 1 ? 24 : undefined, width: vi === 1 ? "auto" : "100%" }}>
                        <path d={variant.path} fill={c.fill} />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Colors */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Palette chromatique" : "Color Palette"}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { hex: "#0092BD", name: lang === "fr" ? "Bleu principal" : "Primary Blue", cmyk: "C87 M26 J14 N0", pantone: "PANTONE 2183 C", rgb: "R0 V146 B189" },
              { hex: "#A34A6A", name: lang === "fr" ? "Bordeaux secondaire" : "Secondary Bordeaux", cmyk: "C0 M55 J35 N36", pantone: "PANTONE 205 C", rgb: "R163 V74 B106" },
              { hex: "#000000", name: "Noir", cmyk: "C30 M30 J30 N100", pantone: "", rgb: "R0 V0 B0" },
              { hex: "#EBEBEB", name: "Gris", cmyk: "C8 M8 J8 N0", pantone: "", rgb: "R235 V235 B235" },
            ].map((c) => (
              <div key={c.hex} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${r(0.06)}` }}>
                <div className="h-20 md:h-24" style={{ background: c.hex }} />
                <div className="p-3" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: p.text, display: "block" }}>{c.name}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.3), display: "block", marginTop: 2 }}>{c.hex}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.2), display: "block" }}>{c.rgb}</span>
                  {c.pantone && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.2), display: "block" }}>{c.pantone}</span>}
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.2), display: "block" }}>{c.cmyk}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mire — Shape graphique principale */}
          <div className="mb-16">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Forme graphique — Mire" : "Graphic Shape — Mire"}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { fill: "#fff", label: "Blanc", bg: isDark ? "rgba(40,40,40,0.6)" : "#2a2a2a" },
                { fill: ACCENT, label: "Bleu", bg: isDark ? "rgba(0,146,189,0.08)" : "rgba(0,146,189,0.05)" },
                { fill: "#000", label: "Noir", bg: isDark ? "rgba(255,255,255,0.04)" : "#f5f5f5" },
                { fill: SECONDARY, label: "Orange", bg: isDark ? "rgba(248,124,86,0.08)" : "rgba(248,124,86,0.05)" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-8 flex flex-col items-center gap-3" style={{ background: s.bg, border: `1px solid ${r(0.06)}` }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + i * 4, repeat: Infinity, ease: "linear" }}
                  >
                    <DcShape path={svgPaths.p2ea25000} fill={s.fill} size={80} />
                  </motion.div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.3) }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grille — Élément graphique complémentaire */}
          <div className="mb-16">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Élément graphique — Grille" : "Graphic Element — Grid"}
            </span>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
              {lang === "fr"
                ? "La grille est l'élément graphique complémentaire au logotype. Elle a pour but de le renforcer et de le soutenir, permettant son utilisation sur de nombreux supports pour créer des effets cinétiques et de superposition."
                : "The grid is the complementary graphic element to the logotype. It reinforces and supports it, enabling its use on numerous materials to create kinetic and overlay effects."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { fill: "#fff", label: "Blanc", bg: isDark ? "rgba(40,40,40,0.6)" : "#2a2a2a" },
                { fill: ACCENT, label: "Bleu", bg: isDark ? "rgba(0,146,189,0.08)" : "rgba(0,146,189,0.05)" },
                { fill: "#000", label: "Noir", bg: isDark ? "rgba(255,255,255,0.04)" : "#f5f5f5" },
                { fill: SECONDARY, label: "Orange", bg: isDark ? "rgba(248,124,86,0.08)" : "rgba(248,124,86,0.05)" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-8 flex flex-col items-center gap-3" style={{ background: s.bg, border: `1px solid ${r(0.06)}` }}>
                  <DcShape path={svgPaths.p24af9400} fill={s.fill} size={70} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.3) }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography — expanded like KH */}
          <div>
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Typographie" : "Typography"}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Font name + description */}
              <FadeIn delay={0.08}>
                <div className="rounded-xl p-8 md:p-10 flex flex-col gap-4 h-full" style={{ background: isDark ? `linear-gradient(160deg, rgba(${ACCENT_RGB},0.06) 0%, rgba(0,0,0,0.4) 100%)` : `linear-gradient(160deg, rgba(${ACCENT_RGB},0.04) 0%, #fafafa 100%)`, border: `1px solid ${r(0.06)}` }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: p.text, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
                    Circular<br />Std
                  </p>
                  <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", lineHeight: 1.8, color: r(0.4) }}>
                    {lang === "fr"
                      ? "La typographie utilisée est la Circular Std, déclinée en deux graisses : Book et Heavy. La Heavy est principalement utilisée pour les titres, les chapeaux, les intertitres et les éléments mis en avant. La Book est réservée aux textes courants et permet de créer du contraste avec les éléments en Heavy."
                      : "The typeface used is Circular Std, in two weights: Book and Heavy. Heavy is primarily used for headings, introductions, subheadings, and highlighted elements. Book is reserved for body text, creating contrast with Heavy elements."}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}>Book</span>
                    <span className="px-3 py-1 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, background: `rgba(${ACCENT_RGB},0.1)`, color: ACCENT }}>Heavy</span>
                  </div>
                </div>
              </FadeIn>

              {/* Alphabet specimen */}
              <FadeIn delay={0.14}>
                <div className="rounded-xl p-8 md:p-10 flex flex-col justify-between h-full" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", border: `1px solid ${r(0.06)}` }}>
                  <div>
                    <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25), textTransform: "uppercase", letterSpacing: "0.15em" }}>Heavy</span>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.4rem)", fontWeight: 700, color: p.text, lineHeight: 1.3 }}>
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                    </p>
                  </div>
                  <div className="w-full h-[1px] my-5" style={{ background: r(0.06) }} />
                  <div>
                    <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25), textTransform: "uppercase", letterSpacing: "0.15em" }}>Book</span>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.8rem, 1.8vw, 1.2rem)", fontWeight: 400, color: r(0.4), lineHeight: 1.3 }}>
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                    </p>
                  </div>
                  <div className="w-full h-[1px] my-5" style={{ background: r(0.06) }} />
                  <div>
                    <span className="block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25), textTransform: "uppercase", letterSpacing: "0.15em" }}>
                      {lang === "fr" ? "Chiffres" : "Numerals"}
                    </span>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.6rem)", fontWeight: 700, color: p.text, lineHeight: 1.2, letterSpacing: "0.05em" }}>
                      0 1 2 3 4 5 6 7 8 9
                    </p>
                  </div>
                  <p className="mt-5" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}>
                    {lang === "fr" ? "L'approche reste à zéro par défaut et peut être augmentée de 10 ou 20 pts selon les besoins." : "Tracking stays at zero by default and can be increased by 10 or 20 pts as needed."}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeIn>

        {/* ─── SIGNALÉTIQUE ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Orientation & espace" : "Wayfinding & Space"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.signage.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {t("dc.signage.text" as TranslationKey)}
          </p>

          {/* Entrance signage */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Signalétique d'entrée" : "Entrance Signage"}
            </span>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
              {lang === "fr"
                ? "Signalétique présente à l'entrée de chaque étage de l'école, indiquant le nom des salles et des bureaux de l'étage concerné."
                : "Signage at the entrance of each floor, indicating the names of rooms and offices on that floor."}
            </p>
          </div>
          <ScrollRow className="mb-10 scroll-signage">
            {[imgSign1, imgSign2, imgSign3, imgSign4, imgSign5].map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(220px, 28vw, 320px)" }}>
                <ImgCard src={img} alt={`Signalétique entrée ${i + 1}`} aspect="4/3" />
              </div>
            ))}
          </ScrollRow>

          {/* Floor plans — same template per floor → FrameSlider */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Plans d'étage" : "Floor Plans"}
            </span>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
              {lang === "fr"
                ? "Plan de chaque étage affiché au sein de l'école pour faciliter l'orientation des élèves et du personnel."
                : "Floor plan displayed on each level to help students and staff navigate the school."}
            </p>
          </div>
          <ScrollRow className="mb-10 scroll-plans">
            {[imgSng1, imgSng0, imgSngA, imgSng2, imgSng3, imgSng4, imgSng5].map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(220px, 28vw, 320px)" }}>
                <ImgCard src={img} alt={`Plan étage ${i}`} aspect="4/3" />
              </div>
            ))}
          </ScrollRow>

          {/* Elevator signage */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Signalétique ascenseur" : "Elevator Signage"}
            </span>
            <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
              {lang === "fr"
                ? "Panneau de l'ascenseur récapitulant les services et espaces disponibles à chaque étage du bâtiment."
                : "Elevator panel summarizing the services and spaces available on each floor of the building."}
            </p>
          </div>
          <div className="max-w-lg">
            <ImgCard src={imgElevator} alt="Signalétique ascenseur" aspect="4/3" />
          </div>
        </FadeIn>

        {/* ─── CARTES ÉTUDIANTES ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Identité étudiante" : "Student Identity"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.cards.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Redesign des cartes étudiantes dans le respect de la charte graphique de l'école, déclinées selon les différents profils."
              : "Student cards redesigned within the school's brand guidelines, adapted for different student profiles."}
          </p>
        </FadeIn>
        <FadeIn>
          <div className="-mx-6 md:-mx-12 lg:-mx-20">
            <ImageWithFallback src={imgCartes} alt="Cartes étudiantes" loading="lazy" className="w-full h-auto block" />
            <div className="w-full" style={{ height: 1, background: r(0.08) }} />
          </div>
        </FadeIn>

        {/* ─── VISUELS ÉCRANS ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Communication interne" : "Internal Communication"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.screens.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Visuels conçus sur mesure pour les écrans internes de l'école, servant à relayer les informations importantes et les événements auprès des élèves."
              : "Custom visuals designed for the school's internal screens, relaying important information and events to students."}
          </p>
          <ScrollRow className="scroll-screens">
            {[imgScreen1, imgScreen2, imgScreen3].map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(280px, 40vw, 450px)" }}>
                <ImgCard src={img} alt={`Écran ${i + 1}`} aspect="3/2" />
              </div>
            ))}
          </ScrollRow>
        </FadeIn>

        {/* ─── AFFICHES ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Événementiel" : "Events"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.posters.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Affiches événementielles déclinées pour les différents temps forts de l'école : journées portes ouvertes, conférences, ateliers et événements étudiants."
              : "Event posters adapted for the school's key moments: open days, conferences, workshops, and student events."}
          </p>
          <ImgCard src={imgAffiches} alt="Affiches" aspect="16/10" />
        </FadeIn>

        {/* ─── COMMUNICATION DIGITALE ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Digital & réseaux" : "Digital & Social"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.digital.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Bannières web et signatures mail conçues pour relayer les événements de l'école auprès d'un maximum de personnes, accompagnées de campagnes pour les réseaux sociaux et de posts à destination des élèves."
              : "Web banners and email signatures designed to broadcast school events to the widest audience, alongside social media campaigns and student-facing posts."}
          </p>

          {/* Banners */}
          <div className="space-y-4 mb-6">
            <ImgCard src={imgBanniere} alt="Bannière JPO" aspect="16/5" />
            <ImgCard src={imgDcTalk} alt="DC Talk" aspect="16/5" />
          </div>

          {/* Social media */}
          <div className="grid grid-cols-2 gap-4">
            <ImgCard src={imgCampagne} alt="Campagne réseaux sociaux" aspect="1/1" />
            <ImgCard src={imgPost} alt="Post à destination des élèves" aspect="1/1" />
          </div>
        </FadeIn>

        {/* ─── PARCOURS & TIMELINE ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Pédagogie & parcours" : "Education & Pathways"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.studies.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Schéma d'étude retravaillé pour faciliter la compréhension des parcours proposés, accompagné de timelines annuelles réalisées pour chaque filière de l'école, offrant aux élèves une vue d'ensemble de ce qui les attend."
              : "Reworked study diagram for clearer understanding of available programs, alongside annual timelines created for each school track, giving students an overview of what lies ahead."}
          </p>
          <div className="space-y-4">
            <ImgCard src={imgParcours} alt="Parcours d'études" aspect="16/9" />
            <ImgCard src={imgTimeline} alt="Timeline" aspect="16/8" />
          </div>
        </FadeIn>

        {/* ─── PACK SALONS ─── */}
        <FadeIn>
          <SectionLabel>{lang === "fr" ? "Événementiel & salons" : "Events & Fairs"}</SectionLabel>
          <h2 className="mt-3 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.03em", color: p.text }}>
            {t("dc.fair.label" as TranslationKey)}
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.35), maxWidth: 600 }}>
            {lang === "fr"
              ? "Ensemble de supports visuels conçus pour les salons de l'étudiant : kakémonos déclinés par filière, flyers d'information et éléments de présentation pour le stand."
              : "Set of visual materials designed for student fairs: kakemonos adapted per program, information flyers, and booth presentation elements."}
          </p>

          {/* Kakemonos — same template, different content → FrameSlider */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Kakémonos" : "Kakemonos"}
            </span>
          </div>
          <ScrollRow className="mb-8 scroll-kakemonos">
            {[imgKakemono01, imgKakemono02, imgKakemono03, imgKakemono04, imgKakemono05].map((img, i) => (
              <div key={i} className="flex-none snap-start" style={{ width: "clamp(140px, 18vw, 200px)" }}>
                <ImgCard src={img} alt={`Kakemono ${i + 1}`} aspect="3/4" />
              </div>
            ))}
          </ScrollRow>

          {/* Stand photos */}
          <div className="mb-4">
            <span className="block mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {lang === "fr" ? "Galerie du stand" : "Booth Gallery"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <ImgCard src={imgStand1} alt="Stand salon 1" aspect="4/3" />
            <ImgCard src={imgStand2} alt="Stand salon 2" aspect="4/3" />
            <ImgCard src={imgStand3} alt="Stand salon 3" aspect="4/3" />
          </div>
        </FadeIn>

        {/* ─── DOCUMENTS PRINT (FLIPBOOK) ─── */}
        <PrintFlipbook />

        {/* ─── CLOSING ─── */}
        <FadeIn className="text-center py-16">
          <div className="w-16 h-[1px] mx-auto mb-8" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
          <DigitalCampusLogoImage isDark={isDark} className="w-32 h-auto mx-auto mb-6 opacity-20" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.25), maxWidth: 500, margin: "0 auto" }}>
            {lang === "fr"
              ? "Digital Campus — une sélection de réalisations conçues dans le cadre de mon poste de chargée de communication et graphiste."
              : "Digital Campus — a selection of works created during my role as communication officer and graphic designer."}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
