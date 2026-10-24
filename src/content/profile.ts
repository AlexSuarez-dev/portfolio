import type { Localized, LocalizedList } from "@/i18n/config";

/**
 * Datos personales y textos principales.
 *
 * - Deja un campo como "" (cadena vacía) para ocultarlo en la web:
 *   así no aparece ningún botón ni enlace roto.
 * - Las rutas que empiezan por "/" apuntan a la carpeta `public/`.
 */
export const profile = {
  name: "Alejandro Manzanares",

  // URL pública de la web. Cámbiala cuando tengas dominio propio:
  // se usa para el SEO, Open Graph y el sitemap.
  siteUrl: "https://alexsuarez-dev.vercel.app",

  email: "alexmanzanares98@gmail.com",
  github: "https://github.com/AlexSuarez-dev",
  linkedin: "", // TODO: pega aquí la URL de tu perfil de LinkedIn

  // TODO: guarda tu CV como public/cv/cv-alejandro-manzanares.pdf
  // y escribe aquí "/cv/cv-alejandro-manzanares.pdf".
  cv: "",

  // TODO: guarda tu foto como public/images/personal/retrato.jpg
  // y escribe aquí "/images/personal/retrato.jpg".
  photo: "",

  role: {
    es: "Estudiante de Ingeniería Informática · UAB",
    ca: "Estudiant d'Enginyeria Informàtica · UAB",
    en: "Computer Engineering student · UAB",
  } satisfies Localized,

  tagline: {
    es: "Construyo aplicaciones de principio a fin: desde la API y la base de datos hasta la app y el despliegue. Ahora mismo, integrando IA en una app real.",
    ca: "Construeixo aplicacions de principi a fi: des de l'API i la base de dades fins a l'app i el desplegament. Ara mateix, integrant IA en una app real.",
    en: "I build applications end to end: from the API and the database to the app and its deployment. Right now, integrating AI into a real-world app.",
  } satisfies Localized,

  // Párrafos de la sección "Sobre mí".
  about: {
    es: [
      "Estoy en 3º de Ingeniería Informática en la Universitat Autònoma de Barcelona. Lo que más me engancha es llevar una idea hasta producción: plantear los requisitos, diseñar la arquitectura, escribir el código y desplegarlo.",
      "Mi proyecto principal es NutriApp, una app de nutrición con IA que he construido yo solo y que ya funciona en un servidor propio. Me muevo cómodo en backend con Java y Spring Boot, y cada vez más en frontend con React y React Native.",
      "Fuera del código: gimnasio, motos y airsoft.",
    ],
    ca: [
      "Estic a 3r d'Enginyeria Informàtica a la Universitat Autònoma de Barcelona. El que més m'enganxa és portar una idea fins a producció: plantejar els requisits, dissenyar l'arquitectura, escriure el codi i desplegar-lo.",
      "El meu projecte principal és NutriApp, una app de nutrició amb IA que he construït jo sol i que ja funciona en un servidor propi. Em moc còmode al backend amb Java i Spring Boot, i cada cop més al frontend amb React i React Native.",
      "Fora del codi: gimnàs, motos i airsoft.",
    ],
    en: [
      "I'm in my third year of Computer Engineering at the Universitat Autònoma de Barcelona. What hooks me the most is taking an idea all the way to production: defining the requirements, designing the architecture, writing the code and deploying it.",
      "My main project is NutriApp, an AI-powered nutrition app I've built on my own and that already runs on my own server. I'm comfortable on the backend with Java and Spring Boot, and increasingly on the frontend with React and React Native.",
      "Away from the code: the gym, motorbikes and airsoft.",
    ],
  } satisfies LocalizedList,

  // Ficha estilo terminal del inicio. `value` puede ser un texto fijo
  // o un texto por idioma.
  status: [
    { key: { es: "estudios", ca: "estudis", en: "studies" }, value: "ing_informática @ UAB" },
    { key: { es: "curso", ca: "curs", en: "year" }, value: { es: "3º", ca: "3r", en: "3rd" } },
    { key: { es: "proyecto_actual", ca: "projecte_actual", en: "current_project" }, value: "NutriApp" },
    { key: { es: "stack", ca: "stack", en: "stack" }, value: "java · spring · react" },
    { key: { es: "aprendiendo", ca: "aprenent", en: "learning" }, value: { es: "siempre", ca: "sempre", en: "always" } },
  ] satisfies { key: Localized; value: string | Localized }[],

  education: [
    {
      title: {
        es: "Grado en Ingeniería Informática",
        ca: "Grau en Enginyeria Informàtica",
        en: "Bachelor's Degree in Computer Engineering",
      },
      place: "Universitat Autònoma de Barcelona (UAB)",
      period: {
        es: "Actualmente en 3º curso",
        ca: "Actualment a 3r curs",
        en: "Currently in 3rd year",
      },
    },
  ] satisfies { title: Localized; place: string; period: Localized }[],
};
