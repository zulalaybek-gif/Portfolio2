import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Global cinematic palette ── */
const palettes = {
  dark: {
    pageBg: "#050B14",
    containerBg: "linear-gradient(180deg, rgba(9,18,31,0.94) 0%, rgba(6,13,24,0.96) 42%, rgba(8,15,28,0.95) 100%)",
    containerBorder: "rgba(127,214,255,0.08)",
    containerShadow: "0 0 120px rgba(0,0,0,0.72), inset 0 1px 0 rgba(244,245,247,0.045), 0 0 80px rgba(93,169,255,0.055), 0 0 110px rgba(123,45,82,0.04)",
    text: "#F4F5F7",
    textInvert: "#0D1B2A",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(160deg, rgba(127,214,255,0.06) 0%, rgba(244,245,247,0.018) 52%, rgba(123,45,82,0.035) 100%)",
    cardBorder: "rgba(127,214,255,0.08)",
    cardBorderHover: "rgba(127,214,255,0.22)",
    // CTA section
    ctaBg: "linear-gradient(160deg, rgba(45,91,255,0.1) 0%, rgba(9,18,31,0.96) 42%, rgba(5,11,20,0.99) 100%)",
    ctaBorder: "rgba(127,214,255,0.09)",
    // Nav
    navPillBg: "rgba(244,245,247,0.055)",
    navPillBorder: "rgba(127,214,255,0.14)",
    navActiveTxt: "#F4F5F7",
    navActiveGrad: "linear-gradient(135deg, #11263C 0%, #2D5BFF 54%, #7FD6FF 125%)",
    // Footer
    footerBorder: "rgba(255,255,255,0.05)",
    // Badge
    badgeBg: "rgba(127,214,255,0.055)",
    badgeBorder: "rgba(127,214,255,0.18)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(12,27,42,0.99), rgba(5,11,20,0.99))",
    modalOverlay: "rgba(4,9,17,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(127,214,255,0.035)",
  },
  light: {
    pageBg: "#E9EDF3",
    containerBg: "linear-gradient(180deg, rgba(244,245,247,0.94) 0%, rgba(233,237,243,0.96) 42%, rgba(244,245,247,0.94) 100%)",
    containerBorder: "rgba(13,27,42,0.08)",
    containerShadow: "0 0 110px rgba(13,27,42,0.075), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 70px rgba(93,169,255,0.1), 0 0 90px rgba(216,199,209,0.18)",
    text: "#0D1B2A",
    textInvert: "#F4F5F7",
    textBase: "13,27,42",
    surfaceBase: "13,27,42",
    textClass: "text-[#0D1B2A]",
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.62) 0%, rgba(233,237,243,0.48) 56%, rgba(216,199,209,0.22) 100%)",
    cardBorder: "rgba(13,27,42,0.07)",
    cardBorderHover: "rgba(45,91,255,0.22)",
    ctaBg: "linear-gradient(160deg, rgba(93,169,255,0.14) 0%, rgba(244,245,247,0.95) 46%, rgba(216,199,209,0.24) 100%)",
    ctaBorder: "rgba(13,27,42,0.08)",
    navPillBg: "rgba(244,245,247,0.62)",
    navPillBorder: "rgba(13,27,42,0.09)",
    navActiveTxt: "#F4F5F7",
    navActiveGrad: "linear-gradient(135deg, #0D1B2A 0%, #2D5BFF 58%, #7FD6FF 130%)",
    footerBorder: "rgba(13,27,42,0.08)",
    badgeBg: "rgba(255,255,255,0.54)",
    badgeBorder: "rgba(13,27,42,0.12)",
    modalBg: "linear-gradient(160deg, rgba(244,245,247,0.99), rgba(233,237,243,0.99))",
    modalOverlay: "rgba(233,237,243,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(244,245,247,0.55)",
    dividerLine: "rgba(13,27,42,0.045)",
  },
} as const;

export type Palette = (typeof palettes)["dark"];

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  isDark: boolean;
  p: Palette;
  /** rgba helper: r(0.6) => "rgba(255,255,255,0.6)" in dark, "rgba(0,0,0,0.6)" in light */
  r: (opacity: number) => string;
  /** surface rgba for backgrounds */
  sr: (opacity: number) => string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("site-theme") as Theme | null;
      if (saved === "dark" || saved === "light") return saved;
    }
    return "dark";
  });

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("site-theme", t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const isDark = theme === "dark";
  const p = palettes[theme];

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    document.body.style.background = p.pageBg;
  }, [isDark, p.pageBg, theme]);

  const r = useCallback(
    (opacity: number) => `rgba(${p.textBase},${opacity})`,
    [p.textBase]
  );

  const sr = useCallback(
    (opacity: number) => `rgba(${p.surfaceBase},${opacity})`,
    [p.surfaceBase]
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggle, isDark, p, r, sr }),
    [theme, setTheme, toggle, isDark, p, r, sr]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
