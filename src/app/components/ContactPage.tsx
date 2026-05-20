import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n, type TranslationKey } from "./i18n";
import { useTheme } from "./theme";
import { CompositeTitle } from "./CompositeTitle";

const projectTypeKeys = [
  "contact.type.identity",
  "contact.type.artDirection",
  "contact.type.web",
  "contact.type.motion",
  "contact.type.other",
] as const;

export function ContactPage() {
  const { t } = useI18n();
  const { p, r, isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const accent = isDark ? "#DFF440" : "#4B8197";
  const glowColor = "223,244,64";
  const blueGlow = "75,129,151";
  const cherryGlow = "193,33,68";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      data-section="contact"
      className="relative w-full px-6 md:px-12 py-16 md:py-24 overflow-hidden"
      style={{ color: p.text }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isDark ? 0.24 : 0.28, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "clamp(280px, 42vw, 620px)",
          height: "clamp(280px, 42vw, 620px)",
          right: "-12%",
          top: "-18%",
          background: `radial-gradient(circle, rgba(${blueGlow},0.18), rgba(${glowColor},0.08) 42%, rgba(${cherryGlow},0.055) 58%, transparent 74%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4"
        >
          <span
            className="inline-block uppercase tracking-widest mb-8"
            style={{
              fontSize: "0.65rem",
              fontFamily: "'Inter', sans-serif",
              color: r(0.35),
              letterSpacing: "0.15em",
            }}
          >
            - {t("contact.badge" as TranslationKey)}
          </span>

          <CompositeTitle
            as="h1"
            size="section"
            primary={t("contact.title1" as TranslationKey)}
            secondary={t("contact.title2" as TranslationKey)}
          />

          <p
            className="mt-8 max-w-md"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: r(0.48),
            }}
          >
            {t("contact.intro" as TranslationKey)}
          </p>

          <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${r(0.08)}` }}>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.25), letterSpacing: "0.14em" }}
            >
              {t("contact.emailAlt" as TranslationKey)}
            </p>
            <a
              href="mailto:zulal.aybek@gmail.com"
              className="inline-flex items-center gap-2 transition-opacity duration-300 hover:opacity-70"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", color: r(0.72), textDecoration: "none" }}
            >
              zulal.aybek@gmail.com
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-8">
            <p
              className="uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: r(0.25), letterSpacing: "0.14em" }}
            >
              Signature
            </p>
            <p
              style={{
                fontFamily: "'Reenie Beanie', 'Brush Script MT', cursive",
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                lineHeight: 0.9,
                color: accent,
                transform: "rotate(-5deg)",
                transformOrigin: "left center",
              }}
            >
              Zulâl Aybek
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] p-6 md:p-9"
          style={{
            color: p.text,
            background: isDark
              ? `radial-gradient(circle at 18% 18%, rgba(${blueGlow},0.16), transparent 36%), radial-gradient(circle at 84% 20%, rgba(${glowColor},0.055), transparent 25%), linear-gradient(145deg, rgba(241,241,241,0.052), rgba(35,38,36,0.12), rgba(241,241,241,0.014))`
              : `radial-gradient(circle at 16% 18%, rgba(${blueGlow},0.1), transparent 36%), radial-gradient(circle at 84% 18%, rgba(${glowColor},0.1), transparent 25%), radial-gradient(circle at 68% 82%, rgba(${cherryGlow},0.038), transparent 36%), linear-gradient(145deg, rgba(241,241,241,0.92), rgba(247,247,245,0.84))`,
            border: `1px solid ${r(0.08)}`,
            boxShadow: isDark
              ? `0 28px 90px rgba(0,0,0,0.36), inset 0 1px 0 rgba(241,241,241,0.06), 0 0 44px rgba(${blueGlow},0.045), 0 0 30px rgba(${glowColor},0.03)`
              : `0 28px 90px rgba(35,38,36,0.13), inset 0 1px 0 rgba(255,255,255,0.88), 0 0 48px rgba(${blueGlow},0.06), 0 0 30px rgba(${glowColor},0.048)`,
            backdropFilter: "blur(18px)",
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-[420px] flex flex-col items-center justify-center text-center"
              aria-live="polite"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: accent, color: isDark ? "#232624" : "#F1F1F1" }}
              >
                <Check size={22} />
              </div>
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: p.text,
                }}
              >
                {t("contact.sentTitle" as TranslationKey)}
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.8, color: r(0.46), maxWidth: 420 }}>
                {t("contact.sentDesc" as TranslationKey)}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02]"
                style={{ border: `1px solid ${r(0.12)}`, color: r(0.68), fontFamily: "'Inter', sans-serif", fontSize: "0.82rem" }}
              >
                {t("contact.sendAnother" as TranslationKey)}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <ContactField label={t("contact.name" as TranslationKey)} name="name" type="text" required />
              <ContactField label={t("contact.email" as TranslationKey)} name="email" type="email" required />

              <label className="grid gap-2">
                <span className="contact-label">{t("contact.type" as TranslationKey)}</span>
                <select name="projectType" required className="contact-input">
                  <option value="">{t("contact.typePlaceholder" as TranslationKey)}</option>
                  {projectTypeKeys.map((key) => (
                    <option key={key} value={t(key)}>
                      {t(key)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="contact-label">{t("contact.message" as TranslationKey)}</span>
                <textarea name="message" required rows={6} className="contact-input resize-none" />
              </label>

              <button
                type="submit"
                className="group mt-3 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 transition-all duration-500 hover:scale-[1.018] active:scale-[0.985]"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, #DFF440 0%, #CFE83A 58%, #4B8197 145%)"
                    : "linear-gradient(135deg, #232624 0%, #4B8197 62%, #C12144 145%)",
                  color: isDark ? "#232624" : "#F1F1F1",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.84rem",
                  fontWeight: 650,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  boxShadow: isDark
                    ? `0 16px 46px rgba(${glowColor},0.13), 0 0 24px rgba(${blueGlow},0.06)`
                    : `0 16px 46px rgba(${blueGlow},0.095), 0 0 24px rgba(${cherryGlow},0.05)`,
                }}
              >
                {t("contact.submit" as TranslationKey)}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ContactField({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="contact-label">{label}</span>
      <input name={name} type={type} required={required} className="contact-input" />
    </label>
  );
}
