import Image from "next/image";
import { ExternalLink, MapPin, UtensilsCrossed } from "lucide-react";
import type { Spot, SpotKind } from "@/content/eats";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** The caption label above the favorite, by kind — order food vs sip a drink. */
const FAVORITE_LABEL: Record<SpotKind, string> = {
  restaurant: "Order this",
  bakery: "Order this",
  cafe: "Sip this",
  dessert: "Order this",
  bar: "Sip this",
};

interface SpotCardProps {
  spot: Spot;
  /** Prioritize the cover image (first row, above the fold). */
  priority?: boolean;
  /** `sizes` hint forwarded to the cover image. */
  sizes?: string;
  className?: string;
}

/**
 * Editorial spot card for the Eats section. Large image (photo or warm
 * generated cover) with name + location, then favorite, review, and optional
 * Menu / Maps links. Spots can be any city — links are per-place, not a single
 * card wrap.
 */
export function SpotCard({
  spot,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: SpotCardProps) {
  const { name, kind, category, location, favorite, review, cover, photo, menuUrl, mapsUrl } =
    spot;

  const hasLinks = Boolean(menuUrl || mapsUrl);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-elevated",
        "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hasLinks && "hover:border-brand/40 hover:shadow-lg",
        className,
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
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
            <span className="absolute -bottom-6 -left-2 select-none font-display text-[8rem] font-semibold leading-none text-white/10 sm:text-[10rem]">
              {name.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Badge className="bg-white/15 text-white ring-white/20 backdrop-blur-sm">
            {category}
          </Badge>
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {name}
          </h3>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {location}
          </p>
        </div>
      </div>

      {/* Caption */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {FAVORITE_LABEL[kind]}
        </p>
        <p className="mt-2 font-medium text-foreground">{favorite}</p>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">{review}</p>

        {hasLinks && (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4">
            {menuUrl && (
              <a
                href={menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand link-underline hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
                Menu
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
              </a>
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand link-underline hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Maps
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
