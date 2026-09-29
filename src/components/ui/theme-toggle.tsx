"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const CYCLE: ThemeOption[] = ["system", "light", "dark"];

const META: Record<
  ThemeOption,
  { label: string; Icon: typeof Sun; nextHint: string }
> = {
  system: {
    label: "System",
    Icon: Monitor,
    nextHint: "Switch to light theme",
  },
  light: { label: "Light", Icon: Sun, nextHint: "Switch to dark theme" },
  dark: { label: "Dark", Icon: Moon, nextHint: "Switch to system theme" },
};

/**
 * Quiet corner theme control. Defaults to system via next-themes; sits
 * fixed bottom-left so it stays out of the navbar and out of the way.
 * Single button cycles system → light → dark. Low-opacity until hover/focus.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const active: ThemeOption = mounted
    ? ((theme as ThemeOption | undefined) ?? "system")
    : "system";
  const { Icon, label, nextHint } = META[active];
  const next =
    CYCLE[(CYCLE.indexOf(active) + 1) % CYCLE.length] ?? "system";

  return (
    <button
      type="button"
      aria-label={`Color theme: ${label}. ${nextHint}.`}
      title={`${label} · ${nextHint}`}
      onClick={() => setTheme(next)}
      className={cn(
        "fixed bottom-5 left-5 z-50 flex h-9 w-9 items-center justify-center rounded-full",
        "border border-border/60 bg-surface/50 text-muted backdrop-blur-md",
        "opacity-40 shadow-sm transition-[opacity,color,border-color,background-color] duration-300",
        "hover:opacity-100 hover:border-border hover:bg-surface hover:text-foreground",
        "focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
    </button>
  );
}
