import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectDeck } from "@/components/sections/project-deck";
import { getFeaturedProjects } from "@/content/projects";
import { homeContent } from "@/content/home";

const { featuredSlot } = homeContent;

/**
 * Home Featured section — card-deck shuffle over the curated featured pool.
 */
export function FeaturedSlot() {
  const projects = getFeaturedProjects();

  return (
    <Container as="section" className="py-24 sm:py-32" id="featured">
      <SectionHeader
        as="h2"
        eyebrow={featuredSlot.eyebrow}
        lineKey="featured"
        title={featuredSlot.heading}
        description={featuredSlot.description}
      />
      <div className="mt-14 sm:mt-16">
        <ProjectDeck projects={projects} copy={featuredSlot} />
      </div>
    </Container>
  );
}
