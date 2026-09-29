import { cn } from "@/lib/utils";

interface BlockRuleProps {
  className?: string;
  /** Optional MTA line color hairline instead of border token. */
  lineColor?: string;
}

/**
 * Hard city-block horizontal rule — structure over decoration.
 */
export function BlockRule({ className, lineColor }: BlockRuleProps) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full", !lineColor && "bg-border-strong", className)}
      style={lineColor ? { backgroundColor: lineColor } : undefined}
    />
  );
}
