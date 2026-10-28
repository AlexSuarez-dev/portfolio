import type { Localized } from "@/i18n/config";
import type { TechId } from "./tech";

/**
 * Proyectos. El primero con `featured: true` se muestra en grande, con sus
 * pantallas en "pilares"; el resto, como tarjetas debajo.
 * Para añadir uno, copia un bloque { ... } y cambia los textos.
 */

/** Pantalla de la app en los pilares. Sin `image.src`, se ve un hueco rayado. */
export type Screen = {
  title: Localized;
  text: Localized;
  image?: { src: string; alt: Localized };
  // true = en vez de una foto, se dibuja la pantalla de inicio animada (`appDemo`).
  live?: boolean;
};

/** Datos de la pantalla de inicio de NutriApp que se "cargan" en la web. */
export type AppDemo = {
  date: string;
  kcal: number;
  kcalGoal: number;
  macros: { label: string; value: number; goal: number; color: string }[];
  meal: { name: string; detail: string };
  tabs: string[];
};

export type Project = {
  slug: string; // identificador único, sin espacios
  title: string;
  featured?: boolean;
  live?: boolean; // muestra la etiqueta "En producción"
  context: Localized; // línea pequeña junto al título
  summary: Localized; // 1-2 frases
  learned: Localized; // qué aprendiste
  stack: TechId[]; // ver `tech.ts`
  repo?: string; // URL de GitHub (déjalo sin poner si es privado)
  demo?: string; // URL de la demo, si existe
  privateRepo?: boolean; // muestra "repositorio privado" en vez del enlace
  // Solo para el proyecto destacado:
  screens?: Screen[];
  appDemo?: AppDemo;
  facts?: { key: Localized; title: Localized; text: Localized }[];
  architecture?: { key: string; title: Localized; detail: string; main?: boolean }[];
  architectureNote?: Localized;
};

