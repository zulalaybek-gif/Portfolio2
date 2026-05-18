import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

export function CTASection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const glowColor = isDark ? "139,173,74" : "74,107,42";

  return (
    <section data-section="cta" data-section-alias="about" className="relative w-full px-6 md:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "200px 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] p-12 md:p-24"
        style={{
          background: isDark
            ? `linear-gradient(145deg, rgba(${glowColor},0.12) 0%, rgba(14,14,14,0.98) 34%, rgba(8,8,8,0.99) 100%)`
            : `linear-gradient(145deg, rgba(${glowColor},0.075) 0%, rgba(252,250,247,0.99) 38%, rgba(248,246,242,0.98) 100%)`,
          border: `1px solid ${p.ctaBorder}`,
          boxShadow: isDark
            ? `0 28px 90px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 80px rgba(${glowColor},0.04)`
            : `0 28px 90px rgba(42,35,24,0.08), inset 0 1px 0 rgba(255,255,255,0.85), 0 0 90px rgba(${glowColor},0.08)`,
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: isDark ? 0.38 : 0.42, x: [0, 18, -8, 0], y: [0, -10, 8, 0] }}
          viewport={{ once: true }}
          transition={{ opacity: { duration: 1.2, delay: 0.25 }, x: { duration: 12, repeat: Infinity, ease: "easeInOut" }, y: { duration: 13, repeat: Infinity, ease: "easeInOut" } }}
          style={{
            width: "clamp(260px, 34vw, 520px)",
            height: "clamp(260px, 34vw, 520px)",
            left: "8%",
            top: "-22%",
            background: `radial-gradient(circle, rgba(${glowColor},0.22), transparent 68%)`,
            filter: "blur(18px)",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: "10%",
            right: "10%",
            bottom: 0,
            height: 1,
            transformOrigin: "center",
            background: `linear-gradient(90deg, transparent, rgba(${glowColor},0.32), transparent)`,
          }}
        />

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
                textShadow: isDark ? "0 18px 55px rgba(0,0,0,0.34)" : "0 18px 55px rgba(42,35,24,0.08)",
                transition: "color 0.5s ease",
              }}
            >
              {t("cta.title1" as TranslationKey)}
            </h2>
            <span
              style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.7rem, 3.8vw, 2.5rem)",
                fontWeight: 400,
                color: accent,
                display: "block",
                marginTop: "-0.05em",
                textShadow: `0 12px 38px rgba(${glowColor},0.16)`,
              }}
            >
              {t("cta.title2" as TranslationKey)}
            </span>
          </div>

          {/* Button */}
          <a
            href="mailto:zulal.aybek@gmail.com"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-500 hover:scale-[1.035] active:scale-[0.985]"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${accent} 0%, #A7C95A 52%, ${accent} 100%)`
                : `linear-gradient(135deg, ${accent} 0%, #5E8135 100%)`,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: isDark ? "#0a0a0a" : "#ffffff",
              textDecoration: "none",
              boxShadow: isDark
                ? `0 16px 46px rgba(${glowColor},0.18), inset 0 1px 0 rgba(255,255,255,0.28)`
                : `0 16px 46px rgba(${glowColor},0.18), inset 0 1px 0 rgba(255,255,255,0.18)`,
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
