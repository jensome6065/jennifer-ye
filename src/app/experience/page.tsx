import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PlaceCrumbs } from "@/components/ui/place-crumbs";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceJourney } from "@/components/sections/experience-journey";
import { getExperience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "From the Big Apple to the middle of nowhere Amherst — a scroll through the places I've worked.",
  alternates: { canonical: "/experience" },
};

/**
 * Experience page — editorial hero, then a scroll-driven map journey where a
 * location pin flies between roles. Content stays data-driven from
 * `content/experience.ts`.
 */
export default function ExperiencePage() {
  const items = getExperience();

  return (
    <>
      <Container as="section" className="pb-10 pt-24 sm:pb-14 sm:pt-32">
        <SectionHeader
          as="h1"
          eyebrow="Experience"
          stationKind="line"
          lineKey="experience"
          title="Where I've worked"
          description="From the Big Apple to the middle of nowhere Amherst — here's where I've worked. Scroll to dive into each place."
        />
        <PlaceCrumbs className="mt-6" />
      </Container>
      <ExperienceJourney items={items} />
    </>
  );
}