export const projects: Project[] = [
  {
    slug: "nutriapp",
    title: "NutriApp",
    featured: true,
    live: true,
    context: {
      es: "Personal · en solitario · 250+ commits",
      ca: "Personal · en solitari · 250+ commits",
      en: "Personal · solo · 250+ commits",
    },
    summary: {
      es: "App móvil de nutrición que calcula tus macros y registra comidas por foto o texto con IA, con un chat que recuerda tus preferencias y alergias.",
      ca: "App mòbil de nutrició que calcula els teus macros i registra àpats per foto o text amb IA, amb un xat que recorda les teves preferències i al·lèrgies.",
      en: "Mobile nutrition app that calculates your macros and logs meals from a photo or text using AI, with a chat that remembers your preferences and allergies.",
    },
    learned: {
      es: "A integrar IA en una app de verdad (y prepararla para cuando falla), a organizarme un proyecto largo sin nadie que me marque el ritmo y a diseñar la seguridad con JWT de principio a fin. Lo planifiqué yo solo: documento de requisitos, contrato de API y validación previa con una encuesta.",
      ca: "A integrar IA en una app de veritat (i preparar-la per quan falla), a organitzar-me un projecte llarg sense ningú que em marqui el ritme i a dissenyar la seguretat amb JWT de principi a fi. El vaig planificar jo sol: document de requisits, contracte d'API i validació prèvia amb una enquesta.",
      en: "How to integrate AI into a real app (and prepare it for when it fails), how to organise a long project with no one setting the pace, and how to design JWT security end to end. I planned it on my own: requirements document, API contract and early validation through a survey.",
    },
    stack: ["java", "springBoot", "springSecurity", "reactNative", "typescript", "mysql", "docker", "oracleCloud", "cloudflare"],
    privateRepo: true,

    // Los tres pilares. El del centro es la pantalla de inicio animada.
    // TODO: guarda las otras dos capturas en public/images/projects/ y pon su ruta en `src`.
    screens: [
      {
        title: { es: "Registro con IA", ca: "Registre amb IA", en: "AI meal logging" },
        text: {
          es: "Una foto o una frase, y la app calcula los macros de la comida.",
          ca: "Una foto o una frase, i l'app calcula els macros de l'àpat.",
          en: "A photo or a sentence, and the app works out the meal's macros.",
        },
        image: {
          src: "", // TODO: "/images/projects/nutriapp-registro.jpg"
          alt: {
            es: "Pantalla de registro de comidas de NutriApp",
            ca: "Pantalla de registre d'àpats de NutriApp",
            en: "NutriApp meal logging screen",
          },
        },
      },
      {
        title: { es: "Tu día de un vistazo", ca: "El teu dia d'un cop d'ull", en: "Your day at a glance" },
        text: {
          es: "Calorías y macros del día frente a tu objetivo.",
          ca: "Calories i macros del dia davant del teu objectiu.",
          en: "Today's calories and macros against your goal.",
        },
        live: true,
      },
      {
        title: { es: "Un chat que recuerda", ca: "Un xat que recorda", en: "A chat that remembers" },
        text: {
          es: "Conoce tus preferencias y alergias antes de recomendarte nada.",
          ca: "Coneix les teves preferències i al·lèrgies abans de recomanar-te res.",
          en: "It knows your preferences and allergies before recommending anything.",
        },
        image: {
          src: "", // TODO: "/images/projects/nutriapp-chat.jpg"
          alt: {
            es: "Pantalla del chat con IA de NutriApp",
            ca: "Pantalla del xat amb IA de NutriApp",
            en: "NutriApp AI chat screen",
          },
        },
      },
    ],

    // Datos reales de la pantalla de inicio (captura del 27 de octubre).
    appDemo: {
      date: "Hoy, 27 oct",
      kcal: 582,
      kcalGoal: 2863,
      macros: [
        { label: "Proteína", value: 45, goal: 140, color: "#3b6fe0" },
        { label: "Carbohidratos", value: 55, goal: 425, color: "#e8a933" },
        { label: "Grasa", value: 19, goal: 67, color: "#e5533a" },
      ],
      meal: { name: "Pasta con salmón y atún", detail: "582 kcal · 45g prot · 55g carb · 19g grasa" },
      tabs: ["Home", "Chat", "Perfil"],
    },

    facts: [
      {
        key: { es: "IA", ca: "IA", en: "AI" },
        title: { es: "IA con red de seguridad", ca: "IA amb xarxa de seguretat", en: "AI with a safety net" },
        text: {
          es: "Interfaz común con fallback automático de Gemini a OpenAI y cuota diaria por usuario, encadenados con el patrón Decorator.",
          ca: "Interfície comuna amb fallback automàtic de Gemini a OpenAI i quota diària per usuari, encadenats amb el patró Decorator.",
          en: "A common interface with automatic fallback from Gemini to OpenAI and a daily per-user quota, chained with the Decorator pattern.",
        },
      },
      {
        key: { es: "Seguridad", ca: "Seguretat", en: "Security" },
        title: { es: "Login a prueba de fuerza bruta", ca: "Login a prova de força bruta", en: "Brute-force-proof login" },
        text: {
          es: "JWT y Spring Security, con límite de intentos por IP y por cuenta.",
          ca: "JWT i Spring Security, amb límit d'intents per IP i per compte.",
          en: "JWT and Spring Security, with attempt limits per IP and per account.",
        },
      },
      {
        key: { es: "Despliegue", ca: "Desplegament", en: "Deployment" },
        title: { es: "Despliegue automatizado", ca: "Desplegament automatitzat", en: "Automated deployment" },
        text: {
          es: "Docker en Oracle Cloud detrás de Cloudflare, con despliegue nocturno automático y scripts de rollback.",
          ca: "Docker a Oracle Cloud darrere de Cloudflare, amb desplegament nocturn automàtic i scripts de rollback.",
          en: "Docker on Oracle Cloud behind Cloudflare, with automatic nightly deploys and rollback scripts.",
        },
      },
    ],

    architecture: [
      { key: "cliente", title: { es: "App móvil", ca: "App mòbil", en: "Mobile app" }, detail: "React Native · Expo" },
      { key: "api", title: { es: "API REST", ca: "API REST", en: "REST API" }, detail: "Spring Boot · JWT", main: true },
      { key: "ia", title: { es: "Capa de IA", ca: "Capa d'IA", en: "AI layer" }, detail: "Gemini ⇢ OpenAI" },
      { key: "datos", title: { es: "Base de datos", ca: "Base de dades", en: "Database" }, detail: "MySQL · JPA" },
    ],
    architectureNote: {
      es: "API en capas (controller → service → repository) con DTOs, validación y tests con JUnit",
      ca: "API en capes (controller → service → repository) amb DTOs, validació i tests amb JUnit",
      en: "Layered API (controller → service → repository) with DTOs, validation and JUnit tests",
    },
  },
  {
    slug: "geotracking-turismo",
    // TODO: cambia el título por el nombre real del proyecto.
    title: "Geotracking turístico",
    context: {
      es: "Académico · equipo de 3",
      ca: "Acadèmic · equip de 3",
      en: "Academic · team of 3",
    },
    summary: {
      es: "Aplicación web de geotracking orientada al turismo, con arquitectura MVC, frontend en React y backend en Spring Boot.",
      ca: "Aplicació web de geotracking orientada al turisme, amb arquitectura MVC, frontend en React i backend en Spring Boot.",
      en: "Tourism-oriented geotracking web app with an MVC architecture, a React frontend and a Spring Boot backend.",
    },
    learned: {
      es: "A transformar datos JSON en DTOs de forma ordenada y a entender a fondo el patrón MVC trabajando en equipo.",
      ca: "A transformar dades JSON en DTOs de manera ordenada i a entendre a fons el patró MVC treballant en equip.",
      en: "How to map JSON data to DTOs cleanly and how to really understand the MVC pattern while working in a team.",
    },
    stack: ["react", "springBoot", "hibernate", "servlets"],
  },
];
