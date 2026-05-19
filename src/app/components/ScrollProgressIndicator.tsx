import { motion, useScroll } from "motion/react";
import { useTheme } from "./theme";

export function ScrollProgressIndicator() {
  const { isDark, r } = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="scroll-progress-indicator"
      aria-hidden="true"
      style={{
        ["--scroll-progress-track" as string]: r(isDark ? 0.28 : 0.3),
        ["--scroll-progress-fill" as string]: isDark ? "rgba(190, 220, 88, 1)" : "rgba(74, 107, 42, 1)",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(190, 220, 88, 0.58)" : "rgba(74, 107, 42, 0.46)",
      }}
    >
      <div className="scroll-progress-indicator__track">
        <motion.div
          className="scroll-progress-indicator__fill"
          style={{ scaleX: scrollYProgress }}
        >
          <span className="scroll-progress-indicator__tip" />
        </motion.div>
      </div>
    </div>
  );
}
