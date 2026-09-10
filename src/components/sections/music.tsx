import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { RecordShelf } from "@/components/sections/record-shelf";
import { getAlbums } from "@/content/music";

/**
 * Music section of the Lifestyle page. A listening-room composition: turntable
 * stage + record shelf. Wrapped in `.section-music` so the subtle plum
 * identity applies to play/brand accents while navy + gold still lead.
 */
export function Music() {
  const albums = getAlbums();

  return (
    <div className="border-t border-border">
      <Container as="section" id="music" className="section-music py-24 sm:py-32">
        <SectionHeader
          as="h2"
          eyebrow="Music"
          title="On the shelf"
          description="Pull a record onto the platter — the can't-skip track plays right here. One song from each album I keep coming back to."
        />
        <div className="mt-14 sm:mt-16">
          <RecordShelf albums={albums} />
        </div>
      </Container>
    </div>
  );
}
