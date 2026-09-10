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


/** Filterable project groups — display order for chips. */
export const PROJECT_GROUPS = {
  "ai-ml": "AI/ML",
  web: "Web Apps",
  research: "Research",
  games: "Games",
  systems: "Systems",
} as const;

export type ProjectGroup = keyof typeof PROJECT_GROUPS;

/** Chip order on the projects index (excluding "All"). */
export const PROJECT_GROUP_ORDER = Object.keys(
  PROJECT_GROUPS,
) as ProjectGroup[];

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
  /**
   * One or more filter groups. Projects may belong to multiple groups
   * (e.g. AI/ML + Web Apps).
   */
  groups: ProjectGroup[];
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
  /**
   * SNKRS-style "featured drop" on the projects index. At most one project
   * should set this — it becomes the large launch hero above the archive.
   */
  drop?: boolean;

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

/** Human-readable group labels for a project, in chip order. */
export function formatProjectGroups(project: Pick<Project, "groups">): string {
  return PROJECT_GROUP_ORDER.filter((g) => project.groups.includes(g))
    .map((g) => PROJECT_GROUPS[g])
    .join(" · ");
}

/**
 * Projects ordered newest-first. Cover gradients stay in the navy family so
 * the grid reads cohesively until real cover imagery is added.
 *
 * Featured picks emphasize recent, award-winning, or recruiter-relevant work.
 */
