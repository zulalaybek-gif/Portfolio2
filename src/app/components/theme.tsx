import { createContext, useContext, useState, useCallback, useMemo, useLayoutEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

/* ── Ocean & Mineral global palette ── */
const palettes = {
  dark: {
    pageBg: "#0F1720",
    containerBg: "radial-gradient(circle at 72% 8%, rgba(0,180,216,0.12), transparent 28%), radial-gradient(circle at 10% 34%, rgba(0,119,182,0.12), transparent 34%), linear-gradient(180deg, rgba(15,23,32,0.96) 0%, rgba(5,9,14,0.985) 48%, rgba(15,23,32,0.96) 100%)",
    containerBorder: "rgba(230,232,235,0.085)",
    containerShadow: "0 0 120px rgba(0,0,0,0.68), inset 0 1px 0 rgba(230,232,235,0.05), 0 0 86px rgba(0,180,216,0.08)",
    text: "#E6E8EB",
    textInvert: "#0F1720",
    // Tailwind class helpers (white-based in dark, black-based in light)
    textClass: "text-white",
    // Generic opacity helpers — used in inline rgba()
    textBase: "255,255,255",
    surfaceBase: "255,255,255",
    // Cards
    cardBg: "linear-gradient(150deg, rgba(230,232,235,0.052) 0%, rgba(0,119,182,0.035) 48%, rgba(230,232,235,0.012) 100%)",
    cardBorder: "rgba(230,232,235,0.075)",
    cardBorderHover: "rgba(0,180,216,0.28)",
    // CTA section
    ctaBg: "radial-gradient(circle at 22% 42%, rgba(0,180,216,0.12), transparent 34%), linear-gradient(145deg, rgba(0,119,182,0.08) 0%, rgba(15,23,32,0.985) 42%, rgba(5,9,14,0.99) 100%)",
    ctaBorder: "rgba(230,232,235,0.075)",
    // Nav
    navPillBg: "rgba(230,232,235,0.065)",
    navPillBorder: "rgba(230,232,235,0.13)",
    navActiveTxt: "#0F1720",
    navActiveGrad: "linear-gradient(135deg, #00B4D8 0%, #E6E8EB 100%)",
    // Footer
    footerBorder: "rgba(230,232,235,0.07)",
    // Badge
    badgeBg: "rgba(230,232,235,0.04)",
    badgeBorder: "rgba(0,180,216,0.18)",
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
    pageBg: "#E6E8EB",
    containerBg: "radial-gradient(circle at 82% 10%, rgba(0,180,216,0.16), transparent 30%), radial-gradient(circle at 9% 36%, rgba(0,119,182,0.12), transparent 34%), linear-gradient(180deg, rgba(230,232,235,0.98) 0%, rgba(246,248,250,0.96) 44%, rgba(230,232,235,0.98) 100%)",
    containerBorder: "rgba(15,23,32,0.095)",
    containerShadow: "0 0 100px rgba(15,23,32,0.11), inset 0 1px 0 rgba(255,255,255,0.82), 0 0 62px rgba(0,119,182,0.095)",
    text: "#0F1720",
    textInvert: "#E6E8EB",
    textBase: "0,0,0",
    surfaceBase: "0,0,0",
    textClass: "text-[#0F1720]",
    cardBg: "linear-gradient(150deg, rgba(15,23,32,0.04) 0%, rgba(0,119,182,0.035) 48%, rgba(255,255,255,0.24) 100%)",
    cardBorder: "rgba(15,23,32,0.085)",
    cardBorderHover: "rgba(0,119,182,0.28)",
    ctaBg: "radial-gradient(circle at 22% 42%, rgba(0,180,216,0.12), transparent 35%), linear-gradient(145deg, rgba(0,119,182,0.065) 0%, rgba(230,232,235,0.98) 42%, rgba(246,248,250,0.99) 100%)",
    ctaBorder: "rgba(15,23,32,0.085)",
    navPillBg: "rgba(15,23,32,0.045)",
    navPillBorder: "rgba(15,23,32,0.1)",
    navActiveTxt: "#E6E8EB",
    navActiveGrad: "linear-gradient(135deg, #0F1720 0%, #0077B6 100%)",
    footerBorder: "rgba(15,23,32,0.08)",
    badgeBg: "rgba(15,23,32,0.035)",
    badgeBorder: "rgba(0,119,182,0.16)",
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
