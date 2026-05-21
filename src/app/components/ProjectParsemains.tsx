import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ProjectBackButton } from "./ProjectBackButton";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

const ACCENT = "#7FA0AE";
const ACCENT_RGB = "127,160,174";

export function ProjectParsemains() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <main className="relative min-h-screen overflow-hidden px-6 md:px-12 pt-28 pb-20">
      <ProjectBackButton
        onClick={() => navigate("/projects")}
        style={{
          color: r(0.55),
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)",
          border: `1px solid ${r(0.12)}`,
        }}
      >
        {lang === "fr" ? "Retour aux projets" : "Back to projects"}
      </ProjectBackButton>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(circle at 20% 20%, rgba(${ACCENT_RGB},0.16), transparent 34%),
               radial-gradient(circle at 78% 12%, rgba(223,244,64,0.08), transparent 28%),
               linear-gradient(180deg, rgba(255,255,255,0.02), transparent 42%)`
            : `radial-gradient(circle at 20% 20%, rgba(${ACCENT_RGB},0.16), transparent 34%),
               radial-gradient(circle at 78% 12%, rgba(193,33,68,0.06), transparent 30%),
               linear-gradient(180deg, rgba(255,255,255,0.5), transparent 42%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto min-h-[calc(100vh-12rem)] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span
            className="uppercase tracking-[0.32em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              color: r(0.28),
            }}
          >
            {lang === "fr" ? "Projet a venir" : "Upcoming project"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(4rem, 15vw, 13rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.06em",
            color: r(0.92),
          }}
        >
          Parsemains
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <p
            className="max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
              lineHeight: 1.55,
              color: r(0.5),
            }}
          >
            {lang === "fr"
              ? "La page projet est prete. Les contenus, visuels et intentions seront ajoutes prochainement."
              : "The project page is ready. Content, visuals and direction will be added soon."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: isDark ? "#F1F1F1" : "#232624",
              border: `1px solid ${r(0.14)}`,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)",
            }}
          >
            {lang === "fr" ? "Retour index" : "Back to index"}
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px origin-left"
          style={{
            background: `linear-gradient(90deg, rgba(${ACCENT_RGB},0.85), ${r(0.08)}, transparent)`,
          }}
        />
      </div>
    </main>
  );
}
