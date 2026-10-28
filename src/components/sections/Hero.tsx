import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { ArrowIcon, DownloadIcon, GitHubIcon } from "../ui/icons";
import { ButtonLink, Led } from "../ui/primitives";

/**
 * Inicio: un tubo de neón colgado del techo ilumina la pared de ladrillo.
 * Todo se pinta visible desde el primer momento (sin Reveal) para no
 * retrasar la carga. Las clases intro-* solo animan durante la intro.
 */
export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const welcome = `> ${dict.intro.welcome}`;
  // El ancho de la máquina de escribir se ajusta al texto de cada idioma.
  const typeStyle = {
    "--tw-width": `${welcome.length}ch`,
    animationTimingFunction: `steps(${welcome.length}, end)`,
  } as CSSProperties;

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-68px)] items-center overflow-hidden">
      <div aria-hidden className="brick-wall absolute inset-0" />
      <div aria-hidden className="light-cone intro-glow absolute inset-0" />
      <div aria-hidden className="wall-shade absolute inset-0" />

      {/* El tubo, con sus dos cables. */}
      <div aria-hidden className="above-intro absolute top-0 left-1/2 h-16 w-[560px] max-w-[80%] -translate-x-1/2">
        <span className="absolute top-0 left-[18%] h-14 w-px bg-line-strong" />
        <span className="absolute top-0 right-[18%] h-14 w-px bg-line-strong" />
        <span className="neon-bar intro-ignite absolute inset-x-0 top-14 h-[5px] rounded-full" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 pt-28 pb-24 text-center sm:px-8 sm:pt-32 sm:pb-28">
        <p className="above-intro relative font-mono text-[15px] text-fg">
          <span className="tw" style={typeStyle}>
            {welcome}
          </span>
          <span aria-hidden className="tw-cursor" />
        </p>

        <a
          href="#projects"
          className="intro-shift inline-flex min-h-9 items-center gap-2.5 rounded-full border border-control bg-surface px-3.5 font-mono text-sm transition-colors hover:border-fg"
          style={{ "--i": 0 } as CSSProperties}
        >
          <Led />
          {dict.hero.live}
          <span aria-hidden className="text-muted">
            →
          </span>
        </a>

        <h1
          className="intro-shift text-[clamp(3.25rem,8vw,7rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance"
          style={{ "--i": 1 } as CSSProperties}
        >
          {profile.name}
        </h1>

        <div className="intro-shift flex flex-col items-center gap-5" style={{ "--i": 2 } as CSSProperties}>
          <p className="text-xl font-medium tracking-[-0.01em] text-balance sm:text-[22px]">
            {tr(profile.headline, lang)
              .split(" · ")
              .map((part, i) => (
                <span key={part}>
                  {i > 0 && (
                    <span aria-hidden className="hidden sm:inline">
                      {" · "}
                    </span>
                  )}
                  <span className="block sm:inline">{part}</span>
                </span>
              ))}
          </p>
          <p className="max-w-[620px] text-lg leading-relaxed text-muted">{tr(profile.tagline, lang)}</p>
        </div>

        <div className="intro-shift mt-2 flex flex-wrap justify-center gap-3" style={{ "--i": 3 } as CSSProperties}>
          <ButtonLink href="#projects" variant="primary">
            {dict.hero.projects}
            <ArrowIcon className="rotate-45" />
          </ButtonLink>
          <ButtonLink href={profile.github}>
            <GitHubIcon />
            GitHub
          </ButtonLink>
          {profile.cv && (
            <ButtonLink href={profile.cv} download>
              <DownloadIcon />
              {dict.hero.cv}
            </ButtonLink>
          )}
        </div>

        <ul
          className="intro-shift mt-3 flex flex-col items-center gap-x-6 gap-y-2 font-mono text-sm text-muted sm:flex-row sm:flex-wrap sm:justify-center"
          style={{ "--i": 3 } as CSSProperties}
        >
          {profile.heroFacts[lang].map((fact, i) => (
            <li key={fact} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden className="hidden sm:inline">
                  /
                </span>
              )}
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
