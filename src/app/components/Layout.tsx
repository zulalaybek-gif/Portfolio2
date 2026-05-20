import { Outlet, useLocation } from "react-router";
import { useLayoutEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useTheme } from "./theme";
import { ParticleOrbit } from "./ParticleOrbit";
import { ParticleOverlay } from "./ParticleOverlay";

function RouteViewport() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.hash) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname, location.hash]);

  return (
    <main key={location.pathname} className="route-shell">
      <Outlet />
    </main>
  );
}

export function Layout() {
  const { p, isDark } = useTheme();
  const [showParticles] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    return !reduceMotion && !isMobile;
  });

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        background: isDark
          ? "radial-gradient(circle at 12% 18%, rgba(75,129,151,0.2), transparent 36%), radial-gradient(circle at 82% 12%, rgba(223,244,64,0.07), transparent 30%), radial-gradient(circle at 78% 78%, rgba(193,33,68,0.055), transparent 26%), radial-gradient(circle at 24% 86%, rgba(75,129,151,0.1), transparent 32%), linear-gradient(135deg, #151715 0%, #1F1F1F 52%, #111311 100%)"
          : "radial-gradient(circle at 10% 18%, rgba(75,129,151,0.12), transparent 34%), radial-gradient(circle at 84% 12%, rgba(223,244,64,0.13), transparent 29%), radial-gradient(circle at 72% 76%, rgba(193,33,68,0.045), transparent 25%), radial-gradient(circle at 24% 86%, rgba(75,129,151,0.055), transparent 31%), linear-gradient(135deg, #F1F1F1 0%, #F8F8F6 54%, #E8E9E6 100%)",
        padding: "clamp(32px, 5vw, 80px)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          opacity: isDark ? 0.5 : 0.38,
          backgroundImage:
            isDark
              ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)"
              : "linear-gradient(rgba(35,38,36,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(75,129,151,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at 50% 20%, black 0%, transparent 72%)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[46vh]"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(223,244,64,0.055), rgba(75,129,151,0.14) 48%, transparent 80%)"
            : "linear-gradient(180deg, rgba(75,129,151,0.08), rgba(223,244,64,0.08) 46%, rgba(193,33,68,0.025) 68%, transparent 84%)",
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="ambient-rift"
        style={{
          opacity: isDark ? 0.72 : 0.44,
        }}
      />
      <div
        aria-hidden="true"
        className="ambient-grain"
        style={{
          opacity: isDark ? 0.18 : 0.18,
        }}
      />
      {/* Background particles — behind everything */}
      {showParticles ? <ParticleOrbit /> : null}

      <div
        className="w-full max-w-[1440px] relative"
        style={{
          borderRadius: "clamp(16px, 3vw, 40px)",
          background: p.containerBg,
          border: `1px solid ${p.containerBorder}`,
          boxShadow: p.containerShadow,
          zIndex: 2,
          overflow: "clip",
        }}
      >
        {/* Inner particle overlay — floats through content */}
        {showParticles ? <ParticleOverlay /> : null}

        {/* Content */}
        <div className="relative" style={{ zIndex: 2 }}>
          <Navigation />
          <RouteViewport />
          <Footer />
        </div>
      </div>
    </div>
  );
}
