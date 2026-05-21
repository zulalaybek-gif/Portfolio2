import { motion } from "motion/react";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

const tools = [
  { name: "Photoshop", abbr: "Ps", color: "#31A8FF", x: 10, y: 59, mx: 30, my: 10 },
  { name: "Illustrator", abbr: "Ai", color: "#FF9A00", x: 24, y: 29, mx: 63, my: 22 },
  { name: "InDesign", abbr: "Id", color: "#FF3366", x: 38, y: 62, mx: 34, my: 36 },
  { name: "Figma", abbr: "Fi", color: "#A259FF", x: 52, y: 36, mx: 66, my: 50 },
  { name: "Premiere Pro", abbr: "Pr", color: "#9999FF", x: 66, y: 59, mx: 32, my: 64 },
  { name: "After Effects", abbr: "Ae", color: "#9999FF", x: 80, y: 40, mx: 63, my: 78 },
  { name: "Lightroom", abbr: "Lr", color: "#31A8FF", x: 92, y: 39, mx: 42, my: 92 },
];

export function ToolsSection() {
  const { t } = useI18n();
  const { r, isDark } = useTheme();

  return (
    <section data-section="tools" className="relative w-full overflow-hidden px-6 md:px-12 py-14 md:py-16">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12">
          <span
            className="section-eyebrow inline-block uppercase tracking-widest mb-6"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
          >
            — {t("tools.badge")}
          </span>
        </div>

        <div
          className="tools-branch relative mx-auto"
          style={{
            ["--tools-ink" as string]: r(isDark ? 0.74 : 0.7),
            ["--tools-label" as string]: r(isDark ? 0.44 : 0.54),
            ["--tools-label-hover" as string]: r(isDark ? 0.82 : 0.78),
            ["--tools-surface" as string]: isDark ? "rgba(7, 15, 28, 0.72)" : "rgba(255, 255, 255, 0.66)",
            ["--tools-surface-hover" as string]: isDark ? "rgba(12, 26, 45, 0.88)" : "rgba(255, 255, 255, 0.86)",
            ["--tools-edge" as string]: isDark ? "rgba(127, 214, 255, 0.16)" : "rgba(13, 27, 42, 0.1)",
            ["--tools-muted-glow" as string]: isDark ? "rgba(93, 169, 255, 0.08)" : "rgba(93, 169, 255, 0.12)",
          }}
        >
          <svg
            className="tools-branch__line tools-branch__line--desktop"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="toolsWaveGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7FD6FF" stopOpacity={isDark ? 0.68 : 0.5} />
                <stop offset="46%" stopColor="#5DA9FF" stopOpacity={isDark ? 0.5 : 0.38} />
                <stop offset="72%" stopColor="#A259FF" stopOpacity={isDark ? 0.42 : 0.32} />
                <stop offset="100%" stopColor="#D85D9B" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              "M -260 690 C 180 250, 620 890, 1700 190",
              "M -190 420 C 280 50, 780 560, 1650 285",
            ].map((path, index) => (
              <motion.path
                key={path}
                className="tools-branch__wave"
                d={path}
                initial={{ pathLength: 0.28, pathOffset: 0.18 }}
                animate={{ pathLength: [0.28, 1, 0.28], pathOffset: [0.18, 0, 0.18] }}
                transition={{ duration: 16 + index * 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: index === 1 ? 0.78 : 0.56, strokeWidth: index === 1 ? 1.65 : 1.25 }}
              />
            ))}
          </svg>

          <svg
            className="tools-branch__line tools-branch__line--mobile"
            viewBox="0 0 360 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="toolsWaveGradientMobile" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7FD6FF" stopOpacity={isDark ? 0.68 : 0.5} />
                <stop offset="44%" stopColor="#5DA9FF" stopOpacity={isDark ? 0.5 : 0.38} />
                <stop offset="74%" stopColor="#A259FF" stopOpacity={isDark ? 0.42 : 0.32} />
                <stop offset="100%" stopColor="#D85D9B" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              "M 72 -24 C 304 42, 74 128, 240 214 S 76 352, 230 462 S 82 576, 176 650",
              "M 198 -18 C 38 96, 302 188, 136 290 S 324 438, 148 546 S 286 624, 220 672",
              "M 328 40 C 152 150, 316 258, 178 374 S 72 500, 292 610",
            ].map((path, index) => (
              <motion.path
                key={path}
                className="tools-branch__wave tools-branch__wave--mobile"
                d={path}
                initial={{ pathLength: 0.3, pathOffset: 0.18 }}
                animate={{ pathLength: [0.3, 1, 0.3], pathOffset: [0.18, 0, 0.18] }}
                transition={{ duration: 16 + index * 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: index === 1 ? 0.88 : 0.54, strokeWidth: index === 1 ? 2 : 1.25 }}
              />
            ))}
          </svg>

          {tools.map((tool, index) => (
            <button
              key={tool.name}
              type="button"
              className="tools-branch__tool group"
              style={{
                ["--tool-x" as string]: `${tool.x}%`,
                ["--tool-y" as string]: `${tool.y}%`,
                ["--tool-x-mobile" as string]: `${tool.mx}%`,
                ["--tool-y-mobile" as string]: `${tool.my}%`,
                ["--tool-accent" as string]: tool.color,
                ["--tool-drift-delay" as string]: `${index * -0.7}s`,
              }}
              aria-label={tool.name}
            >
              <span
                className="tools-branch__bud"
                aria-hidden="true"
              >
                <span className="tools-branch__abbr">{tool.abbr}</span>
              </span>
              <span className="tools-branch__label">
                {tool.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
