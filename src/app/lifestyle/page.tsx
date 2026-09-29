import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Eats } from "@/components/sections/eats";
import { Music } from "@/components/sections/music";

export const metadata: Metadata = {
  title: "Lifestyle",
  description:
    "Exploring — tables worth the trip and the records on repeat while I build.",
  alternates: { canonical: "/lifestyle" },
};

/**
 * Lifestyle page (Milestone 6). A Server Component composing two editorial
 * sections from typed content: Eats (warm restaurant board) and Music
 * (Apple Music-inspired album grid). A short page hero sets the tone, then a
 * pair of in-page anchors let visitors jump between the two.
 */
export default function LifestylePage() {
  return (
    <>
      <Container as="section" className="pt-24 sm:pt-32">
        <SectionHeader
          as="h1"
          eyebrow="Lifestyle"
          stationKind="line"
          lineKey="lifestyle"
          title="Still exploring"
          description="When I'm not building, I'm out in the world — the tables worth the trip and the records that score the work."
        />
        <nav aria-label="Lifestyle sections" className="mt-8 flex gap-3">
          <a
            href="#eats"
            className="text-sm font-medium text-muted-foreground link-underline hover:text-foreground"
          >
            Eats
          </a>
          <span aria-hidden className="text-muted">
            /
          </span>
          <a
            href="#music"
            className="text-sm font-medium text-muted-foreground link-underline hover:text-foreground"
          >
            Music
          </a>
        </nav>
      </Container>

      <Eats />
      <Music />
    </>
  );
}
