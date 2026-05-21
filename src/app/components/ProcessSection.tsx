import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState, useEffect, type RefObject } from "react";
import { Ear, Lightbulb, SlidersHorizontal, Rocket } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { CompositeTitle } from "./CompositeTitle";
import { AmbientMovingLines } from "./AmbientMovingLines";

const steps = [
  { icon: Ear, titleKey: "process.step1.title" as const, descKey: "process.step1.desc" as const, num: "01" },
  { icon: Lightbulb, titleKey: "process.step2.title" as const, descKey: "process.step2.desc" as const, num: "02" },
  { icon: SlidersHorizontal, titleKey: "process.step3.title" as const, descKey: "process.step3.desc" as const, num: "03" },
  { icon: Rocket, titleKey: "process.step4.title" as const, descKey: "process.step4.desc" as const, num: "04" },
];

const CYAN_ACCENT = "#7FD6FF";
const LIGHT_CYAN_ACCENT = "#39C9D6";
const BLUE_ACCENT = "#2F6BFF";
const BERRY_ACCENT = "#9B214F";

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
  const stepAccents = isDark
    ? [CYAN_ACCENT, "#5DA9FF", "#A34A6A", CYAN_ACCENT]
    : [LIGHT_CYAN_ACCENT, BLUE_ACCENT, BERRY_ACCENT, "#5DA9FF"];
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduceMotion) return;
    const revealProgress = Math.min(1, Math.max(0, (latest - 0.08) / 0.84));
    const nextCount = Math.max(1, Math.min(steps.length, Math.floor(revealProgress * steps.length) + 1));
    setRevealedCount((current) => (current === nextCount ? current : nextCount));
  });

  useEffect(() => {
    if (reduceMotion || isInView) {
      setRevealedCount((current) => (current > 0 ? current : 1));
    }
    if (reduceMotion) {
      setRevealedCount(steps.length);
    }
  }, [isInView, reduceMotion]);

  return (
    <section ref={sectionRef} className="relative w-full px-6 md:px-12 py-24 md:py-0 lg:min-h-[380vh]">
      <AmbientMovingLines className="absolute inset-x-0 top-[18%] z-0" height="54%" opacity={isDark ? 0.15 : 0.1} />
      <div className="relative z-10 max-w-6xl mx-auto lg:sticky lg:top-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px 0px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-14"
        >
          <span
            className="section-eyebrow inline-block uppercase tracking-widest mb-5"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
          >
            — {t("process.badge")}
          </span>
          <div>
            <CompositeTitle
              primary={t("process.title1" as TranslationKey)}
              secondary={t("process.title2" as TranslationKey)}
            />
          </div>
        </motion.div>

        {/* Steps with segmented connector lines */}
        <div className="relative" ref={lineRef}>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "160px 0px" }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
              lineHeight: 1.75,
              color: r(isDark ? 0.72 : 0.76),
              textWrap: "pretty",
            }}
          >
            {t("process.intro")}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => {
              const isHovered = hoveredIdx === i;
              const shouldGlowLine = hoveredIdx === i || hoveredIdx === i + 1;
              const isStepVisible = reduceMotion || i < revealedCount;
              const isStepActive = reduceMotion || i === revealedCount - 1;
              const isLineVisible = reduceMotion || i + 1 < revealedCount;
              const stepAccent = stepAccents[i % stepAccents.length];
              const nextAccent = stepAccents[(i + 1) % stepAccents.length];

              return (
                <div
                  key={step.num}
                  className="relative flex flex-col items-center text-center px-4 outline-none"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(i)}
                  onBlur={() => setHoveredIdx(null)}
                  tabIndex={0}
                  style={{
                    opacity: isStepVisible ? 1 : 0,
                    transform: isStepVisible ? "translateY(0) scale(1)" : "translateY(44px) scale(0.96)",
                    transition: "opacity 0.72s ease, transform 0.82s cubic-bezier(0.16, 1, 0.3, 1)",
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
                      style={{ background: isDark ? "rgba(127,214,255,0.1)" : "rgba(13,27,42,0.085)" }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: "100%",
                        background: `linear-gradient(90deg, ${stepAccent} 0%, color-mix(in srgb, ${stepAccent} 45%, ${nextAccent}) 52%, ${nextAccent} 100%)`,
                        boxShadow: shouldGlowLine ? `0 0 18px ${stepAccent}30` : "none",
                        opacity: shouldGlowLine ? 0.95 : 0.72,
                        transform: isLineVisible ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left center",
                        transition: "transform 1.05s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms ease, opacity 260ms ease",
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        right: -6,
                        width: 28,
                        height: 28,
                        background: `radial-gradient(circle, ${nextAccent}38 0%, transparent 68%)`,
                        filter: "blur(10px)",
                        opacity: isLineVisible ? 0.48 : 0,
                        transition: "opacity 0.7s ease",
                      }}
                    />
                  </div>
                )}

                {/* Node circle */}
                <div className="relative z-10 mb-7 flex flex-col items-center">
                  <span
                    className="mb-3 block uppercase tracking-[0.26em]"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: stepAccent,
                      opacity: isStepVisible ? (isHovered || isStepActive ? 0.92 : 0.72) : 0,
                      transform: isStepVisible ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 0.48s ease ${0.55 + i * 0.22}s, transform 0.48s cubic-bezier(0.16, 1, 0.3, 1) ${0.55 + i * 0.22}s`,
                    }}
                  >
                    {step.num}
                  </span>
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-[-1.15rem] rounded-full pointer-events-none"
                    animate={{
                      opacity: isHovered || isStepActive ? (isDark ? 0.58 : 0.36) : 0,
                      scale: isHovered ? [0.88, 1.12, 1.02] : isStepActive ? [0.84, 1.08, 0.96] : 0.72,
                    }}
                    transition={{ duration: isHovered ? 0.7 : 1.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: `radial-gradient(circle, ${stepAccent}40 0%, ${stepAccent}18 38%, transparent 72%)`,
                      filter: "blur(12px)",
                    }}
                  />
                  <motion.div
                    className="w-[5.5rem] h-[5.5rem] rounded-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={
                      isStepVisible
                        ? isHovered
                          ? { opacity: 1, scale: 1.08, y: -7 }
                          : isStepActive
                            ? { opacity: 1, scale: [0.94, 1.06, 1], y: [0, -5, 0] }
                            : { opacity: 0.82, scale: 0.98, y: 0 }
                        : { opacity: 0, scale: 0.86, y: 0 }
                    }
                    transition={{
                      opacity: { duration: 0.5 },
                      scale: { duration: isStepActive ? 0.95 : 0.55, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: isStepActive ? 0.95 : 0.55, ease: "easeInOut" },
                    }}
                    style={{
                      background: isDark
                        ? `radial-gradient(circle at 45% 35%, color-mix(in srgb, ${stepAccent} 16%, rgba(13,27,42,0.98)) 0%, rgba(13,27,42,0.96) 68%, rgba(5,11,20,0.98) 100%)`
                        : `radial-gradient(circle at 45% 35%, color-mix(in srgb, ${stepAccent} 10%, rgba(255,255,255,0.98)) 0%, color-mix(in srgb, ${stepAccent} 4%, rgba(244,245,247,0.98)) 64%, rgba(244,245,247,0.98) 100%)`,
                      border: `1px solid ${isDark ? `${stepAccent}44` : `${stepAccent}36`}`,
                      boxShadow: isDark
                        ? `0 18px 55px rgba(0,0,0,0.3), inset 0 1px 0 rgba(244,245,247,0.05), 0 0 ${isHovered ? 42 : 22}px ${stepAccent}${isHovered ? "2f" : "1a"}`
                        : `0 18px 46px rgba(13,27,42,0.065), inset 0 1px 0 rgba(255,255,255,0.86), 0 0 ${isHovered ? 34 : 18}px ${stepAccent}${isHovered ? "24" : "12"}`,
                      transform: "translateZ(0)",
                    }}
                  >
                    <motion.div
                      animate={
                        isHovered
                          ? { rotate: [0, -7, 8, 0], scale: [1, 1.16, 1.08] }
                          : isStepVisible
                            ? { rotate: [0, -3, 3, 0], scale: [1, 1.04, 1] }
                            : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: isHovered ? 0.9 : 3.8, delay: isHovered ? 0 : 1.35 + i * 0.24, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
                    >
                      <step.icon size={24} strokeWidth={1.8} style={{ color: stepAccent }} />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden w-[1px] h-8 mb-4 sm:hidden" style={{ background: `${stepAccent}44` }} />
                )}

                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: isHovered || isStepActive ? stepAccent : p.text,
                    transition: "color 260ms ease, transform 260ms ease",
                    transform: isHovered || isStepActive ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {t(step.titleKey)}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                    color: isHovered || isStepActive ? r(0.62) : r(0.4),
                    maxWidth: 200,
                    transition: "color 260ms ease",
                  }}
                >
                  {t(step.descKey)}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
