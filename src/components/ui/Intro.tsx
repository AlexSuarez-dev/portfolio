/**
 * Capa de la intro (≈1,8 s). Por defecto está oculta: solo aparece cuando el
 * script del <head> pone data-intro="play" en <html> (ver layout.tsx).
 * El neón del hero y el "> bienvenido…" quedan por encima (`.above-intro`)
 * mientras el resto de la página espera debajo, ya pintada.
 * El botón no necesita lógica: cualquier pulsación o tecla corta la intro.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  return (
    <div className="intro" aria-hidden="true" data-nosnippet="">
      <button
        type="button"
        tabIndex={-1}
        className="intro-skip fixed top-5 right-6 min-h-11 rounded-[10px] border border-control bg-bg px-4 font-mono text-sm text-fg"
      >
        {skipLabel}
      </button>
    </div>
  );
}
