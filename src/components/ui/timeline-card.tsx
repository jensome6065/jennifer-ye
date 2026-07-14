import { ArrowUpRight } from "lucide-react";
import type { ExperienceItem } from "@/content/experience";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineCardProps {
  item: ExperienceItem;
  className?: string;
}

/**
 * A single role card for the experience timeline. Presentational only — the
 * timeline owns the rail, nodes, and alternating layout. Shares the site's
 * restrained hover language (border warms to navy, subtle shadow lift). When
 * the role has a company link the whole card becomes a link; otherwise it
 * renders as a plain article so there's no dead interactive affordance.
 */
export function TimelineCard({ item, className }: TimelineCardProps) {
  const isCurrent = item.end.toLowerCase() === "present";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-background-elevated p-6 sm:p-7",
        "transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        item.href && "group-hover:border-brand/40 group-hover:shadow-lg",
        className,
      )}
    >
      {/* Dates + location */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {item.start} — {item.end}
        </p>
        {isCurrent && (
          <Badge variant="accent" size="sm">
            Current
          </Badge>
        )}
      </div>

      {/* Role + company */}
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {item.role}
      </h3>
      <p className="mt-1 flex items-center gap-1 text-base font-medium text-brand">
        {item.company}
        {item.href && (
          <ArrowUpRight
            className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </p>
      <p className="mt-1 text-sm text-muted">{item.location}</p>

      {/* Description */}
      <div className="mt-4 space-y-3 text-pretty leading-relaxed text-muted-foreground">
        {item.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {/* Technologies */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <li key={tech}>
            <Badge variant="outline">{tech}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
