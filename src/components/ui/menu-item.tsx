import { ExternalLink, MapPin } from "lucide-react";
import {
  formatBeli,
  type Spot,
  type SpotKind,
} from "@/content/eats";
import { cn } from "@/lib/utils";

/** Caption above the favorite, by kind. */
const FAVORITE_LABEL: Record<SpotKind, string> = {
  restaurant: "Order",
  bakery: "Order",
  cafe: "Sip",
  dessert: "Order",
  bar: "Sip",
};

interface MenuItemProps {
  spot: Spot;
  className?: string;
}

/**
 * One line on the Eats menu: name · leader dots · Beli score (where a price
 * would sit), then location, favorite, and a short review. Links stay quiet
 * so the page still reads like a printed menu.
 */
export function MenuItem({ spot, className }: MenuItemProps) {
  const { name, kind, category, location, favorite, review, beli, menuUrl, mapsUrl } =
    spot;
  const hasLinks = Boolean(menuUrl || mapsUrl);
  const score = formatBeli(beli);

  return (
    <article className={cn("group py-6 sm:py-7", className)}>
      {/* Title row — classic menu: name ..... score */}
      <div className="flex items-baseline gap-3">
        <h3 className="shrink-0 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {name}
        </h3>
        <span
          aria-hidden
          className="mb-1.5 min-w-[1.5rem] flex-1 border-b border-dotted border-border-strong/70"
        />
        <span
          className="shrink-0 font-display text-xl font-semibold tabular-nums tracking-tight text-accent-strong sm:text-2xl"
          aria-label={`Beli ranking ${score} out of 10`}
        >
          {score}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">
        <span className="font-medium text-muted-foreground">{category}</span>
        <span aria-hidden className="mx-2 text-border-strong">
          ·
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {location}
        </span>
      </p>

      <p className="mt-3 text-sm text-foreground">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          {FAVORITE_LABEL[kind]}
        </span>
        <span className="mx-2 text-muted">—</span>
        <span className="font-medium">{favorite}</span>
      </p>

      <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
        {review}
      </p>

      {hasLinks && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
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
          {menuUrl && (
            <a
              href={menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand link-underline hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Full menu
              <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
