/**
 * Shared copy + types for interactive project discovery (Home deck, Projects claw).
 */

export interface ProjectGameContent {
  eyebrow: string;
  heading: string;
  description: string;
  /** Primary action label (Shuffle / Grab). */
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
  /** Controls hint. */
  aimHint?: string;
}

/** Projects-page classic claw machine copy. */
export const projectClawContent: ProjectGameContent = {
  eyebrow: "Arcade",
  heading: "Claw a project",
  description:
    "Filter the prize balls by group, move the claw, and grab one. Same energy as a real claw machine — just for case studies.",
  actionLabel: "Grab",
  busyLabel: "Grabbing…",
  resultAnnounce: "Grabbed",
  resultCta: "Open case study",
  cabinetLabel: "Project prizes",
  chuteLabel: "Prize chute",
  missAnnounce: "Slipped — try again",
  missHint: "Move over a ball and grab when the claw is centered.",
  aimHint: "Hold ← → or drag in the bay · Grab drops the claw",
};
