import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Scannable project list with staggered scroll reveal. Equal row rhythm —
 * practical to browse as the catalog grows.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <AnimatedSection
      stagger
      as="ul"
      className="flex flex-col gap-4 sm:gap-5"
    >
      {projects.map((project, i) => (
        <AnimatedItem as="li" key={project.slug}>
          <ProjectCard project={project} priority={i < 3} />
        </AnimatedItem>
      ))}
    </AnimatedSection>
  );
}
