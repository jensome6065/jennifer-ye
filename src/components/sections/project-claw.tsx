import { SectionHeader } from "@/components/ui/section-header";
import { ClawMachine } from "@/components/sections/claw-machine";
import { type Project, type ProjectGroup } from "@/content/projects";
import { projectClawContent } from "@/content/project-claw";

interface ProjectClawProps {
  projects: Project[];
  /** Page-level filter — seeds the claw's ball filter. */
  filter: "all" | ProjectGroup;
}

/**
 * Projects-page classic claw machine with group-filtered prize balls.
 */
export function ProjectClaw({ projects, filter }: ProjectClawProps) {
  const copy = projectClawContent;

  return (
    <div className="mb-10 sm:mb-12" id="grab">
      <SectionHeader
        as="h2"
        eyebrow={copy.eyebrow}
        title={copy.heading}
        description={copy.description}
      />
      <div className="mt-10 sm:mt-12">
        <ClawMachine projects={projects} filter={filter} copy={copy} />
      </div>
    </div>
  );
}
