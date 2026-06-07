import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ArrowRight, X, MoveRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ParticleDivider } from "./ParticleDivider";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { useNavigate } from "react-router";
import { preloadProjectRoute } from "../projectRouteLoaders";
import { CompositeTitle } from "./CompositeTitle";
import { AmbientMovingLines } from "./AmbientMovingLines";
import imgKittyHubPreview from "../../assets/kittyhub/10-mockup-bento.jpg";
import imgSnatshPreview from "../../assets/snatsh/06-mockup.png";
import imgArtePreview from "../../assets/arte-en-scène/04-mockup.png";
import imgParsemainsPreview from "../../assets/parsemains/25.mockup-packaging.png";

/* ─── Data ─── */
type ViewMode = "standard" | "projects" | "workshops";
const viewModeKeys: ViewMode[] = ["standard", "projects", "workshops"];
const viewI18nMap: Record<ViewMode, TranslationKey> = {
  standard: "view.standard",
  projects: "view.projects",
  workshops: "view.workshops",
};

const categoryKeys = ["all", "identity", "digital", "communication", "event"] as const;
type CatKey = (typeof categoryKeys)[number];

const catI18nMap: Record<CatKey, TranslationKey> = {
  all: "cat.all",
  identity: "cat.identity",
  digital: "cat.digital",
  communication: "cat.communication",
  event: "cat.event",
};

