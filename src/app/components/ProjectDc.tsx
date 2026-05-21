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

// Logos
import imgLogoNoir from "figma:asset/5c90a72b6b6a65866efbceb3835fae1f1cdf9561.png";
import imgLogoBlanc from "figma:asset/e8e6d85e718d6e14b46015f5f68cf8cea509223d.png";

// Signalétique — entrée étages
import imgSign1 from "figma:asset/3b3f12d2ed0fdc869c8604c2d0c9b095443aa2af.png";
import imgSign2 from "figma:asset/ba0485ad693d7d171f702a164cac6f3219285f9f.png";
import imgSign3 from "figma:asset/3c4bdf51ef6180176e4aa1e0aa0c1c96be43bc88.png";
import imgSign4 from "figma:asset/d1b62d30287b851f9af84b7d2ec736e4a540a1da.png";
import imgSign5 from "figma:asset/acca9b8f399bddcc81d0448951af1ed1182b7b01.png";

// Signalétique — plans étages
import imgSng1 from "figma:asset/5523b9e45b2d04b06a1144ef1cb39e0d3d6ac3a2.png";
import imgSng0 from "figma:asset/dbaa8eab4c3a161e114a9f5e3060b453583a4ab9.png";
import imgSngA from "figma:asset/93b1b70e4c9094d246f7c64ae4eecdcf914841a8.png";
import imgSng2 from "figma:asset/255e87810599eac6e6c491b9b3c212ca2d9e9fa1.png";
import imgSng3 from "figma:asset/4f97d9fae158245b6c2176731d888235842295f7.png";
import imgSng4 from "figma:asset/bd8db1bd9a2096ad8f61e5c3d965d3930f06d3d9.png";
import imgSng5 from "figma:asset/7b424c920753f8c71913dd6bfc99352e7ea3ebd0.png";

// Signalétique ascenseur
import imgElevator from "figma:asset/77efaaf0ce8b5623b3c06bfdd5f2a25813062686.png";

// Cartes étudiantes
import imgCartes from "figma:asset/ffe5ce8cd270f92a5a877c7ac23cd36333d2f50e.png";

// Écrans
import imgScreen1 from "figma:asset/721233a0040c53d7b768cf2027d25130aca0cf90.png";
import imgScreen2 from "figma:asset/7eddb1d4a5bd7ca9182e5cf7f281fccb75582d75.png";
import imgScreen3 from "figma:asset/20712a54294267c67438cd386e2c636ba428b91d.png";

// Affiches
import imgAffiches from "figma:asset/40001e26ab55be91674c61b334d50f6a05a6d7c8.png";

// Bannières & réseaux sociaux
import imgBanniere from "figma:asset/98a540edc7fda5b31b56d08153892f8dc633c870.png";
import imgDcTalk from "figma:asset/d279f49148fc2c98af33f50b470ea862b403d20b.png";
import imgCampagne from "figma:asset/bf27d3b9bda8fba1015b21cee6f38c4e2990af02.png";
import imgPost from "figma:asset/e830f7496296150e7882fc26a578c5f2900999a3.png";

// Flyer
import imgFlyer from "figma:asset/377b9751d831d2adb7593d461c9723dee528acfa.png";

// Parcours & Timeline
import imgParcours from "figma:asset/2d922eef4337d9811f903b3a143efc5dd134f854.png";
import imgTimeline from "figma:asset/532b755d125ac66378705ad83f36c66702f059e6.png";

// Pack salons
import imgKakemono01 from "figma:asset/164d6da88031f3d27d4ec964e0ad09fc6818db50.png";
import imgKakemono02 from "figma:asset/8de888f36f85a5ed952cf5aa87f490dc839f420a.png";
import imgKakemono03 from "figma:asset/20a32d4e2ace30218f1dec5044ad2481df07569f.png";
import imgKakemono04 from "figma:asset/fbc3fa1415fe8f1b09795539eb00559f84571b73.png";
import imgKakemono05 from "figma:asset/bf2f24be00699782e982eff20ea7a5c9686e818e.png";
import imgStand1 from "figma:asset/24460cec786bbc2e7af42906d451398db419d422.png";
import imgStand2 from "figma:asset/26dfb94c1da8b925530802b98f65cce27f3c766f.png";
import imgStand3 from "figma:asset/3d0d12553ab978172f9e6b9a64f510655642abbc.png";
import imgFlyerMockup from "figma:asset/b4c0c4569cc16744e8cc7a9a00d42a3779ec5241.png";

