import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Centralizing easing curves and variants keeps animation restrained and
 * consistent across the site — components describe *what* animates, this file
 * owns *how* it feels. Curves mirror the CSS motion tokens in globals.css so
 * JS- and CSS-driven motion stay in sync.
 */

/** Product-grade "settle" curve — quick out, gentle landing. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Symmetric soft curve for reversible motion (e.g. layout shifts). */
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

/** Default reveal transition — used by fade/rise variants below. */
export const revealTransition: Transition = {
  duration: 0.6,
  ease: EASE_OUT_EXPO,
};

/**
 * Fade up from a small offset. The workhorse reveal for sections and cards.
 * Pair with `whileInView` or an `animate` prop.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/** Plain opacity fade — for elements where vertical motion would distract. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: revealTransition },
};

/**
 * Container that staggers its children's reveals. Children should use
 * `fadeUp` (or another item variant) with matching `hidden`/`visible` keys.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

/**
 * Shared `whileInView` viewport config: reveal a touch before fully in view,
 * and only once so scrolling back up doesn't replay animations.
 */
export const inViewport = { once: true, margin: "0px 0px -12% 0px" } as const;
