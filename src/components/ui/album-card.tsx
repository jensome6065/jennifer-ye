import Image from "next/image";
import { Play } from "lucide-react";
import type { Album } from "@/content/music";
import { cn } from "@/lib/utils";

interface AlbumCardProps {
  album: Album;
  /** Prioritize the artwork image (first row, above the fold). */
  priority?: boolean;
  /** `sizes` hint forwarded to the artwork image. */
  sizes?: string;
  className?: string;
}

/**
 * Apple Music-inspired album card for the Music section: square artwork (real
 * or a muted generated cover) with a play affordance on hover, then title,
 * artist, and the favorite track below. When a `spotifyUrl` is present the
 * card is one external link; otherwise it's a static tile.
 *
 * Section identity: within `.section-music` the `brand` token shifts to a
 * subtle plum, so the play button reads plum here without changing globally.
 */
export function AlbumCard({
  album,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  className,
}: AlbumCardProps) {
  const { title, artist, year, favoriteSong, cover, artwork, spotifyUrl } = album;

  const card = (
    <article className={cn("group flex h-full flex-col", className)}>
      {/* Artwork */}
      <div
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-sm",
          "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          spotifyUrl && "group-hover:border-brand/40 group-hover:shadow-lg",
        )}
      >
        {artwork ? (
          <Image
            src={artwork.src}
            alt={artwork.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{
              backgroundImage: `linear-gradient(140deg, ${cover.from}, ${cover.to})`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent)]" />
            <span className="absolute -bottom-5 -left-1 select-none font-display text-[7rem] font-semibold leading-none text-white/10 sm:text-[8rem]">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Play affordance — appears on hover/focus, echoing Spotify/Apple UI. */}
        {spotifyUrl && (
          <span className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-brand text-brand-foreground opacity-0 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <Play className="h-4 w-4 translate-x-px fill-current" aria-hidden />
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="mt-4">
        <h3 className="truncate font-display text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {artist} · {year}
        </p>
        <p className="mt-2 truncate text-xs text-muted">
          <span className="text-muted-foreground">On repeat:</span> {favoriteSong}
        </p>
      </div>
    </article>
  );

  if (!spotifyUrl) return card;

  return (
    <a
      href={spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      aria-label={`${title} by ${artist} — open in Spotify`}
    >
      {card}
    </a>
  );
}
