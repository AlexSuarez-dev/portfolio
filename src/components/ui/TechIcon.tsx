import type { IconType } from "react-icons";
import {
  SiCloudflare,
  SiDocker,
  SiExpo,
  SiGit,
  SiHibernate,
  SiJsonwebtokens,
  SiJunit5,
  SiMysql,
  SiOpenjdk,
  SiReact,
  SiSpringboot,
  SiSpringsecurity,
  SiTypescript,
} from "react-icons/si";
import { TbCloud, TbDatabase, TbServer } from "react-icons/tb";
import { tech, type TechId } from "@/content/tech";
import { cn } from "./primitives";

// Logos oficiales (Simple Icons), en un solo color para que encajen con la paleta.
// SQL Server, Oracle Cloud y Java Servlets no están en Simple Icons: llevan un icono genérico.
const icons: Record<TechId, IconType> = {
  java: SiOpenjdk,
  springBoot: SiSpringboot,
  springSecurity: SiSpringsecurity,
  jwt: SiJsonwebtokens,
  hibernate: SiHibernate,
  junit: SiJunit5,
  servlets: TbServer,
  react: SiReact,
  reactNative: SiReact,
  expo: SiExpo,
  typescript: SiTypescript,
  mysql: SiMysql,
  sqlServer: TbDatabase,
  docker: SiDocker,
  oracleCloud: TbCloud,
  cloudflare: SiCloudflare,
  git: SiGit,
};

/**
 * Logo de una tecnología.
 * - `size="sm"`: casilla de 44 px; el nombre sale al pasar el ratón y lo leen los lectores de pantalla.
 * - `size="lg"`: casilla de 56 px con el nombre debajo (sección Stack).
 */
export function TechTile({ id, size = "sm" }: { id: TechId; size?: "sm" | "lg" }) {
  const Icon = icons[id];
  const name = tech[id];
  const box = cn(
    "grid place-items-center border border-line-strong bg-bg text-muted transition-[color,border-color,box-shadow,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:text-fg group-hover:shadow-[0_0_18px_-6px_rgb(255_46_59/0.6)]",
    size === "sm" ? "size-11 rounded-[10px]" : "size-14 rounded-[14px]",
  );

  if (size === "sm") {
    return (
      <li className="group" title={name}>
        <span className={box}>
          <Icon aria-hidden className="size-5" />
          <span className="sr-only">{name}</span>
        </span>
      </li>
    );
  }

  return (
    <li className="group flex w-[76px] flex-col items-center gap-2 text-center">
      <span className={box} aria-hidden>
        <Icon className="size-7" />
      </span>
      <span className="text-sm leading-tight text-muted transition-colors group-hover:text-fg">{name}</span>
    </li>
  );
}
