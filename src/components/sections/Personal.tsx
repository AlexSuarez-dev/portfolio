import { habits, hobbies } from "@/content/personal";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { Photo } from "../ui/Photo";
import { Section, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Habits({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section id="habits">
      <Reveal>
        <SectionHeading label={dict.habits.label} title={dict.habits.title} intro={dict.habits.intro} />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {habits.map((habit, i) => (
          <Reveal key={habit.id} delay={i * 0.08}>
            <article className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 sm:p-7">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-2xl font-light">{tr(habit.title, lang)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tr(habit.text, lang)}</p>
              {habit.photoLabel !== undefined && (
                <Photo
                  src={habit.photo}
                  alt={tr(habit.title, lang)}
                  label={habit.photoLabel}
                  pendingText={dict.photo.pending}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="mt-6 aspect-[4/3]"
                />
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Hobbies({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section id="hobbies">
      <Reveal>
        <SectionHeading label={dict.hobbies.label} title={dict.hobbies.title} />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {hobbies.map((hobby, i) => (
          <Reveal key={hobby.id} delay={i * 0.08}>
            <article className="group">
              <Photo
                src={hobby.photo}
                alt={tr(hobby.title, lang)}
                label={hobby.photoLabel}
                pendingText={dict.photo.pending}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] rounded-3xl"
              />
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-display text-3xl font-light">{tr(hobby.title, lang)}</h3>
                <p className="text-sm text-muted sm:max-w-xs sm:text-right">{tr(hobby.text, lang)}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
