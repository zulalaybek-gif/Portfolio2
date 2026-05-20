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
    ? "linear-gradient(128deg, #F9AB60 0%, #630661 44%, #F9AB60 82%, #220D50 100%)"
    : "linear-gradient(128deg, #630661 0%, #220D50 42%, #F9AB60 78%, #630661 100%)";

  return (
    <Tag
      className={`composite-title composite-title--${size} composite-title--${align} ${className}`}
      style={{
        ["--composite-title-color" as string]: p.text,
        ["--composite-accent" as string]: isDark ? "#F9AB60" : "#630661",
        ["--composite-accent-gradient" as string]: accentGradient,
      }}
    >
      <span className="composite-title__primary">{primary}</span>
      <span className="composite-title__secondary">{secondary}</span>
    </Tag>
  );
}
