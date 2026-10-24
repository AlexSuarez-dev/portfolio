"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowIcon, GitHubIcon, LockIcon } from "../ui/icons";
import { Photo } from "../ui/Photo";
import { ButtonLink, Chip, cn } from "../ui/primitives";

type Props = {
  featured: boolean;
  title: string;
  context: string;
  summary: string;
  highlights: string[];
  learned: string;
  stack: string[];
  repo?: string;
  demo?: string;
  privateRepo: boolean;
  image?: { src: string; alt: string };
  labels: Dictionary["projects"];
  pendingText: string;
};

/** Tarjeta de proyecto: resumen siempre visible y detalles desplegables. */
export function ProjectCard(p: Props) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-muted/50 sm:p-8",
        p.featured && "lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-10",
      )}
    >
      {p.featured && p.image && (
        <Photo
          src={p.image.src}
          alt={p.image.alt}
          label={p.title.toLowerCase()}
          pendingText={p.pendingText}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="mb-8 aspect-[16/10] lg:order-2 lg:mb-0 lg:aspect-auto lg:min-h-80"
        />
      )}

      <div className="flex flex-1 flex-col">
        <p className="font-mono text-xs text-accent">{p.context}</p>
        <h3 className="mt-3 font-display text-3xl font-light sm:text-4xl">{p.title}</h3>
        <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {p.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <h4 className="font-mono text-xs text-muted">{p.labels.highlights}</h4>
                <ul className="mt-3 space-y-3">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <h4 className="mt-7 font-mono text-xs text-muted">{p.labels.learned}</h4>
                <p className="mt-3 text-sm leading-relaxed">{p.learned}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            {open ? p.labels.less : p.labels.more}
            <span className={cn("transition-transform duration-300", open && "rotate-45")} aria-hidden>
              +
            </span>
          </button>
          {p.repo && (
            <ButtonLink href={p.repo}>
              <GitHubIcon />
              {p.labels.repo}
            </ButtonLink>
          )}
          {p.demo && (
            <ButtonLink href={p.demo}>
              {p.labels.demo}
              <ArrowIcon />
            </ButtonLink>
          )}
          {p.privateRepo && (
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <LockIcon className="size-4" />
              {p.labels.private}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
