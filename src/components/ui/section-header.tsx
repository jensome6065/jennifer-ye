import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small uppercase label above the title (e.g. "Selected work"). */
  eyebrow?: string;
  /** The section heading. */
  title: ReactNode;
  /** Optional supporting copy below the title. */
  description?: ReactNode;
  /** Heading level for correct document outline. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Optional trailing content (e.g. a "View all" link) shown on the right. */
  action?: ReactNode;
  className?: string;
}

const HEADING_SIZES: Record<NonNullable<SectionHeaderProps["as"]>, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl",
  h2: "text-3xl sm:text-4xl",
  h3: "text-2xl sm:text-3xl",
};

/**
 * Editorial section heading: an uppercase eyebrow, a display-font title, and
 * optional description. Encapsulates the type hierarchy used across pages so
 * headings stay consistent. Set `action` for a right-aligned link/button
 * (only respected with left alignment).
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
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-balance font-display font-semibold tracking-tight text-foreground",
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
