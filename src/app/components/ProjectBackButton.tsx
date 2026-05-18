import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

type ProjectBackButtonProps = {
  children: ReactNode;
  onClick: () => void;
  delay?: number;
  top?: string;
  style?: CSSProperties;
};

export function ProjectBackButton({
  children,
  onClick,
  delay = 0.8,
  top = "1.5rem",
  style,
}: ProjectBackButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className="project-back-button group flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.05] active:scale-[0.97]"
      style={{
        position: "fixed",
        top: `max(${top}, env(safe-area-inset-top))`,
        left: "max(1.5rem, env(safe-area-inset-left))",
        zIndex: 2147483000,
        maxWidth: "calc(100vw - 3rem)",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.03em",
        ...style,
      }}
    >
      <ArrowLeft size={13} className="shrink-0 transition-transform group-hover:-translate-x-1" />
      <span className="truncate">{children}</span>
    </motion.button>,
    document.body
  );
}
