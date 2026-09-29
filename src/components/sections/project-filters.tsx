"use client";

import { useMemo, useState } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectClaw } from "@/components/sections/project-claw";
import { ProjectBillboard } from "@/components/sections/project-billboard";
import {
  PROJECT_GROUP_ORDER,
  PROJECT_GROUPS,
  type Project,
  type ProjectGroup,
} from "@/content/projects";
import { cn } from "@/lib/utils";

type FilterValue = "all" | ProjectGroup;

interface ProjectFiltersProps {
  projects: Project[];
}

/**
 * Projects index — Times Square billboard wall → claw → filterable list.
 * The archive stays a scannable row list; the collage is featured-only.
 */
export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const wall = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    if (featured.length >= 6) return featured.slice(0, 6);
    const rest = projects.filter((p) => !p.featured);
    return [...featured, ...rest].slice(0, Math.min(6, projects.length));
  }, [projects]);
  const wallSlugs = useMemo(
    () => new Set(wall.map((p) => p.slug)),
    [wall],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.groups.includes(filter));
  }, [filter, projects]);

  /**
   * When browsing "All", projects already on the billboard are omitted from
   * the list so nothing appears twice. Filtered views keep every match.
   */
  const archive = useMemo(() => {
    if (filter === "all" && wallSlugs.size > 0) {
      return filtered.filter((p) => !wallSlugs.has(p.slug));
    }
    return filtered;
  }, [filtered, filter, wallSlugs]);

  const showWall = filter === "all" && wall.length > 0;

  const counts = useMemo(() => {
    const next: Record<FilterValue, number> = {
      all: projects.length,
      "ai-ml": 0,
      web: 0,
      research: 0,
      games: 0,
      systems: 0,
    };
    for (const project of projects) {
      for (const group of project.groups) {
        next[group] += 1;
      }
    }
    return next;
  }, [projects]);

  return (
    <div>
      {showWall ? (
        <ProjectBillboard projects={wall} className="mb-14 sm:mb-16" />
      ) : null}

      <div className="mb-14 sm:mb-16">
        <ProjectClaw projects={projects} filter="all" />
      </div>

      <div
        role="tablist"
        aria-label="Filter projects by group"
        className="flex flex-wrap gap-2"
      >
        <FilterChip
          label="All"
          count={counts.all}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {PROJECT_GROUP_ORDER.map((group) => (
          <FilterChip
            key={group}
            label={PROJECT_GROUPS[group]}
            count={counts[group]}
            active={filter === group}
            onClick={() => setFilter(group)}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {archive.length} {archive.length === 1 ? "project" : "projects"}
        {filter !== "all" ? ` in ${PROJECT_GROUPS[filter]}` : ""}
      </p>

      {archive.length === 0 ? (
        <p className="mt-14 text-muted-foreground">
          No projects in this group yet.
        </p>
      ) : (
        <AnimatedSection
          key={filter}
          stagger
          as="ul"
          className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5"
        >
          {archive.map((project, i) => (
            <AnimatedItem as="li" key={project.slug}>
              <ProjectCard project={project} priority={i < 3} />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      )}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-brand text-brand-foreground"
          : "bg-background-elevated text-muted-foreground ring-1 ring-border hover:text-foreground hover:ring-brand/30",
      )}
    >
      {label}
      <span
        className={cn(
          "tabular-nums text-xs",
          active ? "text-brand-foreground/70" : "text-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}
