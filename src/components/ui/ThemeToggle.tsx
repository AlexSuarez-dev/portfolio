"use client";

import { useLayoutEffect } from "react";
import { MoonIcon, SunIcon } from "./icons";

// Mismo cálculo que el script inline de layout.tsx: lo guardado o, si no, el del sistema.
const preferredTheme = () => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

/** Botón sol/luna. El icono visible se decide por CSS según data-theme. */
export function ThemeToggle({ label }: { label: string }) {
  // En desarrollo React borra el atributo al remontar; lo volvemos a poner.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = preferredTheme();
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
    >
      <SunIcon className="theme-icon theme-sun absolute" />
      <MoonIcon className="theme-icon theme-moon absolute" />
    </button>
  );
}
