import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Photo } from "../ui/Photo";
import { Section, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading label={dict.about.label} title={dict.about.title} />
      </Reveal>
      <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        <Reveal>
          <Photo
            src={profile.photo}
            alt={dict.about.photoAlt}
            label="retrato"
            pendingText={dict.photo.pending}
            sizes="(min-width: 768px) 320px, 100vw"
            className="aspect-[4/5] max-w-sm"
          />
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about[lang].map((paragraph, i) => (
            <p key={i} className={i === 0 ? "text-fg" : undefined}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
