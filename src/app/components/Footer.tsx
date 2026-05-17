import { useI18n } from "./i18n";
import { useTheme } from "./theme";

export function Footer() {
  const { t } = useI18n();
  const { p, r } = useTheme();

  return (
    <footer
      className="w-full px-8 md:px-12 py-10"
      style={{ borderTop: `1px solid ${p.footerBorder}` }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
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