export const projects: Project[] = [
  {
    slug: "tek-website",
    name: "TEK Website",
    tagline:
      "Official site for TEK at UMass Amherst — the first professional and social technology community on campus.",
    groups: ["web"],
    year: "2026",
    status: "Live",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Resend",
      "Zod",
    ],
    cover: { from: "#1d3050", to: "#0b1220" },
    overview: [
      "The public website for TEK (Technology, Empowerment & Kinship) at UMass Amherst — membership, events, and culture for a community that believes technology is better when built together.",
      "Built as a production Next.js 15 app with typed content files so officers can update events, board members, and FAQs without touching layout code.",
    ],
    problem: [
      "A new student org needed a site that felt as intentional as the community — not a generic Club Fair flyer — with a real contact path and room to grow.",
    ],
    solution: [
      "Ship an App Router site with motion, member and event surfaces, SEO metadata, and a Resend-backed contact form validated with Zod.",
    ],
    lessons: [
      "Content-as-data keeps an org site maintainable after the founding eng team hands it off.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065/tek-website" },
      { label: "Live site", href: "https://tek-website-psi.vercel.app" },
    ],
  },
  {
    slug: "mbf-website",
    name: "MBF Website",
    tagline:
      "Minutemen Blockchain Fund — a student-managed investment fund site for blockchain, digital assets, and fintech equities.",
    groups: ["web"],
    year: "2026",
    status: "Live",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    cover: { from: "#243a5c", to: "#0e1624" },
    overview: [
      "Marketing and recruiting site for the Minutemen Blockchain Fund at UMass Amherst — positioning the fund, surfacing semester events, and giving prospective analysts a clear way in.",
      "A polished Next.js front end deployed on Vercel so the fund’s story reads as confidently as the markets it studies.",
    ],
    problem: [
      "A student investment fund needs a credible public face — clear mission, upcoming events, and a path to join — without looking like a template club page.",
    ],
    solution: [
      "Build a focused Next.js experience around the fund’s narrative: empowerment through digital assets, semester programming, and a direct questions funnel.",
    ],
    lessons: [
      "For org websites, clarity of who you are beats a long feature list — one strong story and a few CTAs go further.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065/mbf-website" },
      { label: "Live site", href: "https://mbf-website-alpha.vercel.app" },
    ],
  },
  {
    slug: "hackher413-website",
    name: "Hack(H)er413 Website",
    tagline:
      "Event site for Hack(H)er413 — UMass Amherst’s women-and-nonbinary-empowering collegiate hackathon.",
    groups: ["web"],
    year: "2025",
    status: "Live",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    cover: { from: "#2a4268", to: "#111b2e" },
    overview: [
      "The public-facing site for Hack(H)er413: schedule, FAQ, sponsorship, team, and everything attendees need before they show up at the ILC.",
      "Contributed as Assistant Head of Technology — keeping the event’s digital presence accurate as organizing details evolve each season.",
    ],
    problem: [
      "A large hackathon lives or dies on clear logistics online — dates, eligibility, prizes, and team trust — updated under real deadline pressure.",
    ],
    solution: [
      "Maintain and ship updates on the shared Hack(H)er413 site so applicants and sponsors always see the current year’s story.",
    ],
    lessons: [
      "Event websites are ops products: small, correct updates on a deadline matter more than greenfield rewrites mid-season.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/hackher413/hackher413.github.io",
      },
      { label: "Live site", href: "https://www.hackher413.com" },
    ],
  },
  {
    slug: "flixster",
    name: "Flixster",
    tagline:
      "Browse now-playing films from TMDB — search, load more, and accessible movie tiles in a responsive React grid.",
    groups: ["web"],
    year: "2026",
    status: "Live",
    tech: ["React", "Vite", "JavaScript", "TMDB API", "CSS"],
    cover: { from: "#1f3558", to: "#0c1420" },
    overview: [
      "A movie discovery front end powered by The Movie Database API: grid of current titles with posters and ratings, infinite-style load more, and title search with clear/reset.",
      "Built as a unit project with semantic HTML, contrast-aware styling, and responsive layout as first-class requirements.",
    ],
    problem: [
      "API-driven UIs get messy fast — pagination, search state, and empty results need to stay coherent without full-page reloads.",
    ],
    solution: [
      "A Vite + React client that fetches TMDB now-playing data, appends pages on demand, and filters by title while preserving accessibility basics (alt text, semantics, contrast).",
    ],
    lessons: [
      "Treat loading and clearing search as product states, not afterthoughts — users notice when the grid “forgets” where they were.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065/flixster" },
      { label: "Live site", href: "https://flixster-sail.onrender.com/" },
    ],
  },
  {
    slug: "music-explorer",
    name: "Music Explorer",
    tagline:
      "Interactive playlist explorer — grid tiles, detail modals, likes, and song lists built in vanilla JavaScript.",
    groups: ["web"],
    year: "2026",
    status: "Live",
    tech: ["JavaScript", "HTML", "CSS"],
    cover: { from: "#274268", to: "#101a2c" },
    overview: [
      "A playlist browser that renders tiles from local data, opens a modal with tracklists, and lets you like playlists with immediate visual feedback.",
      "Focused on DOM craft: overlays, state on the page, and a layout that still works when the grid is dense.",
    ],
    problem: [
      "Before frameworks, you still need product-quality interactions — modals, likes, and readable song lists without losing the user.",
    ],
    solution: [
      "Vanilla JS modules that mount a playlist grid, manage modal open/close, and update like counts with clear affordances.",
    ],
    lessons: [
      "Framework-free UI is a forcing function for understanding event flow — every click path is yours to own.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jensome6065/music-explorer",
      },
    ],
  },
  {
    slug: "tiktok-metadata-parser",
    name: "TikTok Metadata Parser",
    tagline:
      "Research pipeline for TikTok AIGC signals — scrape metadata, enrich disclosures, and measure label agreement.",
    groups: ["ai-ml", "research"],
    year: "2026",
    status: "Live",
    tech: ["Python", "Selenium", "Pandas", "Data Analysis"],
    cover: { from: "#1a2c48", to: "#0a1018" },
    featured: true,
    overview: [
      "End-to-end tooling for the IDPI TikTok AIGC study: fetch embedded page JSON, merge manual labels, derive disclosure signals, and emit reproducible tables and figures.",
      "Answers how often TikTok labels AI-generated video, how often creators self-disclose, and how well those signals agree.",
    ],
    problem: [
      "Synthetic media on public platforms is hard to measure at scale — labels are inconsistent, captions are noisy, and manual review doesn’t scale alone.",
    ],
    solution: [
      "A scripted pipeline (fetch → parse → enrich → report) that turns TikTok pages and curated sheets into prevalence and agreement analyses with paper-ready figures.",
    ],
    architecture: [
      "Selenium fetchers pull per-video JSON; parsers join human labels; enrichment adds hashtag/caption/platform signals; reporting scripts write markdown findings and figure packs.",
    ],
    lessons: [
      "Research code earns trust when the next student can rerun it from the README — handoff docs are part of the method.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jensome6065/idpi-tiktok-parser",
      },
    ],
  },
  {
    slug: "fusiontech-ai-dashboard",
    name: "FusionTech AI Dashboard",
    tagline:
      "Streamlit review-intelligence dashboard — sentiment, issue word clouds, and a live AI review analyser.",
    groups: ["ai-ml", "web"],
    year: "2026",
    status: "Live",
    tech: [
      "Python",
      "Streamlit",
      "scikit-learn",
      "VADER",
      "Pandas",
      "WordCloud",
    ],
    cover: { from: "#2f4a72", to: "#121c30" },
    featured: true,
    overview: [
      "FusionTech AI Review Intelligence: explore product review sentiment across a catalog, surface keywords from negative feedback, and paste a review for on-the-spot sentiment and topic guidance.",
      "Built for a challenge setting where stakeholders need charts and actions in one place — not a notebook dump.",
    ],
    problem: [
      "Raw review dumps hide what’s broken. Product teams need sentiment split by SKU and language that points to fixable issues.",
    ],
    solution: [
      "A Streamlit app over cleaned review data with metrics, product filters, negative-review word clouds, and a live analyser for new text.",
    ],
    lessons: [
      "Dashboards persuade when the visual hierarchy matches the decision: overview first, then drill-down, then “try it yourself.”",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jensome6065/fusiontech-ai-dashboard",
      },
    ],
  },
  {
    slug: "adaptive-fraud-detector",
    name: "Adaptive Fraud Detector",
    tagline:
      "Behavioral anomaly detection for transactions — testing whether adaptive models beat static fraud baselines.",
    groups: ["ai-ml", "research"],
    year: "2025",
    status: "Live",
    tech: ["Python", "Jupyter", "Anomaly Detection", "Machine Learning"],
    cover: { from: "#345583", to: "#16233b" },
    overview: [
      "A research notebook project asking whether an anomaly detector that keeps learning a user’s spending behavior can catch unusual transactions better than a one-shot static model.",
      "Collaborative AI4ALL-style study: hypothesis, experimental setup, and evaluation aimed at fewer false positives as habits drift.",
    ],
    problem: [
      "Static fraud models assume behavior is frozen. Real spending shifts with lifestyle and income — and outdated baselines flood analysts with false alarms.",
    ],
    solution: [
      "Compare adaptive behavioral learning against a static detector on transaction-like data, focusing on whether continuous updates improve unusual-activity detection.",
    ],
    lessons: [
      "The research question matters as much as the model: “does adapting to the user help?” is clearer than “train another classifier.”",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Moya505/Adaptive-Behavioral-Anomaly-Detection-for-Fraudulent-Transactions",
      },
    ],
  },
  {
    slug: "td3-portfolio-optimization",
    name: "TD3 Portfolio Optimization",
    tagline:
      "A TD3 reinforcement-learning agent that allocates portfolio weights dynamically — beating the S&P 500 on backtest.",
    groups: ["ai-ml", "research"],
    year: "2025",
    status: "Live",
    tech: ["Python", "yfinance", "Reinforcement Learning", "TD3"],
    cover: { from: "#1d3050", to: "#0b1220" },
    featured: true,
    overview: [
      "A portfolio optimization tool built with the Twin Delayed Deep Deterministic Policy Gradient (TD3) algorithm. On backtest it achieved a Sharpe ratio of 3.67 and a 161.30% total return, outperforming the S&P 500.",
      "Built with MAIF’s Quant arm as the first pitch artifact — something that could be trained, backtested, and defended with numbers.",
    ],
    problem: [
      "The team needed a strategy that could be rigorously backtested for an early pitch. A delta-neutral approach wasn’t the right fit, so the brief became: maximize risk-adjusted return through dynamic allocation.",
    ],
    solution: [
      "Use TD3 to learn portfolio weight allocations that maximize Sharpe ratio over time, with market data pulled through yfinance for training and evaluation.",
    ],
    lessons: [
      "Pivoting early from delta-neutral to RL was the right call — a clear objective (Sharpe) made the agent’s success measurable and pitchable.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/weeta-code/TD3-Portfolio-Optimization",
      },
    ],
  },
  {
    slug: "office-leasing-trends",
    name: "Post-COVID U.S. Office Leasing Trends",
    tagline:
      "Year-over-year leased square footage by region — a DataFest analysis that won Best Visualization.",
    groups: ["research"],
    year: "2025",
    status: "Live",
    tech: ["Python", "SQL", "R", "Streamlit", "Tableau"],
    cover: { from: "#243a5c", to: "#0e1624" },
    overview: [
      "An analysis of how U.S. commercial office leasing rebounded after COVID, highlighting year-over-year changes in leased square footage by region using Savills data.",
      "Built for the American Statistical Association’s Five College DataFest — and awarded Best Visualization.",
    ],
    problem: [
      "Real estate advisors needed a clear picture of which markets were growing, which were negotiable, and how the recovery differed by region — not another raw spreadsheet dump.",
    ],
    solution: [
      "Designed visualizations that surface growth hubs (Philadelphia, Boston, Salt Lake City) and negotiation-friendly markets (D.C., Manhattan), delivered through Streamlit and Tableau so advisors could explore the story themselves.",
    ],
    lessons: [
      "The winning move wasn’t more charts — it was framing the rebound in language advisors already use: growth vs. leverage.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/suegrg/royal-chicken" },
    ],
  },
  {
    slug: "cafe-providence",
    name: "Cafe Providence",
    tagline:
      "Discover Providence cafes with personalized recommendations — built in a weekend for Hack@Brown.",
    groups: ["web"],
    year: "2025",
    status: "Live",
    tech: ["Next.js", "React", "Tailwind CSS", "Google Places API", "Vercel"],
    cover: { from: "#2a4268", to: "#111b2e" },
    overview: [
      "A web app for finding the best local cafes in Providence, RI, with personalized recommendations tuned to what you want that day.",
      "Shipped at Hack@Brown 2025 — a weekend in a new city, turned into a product.",
    ],
    problem: [
      "Coming to Providence only for the hackathon weekend, the team wanted to explore as many cafes as possible — and existing tools weren’t tuned to “what fits our mood today.”",
    ],
    solution: [
      "Inspired by Beli and Yelp, build a preference-aware discovery experience on Next.js with Google Places data, deployed on Vercel so it was live before the demo.",
    ],
    lessons: [
      "Constraint breeds clarity: a single city and a single weekend forced a sharp scope and a product people could use immediately.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/suegrg/cafe-providence" },
    ],
  },
  {
    slug: "crisis360",
    name: "Crisis360",
    tagline:
      "A real-time situational-awareness platform that turns scattered crisis signals into one clear operating picture.",
    groups: ["ai-ml", "web"],
    year: "2024",
    status: "Live",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
    cover: { from: "#1d3050", to: "#0b1220" },
    featured: true,
    drop: true,
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
    groups: ["ai-ml"],
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
    groups: ["web"],
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
  {
    slug: "uno-reimagined",
    name: "UNO Reimagined",
    tagline:
      "Multiplayer UNO with custom Swap and Trash cards — classic rules, extra strategic depth.",
    groups: ["games"],
    year: "2024",
    status: "Live",
    tech: ["Python", "tkinter", "OOP"],
    cover: { from: "#1f3558", to: "#0c1420" },
    overview: [
      "A multiplayer UNO built in Python with custom “Swap” and “Trash” cards that add new decision points to the classic game.",
      "A first-semester CS project designed around OOP principles — and graded on a live demo.",
    ],
    problem: [
      "The course asked for a project that showed solid object-oriented design. The team wanted something everyone already knew how to play, so the demo could focus on the code, not the rules.",
    ],
    solution: [
      "Recreate UNO with clear class boundaries for cards, players, and game state, then extend it with Swap and Trash cards that change how turns and hands evolve mid-match.",
    ],
    lessons: [
      "Familiar games make great teaching vehicles: reviewers immediately understood the rules and could judge the design on its own terms.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/jensome6065/uno" }],
  },
  {
    slug: "nutrigang",
    name: "Nutrigang",
    tagline:
      "AI nutrition companion — chatbot, meal scanner, and intake tracker for clearer daily macros.",
    groups: ["ai-ml", "web"],
    year: "2024",
    status: "Prototype",
    tech: ["TypeScript", "Figma", "Xcode", "Wit.ai", "Clarifai", "Edamam"],
    cover: { from: "#274268", to: "#101a2c" },
    overview: [
      "A nutrition app with an AI chatbot, an AI meal scanner for macro tracking, and an intake tracker that turns daily eating into personalized insights.",
      "Built at HackUMass XII after a dining-hall brainstorm about how hard balanced meals still feel in college.",
    ],
    problem: [
      "College brings more freedom over food — and somehow still less consistency. Tracking macros and knowing what to eat next shouldn’t require a spreadsheet habit.",
    ],
    solution: [
      "Combine conversational guidance (Wit.ai), visual meal recognition (Clarifai), and nutrition data (Edamam) into one flow: scan, log, ask, and get recommendations that fit the day you actually had.",
    ],
    lessons: [
      "The best hackathon ideas often start as personal friction — breakfast talk became a product brief before the first commit.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065/hackumassxii" },
    ],
  },
  {
    slug: "music-library",
    name: "Music Library",
    tagline:
      "A multiclient terminal music player — sockets, playlists, and playback over a client-server model.",
    groups: ["systems"],
    year: "2024",
    status: "Live",
    tech: ["C", "Make", "mpg123", "Sockets"],
    cover: { from: "#2f4a72", to: "#121c30" },
    overview: [
      "A multiclient music player that uses socket programming and linked lists to manage playlists, queues, and songs over a client-server model with audio playback.",
      "Final systems project for the last CS class in high school — streaming vibes, terminal-native.",
    ],
    problem: [
      "The brief was to combine low-level systems programming with something that still felt like a real product: multiple users, shared library concepts, and actual sound.",
    ],
    solution: [
      "A client-server architecture in C with linked-list playlist and queue management, file handling, audio control via mpg123, and signal-aware process behavior.",
    ],
    architecture: [
      "Clients talk to a central server over sockets; the server owns song metadata and queue state while clients request playback and playlist operations.",
    ],
    lessons: [
      "Systems projects get more interesting when the “hello world” of sockets becomes something you can actually listen to.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Stuycs-K/project03-final-9-yej-yue",
      },
    ],
  },
  {
    slug: "linux-shell",
    name: "Linux Shell",
    tagline:
      "A Unix shell with redirection, piping, process management, and job control — core bash, rebuilt.",
    groups: ["systems"],
    year: "2023",
    status: "Live",
    tech: ["C", "Make", "Unix"],
    cover: { from: "#1a2c48", to: "#0a1018" },
    overview: [
      "A shell that supports command execution, I/O redirection, piping, process management, and job control — replicating core bash behavior from scratch.",
      "Built to learn how Unix-based systems actually interpret and execute what you type.",
    ],
    problem: [
      "Using a shell every day doesn’t explain how parsing, processes, and pipes fit together. Building one does.",
    ],
    solution: [
      "Implement command parsing, redirection, piping, and job control in C, engaging directly with process management and the system calls behind everyday terminal workflows.",
    ],
    lessons: [
      "Recreating bash features is the fastest way to demystify them — piping stops feeling like magic once you’ve wired stdout to stdin yourself.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jensome6065/shellSystemsProj",
      },
    ],
  },
  {
    slug: "finso",
    name: "FinSo",
    tagline:
      "Social meets financial literacy — real-time markets, built by high schoolers for high schoolers.",
    groups: ["web"],
    year: "2023",
    status: "Live",
    tech: ["JavaScript", "Pug", "Java", "MongoDB", "FinnHub API"],
    cover: { from: "#345583", to: "#16233b" },
    overview: [
      "A social media app meets financial literacy platform, designed by high schoolers for high schoolers, with real-time stock market data.",
      "Built with a Google mentor and presented to 200 students and 30 Googlers.",
    ],
    problem: [
      "Growing up in New York City and going to school in the Financial District made financial literacy feel urgent — and the curriculum for students felt thin.",
    ],
    solution: [
      "Ship a platform that mixes social mechanics with market literacy: live data via FinnHub, a stack students could own end-to-end, and a presentation audience large enough to stress-test the story.",
    ],
    lessons: [
      "Building for peers changes the product bar — if classmates won’t use it, the pitch doesn’t matter.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/jensome6065/google23" },
    ],
  },
  {
    slug: "fireboy-watergirl",
    name: "Fireboy and Watergirl Reimagined",
    tagline:
      "A two-player platformer with gems, puddles, scoring, and game-over logic — childhood nostalgia in Processing.",
    groups: ["games"],
    year: "2023",
    status: "Live",
    tech: ["Processing", "UML", "Game Design"],
    cover: { from: "#2c4466", to: "#101828" },
    overview: [
      "A two-player platformer with interactive gems, puddle obstacles, score tracking, and game-over logic, modeled after the classic Fireboy and Watergirl.",
      "Final project after finishing APCS early — Processing as a visual playground with its own IDE.",
    ],
    problem: [
      "The class needed a project that showed design (including UML) and playable interaction. The team wanted something tied to shared childhood memories of playing during substitute periods.",
    ],
    solution: [
      "Rebuild the co-op fantasy in Processing: two characters, elemental hazards, collectibles, and clear win/lose states modeled before implementation.",
    ],
    lessons: [
      "Nostalgia is a design brief — players already know what “good” feels like, so the code has to earn that feeling.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jensome6065/fireboywatergirl",
      },
    ],
  },
  {
    slug: "clover",
    name: "Clover",
    tagline:
      "Multilingual financial literacy for immigrants — quizzes, stock education, and a Best High School Hack win.",
    groups: ["web"],
    year: "2023",
    status: "Live",
    tech: ["HTML", "JavaScript", "Velo"],
    cover: { from: "#1e334f", to: "#0b121c" },
    overview: [
      "A multilingual financial literacy website for immigrants, featuring interactive quizzes and stock education.",
      "HackNYU’s Best High School Hack — and a first-ever hackathon project.",
    ],
    problem: [
      "The team bonded over translating important documents for immigrant parents — and the lack of accessible financial literacy resources that meet people in their language and context.",
    ],
    solution: [
      "Build Clover as a clear, multilingual learning site with quizzes and stock education, scoped tightly enough to ship in a hackathon weekend.",
    ],
    lessons: [
      "Lived experience is product research: the winning idea came from a shared family responsibility, not a trend list.",
    ],
    links: [
      {
        label: "Devpost",
        href: "https://devpost.com/software/clover-5xdz62",
      },
    ],
  },
  {
    slug: "stuylib",
    name: "StuyLib",
    tagline:
      "Award-winning open-source FRC robot code — vision, controls, autonomy, and logging for Team 694.",
    groups: ["systems"],
    year: "2022",
    status: "Live",
    tech: ["Java", "Gradle", "PID", "Autonomous", "Open Source"],
    cover: { from: "#25406a", to: "#0f1828" },
    overview: [
      "StuyPulse’s open-source FIRST Robotics Challenge library and robot code — Java-driven subsystems for vision, controls, and data logging.",
      "Built inside a 150+ person team culture where autonomous code earned awards every competition season.",
    ],
    problem: [
      "Competition robots need reliable, shareable software: vision, PID control, auton routines, and logging that survive match pressure and help the next season start faster.",
    ],
    solution: [
      "Contribute to and ship StuyLib as open-source infrastructure — reusable subsystems and patterns the Software Engineering department could iterate on across seasons.",
    ],
    lessons: [
      "Open source inside a team is a force multiplier: good abstractions turn one season’s wins into the next season’s starting point.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/StuyPulse/StuyLib" },
    ],
  },
  {
    slug: "jetpack-joyride",
    name: "Jetpack Joyride Reimagined",
    tagline:
      "A Stuyvesant-set Jetpack Joyride — skins, levels, upgrades, and obstacles in NetLogo.",
    groups: ["games"],
    year: "2022",
    status: "Live",
    tech: ["NetLogo", "Turtle Shape Editor", "Game Design"],
    cover: { from: "#314e78", to: "#141e32" },
    overview: [
      "A Stuyvesant High School version of Jetpack Joyride with collectible skins, level progression, coin-based upgrades, and rocket and bolt obstacles.",
      "First high school CS project — NetLogo as the shared starting language for the whole class.",
    ],
    problem: [
      "The intro course leveled everyone with NetLogo. The team wanted a final project that felt like a real game, starring the school and teachers students already knew.",
    ],
    solution: [
      "Recreate Jetpack Joyride in NetLogo with a CS teacher as the main character, the high school as the world, and progression systems (skins, coins, upgrades) that reward replay.",
    ],
    lessons: [
      "Even constrained tools can ship personality — Turtle Shape Editor and a familiar campus beat a generic endless runner.",
    ],
    links: [
      {
        label: "Demo",
        href: "https://youtu.be/kEoi6BfuduE?si=5xoH4RcKUXctB9Kx&t=1422",
      },
    ],
  },
];

/** All projects, in display order. */
export const getAllProjects = (): Project[] => projects;

/** Projects flagged for the home "Featured" area, in display order. */
export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.featured);

/**
 * The projects-index "featured drop" hero. Explicit `drop` wins; otherwise
 * falls back to the first featured project so the page never looks empty.
 */
export const getDropProject = (): Project | undefined =>
  projects.find((p) => p.drop) ?? getFeaturedProjects()[0];

/** Look up a single project by slug (used by the dynamic detail route). */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Projects that belong to a given group (supports multi-group / double-dip). */
export const getProjectsByGroup = (group: ProjectGroup): Project[] =>
  projects.filter((p) => p.groups.includes(group));
