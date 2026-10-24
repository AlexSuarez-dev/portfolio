import type { Localized, LocalizedList } from "@/i18n/config";

/**
 * Proyectos. Para añadir uno nuevo, copia un bloque { ... } entero,
 * pégalo en la lista y cambia los textos. El orden de la lista es el
 * orden en la web.
 */
export type Project = {
  slug: string; // identificador único, sin espacios
  title: string;
  featured?: boolean; // true = tarjeta grande, ancho completo
  context: Localized; // línea pequeña sobre el título
  summary: Localized; // 1-2 frases
  highlights: LocalizedList; // lo más destacable, en viñetas
  learned: Localized; // qué aprendiste
  stack: string[];
  repo?: string; // URL de GitHub (déjalo sin poner si es privado)
  demo?: string; // URL de la demo, si existe
  privateRepo?: boolean; // muestra "repositorio privado" en vez del enlace
  // Imagen de portada. Si `src` está vacío se muestra un hueco de foto.
  image?: { src: string; alt: Localized };
};

export const projects: Project[] = [
  {
    slug: "nutriapp",
    title: "NutriApp",
    featured: true,
    context: {
      es: "Proyecto personal · Individual · En producción",
      ca: "Projecte personal · Individual · En producció",
      en: "Personal project · Solo · In production",
    },
    summary: {
      es: "App móvil de nutrición que calcula tus macros y registra comidas por foto o texto con IA, con un chat que recuerda tus preferencias y alergias.",
      ca: "App mòbil de nutrició que calcula els teus macros i registra àpats per foto o text amb IA, amb un xat que recorda les teves preferències i al·lèrgies.",
      en: "Mobile nutrition app that calculates your macros and logs meals from a photo or text using AI, with a chat that remembers your preferences and allergies.",
    },
    highlights: {
      es: [
        "IA desacoplada del resto de la app: una interfaz común con fallback automático de Gemini a OpenAI y una cuota diaria por usuario, encadenados con el patrón Decorator.",
        "Autenticación con JWT y Spring Security, y límite de intentos de login por IP y por cuenta para frenar ataques de fuerza bruta.",
        "API REST en capas (controller → service → repository) con DTOs, validación y tests con JUnit.",
        "Desplegada con Docker en Oracle Cloud, detrás del proxy de Cloudflare, con despliegue automático nocturno y scripts de rollback.",
        "Planificada y desarrollada yo solo: documento de requisitos, contrato de API, validación previa con una encuesta y más de 250 commits.",
      ],
      ca: [
        "IA desacoblada de la resta de l'app: una interfície comuna amb fallback automàtic de Gemini a OpenAI i una quota diària per usuari, encadenats amb el patró Decorator.",
        "Autenticació amb JWT i Spring Security, i límit d'intents de login per IP i per compte per frenar atacs de força bruta.",
        "API REST en capes (controller → service → repository) amb DTOs, validació i tests amb JUnit.",
        "Desplegada amb Docker a Oracle Cloud, darrere del proxy de Cloudflare, amb desplegament automàtic nocturn i scripts de rollback.",
        "Planificada i desenvolupada jo sol: document de requisits, contracte d'API, validació prèvia amb una enquesta i més de 250 commits.",
      ],
      en: [
        "AI decoupled from the rest of the app: a common interface with automatic fallback from Gemini to OpenAI and a daily per-user quota, chained with the Decorator pattern.",
        "Authentication with JWT and Spring Security, plus login attempt limits per IP and per account to stop brute-force attacks.",
        "Layered REST API (controller → service → repository) with DTOs, validation and JUnit tests.",
        "Deployed with Docker on Oracle Cloud, behind Cloudflare's proxy, with automatic nightly deploys and rollback scripts.",
        "Planned and built on my own: requirements document, API contract, early validation through a survey and 250+ commits.",
      ],
    },
    learned: {
      es: "A integrar IA en una app de verdad (y prepararla para cuando falla), a organizarme un proyecto largo sin nadie que me marque el ritmo y a diseñar la seguridad con JWT de principio a fin.",
      ca: "A integrar IA en una app de veritat (i preparar-la per quan falla), a organitzar-me un projecte llarg sense ningú que em marqui el ritme i a dissenyar la seguretat amb JWT de principi a fi.",
      en: "How to integrate AI into a real app (and prepare it for when it fails), how to organise a long project with no one setting the pace, and how to design JWT security end to end.",
    },
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "JPA",
      "MySQL",
      "JUnit",
      "Docker",
      "Oracle Cloud",
      "Cloudflare",
    ],
    privateRepo: true,
    // TODO: captura de la app, p. ej. "/images/projects/nutriapp.jpg"
    image: {
      src: "",
      alt: {
        es: "Capturas de NutriApp",
        ca: "Captures de NutriApp",
        en: "NutriApp screenshots",
      },
    },
  },
  {
    slug: "geotracking-turismo",
    // TODO: cambia el título por el nombre real del proyecto.
    title: "Geotracking turístico",
    context: {
      es: "Proyecto académico · Equipo de 3",
      ca: "Projecte acadèmic · Equip de 3",
      en: "University project · Team of 3",
    },
    summary: {
      es: "Aplicación web de geotracking orientada al turismo, desarrollada en equipo como proyecto de la carrera.",
      ca: "Aplicació web de geotracking orientada al turisme, desenvolupada en equip com a projecte de la carrera.",
      en: "Tourism-oriented geotracking web application, built as a team for a university course.",
    },
    highlights: {
      es: [
        "Arquitectura MVC con frontend en React y backend en Spring Boot.",
        "Persistencia con Hibernate y JPA.",
        "Pruebas del backend con servlets de Java.",
      ],
      ca: [
        "Arquitectura MVC amb frontend en React i backend en Spring Boot.",
        "Persistència amb Hibernate i JPA.",
        "Proves del backend amb servlets de Java.",
      ],
      en: [
        "MVC architecture with a React frontend and a Spring Boot backend.",
        "Persistence with Hibernate and JPA.",
        "Backend testing with Java servlets.",
      ],
    },
    learned: {
      es: "A transformar datos JSON en DTOs de forma ordenada y a entender a fondo el patrón MVC trabajando en equipo.",
      ca: "A transformar dades JSON en DTOs de manera ordenada i a entendre a fons el patró MVC treballant en equip.",
      en: "How to map JSON data to DTOs cleanly and how to really understand the MVC pattern while working in a team.",
    },
    stack: ["React", "Spring Boot", "Hibernate", "JPA", "Java Servlets"],
  },
];