const projects = [
  {
    id: 1, title: "MYA", category: "identity" as CatKey, year: "2026",
    type: "project" as const,
    tagKeys: ["tag.identity", "tag.branding"] as TranslationKey[],
    descKey: "proj.mya.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1595017211936-e9c28707b186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwZGFyayUyMGVsZWdhbnQlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzYyMjA3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#D0B0D4", accent: "208,176,212",
    slug: "/projects/mya",
  },
  {
    id: 2, title: "ROMA", category: "identity" as CatKey, year: "2021",
    type: "project" as const,
    tagKeys: ["tag.editorial", "tag.creativeDir"] as TranslationKey[],
    descKey: "proj.roma.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1761593703838-a1150f9cf906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGFyY2hpdGVjdHVyZSUyMGRvbWUlMjBjbGFzc2ljYWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM2MjU2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#B8A88A", accent: "184,168,138",
    slug: "/projects/roma",
  },
  {
    id: 3, title: "Maker Week", category: "event" as CatKey, year: "2022",
    type: "project" as const,
    tagKeys: ["tag.identity", "tag.eventDesign"] as TranslationKey[],
    descKey: "proj.mw.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1554207410-12cc55803386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNyZWF0aXZlJTIwZXZlbnQlMjB3b3Jrc2hvcCUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzYyNzEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#0095C1", accent: "0,149,193",
    slug: "/projects/maker-week",
  },
  {
    id: 4, title: "MZW", category: "identity" as CatKey, year: "2022",
    type: "project" as const,
    tagKeys: ["tag.musicIdent", "tag.uiDesign"] as TranslationKey[],
    descKey: "proj.mzw.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1764258559605-5b769b04550e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29uY2VydCUyMGVsZWN0cm9uaWMlMjBtdXNpYyUyMG5lb24lMjBwdXJwbGV8ZW58MXx8fHwxNzczNjI4MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#5d4792", accent: "93,71,146",
    slug: "/projects/mzw",
  },
  {
    id: 5, title: "KittyHub", category: "digital" as CatKey, year: "2026",
    type: "project" as const,
    tagKeys: ["tag.concept", "tag.appDesign"] as TranslationKey[],
    descKey: "proj.kh.desc" as TranslationKey,
    image: imgKittyHubPreview,
    color: "#FD6235", accent: "253,98,53",
    slug: "/projects/kittyhub",
  },
  {
    id: 6, title: "SNATSH", category: "identity" as CatKey, year: "2026",
    type: "project" as const,
    tagKeys: ["tag.audiovisual", "tag.editorial"] as TranslationKey[],
    descKey: "proj.sn.desc" as TranslationKey,
    image: imgSnatshPreview,
    color: "#c0c1a4", accent: "192,193,164",
    slug: "/projects/snatsh",
  },
  {
    id: 7, title: "ARTE en scène", category: "event" as CatKey, year: "2025",
    type: "project" as const,
    tagKeys: ["tag.poster", "tag.livePerformance"] as TranslationKey[],
    descKey: "proj.arte.desc" as TranslationKey,
    image: imgArtePreview,
    color: "#dd6486", accent: "221,100,134",
    slug: "/projects/arte",
  },
  {
    id: 8, title: "Digital Campus", category: "communication" as CatKey, year: "2022",
    type: "project" as const,
    tagKeys: ["tag.communication", "tag.print"] as TranslationKey[],
    descKey: "proj.dc.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1767731846196-65eed62dbea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2FtcHVzJTIwZWR1Y2F0aW9uJTIwbW9kZXJuJTIwYmx1ZXxlbnwxfHx8fDE3NzM3NjM0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#0092BD", accent: "0,146,189",
    slug: "/projects/digital-campus",
  },
  {
    id: 20, title: "Radio Libre", category: "identity" as CatKey, year: "2025",
    type: "project" as const,
    tagKeys: ["tag.radioIdentity", "tag.sprint"] as TranslationKey[],
    descKey: "proj.rl.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1636818477383-3a23426afe87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRpbyUyMHN0dWRpbyUyMG1pY3JvcGhvbmUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM3OTQxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#9ed6f0", accent: "158,214,240",
    slug: "/projects/radio-libre",
  },
  {
    id: 9, title: "Narratiiv", category: "communication" as CatKey, year: "2023",
    type: "project" as const,
    tagKeys: ["tag.brandContent", "tag.communityMgmt", "tag.video", "tag.print"] as TranslationKey[],
    descKey: "proj.nrtv.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1759179075782-4b523a4e0d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY2hvb2wlMjBjYW1wdXMlMjB0dXJxdW9pc2UlMjBicmFuZGluZ3xlbnwxfHx8fDE3NzM3NzM0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#7aded1", accent: "122,222,209",
    slug: "/projects/narratiiv",
  },
  {
    id: 18, title: "SNCF Connect & Tech", category: "digital" as CatKey, year: "2024",
    type: "workshop" as const,
    tagKeys: ["tag.uxui", "tag.concept"] as TranslationKey[],
    descKey: "proj.sncf.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1763256552696-ccf50fe3736e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHN0YXRpb24lMjBtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwYmx1ZXxlbnwxfHx8fDE3NzM3NzkwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#8DE8FE", accent: "141,232,254",
    slug: "/projects/sncf-connect",
  },
  {
    id: 19, title: "Collectif Haïti de France", category: "identity" as CatKey, year: "2024",
    type: "workshop" as const,
    tagKeys: ["tag.identity", "tag.branding"] as TranslationKey[],
    descKey: "proj.haiti.desc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1580835845971-a393b73bf370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIYWl0aSUyMGNvbG9yZnVsJTIwY3VsdHVyZSUyMENhcmliYmVhbnxlbnwxfHx8fDE3NzM3ODMzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    color: "#A295C3", accent: "162,149,195",
    slug: "/projects/haiti",
  },
  {
    id: 21, title: "Parsemains", category: "identity" as CatKey, year: "2026",
    type: "project" as const,
    tagKeys: ["tag.identity", "tag.branding"] as TranslationKey[],
    descKey: "proj.parsemains.desc" as TranslationKey,
    image: imgParsemainsPreview,
    color: "#F08100", accent: "240,129,0",
    slug: "/projects/parsemains",
  },
];

type Project = (typeof projects)[number];

