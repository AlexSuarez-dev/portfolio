import Link from "next/link";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { cn } from "./primitives";

/**
 * Banderas de cada idioma, simplificadas para verse bien a 22 px.
 * Sin ids ni clipPaths, así se pueden repetir en la página sin chocar.
 */
const flags: Record<Locale, React.ReactNode> = {
  // España (sin escudo)
  es: (
    <svg viewBox="0 0 6 4" preserveAspectRatio="none">
      <rect width="6" height="4" fill="#AA151B" />
      <rect y="1" width="6" height="2" fill="#F1BF00" />
    </svg>
  ),
  // Senyera: nueve franjas, cinco amarillas y cuatro rojas
  ca: (
    <svg viewBox="0 0 9 9" preserveAspectRatio="none">
      <rect width="9" height="9" fill="#FCDD09" />
      <path d="M0 1.5h9M0 3.5h9M0 5.5h9M0 7.5h9" stroke="#DA121A" strokeWidth="1" />
    </svg>
  ),
  // Reino Unido
  en: (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2.4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
};

/** Selector de idioma con banderas. Cada idioma tiene su propia URL (/es, /ca, /en). */
export function LangSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            title={localeNames[locale]}
            aria-current={active ? "page" : undefined}
            className="group relative grid min-h-11 min-w-9 place-items-center"
          >
            <span
              aria-hidden
              className={cn(
                "block h-[15px] w-[22px] overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgb(0_0_0/0.25)] transition-[opacity,filter,transform] duration-200 [&>svg]:size-full",
                active
                  ? "opacity-100"
                  : "opacity-60 saturate-[0.8] group-hover:-translate-y-px group-hover:opacity-100 group-hover:saturate-100",
              )}
            >
              {flags[locale]}
            </span>
            {/* El idioma activo lleva un trazo de neón debajo. */}
            {active && <span aria-hidden className="led absolute bottom-[7px] h-[2px] w-[18px] rounded-full bg-tube" />}
            <span className="sr-only">{localeNames[locale]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
