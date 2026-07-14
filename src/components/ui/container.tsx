import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Render as a different element (e.g. "section", "header"). Defaults to "div". */
  as?: ElementType;
}

/**
 * Horizontal layout wrapper: centers content, applies responsive gutters,
 * and caps line/measure width consistently across pages so every section
 * lines up to the same rhythm.
 */
export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
