import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { preloadProjectRoute } from "../projectRouteLoaders";
import { CompositeTitle } from "./CompositeTitle";

const projects = [
  {
    title: "MYA",
    desc: { fr: "Identité visuelle · Bijoux", en: "Visual Identity · Jewelry" },
    image: "https://images.unsplash.com/photo-1595017211936-e9c28707b186?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwZGFyayUyMGVsZWdhbnQlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzYyMjA3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    color: "#D0B0D4",
    accent: "208,176,212",
    slug: "/projects/mya",
  },
  {
    title: "SNATSH",
    desc: { fr: "Identité visuelle · Production audiovisuelle", en: "Visual Identity · Audiovisual" },
    image: "https://images.unsplash.com/photo-1666858443985-fead1d59b4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpb3Zpc3VhbCUyMHByb2R1Y3Rpb24lMjBhZ2VuY3klMjBjYW1lcmElMjBkYXJrfGVufDF8fHx8MTc3MzY4NjU0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    color: "#c0c1a4",
    accent: "192,193,164",
    slug: "/projects/snatsh",
  },
  {
    title: "MZW",
    desc: { fr: "Identité musicale · Électro", en: "Music Identity · Electronic" },
    image: "https://images.unsplash.com/photo-1764258559605-5b769b04550e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29uY2VydCUyMGVsZWN0cm9uaWMlMjBtdXNpYyUyMG5lb24lMjBwdXJwbGV8ZW58MXx8fHwxNzczNjI4MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2022",
    color: "#5d4792",
    accent: "93,71,146",
    slug: "/projects/mzw",
  },
  {
    title: "ROMA",
    desc: { fr: "Design éditorial · Paris", en: "Editorial Design · Paris" },
    image: "https://images.unsplash.com/photo-1761593703838-a1150f9cf906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMGFyY2hpdGVjdHVyZSUyMGRvbWUlMjBjbGFzc2ljYWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM2MjU2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2021",
    color: "#B8A88A",
    accent: "184,168,138",
    slug: "/projects/roma",
  },
  {
    title: "Maker Week",
    desc: { fr: "Événementiel · Direction artistique", en: "Event · Art Direction" },
    image: "https://images.unsplash.com/photo-1554207410-12cc55803386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNyZWF0aXZlJTIwZXZlbnQlMjB3b3Jrc2hvcCUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzYyNzEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2022",
    color: "#0095C1",
    accent: "0,149,193",
    slug: "/projects/maker-week",
  },
  {
    title: "KittyHub",
    desc: { fr: "Concept digital · Pokémon", en: "Digital Concept · Pokémon" },
    image: "https://images.unsplash.com/photo-1613771404738-65d22f979710?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlbW9uJTIwY2FyZHMlMjBjb2xsZWN0aW9uJTIwY29sb3JmdWwlMjBkaWdpdGFsfGVufDF8fHx8MTc3MzYyOTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026",
    color: "#FD6235",
    accent: "253,98,53",
    slug: "/projects/kittyhub",
  },
];

export function WorkSection() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { p, r } = useTheme();
  const accent = "#0077B6";
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section data-section="work" className="relative w-full px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px 0px" }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-16 flex-wrap gap-6"
        >
          <div>
            <span
              className="inline-block uppercase tracking-widest mb-5"
              style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
            >
              — {t("work.badge")}
            </span>
            <div>
              <CompositeTitle
                primary={t("work.title1" as TranslationKey)}
                secondary={t("work.title2" as TranslationKey)}
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/projects")}
            onMouseEnter={() => preloadProjectRoute("/projects")}
            onFocus={() => preloadProjectRoute("/projects")}
            className="px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-105"
            style={{ fontSize: "0.85rem", fontFamily: "'Inter', sans-serif", border: `1px solid ${r(0.15)}`, color: r(0.6) }}
          >
            {t("work.viewAll")}
            <ArrowUpRight size={16} />
          </button>
        </motion.div>

        {/* Horizontal scrollable strip with full-width hover reveal */}
        <div className="space-y-[1px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "160px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group cursor-pointer relative"
              onMouseEnter={() => setHoveredIdx(i)}
              onPointerEnter={() => preloadProjectRoute(project.slug)}
              onFocus={() => preloadProjectRoute(project.slug)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => navigate(project.slug)}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(project.slug);
                }
              }}
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `linear-gradient(90deg, rgba(${project.accent},0.04), transparent 60%)` }}
              />

              <div
                className="relative flex items-center py-6 md:py-8 px-2 md:px-4 border-b"
                style={{ borderColor: r(0.04) }}
              >
                {/* Number */}
                <span
                  className="w-10 shrink-0 hidden md:block"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", fontWeight: 600, color: r(0.1) }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Thumbnail — appears on hover */}
                <div className="w-0 group-hover:w-20 h-14 shrink-0 overflow-hidden rounded-lg transition-all duration-500 mr-0 group-hover:mr-5">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-20 h-14 object-cover"
                  />
                </div>

                {/* Title */}
                <h3
                  className="flex-1 transition-all duration-500 group-hover:translate-x-1"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: hoveredIdx === i ? p.text : r(0.4),
                    transition: "color 0.3s ease, transform 0.5s ease",
                  }}
                >
                  {project.title}
                </h3>

                {/* Category */}
                <span
                  className="hidden md:block mr-6 transition-colors duration-300"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.2) }}
                >
                  {project.desc[lang]}
                </span>

                {/* Year */}
                <span
                  className="hidden md:block mr-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: r(0.12) }}
                >
                  {project.year}
                </span>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <ArrowUpRight size={16} style={{ color: project.color }} />
                </div>

                {/* Color bar at bottom on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                  style={{
                    width: hoveredIdx === i ? "100%" : "0%",
                    background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
