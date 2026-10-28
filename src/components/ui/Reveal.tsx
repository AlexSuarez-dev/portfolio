"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Aparece con un fundido suave al entrar en pantalla (una sola vez).
 * No se usa en el hero: lo de arriba del todo se pinta visible desde el
 * primer momento para no retrasar la carga (LCP).
 * Sin JavaScript se ve igual (regla <noscript> de layout.tsx con `data-reveal`).
 * Con "reducir movimiento" solo hace el fundido (MotionConfig en Providers).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
