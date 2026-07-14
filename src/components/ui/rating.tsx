import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  /** Score out of `max`, in half-step increments (e.g. 4.5). */
  value: number;
  /** Maximum number of stars. Defaults to 5. */
  max?: number;
  /** Star tint. "accent" (gold) by default; "current" inherits text color. */
  tone?: "accent" | "current";
  className?: string;
}

/**
 * Compact star rating. Renders full / half / empty stars from a numeric score
 * and exposes the value to assistive tech via an accessible label, so the
 * visual stars can stay `aria-hidden`. Gold by default — a sanctioned small
 * highlight in the warmer Eats section.
 */
export function Rating({
  value,
  max = 5,
  tone = "accent",
  className,
}: RatingProps) {
  const rounded = Math.round(value * 2) / 2;
  const color = tone === "accent" ? "text-accent" : "text-current";

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", color, className)}
      role="img"
      aria-label={`Rated ${rounded} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const position = i + 1;
        const filled = rounded >= position;
        const half = !filled && rounded >= position - 0.5;

        if (half) {
          return (
            <span key={i} className="relative inline-flex" aria-hidden>
              {/* Empty base outline behind the half fill. */}
              <Star className="h-3.5 w-3.5 opacity-30" />
              <StarHalf className="absolute inset-0 h-3.5 w-3.5 fill-current" />
            </span>
          );
        }

        return (
          <Star
            key={i}
            aria-hidden
            className={cn(
              "h-3.5 w-3.5",
              filled ? "fill-current" : "opacity-30",
            )}
          />
        );
      })}
    </span>
  );
}
