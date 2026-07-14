import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color,box-shadow] " +
  "duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "hover:scale-[1.02] active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Primary — deep navy, white text, subtle lift on hover.
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:shadow-md",
  // Secondary — outline with a navy border that strengthens on hover.
  secondary:
    "border border-border-strong bg-transparent text-foreground hover:border-brand hover:text-brand",
  // Ghost — transparent with an elegant neutral hover fill.
  ghost: "bg-transparent text-foreground hover:bg-background-elevated",
  // Accent — muted gold, dark text. Reserved for important CTAs; use rarely.
  accent:
    "bg-accent text-accent-foreground shadow-sm hover:bg-accent-strong hover:shadow-md",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button. Renders a Next `<Link>` when `href` is provided,
 * otherwise a native `<button>`. Variants encode the brand system:
 * primary (navy), secondary (outline), ghost, and the rare accent (gold).
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type, ...rest } = props as ButtonAsButton;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
