import { useI18n } from "./i18n";
import { useTheme } from "./theme";

const tools = [
  { name: "Photoshop", abbr: "Ps", color: "#31A8FF" },
  { name: "Illustrator", abbr: "Ai", color: "#FF9A00" },
  { name: "InDesign", abbr: "Id", color: "#FF3366" },
  { name: "Figma", abbr: "Fi", color: "#A259FF" },
  { name: "Premiere Pro", abbr: "Pr", color: "#9999FF" },
  { name: "After Effects", abbr: "Ae", color: "#9999FF" },
  { name: "Lightroom", abbr: "Lr", color: "#31A8FF" },
];

export function ToolsSection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();

  return (
    <section className="relative w-full px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span
            className="inline-block uppercase tracking-widest mb-6"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
          >
            — {t("tools.badge")}
          </span>
        </div>

        {/* Tools as elegant horizontal strip */}
        <div className="flex flex-wrap gap-3">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className="group flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 cursor-default"
              style={{
                border: `1px solid ${p.cardBorder}`,
                background: p.cardBg,
                transform: "translateZ(0)",
              }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${tool.color}12`,
                  border: `1px solid ${tool.color}20`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: tool.color,
                  }}
                >
                  {tool.abbr}
                </span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  color: r(0.5),
                  fontWeight: 500,
                }}
              >
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