/* ═══════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════ */
function ProjectsHero() {
  const { t } = useI18n();
  const { r } = useTheme();

  return (
    <section data-section="projects-hero" className="relative px-6 md:px-12 pt-16 pb-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-start justify-between mb-6"
        >
          <span className="section-eyebrow uppercase tracking-[0.3em]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}>
            {t("projects.heroLabel")}
          </span>
          <span className="hidden md:block" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.15) }}>
            {projects.length} {t("projects.count")} &mdash; 2021-2026
          </span>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative z-10"
          >
            <CompositeTitle
              as="h1"
              size="projects"
              primary={t("projects.title1")}
              secondary={t("projects.title2")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
            className="flex items-end gap-4 md:gap-8 mt-5"
          >
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden md:flex items-center gap-4 pb-4"
            >
              <div className="w-16 h-[1px]" style={{ background: r(0.15) }} />
              <span className="whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: r(0.25) }}>
                {t("projects.subtitle")}
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute -top-4 right-0 pointer-events-none hidden lg:block"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "18rem", fontWeight: 700, lineHeight: 0.8,
            color: "transparent",
            WebkitTextStroke: `1px ${r(0.03)}`,
          }}
        >
          {String(projects.length).padStart(2, "0")}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. FEATURED
   ═══════════════════════════════════════════ */
