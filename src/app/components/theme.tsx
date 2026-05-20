import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Violet Flame global palette ── */
const palettes = {
  dark: {
    pageBg: "#220D50",
    containerBg: "radial-gradient(circle at 72% 8%, rgba(249,171,96,0.052), transparent 30%), radial-gradient(circle at 12% 30%, rgba(99,6,97,0.34), transparent 42%), radial-gradient(circle at 86% 72%, rgba(249,171,96,0.032), transparent 25%), linear-gradient(180deg, rgba(34,13,80,0.992) 0%, rgba(12,4,28,0.996) 50%, rgba(34,13,80,0.99) 100%)",
    containerBorder: "rgba(255,244,234,0.09)",
    containerShadow: "0 0 120px rgba(0,0,0,0.74), inset 0 1px 0 rgba(255,244,234,0.05), 0 0 96px rgba(99,6,97,0.22), 0 0 42px rgba(249,171,96,0.03)",
    text: "#FFF4EA",
    textInvert: "#220D50",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(150deg, rgba(255,244,234,0.048) 0%, rgba(99,6,97,0.11) 44%, rgba(249,171,96,0.024) 76%, rgba(255,244,234,0.012) 100%)",
    cardBorder: "rgba(255,244,234,0.075)",
    cardBorderHover: "rgba(249,171,96,0.24)",
    // CTA section
    ctaBg: "radial-gradient(circle at 20% 42%, rgba(99,6,97,0.38), transparent 38%), radial-gradient(circle at 72% 25%, rgba(249,171,96,0.052), transparent 25%), radial-gradient(circle at 72% 78%, rgba(249,171,96,0.04), transparent 34%), linear-gradient(145deg, rgba(34,13,80,0.992) 0%, rgba(12,4,28,0.994) 64%, rgba(34,13,80,0.99) 100%)",
    ctaBorder: "rgba(255,244,234,0.075)",
    // Nav
    navPillBg: "rgba(255,244,234,0.065)",
    navPillBorder: "rgba(255,244,234,0.13)",
    navActiveTxt: "#FFF4EA",
    navActiveGrad: "linear-gradient(135deg, #220D50 0%, #630661 56%, #F9AB60 140%)",
    // Footer
    footerBorder: "rgba(255,244,234,0.07)",
    // Badge
    badgeBg: "rgba(255,244,234,0.04)",
    badgeBorder: "rgba(249,171,96,0.2)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(34,13,80,0.99), rgba(12,4,28,0.99))",
    modalOverlay: "rgba(12,4,28,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(255,244,234,0.02)",
  },
  light: {
    pageBg: "#F8EDE8",
    containerBg: "radial-gradient(circle at 82% 8%, rgba(249,171,96,0.13), transparent 30%), radial-gradient(circle at 8% 26%, rgba(99,6,97,0.12), transparent 36%), radial-gradient(circle at 76% 76%, rgba(249,171,96,0.1), transparent 25%), linear-gradient(180deg, rgba(255,244,234,0.992) 0%, rgba(248,237,232,0.97) 48%, rgba(242,224,222,0.99) 100%)",
    containerBorder: "rgba(34,13,80,0.13)",
    containerShadow: "0 0 115px rgba(34,13,80,0.18), inset 0 1px 0 rgba(255,255,255,0.78), 0 0 78px rgba(99,6,97,0.085), 0 0 38px rgba(249,171,96,0.055)",
    text: "#220D50",
    textInvert: "#FFF4EA",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#220D50]",
    cardBg: "linear-gradient(150deg, rgba(34,13,80,0.058) 0%, rgba(99,6,97,0.046) 42%, rgba(249,171,96,0.035) 78%, rgba(255,255,255,0.24) 100%)",
    cardBorder: "rgba(34,13,80,0.105)",
    cardBorderHover: "rgba(99,6,97,0.23)",
    ctaBg: "radial-gradient(circle at 18% 42%, rgba(99,6,97,0.11), transparent 35%), radial-gradient(circle at 70% 22%, rgba(249,171,96,0.1), transparent 25%), linear-gradient(145deg, rgba(255,244,234,0.992) 0%, rgba(248,237,232,0.965) 50%, rgba(242,224,222,0.985) 100%)",
    ctaBorder: "rgba(34,13,80,0.105)",
    navPillBg: "rgba(34,13,80,0.06)",
    navPillBorder: "rgba(34,13,80,0.14)",
    navActiveTxt: "#FFF4EA",
    navActiveGrad: "linear-gradient(135deg, #220D50 0%, #630661 58%, #F9AB60 145%)",
    footerBorder: "rgba(34,13,80,0.08)",
    badgeBg: "rgba(34,13,80,0.045)",
    badgeBorder: "rgba(99,6,97,0.2)",
    modalBg: "linear-gradient(160deg, rgba(255,244,234,0.99), rgba(248,237,232,0.99))",
    modalOverlay: "rgba(255,244,234,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(255,244,234,0.55)",
    dividerLine: "rgba(34,13,80,0.045)",
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
