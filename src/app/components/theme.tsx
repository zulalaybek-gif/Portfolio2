import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Ocean & Mineral global palette ── */
const palettes = {
  dark: {
    pageBg: "#0F1720",
    containerBg: "radial-gradient(circle at 72% 8%, rgba(0,180,216,0.07), transparent 28%), radial-gradient(circle at 12% 30%, rgba(42,18,53,0.34), transparent 38%), radial-gradient(circle at 86% 72%, rgba(214,161,93,0.045), transparent 24%), linear-gradient(180deg, rgba(15,23,32,0.985) 0%, rgba(5,9,14,0.992) 48%, rgba(15,23,32,0.985) 100%)",
    containerBorder: "rgba(230,232,235,0.09)",
    containerShadow: "0 0 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(230,232,235,0.05), 0 0 96px rgba(42,18,53,0.22), 0 0 42px rgba(0,180,216,0.035)",
    text: "#E6E8EB",
    textInvert: "#0F1720",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(150deg, rgba(230,232,235,0.05) 0%, rgba(42,18,53,0.08) 42%, rgba(0,119,182,0.026) 72%, rgba(230,232,235,0.012) 100%)",
    cardBorder: "rgba(230,232,235,0.075)",
    cardBorderHover: "rgba(0,119,182,0.3)",
    // CTA section
    ctaBg: "radial-gradient(circle at 20% 42%, rgba(42,18,53,0.36), transparent 36%), radial-gradient(circle at 72% 25%, rgba(214,161,93,0.055), transparent 24%), radial-gradient(circle at 72% 78%, rgba(0,180,216,0.075), transparent 32%), linear-gradient(145deg, rgba(15,23,32,0.99) 0%, rgba(5,9,14,0.99) 62%, rgba(15,23,32,0.985) 100%)",
    ctaBorder: "rgba(230,232,235,0.075)",
    // Nav
    navPillBg: "rgba(230,232,235,0.065)",
    navPillBorder: "rgba(230,232,235,0.13)",
    navActiveTxt: "#E6E8EB",
    navActiveGrad: "linear-gradient(135deg, #0F1720 0%, #2A1235 42%, #0077B6 100%)",
    // Footer
    footerBorder: "rgba(230,232,235,0.07)",
    // Badge
    badgeBg: "rgba(230,232,235,0.04)",
    badgeBorder: "rgba(0,119,182,0.24)",
    // Modal
    modalBg: "linear-gradient(160deg, rgba(15,23,32,0.99), rgba(5,9,14,0.99))",
    modalOverlay: "rgba(5,9,14,0.92)",
    // Featured overlay
    imgOverlayTop: "rgba(10,10,10,0.2)",
    imgOverlayMid: "rgba(10,10,10,0.5)",
    imgOverlayBot: "rgba(10,10,10,0.9)",
    // Particle overlay divider center line
    dividerLine: "rgba(230,232,235,0.02)",
  },
  light: {
    pageBg: "#DCE2E8",
    containerBg: "radial-gradient(circle at 82% 8%, rgba(0,119,182,0.12), transparent 28%), radial-gradient(circle at 8% 26%, rgba(42,18,53,0.16), transparent 34%), radial-gradient(circle at 76% 76%, rgba(214,161,93,0.11), transparent 24%), radial-gradient(circle at 20% 82%, rgba(0,180,216,0.055), transparent 32%), linear-gradient(180deg, rgba(218,225,232,0.99) 0%, rgba(246,248,250,0.965) 42%, rgba(212,220,228,0.99) 100%)",
    containerBorder: "rgba(15,23,32,0.13)",
    containerShadow: "0 0 115px rgba(15,23,32,0.18), inset 0 1px 0 rgba(255,255,255,0.78), 0 0 78px rgba(42,18,53,0.1), 0 0 38px rgba(0,119,182,0.06)",
    text: "#0F1720",
    textInvert: "#E6E8EB",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#0F1720]",
    cardBg: "linear-gradient(150deg, rgba(15,23,32,0.058) 0%, rgba(42,18,53,0.05) 38%, rgba(0,119,182,0.036) 76%, rgba(255,255,255,0.22) 100%)",
    cardBorder: "rgba(15,23,32,0.105)",
    cardBorderHover: "rgba(0,119,182,0.28)",
    ctaBg: "radial-gradient(circle at 18% 42%, rgba(42,18,53,0.14), transparent 34%), radial-gradient(circle at 70% 22%, rgba(214,161,93,0.12), transparent 24%), radial-gradient(circle at 72% 78%, rgba(0,180,216,0.065), transparent 32%), linear-gradient(145deg, rgba(218,225,232,0.99) 0%, rgba(246,248,250,0.965) 48%, rgba(218,225,232,0.98) 100%)",
    ctaBorder: "rgba(15,23,32,0.105)",
    navPillBg: "rgba(15,23,32,0.06)",
    navPillBorder: "rgba(15,23,32,0.14)",
    navActiveTxt: "#E6E8EB",
    navActiveGrad: "linear-gradient(135deg, #0F1720 0%, #2A1235 44%, #0077B6 100%)",
    footerBorder: "rgba(15,23,32,0.08)",
    badgeBg: "rgba(15,23,32,0.045)",
    badgeBorder: "rgba(0,119,182,0.24)",
    modalBg: "linear-gradient(160deg, rgba(246,248,250,0.99), rgba(230,232,235,0.99))",
    modalOverlay: "rgba(230,232,235,0.88)",
    imgOverlayTop: "rgba(255,255,255,0.02)",
    imgOverlayMid: "rgba(255,255,255,0.08)",
    imgOverlayBot: "rgba(230,232,235,0.55)",
    dividerLine: "rgba(15,23,32,0.045)",
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
