"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

/**
 * Floating "back to top" control that fades in once the user has scrolled
 * well past the fold. Scrolls smoothly to the top (honoring reduced-motion
 * via the caller's `behavior`). Fixed bottom-right, out of content flow.
 */
export function BackToTop({ className }: { className?: string }) {
  // Reuse the shared scroll hook with a larger threshold so it only appears
  // once there's meaningful distance to travel back.
  const visible = useScrolled(600);

  const scrollToTop = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full",
            "border border-border bg-surface text-foreground backdrop-blur-xl shadow-md",
            "transition-colors duration-200 hover:border-brand hover:text-brand",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            className,
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
