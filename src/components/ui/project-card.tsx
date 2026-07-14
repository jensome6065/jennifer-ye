import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
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
 * SNKRS-inspired project card: a large cover with a status badge, then an
 * editorial caption block (category · year, name, tagline, tech). The whole
 * card is one link to the case study, sharing the site's restrained hover
 * language (cover scales gently, border warms to navy, subtle shadow lift).
 */
export function ProjectCard({
  project,
  priority = false,
  sizes,
  className,
}: ProjectCardProps) {
  const shownTech = project.tech.slice(0, 4);
  const remaining = project.tech.length - shownTech.length;

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
          "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated",
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:border-brand/40 group-hover:shadow-lg",
        )}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ProjectCover project={project} priority={priority} sizes={sizes} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <Badge variant={STATUS_VARIANT[project.status]}>
              {project.status}
            </Badge>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <p className="mt-2 text-pretty text-muted-foreground">
            {project.tagline}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
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
