"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";
import type { ProjectGameContent } from "@/content/project-claw";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCover } from "@/components/ui/project-cover";
import { pickNextProject } from "@/lib/project-game";
import { EASE_IN_OUT_SOFT, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Poker card proportion (~2.5 × 3.5). */
const CARD_ASPECT = "aspect-[5/7]";
const DECK_SIZE = 6;

type Phase = "idle" | "split" | "riffle" | "deal";

interface ProjectDeckProps {
  projects: Project[];
  copy: ProjectGameContent;
}

/**
 * Poker-style featured deck: backs stacked like a real pack, riffle shuffle,
 * then a face-up deal. Recruiters who never click still see the dealt card.
 */
export function ProjectDeck({ projects, copy }: ProjectDeckProps) {
  const reduceMotion = useReducedMotion();
  const [dealt, setDealt] = useState<Project>(projects[0]!);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dealKey, setDealKey] = useState(0);
  const [announce, setAnnounce] = useState("");

  const pack = useMemo(() => {
    // Prefer other featured cards as the facedown pack under/behind the deal.
    const others = projects.filter((p) => p.slug !== dealt.slug);
    const source = others.length > 0 ? others : projects;
    return Array.from(
      { length: Math.min(DECK_SIZE, Math.max(source.length, 3)) },
      (_, i) => source[i % source.length]!,
    );
  }, [projects, dealt.slug]);

  const shuffling = phase !== "idle";

  const shuffle = useCallback(async () => {
    if (shuffling || projects.length === 0) return;
    const next = pickNextProject(projects, dealt.slug);

    if (reduceMotion) {
      setDealt(next);
      setDealKey((k) => k + 1);
      setAnnounce(`${copy.resultAnnounce} ${next.name}`);
      return;
    }

    setPhase("split");
    await wait(380);
    setPhase("riffle");
    await wait(520);
    setPhase("deal");
    setDealt(next);
    setDealKey((k) => k + 1);
    await wait(480);
    setPhase("idle");
    setAnnounce(`${copy.resultAnnounce} ${next.name}`);
  }, [
    shuffling,
    projects,
    dealt.slug,
    reduceMotion,
    copy.resultAnnounce,
  ]);

  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 sm:flex-row sm:items-end sm:gap-10 lg:gap-14">
        {/* Facedown pack */}
        <div
          className={cn(
            "relative w-[min(42%,11.5rem)] shrink-0 sm:w-[11.5rem]",
            CARD_ASPECT,
          )}
          aria-hidden
        >
          {/* Extra thickness under the pack */}
          <div className="absolute -bottom-1 left-1 right-1 top-2 rounded-[0.85rem] bg-brand/40" />
          <div className="absolute -bottom-0.5 left-0.5 right-0.5 top-1 rounded-[0.9rem] bg-brand/55" />

          {pack.map((project, i) => {
            const fromBack = pack.length - 1 - i;
            const half = i < pack.length / 2 ? "left" : "right";
            const pose = packPose(phase, i, fromBack, half);

            return (
              <motion.div
                key={`${project.slug}-back-${i}`}
                className="absolute inset-0"
                style={{ zIndex: i + 1 }}
                initial={false}
                animate={pose}
                transition={{
                  duration: phase === "riffle" ? 0.18 : 0.4,
                  ease: phase === "riffle" ? EASE_IN_OUT_SOFT : EASE_OUT_EXPO,
                  delay:
                    phase === "riffle"
                      ? (i % 2) * 0.04 + fromBack * 0.02
                      : fromBack * 0.02,
                }}
              >
                <CardBack />
              </motion.div>
            );
          })}
        </div>

        {/* Face-up dealt card */}
        <div
          className={cn("relative w-[min(72%,17rem)] sm:w-[17rem]", CARD_ASPECT)}
          style={{ perspective: 900 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={dealKey}
              className="absolute inset-0"
              initial={
                reduceMotion || dealKey === 0
                  ? false
                  : { x: -64, y: 16, rotate: -16, rotateY: -85, opacity: 0.35 }
              }
              animate={{ x: 0, y: 0, rotate: 0, rotateY: 0, opacity: 1 }}
              exit={{
                x: 36,
                opacity: 0,
                rotate: 6,
                transition: { duration: 0.22 },
              }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <DealtCard project={dealt} ctaLabel={copy.resultCta} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="accent"
          size="lg"
          onClick={() => void shuffle()}
          disabled={shuffling}
          aria-busy={shuffling}
        >
          {shuffling ? copy.busyLabel : copy.actionLabel}
        </Button>
        {copy.viewAll && (
          <Button href={copy.viewAll.href} variant="ghost" size="md">
            {copy.viewAll.label}
          </Button>
        )}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </p>
    </div>
  );
}

function packPose(
  phase: Phase,
  index: number,
  fromBack: number,
  half: "left" | "right",
) {
  const idle = {
    x: fromBack * 1.2,
    y: -fromBack * 1.4,
    rotate: fromBack * -0.4,
    scale: 1,
  };

  if (phase === "idle" || phase === "deal") return idle;

  if (phase === "split") {
    const dir = half === "left" ? -1 : 1;
    return {
      x: dir * (48 + (index % 3) * 6),
      y: -8 - (index % 2) * 6,
      rotate: dir * (14 + (index % 3) * 3),
      scale: 1.02,
    };
  }

  // Riffle — alternate cards weave through the center
  const dir = index % 2 === 0 ? -1 : 1;
  return {
    x: dir * (28 - fromBack * 2),
    y: -18 - (index % 3) * 4,
    rotate: dir * (10 - fromBack),
    scale: 1.04,
  };
}

/** Classic facedown poker back — navy field, gold diamond motif. */
function CardBack() {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[0.95rem]",
        "border-2 border-brand-foreground/15 bg-brand",
        "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)]",
      )}
    >
      <div className="m-1.5 flex flex-1 flex-col rounded-[0.65rem] border border-accent/35 bg-[color-mix(in_srgb,var(--color-brand-strong)_80%,black)] p-1.5">
        <div
          className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[0.45rem]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, color-mix(in srgb, var(--color-accent) 18%, transparent) 0 2px, transparent 2px 10px), repeating-linear-gradient(-45deg, color-mix(in srgb, var(--color-accent) 14%, transparent) 0 2px, transparent 2px 10px)",
          }}
        >
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-brand/80 font-display text-lg font-semibold text-accent"
          >
            J
          </span>
        </div>
      </div>
    </div>
  );
}

function DealtCard({
  project,
  ctaLabel,
}: {
  project: Project;
  ctaLabel: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-[0.95rem]",
        "border border-border bg-background-elevated",
        "shadow-[0_16px_40px_-18px_rgba(0,0,0,0.55)] ring-1 ring-brand/10",
      )}
    >
      {/* Corner pip — poker face cue */}
      <div className="flex items-start justify-between px-3 pt-3">
        <div className="text-left leading-none">
          <p className="font-display text-sm font-semibold text-brand">
            {project.name.charAt(0)}
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-wider text-muted">
            {project.year}
          </p>
        </div>
        <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-muted">
          {project.status}
        </p>
      </div>

      <div className="relative mx-3 mt-2 aspect-square overflow-hidden rounded-lg border border-border">
        <ProjectCover
          project={project}
          sizes="(min-width: 640px) 17rem, 70vw"
          priority
          className="!transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
          {project.tagline}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1 pt-3">
          {project.tech.slice(0, 2).map((t) => (
            <li key={t}>
              <Badge variant="outline" size="sm">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand link-underline hover:text-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
