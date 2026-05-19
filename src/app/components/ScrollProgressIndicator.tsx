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
        ["--scroll-progress-track" as string]: r(isDark ? 0.16 : 0.18),
        ["--scroll-progress-fill" as string]: isDark ? "rgba(190, 220, 88, 0.96)" : "rgba(74, 107, 42, 0.94)",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(190, 220, 88, 0.44)" : "rgba(74, 107, 42, 0.34)",
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
