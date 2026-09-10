"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  PROJECT_GROUP_ORDER,
  PROJECT_GROUPS,
  type Project,
  type ProjectGroup,
} from "@/content/projects";
import type { ProjectGameContent } from "@/content/project-claw";
import { Button } from "@/components/ui/button";
import { ProjectGameResult } from "@/components/ui/project-game-result";
import {
  createBall,
  collideClawTip,
  cableYForBallContact,
  gripBallPosition,
  pickGuaranteedTarget,
  stepPhysics,
  type SimBall,
  type SimBounds,
} from "@/lib/claw-physics";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Phase = "idle" | "drop" | "grip" | "lift" | "chute";
type BallFilter = "all" | ProjectGroup;

const MAX_BALLS = 16;
const CLAW_HOME_Y = 28;
/** Playfield px from `cableY` to the open claw tip (must match SVG). */
const TIP_BELOW_CABLE = 58;
const TIP_RADIUS = 10;

/** Uniform prize-capsule radius (px); scaled lightly with bay width. */
function ballRadius(bayWidth: number) {
  return Math.round(Math.min(30, Math.max(22, bayWidth * 0.058)));
}

interface ClawMachineProps {
  projects: Project[];
  filter?: BallFilter;
  copy: ProjectGameContent;
}

interface RenderBall {
  id: string;
  project: Project;
  x: number;
  y: number;
  r: number;
  angle: number;
  held: boolean;
}

/**
 * Realistic claw machine: live circle physics in the prize pit, extending
 * cable, 3-prong claw, glossy capsules, joystick / drag aim.
 */
