import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { CompositeTitle } from "./CompositeTitle";
import { AmbientMovingLines } from "./AmbientMovingLines";

const services = [
  { titleKey: "services.s1.title" as const, descKey: "services.s1.desc" as const, hoverKey: "services.s1.hover" as const },
  { titleKey: "services.s2.title" as const, descKey: "services.s2.desc" as const, hoverKey: "services.s2.hover" as const },
  { titleKey: "services.s3.title" as const, descKey: "services.s3.desc" as const, hoverKey: "services.s3.hover" as const },
  { titleKey: "services.s4.title" as const, descKey: "services.s4.desc" as const, hoverKey: "services.s4.hover" as const },
  { titleKey: "services.s5.title" as const, descKey: "services.s5.desc" as const, hoverKey: "services.s5.hover" as const },
  { titleKey: "services.s6.title" as const, descKey: "services.s6.desc" as const, hoverKey: "services.s6.hover" as const },
  { titleKey: "services.s7.title" as const, descKey: "services.s7.desc" as const, hoverKey: "services.s7.hover" as const },
  { titleKey: "services.s8.title" as const, descKey: "services.s8.desc" as const, hoverKey: "services.s8.hover" as const },
];

export function ServicesSection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const serviceAccents = isDark
    ? ["#63E6EE", "#4C638F", "#A83B6D", "#2D6CFF", "#63E6EE", "#4C638F", "#A83B6D", "#2D6CFF"]
    : ["#39C9D6", "#2F6BFF", "#9B214F", "#2D5BFF", "#39C9D6", "#2F6BFF", "#9B214F", "#2D5BFF"];
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
      <AmbientMovingLines className="absolute inset-x-0 top-8 z-0" height="56%" opacity={isDark ? 0.16 : 0.12} />
      <div className="relative z-10 max-w-6xl mx-auto">
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
              <CompositeTitle
                primary={t("services.title1" as TranslationKey)}
                secondary={t("services.title2" as TranslationKey)}
              />
            </div>
            <div className="flex items-center gap-6">
              <p
                className="max-w-[230px] hidden md:block"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  lineHeight: 1.62,
                  color: isDark ? r(0.48) : r(0.52),
                }}
              >
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
            const cardAccent = serviceAccents[i % serviceAccents.length];
            const titleParts = title.match(/\S+|\s+/g) ?? [title];

            return (
              <div
                key={i}
                className="service-card shrink-0 relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden group outline-none"
                tabIndex={0}
                style={{
                  ["--service-accent" as string]: cardAccent,
                  ["--service-base-shadow" as string]: isDark
                    ? `inset 0 1px 0 rgba(244,245,247,0.035), inset 0 0 0 1px ${cardAccent}0D, inset 0 -22px 58px rgba(0,0,0,0.14)`
                    : `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px ${cardAccent}16, inset 0 -18px 46px rgba(13,27,42,0.028)`,
                  ["--service-hover-shadow" as string]: isDark
                    ? `inset 0 1px 0 rgba(244,245,247,0.07), inset 0 0 0 1px ${cardAccent}18, inset 0 -28px 68px ${cardAccent}0A, inset 0 26px 64px rgba(255,255,255,0.025)`
                    : `inset 0 1px 0 rgba(255,255,255,0.96), inset 0 0 0 1px ${cardAccent}24, inset 0 -26px 64px ${cardAccent}08, inset 0 24px 62px rgba(255,255,255,0.82)`,
                  width: "clamp(285px, 31vw, 350px)",
                  minHeight: 335,
                  scrollSnapAlign: "start",
                  background: isDark
                    ? `linear-gradient(145deg, color-mix(in srgb, ${cardAccent} 7%, rgba(4,8,16,0.995)) 0%, rgba(7,13,24,0.985) 48%, color-mix(in srgb, ${cardAccent} 4%, rgba(2,6,13,0.998)) 100%)`
                    : `linear-gradient(145deg, rgba(255,255,255,0.98) 0%, color-mix(in srgb, ${cardAccent} 2%, rgba(250,252,255,0.96)) 58%, rgba(246,249,253,0.98) 100%)`,
                  border: `1px solid ${isDark ? `${cardAccent}22` : `${cardAccent}32`}`,
                }}
              >
                <div
                  aria-hidden="true"
                  className="service-card__field absolute inset-0"
                />
                <div
                  aria-hidden="true"
                  className="service-card__aura service-card__aura--main absolute rounded-full opacity-0"
                />
                {/* Title with large first letter */}
                <div className="relative z-10 flex flex-1 flex-col justify-center transition-transform duration-700 ease-out group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
                  <h3
                    className="mb-4 flex min-h-[2.2em] items-center transition-transform duration-700 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(1.65rem, 2.7vw, 2.15rem)",
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      color: p.text,
                      textShadow: isDark ? "0 14px 32px rgba(0,0,0,0.45)" : "none",
                    }}
                  >
                    <span>
                      {titleParts.map((part, partIndex) => {
                        if (/^\s+$/.test(part)) return <span key={`${part}-${partIndex}`}>{part}</span>;

                        const firstLetter = part.charAt(0);
                        const rest = part.slice(1);
                        const shouldAccent = /\p{Lu}/u.test(firstLetter);

                        return (
                          <span key={`${part}-${partIndex}`}>
                            {shouldAccent ? <span style={{ color: cardAccent }}>{firstLetter}</span> : firstLetter}
                            {rest}
                          </span>
                        );
                      })}
                    </span>
                  </h3>
                  <span aria-hidden="true" className="service-card__title-rule mb-6" />
                  <div className="relative min-h-[4.9rem]">
                    <p
                      className="absolute inset-0 transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:opacity-0 group-focus-visible:-translate-y-4 group-focus-visible:opacity-0"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        color: r(0.38),
                      }}
                    >
                      {t(service.descKey as TranslationKey)}
                    </p>
                    <p
                      className="absolute inset-0 translate-y-5 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.82rem",
                        lineHeight: 1.62,
                        color: isDark ? r(0.68) : r(0.66),
                        textShadow: isDark ? `0 0 20px ${cardAccent}20` : `0 8px 22px rgba(13,27,42,0.08)`,
                      }}
                    >
                      {t(service.hoverKey as TranslationKey)}
                    </p>
                  </div>
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
                background: activeIdx === i ? serviceAccents[i % serviceAccents.length] : r(0.1),
                boxShadow: activeIdx === i ? `0 0 18px ${serviceAccents[i % serviceAccents.length]}55` : "none",
                opacity: activeIdx === i ? 0.95 : 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
