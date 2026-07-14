"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past a threshold.
 * Used by the navbar to intensify its blur/border on scroll.
 * Uses a passive listener and rAF-free simple read for low overhead.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
