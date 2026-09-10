"use client";

import { useMemo, useState } from "react";
import { AnimatedItem, AnimatedSection } from "@/components/ui/animated-section";
import { MenuItem } from "@/components/ui/menu-item";
import {
  SPOT_FILTER_ORDER,
  SPOT_FILTERS,
  sortByBeli,
  spotMatchesFilter,
  type Spot,
  type SpotFilter,
} from "@/content/eats";
import { cn } from "@/lib/utils";

type FilterValue = "all" | SpotFilter;

interface EatsFiltersProps {
  spots: Spot[];
}

/**
 * Eats as a printed menu: section chapters + name……Beli rows, sorted highest
 * first. Filter chips swap which course you're reading.
 */
export function EatsFilters({ spots }: EatsFiltersProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const sections = useMemo(() => {
    const groups =
      filter === "all"
        ? SPOT_FILTER_ORDER
        : ([filter] as SpotFilter[]);

    return groups
      .map((group) => ({
        key: group,
        heading: SPOT_FILTERS[group].menuHeading,
        items: sortByBeli(
          spots.filter((spot) => spotMatchesFilter(spot, group)),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [filter, spots]);

  const total = useMemo(
    () => sections.reduce((sum, s) => sum + s.items.length, 0),
    [sections],
  );

  const counts = useMemo(() => {
    const next: Record<FilterValue, number> = {
      all: spots.length,
      restaurants: 0,
      cafes: 0,
      sweets: 0,
    };
    for (const spot of spots) {
      for (const group of SPOT_FILTER_ORDER) {
        if (spotMatchesFilter(spot, group)) next[group] += 1;
      }
    }
    return next;
  }, [spots]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter menu by type"
        className="flex flex-wrap gap-2"
      >
        <FilterChip
          label="All"
          count={counts.all}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {SPOT_FILTER_ORDER.map((group) => (
          <FilterChip
            key={group}
            label={SPOT_FILTERS[group].label}
            count={counts[group]}
            active={filter === group}
            onClick={() => setFilter(group)}
          />
        ))}
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {total} {total === 1 ? "spot" : "spots"}
        {filter !== "all" ? ` · ${SPOT_FILTERS[filter].label}` : ""}
        {" · "}
        ranked by Beli
      </p>

      {/* Menu legend */}
      <div className="mt-8 flex items-baseline justify-between gap-4 border-b border-border pb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        <span>Place</span>
        <span>Beli</span>
      </div>

      {sections.length === 0 ? (
        <p className="mt-14 text-muted-foreground">
          No spots in this category yet.
        </p>
      ) : (
        <div key={filter} className="mt-2">
          {sections.map((section) => (
            <AnimatedSection
              key={section.key}
              stagger
              as="section"
              className="mt-10 first:mt-6 sm:mt-12 sm:first:mt-8"
              aria-labelledby={`menu-${section.key}`}
            >
              {filter === "all" || sections.length > 1 ? (
                <h3
                  id={`menu-${section.key}`}
                  className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-strong"
                >
                  {section.heading}
                </h3>
              ) : null}
              <ul className="divide-y divide-border/80">
                {section.items.map((spot) => (
                  <AnimatedItem as="li" key={spot.id}>
                    <MenuItem spot={spot} />
                  </AnimatedItem>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-brand text-brand-foreground"
          : "bg-background-elevated text-muted-foreground ring-1 ring-border hover:text-foreground hover:ring-brand/30",
      )}
    >
      {label}
      <span
        className={cn(
          "tabular-nums text-xs",
          active ? "text-brand-foreground/70" : "text-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}
