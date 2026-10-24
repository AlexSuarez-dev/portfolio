"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Aparece con un fundido suave al entrar en pantalla.
 * `onMount`: anima al cargar la página en vez de al hacer scroll (para el inicio).
 * Si el usuario tiene activado "reducir movimiento", solo se hace el fundido
 * (lo gestiona <MotionConfig reducedMotion="user"> en Providers).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  onMount?: boolean;
}) {
  const visible = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(onMount ? { animate: visible } : { whileInView: visible, viewport: { once: true, margin: "-60px" } })}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
