import { useEffect } from "react";
import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ParticleOrbit } from "./ParticleOrbit";
import { ParticleOverlay } from "./ParticleOverlay";
import { useTheme } from "./theme";

export function Layout() {
  const { p, theme } = useTheme();

  // Set data-theme on <html> for CSS-based particle styling
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
      <ParticleOrbit />

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
        <ParticleOverlay />

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
