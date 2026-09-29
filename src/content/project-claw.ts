/**
 * Shared copy + types for interactive project discovery (Home deck, Projects claw).
 */

export interface ProjectGameContent {
  eyebrow: string;
  heading: string;
  description: string;
  /** Primary action label (deck aria-label / Grab button). */
  actionLabel: string;
  /** Label while the animation is running. */
  busyLabel: string;
  /** Prefix for the aria-live announcement after a result lands. */
  resultAnnounce: string;
  /** CTA on the revealed project card. */
  resultCta: string;
  /** Optional secondary link under the interaction. */
  viewAll?: { label: string; href: string };
  /** Claw cabinet labels. */
  cabinetLabel?: string;
  chuteLabel?: string;
  /** Near-miss copy. */
  missAnnounce?: string;
  missHint?: string;
  /** Directional coaching when the claw is off a ball. */
  missHintLeft?: string;
  missHintRight?: string;
  /** Controls hint. */
  aimHint?: string;
}

/** Projects-page classic claw machine copy. */
export const projectClawContent: ProjectGameContent = {
  eyebrow: "Arcade",
  heading: "Claw a project",
  description:
    "Filter the prize balls by group, line the claw up, and grab. Misses happen — nudge left or right and try again.",
  actionLabel: "Grab",
  busyLabel: "Grabbing…",
  resultAnnounce: "Grabbed",
  resultCta: "Open case study",
  cabinetLabel: "Project prizes",
  chuteLabel: "Prize chute",
  missAnnounce: "Missed — try again",
  missHint: "Line the claw up over a ball, then grab.",
  missHintLeft: "Almost — move slightly left to grab that ball.",
  missHintRight: "Almost — move slightly right to grab that ball.",
  aimHint: "Hold ← → or drag in the bay · Grab drops the claw",
};
