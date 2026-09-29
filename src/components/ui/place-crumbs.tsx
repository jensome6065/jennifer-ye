import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface PlaceCrumbsProps {
  className?: string;
}

/**
 * Neighborhood / city trail — proves the journey without a skyline graphic.
 * Reads like a transfer strip: Flushing · Amherst · San Francisco.
 */
export function PlaceCrumbs({ className }: PlaceCrumbsProps) {
  const places = siteConfig.places;
  if (places.length === 0) return null;

  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted",
        className,
      )}
      aria-label={`Places: ${places.join(", ")}`}
    >
      {places.map((place, i) => (
        <span key={place} className="inline-flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-border-strong">
              ·
            </span>
          )}
          <span>{place}</span>
        </span>
      ))}
    </p>
  );
}
