import type { ComponentProps, ReactNode } from "react";

// Une clases ignorando valores vacíos.
export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/** Etiqueta pequeña en mono y rojo sobre los títulos de sección. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-sm text-accent", className)}>{children}</p>;
}

/** Cabecera común de sección: etiqueta + título (+ intro opcional). */
export function SectionHeading({
  label,
  title,
  intro,
  className,
}: {
  label: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <Label>{label}</Label>
      <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{title}</h2>
      {intro && <p className="max-w-xl text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  );
}

/** Contenedor de sección con ancho máximo y márgenes laterales. */
export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("border-t border-line", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

/** Píldora de texto (conceptos, etiquetas). */
export function Chip({ children }: { children: ReactNode }) {
  return <li className="rounded-full border border-line px-3 py-1 font-mono text-sm text-fg">{children}</li>;
}

/** Punto de estado con brillo de neón. */
export function Led({ className }: { className?: string }) {
  return <span aria-hidden className={cn("led inline-block size-2 shrink-0 rounded-full bg-tube", className)} />;
}

type ButtonLinkProps = ComponentProps<"a"> & { variant?: "primary" | "ghost" };

export const buttonStyles = {
  base: "inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-base font-semibold transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
  primary: "btn-glow bg-fill text-on-fill hover:-translate-y-px active:scale-[0.98]",
  ghost: "border border-control bg-surface text-fg hover:border-fg hover:bg-surface-2",
};

/** Enlace con aspecto de botón. Los externos se abren en otra pestaña. */
export function ButtonLink({ variant = "ghost", className, href = "", children, ...rest }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={cn(buttonStyles.base, buttonStyles[variant], className)}
    >
      {children}
    </a>
  );
}
