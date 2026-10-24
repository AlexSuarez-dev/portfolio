import type { ComponentProps, ReactNode } from "react";

// Une clases ignorando valores vacíos.
export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/** Etiqueta estilo `// sección` en mono y color de acento. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-wide text-accent sm:text-sm", className)}>
      {"// "}
      {children}
    </p>
  );
}

/** Cabecera común de sección: etiqueta + título (+ intro opcional). */
export function SectionHeading({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-10 sm:mb-14">
      <Label>{label}</Label>
      <h2 className="mt-3 font-display text-4xl font-light tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 max-w-xl text-muted">{intro}</p>}
    </header>
  );
}

/** Contenedor de sección con ancho máximo y márgenes laterales. */
export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28", className)}>
      {children}
    </section>
  );
}

/** Píldora de tecnología. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{children}</li>
  );
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: "primary" | "ghost" };

/** Enlace con aspecto de botón. Los externos se abren en otra pestaña. */
export function ButtonLink({ variant = "ghost", className, href = "", children, ...rest }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300",
        variant === "primary"
          ? "bg-fg text-bg hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-12px_var(--accent)]"
          : "border border-line text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}
