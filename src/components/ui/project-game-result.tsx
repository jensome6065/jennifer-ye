import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/ui/project-cover";
import { cn } from "@/lib/utils";

interface ProjectGameResultProps {
  project: Project;
  ctaLabel: string;
  className?: string;
}

/**
 * Compact result card shared by the slot strip and claw machine — cover,
 * name, tagline, a few tech badges, and a link to the case study.
 */
export function ProjectGameResult({
  project,
  ctaLabel,
  className,
}: ProjectGameResultProps) {
  const tech = project.tech.slice(0, 3);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated",
        "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:border-brand/40 hover:shadow-lg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      aria-label={`${project.name} — ${ctaLabel}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ProjectCover
          project={project}
          sizes="(min-width: 1024px) 28vw, 100vw"
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {project.year} · {project.status}
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-pretty text-sm text-muted-foreground">
          {project.tagline}
        </p>
        {tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <li key={t}>
                <Badge variant="outline" size="sm">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
