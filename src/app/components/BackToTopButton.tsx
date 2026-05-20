import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";

export function BackToTopButton() {
  const { lang } = useI18n();
  const { isDark, r } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 620);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group fixed flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 ease-out"
      aria-label={lang === "fr" ? "Retour en haut de la page" : "Back to top"}
      style={{
        right: "calc(clamp(0.45rem, 1vw, 0.9rem) + env(safe-area-inset-right))",
        bottom: "calc(1.55rem + env(safe-area-inset-bottom))",
        zIndex: 48,
        width: 42,
        height: 42,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
        color: isDark ? "#F5F1E8" : "#171713",
        background: isDark ? "rgba(13,13,11,0.58)" : "rgba(250,247,239,0.68)",
        border: `1px solid ${isDark ? "rgba(245,241,232,0.12)" : "rgba(42,39,34,0.12)"}`,
        boxShadow: isDark
          ? "0 14px 42px rgba(0,0,0,0.34), 0 0 30px rgba(54,42,68,0.08)"
          : "0 14px 38px rgba(42,35,24,0.08), 0 0 28px rgba(54,42,68,0.045)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[5px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isDark ? "rgba(167,173,139,0.08)" : "rgba(91,98,77,0.08)",
        }}
      />
      <ArrowUp
        size={16}
        strokeWidth={1.8}
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ color: r(0.66) }}
      />
    </button>
  );
}
