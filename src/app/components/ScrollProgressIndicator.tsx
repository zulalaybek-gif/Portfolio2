import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useTheme } from "./theme";

export function ScrollProgressIndicator() {
  const { isDark, r } = useTheme();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.45,
  });
  const reduceMotion = useReducedMotion();
  const progress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <div
      className="scroll-progress-indicator"
      aria-hidden="true"
      style={{
        ["--scroll-progress-track" as string]: r(isDark ? 0.08 : 0.1),
        ["--scroll-progress-fill" as string]: isDark ? "rgba(190, 220, 88, 0.82)" : "rgba(74, 107, 42, 0.72)",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(190, 220, 88, 0.32)" : "rgba(74, 107, 42, 0.22)",
      }}
    >
      <div className="scroll-progress-indicator__track">
        <motion.div
          className="scroll-progress-indicator__fill"
          style={{ scaleY: progress }}
        >
          <span className="scroll-progress-indicator__tip" />
        </motion.div>
      </div>
    </div>
  );
}
