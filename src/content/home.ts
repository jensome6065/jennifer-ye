/**
 * Home page content.
 *
 * Structured, typed copy for the home page so pages render from data and
 * future edits touch only this file (CLAUDE.md content-management rule).
 * Types are co-located here — this content is unique to the home page and
 * shared with nothing else, so it does not belong in the global `types/`.
 *
 * Brand through-line: Jennifer can't sit still — learning, building, or exploring.
 */

import type { ProjectGameContent } from "@/content/project-claw";

/** A single "currently" entry — what Jennifer is learning / building / exploring. */
export interface CurrentItem {
  /** Short category label, e.g. "Learning", "Building", "Exploring". */
  label: string;
  /** The thing itself. */
  title: string;
  /** Optional one-line detail. */
  detail?: string;
  /** Optional external link (e.g. repo, article). */
  href?: string;
}

export type { ProjectGameContent };

export interface HomeContent {
  hero: {
    /** Small label above the name. */
    eyebrow: string;
    /** Primary headline — the name. */
    name: string;
    /** Supporting one-to-two sentence positioning statement. */
    tagline: string;
    cta: { label: string; href: string };
  };
  about: {
    eyebrow: string;
    heading: string;
    /** Paragraphs of about copy, rendered in order. */
    paragraphs: string[];
  };
  /** Card-deck shuffle — primary featured work on Home. */
  featuredSlot: ProjectGameContent;
  current: {
    eyebrow: string;
    heading: string;
    items: CurrentItem[];
  };
  connect: {
    eyebrow: string;
    heading: string;
    description: string;
    cta: { label: string; href: string };
  };
}

/**
 * NOTE: About/Current copy below is a first draft — revise freely. Structure
 * is stable; only the strings change.
 */
export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Software Engineer",
    name: "Jennifer Ye",
    tagline:
      "I can't sit still — whether that's learning, building, or exploring.",
    cta: { label: "View Projects", href: "/projects" },
  },
  about: {
    eyebrow: "About",
    heading: "Always in motion.",
    paragraphs: [
      "If there's one thing to take away about me, it's that I can't sit still. I'm a software engineer drawn to AI products, developer tools, and communities — usually learning something new, building something real, or exploring the world beyond the editor.",
      "That restlessness shows up as craftsmanship: clean architecture, accessible interfaces, and the small details that make software feel premium. When I'm not shipping, I'm chasing the next table worth returning to or the record I can't skip.",
    ],
  },
  featuredSlot: {
    eyebrow: "Featured",
    heading: "Shuffle the deck",
    description:
      "A poker-style shuffle through selected work — deal yourself a featured project, or browse them all.",
    actionLabel: "Shuffle",
    busyLabel: "Shuffling…",
    resultAnnounce: "Dealt",
    resultCta: "View case study",
    viewAll: { label: "View all projects", href: "/projects" },
  },
  current: {
    eyebrow: "Currently",
    heading: "Learning. Building. Exploring.",
    items: [
      {
        label: "Learning",
        title: "Systems design & distributed systems",
        detail: "Going deeper on the architecture behind products at scale.",
      },
      {
        label: "Building",
        title: "AI-powered developer tools",
        detail: "Exploring how LLMs can make everyday engineering faster.",
      },
      {
        label: "Exploring",
        title: "Tables, tracks, and taste",
        detail: "The spots I send friends to and the albums on repeat.",
        href: "/lifestyle",
      },
    ],
  },
  connect: {
    eyebrow: "Get in touch",
    heading: "Let's keep moving.",
    description:
      "Open to engineering roles, collaborations, and problems that won't sit still either.",
    cta: { label: "Say hello", href: "mailto:hello@example.com" },
  },
};
