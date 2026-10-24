import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";
import { ButtonLink, Label } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="top" className="mx-auto grid min-h-svh w-full max-w-6xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div>
        <Reveal onMount>
          <Label>{dict.hero.greeting}</Label>
        </Reveal>

        <Reveal onMount delay={0.08}>
          <h1 className="mt-5 font-display text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.95] font-extralight tracking-tight">
            {first}
            <br />
            <span className="text-muted">{rest.join(" ")}</span>
          </h1>
        </Reveal>

        <Reveal onMount delay={0.16}>
          <p className="mt-6 font-mono text-sm text-fg/90">{tr(profile.role, lang)}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{tr(profile.tagline, lang)}</p>
        </Reveal>

        <Reveal onMount delay={0.24} className="mt-9 flex flex-wrap gap-3">
          {profile.cv ? (
            <ButtonLink href={profile.cv} variant="primary" download>
              <DownloadIcon />
              {dict.hero.cv}
            </ButtonLink>
          ) : (
            <ButtonLink href="#projects" variant="primary">
              {dict.hero.projects}
              <ArrowIcon className="rotate-[135deg] transition-transform group-hover:translate-y-0.5" />
            </ButtonLink>
          )}
          <ButtonLink href={profile.github} aria-label="GitHub">
            <GitHubIcon />
            GitHub
          </ButtonLink>
          {profile.linkedin && (
            <ButtonLink href={profile.linkedin} aria-label="LinkedIn">
              <LinkedInIcon />
              LinkedIn
            </ButtonLink>
          )}
          <ButtonLink href="#contact">{dict.hero.contact}</ButtonLink>
        </Reveal>
      </div>

      {/* Ficha estilo terminal con tarjeta de cristal */}
      <Reveal onMount delay={0.35}>
        <div className="rounded-3xl border border-line bg-glass p-6 font-mono text-sm shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] backdrop-blur-2xl sm:p-8">
          <div className="mb-6 flex items-center gap-2" aria-hidden>
            <span className="size-2.5 rounded-full bg-accent/80" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </div>
          <p className="text-muted">
            <span className="text-accent">&gt;</span> whoami
          </p>
          <dl className="mt-4">
            {profile.status.map((row) => (
              <div key={row.key.en} className="flex justify-between gap-4 border-b border-line py-3 last:border-0">
                <dt className="text-muted">{tr(row.key, lang)}</dt>
                <dd className="text-right">{tr(row.value, lang)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-muted">
            <span className="text-accent">&gt;</span>{" "}
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-fg/70 motion-reduce:animate-none" />
          </p>
        </div>
      </Reveal>
    </section>
  );
}
