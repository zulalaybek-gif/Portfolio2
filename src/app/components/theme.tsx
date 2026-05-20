import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Original global palette ── */
const palettes = {
  dark: {
    pageBg: "#030303",
    containerBg: "linear-gradient(180deg, rgba(12,12,12,0.88) 0%, rgba(8,8,8,0.92) 30%, rgba(10,10,10,0.90) 100%)",
    containerBorder: "rgba(255,255,255,0.04)",
    containerShadow: "0 0 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03), 0 0 40px rgba(139,196,138,0.015)",
    text: "#ffffff",
    textInvert: "#0a0a0a",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
    cardBorder: "rgba(255,255,255,0.05)",
    cardBorderHover: "rgba(255,255,255,0.15)",
    // CTA section
    ctaBg: "linear-gradient(160deg, rgba(60,100,60,0.1) 0%, rgba(20,20,20,0.95) 40%, rgba(10,10,10,0.98) 100%)",
    ctaBorder: "rgba(255,255,255,0.05)",
    // Nav
    navPillBg: "rgba(255,255,255,0.05)",
    navPillBorder: "rgba(255,255,255,0.10)",
    navActiveTxt: "#0a0a0a",
    navActiveGrad: "linear-gradient(135deg, #B9F21D 0%, #76B900 100%)",
    // Footer
    footerBorder: "rgba(255,255,255,0.05)",
    // Badge
    badgeBg: "rgba(255,255,255,0.03)",
    badgeBorder: "rgba(255,255,255,0.15)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(22,22,22,0.99), rgba(10,10,10,0.99))",
    modalOverlay: "rgba(5,5,5,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(255,255,255,0.015)",
  },
  light: {
    pageBg: "#ece8e1",
    containerBg: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,246,242,0.95) 30%, rgba(252,250,247,0.93) 100%)",
    containerBorder: "rgba(0,0,0,0.06)",
    containerShadow: "0 0 100px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 40px rgba(75,129,151,0.04)",
    text: "#1a1a1a",
    textInvert: "#ffffff",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#1a1a1a]",
    cardBg: "linear-gradient(160deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
    cardBorder: "rgba(0,0,0,0.06)",
    cardBorderHover: "rgba(0,0,0,0.15)",
    ctaBg: "linear-gradient(160deg, rgba(75,129,151,0.08) 0%, rgba(245,243,240,0.98) 40%, rgba(250,248,245,0.99) 100%)",
    ctaBorder: "rgba(0,0,0,0.06)",
    navPillBg: "rgba(0,0,0,0.04)",
    navPillBorder: "rgba(0,0,0,0.08)",
    navActiveTxt: "#ffffff",
    navActiveGrad: "linear-gradient(135deg, #232624 0%, #4B8197 100%)",
    footerBorder: "rgba(0,0,0,0.06)",
    badgeBg: "rgba(0,0,0,0.03)",
    badgeBorder: "rgba(0,0,0,0.10)",
    modalBg: "linear-gradient(160deg, rgba(255,255,255,0.99), rgba(248,246,242,0.99))",
    modalOverlay: "rgba(240,237,230,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(255,255,255,0.55)",
    dividerLine: "rgba(0,0,0,0.04)",
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
