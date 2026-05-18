import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

export function CTASection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";

  return (
    <section data-section="cta" data-section-alias="about" className="relative w-full px-6 md:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "200px 0px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] p-12 md:p-20"
        style={{
          background: p.ctaBg,
          border: `1px solid ${p.ctaBorder}`,
        }}
      >
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <span
            className="inline-block uppercase tracking-widest mb-8"
            style={{
              fontSize: "0.65rem",
              fontFamily: "'Inter', sans-serif",
              color: r(0.35),
              letterSpacing: "0.15em",
            }}
          >
            — {t("cta.badge" as TranslationKey)}
          </span>

          {/* Title */}
          <div className="mb-10">
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: p.text,
                transition: "color 0.5s ease",
              }}
            >
              {t("cta.title1" as TranslationKey)}
            </h2>
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
                fontWeight: 400,
                color: accent,
                display: "block",
                marginTop: "-0.05em",
              }}
            >
              {t("cta.title2" as TranslationKey)}
            </span>
          </div>

          {/* Button */}
          <a
            href="mailto:zulal.aybek@gmail.com"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: accent,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: isDark ? "#0a0a0a" : "#ffffff",
              textDecoration: "none",
            }}
          >
            {t("cta.button")}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
