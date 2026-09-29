import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { EatsFilters } from "@/components/sections/eats-filters";
import { getSpots } from "@/content/eats";

/**
 * Eats section of the Lifestyle page. A menu of spots — restaurants, bakeries,
 * cafes, and desserts — ranked by personal Beli score instead of price.
 * Wrapped in `.section-eats` so gold is allowed to appear a touch more freely
 * per the section identity system. Filtering is client-side so chips stay
 * snappy without a route change.
 */
export function Eats() {
  const spots = getSpots();

  return (
    <Container as="section" id="eats" className="section-eats py-24 sm:py-32">
      <SectionHeader
        as="h2"
        eyebrow="Eats"
        lineKey="eats"
        title="The menu"
        description="Places worth returning to — read it like a restaurant menu. Scores are my Beli rankings (out of 10), not prices. Filter by restaurants, cafes, or sweet treats."
      />
      <div className="mt-14 sm:mt-16">
        <EatsFilters spots={spots} />
      </div>
    </Container>
  );
}
