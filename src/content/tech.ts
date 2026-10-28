/**
 * Catálogo de tecnologías. Cada una tiene un nombre visible y un logo
 * (se dibuja en `components/ui/TechIcon.tsx` con los iconos de Simple Icons).
 * Para añadir una tecnología: ponla aquí y, si tiene logo, añádelo en TechIcon.
 * En `projects.ts` y `skills.ts` se usan estos identificadores.
 */
export const tech = {
  java: "Java",
  springBoot: "Spring Boot",
  springSecurity: "Spring Security",
  jwt: "JWT",
  hibernate: "Hibernate / JPA",
  junit: "JUnit",
  servlets: "Java Servlets",
  react: "React",
  reactNative: "React Native",
  expo: "Expo",
  typescript: "TypeScript",
  mysql: "MySQL",
  sqlServer: "SQL Server",
  docker: "Docker",
  oracleCloud: "Oracle Cloud",
  cloudflare: "Cloudflare",
  git: "Git",
} as const;

export type TechId = keyof typeof tech;
