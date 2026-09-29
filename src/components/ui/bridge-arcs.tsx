import { cn } from "@/lib/utils";

interface BridgeArcsProps {
  className?: string;
}

/**
 * Brooklyn Bridge silhouette — gothic twin towers + main cables + suspenders.
 * Readable as "the bridge," not abstract arcs. Decorative only.
 */
export function BridgeArcs({ className }: BridgeArcsProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1400 420"
      preserveAspectRatio="xMidYMin meet"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-2 -z-[1] h-[min(58vh,28rem)] w-full text-brand",
        "opacity-[0.28] dark:opacity-[0.38]",
        className,
      )}
    >
      {/* Deck line */}
      <line
        x1="40"
        y1="340"
        x2="1360"
        y2="340"
        stroke="currentColor"
        strokeWidth="3"
      />
      <line
        x1="40"
        y1="348"
        x2="1360"
        y2="348"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.5"
      />

      {/* West tower */}
      <BridgeTower x={320} />
      {/* East tower */}
      <BridgeTower x={980} />

      {/* Main suspension cables — two clear catenaries */}
      <path
        d="M80 340 C 220 60, 420 60, 650 210 C 880 60, 1080 60, 1320 340"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M100 348 C 240 95, 430 95, 650 230 C 870 95, 1060 95, 1300 348"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Vertical suspenders */}
      {Array.from({ length: 23 }, (_, i) => {
        const x = 140 + i * 50;
        // Approximate cable height at x for the upper catenary
        const t = (x - 80) / 1240;
        const arch = Math.sin(Math.min(Math.max(t, 0), 1) * Math.PI);
        // Dip is stronger mid-span between towers
        const between =
          x > 360 && x < 940 ? 1 : x <= 360 ? x / 360 : (1400 - x) / 460;
        const y1 = 340 - arch * 230 * Math.min(between * 1.35, 1);
        return (
          <line
            key={x}
            x1={x}
            y1={Math.max(y1, 70)}
            x2={x}
            y2={340}
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.65"
          />
        );
      })}
    </svg>
  );
}

/** Gothic-arched stone tower — the Brooklyn Bridge tell. */
function BridgeTower({ x }: { x: number }) {
  const w = 88;
  const left = x - w / 2;
  return (
    <g>
      {/* Tower body */}
      <rect
        x={left}
        y={48}
        width={w}
        height={292}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Crenellated top */}
      <path
        d={`M${left - 4} 48 H${left + w + 4} V36 H${left + w - 8} V28 H${left + w - 20} V36 H${left + 20} V28 H${left + 8} V36 H${left - 4} Z`}
        fill="currentColor"
        opacity="0.9"
      />
      {/* Twin gothic arch openings */}
      <path
        d={`M${left + 14} 300 V170 Q${left + 28} 130 ${left + 42} 170 V300`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d={`M${left + 46} 300 V170 Q${left + 60} 130 ${left + 74} 170 V300`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Upper gallery arches */}
      <path
        d={`M${left + 16} 120 V88 Q${left + 28} 68 ${left + 40} 88 V120`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d={`M${left + 48} 120 V88 Q${left + 60} 68 ${left + 72} 88 V120`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      {/* Cross brace */}
      <line
        x1={left + 10}
        y1={200}
        x2={left + w - 10}
        y2={200}
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
    </g>
  );
}
