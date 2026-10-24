import type { Locale, Localized } from "./config";
import es from "./dictionaries/es.json";
import ca from "./dictionaries/ca.json";
import en from "./dictionaries/en.json";

// Textos de la interfaz (menú, botones, títulos de sección).
// El contenido personal vive en `src/content/`.
export type Dictionary = typeof es;

const dictionaries = { es, ca, en } satisfies Record<Locale, Dictionary>;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

// Devuelve el texto en el idioma pedido. Acepta un texto fijo (igual
// en todos los idiomas) o un objeto { es, ca, en }.
export const tr = (value: string | Localized, locale: Locale): string =>
  typeof value === "string" ? value : value[locale];
