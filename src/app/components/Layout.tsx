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
          ? "radial-gradient(circle at 12% 18%, rgba(38,23,50,0.38), transparent 34%), radial-gradient(circle at 82% 12%, rgba(0,180,216,0.16), transparent 28%), radial-gradient(circle at 78% 78%, rgba(255,209,102,0.12), transparent 30%), linear-gradient(135deg, #05090E 0%, #0F1720 48%, #030609 100%)"
          : "radial-gradient(circle at 12% 18%, rgba(38,23,50,0.16), transparent 34%), radial-gradient(circle at 82% 12%, rgba(0,180,216,0.14), transparent 28%), radial-gradient(circle at 78% 78%, rgba(255,209,102,0.2), transparent 30%), linear-gradient(135deg, #DCE2E8 0%, #E6E8EB 48%, #F5F7F9 100%)",
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
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at 50% 20%, black 0%, transparent 72%)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[46vh]"
        style={{
          background: "linear-gradient(180deg, rgba(0,180,216,0.12), rgba(38,23,50,0.12) 46%, transparent 78%)",
          filter: "blur(18px)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="ambient-rift"
        style={{
          opacity: isDark ? 0.78 : 0.4,
        }}
      />
      <div
        aria-hidden="true"
        className="ambient-grain"
        style={{
          opacity: isDark ? 0.18 : 0.12,
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
