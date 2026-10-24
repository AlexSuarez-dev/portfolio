import type { Localized } from "@/i18n/config";

/**
 * Tecnologías agrupadas. Pon solo lo que hayas usado de verdad:
 * en una entrevista te pueden preguntar por cualquiera.
 */
// Cada tecnología puede ser un texto fijo o un texto por idioma.
export const skillGroups: { title: Localized; items: (string | Localized)[] }[] = [
  {
    title: { es: "Backend", ca: "Backend", en: "Backend" },
    items: ["Java", "Spring Boot", "Spring Security", "JWT", "JPA / Hibernate", "Java Servlets", "JUnit"],
  },
  {
    title: { es: "Frontend y móvil", ca: "Frontend i mòbil", en: "Frontend & mobile" },
    items: ["React", "React Native", "Expo", "TypeScript"],
  },
  {
    title: { es: "Datos", ca: "Dades", en: "Data" },
    items: ["MySQL", "SQL"],
  },
  {
    title: { es: "Infraestructura", ca: "Infraestructura", en: "Infrastructure" },
    items: ["Docker", "Oracle Cloud", "Cloudflare", "Git"],
  },
  {
    title: { es: "Conceptos", ca: "Conceptes", en: "Concepts" },
    items: [
      "REST",
      "MVC",
      { es: "Arquitectura en capas", ca: "Arquitectura en capes", en: "Layered architecture" },
      { es: "Patrones de diseño", ca: "Patrons de disseny", en: "Design patterns" },
      { es: "IA aplicada (Gemini, OpenAI)", ca: "IA aplicada (Gemini, OpenAI)", en: "Applied AI (Gemini, OpenAI)" },
    ],
  },
];