function FeaturedProject({ onSelect }: { onSelect: (p: Project) => void }) {
  const { t } = useI18n();
  const { p: pal, r, isDark } = useTheme();
  const featured = projects[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section className="relative px-6 md:px-12 pb-16" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group cursor-pointer rounded-[2rem] overflow-hidden"
          onMouseEnter={() => preloadProjectRoute(featured.slug)}
          onFocus={() => preloadProjectRoute(featured.slug)}
          onClick={() => onSelect(featured)}
          style={{ border: `1px solid ${r(0.05)}` }}
        >
          <div className="relative w-full aspect-[21/9] overflow-hidden">
            <motion.div className="absolute inset-[-15%]" style={{ y: imgY }}>
              <ImageWithFallback src={featured.image} alt={featured.title} loading="eager" fetchPriority="high" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
            </motion.div>
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${pal.imgOverlayTop} 0%, ${pal.imgOverlayMid} 50%, ${pal.imgOverlayBot} 100%)` }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `radial-gradient(circle at 50% 100%, rgba(${featured.accent},0.15) 0%, transparent 60%)` }} />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", border: `1px solid ${r(0.1)}`, background: r(0.03), backdropFilter: "blur(10px)", color: r(0.5) }}>
                  {t("projects.featured")}
                </span>
                <span className="px-3 py-1.5 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", border: `1px solid ${r(0.06)}`, background: r(0.02), color: r(0.3) }}>
                  {t(catI18nMap[featured.category])}
                </span>
              </div>
              <motion.div className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ border: `1px solid ${r(0.15)}`, background: r(0.05), backdropFilter: "blur(10px)" }} whileHover={{ scale: 1.1 }}>
                <ArrowUpRight size={20} style={{ color: "#fff" }} />
              </motion.div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                {featured.tagKeys.map((tagKey) => (
                  <span key={tagKey} className="px-3 py-1 rounded-full" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.8)" }}>
                    {t(tagKey)}
                  </span>
                ))}
              </div>
              <h2 className="mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", color: "#fff" }}>
                {featured.title}
              </h2>
              <div className="flex items-center gap-4">
                <p className="max-w-lg hidden md:block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>
                  {t(featured.descKey)}
                </p>
                <span className="ml-auto" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}>
                  {featured.year}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   3. PROJECT INDEX
   ═══════════════════════════════════════════ */
function ProjectIndex({ activeCategory, setActiveCategory, onSelect }: {
  activeCategory: CatKey;
  setActiveCategory: (c: CatKey) => void;
  onSelect: (p: Project) => void;
}) {
  const { t } = useI18n();
  const { p: pal, r } = useTheme();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("standard");
  const listRef = useRef<HTMLDivElement>(null);
  const mouseFrame = useRef<number | null>(null);
  const latestMouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    latestMouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    if (mouseFrame.current !== null) return;
    mouseFrame.current = window.requestAnimationFrame(() => {
      setMousePos(latestMouse.current);
      mouseFrame.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (mouseFrame.current !== null) {
        window.cancelAnimationFrame(mouseFrame.current);
      }
    };
  }, []);

  /* Filter by category first, then by view mode */
  const catFiltered = activeCategory === "all" ? projects.slice(1) : projects.filter((p) => p.category === activeCategory);
  const filtered = viewMode === "standard" ? catFiltered : catFiltered.filter((p) => p.type === (viewMode === "workshops" ? "workshop" : "project"));
  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <section data-section="projects-index" className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-between flex-wrap gap-6 mb-4">
          <span className="section-eyebrow uppercase tracking-[0.3em]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}>
            {t("projects.indexLabel")}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categoryKeys.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="relative px-4 py-2 rounded-full transition-all" style={{ fontSize: "0.75rem", fontFamily: "'Inter', sans-serif" }}>
                {activeCategory === cat && (
                  <motion.div layoutId="catPill" className="absolute inset-0 rounded-full" style={{ background: r(0.06), border: `1px solid ${r(0.12)}` }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10 transition-colors duration-300" style={{ color: activeCategory === cat ? pal.text : r(0.3) }}>
                  {t(catI18nMap[cat])}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* View mode switcher */}
        <div className="flex items-center gap-1 mb-6">
          {viewModeKeys.map((vm) => (
            <button key={vm} onClick={() => setViewMode(vm)} className="relative px-3 py-1.5 rounded-full transition-all" style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif" }}>
              {viewMode === vm && (
                <motion.div layoutId="viewPill" className="absolute inset-0 rounded-full" style={{ background: r(0.04), border: `1px solid ${r(0.08)}` }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10 transition-colors duration-300" style={{ color: viewMode === vm ? pal.text : r(0.2) }}>
                {t(viewI18nMap[vm])}
              </span>
            </button>
          ))}
        </div>

        <div className="w-full h-[1px] mb-2" style={{ background: r(0.05) }} />

        <div ref={listRef} className="relative" onMouseMove={handleMouseMove}>
          <AnimatePresence>
            {hoveredProject && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.25, ease: "easeOut" }} className="absolute z-30 pointer-events-none hidden lg:block" style={{ left: Math.min(mousePos.x - 160, 600), top: mousePos.y - 120, width: 320, height: 220 }}>
                <div className="w-full h-full rounded-2xl overflow-hidden" style={{ border: `1px solid rgba(${hoveredProject.accent},0.2)`, boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(${hoveredProject.accent},0.1)` }}>
                  <ImageWithFallback src={hoveredProject.image} alt={hoveredProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(${hoveredProject.accent},0.15), transparent)` }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group cursor-pointer relative"
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  preloadProjectRoute(project.slug);
                }}
                onFocus={() => preloadProjectRoute(project.slug)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelect(project)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: `linear-gradient(90deg, rgba(${project.accent},0.03), transparent 50%)` }} />
                <div className="relative flex items-center py-5 md:py-7 border-b transition-colors duration-500 px-2 md:px-4" style={{ borderColor: r(0.03) }}>
                  <span className="w-12 shrink-0 hidden md:block transition-colors duration-500" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: r(0.1) }}>
                    {String(project.id).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 transition-all duration-500" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.2rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, color: r(0.5) }}>
                    <span className="group-hover:translate-x-2 inline-block transition-transform duration-500">{project.title}</span>
                    {project.type === "workshop" && (
                      <span className="inline-block ml-3 px-2.5 py-0.5 rounded-full align-middle" style={{ fontSize: "0.55rem", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", background: r(0.04), border: `1px solid ${r(0.08)}`, color: r(0.3) }}>
                        {t("badge.workshop")}
                      </span>
                    )}
                  </h3>
                  <div className="hidden md:flex items-center gap-6 mr-6">
                    <span className="transition-colors duration-500" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.15) }}>{t(catI18nMap[project.category])}</span>
                    <span className="transition-colors duration-500" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.1) }}>{project.year}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                    <MoveRight size={16} style={{ color: project.color }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", color: r(0.2) }}>
                {t("projects.noMatch")}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4. HORIZONTAL REEL
   ═══════════════════════════════════════════ */
function HorizontalReel({ onSelect }: { onSelect: (p: Project) => void }) {
  const { t } = useI18n();
  const { p: pal, r } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <section data-section="projects-reel" className="py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center justify-between mb-8">
          <div>
            <span className="section-eyebrow uppercase tracking-[0.3em] block mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: r(0.2) }}>
              {t("projects.reelLabel")}
            </span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 600, letterSpacing: "-0.02em", color: pal.text }}>
              {t("projects.reelTitle")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: `1px solid ${canScrollLeft ? r(0.15) : r(0.05)}`, color: canScrollLeft ? r(0.5) : r(0.1) }}>
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: `1px solid ${canScrollRight ? r(0.15) : r(0.05)}`, color: canScrollRight ? r(0.5) : r(0.1) }}>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <div ref={scrollRef} className="relative flex gap-4 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group shrink-0 cursor-pointer"
            style={{ scrollSnapAlign: "start" }}
            onMouseEnter={() => preloadProjectRoute(project.slug)}
            onFocus={() => preloadProjectRoute(project.slug)}
            onClick={() => onSelect(project)}
          >
            <div className="relative w-[280px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden" style={{ border: `1px solid ${r(0.04)}` }}>
              <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%)" }} />
              <motion.div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: project.color, scaleX: 0, originX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
                  {String(project.id).padStart(2, "0")} / {t(catI18nMap[project.category])}
                </span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.2, color: "#fff" }}>
                  {project.title}
                </h3>
              </div>
              {project.type === "workshop" && (
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ fontSize: "0.55rem", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                  {t("badge.workshop")}
                </span>
              )}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border border-white/0 group-hover:border-white/15 bg-white/0 group-hover:bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowUpRight size={14} className="text-white/70" />
              </div>
            </div>
          </motion.div>
        ))}
        <div className="shrink-0 w-4" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. MODAL
   ═══════════════════════════════════════════ */
function ProjectModal({ project, onClose, onNext, onViewCase }: { project: Project; onClose: () => void; onNext: () => void; onViewCase: () => void }) {
  const { t } = useI18n();
  const { p: pal, r, isDark } = useTheme();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext]);

  const modal = (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6"
      style={{ background: pal.modalOverlay, backdropFilter: "blur(30px)" }}
      onClick={onClose}
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-${project.id}`}
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-[92dvh] max-h-[92dvh] w-full max-w-[900px] flex-col overflow-hidden rounded-t-[1.6rem] md:h-[640px] md:max-h-[86dvh] md:rounded-[1.8rem]"
        style={{
          background: pal.modalBg,
          border: `1px solid ${r(0.06)}`,
          boxShadow: `0 40px 80px rgba(0,0,0,${isDark ? 0.6 : 0.15}), 0 0 60px rgba(${project.accent},0.05)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative z-20 flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-6"
          style={{
            background: isDark ? "rgba(9, 12, 18, 0.72)" : "rgba(255, 255, 255, 0.72)",
            borderBottom: `1px solid ${r(0.06)}`,
            backdropFilter: "blur(18px)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: project.color }} />
            <span className="truncate" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em", color: r(0.38) }}>
              {t(catI18nMap[project.category])} &mdash; {project.year}
            </span>
          </div>
          <button aria-label="Fermer l'aperçu" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300" style={{ background: r(0.05), border: `1px solid ${r(0.08)}` }}>
            <X size={16} style={{ color: r(0.5) }} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden overscroll-none">
          <div className="grid min-h-full md:h-full md:grid-cols-[1fr_0.92fr]">
            <div className="relative min-h-[230px] overflow-hidden md:min-h-0">
              <ImageWithFallback src={project.image} alt={project.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: isDark ? "linear-gradient(90deg, rgba(10,10,10,0.08) 0%, transparent 42%, rgba(10,10,10,0.75) 100%)" : "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 45%, rgba(255,255,255,0.75) 100%)" }} />
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 86%, rgba(${project.accent},0.16) 0%, transparent 62%)` }} />
            </div>

          <div className="relative flex min-h-0 flex-col overflow-hidden px-6 py-7 md:px-8 md:py-8">
            <motion.h2 id={`project-modal-${project.id}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-0.03em", color: pal.text }}>
              {project.title}
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 max-w-xl" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: r(0.42) }}>
              {t(project.descKey)}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-6 flex flex-wrap gap-2">
              {project.tagKeys.map((tagKey) => (
                <span key={tagKey} className="rounded-full px-3 py-1.5" style={{ fontSize: "0.72rem", fontFamily: "'Inter', sans-serif", border: `1px solid ${r(0.07)}`, background: r(0.02), color: r(0.45) }}>
                  {t(tagKey)}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-7 grid grid-cols-1 gap-3 rounded-2xl p-4 sm:grid-cols-3" style={{ background: r(0.02), border: `1px solid ${r(0.04)}` }}>
              {[
                { label: t("projects.duration"), value: t("projects.durationVal") },
                { label: t("projects.deliverables"), value: `${project.tagKeys.length + 3}+` },
                { label: t("projects.year"), value: project.year },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl px-2 py-2 text-center sm:py-0">
                  <div className="mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 600, color: pal.text }}>{stat.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.63rem", textTransform: "uppercase", letterSpacing: "0.09em", color: r(0.25) }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={onViewCase}
                className="group flex items-center justify-center gap-3 rounded-full px-7 py-3.5 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`, fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: isDark ? "#0a0a0a" : "#fff", boxShadow: `0 8px 30px rgba(${project.accent},0.2)` }}
              >
                {t("projects.viewCase")}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="flex items-center justify-center gap-2 rounded-full px-7 py-3.5 transition-colors duration-300" style={{ border: `1px solid ${r(0.08)}`, color: r(0.45), fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>
                {t("projects.next")}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return portalRoot ? createPortal(modal, portalRoot) : modal;
}

/* ═══════════════════════════════════════════
   MAIN PAGE EXPORT
   ═════════════════════════════════════════ */
export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CatKey>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  /* Always open modal first */
  const handleSelect = (project: Project) => {
    preloadProjectRoute(project.slug);
    setSelectedProject(project);
  };

  /* "View case study" navigates to the project page */
  const handleViewCase = () => {
    if (selectedProject?.slug) {
      setSelectedProject(null);
      navigate(selectedProject.slug);
    }
  };

  const handleNext = () => {
    if (!selectedProject) return;
    const idx = projects.findIndex((p) => p.id === selectedProject.id);
    const next = projects[(idx + 1) % projects.length];
    setSelectedProject(next);
  };

  return (
    <div className="relative w-full overflow-x-clip">
      <AmbientMovingLines className="absolute inset-x-0 top-0 z-0" height="140vh" opacity={0.22} />
      <div className="relative z-10">
        <ProjectsHero />
        <ParticleDivider accent="127,214,255" direction={1} count={22} height={45} />
        <FeaturedProject onSelect={handleSelect} />
        <ProjectIndex activeCategory={activeCategory} setActiveCategory={setActiveCategory} onSelect={handleSelect} />
        <ParticleDivider accent="154,142,196" direction={-1} count={18} height={45} />
        <HorizontalReel onSelect={handleSelect} />
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onNext={handleNext} onViewCase={handleViewCase} />
        )}
      </AnimatePresence>
    </div>
  );
}
