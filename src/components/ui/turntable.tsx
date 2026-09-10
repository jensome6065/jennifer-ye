"use client";

import Image from "next/image";
import { ExternalLink, Disc3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Album } from "@/content/music";
import { SpotifyTrackPlayer } from "@/components/ui/spotify-track-player";
import { cn } from "@/lib/utils";

interface TurntableProps {
  album: Album;
  /** Vinyl spins while audio is playing (honors reduced motion). */
  spinning?: boolean;
  /**
   * After the visitor has picked a sleeve, ask Spotify to autoplay the
   * can't-skip track when the platter changes.
   */
  autoplay?: boolean;
  onPlaybackChange?: (playing: boolean) => void;
  className?: string;
}

/**
 * Editorial turntable stage for the Music shelf. Album art sits as the vinyl
 * center label; the can't-skip track plays via an in-page Spotify embed.
 */
export function Turntable({
  album,
  spinning = false,
  autoplay = false,
  onPlaybackChange,
  className,
}: TurntableProps) {
  const reduceMotion = useReducedMotion();
  const shouldSpin = spinning && !reduceMotion;
  const {
    title,
    artist,
    year,
    favoriteSong,
    cover,
    artwork,
    spotifyUrl,
    spotifyTrackId,
  } = album;

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12",
        className,
      )}
    >
      {/* Deck */}
      <div className="relative mx-auto w-full max-w-md">
        <div
          className={cn(
            "relative rounded-[1.75rem] border border-border bg-background-elevated p-6 sm:p-8",
            "shadow-[0_24px_48px_-28px_rgba(20,22,28,0.45)]",
          )}
        >
          <div className="relative aspect-square w-full rounded-full bg-[radial-gradient(circle_at_50%_45%,color-mix(in_srgb,var(--foreground)_8%,transparent),transparent_55%)]">
            <div className="absolute inset-[6%] rounded-full bg-foreground/[0.06] shadow-inner ring-1 ring-border dark:bg-background">
              <motion.div
                className="absolute inset-[4%] overflow-hidden rounded-full"
                animate={shouldSpin ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  shouldSpin
                    ? { duration: 8, ease: "linear", repeat: Infinity }
                    : { duration: 0.4 }
                }
                style={{
                  backgroundImage: `
                    repeating-radial-gradient(
                      circle at center,
                      #1a1c22 0,
                      #1a1c22 2px,
                      #12141a 3px,
                      #12141a 5px
                    )
                  `,
                }}
                aria-hidden
              >
                <div className="absolute inset-0 bg-[conic-gradient(from_210deg,transparent_0%,rgba(255,255,255,0.08)_18%,transparent_36%)]" />

                <div className="absolute inset-[28%] overflow-hidden rounded-full shadow-lg ring-1 ring-white/10">
                  {artwork ? (
                    <Image
                      src={artwork.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 180px, 40vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(140deg, ${cover.from}, ${cover.to})`,
                      }}
                    />
                  )}
                  <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-charcoal-950)] ring-2 ring-white/20" />
                </div>
              </motion.div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute right-[8%] top-[10%] h-[42%] w-2 origin-top rotate-[28deg]"
            >
              <div className="h-full w-full rounded-full bg-gradient-to-b from-muted-foreground/80 to-muted-foreground/40 shadow-sm" />
              <div className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-full bg-muted-foreground/90 ring-2 ring-background-elevated" />
              <div className="absolute -bottom-1 -left-1 h-3 w-4 rounded-sm bg-brand/80" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 px-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <Disc3 className="h-3.5 w-3.5 text-brand" aria-hidden />
              {spinning ? "Now spinning" : "On the platter"}
            </span>
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                spinning
                  ? "bg-accent shadow-[0_0_8px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
                  : "bg-muted",
              )}
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Now playing copy + in-page player */}
      <div className="min-w-0 text-center lg:text-left">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          On the platter
        </p>
        <h3 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h3>
        <p className="mt-3 text-lg text-muted-foreground">
          {artist}
          <span aria-hidden className="mx-2 text-border-strong">
            ·
          </span>
          {year}
        </p>
        <p className="mt-6 text-sm text-muted">
          <span className="font-medium uppercase tracking-[0.16em]">
            Can&apos;t skip
          </span>
          <span className="mt-2 block text-base text-foreground sm:text-lg">
            {favoriteSong}
          </span>
        </p>

        <div className="mt-6">
          <SpotifyTrackPlayer
            trackId={spotifyTrackId}
            title={`${favoriteSong} — ${artist}`}
            autoplay={autoplay}
            onPlaybackChange={onPlaybackChange}
          />
          <p className="mt-2 text-xs text-muted">
            Plays here via Spotify — a free account may be required in some regions.
          </p>
        </div>

        {spotifyUrl ? (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand link-underline hover:text-brand-strong",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            )}
          >
            Full album on Spotify
            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
          </a>
        ) : null}
      </div>
    </div>
  );
}
