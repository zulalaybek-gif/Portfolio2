import { useI18n } from "./i18n";
import { useTheme } from "./theme";

export function Footer() {
  const { t, lang } = useI18n();
  const { p, r } = useTheme();

  return (
    <footer
      className="site-footer-signature w-full px-8 md:px-12 py-10 relative"
      style={{ borderTop: `1px solid ${p.footerBorder}` }}
    >
      <div
        aria-hidden="true"
        className="absolute left-8 right-8 md:left-12 md:right-12 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(12,96,126,0.32), rgba(199,164,106,0.1), transparent)",
        }}
      />
      <div className="max-w-6xl mx-auto flex items-end justify-between flex-wrap gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: r(0.66),
              }}
            >
              Zulâl Aybek
            </span>
            <span
              className="h-px w-10"
              style={{ background: `linear-gradient(90deg, ${r(0.18)}, transparent)` }}
            />
            <span
              className="uppercase tracking-widest"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.58rem",
                color: r(0.28),
                letterSpacing: "0.16em",
              }}
            >
              {lang === "fr" ? "Direction artistique" : "Art direction"}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: r(0.25),
            }}
          >
            {t("footer.copy")}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/zulal-aybek" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: r(0.3),
              }}
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
