import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { getExperience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of the roles, teams, and work along the way — engineering, research, and community.",
  alternates: { canonical: "/experience" },
};

/**
 * Experience page (Milestone 5). A Server Component that renders a vertical
 * timeline from typed content: alternating cards on desktop, single-column on
 * mobile, with smooth reveal animations.
 */
export default function ExperiencePage() {
  const items = getExperience();

  return (
    <Container as="section" className="py-24 sm:py-32">
      <SectionHeader
        as="h1"
        eyebrow="Experience"
        title="Where I've worked"
        description="Roles across engineering, research, and community — most recent first. Each shaped how I build."
      />
      <div className="mt-14 sm:mt-16">
        <ExperienceTimeline items={items} />
      </div>
    </Container>
  );
}
