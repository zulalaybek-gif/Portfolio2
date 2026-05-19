import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Color palette per theme ── */
const palettes = {
  dark: {
    pageBg: "#050504",
    containerBg: "linear-gradient(180deg, rgba(13,13,11,0.9) 0%, rgba(7,7,6,0.94) 34%, rgba(10,10,9,0.92) 100%)",
    containerBorder: "rgba(241,235,222,0.045)",
    containerShadow: "0 0 100px rgba(0,0,0,0.74), inset 0 1px 0 rgba(241,235,222,0.03), 0 0 52px rgba(54,42,68,0.055)",
    text: "#F5F1E8",
    textInvert: "#080806",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(160deg, rgba(241,235,222,0.042) 0%, rgba(241,235,222,0.012) 100%)",
    cardBorder: "rgba(241,235,222,0.055)",
    cardBorderHover: "rgba(188,181,160,0.18)",
    // CTA section
    ctaBg: "linear-gradient(160deg, rgba(126,132,105,0.085) 0%, rgba(18,18,16,0.96) 42%, rgba(8,8,7,0.99) 100%)",
    ctaBorder: "rgba(241,235,222,0.055)",
    // Nav
    navPillBg: "rgba(241,235,222,0.05)",
    navPillBorder: "rgba(241,235,222,0.10)",
    navActiveTxt: "#080806",
    navActiveGrad: "linear-gradient(135deg, #A7AD8B 0%, #747B61 100%)",
    // Footer
    footerBorder: "rgba(241,235,222,0.055)",
    // Badge
    badgeBg: "rgba(241,235,222,0.032)",
    badgeBorder: "rgba(188,181,160,0.16)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(20,20,18,0.99), rgba(8,8,7,0.99))",
    modalOverlay: "rgba(5,5,5,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(241,235,222,0.016)",
  },
  light: {
    pageBg: "#E7E1D5",
    containerBg: "linear-gradient(180deg, rgba(250,247,239,0.94) 0%, rgba(242,237,226,0.96) 34%, rgba(248,244,236,0.94) 100%)",
    containerBorder: "rgba(42,39,34,0.065)",
    containerShadow: "0 0 100px rgba(30,27,22,0.065), inset 0 1px 0 rgba(255,255,255,0.78), 0 0 42px rgba(54,42,68,0.035)",
    text: "#171713",
    textInvert: "#FAF7EF",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#171713]",
    cardBg: "linear-gradient(160deg, rgba(23,23,19,0.024) 0%, rgba(23,23,19,0.01) 100%)",
    cardBorder: "rgba(42,39,34,0.065)",
    cardBorderHover: "rgba(110,116,92,0.22)",
    ctaBg: "linear-gradient(160deg, rgba(126,132,105,0.07) 0%, rgba(245,241,232,0.98) 42%, rgba(250,247,239,0.99) 100%)",
    ctaBorder: "rgba(42,39,34,0.065)",
    navPillBg: "rgba(23,23,19,0.04)",
    navPillBorder: "rgba(42,39,34,0.085)",
    navActiveTxt: "#FAF7EF",
    navActiveGrad: "linear-gradient(135deg, #70775E 0%, #555B47 100%)",
    footerBorder: "rgba(42,39,34,0.065)",
    badgeBg: "rgba(23,23,19,0.032)",
    badgeBorder: "rgba(42,39,34,0.11)",
    modalBg: "linear-gradient(160deg, rgba(250,247,239,0.99), rgba(242,237,226,0.99))",
    modalOverlay: "rgba(231,225,213,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(250,247,239,0.55)",
    dividerLine: "rgba(42,39,34,0.04)",
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
