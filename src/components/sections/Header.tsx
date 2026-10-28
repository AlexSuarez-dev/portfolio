import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitcher } from "../ui/LangSwitcher";
import { MobileMenu } from "../ui/MobileMenu";
import { buttonStyles, cn } from "../ui/primitives";
import { ThemeToggle } from "../ui/ThemeToggle";

// Orden del menú. Cada `id` debe coincidir con el id de su sección.
const navIds = ["projects", "experience", "skills", "about", "contact"] as const;

/** Monograma AM dibujado como un tubo (mismo trazo que el favicon). */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" aria-hidden className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="224" height="134" rx="24" />
        <path d="M46 116 L80 34 L114 116 M60 86 L100 86" />
        <path d="M132 116 L132 34 L164 84 L196 34 L196 116" />
      </g>
    </svg>
  );
}

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = navIds.map((id) => ({ href: `#${id}`, label: dict.nav[id] }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="relative mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label={dict.nav.home} className="flex items-center gap-3">
          <Monogram className="h-[25px] w-10 text-accent" />
          <span className="hidden text-[15px] font-semibold tracking-[-0.01em] sm:inline">Alejandro Manzanares</span>
        </a>

        <nav aria-label={dict.nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-muted">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher current={lang} label={dict.lang.label} />
          <ThemeToggle label={dict.theme.toggle} />
          <span className="hidden sm:block">
            <a href="#contact" className={cn(buttonStyles.base, buttonStyles.primary, "min-h-11 px-4 text-sm")}>
              {dict.nav.cta}
            </a>
          </span>
          <MobileMenu items={items} openLabel={dict.nav.open} closeLabel={dict.nav.close} />
        </div>
      </div>
    </header>
  );
}
