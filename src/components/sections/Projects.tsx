import Image from "next/image";
import { Fragment } from "react";
import { projects, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { ArrowIcon, GitHubIcon, LockIcon } from "../ui/icons";
import { NutriPhone } from "../ui/NutriPhone";
import { Photo } from "../ui/Photo";
import { ButtonLink, Label, Led } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { TechTile } from "../ui/TechIcon";

export function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => p !== featured);

  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7 px-5 py-20 sm:px-8 sm:py-24">
        {featured && <Featured project={featured} lang={lang} dict={dict} />}
        {others.map((project) => (
          <Reveal key={project.slug}>
            <OtherProject project={project} lang={lang} dict={dict} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LiveTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-control px-3 py-1 font-mono text-sm text-accent">
      <Led className="size-[7px]" />
      {label}
    </span>
  );
}

function Featured({ project: p, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  const demo = p.appDemo;
  const phoneLabel = demo
    ? `${p.title}: ${demo.kcal} / ${demo.kcalGoal} kcal; ${demo.macros.map((m) => `${m.label} ${m.value} / ${m.goal} g`).join("; ")}.`
    : p.title;

  return (
    <>
      <Reveal className="flex flex-col gap-3.5">
        <Label>{dict.projects.featured}</Label>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          {p.icon && (
            <Image src={p.icon} alt="" width={64} height={64} className="size-12 shrink-0 sm:size-16" />
          )}
          <h2 className="text-5xl font-semibold tracking-[-0.045em] sm:text-[64px] sm:leading-none">{p.title}</h2>
          {p.live && <LiveTag label={dict.projects.live} />}
          <span className="text-[15px] text-muted">{tr(p.context, lang)}</span>
        </div>
        <p className="max-w-[700px] text-lg leading-relaxed text-muted sm:text-[19px]">{tr(p.summary, lang)}</p>
      </Reveal>

      {/* Pilares: tres pantallas de la app; la del centro, animada. */}
      {p.screens && (
        <div className="relative pt-8 pb-2 sm:pt-12">
          <div aria-hidden className="light-cone-center absolute inset-0" />
          <div className="relative flex flex-wrap items-end justify-center gap-x-12 gap-y-14">
            {p.screens.map((screen, i) => (
              <figure
                key={tr(screen.title, "en")}
                className={screen.live ? "order-first flex w-[320px] flex-col items-center gap-5 md:order-none md:mb-8" : "flex w-[280px] flex-col items-center gap-5"}
              >
                {screen.live && demo ? (
                  <NutriPhone demo={demo} label={phoneLabel} replayLabel={dict.projects.replay} />
                ) : (
                  <div data-theme="dark" className="rounded-[46px] border border-control bg-[#050404] p-2.5">
                    <Photo
                      src={screen.image?.src}
                      alt={screen.image ? tr(screen.image.alt, lang) : tr(screen.title, lang)}
                      pendingText={dict.photo.pending}
                      sizes="248px"
                      framed={false}
                      className="h-[520px] w-[248px] rounded-[36px] bg-[#0c0b0b]"
                    />
                  </div>
                )}
                <figcaption className="flex max-w-[280px] flex-col items-center gap-1.5 text-center md:min-h-[124px]">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[17px] font-semibold">{tr(screen.title, lang)}</span>
                  <span className="text-[15px] leading-normal text-muted">{tr(screen.text, lang)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {p.facts && (
        <div className="mt-2 grid gap-5 md:grid-cols-3">
          {p.facts.map((fact, i) => (
            <Reveal key={tr(fact.key, "en")} delay={i * 0.06} className="h-full">
              <article className="card flex h-full flex-col gap-2.5 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-[3px] hover:border-line-strong">
                <span className="font-mono text-sm text-accent">{tr(fact.key, lang)}</span>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{tr(fact.title, lang)}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{tr(fact.text, lang)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {p.architecture && (
        <Reveal>
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2 px-5 py-3.5 font-mono text-sm">
              <span className="text-muted">
                {p.slug} / {dict.projects.architecture}
              </span>
              {p.live && (
                <span className="inline-flex items-center gap-2 text-accent">
                  <Led />
                  {dict.projects.live.toLowerCase()}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-stretch justify-center gap-3 px-6 py-7">
              {p.architecture.map((node, i) => (
                <Fragment key={node.key}>
                  {i > 0 && (
                    <span aria-hidden className="self-center font-mono text-lg text-accent">
                      →
                    </span>
                  )}
                  <div
                    className={`flex min-w-0 flex-[1_1_180px] flex-col gap-1.5 rounded-xl border bg-bg px-[18px] py-4 ${node.main ? "border-accent" : "border-line-strong"}`}
                  >
                    <span className="font-mono text-sm text-muted">{node.key}</span>
                    <span className="text-[17px] font-semibold">{tr(node.title, lang)}</span>
                    <span className="text-sm text-muted">{node.detail}</span>
                  </div>
                </Fragment>
              ))}
            </div>
            {p.architectureNotes && p.architectureNotes.length > 0 && (
              <ul className="flex flex-col gap-1.5 border-t border-line px-5 py-3.5 font-mono text-sm text-muted">
                {p.architectureNotes.map((note) => (
                  <li key={note.en}>{tr(note, lang)}</li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-[18px]">
              <ul aria-label={dict.projects.stack} className="flex flex-wrap gap-2">
                {p.stack.map((id) => (
                  <TechTile key={id} id={id} />
                ))}
              </ul>
              <ProjectLinks project={p} dict={dict} />
            </div>
          </div>
        </Reveal>
      )}

      <Reveal>
        <p className="max-w-[820px] text-[15px] leading-relaxed text-muted">
          <span className="font-semibold text-fg">{dict.projects.learned}: </span>
          {tr(p.learned, lang)}
        </p>
      </Reveal>
    </>
  );
}

function ProjectLinks({ project: p, dict }: { project: Project; dict: Dictionary }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {p.repo && (
        <ButtonLink href={p.repo} className="min-h-11 px-4 text-[15px]">
          <GitHubIcon />
          {dict.projects.repo}
        </ButtonLink>
      )}
      {p.demo && (
        <ButtonLink href={p.demo} className="min-h-11 px-4 text-[15px]">
          {dict.projects.demo}
          <ArrowIcon />
        </ButtonLink>
      )}
      {p.privateRepo && (
        <span className="inline-flex items-center gap-1.5 text-sm text-muted">
          <LockIcon className="size-4" />
          {dict.projects.private}
        </span>
      )}
    </div>
  );
}

function OtherProject({ project: p, lang, dict }: { project: Project; lang: Locale; dict: Dictionary }) {
  return (
    <article className="card mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-7 py-6 transition-[border-color,transform] duration-300 hover:-translate-y-[3px] hover:border-line-strong">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2">
        <span className="font-mono text-sm text-muted">
          {dict.projects.other} · {tr(p.context, lang)}
        </span>
        <h3 className="text-[26px] font-semibold tracking-[-0.03em]">{p.title}</h3>
        <p className="leading-relaxed text-muted">{tr(p.summary, lang)}</p>
        <p className="text-[15px] leading-relaxed text-muted">
          <span className="font-semibold text-fg">{dict.projects.learned}: </span>
          {tr(p.learned, lang)}
        </p>
      </div>
      <div className="flex flex-col items-start gap-3">
        <ul aria-label={dict.projects.stack} className="flex flex-wrap gap-2">
          {p.stack.map((id) => (
            <TechTile key={id} id={id} />
          ))}
        </ul>
        <ProjectLinks project={p} dict={dict} />
      </div>
    </article>
  );
}
