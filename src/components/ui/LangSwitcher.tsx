import Link from "next/link";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { cn } from "./primitives";

/** Selector ES · CA · EN. Cada idioma tiene su propia URL (/es, /ca, /en). */
export function LangSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center font-mono text-xs">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="px-1 text-line" aria-hidden>·</span>}
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            title={localeNames[locale]}
            aria-current={locale === current ? "page" : undefined}
            className={cn(
              "grid min-h-11 min-w-8 place-items-center uppercase transition-colors",
              locale === current ? "text-accent" : "text-muted hover:text-fg",
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
