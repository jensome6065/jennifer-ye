"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * App-wide Framer Motion configuration.
 *
 * `reducedMotion="user"` is the important part: it makes every Framer
 * animation defer to the OS "reduce motion" setting, stripping transform and
 * layout animations (translate, scale, rotate) while still allowing opacity
 * fades. Our CSS reset in globals.css neutralizes CSS transitions for the same
 * users; this covers the JS-driven half so the two stay in agreement.
 *
 * The shared easing curve is set as the default transition so any bare
 * `animate`/`whileInView` without an explicit transition still feels on-brand.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionConfig>
  );
}
