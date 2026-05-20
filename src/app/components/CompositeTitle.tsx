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
    ? "linear-gradient(128deg, #C7A46A 0%, #0E5C78 34%, #5EAFC0 70%, #201326 100%)"
    : "linear-gradient(128deg, #201326 0%, #0E5C78 46%, #5EAFC0 72%, #9D674B 100%)";

  return (
    <Tag
      className={`composite-title composite-title--${size} composite-title--${align} ${className}`}
      style={{
        ["--composite-title-color" as string]: p.text,
        ["--composite-accent" as string]: isDark ? "#5EAFC0" : "#0E5C78",
        ["--composite-accent-gradient" as string]: accentGradient,
      }}
    >
      <span className="composite-title__primary">{primary}</span>
      <span className="composite-title__secondary">{secondary}</span>
    </Tag>
  );
}
