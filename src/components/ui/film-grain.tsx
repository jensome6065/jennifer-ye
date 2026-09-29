import { cn } from "@/lib/utils";

interface FilmGrainProps {
  className?: string;
  /** Stronger for photography / covers; softer for UI panels. */
  strength?: "soft" | "street";
}

const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Scanned-print / street-photo grain overlay. Parent must be `relative`.
 */
export function FilmGrain({
  className,
  strength = "street",
}: FilmGrainProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-10 mix-blend-multiply dark:mix-blend-soft-light",
        strength === "street"
          ? "opacity-[0.16] dark:opacity-[0.22]"
          : "opacity-[0.08] dark:opacity-[0.12]",
        className,
      )}
      style={{
        backgroundImage: GRAIN_SVG,
        backgroundSize: "140px 140px",
      }}
    />
  );
}
