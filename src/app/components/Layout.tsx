import { lazy, Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useTheme } from "./theme";

const ParticleOrbit = lazy(() =>
  import("./ParticleOrbit").then((module) => ({ default: module.ParticleOrbit }))
);
const ParticleOverlay = lazy(() =>
  import("./ParticleOverlay").then((module) => ({ default: module.ParticleOverlay }))
);

export function Layout() {
  const { p, theme } = useTheme();
  const [showParticles, setShowParticles] = useState(false);

  // Set data-theme on <html> for CSS-based particle styling
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (reduceMotion || isMobile) return;

    const timer = window.setTimeout(() => setShowParticles(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative transition-colors duration-700"
      style={{
        background: p.pageBg,
        padding: "clamp(32px, 5vw, 80px)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background particles — behind everything */}
      {showParticles ? (
        <Suspense fallback={null}>
          <ParticleOrbit />
        </Suspense>
      ) : null}

      <div
        className="w-full max-w-[1440px] relative transition-all duration-700"
        style={{
          borderRadius: "clamp(16px, 3vw, 40px)",
          background: p.containerBg,
          border: `1px solid ${p.containerBorder}`,
          boxShadow: p.containerShadow,
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Inner particle overlay — floats through content */}
        {showParticles ? (
          <Suspense fallback={null}>
            <ParticleOverlay />
          </Suspense>
        ) : null}

        {/* Content */}
        <div className="relative" style={{ zIndex: 2 }}>
          <Navigation />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
