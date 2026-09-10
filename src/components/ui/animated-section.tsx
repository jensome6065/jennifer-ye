"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inViewport, staggerContainer } from "@/lib/motion";

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
} as const;

type MotionTagName = keyof typeof MOTION_TAGS;

type AnimatedSectionProps = {
  /** Element to render. Defaults to "div". */
  as?: MotionTagName;
  /**
   * When true, reveals children in a staggered sequence. Direct children
   * should be `<motion.*>` (or nested AnimatedItem) using the `fadeUp`
   * variant. When false (default) the element itself fades up as one unit.
   */
  stagger?: boolean;
  /** Delay before the reveal begins, in seconds. */
  delay?: number;
  children?: ReactNode;
  className?: string;
  id?: string;
  transition?: HTMLMotionProps<"div">["transition"];
} & Omit<
  HTMLMotionProps<"div">,
  "as" | "children" | "transition" | "initial" | "whileInView" | "viewport" | "variants"
>;

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
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

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

type AnimatedItemProps = {
  as?: MotionTagName;
  children?: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "as" | "children" | "variants">;

/**
 * A single staggered item for use inside `<AnimatedSection stagger>`.
 * Shares the `fadeUp` variant so timing is orchestrated by the parent.
 */
export function AnimatedItem({
  as = "div",
  children,
  ...props
}: AnimatedItemProps) {
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;
  return (
    <MotionTag variants={fadeUp} {...props}>
      {children}
    </MotionTag>
  );
}
