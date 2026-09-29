import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectFilters } from "@/components/sections/project-filters";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work from someone who can't sit still — AI/ML, web apps, research, games, and systems.",
  alternates: { canonical: "/projects" },
};

/**
 * Projects index — featured drop → claw → scannable list. Server Component
 * loads typed content; each row links to its case study.
 */
export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container as="section" className="py-24 sm:py-32">
        <SectionHeader
          as="h1"
          eyebrow="Projects"
          stationKind="line"
          lineKey="projects"
          title="Selected work"
          description="Featured work on the board, a quick grab if you're feeling lucky, then the full list — filter by AI/ML, web apps, research, games, or systems."
        />
      <div className="mt-14 sm:mt-16">
        <ProjectFilters projects={projects} />
      </div>
    </Container>
  );
}
