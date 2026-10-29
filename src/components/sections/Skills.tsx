import { profile } from "@/content/profile";
import { concepts, skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { cn, Label, Led } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { TechTile } from "../ui/TechIcon";

/** Etiqueta "en curso" con LED, para lo que sigue activo. */
function Ongoing({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-control px-2.5 py-0.5 font-mono text-[13px] text-accent">
      <Led className="size-[7px]" />
      {label}
    </span>
  );
}

/**
 * Experiencia y formación (columna izquierda, una tarjeta para cada una)
 * y stack con logos (derecha). El trabajo y los estudios van en paralelo,
 * por eso no comparten línea de tiempo.
 */
export function Skills({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-5 px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
          <Reveal>
            <div className="card flex flex-col gap-5 p-7">
              <Label>{dict.experience.label}</Label>
              {profile.experience.map((job) => (
                <article key={job.place} className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-sm text-muted">{tr(job.period, lang)}</span>
                    {job.current && <Ongoing label={dict.experience.current} />}
                  </div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.02em]">{tr(job.title, lang)}</h3>
                  <span className="text-[15px] font-medium">{job.place}</span>
                  <p className="text-[15px] leading-relaxed text-muted">{tr(job.text, lang)}</p>
                  <ul className="mt-2.5 flex flex-col gap-2.5">
                    {job.points[lang].map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span aria-hidden className="mt-[10px] h-[2px] w-2.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div id="education" className="card flex flex-col gap-5 p-7">
              <Label>{dict.education.label}</Label>
              <ol className="flex flex-col">
                {profile.education.map((study, i) => {
                  const last = i === profile.education.length - 1;
                  return (
                    <li key={study.badge} className="flex gap-4">
                      {/* Sigla en una casilla; la línea une los títulos de más reciente a más antiguo. */}
                      <span aria-hidden className="flex shrink-0 flex-col items-center">
                        <span
                          className={cn(
                            "grid h-10 w-12 place-items-center rounded-[10px] border bg-bg font-mono text-[13px] font-medium",
                            study.current ? "border-accent text-accent" : "border-line-strong text-muted",
                          )}
                        >
                          {study.badge}
                        </span>
                        {!last && <span className="w-px flex-1 bg-line" />}
                      </span>
                      <div className={cn("flex min-w-0 flex-col gap-1", !last && "pb-6")}>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="font-mono text-sm text-muted">{tr(study.period, lang)}</span>
                          {study.current && <Ongoing label={dict.education.current} />}
                        </div>
                        <h3 className="text-[17px] leading-snug font-semibold tracking-[-0.015em]">{tr(study.title, lang)}</h3>
                        <span className="text-[15px] text-muted">{study.place}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06} className="min-w-0 flex-[1_1_520px]">
          <div id="skills" className="card flex h-full flex-col gap-5 p-7">
            <Label>{dict.skills.label}</Label>
            {skillGroups.map((group) => (
              <div key={group.title.en} className="flex flex-wrap items-start gap-x-5 gap-y-3 border-b border-line pb-5">
                <h3 className="mt-2.5 w-[140px] shrink-0 text-[15px] font-semibold">{tr(group.title, lang)}</h3>
                <ul className="flex min-w-0 flex-[1_1_300px] flex-wrap gap-x-3 gap-y-3.5">
                  {group.items.map((id) => (
                    <TechTile key={id} id={id} size="lg" />
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-[15px] leading-relaxed text-muted">
              <span className="font-semibold text-fg">{dict.skills.concepts}: </span>
              {concepts.map((c) => tr(c, lang)).join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
