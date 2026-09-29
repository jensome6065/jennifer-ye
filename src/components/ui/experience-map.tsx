"use client";

import type { ExperienceItem } from "@/content/experience";
import {
  CLOSE_SPAN,
  LAND_RINGS,
  MAP_SIZE,
  PIN_TIP_OFFSET,
  cameraAlongFlight,
  flightControl,
  flightPathD,
  project,
  ringToPath,
  sampleQuadratic,
  screenConstantScale,
  viewBoxFromCamera,
  type Point,
} from "@/lib/geo";
import { cn } from "@/lib/utils";

interface ExperienceMapProps {
  items: ExperienceItem[];
  /** Continuous journey progress: 0 at first stop, `items.length - 1` at last. */
  progress: number;
  className?: string;
}

/**
 * Scroll-driven map stage: the camera pans/zooms into each work location.
 * Short metro hops stay close; long hauls pull back mid-flight, then dive in.
 */
export function ExperienceMap({
  items,
  progress,
  className,
}: ExperienceMapProps) {
  const points = items.map((item) => project(item.coordinates));
  const max = Math.max(items.length - 1, 1);
  const clamped = Math.min(Math.max(progress, 0), max);
  const fromIndex = Math.min(Math.floor(clamped), items.length - 1);
  const toIndex = Math.min(fromIndex + 1, items.length - 1);
  const localT = clamped - fromIndex;

  const fromItem = items[fromIndex]!;
  const toItem = items[toIndex]!;
  const from = points[fromIndex]!;
  const to = points[toIndex]!;
  const control = flightControl(from, to);
  const pin: Point =
    fromIndex === toIndex
      ? from
      : sampleQuadratic(from, control, to, localT);

  const camera = cameraAlongFlight(
    fromItem.coordinates,
    toItem.coordinates,
    pin,
    fromIndex === toIndex ? 0 : localT,
  );
  const viewBox = viewBoxFromCamera(camera);
  const pinScale = screenConstantScale(camera.span);
  const haloR = pinScale * 14;

  const activeIndex =
    localT < 0.55 || fromIndex === toIndex ? fromIndex : toIndex;
  const active = items[activeIndex]!;

  const landPaths = LAND_RINGS.map(ringToPath);
  const aspect = MAP_SIZE.height / MAP_SIZE.width;
  const viewW = camera.span;
  const viewH = camera.span * aspect;
  const viewX = camera.cx - viewW / 2;
  const viewY = camera.cy - viewH / 2;

  // Local lattice densifies a bit as we dive in.
  const gridStep = camera.span > 500 ? 50 : camera.span > 200 ? 25 : 12;
  const gridLines = buildGrid(viewX, viewY, viewW, viewH, gridStep);

  // Nearby stop dots only — far-away pins would be noise at city zoom.
  const nearbyStops = points
    .map((p, i) => ({ p, i, item: items[i]! }))
    .filter(({ p }) => {
      const dx = p.x - camera.cx;
      const dy = p.y - camera.cy;
      return Math.hypot(dx, dy) < camera.span * 0.85;
    });

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#14161c] text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(61,78,110,0.35),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,15,20,0.72)_100%)]"
      />

      <svg
        viewBox={viewBox}
        className="relative h-full w-full transition-[opacity] duration-300"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={`Map diving into ${active.location} for ${active.role} at ${active.company}`}
      >
        {/* Ocean / void */}
        <rect
          x={-200}
          y={-200}
          width={MAP_SIZE.width + 400}
          height={MAP_SIZE.height + 400}
          fill="#14161c"
        />

        {/* Land mass — non-scaling stroke so close-ups stay crisp */}
        <g
          fill="#1c2230"
          stroke="#3d4e6e"
          strokeOpacity={0.55}
          strokeWidth={1.1}
          vectorEffect="non-scaling-stroke"
        >
          {landPaths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Local grid */}
        <g
          stroke="#ffffff"
          strokeOpacity={0.06}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          fill="none"
        >
          {gridLines.vertical.map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1={viewY}
              x2={x}
              y2={viewY + viewH}
            />
          ))}
          {gridLines.horizontal.map((y) => (
            <line
              key={`h-${y}`}
              x1={viewX}
              y1={y}
              x2={viewX + viewW}
              y2={y}
            />
          ))}
        </g>

        {/* Place halo under the active pin */}
        <circle
          cx={pin.x}
          cy={pin.y}
          r={haloR * 2.2}
          fill="var(--accent)"
          fillOpacity={0.08}
        />
        <circle
          cx={pin.x}
          cy={pin.y}
          r={haloR}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.28}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />

        {/* In-flight arc (only when camera is pulled back enough to read it) */}
        {fromIndex !== toIndex && camera.span > CLOSE_SPAN * 1.25 && (
          <path
            d={flightPathD(from, to)}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - localT}
            strokeLinecap="round"
          />
        )}

        {/* Nearby destination dots */}
        <g>
          {nearbyStops.map(({ p, i, item }) => {
            const visited = i <= activeIndex;
            return (
              <g
                key={item.id}
                transform={`translate(${p.x} ${p.y}) scale(${pinScale})`}
              >
                <circle
                  r={visited ? 2.2 : 1.7}
                  fill={visited ? "var(--accent)" : "#ffffff"}
                  fillOpacity={visited ? 0.95 : 0.35}
                />
              </g>
            );
          })}
        </g>

        {/* Active pin — small map marker, tip on the lat/lng */}
        <g transform={`translate(${pin.x} ${pin.y}) scale(${pinScale})`}>
          <circle r={7} fill="var(--accent)" fillOpacity={0.12} />
          <circle r={3.5} fill="var(--accent)" fillOpacity={0.2} />
          <g transform={`translate(0 ${-PIN_TIP_OFFSET})`}>
            <path
              d="M0 -18 C -10 -18 -16 -10 -16 -2 C -16 7 0 18 0 18 C 0 18 16 7 16 -2 C 16 -10 10 -18 0 -18 Z"
              fill="var(--accent)"
              stroke="#14161c"
              strokeWidth={1.2}
            />
            <circle cy={-3.5} r={3.2} fill="#14161c" />
          </g>
        </g>
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 sm:left-6 sm:top-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
          Now in
        </p>
        <p className="mt-1 max-w-[16rem] font-display text-lg font-semibold tracking-tight text-white/90 sm:text-xl">
          {active.location}
        </p>
      </div>
    </div>
  );
}

function buildGrid(
  x: number,
  y: number,
  w: number,
  h: number,
  step: number,
): { vertical: number[]; horizontal: number[] } {
  const vertical: number[] = [];
  const horizontal: number[] = [];
  const x0 = Math.floor(x / step) * step;
  const y0 = Math.floor(y / step) * step;
  for (let vx = x0; vx <= x + w + step; vx += step) vertical.push(vx);
  for (let hy = y0; hy <= y + h + step; hy += step) horizontal.push(hy);
  return { vertical, horizontal };
}
