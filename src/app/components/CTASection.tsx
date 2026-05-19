import { useEffect, useRef, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { CompositeTitle } from "./CompositeTitle";

export function CTASection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const glowColor = isDark ? "139,173,74" : "74,107,42";

  return (
    <section data-section="cta" data-section-alias="about" className="relative w-full px-6 md:px-12 py-20">
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "200px 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        ref={cardRef}
        className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] p-12 md:p-24"
        style={{
          background: isDark
            ? `linear-gradient(145deg, rgba(${glowColor},0.12) 0%, rgba(14,14,14,0.98) 34%, rgba(8,8,8,0.99) 100%)`
            : `linear-gradient(145deg, rgba(${glowColor},0.075) 0%, rgba(252,250,247,0.99) 38%, rgba(248,246,242,0.98) 100%)`,
          border: `1px solid ${p.ctaBorder}`,
          boxShadow: isDark
            ? `0 28px 90px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 80px rgba(${glowColor},0.04)`
            : `0 28px 90px rgba(42,35,24,0.08), inset 0 1px 0 rgba(255,255,255,0.85), 0 0 90px rgba(${glowColor},0.08)`,
          ["--cta-glow-rgb" as string]: glowColor,
        }}
      >
        <InteractiveCtaGlow cardRef={cardRef} isDark={isDark} />
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.25, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: "10%",
            right: "10%",
            bottom: 0,
            height: 1,
            transformOrigin: "center",
            background: `linear-gradient(90deg, transparent, rgba(${glowColor},0.32), transparent)`,
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <span
            className="inline-block uppercase tracking-widest mb-8"
            style={{
              fontSize: "0.65rem",
              fontFamily: "'Inter', sans-serif",
              color: r(0.35),
              letterSpacing: "0.15em",
            }}
          >
            — {t("cta.badge" as TranslationKey)}
          </span>

          {/* Title */}
          <div className="mb-10">
            <CompositeTitle
              align="center"
              size="cta"
              primary={t("cta.title1" as TranslationKey)}
              secondary={t("cta.title2" as TranslationKey)}
            />
          </div>

          {/* Button */}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-500 hover:scale-[1.035] active:scale-[0.985]"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${accent} 0%, #A7C95A 52%, ${accent} 100%)`
                : `linear-gradient(135deg, ${accent} 0%, #5E8135 100%)`,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: isDark ? "#0a0a0a" : "#ffffff",
              textDecoration: "none",
              boxShadow: isDark
                ? `0 16px 46px rgba(${glowColor},0.18), inset 0 1px 0 rgba(255,255,255,0.28)`
                : `0 16px 46px rgba(${glowColor},0.18), inset 0 1px 0 rgba(255,255,255,0.18)`,
            }}
          >
            {t("cta.button")}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

function InteractiveCtaGlow({
  cardRef,
  isDark,
}: {
  cardRef: RefObject<HTMLDivElement | null>;
  isDark: boolean;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ active: false, x: 0, y: 0 });
  const physicsRef = useRef({ x: 0, y: 0, vx: 0.36, vy: 0.28, ready: false });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow || reduceMotion) return;

    let frame = 0;
    let rect = card.getBoundingClientRect();
    let lastRectRead = 0;

    const onPointerMove = (event: PointerEvent) => {
      rect = card.getBoundingClientRect();
      pointerRef.current = {
        active: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    const animate = (time: number) => {
      if (time - lastRectRead > 650) {
        rect = card.getBoundingClientRect();
        lastRectRead = time;
      }

      const state = physicsRef.current;
      const width = rect.width || 1;
      const height = rect.height || 1;
      const margin = Math.min(150, width * 0.18, height * 0.28);
      const minX = margin;
      const maxX = Math.max(minX, width - margin);
      const minY = margin;
      const maxY = Math.max(minY, height - margin);

      if (!state.ready) {
        state.x = width * 0.18;
        state.y = height * 0.42;
        state.ready = true;
      }

      if (pointerRef.current.active) {
        state.vx += (pointerRef.current.x - state.x) * 0.0032;
        state.vy += (pointerRef.current.y - state.y) * 0.0032;
      } else {
        state.vx += Math.sin(time * 0.0009) * 0.012;
        state.vy += Math.cos(time * 0.0007) * 0.01;
      }

      state.vx *= 0.986;
      state.vy *= 0.986;
      state.x += state.vx;
      state.y += state.vy;

      if (state.x < minX || state.x > maxX) {
        state.x = Math.min(Math.max(state.x, minX), maxX);
        state.vx *= -0.86;
      }

      if (state.y < minY || state.y > maxY) {
        state.y = Math.min(Math.max(state.y, minY), maxY);
        state.vy *= -0.86;
      }

      glow.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate3d(-50%, -50%, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    card.addEventListener("pointermove", onPointerMove, { passive: true });
    card.addEventListener("pointerleave", onPointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cardRef, reduceMotion]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cta-interactive-glow"
      style={{
        opacity: isDark ? 0.42 : 0.34,
      }}
    />
  );
}
