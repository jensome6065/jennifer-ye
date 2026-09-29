"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ExperienceItem } from "@/content/experience";
import { ExperienceMap } from "@/components/ui/experience-map";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ExperienceJourneyProps {
  items: ExperienceItem[];
}

/** Viewport-heights of scroll budget per stop — dense enough for 15 roles. */
const STOP_VH = 70;

/**
 * Apple-style scroll journey: a sticky full-bleed map stage, pin flying
 * between work locations, and role cards fading in as each stop settles.
 * Falls back to the classic timeline when the user prefers reduced motion.
 */
export function ExperienceJourney({ items }: ExperienceJourneyProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || items.length === 0) {
    return (
      <Container className="pb-24 sm:pb-32">
        <ExperienceTimeline items={items} />
      </Container>
    );
  }

  return <JourneyScroller items={items} />;
}

function JourneyScroller({ items }: { items: ExperienceItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Slightly softer spring — camera eases into each close-up.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.45,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    const max = Math.max(items.length - 1, 1);
    const next = v * max;
    setProgress(next);
    const from = Math.min(Math.floor(next), items.length - 1);
    const localT = next - from;
    const idx =
      localT < 0.55 || from >= items.length - 1
        ? from
        : Math.min(from + 1, items.length - 1);
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const active = items[activeIndex];
  const trackHeight = `calc(${items.length * STOP_VH}vh + 100vh)`;

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: trackHeight }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden night-wash">
        <ExperienceMap
          items={items}
          progress={progress}
          className="absolute inset-0 h-full w-full rounded-none ring-0 opacity-95"
        />

        {/* Bottom gradient so the card stays readable on the map */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[rgba(10,16,28,0.94)] via-[rgba(10,16,28,0.55)] to-transparent"
        />

        <div className="relative z-10 mt-auto w-full pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-8">
          <Container className="max-w-3xl">
            <div className="mb-3 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              <span>
                Stop {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <span className="truncate">{active?.location}</span>
            </div>

            <div className="relative min-h-[13.5rem] sm:min-h-[12rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    className="absolute inset-x-0 top-0"
                  >
                    <JourneyCard item={active} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

function JourneyCard({ item }: { item: ExperienceItem }) {
  const isCurrent = item.end.toLowerCase() === "present";
  const body = (
    <article
      className={cn(
        "rounded-2xl border border-white/10 bg-[rgba(20,22,28,0.78)] p-5 backdrop-blur-md sm:p-6",
        "shadow-[0_20px_60px_-28px_rgba(0,0,0,0.65)]",
        item.href &&
          "transition-[border-color,box-shadow] duration-300 group-hover:border-accent/40",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
          {item.start} — {item.end}
        </p>
        {isCurrent && (
          <Badge variant="accent" size="sm">
            Current
          </Badge>
        )}
      </div>

      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {item.role}
      </h2>
      <p className="mt-1 flex items-center gap-1 text-base font-medium text-accent">
        {item.company}
        {item.href && (
          <ArrowUpRight
            className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </p>
      <p className="mt-1 text-sm text-white/50">{item.location}</p>

      <p className="mt-3 line-clamp-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">
        {item.description[0]}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {item.technologies.slice(0, 4).map((tech) => (
          <li key={tech}>
            <Badge variant="outline" className="border-white/15 text-white/70">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>
    </article>
  );

  if (!item.href) return body;

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.role} at ${item.company}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {body}
    </Link>
  );
}
