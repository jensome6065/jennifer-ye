"use client";

import { useMemo, useState } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectClaw } from "@/components/sections/project-claw";
import { ProjectDrop } from "@/components/sections/project-drop";
import {
  PROJECT_GROUP_ORDER,
  PROJECT_GROUPS,
  getDropProject,
  type Project,
  type ProjectGroup,
} from "@/content/projects";
import { cn } from "@/lib/utils";

type FilterValue = "all" | ProjectGroup;

interface ProjectFiltersProps {
  projects: Project[];
}

/**
 * Projects index — featured drop → claw → filterable list.
 * The archive is a scannable row list (not a collage): practical to browse
 * and easy to extend as content grows.
 */
export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const drop = useMemo(() => getDropProject(), []);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.groups.includes(filter));
  }, [filter, projects]);

  /**
   * When browsing "All", the drop already owns the hero slot — omit it from
   * the list so the same project doesn't appear twice. Filtered views keep
   * every match, including the drop project.
   */
  const archive = useMemo(() => {
    if (filter === "all" && drop) {
      return filtered.filter((p) => p.slug !== drop.slug);
    }
    return filtered;
  }, [filtered, filter, drop]);

  const showDrop =
    Boolean(drop) &&
    (filter === "all" || (drop ? drop.groups.includes(filter) : false));

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
      {showDrop && drop ? (
        <ProjectDrop project={drop} className="mb-14 sm:mb-16" />
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
