import { type ReactNode } from "react";
import { useTheme } from "./theme";

type CompositeTitleProps = {
  primary: ReactNode;
  secondary: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  size?: "hero" | "section" | "cta" | "projects";
  className?: string;
};

export function CompositeTitle({
  primary,
  secondary,
  as: Tag = "h2",
  align = "left",
  size = "section",
  className = "",
}: CompositeTitleProps) {
  const { p, isDark } = useTheme();
  const accentGradient = isDark
    ? "linear-gradient(135deg, #00B4D8 0%, #E6E8EB 46%, #FFD166 100%)"
    : "linear-gradient(135deg, #0077B6 0%, #00B4D8 48%, #0F1720 100%)";

  return (
    <Tag
      className={`composite-title composite-title--${size} composite-title--${align} ${className}`}
      style={{
        ["--composite-title-color" as string]: p.text,
        ["--composite-accent" as string]: isDark ? "#00B4D8" : "#0077B6",
        ["--composite-accent-gradient" as string]: accentGradient,
      }}
    >
      <span className="composite-title__primary">{primary}</span>
      <span className="composite-title__secondary">{secondary}</span>
    </Tag>
  );
}
