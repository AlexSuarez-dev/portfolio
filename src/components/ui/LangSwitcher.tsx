import Link from "next/link";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { cn } from "./primitives";

/** Selector es · ca · en. Cada idioma tiene su propia URL (/es, /ca, /en). */
export function LangSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center font-mono text-sm">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          lang={locale}
          title={localeNames[locale]}
          aria-current={locale === current ? "page" : undefined}
          className={cn(
            "grid min-h-11 min-w-9 place-items-center transition-colors",
            locale === current ? "text-fg" : "text-muted hover:text-fg",
          )}
        >
          {locale}
        </Link>
      ))}
    </nav>
  );
}
