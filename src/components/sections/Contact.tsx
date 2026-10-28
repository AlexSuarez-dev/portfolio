import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { CopyEmail } from "../ui/CopyEmail";
import { FeedbackLink } from "../ui/FeedbackWidget";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "../ui/icons";
import { ButtonLink } from "../ui/primitives";

/** Cierre: "¿Hablamos?" bajo la luz de un segundo tubo de neón. */
export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="light-cone absolute inset-0" />
      <div aria-hidden className="neon-bar absolute top-0 left-1/2 h-[3px] w-80 -translate-x-1/2 rounded-b-full" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-5 py-28 text-center sm:px-8">
        <h2 className="text-[clamp(3rem,6vw,5rem)] leading-none font-semibold tracking-[-0.045em]">{dict.contact.title}</h2>
        <p className="max-w-[520px] text-lg leading-relaxed text-muted">{dict.contact.text}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`mailto:${profile.email}`} variant="primary">
            {dict.contact.write}
          </ButtonLink>
          <CopyEmail email={profile.email} copyLabel={dict.contact.copy} copiedLabel={dict.contact.copied} />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href={profile.github} className="min-h-11 px-4 text-[15px]">
            <GitHubIcon />
            GitHub
          </ButtonLink>
          {profile.linkedin && (
            <ButtonLink href={profile.linkedin} className="min-h-11 px-4 text-[15px]">
              <LinkedInIcon />
              LinkedIn
            </ButtonLink>
          )}
          {profile.cv && (
            <ButtonLink href={profile.cv} download className="min-h-11 px-4 text-[15px]">
              <DownloadIcon />
              {dict.hero.cv}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 pt-5 pb-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {profile.name} · {dict.footer.built}
        </p>
        <FeedbackLink label={dict.feedback.footer} />
      </div>
    </footer>
  );
}
