import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme";

/**
 * FloatingSquares — animated rounded squares in the project colors.
 * Pure canvas implementation for performance (no DOM nodes per square).
 * Squares drift upward with gentle rotation and fade in/out.
 */

interface Square {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  color: string;
  borderRadius: number; // fraction of size (0.2 = 20%)
  phase: number; // for sine-wave wobble
  phaseSpeed: number;
  life: number; // 0→1 normalized
  lifeSpeed: number;
}

const COLORS = [
  "192,193,164", // Sage Green
  "193,211,221", // Mist Blue
  "244,244,242", // Off-White
];

function createSquare(w: number, h: number, fromBottom = false): Square {
  const size = 12 + Math.random() * 40;
  return {
    x: Math.random() * w,
    y: fromBottom ? h + size : Math.random() * h,
    size,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.008,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.15 + Math.random() * 0.35),
    opacity: 0,
    targetOpacity: 0.08 + Math.random() * 0.18,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    borderRadius: 0.2 + Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.005 + Math.random() * 0.01,
    life: 0,
    lifeSpeed: 0.001 + Math.random() * 0.002,
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

interface Props {
  count?: number;
  className?: string;
}

export function FloatingSquares({ count = 18, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const squaresRef = useRef<Square[]>([]);
  const rafRef = useRef<number>(0);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const init = useCallback(
    (w: number, h: number) => {
      const arr: Square[] = [];
      for (let i = 0; i < count; i++) {
        const sq = createSquare(w, h, false);
        sq.life = Math.random(); // start at random life stage
        sq.opacity = sq.targetOpacity * Math.sin(sq.life * Math.PI);
        arr.push(sq);
      }
      squaresRef.current = arr;
    },
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (squaresRef.current.length === 0) {
        init(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const squares = squaresRef.current;

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        // Update life
        sq.life += sq.lifeSpeed;

        // Fade based on life (sine curve: 0→1→0)
        const lifeFade = Math.sin(sq.life * Math.PI);
        sq.opacity = sq.targetOpacity * Math.max(0, lifeFade);

        // Movement
        sq.phase += sq.phaseSpeed;
        sq.x += sq.vx + Math.sin(sq.phase) * 0.3;
        sq.y += sq.vy;
        sq.rotation += sq.rotationSpeed;

        // Recycle when life > 1 or off screen
        if (sq.life >= 1 || sq.y < -sq.size * 2) {
          squares[i] = createSquare(w, h, true);
          continue;
        }

        // Draw
        if (sq.opacity <= 0.005) continue;

        ctx.save();
        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.rotation);

        const half = sq.size / 2;
        const r = sq.size * sq.borderRadius;

        // Fill
        ctx.globalAlpha = sq.opacity;
        ctx.fillStyle = `rgba(${sq.color},1)`;
        drawRoundedRect(ctx, -half, -half, sq.size, sq.size, r);
        ctx.fill();

        // Subtle border
        ctx.globalAlpha = sq.opacity * 0.5;
        ctx.strokeStyle = `rgba(${sq.color},1)`;
        ctx.lineWidth = 0.5;
        drawRoundedRect(ctx, -half, -half, sq.size, sq.size, r);
        ctx.stroke();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
