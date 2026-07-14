/**
 * Projects content — the most important page (CLAUDE.md).
 *
 * Structured, typed case studies so the index and each dynamic
 * `/projects/[slug]` page render from data. Adding or editing a project means
 * touching only this file: append a `Project`, and both the card grid and the
 * detail route update automatically.
 *
 * Types are co-located here (mirroring `content/home.ts`) — this shape is
 * unique to projects and shared with nothing else, so it does not belong in
 * the global `types/`.
 */

/** A labelled external link on a project (e.g. source, live demo). */
export interface ProjectLink {
  label: string;
  href: string;
}

/** A screenshot / gallery image for the case study. */
export interface ProjectImage {
  src: string;
  alt: string;
  /** Optional caption shown beneath the image. */
  caption?: string;
}

/**
 * A single case study. The index renders `slug`, `name`, `tagline`, `year`,
 * `status`, `tech`, and cover fields; the detail page renders the full body.
 * Optional sections are simply omitted from the detail page when absent, so
 * every project need not fill in all fields.
 */
export interface Project {
  /** URL segment — `/projects/<slug>`. Must be unique and kebab-case. */
  slug: string;
  /** Project name / title. */
  name: string;
  /** One-line positioning statement, shown on the card and detail hero. */
  tagline: string;
  /** Short category label (e.g. "AI Product", "Developer Tool"). */
  category: string;
  /** Year or range (e.g. "2024"). Shown as card metadata. */
  year: string;
  /** Lifecycle status — drives a small badge. */
  status: "Live" | "In progress" | "Prototype" | "Archived";
  /** Primary technologies. First few surface on the card; all on detail. */
  tech: string[];
  /** Two-tone cover gradient endpoints (CSS colors) for the generated cover. */
  cover: { from: string; to: string };
  /**
   * Optional real cover image. When present it renders instead of the
   * generated gradient cover (drop a file in /public and set the path).
   */
  coverImage?: ProjectImage;
  /** Whether to feature this project in the home "Featured Projects" area. */
  featured?: boolean;

  /* ---- Case-study body (detail page) ---- */
  /** 1–2 paragraph overview of what the project is. */
  overview: string[];
  /** The problem being solved. */
  problem?: string[];
  /** The solution / approach taken. */
  solution?: string[];
  /** Architecture notes — how it's built. */
  architecture?: string[];
  /** Reflections / what was learned. */
  lessons?: string[];
  /** Screenshots for the detail gallery. */
  screenshots?: ProjectImage[];
  /** External links (source, demo, etc.). */
  links?: ProjectLink[];
}

/**
 * NOTE: Copy below is a first-draft scaffold — revise freely. The structure is
 * stable; only the strings change. Cover gradients use the brand navy scale so
 * the grid reads cohesively until real cover imagery is added.
 */
export const projects: Project[] = [
  {
    slug: "crisis360",
    name: "Crisis360",
    tagline:
      "A real-time situational-awareness platform that turns scattered crisis signals into one clear operating picture.",
    category: "AI Product",
    year: "2024",
    status: "Live",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
    cover: { from: "#1d3050", to: "#0b1220" },
    featured: true,
    overview: [
      "Crisis360 aggregates live signals — social posts, official alerts, and sensor feeds — into a single, continuously updated map of an unfolding situation, so responders spend their attention on decisions rather than on hunting for information.",
      "It pairs a streaming ingestion pipeline with LLM-assisted summarization to distill noisy, high-volume inputs into a concise, trustworthy brief that updates as the situation evolves.",
    ],
    problem: [
      "During a crisis, critical information is fragmented across dozens of channels and arrives faster than any team can read. The cost of a missed or late signal is measured in outcomes, not clicks.",
      "Existing dashboards show raw feeds but leave the hardest work — synthesis — to already-overloaded operators.",
    ],
    solution: [
      "A prioritization layer scores incoming signals for relevance and credibility, and an LLM composes a living situation summary with citations back to the source signals.",
      "Everything is spatial: signals resolve to locations and cluster on a map, so patterns surface visually before they're obvious in text.",
    ],
    architecture: [
      "A FastAPI ingestion service normalizes heterogeneous feeds into a common event schema and streams them into PostgreSQL with PostGIS for geospatial queries.",
      "The Next.js front end subscribes to updates over websockets; summarization runs as a debounced background job so LLM cost scales with signal volume, not with viewers.",
    ],
    lessons: [
      "Trust is a feature: every AI-generated line needed a traceable path back to its sources before operators would rely on it.",
      "Latency budgets shape architecture more than model choice — the debounced summarization job mattered more to the experience than which model produced the text.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065" },
    ],
  },
  {
    slug: "vaip",
    name: "VAIP",
    tagline:
      "A voice-first AI programming assistant that lets you navigate and edit code hands-free.",
    category: "Developer Tool",
    year: "2024",
    status: "In progress",
    tech: ["TypeScript", "Electron", "Web Speech API", "Node.js", "OpenAI"],
    cover: { from: "#274268", to: "#111b2e" },
    featured: true,
    overview: [
      "VAIP (Voice AI Programming) is an experiment in editing code without a keyboard — you describe intent aloud and it translates speech into precise, reviewable edits.",
      "The goal is accessibility and flow: keeping engineers in a train of thought without the context-switch of typing exact syntax.",
    ],
    problem: [
      "Voice coding tools tend to transcribe words literally, which is hopeless for code. Punctuation, symbols, and structure make dictation frustrating and error-prone.",
    ],
    solution: [
      "VAIP treats speech as intent, not transcription: an LLM maps natural phrasing (\"wrap this in a try/catch\") to concrete AST-aware edits the user confirms before they apply.",
    ],
    architecture: [
      "An Electron shell hosts the editor and captures audio; recognized speech is paired with the current selection and file context, then sent to a model that returns a structured edit proposal.",
    ],
    lessons: [
      "Confirmation UX is everything for voice — showing the proposed diff before applying turned an unpredictable tool into a trustworthy one.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jensome6065" }],
  },
  {
    slug: "popped-up",
    name: "Popped Up",
    tagline:
      "A community platform that helps local pop-up events find their people.",
    category: "Community",
    year: "2023",
    status: "Prototype",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Mapbox"],
    cover: { from: "#345583", to: "#16233b" },
    featured: true,
    overview: [
      "Popped Up is a lightweight platform for discovering and organizing local pop-ups — markets, tastings, and one-night events that are notoriously hard to find until they've already happened.",
      "It focuses on the two moments that matter: organizers announcing an event in seconds, and locals discovering it in time to show up.",
    ],
    problem: [
      "Pop-ups live in ephemeral corners of social media. Discovery depends on already following the right accounts, which excludes exactly the new audience organizers want to reach.",
    ],
    solution: [
      "A map-first, time-aware feed surfaces what's happening near you soon, and a two-tap posting flow lowers the bar for organizers to announce.",
    ],
    architecture: [
      "Built on Supabase for auth, Postgres, and realtime, with Mapbox for geospatial discovery and a Next.js front end deployed on Vercel.",
    ],
    lessons: [
      "A marketplace's cold-start problem is a design problem first: seeding a single neighborhood densely beat launching broadly and thinly.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jensome6065" }],
  },
];

/** All projects, in display order. */
export const getAllProjects = (): Project[] => projects;

/** Projects flagged for the home "Featured" area, in display order. */
export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);

/** Look up a single project by slug (used by the dynamic detail route). */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
