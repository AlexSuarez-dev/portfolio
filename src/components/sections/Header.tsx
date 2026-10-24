import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitcher } from "../ui/LangSwitcher";
import { MobileMenu } from "../ui/MobileMenu";
import { ThemeToggle } from "../ui/ThemeToggle";

// Orden del menú. Cada `id` debe coincidir con el id de su <Section>.
const navIds = ["about", "projects", "skills", "habits", "hobbies", "contact"] as const;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = navIds.map((id) => ({ href: `#${id}`, label: dict.nav[id] }));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" aria-label={dict.nav.home} className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-line font-display text-sm tracking-widest">
            AM
          </span>
          <span className="hidden font-mono text-xs text-muted sm:inline">alejandro_manzanares</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-muted">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher current={lang} label={dict.lang.label} />
          <ThemeToggle label={dict.theme.toggle} />
          <MobileMenu items={items} openLabel={dict.nav.open} closeLabel={dict.nav.close} />
        </div>
      </div>
    </header>
  );
}
