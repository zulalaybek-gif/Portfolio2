import { motion } from "motion/react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { AmbientMovingLines } from "./AmbientMovingLines";

const paragraphs = [
  "personalIntro.p1",
  "personalIntro.p2",
] as const;

export function PersonalIntroSection() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const accent = isDark ? "#7FD6FF" : "#2F6BFF";
  const secondaryAccent = isDark ? "#7B2D52" : "#9B214F";

  return (
    <section data-section="personal-intro" className="relative w-full px-6 md:px-12 py-24 md:py-28 overflow-hidden">
      <AmbientMovingLines className="absolute inset-x-0 top-10 z-0" height="72%" opacity={isDark ? 0.12 : 0.09} />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: "-18%",
          top: "8%",
          width: "clamp(240px, 34vw, 520px)",
          height: "clamp(240px, 34vw, 520px)",
          background: `radial-gradient(circle, ${accent}20 0%, ${secondaryAccent}0F 42%, transparent 72%)`,
          filter: "blur(30px)",
          opacity: isDark ? 0.68 : 0.42,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.95fr_1.25fr] md:items-start lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "180px 0px" }}
          transition={{ duration: 0.8 }}
          className="md:sticky md:top-28"
        >
          <span
            className="section-eyebrow mb-5 inline-block uppercase tracking-widest"
            style={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", color: r(0.38), letterSpacing: "0.15em" }}
          >
            — {t("personalIntro.badge")}
          </span>
          <h2
            className="max-w-2xl text-[2.45rem] sm:text-[3.35rem] lg:max-w-[11ch] lg:text-[5.1rem]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: 0,
              color: p.text,
              textWrap: "balance",
            }}
          >
            {t("personalIntro.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "180px 0px" }}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 hidden h-full w-px md:block"
            style={{
              background: `linear-gradient(180deg, transparent, ${accent}66 18%, ${secondaryAccent}55 64%, transparent)`,
            }}
          />
          <div className="md:pl-10 lg:pl-14">
            <div className="space-y-7">
              {paragraphs.map((key, index) => (
                <p
                  key={key}
                  className={index === 0 ? "text-[1.05rem] md:text-[1.14rem]" : "text-[0.98rem] md:text-[1.04rem]"}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: index === 0 ? 500 : 400,
                    lineHeight: index === 0 ? 1.78 : 1.82,
                    color: index === 0 ? r(isDark ? 0.78 : 0.82) : r(isDark ? 0.62 : 0.68),
                    maxWidth: index === 0 ? 720 : 660,
                    textWrap: "pretty",
                  }}
                >
                  {t(key as TranslationKey)}
                </p>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-5">
              <span className="h-px w-12" style={{ background: `linear-gradient(90deg, ${accent}88, transparent)` }} />
              <span
                className="text-[2.1rem] md:text-[2.6rem]"
                style={{
                  fontFamily: "'Reenie Beanie', cursive",
                  lineHeight: 1,
                  color: r(isDark ? 0.8 : 0.78),
                }}
              >
                {t("personalIntro.signature")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
