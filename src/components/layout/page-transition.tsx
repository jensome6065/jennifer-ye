"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Per-navigation enter transition. Rendered from the App Router `template.tsx`,
 * which remounts on every route change — so keying on the pathname gives each
 * page a fresh, restrained fade-and-rise as it mounts.
 *
 * Deliberately enter-only (no exit): App Router unmounts the old tree before
 * the new one commits, so an AnimatePresence exit can't reliably play. A short,
 * soft entrance keeps navigation feeling considered without delaying content.
 *
 * Reduced motion is handled by MotionConfig (`reducedMotion="user"`): the
 * `y` offset is dropped and only the opacity fade remains.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
