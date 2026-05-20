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
        ["--scroll-progress-track" as string]: isDark ? "rgba(12, 4, 28, 0.96)" : "rgba(34, 13, 80, 0.58)",
        ["--scroll-progress-track-edge" as string]: isDark ? "rgba(255, 244, 234, 0.09)" : "rgba(99, 6, 97, 0.18)",
        ["--scroll-progress-fill" as string]: "#220D50",
        ["--scroll-progress-fill-2" as string]: "#630661",
        ["--scroll-progress-fill-3" as string]: "#F9AB60",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(249, 171, 96, 0.32)" : "rgba(99, 6, 97, 0.22)",
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
