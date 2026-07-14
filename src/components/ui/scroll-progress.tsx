"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Thin gold progress bar pinned to the top of the viewport, tracking page
 * scroll. Spring-smoothed so it eases rather than snaps. Best suited to long
 * reading pages (e.g. individual project case studies).
 *
 * Purely decorative — hidden from assistive tech.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent",
        className,
      )}
    />
  );
}
