import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";

const services = [
  { titleKey: "services.s1.title" as const, descKey: "services.s1.desc" as const },
  { titleKey: "services.s2.title" as const, descKey: "services.s2.desc" as const },
  { titleKey: "services.s3.title" as const, descKey: "services.s3.desc" as const },
  { titleKey: "services.s4.title" as const, descKey: "services.s4.desc" as const },
  { titleKey: "services.s5.title" as const, descKey: "services.s5.desc" as const },
  { titleKey: "services.s6.title" as const, descKey: "services.s6.desc" as const },
  { titleKey: "services.s7.title" as const, descKey: "services.s7.desc" as const },
  { titleKey: "services.s8.title" as const, descKey: "services.s8.desc" as const },
];

export function ServicesSection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#8BAD4A" : "#4A6B2A";
  const scrollRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef<number | null>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const getClosestIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    const children = Array.from(el.children) as HTMLElement[];
    let closest = 0;
    let minDist = Infinity;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(childCenter - viewportCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    return closest;
  }, []);

  const scrollToIdx = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[idx]) {
      const card = cards[idx] as HTMLElement;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      programmaticScrollRef.current = idx;
      el.scrollTo({ left: card.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    }
    setActiveIdx(idx);

    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = null;
      setActiveIdx(getClosestIndex());
    }, 460);
  }, [getClosestIndex]);

  const prev = () => scrollToIdx(Math.max(0, activeIdx - 1));
  const next = () => scrollToIdx(Math.min(services.length - 1, activeIdx + 1));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (programmaticScrollRef.current !== null) return;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const closest = getClosestIndex();
        setActiveIdx((current) => (current === closest ? current : closest));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
      el.removeEventListener("scroll", onScroll);
    };
  }, [getClosestIndex]);

  return (
    <section data-section="services" className="relative w-full px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span
            className="inline-block uppercase tracking-widest mb-5"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.35), letterSpacing: "0.15em" }}
          >
            — {t("services.badge")}
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em", color: p.text }}>
                {t("services.title1" as TranslationKey)}
              </h2>
              <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 400, color: accent, display: "block", marginTop: "-0.1em" }}>
                {t("services.title2" as TranslationKey)}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <p className="max-w-[280px] hidden md:block" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: r(0.4) }}>
                {t("services.subtitle" as TranslationKey)}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={activeIdx === 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: `1px solid ${activeIdx > 0 ? r(0.15) : r(0.05)}`, color: activeIdx > 0 ? r(0.5) : r(0.1) }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  disabled={activeIdx >= services.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: `1px solid ${activeIdx < services.length - 1 ? r(0.15) : r(0.05)}`, color: activeIdx < services.length - 1 ? r(0.5) : r(0.1) }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrollable cards */}
        <div
          ref={scrollRef}
          className="relative flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {services.map((service, i) => {
            const title = t(service.titleKey as TranslationKey).replace("\n", " ");
            const firstLetter = title.charAt(0);
            const rest = title.slice(1);

            return (
              <div
                key={i}
                className="shrink-0 relative rounded-2xl p-7 flex flex-col justify-between overflow-hidden group"
                style={{
                  width: "clamp(260px, 30vw, 320px)",
                  minHeight: 280,
                  scrollSnapAlign: "start",
                  background: p.cardBg,
                  border: `1px solid ${p.cardBorder}`,
                  transform: "translateZ(0)",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    color: r(0.15),
                    letterSpacing: "0.05em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Accent dot */}
                {i === 1 && (
                  <div className="absolute top-7 right-7 w-2 h-2 rounded-full" style={{ background: accent, opacity: 0.5 }} />
                )}

                {/* Title with large first letter */}
                <div className="mt-auto">
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: p.text,
                    }}
                  >
                    <span style={{ color: accent }}>{firstLetter}</span>
                    {rest}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      color: r(0.35),
                    }}
                  >
                    {t(service.descKey as TranslationKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 24 : 6,
                height: 6,
                background: activeIdx === i ? accent : r(0.1),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
