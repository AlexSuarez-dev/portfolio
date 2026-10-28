import type { Localized } from "@/i18n/config";
import type { TechId } from "./tech";

/**
 * Tecnologías agrupadas (se muestran con su logo). Pon solo lo que hayas
 * usado de verdad: en una entrevista te pueden preguntar por cualquiera.
 * Los identificadores están en `tech.ts`.
 */
export const skillGroups: { title: Localized; items: TechId[] }[] = [
  {
    title: { es: "Backend", ca: "Backend", en: "Backend" },
    items: ["java", "springBoot", "springSecurity", "jwt", "hibernate", "junit"],
  },
  {
    title: { es: "Frontend y móvil", ca: "Frontend i mòbil", en: "Frontend & mobile" },
    items: ["react", "reactNative", "expo", "typescript"],
  },
  {
    title: { es: "Datos", ca: "Dades", en: "Data" },
    items: ["mysql", "sqlServer"],
  },
  {
    title: { es: "Infraestructura", ca: "Infraestructura", en: "Infrastructure" },
    items: ["docker", "oracleCloud", "cloudflare", "git"],
  },
];

// Conceptos sin logo: se muestran como una línea de texto.
export const concepts: (string | Localized)[] = [
  "REST",
  "MVC",
  { es: "Arquitectura en capas", ca: "Arquitectura en capes", en: "Layered architecture" },
  { es: "Patrones de diseño", ca: "Patrons de disseny", en: "Design patterns" },
  "ETL",
  { es: "IA aplicada (Gemini, OpenAI)", ca: "IA aplicada (Gemini, OpenAI)", en: "Applied AI (Gemini, OpenAI)" },
];
