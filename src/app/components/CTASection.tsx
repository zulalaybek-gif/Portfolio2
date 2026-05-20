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
  const glowColor = "32,19,42";
  const cyanGlow = "83,166,184";
  const warmGlow = "199,164,106";

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
            ? `radial-gradient(circle at 18% 38%, rgba(${glowColor},0.42), transparent 38%), radial-gradient(circle at 74% 24%, rgba(${warmGlow},0.048), transparent 25%), radial-gradient(circle at 58% 82%, rgba(${cyanGlow},0.058), transparent 36%), linear-gradient(145deg, rgba(15,23,32,0.988) 0%, rgba(5,9,14,0.992) 64%, rgba(13,19,27,0.988) 100%)`
            : `radial-gradient(circle at 18% 38%, rgba(${glowColor},0.13), transparent 36%), radial-gradient(circle at 72% 22%, rgba(${warmGlow},0.07), transparent 25%), radial-gradient(circle at 58% 82%, rgba(${cyanGlow},0.045), transparent 36%), linear-gradient(145deg, rgba(214,222,230,0.98) 0%, rgba(246,248,250,0.95) 54%, rgba(218,225,232,0.98) 100%)`,
          border: `1px solid ${p.ctaBorder}`,
          boxShadow: isDark
            ? `0 32px 105px rgba(0,0,0,0.46), inset 0 1px 0 rgba(230,232,235,0.07), 0 0 90px rgba(${glowColor},0.08)`
            : `0 32px 105px rgba(15,23,32,0.14), inset 0 1px 0 rgba(255,255,255,0.86), 0 0 88px rgba(${glowColor},0.07), 0 0 32px rgba(${warmGlow},0.044)`,
          ["--cta-glow-rgb" as string]: glowColor,
          ["--cta-glow-secondary-rgb" as string]: cyanGlow,
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
            background: `linear-gradient(90deg, transparent, rgba(${glowColor},0.42), rgba(12,96,126,0.26), rgba(${warmGlow},0.13), transparent)`,
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
                ? "linear-gradient(135deg, #0F1720 0%, #201326 48%, #0E5C78 100%)"
                : "linear-gradient(135deg, #0F1720 0%, #201326 48%, #0E5C78 100%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#E6E8EB",
              textDecoration: "none",
              boxShadow: isDark
                ? `0 16px 46px rgba(${cyanGlow},0.1), 0 0 26px rgba(${warmGlow},0.055), inset 0 1px 0 rgba(255,255,255,0.24)`
                : `0 16px 46px rgba(${glowColor},0.12), 0 0 22px rgba(${warmGlow},0.055), inset 0 1px 0 rgba(255,255,255,0.16)`,
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
  const physicsRef = useRef({ x: 0, y: 0, vx: 0.12, vy: 0.1, ready: false });
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
        state.vx += (pointerRef.current.x - state.x) * 0.00115;
        state.vy += (pointerRef.current.y - state.y) * 0.00115;
      } else {
        state.vx += Math.sin(time * 0.00055) * 0.0036;
        state.vy += Math.cos(time * 0.00045) * 0.003;
      }

      state.vx *= 0.968;
      state.vy *= 0.968;
      state.x += state.vx;
      state.y += state.vy;

      if (state.x < minX || state.x > maxX) {
        state.x = Math.min(Math.max(state.x, minX), maxX);
        state.vx *= -0.42;
      }

      if (state.y < minY || state.y > maxY) {
        state.y = Math.min(Math.max(state.y, minY), maxY);
        state.vy *= -0.42;
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
        opacity: isDark ? 0.28 : 0.22,
      }}
    />
  );
}
