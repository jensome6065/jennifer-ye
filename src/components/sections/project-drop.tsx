import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  formatProjectGroups,
  type Project,
} from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/ui/project-cover";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

/** Status → badge variant. Live earns the gold accent; others stay quiet. */
const STATUS_VARIANT: Record<Project["status"], "accent" | "brand" | "neutral"> =
  {
    Live: "accent",
    "In progress": "brand",
    Prototype: "neutral",
    Archived: "neutral",
  };

interface ProjectDropProps {
  project: Project;
  className?: string;
}

/**
 * SNKRS-inspired featured drop for the projects index. One large launch
 * surface: product-forward cover, editorial caption, single CTA into the
 * case study. Sits above the archive so the page opens as a composition,
 * not a card dump.
 */
export function ProjectDrop({ project, className }: ProjectDropProps) {
  const groupsLabel = formatProjectGroups(project);
  const shownTech = project.tech.slice(0, 5);

  return (
    <AnimatedSection
      as="article"
      className={cn("relative", className)}
      aria-labelledby={`drop-${project.slug}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative block overflow-hidden rounded-3xl",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
        aria-label={`${project.name} — featured drop. ${project.tagline}`}
      >
        {/* Full-bleed cover plane */}
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9] lg:min-h-[28rem]">
          <ProjectCover
            project={project}
            priority
            sizes="100vw"
            className="scale-[1.01]"
          />
          {/* Readability scrim — stronger toward the caption */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-brand-strong/95 via-brand-strong/50 to-brand-strong/20 sm:bg-gradient-to-r sm:from-brand-strong/90 sm:via-brand-strong/40 sm:to-transparent"
          />
        </div>

        {/* Caption — overlaid like a SNKRS launch panel */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:max-w-xl sm:justify-center sm:p-10 lg:max-w-2xl lg:p-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-brand-foreground/70">
              Featured drop
            </span>
            <span aria-hidden className="text-brand-foreground/30">
              ·
            </span>
            <Badge variant={STATUS_VARIANT[project.status]}>{project.status}</Badge>
          </div>

          <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-brand-foreground/55">
            {groupsLabel} · {project.year}
          </p>

          <h2
            id={`drop-${project.slug}`}
            className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand-foreground sm:text-5xl lg:text-6xl"
          >
            {project.name}
          </h2>

          <p className="mt-4 max-w-md text-pretty text-base text-brand-foreground/75 sm:text-lg">
            {project.tagline}
          </p>

          <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
            {shownTech.map((tech) => (
              <li key={tech}>
                <Badge className="bg-brand-foreground/10 text-brand-foreground ring-brand-foreground/15 backdrop-blur-sm">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-foreground px-6 text-sm font-medium text-brand-strong transition-transform duration-200 group-hover:scale-[1.02]">
              View case study
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-foreground/12 text-brand-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}
