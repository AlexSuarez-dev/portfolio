import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { Chip, Label, Section, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/** Stack técnico y formación, lado a lado en escritorio. */
export function Skills({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section id="skills">
      <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <SectionHeading label={dict.skills.label} title={dict.skills.title} intro={dict.skills.intro} />
          </Reveal>
          <dl>
            {skillGroups.map((group, i) => (
              <Reveal key={group.title.en} delay={i * 0.05}>
                <div className="grid gap-3 border-t border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-mono text-xs text-fg sm:pt-1.5">{tr(group.title, lang)}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Chip key={tr(item, "en")}>{tr(item, lang)}</Chip>
                      ))}
                    </ul>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <div id="education" className="scroll-mt-20">
          <Reveal>
            <SectionHeading label={dict.education.label} title={dict.education.title} />
          </Reveal>
          <ol className="relative border-l border-line pl-6">
            {profile.education.map((item) => (
              <Reveal key={item.place}>
                <li className="relative pb-2">
                  <span className="absolute top-2 -left-[29px] size-2.5 rounded-full bg-accent ring-4 ring-bg" aria-hidden />
                  <Label className="!text-muted">{tr(item.period, lang)}</Label>
                  <h3 className="mt-2 font-display text-2xl font-light">{tr(item.title, lang)}</h3>
                  <p className="mt-1 text-muted">{item.place}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
