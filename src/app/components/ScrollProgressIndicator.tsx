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
        ["--scroll-progress-track" as string]: isDark ? "rgba(18, 20, 18, 0.96)" : "rgba(35, 38, 36, 0.52)",
        ["--scroll-progress-track-edge" as string]: isDark ? "rgba(241, 241, 241, 0.09)" : "rgba(75, 129, 151, 0.18)",
        ["--scroll-progress-fill" as string]: "#B9F21D",
        ["--scroll-progress-fill-2" as string]: "#4B8197",
        ["--scroll-progress-fill-3" as string]: "#C12144",
        ["--scroll-progress-glow" as string]: isDark ? "rgba(223, 244, 64, 0.3)" : "rgba(75, 129, 151, 0.2)",
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
