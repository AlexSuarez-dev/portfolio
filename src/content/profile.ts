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
  linkedin: "https://www.linkedin.com/in/alexms-dev",

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
  // `current: true` enciende el LED (sigue en curso).
  experience: [
    {
      title: {
        es: "Desarrollador y técnico TIC",
        ca: "Desenvolupador i tècnic TIC",
        en: "ICT Developer & Technician",
      },
      place: "Turisme de Barcelona",
      period: { es: "Jun 2022 — hoy", ca: "Juny 2022 — avui", en: "Jun 2022 — present" },
      current: true,
      text: {
        es: "Compaginado con los estudios: primero los dos CFGS y ahora la carrera.",
        ca: "Compaginat amb els estudis: primer els dos CFGS i ara la carrera.",
        en: "Alongside my studies: first two vocational degrees, now my university degree.",
      },
      points: {
        es: [
          "Lidero la centralización de datos que sustituye los Excel sueltos: una plataforma de inventario con Java, Spring Boot, Hibernate y MySQL, con arquitectura hexagonal y vertical slicing, que ya gestiona más de 200 ordenadores en producción.",
          "App de localización en tiempo real (React Native, Java y Node.js) que usan los informadores turísticos en cada turno de 8:00 a 20:00 para compartir su posición por la ciudad.",
          "Herramientas web internas y públicas: formularios del personal de calle para el departamento de estadística y webs con el tiempo en directo y los próximos eventos de la ciudad.",
          "Procesos ETL con Pentaho y optimización de consultas en MySQL y SQL Server.",
        ],
        ca: [
          "Lidero la centralització de dades que substitueix els Excel solts: una plataforma d'inventari amb Java, Spring Boot, Hibernate i MySQL, amb arquitectura hexagonal i vertical slicing, que ja gestiona més de 200 ordinadors en producció.",
          "App de localització en temps real (React Native, Java i Node.js) que fan servir els informadors turístics a cada torn de 8:00 a 20:00 per compartir la seva posició per la ciutat.",
          "Eines web internes i públiques: formularis del personal de carrer per al departament d'estadística i webs amb el temps en directe i els propers esdeveniments de la ciutat.",
          "Processos ETL amb Pentaho i optimització de consultes a MySQL i SQL Server.",
        ],
        en: [
          "I lead the data centralisation effort that replaces scattered Excel files: an inventory platform with Java, Spring Boot, Hibernate and MySQL, built with hexagonal architecture and vertical slicing, now managing 200+ computers in production.",
          "Real-time location tracking app (React Native, Java and Node.js) used by tourist information officers on every 8:00–20:00 shift to share their position across the city.",
          "Internal and public web tools: forms filled in by field staff for the statistics department, plus web apps with live weather and upcoming city events.",
          "ETL processes with Pentaho and query optimisation in MySQL and SQL Server.",
        ],
      },
    },
  ] satisfies {
    title: Localized;
    place: string;
    period: Localized;
    current?: boolean;
    text: Localized;
    points: LocalizedList;
  }[],

  // Formación, de la más reciente a la más antigua. `badge` es la sigla corta.
  education: [
    {
      badge: "UAB",
      title: {
        es: "Grado en Ingeniería Informática",
        ca: "Grau en Enginyeria Informàtica",
        en: "Bachelor's Degree in Computer Engineering",
      },
      place: "Universitat Autònoma de Barcelona",
      period: { es: "2024 — hoy · 3º", ca: "2024 — avui · 3r", en: "2024 — present · 3rd year" },
      current: true,
    },
    {
      badge: "DAM",
      title: {
        es: "CFGS en Desarrollo de Aplicaciones Multiplataforma",
        ca: "CFGS en Desenvolupament d'Aplicacions Multiplataforma",
        en: "Higher Technician in Multiplatform App Development",
      },
      place: "Escola del Treball",
      period: { es: "2023 — 2024", ca: "2023 — 2024", en: "2023 — 2024" },
    },
    {
      badge: "DAW",
      title: {
        es: "CFGS en Desarrollo de Aplicaciones Web",
        ca: "CFGS en Desenvolupament d'Aplicacions Web",
        en: "Higher Technician in Web Application Development",
      },
      place: "Institut La Guineueta",
      period: { es: "2021 — 2023", ca: "2021 — 2023", en: "2021 — 2023" },
    },
  ] satisfies { badge: string; title: Localized; place: string; period: Localized; current?: boolean }[],
};
