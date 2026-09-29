"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/content/projects";
import { ProjectCover } from "@/components/ui/project-cover";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

type ScreenSize = "hero" | "mid" | "tall" | "small";
type ScreenArea = "hero" | "mid1" | "mid2" | "tall" | "small1" | "small2";

interface BillboardSlot {
  project: Project;
  size: ScreenSize;
  area: ScreenArea;
  /** Subtle perspective tilt — desktop only, kept tiny. */
  tilt?: string;
}

interface ProjectBillboardProps {
  projects: Project[];
  className?: string;
}

const AREA_CLASS: Record<ScreenArea, string> = {
  hero: "sm:[grid-area:hero]",
  mid1: "sm:[grid-area:mid1]",
  mid2: "sm:[grid-area:mid2]",
  tall: "sm:[grid-area:tall]",
  small1: "sm:[grid-area:small1]",
  small2: "sm:[grid-area:small2]",
};

/**
 * Times Square–style project wall: irregular glowing screens in a night
 * canyon. Featured work only — the archive list below stays scannable.
 */
export function ProjectBillboard({ projects, className }: ProjectBillboardProps) {
  const reduceMotion = useReducedMotion();
  const slots = layoutSlots(projects);

  if (slots.length === 0) return null;

  const tickerNames = slots.map((s) => s.project.name.toUpperCase());

  return (
    <AnimatedSection
      as="section"
      className={cn("relative", className)}
      aria-labelledby="project-billboard-heading"
    >
      <h2 id="project-billboard-heading" className="sr-only">
        Featured projects on the board
      </h2>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl night-wash",
          "ring-1 ring-white/10 shadow-[0_24px_80px_-32px_rgba(10,16,28,0.85)]",
        )}
      >
        {/* Soft city glow — atmosphere, not neon */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_70%_20%,color-mix(in_srgb,var(--color-navy-500)_35%,transparent),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative p-2.5 sm:p-3 lg:p-3.5">
          {/*
            Mobile: stacked street of screens.
            Desktop collage:
              hero hero mid1 mid1
              hero hero mid1 mid1
              hero hero mid2 mid2
              hero hero mid2 mid2
              tall  tall small1 small2
              tall  tall small1 small2
          */}
          <ul
            className={cn(
              "grid grid-cols-1 gap-2.5",
              "sm:grid-cols-4 sm:grid-rows-6 sm:gap-2.5",
              "sm:min-h-[32rem] lg:min-h-[38rem]",
              "sm:[grid-template-areas:'hero_hero_mid1_mid1'_'hero_hero_mid1_mid1'_'hero_hero_mid2_mid2'_'hero_hero_mid2_mid2'_'tall_tall_small1_small2'_'tall_tall_small1_small2']",
            )}
          >
            {slots.map((slot, i) => (
              <li
                key={slot.project.slug}
                className={cn(
                  "min-h-[11rem] sm:min-h-0",
                  slot.size === "hero" && "min-h-[16rem]",
                  AREA_CLASS[slot.area],
                  slot.tilt && "sm:z-[1]",
                )}
              >
                <BillboardScreen
                  project={slot.project}
                  size={slot.size}
                  tilt={slot.tilt}
                  priority={i < 2}
                  pulse={!reduceMotion && slot.size === "hero"}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Ticker rail */}
        <div
          className="relative border-t border-white/10 bg-brand-strong/40 backdrop-blur-sm"
          aria-hidden
        >
          <div className="flex items-center gap-3 overflow-hidden py-2.5 pl-3 sm:pl-4">
            <span className="shrink-0 font-display text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent">
              Now playing
            </span>
            <span className="h-3 w-px shrink-0 bg-white/20" />
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <div
                className={cn(
                  "flex w-max gap-8 whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/55",
                  !reduceMotion && "animate-billboard-ticker",
                )}
              >
                {[...tickerNames, ...tickerNames].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="inline-flex items-center gap-8"
                  >
                    <span>{name}</span>
                    <span className="text-accent/70">·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function BillboardScreen({
  project,
  size,
  tilt,
  priority,
  pulse,
}: {
  project: Project;
  size: ScreenSize;
  tilt?: string;
  priority?: boolean;
  pulse?: boolean;
}) {
  const isHero = size === "hero";

  return (
    <motion.div
      className={cn("h-full", tilt)}
      animate={pulse ? { opacity: [1, 0.92, 1] } : undefined}
      transition={
        pulse
          ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative flex h-full min-h-[inherit] overflow-hidden rounded-md",
          "bg-brand-strong/80 ring-1 ring-white/15",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_8px_28px_-12px_rgba(0,0,0,0.55)]",
          "transition-[box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:ring-accent/40 hover:shadow-[inset_0_0_0_1px_rgba(245,197,24,0.18),0_12px_36px_-10px_rgba(0,0,0,0.65)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
        aria-label={`${project.name} — ${project.tagline}`}
      >
        {/* Bezel */}
        <div className="absolute inset-[3px] overflow-hidden rounded-[3px] sm:inset-1">
          <ProjectCover
            project={project}
            priority={priority}
            sizes={
              isHero
                ? "(min-width: 1024px) 55vw, 100vw"
                : "(min-width: 640px) 28vw, 100vw"
            }
          />

          {/* Screen glass + readability */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-brand-strong/90 via-brand-strong/25 to-transparent"
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 opacity-0",
              "bg-[linear-gradient(180deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]",
              "transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-billboard-scan",
            )}
          />

          {/* Corner plate */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-3.5">
            <div className="min-w-0">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                {project.status}
                <span className="mx-1.5 text-white/25">·</span>
                {project.year}
              </p>
              <p
                className={cn(
                  "mt-1 truncate font-display font-bold uppercase tracking-wide text-white",
                  isHero
                    ? "text-2xl sm:text-3xl lg:text-4xl"
                    : size === "small"
                      ? "text-base sm:text-lg"
                      : "text-lg sm:text-xl",
                )}
              >
                {project.name}
              </p>
              {isHero ? (
                <p className="mt-1.5 line-clamp-2 max-w-md text-sm text-white/65 sm:text-base">
                  {project.tagline}
                </p>
              ) : null}
            </div>

            <span
              aria-hidden
              className={cn(
                "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                "bg-white/10 text-white backdrop-blur-sm",
                "translate-y-1 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-hover:translate-y-0 group-hover:opacity-100",
              )}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Live micro-hit */}
          {project.status === "Live" ? (
            <span
              aria-hidden
              className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
            />
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}

/** Map featured projects onto irregular screen sizes; drop project owns hero. */
function layoutSlots(projects: Project[]): BillboardSlot[] {
  if (projects.length === 0) return [];

  const ordered = [...projects].sort((a, b) => {
    if (a.drop && !b.drop) return -1;
    if (!a.drop && b.drop) return 1;
    return 0;
  });

  const blueprint: Array<{
    size: ScreenSize;
    area: ScreenArea;
    tilt?: string;
  }> = [
    { size: "hero", area: "hero" },
    {
      size: "mid",
      area: "mid1",
      tilt: "sm:origin-bottom sm:rotate-[1.1deg]",
    },
    {
      size: "mid",
      area: "mid2",
      tilt: "sm:origin-top sm:rotate-[-0.8deg]",
    },
    {
      size: "tall",
      area: "tall",
      tilt: "sm:origin-center sm:rotate-[0.55deg]",
    },
    {
      size: "small",
      area: "small1",
      tilt: "sm:origin-bottom-left sm:rotate-[-1deg]",
    },
    {
      size: "small",
      area: "small2",
      tilt: "sm:origin-bottom-right sm:rotate-[0.9deg]",
    },
  ];

  return ordered.slice(0, blueprint.length).map((project, i) => ({
    project,
    size: blueprint[i]!.size,
    area: blueprint[i]!.area,
    tilt: blueprint[i]!.tilt,
  }));
}
