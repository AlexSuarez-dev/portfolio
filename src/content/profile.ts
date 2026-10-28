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

  // Se usa en el SEO y en la imagen que aparece al compartir el enlace.
  role: {
    es: "Estudiante de Ingeniería Informática · UAB",
    ca: "Estudiant d'Enginyeria Informàtica · UAB",
    en: "Computer Engineering student · UAB",
  } satisfies Localized,

  // Línea grande bajo tu nombre en el inicio.
  headline: {
    es: "Backend con Java y Spring Boot · Ingeniería Informática en la UAB",
    ca: "Backend amb Java i Spring Boot · Enginyeria Informàtica a la UAB",
    en: "Backend with Java and Spring Boot · Computer Engineering at UAB",
  } satisfies Localized,

  tagline: {
    es: "Construyo aplicaciones de principio a fin: desde la API y la base de datos hasta la app y el despliegue. Ahora mismo, integrando IA en una app real.",
    ca: "Construeixo aplicacions de principi a fi: des de l'API i la base de dades fins a l'app i el desplegament. Ara mateix, integrant IA en una app real.",
    en: "I build applications end to end: from the API and the database to the app and its deployment. Right now, integrating AI into a real-world app.",
  } satisfies Localized,

  // Datos rápidos bajo los botones del inicio.
  heroFacts: {
    es: ["Técnico TIC desde 2022", "250+ commits en NutriApp", "Docker · Oracle Cloud · Cloudflare"],
    ca: ["Tècnic TIC des del 2022", "250+ commits a NutriApp", "Docker · Oracle Cloud · Cloudflare"],
    en: ["IT technician since 2022", "250+ commits on NutriApp", "Docker · Oracle Cloud · Cloudflare"],
  } satisfies LocalizedList,

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

  // Experiencia laboral, de la más reciente a la más antigua.
  experience: [
    {
      title: { es: "Técnico TIC", ca: "Tècnic TIC", en: "IT Technician" },
      place: "Turisme de Barcelona",
      period: { es: "2022 — hoy", ca: "2022 — avui", en: "2022 — present" },
      text: {
        es: "Centralización de datos: procesos ETL y bases de datos MySQL y SQL Server, compaginado con la carrera.",
        ca: "Centralització de dades: processos ETL i bases de dades MySQL i SQL Server, compaginat amb la carrera.",
        en: "Data centralisation: ETL processes and MySQL and SQL Server databases, alongside my degree.",
      },
    },
  ] satisfies { title: Localized; place: string; period: Localized; text: Localized }[],

  education: [
    {
      title: {
        es: "Grado en Ingeniería Informática",
        ca: "Grau en Enginyeria Informàtica",
        en: "Bachelor's Degree in Computer Engineering",
      },
      place: "Universitat Autònoma de Barcelona (UAB)",
      period: {
        es: "En curso · 3º",
        ca: "En curs · 3r",
        en: "In progress · 3rd year",
      },
      text: {
        es: "Proyectos en equipo como Geotracking turístico, con React y Spring Boot.",
        ca: "Projectes en equip com Geotracking turístic, amb React i Spring Boot.",
        en: "Team projects such as the tourism geotracking app, with React and Spring Boot.",
      },
    },
  ] satisfies { title: Localized; place: string; period: Localized; text: Localized }[],
};
