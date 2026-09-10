/**
 * Tiny 2D circle physics for the claw-machine prize pit.
 * Positions are in playfield pixels; y grows downward.
 */

export interface SimBall {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Visual roll angle in degrees. */
  angle: number;
  r: number;
  /** Held by the claw — skipped in collisions / gravity. */
  held: boolean;
}

export interface SimBounds {
  width: number;
  height: number;
  /** Top of the solid floor (y). */
  floorY: number;
  wallPad: number;
}

const GRAVITY = 1950;
const RESTITUTION = 0.22;
const FRICTION = 0.78;
const AIR = 0.994;
const SLEEP = 6;

export function createBall(
  id: string,
  x: number,
  y: number,
  r: number,
): SimBall {
  return {
    id,
    x,
    y,
    vx: (Math.random() - 0.5) * 50,
    vy: 20 + Math.random() * 40,
    angle: Math.random() * 360,
    r,
    held: false,
  };
}

export function stepPhysics(
  balls: SimBall[],
  bounds: SimBounds,
  dt: number,
): void {
  const { width, height, floorY, wallPad } = bounds;
  const step = Math.min(dt, 1 / 30);

  for (const b of balls) {
    if (b.held) continue;

    b.vy += GRAVITY * step;
    b.vx *= AIR;
    b.vy *= AIR;
    b.x += b.vx * step;
    b.y += b.vy * step;

    // Roll from horizontal motion (arc length ≈ r * θ_rad)
    b.angle += ((b.vx * step) / b.r) * (180 / Math.PI);

    // Walls
    if (b.x - b.r < wallPad) {
      b.x = wallPad + b.r;
      b.vx = Math.abs(b.vx) * RESTITUTION;
    }
    if (b.x + b.r > width - wallPad) {
      b.x = width - wallPad - b.r;
      b.vx = -Math.abs(b.vx) * RESTITUTION;
    }

    // Floor
    if (b.y + b.r > floorY) {
      b.y = floorY - b.r;
      b.vy = -Math.abs(b.vy) * RESTITUTION;
      b.vx *= FRICTION;
      if (Math.abs(b.vy) < SLEEP) b.vy = 0;
      if (Math.abs(b.vx) < SLEEP) b.vx = 0;
    }

    if (b.y - b.r < 8) {
      b.y = 8 + b.r;
      b.vy = Math.abs(b.vy) * 0.2;
    }

    if (b.y > height - 4) {
      b.y = height - 4 - b.r;
      b.vy = 0;
    }
  }

  // Ball–ball collisions
  for (let iter = 0; iter < 4; iter++) {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i]!;
        const b = balls[j]!;
        if (a.held || b.held) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const min = a.r + b.r;
        if (dist >= min) continue;

        const overlap = min - dist;
        const nx = dx / dist;
        const ny = dy / dist;
        const half = overlap * 0.5;
        a.x -= nx * half;
        a.y -= ny * half;
        b.x += nx * half;
        b.y += ny * half;

        const dvx = b.vx - a.vx;
        const dvy = b.vy - a.vy;
        const along = dvx * nx + dvy * ny;
        if (along >= 0) continue;

        const impulse = along * 0.6;
        a.vx += impulse * nx;
        a.vy += impulse * ny;
        b.vx -= impulse * nx;
        b.vy -= impulse * ny;
      }
    }
  }
}

/** Soft tip interaction — parts non-target balls without blasting the pit. */
export function collideClawTip(
  balls: SimBall[],
  clawX: number,
  clawY: number,
  tipRadius: number,
  open: boolean,
  ignoreId?: string,
): void {
  const reach = tipRadius * (open ? 1.05 : 0.65);
  for (const b of balls) {
    if (b.held || b.id === ignoreId) continue;
    const dx = b.x - clawX;
    const dy = b.y - clawY;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const min = b.r + reach;
    if (dist >= min) continue;

    const overlap = min - dist;
    const nx = dx / dist;
    b.x += nx * overlap * 0.7;
    b.vx += nx * overlap * 8;
    if (dy < 0) b.y += overlap * 0.2;
  }
}

/**
 * Cable length where the open claw tip rests on top of the ball
 * (no penetration). tipBelowCable is playfield px from cableY to tip.
 */
export function cableYForBallContact(
  ball: SimBall,
  tipBelowCable: number,
  tipRadius: number,
  minCableY: number,
  maxCableY: number,
): number {
  // Tip touches the top of the sphere
  const tipY = ball.y - ball.r - tipRadius * 0.2;
  const cable = tipY - tipBelowCable;
  return Math.min(maxCableY, Math.max(minCableY, cable));
}

/** Ball center while gripped — nestled just below the closed tips. */
export function gripBallPosition(
  clawX: number,
  cableY: number,
  tipBelowCable: number,
  ballR: number,
): { x: number; y: number } {
  return {
    x: clawX,
    y: cableY + tipBelowCable + ballR * 0.45,
  };
}

/** True when the open tip has reached the top of the target ball. */
export function tipTouchesBall(
  cableY: number,
  tipBelowCable: number,
  tipRadius: number,
  ball: SimBall,
): boolean {
  const tipY = cableY + tipBelowCable;
  return tipY >= ball.y - ball.r - tipRadius * 0.25;
}

/** Always returns a ball when the pit is non-empty — nearest under the claw. */
export function pickGuaranteedTarget(
  balls: SimBall[],
  clawX: number,
): SimBall | null {
  const free = balls.filter((b) => !b.held);
  if (free.length === 0) return null;

  let best = free[0]!;
  let bestScore = Infinity;
  for (const b of free) {
    const dx = Math.abs(b.x - clawX);
    // Prefer closer in X; slight preference for higher (easier) balls
    const score = dx * 2.2 + (1 - b.y * 0.001);
    if (score < bestScore) {
      bestScore = score;
      best = b;
    }
  }
  return best;
}

export function findGraspTarget(
  balls: SimBall[],
  clawX: number,
  clawY: number,
  reach: number,
): SimBall | null {
  let best: SimBall | null = null;
  let bestDist = reach;
  for (const b of balls) {
    if (b.held) continue;
    const d = Math.hypot(b.x - clawX, b.y - clawY);
    if (d < bestDist) {
      bestDist = d;
      best = b;
    }
  }
  // Fallback: never return empty if anything is in the pit
  return best ?? pickGuaranteedTarget(balls, clawX);
}
