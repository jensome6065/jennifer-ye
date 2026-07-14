import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Responsive project grid with a staggered scroll reveal. Two columns on
 * larger screens so covers stay large and editorial (SNKRS-style), single
 * column on mobile. Cards in the first row are prioritized for loading.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <AnimatedSection
      stagger
      as="ul"
      className="grid gap-6 sm:gap-8 lg:grid-cols-2"
    >
      {projects.map((project, i) => (
        <AnimatedItem as="li" key={project.slug} className="h-full">
          <ProjectCard
            project={project}
            priority={i < 2}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </AnimatedItem>
      ))}
    </AnimatedSection>
  );
}