// Print — Guide d'utilisation des outils (6 pages, incomplet)
import imgGuide1 from "figma:asset/36ad4eb55be813dccdaf248e6e88b17d35f73ea0.png";
import imgGuide2 from "figma:asset/26f1dec0c7c9fc2ceb1924543a881922e591001e.png";
import imgGuide3 from "figma:asset/760cfab3bd1b27a41b2c417188fe2c6b67e2a438.png";
import imgGuide4 from "figma:asset/6bd01dcf62ef81c8bf6e793c9864705da3952c63.png";
import imgGuide5 from "figma:asset/413a8ea5b31c3b19e46adbf74590911b7dcdc543.png";
import imgGuide6 from "figma:asset/4962080360a3e056e47b692b3936da0893c4f9ad.png";

// Print — Guide de l'admis (4 pages)
import imgAdmis1 from "figma:asset/17009ca331ef77bca789d97986effa977642d4d7.png";
import imgAdmis2 from "figma:asset/293877cebea4210401d7c065a928abb05ac58179.png";
import imgAdmis3 from "figma:asset/b8ee77e7d931e9ad843c04b77d91b2c77f993fde.png";
import imgAdmis4 from "figma:asset/9f0f0c4df59507a80473b42c5b7beae7e0a14d07.png";

// Print — Guide de l'admis rafraîchi (4 pages)
import imgAdmisR1 from "figma:asset/6f4f63401b1425594650b3ef48fb66b93138bd10.png";
import imgAdmisR2 from "figma:asset/d84da7583f0a68c8dbf6e5117e21c118a4e4e451.png";
import imgAdmisR3 from "figma:asset/218c71160554d6e8c7474724b45d337bd97b9c49.png";
import imgAdmisR4 from "figma:asset/745a7ab288e4250f5f75c2ba90abc47c00507edd.png";

// Print — Plaquette FC (échantillon 4 pages sur 29)
import imgFC01 from "figma:asset/87d7153c1168102cd32d028642c7ca6b17b16677.png";
import imgFC02 from "figma:asset/0fa7c4abdabf7489ee142cf064be9197d67183e7.png";
import imgFC15 from "figma:asset/efe2906473dd603a87ccb3167c93fb7ec9599a4d.png";
import imgFC29 from "figma:asset/b0cec114d3fa0e0bd5a824874d1422cc3ef300a8.png";

// Print — Plaquette formations (échantillon 4 pages sur 8)
import imgPlaq1 from "figma:asset/c412322b49df7fe5b40daa54c039448d9c329fb9.png";
import imgPlaq2 from "figma:asset/1dd960701ec42272efc74dd66cd2b93455d1838c.png";
import imgPlaq5 from "figma:asset/50dc5173fb074f82ea31a59fc827ef9840b794ab.png";
import imgPlaq8 from "figma:asset/a3463e13cdab8a4513cfa584255a4042553fed14.png";

// Print — Livret préparer sa recherche (échantillon 4 pages sur 22)
import imgLiv01 from "figma:asset/31329094a920494d1f2a86b902b07d397aaa8ea4.png";
import imgLiv02 from "figma:asset/3efac74bbc58c442750eaa5a89ebd8889210f297.png";
import imgLiv11 from "figma:asset/53228c25b0311a6836364bf6f5e5dec3a09f74fb.png";
import imgLiv22 from "figma:asset/10d074b3321fab2674333afa712f752d683a14d0.png";

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
  { label: "Guide d'utilisation", labelEn: "Usage Guide", pages: [imgGuide4, imgGuide5, imgGuide6, imgGuide1, imgGuide2, imgGuide3], note: "Extrait" },
  { label: "Guide de l'admis", labelEn: "Admission Guide", pages: [imgAdmis1, imgAdmis2, imgAdmis3, imgAdmis4] },
  { label: "Guide de l'admis (v2)", labelEn: "Admission Guide (v2)", pages: [imgAdmisR1, imgAdmisR2, imgAdmisR3, imgAdmisR4] },
  { label: "Plaquette FC", labelEn: "FC Brochure", pages: [imgFC01,imgFC02,imgFC15,imgFC29] },
  { label: "Plaquette formations", labelEn: "Training Brochure", pages: [imgPlaq1,imgPlaq2,imgPlaq5,imgPlaq8] },
  { label: "Livret recherche", labelEn: "Job Search Booklet", pages: [imgLiv01,imgLiv02,imgLiv11,imgLiv22] },
];

/* ── Helpers ── */
function SectionLabel({ children }: { children: string }) {
  const { r } = useTheme();
  return (
    <span className="uppercase tracking-[0.3em] block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: r(0.25) }}>
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
            <ImageWithFallback src={isDark ? imgLogoBlanc : imgLogoNoir} alt="Digital Campus" className="w-full h-auto" />
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
          <ImageWithFallback src={isDark ? imgLogoBlanc : imgLogoNoir} alt="DC" className="w-32 mx-auto mb-6 opacity-20" />
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
