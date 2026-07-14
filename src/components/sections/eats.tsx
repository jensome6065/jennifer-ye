import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotCard } from "@/components/ui/spot-card";
import { getSpots } from "@/content/eats";

/**
 * Eats section of the Lifestyle page. A warm, editorial board of spots —
 * restaurants, cafes, and bars — rendered from typed content. Wrapped in
 * `.section-eats` so gold is allowed to appear a touch more freely (ratings,
 * accents) per the section identity system — without changing the palette
 * elsewhere.
 */
export function Eats() {
  const spots = getSpots();

  return (
    <Container as="section" id="eats" className="section-eats py-24 sm:py-32">
      <SectionHeader
        as="h2"
        eyebrow="Eats & drinks"
        title="Places worth returning to"
        description="A running list of the spots I send friends to — restaurants, cafes, and bars — and what to get when they go."
      />
      <AnimatedSection
        stagger
        as="ul"
        className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
      >
        {spots.map((spot, i) => (
          <AnimatedItem as="li" key={spot.id} className="h-full">
            <SpotCard
              spot={spot}
              priority={i < 3}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </AnimatedItem>
        ))}
      </AnimatedSection>
    </Container>
  );
}
