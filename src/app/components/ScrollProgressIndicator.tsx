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
        ["--scroll-progress-track" as string]: isDark ? "rgba(5, 9, 14, 0.96)" : "rgba(15, 23, 32, 0.58)",
        ["--scroll-progress-track-edge" as string]: isDark ? "rgba(230, 232, 235, 0.1)" : "rgba(0, 119, 182, 0.24)",
        ["--scroll-progress-fill" as string]: "rgba(0, 119, 182, 1)",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(0, 180, 216, 0.5)" : "rgba(0, 180, 216, 0.34)",
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
