import Image from "next/image";
import { cn } from "./primitives";

type PhotoProps = {
  src?: string;
  alt: string;
  label?: string; // qué foto falta (solo se ve en el hueco vacío)
  pendingText: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Foto con marco. Si todavía no hay foto (`src` vacío), dibuja un hueco
 * rayado indicando cuál falta, para ver el diseño final desde ya.
 * Para la forma del hueco, pasa un `aspect-*` en `className`.
 */
export function Photo({ src, alt, label, pendingText, sizes, className, priority }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-surface", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div role="img" aria-label={alt} className="photo-placeholder absolute inset-0 flex items-end p-4">
          <span className="rounded-md bg-bg/90 px-2.5 py-1 font-mono text-[11px] text-muted">
            {"// "}
            {pendingText}
            {label ? `: ${label}` : ""}
          </span>
        </div>
      )}
    </div>
  );
}
