import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

interface NycStampProps {
  className?: string;
  /** Quieter treatment for fixed corner / chrome. */
  quiet?: boolean;
}

/**
 * Brand tag stamp — `J·Y` + `EST. NYC`. Meant to be noticed second, not first.
 */
export function NycStamp({ className, quiet = false }: NycStampProps) {
  const { mark, caption } = siteConfig.stamp;

  return (
    <div
      className={cn(
        "inline-flex flex-col items-start leading-none",
        quiet && "opacity-50 transition-opacity duration-300 hover:opacity-100",
        className,
      )}
      aria-label={`${mark}, ${caption}`}
    >
      <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-foreground">
        {mark}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
        {caption}
      </span>
    </div>
  );
}
