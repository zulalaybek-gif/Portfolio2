import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Carbon Signal global palette ── */
const palettes = {
  dark: {
    pageBg: "#181A18",
    containerBg: "radial-gradient(circle at 78% 8%, rgba(75,129,151,0.16), transparent 31%), radial-gradient(circle at 12% 30%, rgba(223,244,64,0.09), transparent 40%), radial-gradient(circle at 86% 72%, rgba(193,33,68,0.08), transparent 28%), linear-gradient(180deg, rgba(31,31,31,0.994) 0%, rgba(18,20,18,0.997) 48%, rgba(35,38,36,0.992) 100%)",
    containerBorder: "rgba(241,241,241,0.09)",
    containerShadow: "0 0 120px rgba(0,0,0,0.72), inset 0 1px 0 rgba(241,241,241,0.055), 0 0 84px rgba(75,129,151,0.13), 0 0 34px rgba(223,244,64,0.055)",
    text: "#F1F1F1",
    textInvert: "#232624",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(150deg, rgba(241,241,241,0.045) 0%, rgba(75,129,151,0.07) 45%, rgba(193,33,68,0.035) 76%, rgba(223,244,64,0.014) 100%)",
    cardBorder: "rgba(241,241,241,0.078)",
    cardBorderHover: "rgba(223,244,64,0.32)",
    // CTA section
    ctaBg: "radial-gradient(circle at 20% 42%, rgba(223,244,64,0.14), transparent 38%), radial-gradient(circle at 72% 24%, rgba(75,129,151,0.14), transparent 26%), radial-gradient(circle at 78% 78%, rgba(193,33,68,0.08), transparent 34%), linear-gradient(145deg, rgba(35,38,36,0.992) 0%, rgba(18,20,18,0.996) 64%, rgba(31,31,31,0.992) 100%)",
    ctaBorder: "rgba(241,241,241,0.08)",
    // Nav
    navPillBg: "rgba(241,241,241,0.06)",
    navPillBorder: "rgba(241,241,241,0.13)",
    navActiveTxt: "#232624",
    navActiveGrad: "linear-gradient(135deg, #DFF440 0%, #BDD62C 58%, #4B8197 150%)",
    // Footer
    footerBorder: "rgba(241,241,241,0.07)",
    // Badge
    badgeBg: "rgba(241,241,241,0.04)",
    badgeBorder: "rgba(223,244,64,0.2)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(35,38,36,0.99), rgba(18,20,18,0.99))",
    modalOverlay: "rgba(18,20,18,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(241,241,241,0.022)",
  },
  light: {
    pageBg: "#F1F1F1",
    containerBg: "radial-gradient(circle at 82% 8%, rgba(223,244,64,0.16), transparent 28%), radial-gradient(circle at 8% 26%, rgba(75,129,151,0.12), transparent 36%), radial-gradient(circle at 78% 78%, rgba(193,33,68,0.055), transparent 26%), linear-gradient(180deg, rgba(241,241,241,0.995) 0%, rgba(247,247,245,0.98) 48%, rgba(235,236,233,0.992) 100%)",
    containerBorder: "rgba(35,38,36,0.13)",
    containerShadow: "0 0 115px rgba(35,38,36,0.16), inset 0 1px 0 rgba(255,255,255,0.82), 0 0 78px rgba(75,129,151,0.08), 0 0 36px rgba(223,244,64,0.07)",
    text: "#232624",
    textInvert: "#F1F1F1",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#232624]",
    cardBg: "linear-gradient(150deg, rgba(35,38,36,0.05) 0%, rgba(75,129,151,0.04) 42%, rgba(223,244,64,0.04) 78%, rgba(255,255,255,0.3) 100%)",
    cardBorder: "rgba(35,38,36,0.11)",
    cardBorderHover: "rgba(193,33,68,0.24)",
    ctaBg: "radial-gradient(circle at 18% 42%, rgba(75,129,151,0.12), transparent 35%), radial-gradient(circle at 70% 22%, rgba(223,244,64,0.13), transparent 25%), linear-gradient(145deg, rgba(241,241,241,0.995) 0%, rgba(247,247,245,0.97) 50%, rgba(235,236,233,0.99) 100%)",
    ctaBorder: "rgba(35,38,36,0.11)",
    navPillBg: "rgba(35,38,36,0.06)",
    navPillBorder: "rgba(35,38,36,0.14)",
    navActiveTxt: "#232624",
    navActiveGrad: "linear-gradient(135deg, #DFF440 0%, #CFE83A 62%, #4B8197 150%)",
    footerBorder: "rgba(35,38,36,0.08)",
    badgeBg: "rgba(35,38,36,0.045)",
    badgeBorder: "rgba(75,129,151,0.2)",
    modalBg: "linear-gradient(160deg, rgba(241,241,241,0.99), rgba(247,247,245,0.99))",
    modalOverlay: "rgba(241,241,241,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(241,241,241,0.55)",
    dividerLine: "rgba(35,38,36,0.045)",
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
