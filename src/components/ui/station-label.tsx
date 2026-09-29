import { cn } from "@/lib/utils";

interface StationLabelProps {
  /** Short place name, e.g. "About". */
  name: string;
  /** Kept for call-site compat; no longer renders subway chrome. */
  kind?: "stop" | "line";
  lineKey?: string;
  className?: string;
}

/**
 * Editorial eyebrow — uppercase tracking, taxi-yellow rule tick.
 * Subway bullets retired; street energy lives in stickers / pigeon / bridges.
 */
export function StationLabel({ name, className }: StationLabelProps) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.26em] text-brand",
        className,
      )}
    >
      <span aria-hidden className="h-px w-5 bg-accent" />
      <span>{name.trim().toUpperCase()}</span>
    </p>
  );
}
