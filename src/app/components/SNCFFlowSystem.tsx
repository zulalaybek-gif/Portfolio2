import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "./theme";

type NebulaPoint = {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  phase: number;
};

export function SNCFFlowSystem({ spotifyActive = false }: { spotifyActive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [spotifyInView, setSpotifyInView] = useState(false);
  const spotifyActiveRef = useRef(spotifyActive);
  const spotifyInViewRef = useRef(spotifyInView);

  useEffect(() => {
    spotifyActiveRef.current = spotifyActive;
  }, [spotifyActive]);

  useEffect(() => {
    spotifyInViewRef.current = spotifyInView;
  }, [spotifyInView]);

  useEffect(() => {
    const section = document.getElementById("sncf-spotify-scene");
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setSpotifyInView(entry.isIntersecting), {
      threshold: 0.1,
    });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let isVisible = document.visibilityState === "visible";
    const mouse = { x: 0.5, y: 0.5 };
    let points: NebulaPoint[] = [];

    const createPoints = () => {
      const mobile = window.innerWidth < 768;
      const count = shouldReduceMotion ? (mobile ? 160 : 420) : mobile ? 800 : 2500;

      points = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 3,
        y: Math.random(),
        z: Math.random() * 3,
        size: 0.4 + Math.random() * 1.2,
        brightness: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createPoints();
    };

    const draw = () => {
      if (!isVisible) return;

      const scrollY = window.scrollY;
      const spotifyEnergy = spotifyInViewRef.current || spotifyActiveRef.current ? 1 : 0;
      time += shouldReduceMotion ? 0 : spotifyEnergy ? 0.03 : 0.005;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      const fov = 400;
      const horizon = height * 0.75;

      for (const point of points) {
        const waveX = Math.sin(point.x * 2 + time + point.phase) * 15;
        const waveZ = Math.cos(point.z * 3 - time * 0.5 + point.phase) * 20;
        const intensity = spotifyEnergy ? 40 : 15;
        const verticalMotion = Math.sin(point.x * 5 + point.z * 5 + time * 2 + point.phase) * intensity;
        const zPos = point.z * 500 - ((scrollY * 0.15) % 1500);
        const realZ = zPos < 1 ? zPos + 1500 : zPos;
        const scale = fov / (fov + realZ);
        const x2d = width / 2 + point.x * width * 1.2 * scale + (mouse.x - 0.5) * 50 * scale;
        const y2d = horizon + (verticalMotion + waveX + waveZ + 150 + point.y * 12) * scale;

        if (realZ <= 0 || y2d < 0 || y2d > height || x2d < -100 || x2d > width + 100) continue;

        const opacity = point.brightness * scale * (isDark ? 1 : 0.4) * Math.max(0, 1 - realZ / 1500);
        if (opacity <= 0.006) continue;

        ctx.beginPath();
        ctx.fillStyle = isDark ? `rgba(141, 232, 254, ${opacity})` : `rgba(0, 44, 76, ${opacity})`;

        if (isDark && opacity > 0.4 && scale > 0.5) {
          ctx.shadowBlur = 5 * scale;
          ctx.shadowColor = "rgba(141, 232, 254, 0.5)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.arc(x2d, y2d, point.size * scale * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / Math.max(1, window.innerWidth);
      mouse.y = event.clientY / Math.max(1, window.innerHeight);
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      cancelAnimationFrame(raf);
      if (isVisible) raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isDark, shouldReduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
