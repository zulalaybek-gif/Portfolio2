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
    ? "linear-gradient(128deg, #7FD6FF 0%, #5DA9FF 38%, #2D5BFF 70%, #7B2D52 118%)"
    : "linear-gradient(128deg, #0D1B2A 0%, #5DA9FF 48%, #7B2D52 100%)";

  return (
    <Tag
      className={`composite-title composite-title--${size} composite-title--${align} ${className}`}
      style={{
        ["--composite-title-color" as string]: p.text,
        ["--composite-accent" as string]: isDark ? "#7FD6FF" : "#5DA9FF",
        ["--composite-accent-gradient" as string]: accentGradient,
      }}
    >
      <span className="composite-title__primary">{primary}</span>
      <span className="composite-title__secondary">{secondary}</span>
    </Tag>
  );
}
