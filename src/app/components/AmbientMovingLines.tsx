import { motion } from "motion/react";
import { useTheme } from "./theme";

function rgbaFromHex(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

type AmbientMovingLinesProps = {
  className?: string;
  accent?: string;
  secondary?: string;
  text?: string;
  opacity?: number;
  height?: string;
};

export function AmbientMovingLines({
  className = "absolute inset-0",
  accent,
  secondary,
  text,
  opacity,
  height = "100%",
}: AmbientMovingLinesProps) {
  const { isDark } = useTheme();
  const lineAccent = accent ?? (isDark ? "#DFF440" : "#4B8197");
  const lineSecondary = secondary ?? (isDark ? "#4B8197" : "#C12144");
  const lineText = text ?? (isDark ? "#F1F1F1" : "#232624");

  return (
    <div
      className={`${className} pointer-events-none overflow-hidden`}
      style={{ height }}
      aria-hidden="true"
    >
      <motion.svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity ?? (isDark ? 0.55 : 0.38) }}
        transition={{ duration: 1.2 }}
        style={{ transform: "translateZ(0)" }}
      >
        <defs>
          <linearGradient id="ambient-moving-lines-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={lineAccent} stopOpacity={isDark ? 0.65 : 0.5} />
            <stop offset="54%" stopColor={lineSecondary} stopOpacity={isDark ? 0.38 : 0.34} />
            <stop offset="100%" stopColor={lineText} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((item) => (
          <motion.path
            key={item}
            d={`M ${-160 + item * 90} ${640 - item * 150} C ${260 + item * 80} ${270 - item * 40}, ${650 + item * 90} ${850 - item * 120}, ${1620 - item * 120} ${210 + item * 95}`}
            fill="none"
            stroke="url(#ambient-moving-lines-stroke)"
            strokeWidth={item === 1 ? 2 : 1.25}
            strokeLinecap="round"
            strokeDasharray="14 22"
            initial={{ pathLength: 0, pathOffset: 0.2 }}
            animate={{ pathLength: [0.2, 1, 0.2], pathOffset: [0.2, 0, 0.2] }}
            transition={{ duration: 16 + item * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d="M 1180 -120 C 980 140, 1040 380, 760 520 C 520 640, 360 720, 260 980"
          fill="none"
          stroke={rgbaFromHex(lineText, isDark ? 0.17 : 0.11)}
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="2 18"
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
}
