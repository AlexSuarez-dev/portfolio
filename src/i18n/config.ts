// Idiomas disponibles. El primero de la lista no tiene nada especial:
// el idioma por defecto se define en `defaultLocale`.
export const locales = ["es", "ca", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
};

// Para Open Graph (formato idioma_PAÍS).
export const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_US",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Un texto escrito en los tres idiomas. Se usa en todo `src/content/`.
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;
