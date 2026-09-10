/**
 * Experience content (Milestone 5).
 *
 * Structured, typed roles so the timeline renders from data — adding or
 * editing a position means touching only this file. Ordered most-recent
 * first; the timeline renders them top-to-bottom in that order.
 *
 * Source of truth for roles/dates: LinkedIn (linkedin.com/in/jenniferye1t).
 * Descriptions are portfolio-polished from LinkedIn blurbs and public posts;
 * revise freely. Types are co-located here (mirroring `content/projects.ts`).
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
 * Roles curated for the portfolio timeline (engineering, research, and
 * teaching leadership). Earlier high-school admin/outreach roles live on
 * LinkedIn but are omitted here so the page stays focused for recruiters.
 * Newest / current roles first.
 */
export const experience: ExperienceItem[] = [
  {
    id: "paragon-2026",
    company: "Paragon Policy Fellowship",
    role: "AI Research Fellow",
    start: "May 2026",
    end: "Present",
    location: "San Jose, CA",
    description: [
      "Researching AI transparency and public accountability for state and local government — turning technical systems into clear policy briefs decision-makers can act on.",
      "Part of a fellowship that pairs students with real tech-policy problems, from procurement to infrastructure, at the pace of public institutions.",
    ],
    technologies: ["AI Policy", "Research Writing", "Public Accountability"],
    href: "https://www.paragonfellowship.org",
  },
  {
    id: "cics-uca-2025",
    company: "Manning CICS, UMass Amherst",
    role: "UCA Program Coordinator & Course Assistant",
    start: "Sep 2025",
    end: "Present",
    location: "Amherst, MA",
    description: [
      "Coordinate the Undergraduate Course Assistant program and support CS210 Data Structures and CS198C Introduction to C — office hours, labs, and the day-to-day systems that keep a large course running.",
      "Bridge students and faculty: clearer workflows for UCAs, faster answers for learners, and a program that scales without losing the human touch.",
    ],
    technologies: ["Data Structures", "C", "Teaching", "Program Management"],
    href: "https://www.cics.umass.edu",
  },
  {
    id: "salesforce-2026",
    company: "Salesforce",
    role: "Software Engineer Intern",
    start: "Jun 2026",
    end: "Aug 2026",
    location: "San Francisco Bay Area",
    description: [
      "Futureforce Tech Launchpad (with CodePath): built MapResponse, a crisis-response platform with a multilingual voice agent, chatbot, and real-event ingestion — shipped end-to-end with teammates and mentors.",
      "On the Agentforce Coworker Search team, optimized Salesforce Data 360 search latency and debugged backend record-matching failures in production.",
    ],
    technologies: [
      "Full-Stack",
      "Data 360",
      "Agentforce",
      "Backend",
      "Search",
    ],
    href: "https://www.salesforce.com",
  },
  {
    id: "dell-2026",
    company: "Dell Technologies",
    role: "Excel with Dell Consultant",
    start: "Jan 2026",
    end: "Apr 2026",
    location: "Round Rock, TX",
    description: [
      "Built a sentiment-analysis dashboard over customer feedback — surfacing themes and signal so product and support teams could act on what customers actually say.",
      "Focused on clarity over noise: readable visuals, trustworthy aggregates, and a workflow that fits how consultants already work.",
    ],
    technologies: ["Python", "Sentiment Analysis", "Dashboards", "Data Viz"],
    href: "https://www.dell.com",
  },
  {
    id: "stem-for-others-2025",
    company: "STEM For Others",
    role: "AI Software Developer",
    start: "Sep 2025",
    end: "May 2026",
    location: "San Jose, CA",
    description: [
      "Built AI-powered STEM content generation for a nonprofit reaching 11,500+ students through free programs worldwide.",
      "Helped volunteers and educators produce high-quality learning materials faster — so more of the mission time goes to students, not blank pages.",
    ],
    technologies: ["AI/ML", "Python", "Content Generation", "Education Tech"],
    href: "https://www.stemforothers.org",
  },
  {
    id: "idpi-2025",
    company: "Initiative for Digital Public Infrastructure",
    role: "Undergraduate Research Fellow",
    start: "Sep 2025",
    end: "May 2026",
    location: "Amherst, MA",
    description: [
      "Researched AI-generated content on TikTok — how synthetic media shows up in public feeds and what that means for digital public infrastructure.",
      "Built analysis tooling (including parsing and measurement pipelines) so findings stayed reproducible as the platform and the content evolved.",
    ],
    technologies: ["Python", "Research", "AIGC", "Data Analysis"],
    href: "https://publicinfrastructure.org",
  },
  {
    id: "stealth-2025",
    company: "Stealth Startup",
    role: "Lead Founding Engineer",
    start: "Jul 2025",
    end: "May 2026",
    location: "New York City Metropolitan Area",
    description: [
      "Led engineering for an early-stage company pivoting from consumer social to B2B SaaS — owning core product surfaces from prototype to something teams could actually run on.",
      "Wore the full founding-engineer stack: architecture decisions, shipping velocity, and the judgment calls that keep a young product coherent as the market shifts.",
    ],
    technologies: ["TypeScript", "Next.js", "React", "SaaS", "Full-Stack"],
  },
  {
    id: "actblue-2025",
    company: "ActBlue",
    role: "Business Systems Analyst Intern",
    start: "May 2025",
    end: "May 2026",
    location: "Somerville, MA",
    description: [
      "Started as a Systems Admin Engineering Intern, then moved into Business Systems Analyst work — bridging engineering, product, and the operational systems that keep a high-volume fundraising platform reliable.",
      "Improved how internal tools and workflows support the people who keep donations flowing for campaigns and nonprofits nationwide.",
    ],
    technologies: [
      "Systems Administration",
      "Business Systems",
      "SQL",
      "Product Ops",
    ],
    href: "https://secure.actblue.com",
  },
  {
    id: "microsoft-2025",
    company: "Microsoft",
    role: "Emerging Security Leader",
    start: "Jul 2025",
    end: "Sep 2025",
    location: "Redmond, WA",
    description: [
      "Selected for Microsoft’s Emerging Security Leader program — deepening security fundamentals alongside peers and practitioners across the industry.",
      "Focused on how modern product teams think about risk, threat modeling, and building systems that stay trustworthy at scale.",
    ],
    technologies: ["Cybersecurity", "Threat Modeling", "Security Operations"],
    href: "https://www.microsoft.com",
  },
  {
    id: "bny-2025",
    company: "BNY",
    role: "Engineering Summit Team Lead",
    start: "May 2025",
    end: "Jul 2025",
    location: "New York City Metropolitan Area",
    description: [
      "Led a team building a stock share allocation system during BNY’s engineering summit — translating a finance workflow into clear software requirements and a working prototype.",
      "Owned scoping, collaboration, and delivery under a tight timeline typical of real product engineering.",
    ],
    technologies: ["Quantitative Finance", "Systems Design", "Team Leadership"],
    href: "https://www.bny.com",
  },
  {
    id: "accenture-2025",
    company: "Accenture",
    role: "Technical Consulting Fellow",
    start: "May 2025",
    end: "Jun 2025",
    location: "Dublin, Ireland",
    description: [
      "Explored extended reality applications for hospitals — how XR can support clinical and operational workflows without getting in the way of care.",
      "Practiced the consulting loop: understand the constraint, prototype the experience, and communicate tradeoffs to non-engineering stakeholders.",
    ],
    technologies: ["XR", "Technical Consulting", "Healthcare Tech"],
    href: "https://www.accenture.com",
  },
  {
    id: "holistic-kids-2025",
    company: "Holistic Kids Foundation",
    role: "Full-Stack Software Developer",
    start: "Feb 2025",
    end: "May 2025",
    location: "Santa Monica, CA",
    description: [
      "Built a social media content moderation app for a nonprofit focused on youth wellbeing — helping reviewers catch harmful content with less manual grind.",
      "Shipped full-stack features that balanced speed for moderators with enough context to make careful decisions.",
    ],
    technologies: ["Full-Stack", "JavaScript", "React", "Moderation"],
  },
  {
    id: "umass-it-2024",
    company: "University of Massachusetts Amherst",
    role: "IT Student Consultant & Web Developer",
    start: "Nov 2024",
    end: "May 2026",
    location: "Amherst, MA",
    description: [
      "Supported campus IT as a student consultant, then built and maintained web experiences for Biology and EGCS — practical, accessible sites for academic audiences.",
      "Learned what “reliable” means in a university setting: clear handoffs, maintainable pages, and help that actually unblocks people.",
    ],
    technologies: ["Web Development", "IT Support", "HTML/CSS", "JavaScript"],
    href: "https://www.umass.edu",
  },
  {
    id: "google-2022",
    company: "Google",
    role: "Software Development Intern",
    start: "Dec 2022",
    end: "Jun 2024",
    location: "New York City Metropolitan Area",
    description: [
      "Built software focused on financial literacy for students — turning abstract money concepts into interactive learning experiences people would actually finish.",
      "Worked in a long-running development program that emphasized shipping real features, clean code, and collaboration across a distributed team.",
    ],
    technologies: ["JavaScript", "Front-End", "Education Tech", "Git"],
    href: "https://www.google.com",
  },
  {
    id: "stuypulse-2020",
    company: "StuyPulse (FRC Team 694)",
    role: "Robotics Software Engineer",
    start: "Sep 2020",
    end: "Jun 2024",
    location: "New York City Metropolitan Area",
    description: [
      "Wrote competition robot software for Stuyvesant’s FIRST Robotics team — controls, autonomy, and the systems that have to work when the match clock is running.",
      "Contributed to a run of regional wins and control awards (including Innovation in Control and Autonomous Award sponsored by Ford); later presented Chairman’s Impact Award work recognizing the team’s broader community impact.",
    ],
    technologies: ["Java", "Controls", "Autonomy", "Robotics"],
    href: "https://stuypulse.com",
  },
];

/** All experience entries, newest-first (display order). */
export const getExperience = (): ExperienceItem[] => experience;
