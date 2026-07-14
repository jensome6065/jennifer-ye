"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface Parallax<T extends HTMLElement> {
  /** Attach to the scroll-tracked element (defines the parallax range). */
  ref: React.RefObject<T | null>;
  /**
   * Vertical offset to bind to a `motion` element's `style.y`. `null` when the
   * user prefers reduced motion — callers should skip the transform entirely
   * rather than binding a static value.
   */
  y: MotionValue<number> | null;
}

/**
 * Scroll-linked vertical parallax. As the tracked element travels through the
 * viewport, the bound layer drifts by ±`distance` px, a touch slower than the
 * scroll — adding quiet depth without the layer ever detaching from content.
 *
 * Fully disabled under `prefers-reduced-motion` (returns `y: null`). Because it
 * reads a raw scroll MotionValue rather than an `animate` prop, MotionConfig's
 * reduced-motion handling doesn't reach it, so we gate it explicitly here.
 *
 * The bound layer should overflow its frame by more than `distance` (e.g. a
 * negative inset) so the drift never exposes an edge.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 28,
): Parallax<T> {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Enters low, exits high — the layer rises as the section scrolls past.
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return { ref, y: reduce ? null : y };
}
