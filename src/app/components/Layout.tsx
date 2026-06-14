import { Outlet, useLocation } from "react-router";
import { useLayoutEffect, useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useTheme } from "./theme";
import { ParticleOrbit } from "./ParticleOrbit";
import { ParticleOverlay } from "./ParticleOverlay";
import { AmbientMovingLines } from "./AmbientMovingLines";

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
  const { p } = useTheme();
  const [showParticles] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    return !reduceMotion && !isMobile;
  });

  return (
    <div
      className="site-shell min-h-screen w-full flex items-center justify-center relative"
      style={{
        background: p.pageBg,
        padding: "var(--site-shell-padding, clamp(32px, 5vw, 80px))",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background particles — behind everything */}
      {showParticles ? <ParticleOrbit /> : null}
      <AmbientMovingLines className="absolute inset-x-0 top-0 z-[1]" height="100vh" opacity={0.08} />

      <div
        className="w-full max-w-[1440px] relative"
        style={{
          borderRadius: "clamp(16px, 3vw, 40px)",
          background: p.containerBg,
          border: `1px solid ${p.containerBorder}`,
          boxShadow: p.containerShadow,
          zIndex: 2,
          overflow: "visible",
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