export function ClawMachine({
  projects,
  filter = "all",
  copy,
}: ClawMachineProps) {
  const reduceMotion = useReducedMotion();
  const bayRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<SimBall[]>([]);
  const boundsRef = useRef<SimBounds>({
    width: 400,
    height: 320,
    floorY: 280,
    wallPad: 10,
  });
  const clawRef = useRef({ x: 200, cableY: CLAW_HOME_Y, open: false });
  const phaseRef = useRef<Phase>("idle");
  const heldIdRef = useRef<string | null>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const moveDirRef = useRef<-1 | 0 | 1>(0);
  const [moveDir, setMoveDirState] = useState<-1 | 0 | 1>(0);

  const [ballFilter, setBallFilter] = useState<BallFilter>(filter);
  const [syncedFilter, setSyncedFilter] = useState(filter);
  const [phase, setPhase] = useState<Phase>("idle");
  const [clawX, setClawX] = useState(200);
  const [cableY, setCableY] = useState(CLAW_HOME_Y);
  const [clawOpen, setClawOpen] = useState(false);
  const [renderBalls, setRenderBalls] = useState<RenderBall[]>([]);
  const [chuteProject, setChuteProject] = useState<Project | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [announce, setAnnounce] = useState("");
  const [baySize, setBaySize] = useState({ w: 400, h: 320 });

  // Mirror the parent filter prop without syncing in an effect.
  if (filter !== syncedFilter) {
    setSyncedFilter(filter);
    setBallFilter(filter);
  }

  const projectById = useMemo(() => {
    const map = new Map<string, Project>();
    for (const p of projects) map.set(p.slug, p);
    return map;
  }, [projects]);

  const pool = useMemo(() => {
    const list =
      ballFilter === "all"
        ? projects
        : projects.filter((p) => p.groups.includes(ballFilter));
    const featured = list.filter((p) => p.featured);
    const rest = list.filter((p) => !p.featured);
    return [...featured, ...rest].slice(0, MAX_BALLS);
  }, [projects, ballFilter]);

  const syncRender = useCallback(() => {
    const next: RenderBall[] = [];
    for (const b of ballsRef.current) {
      const project = projectById.get(b.id);
      if (!project) continue;
      next.push({
        id: b.id,
        project,
        x: b.x,
        y: b.y,
        r: b.r,
        angle: b.angle,
        held: b.held,
      });
    }
    setRenderBalls(next);
    setClawX(clawRef.current.x);
    setCableY(clawRef.current.cableY);
    setClawOpen(clawRef.current.open);
  }, [projectById]);

  const seedBalls = useCallback(() => {
    const { width, floorY } = boundsRef.current;
    const r = ballRadius(width);
    const seeded: SimBall[] = [];
    pool.forEach((p, i) => {
      const x = width * 0.2 + Math.random() * width * 0.6;
      const y = 36 + Math.random() * 44 + (i % 4) * 10;
      seeded.push(createBall(p.slug, x, y, r));
    });
    for (const b of seeded) {
      if (b.y + b.r > floorY - 20) b.y = floorY - 90 - Math.random() * 36;
    }
    ballsRef.current = seeded;
    heldIdRef.current = null;
    clawRef.current = {
      x: width * 0.5,
      cableY: CLAW_HOME_Y,
      open: false,
    };
    phaseRef.current = "idle";
    setPhase("idle");
    setChuteProject(null);
    if (pool[0]) setSelected((s) => s ?? pool[0]!);
    syncRender();
  }, [pool, syncRender]);

  // Measure bay
  useEffect(() => {
    const el = bayRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      boundsRef.current = {
        width: w,
        height: h,
        floorY: h - 44,
        wallPad: 14,
      };
      setBaySize({ w, h });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reseed when prize pool / bay size is ready
  useEffect(() => {
    if (baySize.w < 40) return;
    clawRef.current.x = baySize.w * 0.5;
    // Defer React state updates out of the effect body (React 19 lint).
    const id = requestAnimationFrame(() => {
      seedBalls();
    });
    return () => cancelAnimationFrame(id);
  }, [pool, baySize.w, baySize.h, seedBalls]);

  // Physics + claw animation loop
  useEffect(() => {
    if (reduceMotion) {
      // Static settle without continuous RAF motion beyond one pack.
      const bounds = boundsRef.current;
      for (let i = 0; i < 90; i++) {
        stepPhysics(ballsRef.current, bounds, 1 / 60);
      }
      const id = requestAnimationFrame(() => {
        syncRender();
      });
      return () => cancelAnimationFrame(id);
    }

    lastTsRef.current = performance.now();

    const tick = (ts: number) => {
      const dt = Math.min(0.032, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;
      const bounds = boundsRef.current;
      const claw = clawRef.current;

      // Joystick hold
      if (phaseRef.current === "idle" && moveDirRef.current !== 0) {
        claw.x += moveDirRef.current * 160 * dt;
        claw.x = Math.min(
          bounds.width - 28,
          Math.max(28, claw.x),
        );
      }

      // Held ball nestled under closed tips (not intersecting the claw)
      if (heldIdRef.current) {
        const held = ballsRef.current.find((b) => b.id === heldIdRef.current);
        if (held) {
          const grip = gripBallPosition(
            claw.x,
            claw.cableY,
            TIP_BELOW_CABLE,
            held.r,
          );
          held.x = grip.x;
          held.y = grip.y;
          held.vx = 0;
          held.vy = 0;
        }
      }

      stepPhysics(ballsRef.current, bounds, dt);
      syncRender();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion, syncRender]);

  const busy = phase !== "idle";

  const setMoveDir = (dir: -1 | 0 | 1) => {
    moveDirRef.current = dir;
    setMoveDirState(dir);
  };

  const aimFromClientX = (clientX: number) => {
    if (busy || !bayRef.current) return;
    const rect = bayRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    clawRef.current.x = Math.min(
      boundsRef.current.width - 28,
      Math.max(28, x),
    );
  };

  const runGrab = useCallback(async () => {
    if (phaseRef.current !== "idle" || ballsRef.current.length === 0) return;

    const target = pickGuaranteedTarget(
      ballsRef.current,
      clawRef.current.x,
    );
    if (!target) return;

    if (reduceMotion) {
      const project = projectById.get(target.id);
      ballsRef.current = ballsRef.current.filter((b) => b.id !== target.id);
      if (project) {
        setSelected(project);
        setAnnounce(`${copy.resultAnnounce} ${project.name}`);
      }
      return;
    }

    phaseRef.current = "drop";
    setPhase("drop");

    clawRef.current.open = true;
    setClawOpen(true);
    await wait(260);

    const bounds = boundsRef.current;
    const startX = clawRef.current.x;
    const grabX = target.x;

    // Descend only until the tip rests on the ball — never through it.
    const contactCable = cableYForBallContact(
      target,
      TIP_BELOW_CABLE,
      TIP_RADIUS,
      CLAW_HOME_Y + 36,
      bounds.floorY - TIP_BELOW_CABLE - target.r,
    );

    await animateCable(clawRef, contactCable, 900, (t) => {
      clawRef.current.x = startX + (grabX - startX) * Math.min(1, t * 1.15);

      collideClawTip(
        ballsRef.current,
        clawRef.current.x,
        clawRef.current.cableY + TIP_BELOW_CABLE,
        TIP_RADIUS,
        true,
        target.id,
      );

      // Center under jaws; clamp tip to the crown of the ball
      if (t > 0.3) {
        target.x += (clawRef.current.x - target.x) * 0.2;
        target.vx *= 0.75;
      }

      const tipY = clawRef.current.cableY + TIP_BELOW_CABLE;
      const crown = target.y - target.r;
      if (tipY > crown - TIP_RADIUS * 0.15) {
        clawRef.current.cableY =
          crown - TIP_RADIUS * 0.15 - TIP_BELOW_CABLE;
        // Early stop once we've made solid contact
        if (t > 0.45) return false;
      }
    });

    // Final seat: tip on crown, ball centered
    clawRef.current.x = target.x;
    clawRef.current.cableY = cableYForBallContact(
      target,
      TIP_BELOW_CABLE,
      TIP_RADIUS,
      CLAW_HOME_Y,
      bounds.floorY - 20,
    );
    await wait(100);

    // Close jaws — ball hangs below tips, not intersecting them
    phaseRef.current = "grip";
    setPhase("grip");
    clawRef.current.open = false;
    setClawOpen(false);
    const grip = gripBallPosition(
      clawRef.current.x,
      clawRef.current.cableY,
      TIP_BELOW_CABLE,
      target.r,
    );
    target.x = grip.x;
    target.y = grip.y;
    target.vx = 0;
    target.vy = 0;
    target.held = true;
    heldIdRef.current = target.id;
    await wait(280);

    phaseRef.current = "lift";
    setPhase("lift");
    await animateCable(clawRef, CLAW_HOME_Y, 720);

    const chuteX = bounds.width * 0.5;
    await animateClawX(clawRef, chuteX, 480);

    phaseRef.current = "chute";
    setPhase("chute");
    clawRef.current.open = true;
    setClawOpen(true);
    const project = projectById.get(target.id) ?? null;
    setChuteProject(project);

    ballsRef.current = ballsRef.current.filter((b) => b.id !== target.id);
    heldIdRef.current = null;

    await wait(650);
    if (project) {
      setSelected(project);
      setAnnounce(`${copy.resultAnnounce} ${project.name}`);
    }
    setChuteProject(null);
    clawRef.current.open = false;
    setClawOpen(false);
    phaseRef.current = "idle";
    setPhase("idle");
  }, [reduceMotion, copy.resultAnnounce, projectById]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setMoveDir(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setMoveDir(1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void runGrab();
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setMoveDir(0);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)] lg:items-start lg:gap-12">
      <div className="flex flex-col gap-5">
        <div
          role="tablist"
          aria-label="Filter prize balls by project group"
          className="flex flex-wrap gap-2"
        >
          <FilterChip
            label="All"
            active={ballFilter === "all"}
            onClick={() => setBallFilter("all")}
          />
          {PROJECT_GROUP_ORDER.map((group) => (
            <FilterChip
              key={group}
              label={PROJECT_GROUPS[group]}
              active={ballFilter === group}
              onClick={() => setBallFilter(group)}
            />
          ))}
        </div>

        <div
          tabIndex={0}
          role="application"
          aria-label="Claw machine. Hold arrow keys to move, Enter to grab."
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onBlur={() => setMoveDir(0)}
          className={cn(
            "select-none overflow-hidden rounded-[1.35rem]",
            "border-[3px] border-[color-mix(in_srgb,var(--color-brand)_50%,#0d0d0d)]",
            "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-brand)_55%,#141820),#0b0d12)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          {/* Marquee */}
          <div className="relative bg-brand px-4 py-3 text-brand-foreground">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2), transparent 40%)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.22em]">
                {copy.cabinetLabel}
              </p>
              <span className="flex gap-1.5" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-accent"
                    style={{
                      boxShadow:
                        "0 0 10px color-mix(in srgb, var(--color-accent) 75%, transparent)",
                      opacity: 0.55 + (i % 3) * 0.15,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Glass bay */}
          <div className="relative mx-2.5 mt-2.5 overflow-hidden rounded-xl sm:mx-3.5">
            <div
              ref={bayRef}
              className="relative aspect-[5/4] touch-none sm:aspect-[3/2]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 12%, rgba(120,160,220,0.14), transparent 48%), linear-gradient(180deg, #1a2740 0%, #0d1420 42%, #080b11 100%)",
              }}
              onPointerDown={(e: ReactPointerEvent<HTMLDivElement>) => {
                if (busy) return;
                e.currentTarget.setPointerCapture(e.pointerId);
                aimFromClientX(e.clientX);
              }}
              onPointerMove={(e: ReactPointerEvent<HTMLDivElement>) => {
                if (busy || !e.currentTarget.hasPointerCapture(e.pointerId))
                  return;
                aimFromClientX(e.clientX);
              }}
            >
              {/* Glass sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(115deg,rgba(255,255,255,0.09)_0%,transparent_26%,transparent_70%,rgba(255,255,255,0.04)_100%)]"
              />

              {/* Rail */}
              <div
                aria-hidden
                className="absolute inset-x-5 top-[18px] z-20 h-[6px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, #4a5568, #1f2530 45%, #6b7280)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              />

              {/* Claw assembly */}
              <div
                className="pointer-events-none absolute z-[25]"
                style={{
                  left: clawX,
                  top: 14,
                  transform: "translateX(-50%)",
                  width: 96,
                  filter:
                    phase === "drop" || phase === "grip"
                      ? "drop-shadow(0 16px 8px rgba(0,0,0,0.4))"
                      : "drop-shadow(0 6px 4px rgba(0,0,0,0.28))",
                }}
              >
                <div
                  className="mx-auto h-4 w-12 rounded-[3px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #f3f5f7, #9aa3b0 42%, #5b6472)",
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.55)",
                  }}
                />
                <div
                  className="mx-auto"
                  style={{
                    width: 3,
                    height: Math.max(10, cableY - 12),
                    background:
                      "repeating-linear-gradient(180deg, #c5ccd6 0 3px, #8b93a0 3px 5px)",
                    boxShadow: "1px 0 0 rgba(0,0,0,0.3)",
                  }}
                />
                <ClawGraphic open={clawOpen} />
              </div>

              {/* Floor */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-10 h-11"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.55) 30%, #05070a)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 z-[11] h-[3px]"
                style={{
                  top: baySize.h - 44,
                  background:
                    "linear-gradient(90deg, transparent, rgba(120,140,170,0.35), transparent)",
                }}
              />

              {/* Balls */}
              {renderBalls.length === 0 ? (
                <p className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-sm text-muted-foreground">
                  No balls in this group — try All or another filter.
                </p>
              ) : (
                renderBalls.map((b) => (
                  <div
                    key={b.id}
                    className="absolute z-20 will-change-transform"
                    style={{
                      left: b.x,
                      top: b.y,
                      width: b.r * 2,
                      height: b.r * 2,
                      transform: `translate(-50%, -50%) rotate(${b.angle}deg)`,
                      opacity: b.held && phase === "chute" ? 0 : 1,
                      zIndex: b.held ? 24 : 20,
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-1/2 h-2.5 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-[4px]"
                    />
                    <PrizeCapsule project={b.project} diameter={b.r * 2} />
                  </div>
                ))
              )}

              {/* Chute mouth */}
              <div className="absolute inset-x-0 bottom-0 z-40 flex h-10 items-end justify-center">
                <div className="relative flex h-8 w-36 items-center justify-center rounded-t-lg border border-b-0 border-white/20 bg-[#10151e]">
                  <div
                    aria-hidden
                    className="absolute inset-x-3 top-0 h-px bg-white/20"
                  />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {copy.chuteLabel}
                  </p>
                  <AnimatePresence>
                    {chuteProject && (
                      <motion.div
                        key={chuteProject.slug}
                        className="absolute"
                        initial={{ y: -56, opacity: 0, scale: 0.7 }}
                        animate={{ y: 6, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                      >
                        <PrizeCapsule
                          project={chuteProject}
                          diameter={ballRadius(baySize.w) * 2}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="m-2.5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#07090e] px-4 py-4 ring-1 ring-white/5 sm:m-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-[#121821] ring-2 ring-white/10">
                <div
                  className="absolute h-10 w-10 rounded-full bg-[#1c2433]"
                  style={{ boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)" }}
                />
                <div
                  className="relative z-10 h-8 w-3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #3a4558, #c5ccd6 40%, #3a4558)",
                    transform: `rotate(${moveDir * 22}deg)`,
                    transformOrigin: "50% 100%",
                    transition: "transform 120ms ease-out",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
                  }}
                >
                  <span
                    className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-accent"
                    style={{
                      boxShadow:
                        "0 0 10px color-mix(in srgb, var(--color-accent) 70%, transparent)",
                    }}
                  />
                </div>
                <button
                  type="button"
                  aria-label="Hold to move left"
                  disabled={busy}
                  onPointerDown={() => setMoveDir(-1)}
                  onPointerUp={() => setMoveDir(0)}
                  onPointerLeave={() => setMoveDir(0)}
                  className="absolute inset-y-0 left-0 z-20 w-1/2"
                />
                <button
                  type="button"
                  aria-label="Hold to move right"
                  disabled={busy}
                  onPointerDown={() => setMoveDir(1)}
                  onPointerUp={() => setMoveDir(0)}
                  onPointerLeave={() => setMoveDir(0)}
                  className="absolute inset-y-0 right-0 z-20 w-1/2"
                />
              </div>
              <p className="hidden max-w-[11rem] text-xs leading-relaxed text-muted sm:block">
                Hold the stick or drag in the bay. Grab opens the claw, then drops it into the pile.
              </p>
            </div>
            <Button
              variant="accent"
              size="lg"
              onClick={() => void runGrab()}
              disabled={busy || pool.length === 0}
              aria-busy={busy}
              className="min-w-[7.5rem] shadow-[0_0_28px_color-mix(in_srgb,var(--color-accent)_40%,transparent)]"
            >
              {busy ? copy.busyLabel : copy.actionLabel}
            </Button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announce}
        </p>
      </div>

      {selected && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            <ProjectGameResult project={selected} ctaLabel={copy.resultCta} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function ClawGraphic({ open }: { open: boolean }) {
  const spread = open ? 64 : 7;
  return (
    <svg
      width="96"
      height="64"
      viewBox="0 0 96 64"
      className="-mt-1 mx-auto"
      aria-hidden
    >
      <defs>
        <linearGradient id="clawMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f3f7" />
          <stop offset="45%" stopColor="#a8b0bc" />
          <stop offset="100%" stopColor="#5b6472" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="8" r="6" fill="var(--color-accent)" />
      <circle
        cx="48"
        cy="8"
        r="6"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      <g
        style={{
          transformOrigin: "48px 12px",
          transform: `rotate(${-spread}deg)`,
          transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <path
          d="M48 12 L30 56"
          stroke="url(#clawMetal)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M30 56 L22 52"
          stroke="#8b93a0"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>
      <g
        style={{
          transformOrigin: "48px 12px",
          transform: `rotate(${spread}deg)`,
          transition: "transform 240ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <path
          d="M48 12 L66 56"
          stroke="url(#clawMetal)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M66 56 L74 52"
          stroke="#8b93a0"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M48 12 L48 54"
        stroke="url(#clawMetal)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity={open ? 0.2 : 1}
      />
    </svg>
  );
}

function PrizeCapsule({
  project,
  diameter,
}: {
  project: Project;
  diameter: number;
}) {
  const initial = project.name.charAt(0).toUpperCase();
  return (
    <span
      className="relative block overflow-hidden rounded-full"
      style={{ width: diameter, height: diameter }}
      title={project.name}
    >
      {/* Lower hemisphere */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(160deg, ${project.cover.from}, ${project.cover.to})`,
        }}
      />
      {/* Upper translucent shell */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 42%, transparent 52%)",
        }}
      />
      {/* Specular */}
      <span
        className="absolute rounded-full"
        style={{
          left: "18%",
          top: "12%",
          width: "38%",
          height: "28%",
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.9), transparent 70%)",
          filter: "blur(0.5px)",
        }}
      />
      {/* Seam */}
      <span
        className="absolute inset-x-[6%] top-1/2 h-px -translate-y-1/2"
        style={{ background: "rgba(255,255,255,0.35)" }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.35), inset 0 6px 10px rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.4)" }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-display font-semibold text-white"
        style={{
          fontSize: Math.max(11, diameter * 0.28),
          textShadow: "0 1px 2px rgba(0,0,0,0.45)",
        }}
      >
        {initial}
      </span>
    </span>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-brand text-brand-foreground"
          : "bg-background-elevated text-muted-foreground ring-1 ring-border hover:text-foreground hover:ring-brand/30",
      )}
    >
      {label}
    </button>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function animateCable(
  clawRef: MutableRefObject<{ x: number; cableY: number; open: boolean }>,
  to: number,
  ms: number,
  onUpdate?: (t: number) => void | false,
) {
  return new Promise<void>((resolve) => {
    const from = clawRef.current.cableY;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      clawRef.current.cableY = from + (to - from) * eased;
      const cont = onUpdate?.(eased);
      if (cont === false || t >= 1) resolve();
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function animateClawX(
  clawRef: MutableRefObject<{ x: number; cableY: number; open: boolean }>,
  to: number,
  ms: number,
) {
  return new Promise<void>((resolve) => {
    const from = clawRef.current.x;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      clawRef.current.x = from + (to - from) * eased;
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}
