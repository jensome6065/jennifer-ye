import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AlbumCard } from "@/components/ui/album-card";
import { getAlbums } from "@/content/music";

/**
 * Music section of the Lifestyle page. An Apple Music-inspired grid of album
 * cards rendered from typed content. Wrapped in `.section-music` so the very
 * subtle plum identity applies (the play affordance reads plum here) while
 * navy + gold still lead everywhere else.
 *
 * A subtle top border separates it from Eats above, keeping the two sections
 * distinct within one scroll.
 */
export function Music() {
  const albums = getAlbums();

  return (
    <div className="border-t border-border">
      <Container as="section" id="music" className="section-music py-24 sm:py-32">
        <SectionHeader
          as="h2"
          eyebrow="Music"
          title="On repeat"
          description="The records I keep coming back to while building — and the one track from each I can't skip."
        />
        <AnimatedSection
          stagger
          as="ul"
          className="mt-14 grid grid-cols-2 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4"
        >
          {albums.map((album, i) => (
            <AnimatedItem as="li" key={album.id} className="h-full">
              <AlbumCard
                album={album}
                priority={i < 4}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </div>
  );
}
