"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { buttonStyles, cn } from "./primitives";

/** Muestra el email y lo copia al portapapeles; avisa durante 2 segundos. */
export function CopyEmail({ email, copyLabel, copiedLabel }: { email: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: el enlace mailto sigue disponible.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={copyLabel}
      className={cn(buttonStyles.base, buttonStyles.ghost, "font-mono text-[15px] font-normal break-all")}
    >
      {email}
      {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : copyLabel}
      </span>
    </button>
  );
}
