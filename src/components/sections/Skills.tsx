import { profile } from "@/content/profile";
import { concepts, skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { Label } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { TechTile } from "../ui/TechIcon";

/** Experiencia (trabajo + formación) y stack con logos, lado a lado en escritorio. */
export function Skills({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const timeline = [
    ...profile.experience.map((e) => ({ ...e, current: true })),
    ...profile.education.map((e) => ({ ...e, current: false })),
  ];

  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-5 px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="min-w-0 flex-[1_1_400px]">
          <div className="card flex h-full flex-col gap-5 p-7">
            <Label>{dict.experience.label}</Label>
            <ol className="flex flex-col">
              {timeline.map((item) => (
                <li key={item.place} className="flex gap-4">
                  <span aria-hidden className="flex w-2.5 shrink-0 flex-col items-center pt-2">
                    <span className={`size-[9px] rounded-full ${item.current ? "led bg-tube" : "bg-muted"}`} />
                    <span className="mt-1.5 w-px flex-1 bg-line" />
                  </span>
                  <div className="flex flex-col gap-1 pb-6">
                    <span className="font-mono text-sm text-muted">{tr(item.period, lang)}</span>
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{tr(item.title, lang)}</h3>
                    <span className="text-[15px] font-medium">{item.place}</span>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{tr(item.text, lang)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="min-w-0 flex-[1.5_1_560px]">
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
