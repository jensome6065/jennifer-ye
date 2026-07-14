/**
 * Experience content (Milestone 5).
 *
 * Structured, typed roles so the timeline renders from data — adding or
 * editing a position means touching only this file. Ordered most-recent
 * first; the timeline renders them top-to-bottom in that order.
 *
 * Types are co-located here (mirroring `content/projects.ts`): this shape is
 * unique to the experience page and shared with nothing else, so it does not
 * belong in the global `types/`.
 */

/** A single role on the experience timeline. */
export interface ExperienceItem {
  /** Stable unique id (used as a React key and DOM anchor). */
  id: string;
  /** Company / organization name. */
  company: string;
  /** Role / title held. */
  role: string;
  /** Start label, e.g. "May 2024". */
  start: string;
  /** End label, e.g. "Aug 2024", or "Present" for a current role. */
  end: string;
  /** City / remote label, e.g. "San Francisco, CA" or "Remote". */
  location: string;
  /** 1–2 short paragraphs describing the work and impact. */
  description: string[];
  /** Primary technologies used in the role. */
  technologies: string[];
  /** Optional company website. */
  href?: string;
}

/**
 * NOTE: Copy below is a first-draft scaffold — revise freely. The structure is
 * stable; only the strings change. Roles are listed newest-first.
 */
export const experience: ExperienceItem[] = [
  {
    id: "current-swe",
    company: "Stealth Startup",
    role: "Software Engineer",
    start: "Jun 2025",
    end: "Present",
    location: "San Francisco, CA",
    description: [
      "Building AI-powered developer tools from the ground up — owning features end to end, from data model and API to the interface engineers touch every day.",
      "Focused on the parts that make a tool feel trustworthy: fast feedback, clear diffs, and interfaces that stay legible as the product grows.",
    ],
    technologies: ["TypeScript", "Next.js", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
  },
  {
    id: "swe-intern-2024",
    company: "Tech Company",
    role: "Software Engineering Intern",
    start: "May 2024",
    end: "Aug 2024",
    location: "Seattle, WA",
    description: [
      "Shipped features across a production web application used by thousands of engineers, working within an established codebase and review process.",
      "Cut a key page's load time by streamlining data fetching and adding sensible caching, and improved the accessibility of core flows.",
    ],
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
  },
  {
    id: "research-2023",
    company: "University Research Lab",
    role: "Undergraduate Research Assistant",
    start: "Sep 2023",
    end: "Apr 2024",
    location: "Remote",
    description: [
      "Built tooling and data pipelines that let researchers run and compare experiments without wrangling infrastructure by hand.",
      "Turned repeated, manual analysis steps into reproducible scripts, which shortened the loop from idea to result.",
    ],
    technologies: ["Python", "PyTorch", "Pandas", "Docker"],
  },
  {
    id: "community-2023",
    company: "Student Developer Community",
    role: "Organizer & Mentor",
    start: "2022",
    end: "2024",
    location: "Remote",
    description: [
      "Organized workshops and hackathons that helped students take their first steps into software engineering, and mentored newcomers one-on-one.",
      "Grew participation by focusing on a welcoming first experience — clear starting points and projects people were proud to finish.",
    ],
    technologies: ["JavaScript", "React", "Git", "Figma"],
  },
];

/** All experience entries, newest-first (display order). */
export const getExperience = (): ExperienceItem[] => experience;
