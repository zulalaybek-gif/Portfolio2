import { motion } from "motion/react";
import { useRef, useState, useEffect, type RefObject } from "react";
import { Ear, Lightbulb, SlidersHorizontal, Rocket } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

const steps = [
  { icon: Ear, titleKey: "process.step1.title" as const, descKey: "process.step1.desc" as const, num: "01" },
  { icon: Lightbulb, titleKey: "process.step2.title" as const, descKey: "process.step2.desc" as const, num: "02" },
  { icon: SlidersHorizontal, titleKey: "process.step3.title" as const, descKey: "process.step3.desc" as const, num: "03" },
  { icon: Rocket, titleKey: "process.step4.title" as const, descKey: "process.step4.desc" as const, num: "04" },
];

function useInView(ref: RefObject<HTMLElement | null>, margin = "200px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;

    const fallbackTimer = window.setTimeout(() => {
      setInView(true);
    }, 1000);

    if (!("IntersectionObserver" in window)) {
      window.clearTimeout(fallbackTimer);
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(fallbackTimer);
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(ref.current);
    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [inView, ref, margin]);
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
          viewport={{ once: true, margin: "200px 0px" }}
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

        {/* Steps with segmented connector lines */}
        <div className="relative" ref={lineRef}>
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
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-[2.75rem] hidden lg:block h-[2px] overflow-visible"
                    style={{
                      left: "calc(50% + 2.75rem)",
                      width: "calc(100% - 5.5rem)",
                      zIndex: 0,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: r(0.045) }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: "100%",
                        background: `linear-gradient(90deg, ${accent} 0%, ${accent}88 72%, transparent 100%)`,
                        transform: isInView ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left center",
                        transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${0.65 + i * 0.28}s`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        right: -6,
                        width: 28,
                        height: 28,
                        background: `radial-gradient(circle, ${accent}55 0%, transparent 65%)`,
                        filter: "blur(8px)",
                        opacity: isInView ? 0.65 : 0,
                        transition: `opacity 0.7s ease ${1 + i * 0.28}s`,
                      }}
                    />
                  </div>
                )}

                {/* Node circle */}
                <div className="relative z-10 mb-7">
                  <motion.div
                    className="w-[5.5rem] h-[5.5rem] rounded-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: [0, -3, 0] } : { opacity: 0, scale: 0.86, y: 0 }}
                    transition={{
                      opacity: { duration: 0.45, delay: 0.45 + i * 0.22 },
                      scale: { duration: 0.55, delay: 0.45 + i * 0.22, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 4.2, delay: 1.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    style={{
                      background: isDark
                        ? `radial-gradient(circle at 45% 35%, rgba(139,173,74,0.18) 0%, rgba(139,173,74,0.055) 58%, rgba(12,12,12,0.96) 100%)`
                        : `radial-gradient(circle at 45% 35%, rgba(74,107,42,0.13) 0%, rgba(74,107,42,0.035) 58%, rgba(252,250,247,0.96) 100%)`,
                      border: `1px solid ${isDark ? "rgba(139,173,74,0.20)" : "rgba(74,107,42,0.16)"}`,
                      boxShadow: isDark
                        ? `0 18px 55px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 28px rgba(139,173,74,0.08)`
                        : `0 18px 55px rgba(74,107,42,0.07), inset 0 1px 0 rgba(255,255,255,0.75), 0 0 28px rgba(74,107,42,0.08)`,
                      transform: "translateZ(0)",
                    }}
                  >
                    <motion.div
                      animate={isInView ? { rotate: [0, -3, 3, 0], scale: [1, 1.04, 1] } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 3.8, delay: 1.35 + i * 0.24, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <step.icon size={24} strokeWidth={1.8} style={{ color: accent }} />
                    </motion.div>
                  </motion.div>
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
