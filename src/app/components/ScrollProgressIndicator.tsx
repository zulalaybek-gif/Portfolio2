import { motion, useScroll } from "motion/react";
import { useTheme } from "./theme";

export function ScrollProgressIndicator() {
  const { isDark } = useTheme();
  const { scrollYProgress } = useScroll();

  return (
    <div
      className="scroll-progress-indicator"
      aria-hidden="true"
      style={{
        ["--scroll-progress-track" as string]: isDark ? "rgba(5, 5, 4, 0.95)" : "rgba(23, 23, 19, 0.5)",
        ["--scroll-progress-track-edge" as string]: isDark ? "rgba(245, 241, 232, 0.08)" : "rgba(91, 98, 77, 0.24)",
        ["--scroll-progress-fill" as string]: isDark ? "rgba(199, 202, 166, 1)" : "rgba(91, 98, 77, 1)",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(167, 173, 139, 0.42)" : "rgba(54, 42, 68, 0.32)",
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
