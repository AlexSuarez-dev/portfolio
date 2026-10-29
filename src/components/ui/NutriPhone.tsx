"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { AppDemo } from "@/content/projects";
import { cn } from "./primitives";

const RING = 2 * Math.PI * 52; // circunferencia del anillo (r = 52 en un viewBox de 120)
const EASE = [0.22, 1, 0.36, 1] as const;
const noop = () => () => {};

/** Número que sube de 0 a `value` cuando `run` pasa a true. */
function Counter({ value, run, delay = 0 }: { value: number; run: boolean; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !run) return;
    const controls = animate(0, value, {
      duration: 1.2,
      delay,
      ease: EASE,
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [run, value, delay]);
  return <span ref={ref}>{run ? 0 : value}</span>;
}

/**
 * Pantalla de inicio de NutriApp recreada en HTML (no es una foto):
 * al entrar en pantalla sale un esqueleto de carga y después se rellenan
 * el anillo, las barras y los números. Con "reducir movimiento", o sin JS,
 * se ve directamente el estado final.
 */
export function NutriPhone({ demo, label, replayLabel }: { demo: AppDemo; label: string; replayLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  // false en el servidor y al hidratar, true después: así sin JS se ve el estado final.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const armed = hydrated && !reduce; // la pantalla empieza "vacía" y se carga al verla
  const [loaded, setLoaded] = useState(false);
  const [run, setRun] = useState(0); // cambia al pulsar "ver la carga otra vez"

  // Esqueleto de carga 650 ms y después se rellenan los datos.
  useEffect(() => {
    if (!armed || !inView) return;
    const t = setTimeout(() => setLoaded(true), 650);
    return () => clearTimeout(t);
  }, [armed, inView, run]);

  const full = !armed || loaded;
  const animating = armed && loaded;
  const ratio = Math.min(demo.kcal / demo.kcalGoal, 1);

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="rounded-[46px] border border-control bg-[#050404] p-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04),0_40px_80px_-40px_rgb(0_0_0/0.8)]">
        <div
          role="img"
          aria-label={label}
          className="relative h-[620px] w-[292px] overflow-hidden rounded-[36px] bg-black px-[22px] pt-[30px] text-white"
          style={{ fontFamily: "Roboto, 'Segoe UI', system-ui, sans-serif" }}
        >
          <div aria-hidden>
            <p className="text-[28px] font-bold tracking-[-0.01em]">{demo.date}</p>

            <div className="relative mx-auto mt-[22px] mb-5 size-[150px]">
              <svg viewBox="0 0 120 120" className="size-full">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e3e7e2" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#1f9a62"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING}
                  strokeDashoffset={full ? RING * (1 - ratio) : RING}
                  transform="rotate(-90 60 60)"
                  className={cn(animating && "transition-[stroke-dashoffset] delay-150 duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)]")}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="text-[38px] leading-none font-bold text-[#1f9a62] tabular-nums">
                  {full ? <Counter value={demo.kcal} run={animating} delay={0.15} /> : 0}
                </span>
                <span className="text-[13px] text-[#c9ccc8]">/ {demo.kcalGoal} kcal</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {demo.macros.map((m, i) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold" style={{ color: m.color }}>
                      {m.label}
                    </span>
                    <span className="text-[13px] text-[#d0d3cf] tabular-nums">
                      {full ? <Counter value={m.value} run={animating} delay={0.3 + i * 0.12} /> : 0}g / {m.goal}g
                    </span>
                  </div>
                  <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#e3e7e2]">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        animating && "transition-[width] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      )}
                      style={{
                        background: m.color,
                        width: full ? `${Math.min((m.value / m.goal) * 100, 100)}%` : "0%",
                        transitionDelay: `${0.3 + i * 0.12}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-[22px] text-[15px] font-bold">{demo.mealsTitle}</p>
            {full ? (
              <div
                className={cn("mt-3 border-b border-[#3a3a3a] pb-3", animating && "animate-[slide-in_0.45s_cubic-bezier(0.22,1,0.36,1)_1.1s_both]")}
              >
                <p className="text-[14.5px] font-semibold">{demo.meal.name}</p>
                <p className="mt-1.5 text-[12.5px] text-[#a7aba6]">{demo.meal.detail}</p>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-2 border-b border-[#3a3a3a] pb-3">
                <div className="skeleton h-3.5 w-[70%]" />
                <div className="skeleton h-2.5 w-[88%]" />
              </div>
            )}
          </div>

          <div aria-hidden className="absolute right-[18px] bottom-[74px] grid size-14 place-items-center rounded-full bg-[#1f9a62]">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 flex h-[54px] items-center justify-around border-t border-[#333] text-[13px]"
          >
            {demo.tabs.map((tab, i) => (
              <span key={tab} className={i === 0 ? "font-bold" : "text-[#a7aba6]"}>
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>

      {armed && (
        <button
          type="button"
          onClick={() => {
            setLoaded(false);
            setRun((r) => r + 1);
          }}
          className="min-h-10 rounded-[10px] border border-dashed border-control px-3.5 font-mono text-sm text-muted transition-colors hover:border-fg hover:text-fg"
        >
          ↻ {replayLabel}
        </button>
      )}
    </div>
  );
}
