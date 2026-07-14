import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  /** Render as a circle (e.g. avatars). */
  circle?: boolean;
}

/**
 * Neutral loading placeholder with a subtle shimmer. Compose several to
 * mirror a component's layout while data (Spotify, GitHub, etc.) loads.
 * Decorative by default — hidden from assistive tech; give the surrounding
 * region an appropriate `aria-busy`/status instead.
 */
export function Skeleton({ circle, className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "skeleton-shimmer bg-background-elevated ring-1 ring-border/60",
        circle ? "rounded-full" : "rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Ready-made skeleton matching the ImageCard footprint — a media frame plus
 * two text lines. Handy for project/lifestyle grids during loading states.
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
