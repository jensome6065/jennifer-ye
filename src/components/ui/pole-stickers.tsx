"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PoleStickersProps {
  className?: string;
}

type Allegiance = "yankees" | "mets" | null;

/**
 * Sticker-bombed pole energy next to the corner stamp — tiny, peelable
 * NYC ephemera. Tap the pinstripe / orange stickers to flip quiet
 * Yankees ↔ Mets rivalry vibes (no league logos).
 */
export function PoleStickers({ className }: PoleStickersProps) {
  const [team, setTeam] = useState<Allegiance>(null);

  return (
    <div
      className={cn("relative h-16 w-24", className)}
      aria-label="Street stickers"
    >
      {/* Lamp-post hint */}
      <div
        aria-hidden
        className="absolute left-1 top-0 h-full w-1.5 rounded-full bg-chrome/50"
      />

      <button
        type="button"
        title="Bronx energy"
        aria-pressed={team === "yankees"}
        onClick={() =>
          setTeam((t) => (t === "yankees" ? null : "yankees"))
        }
        className={cn(
          "absolute left-3 top-0 rotate-[-8deg] rounded-[3px] border border-brand/30 bg-background-elevated px-1.5 py-1 shadow-sm transition-transform hover:scale-105",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          team === "yankees" && "ring-1 ring-brand",
        )}
      >
        <span
          className="block bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,color-mix(in_srgb,var(--color-brand)_35%,transparent)_2px,color-mix(in_srgb,var(--color-brand)_35%,transparent)_3px)] px-1 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-brand"
        >
          BX
        </span>
      </button>

      <button
        type="button"
        title="Queens energy"
        aria-pressed={team === "mets"}
        onClick={() => setTeam((t) => (t === "mets" ? null : "mets"))}
        className={cn(
          "absolute left-7 top-6 rotate-[7deg] rounded-[3px] border border-[#FF5910]/40 bg-[#002D72] px-1.5 py-1 shadow-sm transition-transform hover:scale-105",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          team === "mets" && "ring-1 ring-[#FF5910]",
        )}
      >
        <span className="font-display text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF5910]">
          QNS
        </span>
      </button>

      <div
        aria-hidden
        className="absolute left-10 top-1 rotate-[14deg] rounded-full border border-border bg-accent px-1.5 py-0.5 font-display text-[8px] font-bold uppercase tracking-wider text-accent-foreground shadow-sm"
      >
        NYC
      </div>

      <span className="sr-only" aria-live="polite">
        {team === "yankees"
          ? "Bronx pinstripe mode"
          : team === "mets"
            ? "Queens blue-and-orange mode"
            : "No team selected"}
      </span>
    </div>
  );
}
