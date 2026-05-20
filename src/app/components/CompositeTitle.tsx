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
    ? "linear-gradient(125deg, #FFD166 0%, #6F4A86 28%, #00B4D8 55%, #0077B6 74%, #FFD166 100%)"
    : "linear-gradient(125deg, #261732 0%, #B8872E 32%, #0077B6 58%, #00B4D8 74%, #261732 100%)";

  return (
    <Tag
      className={`composite-title composite-title--${size} composite-title--${align} ${className}`}
      style={{
        ["--composite-title-color" as string]: p.text,
        ["--composite-accent" as string]: isDark ? "#FFD166" : "#261732",
        ["--composite-accent-gradient" as string]: accentGradient,
      }}
    >
      <span className="composite-title__primary">{primary}</span>
      <span className="composite-title__secondary">{secondary}</span>
    </Tag>
  );
}
