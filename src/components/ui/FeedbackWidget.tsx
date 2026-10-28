"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CloseIcon } from "./icons";
import { buttonStyles, cn, Led } from "./primitives";

type Labels = Dictionary["feedback"];
type Reaction = "love" | "ok" | "meh";
type Status = "idle" | "sending" | "sent" | "error";

const OPEN_EVENT = "feedback:open";
const HIDDEN_KEY = "feedback-hidden"; // cerrado o ya enviado en esta sesión

const reactions: { id: Reaction; emoji: string }[] = [
  { id: "love", emoji: "😍" },
  { id: "ok", emoji: "👍" },
  { id: "meh", emoji: "🤔" },
];

const remember = () => {
  try {
    sessionStorage.setItem(HIDDEN_KEY, "1");
  } catch {}
};
const isHidden = () => {
  try {
    return sessionStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
};

/** Enlace discreto del pie de página que abre el diálogo de opinión. */
export function FeedbackLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="min-h-11 self-start text-left underline decoration-accent underline-offset-4 transition-colors hover:text-fg sm:self-auto"
    >
      {label}
    </button>
  );
}

/**
 * Aviso "¿Te está gustando la web? 😉".
 * - Aparece una vez al llegar a #contact (nunca se abre solo el diálogo).
 * - Se puede cerrar; no vuelve a salir en la sesión.
 * - El diálogo es un <dialog> nativo: atrapa el foco, se cierra con Esc
 *   y devuelve el foco al botón que lo abrió.
 * - Las respuestas van a /api/feedback (ver route.ts y README).
 */
export function FeedbackWidget({ lang, labels }: { lang: Locale; labels: Labels }) {
  const [pill, setPill] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [needsReaction, setNeedsReaction] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openedAt = useRef(0);

  // Muestra el aviso cuando la sección de contacto entra en pantalla.
  useEffect(() => {
    if (isHidden()) return;
    const target = document.getElementById("contact");
    if (!target) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = setTimeout(() => setPill(true), 700);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(target);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const open = useCallback(() => {
    openedAt.current = Date.now();
    setNeedsReaction(false);
    setStatus((s) => (s === "sent" ? s : "idle"));
    dialogRef.current?.showModal();
    setDialogOpen(true);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, [open]);

  function dismiss() {
    setPill(false);
    remember();
  }

  // Un clic en el fondo oscuro (fuera de la tarjeta) cierra el diálogo.
  function onDialogClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) close();
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reaction) {
      setNeedsReaction(true);
      return;
    }
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reaction,
          comment: String(form.get("comment") ?? ""),
          website: String(form.get("website") ?? ""), // trampa para bots
          lang,
          elapsed: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setPill(false);
      remember();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {pill && !dialogOpen && (
        <div className="feedback-pill fixed right-4 bottom-4 z-40 flex items-center gap-1.5 sm:right-7 sm:bottom-6">
          <button
            type="button"
            onClick={open}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full border border-control bg-surface pr-5 pl-4 text-[15px] font-semibold shadow-[0_20px_40px_-20px_rgb(0_0_0/0.7)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 btn-glow"
          >
            <Led className="feedback-ping size-2.5" />
            {labels.cta} <span aria-hidden>😉</span>
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label={labels.dismiss}
            className="grid size-11 place-items-center rounded-full border border-control bg-surface text-muted transition-colors hover:text-fg"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="feedback-title"
        onClick={onDialogClick}
        onClose={() => setDialogOpen(false)}
        className="feedback-dialog m-auto w-[460px] max-w-[calc(100%-2rem)] rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]"
      >
        <div className="relative flex flex-col gap-[18px] p-7">
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-[10px] text-muted transition-colors hover:text-fg"
          >
            <CloseIcon />
          </button>

          {status === "sent" ? (
            <div role="status" className="flex flex-col items-start gap-3 pr-9">
              <Led className="size-3" />
              <h2 id="feedback-title" className="text-[26px] font-semibold tracking-[-0.03em]">
                {labels.thanks} <span aria-hidden>🙌</span>
              </h2>
              <p className="text-[15px] leading-relaxed text-muted">{labels.thanksText}</p>
              <div className="mt-1.5 flex flex-wrap gap-2.5">
                <a href="#contact" onClick={close} className={cn(buttonStyles.base, buttonStyles.primary, "min-h-11 px-[18px] text-[15px]")}>
                  {labels.talk}
                </a>
                <button type="button" onClick={close} className={cn(buttonStyles.base, buttonStyles.ghost, "min-h-11 px-[18px] text-[15px]")}>
                  {labels.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-[18px]" noValidate>
              <div className="flex flex-col gap-2 pr-9">
                <h2 id="feedback-title" className="text-[26px] leading-tight font-semibold tracking-[-0.03em]">
                  {labels.title} <span aria-hidden>😉</span>
                </h2>
                <p className="text-[15px] leading-relaxed text-muted">{labels.text}</p>
              </div>

              <div role="group" aria-label={labels.rating} className="flex flex-wrap gap-2">
                {reactions.map((r) => {
                  const on = reaction === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setReaction(r.id);
                        setNeedsReaction(false);
                      }}
                      className={cn(
                        "flex min-h-[76px] flex-[1_1_120px] flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-sm font-semibold transition-[border-color,background-color,transform] duration-200 active:scale-[0.97]",
                        on ? "border-accent bg-surface-2" : "border-control hover:border-fg",
                      )}
                    >
                      <span aria-hidden className="text-2xl leading-none">
                        {r.emoji}
                      </span>
                      {labels[r.id]}
                    </button>
                  );
                })}
              </div>
              {needsReaction && (
                <p role="alert" className="-mt-2 text-sm text-accent">
                  {labels.pick}
                </p>
              )}

              <label className="flex flex-col gap-2 text-sm font-semibold">
                <span>
                  {labels.comment} <span className="font-normal text-muted">{labels.optional}</span>
                </span>
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={1000}
                  placeholder={labels.placeholder}
                  className="min-h-[84px] resize-y rounded-[10px] border border-control bg-bg p-3 text-[15px] leading-normal font-normal text-fg placeholder:text-muted"
                />
              </label>

              {/* Campo trampa: las personas no lo ven; los bots suelen rellenarlo. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

              {status === "error" && (
                <p role="alert" className="text-sm text-accent">
                  {labels.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(buttonStyles.base, buttonStyles.primary, "disabled:cursor-wait disabled:opacity-70")}
              >
                {status === "sending" ? labels.sending : labels.send}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
