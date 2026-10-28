import { habits, hobbies } from "@/content/personal";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { Photo } from "../ui/Photo";
import { Label, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

/** Sobre mí, cómo trabajo (hábitos) y fuera del código (hobbies). */
export function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeading label={dict.about.label} title={dict.about.title} />
            <div className="flex max-w-[680px] flex-col gap-5 text-lg leading-relaxed text-muted">
              {profile.about[lang].map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-fg" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Photo
              src={profile.photo}
              alt={dict.about.photoAlt}
              label="retrato"
              pendingText={dict.photo.pending}
              sizes="(min-width: 768px) 320px, 100vw"
              className="aspect-[4/5] max-w-sm"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-5">
          <Label>{dict.about.habits}</Label>
          <div className="grid gap-5 md:grid-cols-3">
            {habits.map((habit, i) => (
              <Reveal key={habit.id} delay={i * 0.06} className="h-full">
                <article className="card flex h-full flex-col gap-3 p-6">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{tr(habit.title, lang)}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{tr(habit.text, lang)}</p>
                  {habit.photoLabel !== undefined && (
                    <Photo
                      src={habit.photo}
                      alt={tr(habit.title, lang)}
                      label={habit.photoLabel}
                      pendingText={dict.photo.pending}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="mt-2 aspect-[4/3] rounded-xl"
                    />
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Label>{dict.about.hobbies}</Label>
          <div className="grid gap-5 md:grid-cols-2">
            {hobbies.map((hobby, i) => (
              <Reveal key={hobby.id} delay={i * 0.06}>
                <article className="card group overflow-hidden">
                  <Photo
                    src={hobby.photo}
                    alt={tr(hobby.title, lang)}
                    label={hobby.photoLabel}
                    pendingText={dict.photo.pending}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    framed={false}
                    className="aspect-[16/9] border-b border-line"
                  />
                  <div className="flex flex-col gap-2 px-6 py-5">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{tr(hobby.title, lang)}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">{tr(hobby.text, lang)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
