import type { ReactNode } from "react";
import { StationLabel } from "@/components/ui/station-label";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Uppercase eyebrow label (e.g. "About"). */
  eyebrow?: string;
  /** @deprecated Unused — kept so existing call sites typecheck. */
  stationKind?: "stop" | "line";
  /** @deprecated Unused — kept so existing call sites typecheck. */
  lineKey?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

const HEADING_SIZES: Record<NonNullable<SectionHeaderProps["as"]>, string> = {
  h1: "text-5xl sm:text-6xl lg:text-7xl",
  h2: "text-4xl sm:text-5xl",
  h3: "text-3xl sm:text-4xl",
};

/**
 * Editorial section heading: quiet eyebrow + condensed display title.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  const heading = (
    <div className={cn("max-w-2xl", centered && "mx-auto")}>
      {eyebrow && (
        <StationLabel
          name={eyebrow}
          className={cn(centered && "mb-3 flex w-full justify-center")}
        />
      )}
      <Heading
        className={cn(
          "text-balance font-display font-bold uppercase tracking-[-0.01em] text-foreground",
          HEADING_SIZES[Heading],
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        centered
          ? "text-center"
          : action
            ? "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            : "",
        className,
      )}
    >
      {heading}
      {!centered && action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
