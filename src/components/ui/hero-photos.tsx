"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FilmGrain } from "@/components/ui/film-grain";
import type { HeroPhoto } from "@/content/home";
import { EASE_IN_OUT_SOFT, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HeroPhotosProps {
  photos: HeroPhoto[];
  className?: string;
}

/** How long each frame holds before the next soft crossfade. */
const HOLD_MS = 4200;

/**
 * Editorial hero photo sequence — one visual plane that proves the tagline.
 * Crossfades through portrait frames; reduced-motion shows the first still.
 * Not a gallery UI: no captions, chips, or lightbox chrome.
 */
export function HeroPhotos({ photos, className }: HeroPhotosProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || photos.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, photos.length, paused]);

  if (photos.length === 0) return null;

  const active = photos[index]!;

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Soft denim depth — atmosphere, not a card chrome. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[1.25rem] bg-[radial-gradient(55%_60%_at_70%_40%,color-mix(in_srgb,var(--color-brand)_16%,transparent),transparent)]"
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-background-elevated ring-1 ring-border/80">
        <FilmGrain strength="street" />
        {reduceMotion ? (
          <Image
            src={photos[0]!.src}
            alt={photos[0]!.alt}
            fill
            priority
            sizes="(min-width: 1024px) 30rem, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.9, ease: EASE_IN_OUT_SOFT },
                scale: { duration: 5.5, ease: EASE_OUT_EXPO },
              }}
              className="absolute inset-0"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 30rem, (min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Quiet progress — ticks, not carousel chrome. */}
      {photos.length > 1 && !reduceMotion && (
        <div
          aria-hidden
          className="mt-4 flex items-center justify-center gap-1.5"
        >
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show photo ${i + 1} of ${photos.length}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                i === index
                  ? "w-6 bg-brand"
                  : "w-1.5 bg-border-strong hover:bg-muted",
              )}
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {active.alt}
      </p>
    </div>
  );
}
