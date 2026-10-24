"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Respeta la preferencia del sistema "reducir movimiento" en todas las animaciones.
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
