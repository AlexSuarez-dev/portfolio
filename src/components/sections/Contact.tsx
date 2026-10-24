import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { CopyEmail } from "../ui/CopyEmail";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "../ui/icons";
import { ButtonLink, Label, Section } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <Section id="contact" className="pb-12">
      <Reveal>
        <div className="rounded-3xl border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <Label>{dict.contact.label}</Label>
          <h2 className="mt-4 font-display text-[clamp(2.75rem,9vw,6rem)] leading-none font-extralight tracking-tight">
            {dict.contact.title}
          </h2>
          <p className="mt-6 max-w-lg text-muted">{dict.contact.text}</p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block font-mono text-base break-all underline decoration-line decoration-1 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-2xl"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`} variant="primary">
              <MailIcon />
              Email
            </ButtonLink>
            <CopyEmail email={profile.email} copyLabel={dict.contact.copy} copiedLabel={dict.contact.copied} />
            <ButtonLink href={profile.github}>
              <GitHubIcon />
              GitHub
            </ButtonLink>
            {profile.linkedin && (
              <ButtonLink href={profile.linkedin}>
                <LinkedInIcon />
                LinkedIn
              </ButtonLink>
            )}
            {profile.cv && (
              <ButtonLink href={profile.cv} download>
                <DownloadIcon />
                {dict.hero.cv}
              </ButtonLink>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 pt-4 pb-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
      <p>© {profile.name}</p>
      <p>{dict.footer.built}</p>
    </footer>
  );
}
