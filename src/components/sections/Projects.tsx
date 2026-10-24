import { projects } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { tr, type Dictionary } from "@/i18n/dictionaries";
import { Section, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading label={dict.projects.label} title={dict.projects.title} />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className={project.featured ? "md:col-span-2" : undefined}>
            {/* Se pasan los textos ya traducidos: la tarjeta es un componente de cliente. */}
            <ProjectCard
              featured={!!project.featured}
              title={project.title}
              context={tr(project.context, lang)}
              summary={tr(project.summary, lang)}
              highlights={project.highlights[lang]}
              learned={tr(project.learned, lang)}
              stack={project.stack}
              repo={project.repo}
              demo={project.demo}
              privateRepo={!!project.privateRepo}
              image={project.image ? { src: project.image.src, alt: tr(project.image.alt, lang) } : undefined}
              labels={dict.projects}
              pendingText={dict.photo.pending}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
