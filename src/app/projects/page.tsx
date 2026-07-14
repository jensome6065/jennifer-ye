import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectGrid } from "@/components/sections/project-grid";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — AI products, developer tools, and community platforms, presented as case studies.",
  alternates: { canonical: "/projects" },
};

/**
 * Projects index (Milestone 4) — the portfolio's most important page.
 * A Server Component that renders large, SNKRS-style cards from typed content;
 * each links to its own `/projects/[slug]` case study.
 */
export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container as="section" className="py-24 sm:py-32">
      <SectionHeader
        as="h1"
        eyebrow="Selected work"
        title="Projects"
        description="A curated set of things I've designed and built — AI products, developer tools, and community platforms. Each opens into a full case study."
      />
      <div className="mt-14 sm:mt-16">
        <ProjectGrid projects={projects} />
      </div>
    </Container>
  );
}
