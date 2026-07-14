/**
 * Home page content.
 *
 * Structured, typed copy for the home page so pages render from data and
 * future edits touch only this file (CLAUDE.md content-management rule).
 * Types are co-located here — this content is unique to the home page and
 * shared with nothing else, so it does not belong in the global `types/`.
 */

/** A single "currently" entry — what Jennifer is building/learning/into now. */
export interface CurrentItem {
  /** Short category label, e.g. "Building", "Learning", "Reading". */
  label: string;
  /** The thing itself. */
  title: string;
  /** Optional one-line detail. */
  detail?: string;
  /** Optional external link (e.g. repo, article). */
  href?: string;
}

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
      "Software Engineer building AI products, developer tools, and communities.",
    cta: { label: "View Projects", href: "/projects" },
  },
  about: {
    eyebrow: "About",
    heading: "Engineering with intent, from idea to interface.",
    paragraphs: [
      "I'm a software engineer drawn to the space where thoughtful engineering meets considered design — building AI products and developer tools that feel effortless to use and are a pleasure to maintain.",
      "I care about craftsmanship: clean architecture, accessible interfaces, and the small details that make software feel premium. Alongside the code, I invest in the communities that help engineers grow.",
    ],
  },
  current: {
    eyebrow: "Currently",
    heading: "What I'm focused on right now.",
    items: [
      {
        label: "Building",
        title: "AI-powered developer tools",
        detail: "Exploring how LLMs can make everyday engineering faster.",
      },
      {
        label: "Learning",
        title: "Systems design & distributed systems",
        detail: "Going deeper on the architecture behind products at scale.",
      },
      {
        label: "Community",
        title: "Mentoring & organizing",
        detail: "Helping students break into software engineering.",
      },
    ],
  },
  connect: {
    eyebrow: "Get in touch",
    heading: "Let's build something.",
    description:
      "I'm always open to conversations about engineering roles, collaborations, and interesting problems.",
    cta: { label: "Say hello", href: "mailto:hello@example.com" },
  },
};
