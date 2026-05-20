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
        color: isDark ? "#E6E8EB" : "#0F1720",
        background: isDark ? "rgba(15,23,32,0.64)" : "rgba(230,232,235,0.72)",
        border: `1px solid ${isDark ? "rgba(230,232,235,0.14)" : "rgba(15,23,32,0.13)"}`,
        boxShadow: isDark
          ? "0 14px 42px rgba(0,0,0,0.34), 0 0 30px rgba(0,180,216,0.13)"
          : "0 14px 38px rgba(15,23,32,0.11), 0 0 28px rgba(0,119,182,0.09)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[5px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isDark ? "rgba(0,119,182,0.16)" : "rgba(0,119,182,0.12)",
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
