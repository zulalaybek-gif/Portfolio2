import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useI18n } from "./i18n";
import { useTheme } from "./theme";
import { Globe, Sun, Moon, Menu, X } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, setLang } = useI18n();
  const { isDark, toggle, p, r } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTimers = useRef<number[]>([]);
  const scrollFrame = useRef<number | null>(null);

  const clearScrollTimers = useCallback(() => {
    scrollTimers.current.forEach((timer) => window.clearTimeout(timer));
    scrollTimers.current = [];
    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = null;
    }
  }, []);

  const scheduleScroll = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      scrollTimers.current = scrollTimers.current.filter((id) => id !== timer);
      callback();
    }, delay);
    scrollTimers.current.push(timer);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => clearScrollTimers, [clearScrollTimers]);

  const navItems = [
    { key: "nav.home" as const, path: "/" },
    { key: "nav.services" as const, path: "/#services" },
    { key: "nav.work" as const, path: "/projects" },
    { key: "nav.about" as const, path: "/#about" },
  ];

  const getActiveKey = () => {
    if (location.pathname.startsWith("/projects")) return "nav.work";
    if (location.pathname === "/contact") return "nav.contact";
    return "nav.home";
  };

  const active = getActiveKey();

  const scrollToSection = useCallback((sectionId: string) => {
    clearScrollTimers();
    let attempts = 0;

    const findSection = () =>
      document.querySelector(`[data-section="${sectionId}"]`) ||
      document.querySelector(`[data-section-alias="${sectionId}"]`);

    const scroll = () => {
      const el = findSection();
      if (!el) {
        attempts += 1;
        if (attempts <= 8) {
          scheduleScroll(scroll, attempts < 3 ? 80 : 160);
        }
        return;
      }

      const { top } = el.getBoundingClientRect();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, top + window.scrollY - 8),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    scrollFrame.current = window.requestAnimationFrame(() => {
      scrollFrame.current = null;
      scroll();
    });
  }, [clearScrollTimers, scheduleScroll]);

  /** Handle hash-based navigation (scroll to section) */
  const handleNav = useCallback(
    (path: string) => {
      setMobileOpen(false);
      if (path.startsWith("/#")) {
        const sectionId = path.slice(2); // e.g. "services"

        if (location.pathname === "/") {
          scrollToSection(sectionId);
          return;
        }
        // Navigate to home, then scroll after mount
        navigate("/");
        scheduleScroll(() => scrollToSection(sectionId), 300);
      } else {
        clearScrollTimers();
        navigate(path);
      }
    },
    [clearScrollTimers, navigate, location.pathname, scheduleScroll, scrollToSection]
  );

  const handleLogoClick = useCallback(() => {
    setMobileOpen(false);
    clearScrollTimers();

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    if (location.hash) {
      navigate("/", { replace: true });
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [clearScrollTimers, location.hash, location.pathname, navigate]);

  return (
    <>
      <nav
        className="flex items-center justify-between w-full px-6 md:px-8 py-5 relative z-20"
        role="navigation"
        aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
        style={{ isolation: "isolate", zIndex: 80 }}
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="brand-mark group flex items-center gap-3 cursor-pointer transition-opacity duration-300 hover:opacity-90"
          aria-label={lang === "fr" ? "Retour à l'accueil" : "Go to homepage"}
        >
          <svg
            viewBox="0 0 1253.25 850.21"
            className="h-8 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.035]"
            style={{ fill: p.text }}
          >
            <path d="m1225.95,850.16l-562.28-.11c-21.48-.06-33.64-24.54-20.28-41.79l497.51-660.5c13.06-17.05,1.09-41.42-20.38-41.7l-282.22-.02c-13.88.36-24.74,11.14-25.18,25.09v261.94c.07,5.15-1.27,10.22-4.51,14.42l-60.16,79.89c-17.9,19.47-47.95,4.5-45.14-20.33l.16-336.22c-.62-13.72-11.54-24.45-25.27-24.61-3.69.23-15.34.29-23.04,13.62L116.56,839.59c-4.93,6.62-12.7,10.53-20.95,10.53H26.15c-21.75,0-33.96-25.75-20.57-42.89L605.03,11.43c5.96-8.33,14.7-11.79,25.65-11.39l596.15.31c14.42,0,26.11,11.69,26.11,26.11v142.68c0,5.73-1.88,11.29-5.36,15.84l-390.83,516.34c-13.12,17.19-.86,41.96,20.76,41.96l346.68.1c15.3-1.62,29.09,8.86,29.06,26.2l-.14,56.92c-1.17,14.82-14.15,24.56-27.17,23.67Z" />
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex items-center gap-1 backdrop-blur-md rounded-full px-2 py-1.5"
          style={{
            background: p.navPillBg,
            border: `1px solid ${p.navPillBorder}`,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNav(item.path)}
              className="nav-link relative px-5 py-2 rounded-full transition-all duration-300"
              data-active={active === item.key}
              style={{
                fontSize: "0.85rem",
                fontFamily: "'Inter', sans-serif",
                color: active === item.key ? p.navActiveTxt : r(0.6),
              }}
            >
              {active === item.key && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: p.navActiveGrad }}
                />
              )}
              <span className="relative z-10">{t(item.key)}</span>
            </button>
          ))}
        </div>

        {/* Right side: Theme + Lang + CTA + Mobile burger */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <button
            onClick={toggle}
            className="nav-orb flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 backdrop-blur-md"
            style={{
              border: `1px solid ${r(0.1)}`,
              background: r(0.03),
            }}
            aria-label={isDark ? (lang === "fr" ? "Passer en mode clair" : "Switch to light mode") : (lang === "fr" ? "Passer en mode sombre" : "Switch to dark mode")}
          >
            {isDark ? (
              <Sun size={14} style={{ color: r(0.5) }} />
            ) : (
              <Moon size={14} style={{ color: r(0.5) }} />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="nav-orb flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 backdrop-blur-md"
            style={{
              fontFamily: "'Inter', sans-serif",
              border: `1px solid ${r(0.1)}`,
              background: r(0.03),
            }}
            aria-label={lang === "fr" ? "Switch to English" : "Passer en Français"}
          >
            <Globe size={14} style={{ color: r(0.4) }} />
            <span
              className="uppercase"
              style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.05em", color: r(0.6) }}
            >
              {lang === "fr" ? "EN" : "FR"}
            </span>
          </button>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNav("/contact")}
            className="nav-contact hidden md:block px-6 py-2.5 rounded-full transition-all duration-300"
            style={{
              fontSize: "0.85rem",
              fontFamily: "'Inter', sans-serif",
              border: `1px solid ${r(0.2)}`,
              background: active === "nav.contact" ? p.navActiveGrad : "transparent",
              color: active === "nav.contact" ? p.navActiveTxt : p.text,
            }}
          >
            {t("nav.contact")}
          </button>

          {/* Mobile burger */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full transition-all duration-300 backdrop-blur-md"
            style={{
              border: `1px solid ${r(0.1)}`,
              background: r(0.03),
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? (lang === "fr" ? "Fermer le menu" : "Close menu") : (lang === "fr" ? "Ouvrir le menu" : "Open menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={16} style={{ color: r(0.5) }} />
            ) : (
              <Menu size={16} style={{ color: r(0.5) }} />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay menu ── */}
      {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            style={{
              background: isDark
                ? "radial-gradient(circle at 80% 10%, rgba(223,244,64,0.11), transparent 34%), radial-gradient(circle at 12% 74%, rgba(75,129,151,0.22), transparent 42%), rgba(18,20,18,0.97)"
                : "radial-gradient(circle at 80% 10%, rgba(223,244,64,0.12), transparent 34%), radial-gradient(circle at 12% 74%, rgba(75,129,151,0.08), transparent 42%), rgba(241,241,241,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close bar */}
            <div className="flex items-center justify-between px-6 py-5">
              <svg
                viewBox="0 0 1253.25 850.21"
                className="h-8"
                style={{ fill: p.text }}
              >
                <path d="m1225.95,850.16l-562.28-.11c-21.48-.06-33.64-24.54-20.28-41.79l497.51-660.5c13.06-17.05,1.09-41.42-20.38-41.7l-282.22-.02c-13.88.36-24.74,11.14-25.18,25.09v261.94c.07,5.15-1.27,10.22-4.51,14.42l-60.16,79.89c-17.9,19.47-47.95,4.5-45.14-20.33l.16-336.22c-.62-13.72-11.54-24.45-25.27-24.61-3.69.23-15.34.29-23.04,13.62L116.56,839.59c-4.93,6.62-12.7,10.53-20.95,10.53H26.15c-21.75,0-33.96-25.75-20.57-42.89L605.03,11.43c5.96-8.33,14.7-11.79,25.65-11.39l596.15.31c14.42,0,26.11,11.69,26.11,26.11v142.68c0,5.73-1.88,11.29-5.36,15.84l-390.83,516.34c-13.12,17.19-.86,41.96,20.76,41.96l346.68.1c15.3-1.62,29.09,8.86,29.06,26.2l-.14,56.92c-1.17,14.82-14.15,24.56-27.17,23.67Z" />
              </svg>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{
                  border: `1px solid ${r(0.1)}`,
                  background: r(0.03),
                }}
                aria-label={lang === "fr" ? "Fermer le menu" : "Close menu"}
              >
                <X size={16} style={{ color: r(0.5) }} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
              {navItems.map((item, i) => (
                <button
                  key={item.key}
                  onClick={() => handleNav(item.path)}
                  className="w-full text-center py-4 rounded-2xl transition-all duration-300 animate-soft-enter"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: active === item.key ? 700 : 400,
                    color: active === item.key ? p.text : r(0.4),
                    background: active === item.key ? r(0.04) : "transparent",
                    animationDelay: `${0.05 + i * 0.04}s`,
                  }}
                >
                  {t(item.key)}
                </button>
              ))}

              {/* Mobile CTA */}
              <button
                onClick={() => handleNav("/contact")}
                className="mt-6 w-full py-4 rounded-full transition-all duration-300 animate-soft-enter"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  border: `1px solid ${r(0.15)}`,
                  color: p.text,
                  animationDelay: "0.24s",
                }}
              >
                {t("nav.contact")}
              </button>
            </div>
          </div>
        )}
    </>
  );
}
