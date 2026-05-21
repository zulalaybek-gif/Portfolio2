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
        ["--scroll-progress-track" as string]: isDark ? "rgba(5, 11, 20, 0.96)" : "rgba(13, 27, 42, 0.36)",
        ["--scroll-progress-track-edge" as string]: isDark ? "rgba(127, 214, 255, 0.11)" : "rgba(93, 169, 255, 0.18)",
        ["--scroll-progress-fill" as string]: isDark ? "#7FD6FF" : "#0D1B2A",
        ["--scroll-progress-fill-2" as string]: "#5DA9FF",
        ["--scroll-progress-fill-3" as string]: "#7B2D52",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(127, 214, 255, 0.3)" : "rgba(93, 169, 255, 0.2)",
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
