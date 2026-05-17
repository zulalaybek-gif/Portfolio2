import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Ear, Lightbulb, SlidersHorizontal, Rocket } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

const steps = [
  { icon: Ear, titleKey: "process.step1.title" as const, descKey: "process.step1.desc" as const, num: "01" },
  { icon: Lightbulb, titleKey: "process.step2.title" as const, descKey: "process.step2.desc" as const, num: "02" },
  { icon: SlidersHorizontal, titleKey: "process.step3.title" as const, descKey: "process.step3.desc" as const, num: "03" },
  { icon: Rocket, titleKey: "process.step4.title" as const, descKey: "process.step4.desc" as const, num: "04" },
];

function useInView(ref: React.RefObject<HTMLElement | null>, margin = "-100px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: margin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin]);
  return inView;
}

export function ProcessSection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef);

  return (
    <section className="relative w-full px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span
            className="inline-block uppercase tracking-widest mb-5"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
          >
            — {t("process.badge")}
          </span>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em", color: p.text }}>
              {t("process.title1" as TranslationKey)}
            </h2>
            <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, color: accent, display: "block", marginTop: "-0.1em" }}>
              {t("process.title2" as TranslationKey)}
            </span>
          </div>
        </motion.div>

        {/* Steps with animated connector line */}
        <div className="relative" ref={lineRef}>
          {/* Animated connector line — desktop only, starts at first node center, ends at last node center */}
          <div className="absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-[2px] hidden lg:block z-0 overflow-hidden rounded-full">
            {/* Background track */}
            <div className="absolute inset-0 rounded-full" style={{ background: r(0.04) }} />
            {/* Animated green fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accent}80)`,
                width: isInView ? "100%" : "0%",
                transition: "width 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            />
            {/* Glow effect on the tip */}
            <div
              className="absolute inset-y-0 rounded-full"
              style={{
                right: isInView ? "0%" : "100%",
                width: 40,
                background: `radial-gradient(circle, ${accent}60, transparent)`,
                filter: "blur(6px)",
                transition: "right 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center px-4"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${0.3 + i * 0.25}s, transform 0.6s ease ${0.3 + i * 0.25}s`,
                }}
              >
                {/* Node circle on the line */}
                <div className="relative z-10 mb-6">
                  <div
                    className="w-[5.5rem] h-[5.5rem] rounded-full flex items-center justify-center"
                    style={{
                      background: isDark
                        ? `radial-gradient(circle, rgba(139,173,74,0.08) 0%, rgba(139,173,74,0.02) 70%)`
                        : `radial-gradient(circle, rgba(74,107,42,0.08) 0%, rgba(74,107,42,0.02) 70%)`,
                      border: `1px solid ${isDark ? "rgba(139,173,74,0.15)" : "rgba(74,107,42,0.15)"}`,
                      transform: isInView ? "scale(1)" : "scale(0)",
                      transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.3}s`,
                    }}
                  >
                    <step.icon size={24} style={{ color: accent }} />
                  </div>
                  {/* Step number badge */}
                  <span
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: accent,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      color: isDark ? "#0a0a0a" : "#fff",
                      transform: isInView ? "scale(1)" : "scale(0)",
                      transition: `transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.7 + i * 0.3}s`,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden w-[1px] h-8 mb-4 sm:hidden" style={{ background: `${accent}30` }} />
                )}

                <h3
                  className="mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: p.text }}
                >
                  {t(step.titleKey)}
                </h3>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, color: r(0.4), maxWidth: 200 }}
                >
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
