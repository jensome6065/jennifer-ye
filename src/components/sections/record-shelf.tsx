"use client";

import { useState } from "react";
import Image from "next/image";
import { Turntable } from "@/components/ui/turntable";
import type { Album } from "@/content/music";
import { cn } from "@/lib/utils";

interface RecordShelfProps {
  albums: Album[];
}

/**
 * Music listening room: a turntable stage above a horizontal record shelf.
 * Pick a sleeve to drop it on the platter and play the can't-skip track
 * in-page via Spotify.
 */
export function RecordShelf({ albums }: RecordShelfProps) {
  const [activeId, setActiveId] = useState(albums[0]?.id ?? "");
  const [hasSelected, setHasSelected] = useState(false);
  const [playing, setPlaying] = useState(false);
  const active = albums.find((a) => a.id === activeId) ?? albums[0];

  if (!active) return null;

  return (
    <div>
      <Turntable
        album={active}
        spinning={playing}
        autoplay={hasSelected}
        onPlaybackChange={setPlaying}
      />

      {/* Shelf */}
      <div className="mt-14 sm:mt-16" aria-label="Record shelf">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            The shelf
          </p>
          <p className="text-sm text-muted" aria-live="polite">
            {playing
              ? `Playing ${active.favoriteSong}`
              : "Pick a record to play"}
          </p>
        </div>

        <div className="relative">
          <ul
            className={cn(
              "flex gap-3 overflow-x-auto pb-4 pt-2 sm:gap-4",
              "snap-x snap-mandatory scroll-px-1",
              "[scrollbar-width:thin]",
            )}
            role="radiogroup"
            aria-label="Albums on the shelf"
          >
            {albums.map((album, i) => {
              const selected = album.id === active.id;
              return (
                <li key={album.id} className="snap-start">
                  <ShelfSleeve
                    album={album}
                    selected={selected}
                    priority={i < 5}
                    onSelect={() => {
                      setHasSelected(true);
                      setActiveId(album.id);
                    }}
                  />
                </li>
              );
            })}
          </ul>

          <div
            aria-hidden
            className={cn(
              "h-2.5 rounded-sm",
              "bg-gradient-to-b from-[color-mix(in_srgb,var(--foreground)_18%,var(--background-elevated))] to-[color-mix(in_srgb,var(--foreground)_10%,var(--background))]",
              "shadow-[0_10px_24px_-12px_rgba(20,22,28,0.55)]",
              "ring-1 ring-border",
            )}
          />
          <div
            aria-hidden
            className="mx-1 h-3 rounded-b-md bg-[color-mix(in_srgb,var(--foreground)_08%,var(--background))] ring-1 ring-border/60"
          />
        </div>
      </div>
    </div>
  );
}

function ShelfSleeve({
  album,
  selected,
  priority,
  onSelect,
}: {
  album: Album;
  selected: boolean;
  priority?: boolean;
  onSelect: () => void;
}) {
  const { title, artist, cover, artwork } = album;

  return (
    <button
      type="button"
      id={`shelf-${album.id}`}
      role="radio"
      aria-checked={selected}
      aria-label={`${title} by ${artist}${selected ? ", on the platter" : ""}`}
      onClick={onSelect}
      className={cn(
        "group relative w-[7.25rem] shrink-0 text-left sm:w-32 md:w-[8.5rem]",
        "rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        selected ? "-translate-y-2" : "hover:-translate-y-1.5",
      )}
    >
      <span
        className={cn(
          "relative block aspect-square w-full overflow-hidden rounded-md",
          "bg-background-elevated shadow-md ring-1 transition-[box-shadow,ring-color] duration-300",
          selected
            ? "ring-2 ring-brand shadow-lg"
            : "ring-border group-hover:ring-brand/40",
        )}
      >
        {artwork ? (
          <Image
            src={artwork.src}
            alt=""
            fill
            sizes="140px"
            priority={priority}
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(140deg, ${cover.from}, ${cover.to})`,
            }}
          />
        )}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/35 to-transparent"
        />
      </span>

      <span className="mt-2.5 block truncate text-xs font-medium text-foreground">
        {title}
      </span>
      <span className="block truncate text-[0.7rem] text-muted">{artist}</span>
    </button>
  );
}
