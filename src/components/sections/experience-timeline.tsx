import Link from "next/link";
import type { ReactNode } from "react";
import type { ExperienceItem } from "@/content/experience";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { TimelineCard } from "@/components/ui/timeline-card";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

/**
 * Wraps a card in a company link when one exists, otherwise renders it plain.
 * The `group` class drives the card's internal hover states (see TimelineCard);
 * a non-link role has no hover affordance, which is intentional.
 */
function CardShell({
  href,
  ariaLabel,
  children,
}: {
  href?: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  if (!href) {
    return <div className="h-full">{children}</div>;
  }
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </Link>
  );
}

/**
 * Vertical experience timeline. A single continuous rail with a node per role.
 *
 * - Mobile: single column, rail pinned to the left, cards to its right.
 * - Desktop (lg+): rail centered, cards alternate left / right of it.
 *
 * Roles reveal in a staggered sequence as the timeline scrolls into view
 * (via the shared motion vocabulary, which honors reduced-motion).
 */
export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <AnimatedSection stagger as="ol" className="relative">
      {/* Rail — left on mobile, centered on desktop. */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-[11px] w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
      />

      {items.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <AnimatedItem
            as="li"
            key={item.id}
            id={item.id}
            className="relative pb-10 last:pb-0"
          >
            {/* Node on the rail */}
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background",
                "left-0 lg:left-1/2 lg:-translate-x-1/2",
              )}
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
            </span>

            {/* Card — offset past the rail on mobile; one half on desktop. */}
            <div
              className={cn(
                "pl-10 lg:pl-0",
                isLeft
                  ? "lg:pr-[calc(50%+2.5rem)]"
                  : "lg:pl-[calc(50%+2.5rem)]",
              )}
            >
              <CardShell
                href={item.href}
                ariaLabel={`${item.role} at ${item.company}`}
              >
                <TimelineCard item={item} />
              </CardShell>
            </div>
          </AnimatedItem>
        );
      })}
    </AnimatedSection>
  );
}
