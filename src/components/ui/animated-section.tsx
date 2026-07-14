"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { fadeUp, inViewport, staggerContainer } from "@/lib/motion";

/**
 * Cache of motion-wrapped tags keyed by element type. `motion(tag)` must not
 * be called during render (it creates a new component identity each time,
 * remounting the subtree), so we memoize per tag at module scope.
 */
const motionTagCache = new Map<ElementType, ReturnType<typeof motion>>();

function getMotionTag(tag: ElementType): ReturnType<typeof motion> {
  let cached = motionTagCache.get(tag);
  if (!cached) {
    cached = motion(tag);
    motionTagCache.set(tag, cached);
  }
  return cached;
}

type AnimatedSectionProps = {
  /** Element to render (e.g. "section", "div", "ul"). Defaults to "div". */
  as?: ElementType;
  /**
   * When true, reveals children in a staggered sequence. Direct children
   * should be `<motion.*>` (or nested AnimatedItem) using the `fadeUp`
   * variant. When false (default) the element itself fades up as one unit.
   */
  stagger?: boolean;
  /** Delay before the reveal begins, in seconds. */
  delay?: number;
} & ComponentPropsWithoutRef<typeof motion.div>;

/**
 * Scroll-reveal wrapper. Fades its content up the first time it enters the
 * viewport, respecting reduced-motion (Framer Motion honors the OS setting
 * and our global CSS reset neutralizes the transition).
 *
 * Use `stagger` to sequence children:
 *   <AnimatedSection stagger>
 *     <AnimatedItem>…</AnimatedItem>
 *     <AnimatedItem>…</AnimatedItem>
 *   </AnimatedSection>
 */
export function AnimatedSection({
  as = "div",
  stagger = false,
  delay = 0,
  children,
  transition,
  ...props
}: AnimatedSectionProps) {
  const MotionTag = getMotionTag(as);

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={inViewport}
      variants={stagger ? staggerContainer : fadeUp}
      transition={
        delay ? { delay, ...(transition ?? {}) } : transition
      }
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A single staggered item for use inside `<AnimatedSection stagger>`.
 * Shares the `fadeUp` variant so timing is orchestrated by the parent.
 */
export function AnimatedItem({
  as = "div",
  children,
  ...props
}: { as?: ElementType } & ComponentPropsWithoutRef<typeof motion.div>) {
  const MotionTag = getMotionTag(as);
  return (
    <MotionTag variants={fadeUp} {...props}>
      {children}
    </MotionTag>
  );
}
