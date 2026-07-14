import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "brand" | "accent" | "outline";
type BadgeSize = "sm" | "md";

const variants: Record<BadgeVariant, string> = {
  // Neutral — the default. Quiet surface for tech tags, metadata, etc.
  neutral: "bg-background-elevated text-muted-foreground ring-1 ring-border",
  // Brand (navy) — for status/section labels; still restrained.
  brand: "bg-brand/10 text-brand ring-1 ring-brand/15",
  // Accent (gold) — reserved for small highlights; use sparingly.
  accent: "bg-accent/12 text-accent-strong ring-1 ring-accent/20",
  // Outline — transparent, just a border. For dense tag groups.
  outline: "bg-transparent text-muted-foreground ring-1 ring-border-strong",
};

const sizes: Record<BadgeSize, string> = {
  sm: "h-6 px-2.5 text-xs",
  md: "h-7 px-3 text-sm",
};

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

/**
 * Small pill label for tech stacks, categories, statuses, and ratings.
 * Defaults to a neutral surface; brand/accent variants are intentionally
 * subdued so color stays supporting, not dominant.
 */
export function Badge({
  variant = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium leading-none tracking-tight whitespace-nowrap",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
