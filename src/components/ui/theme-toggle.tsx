"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

type ThemeOption = "light" | "dark" | "system";

const OPTIONS: { value: ThemeOption; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

/**
 * Segmented theme control cycling through light / system / dark.
 * A sliding indicator marks the active option. Renders a neutral
 * placeholder until mounted to avoid a hydration flash.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const active: ThemeOption = mounted ? (theme as ThemeOption) ?? "system" : "system";

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "relative inline-flex items-center rounded-full border border-border bg-background-elevated/60 p-0.5 backdrop-blur-sm",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = mounted && active === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              "relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200",
              isActive
                ? "text-background"
                : "text-muted hover:text-foreground",
            )}
          >
            {isActive && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-foreground"
              />
            )}
            <Icon className="relative h-[15px] w-[15px]" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
