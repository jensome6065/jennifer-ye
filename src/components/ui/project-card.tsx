import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  formatProjectGroups,
  type Project,
} from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/ui/project-cover";
import { cn } from "@/lib/utils";

/** Status → badge variant. Live earns the gold accent; others stay quiet. */
const STATUS_VARIANT: Record<Project["status"], "accent" | "brand" | "neutral"> =
  {
    Live: "accent",
    "In progress": "brand",
    Prototype: "neutral",
    Archived: "neutral",
  };

interface ProjectCardProps {
  project: Project;
  /** Prioritize the cover image (first row, above the fold). */
  priority?: boolean;
  /** `sizes` hint forwarded to the cover image. */
  sizes?: string;
  className?: string;
}

/**
 * Compact project row for the index archive — scannable, equal rhythm, no
 * collage. Thumb + meta on one line of attention; whole row links to the
 * case study.
 */
export function ProjectCard({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 280px, 40vw",
  className,
}: ProjectCardProps) {
  const shownTech = project.tech.slice(0, 4);
  const remaining = project.tech.length - shownTech.length;
  const groupsLabel = formatProjectGroups(project);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      aria-label={`${project.name} — ${project.tagline}`}
    >
      <article
        className={cn(
          "flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-background-elevated p-3 sm:flex-row sm:items-stretch sm:gap-6 sm:p-4",
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:border-brand/40 group-hover:shadow-md",
        )}
      >
        {/* Cover thumb */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-[5/4] sm:w-52 md:w-64 lg:w-72">
          <ProjectCover project={project} priority={priority} sizes={sizes} />
          <div className="absolute left-3 top-3">
            <Badge variant={STATUS_VARIANT[project.status]}>
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Caption */}
        <div className="flex min-w-0 flex-1 flex-col justify-center px-1 pb-2 sm:px-0 sm:py-1 sm:pr-2">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {groupsLabel} · {project.year}
            </p>
            <span
              aria-hidden
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted opacity-0 transition-all duration-300 group-hover:bg-brand/10 group-hover:text-brand group-hover:opacity-100"
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-pretty text-muted-foreground">
            {project.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {shownTech.map((tech) => (
              <li key={tech}>
                <Badge variant="outline">{tech}</Badge>
              </li>
            ))}
            {remaining > 0 && (
              <li>
                <Badge variant="outline">+{remaining}</Badge>
              </li>
            )}
          </ul>
        </div>
      </article>
    </Link>
  );
}
